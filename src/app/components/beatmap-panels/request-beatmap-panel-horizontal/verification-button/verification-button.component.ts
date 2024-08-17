import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'verification-button',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './verification-button.component.html',
    styleUrl: './verification-button.component.scss'
})
export class VerificationButtonComponent {
    @Input() isVerified: boolean = false;
    content: string = 'unverified';

    changeState() {
        this.isVerified = !this.isVerified;

        this.content = this.isVerified ? 'verified' : 'unverified';
    }
}
