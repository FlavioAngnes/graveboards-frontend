import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
  ],
})
export class RequestButtonDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RequestButtonDialogComponent>,
    private _snackBar: MatSnackBar
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

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);

      this._snackBar.open('Request submitted!', 'Confirm', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}