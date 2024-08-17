import {Component} from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CommonModule} from '@angular/common';
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-request-button-dialog',
    templateUrl: './request-button-dialog.component.html',
    styleUrls: ['./request-button-dialog.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        CommonModule,
        MatSelect,
        MatOption,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatIcon,
        MatDialogClose,
    ],
})
export class RequestButtonDialogComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<RequestButtonDialogComponent>
    ) {
        this.form = this.fb.group({
            beatmapsetLink: ['', [Validators.required, Validators.pattern('^(https?:\\/\\/)?osu\\.ppy\\.sh\\/beatmapsets\\/\\d+(#(osu|taiko|fruits|mania)\\/\\d+)?$')]],
            comment: [''],
            mvChecked: [false]
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }
}