import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RequestService} from "../../../../services/request.service";

@Component({
    selector: 'queue-status-button',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './queue-status-button.component.html',
    styleUrl: './queue-status-button.component.scss'
})
export class QueueStatusButtonComponent implements OnInit {
    status_icon: string = '/assets/icons/modqueue/default-stamp.svg';
    @Input() current_status: QueueRequestStatus = QueueRequestStatus.Pending;
    @Input() beatmapId!: number;

    constructor(private request: RequestService) {
    }

    ngOnInit() {
        this.updateStatusIcon();
    }

    cycleStatus() {
        switch (this.current_status) {
            case QueueRequestStatus.Pending:
                this.current_status = QueueRequestStatus.Rejected;
                break;
            case QueueRequestStatus.Rejected:
                this.current_status = QueueRequestStatus.Accepted;
                break;
            case QueueRequestStatus.Accepted:
                this.current_status = QueueRequestStatus.Pending;
                break;
        }

        this.updateStatusIcon()
        this.patchStatus();
    }

    patchStatus() {
        // Call the API to update the status of the beatmap
        this.request.patchRequest(this.beatmapId, this.current_status).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.error(error);
            }
        );
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