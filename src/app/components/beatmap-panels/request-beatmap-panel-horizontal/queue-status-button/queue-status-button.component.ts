import {Component, Input, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RequestService} from "../../../../services/request.service";

@Component({
    selector: 'queue-status-button',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgIf
    ],
    templateUrl: './queue-status-button.component.html',
    styleUrl: './queue-status-button.component.scss'
})
export class QueueStatusButtonComponent implements OnInit {
    status_icon: string = '/assets/icons/modqueue/default-stamp.svg';
    @Input() current_status: QueueRequestStatus = QueueRequestStatus.Pending;
    @Input() beatmapId!: number;

    isAwaitingResponse: boolean = false;

    constructor(private request: RequestService) {
    }

    ngOnInit() {
        this.updateStatusIcon();
    }

    onClick() {
        this.sendStatusPatchRequest();
    }

    private updateStatus() {
        this.current_status = this.getNextStatus(this.current_status);
        this.updateStatusIcon();
    }

    private sendStatusPatchRequest() {
        this.isAwaitingResponse = true;

        const new_status = this.getNextStatus(this.current_status);

        // Call the API to update the status of the beatmap
        this.request.patchRequest(this.beatmapId, new_status).subscribe(
            () => {
                this.updateStatus();
                this.isAwaitingResponse = false;
            },
            error => {
                console.error(error);
            }
        );
    }

    private getNextStatus(status: QueueRequestStatus): QueueRequestStatus {
        switch (status) {
            case QueueRequestStatus.Pending:
                return QueueRequestStatus.Rejected;
            case QueueRequestStatus.Rejected:
                return QueueRequestStatus.Accepted;
            case QueueRequestStatus.Accepted:
                return QueueRequestStatus.Pending;
        }
    }

    private updateStatusIcon() {
        switch (this.current_status) {
            case QueueRequestStatus.Pending:
                this.status_icon = '/assets/icons/modqueue/default-stamp.svg';
                break;
            case QueueRequestStatus.Rejected:
                this.status_icon = '/assets/icons/modqueue/rejected-stamp.svg';
                break;
            case QueueRequestStatus.Accepted:
                this.status_icon = '/assets/icons/modqueue/accepted-stamp.svg';
                break;
        }
    }
}

export enum QueueRequestStatus {
    Pending = 0,
    Rejected = -1,
    Accepted = 1
}