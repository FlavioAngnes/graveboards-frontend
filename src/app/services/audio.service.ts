import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Subject, Observable, BehaviorSubject} from 'rxjs';
import {distinctUntilChanged, startWith} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    private readonly song!: HTMLAudioElement;
    private songVolume: number = 0.05;

    private playStatusSubject: Subject<boolean> = new Subject<boolean>();
    private endOfAudioSubject: Subject<void> = new Subject<void>();
    private errorSubject: Subject<string> = new Subject<string>();
    private songSrcSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    private currentTimeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    // Observable streams
    playStatus$: Observable<boolean> = this.playStatusSubject.asObservable();
    error$: Observable<string> = this.errorSubject.asObservable();
    songSrc$: Observable<string | null> = this.songSrcSubject.asObservable();
    currentTime$: Observable<number> = this.currentTimeSubject.asObservable().pipe(
        distinctUntilChanged(), // Emit only when current time changes
        startWith(0) // Ensure initial value is emitted
    );

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.song = new Audio();

            this.setupAudioEvents();
        }
    }

    private setupAudioEvents(): void {
        if (this.song === null) return;

        this.song.addEventListener('ended', () => {
            this.endOfAudioSubject.next();
        });

        this.song.addEventListener('play', () => {
            this.playStatusSubject.next(true);
        });

        this.song.addEventListener('pause', () => {
            this.playStatusSubject.next(false);
        });

        this.song.addEventListener('error', (event) => {
            const error = (event as any).target.error;
            this.errorSubject.next(`Error code ${error.code}: ${error.message}`);
        });
    }

    private startCurrentTimeUpdater(): void {
        const update = () => {
            if (this.song.readyState > 0 && !this.song.paused) {
                this.currentTimeSubject.next(this.song.currentTime);
            }
            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    }

    playAudio(url: string): void {
        this.startCurrentTimeUpdater();

        this.song.src = url;
        this.song.volume = this.songVolume;

        this.song.load();

        // Update the BehaviorSubject with the new song URL
        this.songSrcSubject.next(url);

        this.song.play().catch(error => {
            this.errorSubject.next(`Error playing audio: ${error.message}`);
        });
    }

    stopAudio(): void {
        if (!isPlatformBrowser(this.platformId)) return;

        this.song.pause();
        this.song.currentTime = 0;

        // Clear the song URL and current time when stopped
        this.songSrcSubject.next(null);
        this.currentTimeSubject.next(0);
    }

    getVolume() {
        if (!isPlatformBrowser(this.platformId)) return 0;

        const localVolume = localStorage.getItem("volume");

        if (localVolume) {
            this.songVolume = parseFloat(localVolume);
        } else {
            localStorage.setItem("volume", this.songVolume.toString());
        }

        return this.songVolume;
    }

    setVolume(volume: number) {
        this.songVolume = volume;
        localStorage.setItem("volume", this.songVolume.toString());

        if (this.song) {
            this.song.volume = this.songVolume;
        }
    }
}