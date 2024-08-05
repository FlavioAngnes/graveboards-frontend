import {Directive, HostListener, Input, ElementRef, Renderer2} from '@angular/core';

@Directive({
    standalone: true,
    selector: 'img[fallbackSrc]'
})

export class BeatmapThumbnailFallbackDirective {
    @Input() fallbackSrc!: string;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('error')
    onError() {
        this.renderer.setAttribute(this.el.nativeElement, 'src', this.fallbackSrc);
    }
}
