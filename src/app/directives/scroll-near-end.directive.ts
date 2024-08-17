import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, OnInit } from '@angular/core';

@Directive({
    selector: '[scrollNearEnd]',
    standalone: true
})
export class ScrollNearEndDirective implements OnInit {
    @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();
    @Input() threshold: number = 100;

    private scrollContainer: HTMLElement | null = null;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        // Find the .main-grid-content element in the parent hierarchy
        this.scrollContainer = this.findScrollContainer(this.el.nativeElement);

        if (this.scrollContainer) {
            // Listen to the scroll event on the .main-grid-content element
            this.renderer.listen(this.scrollContainer, 'scroll', () => this.onScroll());
        } else {
            console.error('.main-grid-content not found in parent hierarchy');
        }
    }

    private findScrollContainer(element: HTMLElement): HTMLElement | null {
        let parent = element.parentElement;
        while (parent) {
            if (parent.classList.contains('main-section-content')) {
                return parent;
            }
            parent = parent.parentElement;
        }
        return null; // Return null if .main-grid-content is not found
    }

    private onScroll() {
        const element = this.scrollContainer;

        if (!element) return;

        // Total height of the scroll container
        const elementHeight = element.scrollHeight;

        // Visible height of the scroll container
        const visibleHeight = element.clientHeight;

        // Current scroll position
        const scrollPosition = element.scrollTop;

        // Remaining scrollable distance
        const remainingScroll = elementHeight - (scrollPosition + visibleHeight);

        if (remainingScroll < this.threshold) {
            this.nearEnd.emit();
        }
    }
}