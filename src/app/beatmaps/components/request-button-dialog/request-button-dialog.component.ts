import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
})
export class RequestButtonDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RequestButtonDialogComponent>
  ) {
    this.form = this.fb.group({
      url: ['', [Validators.required, Validators.pattern('^(https?:\\/\\/)?osu\\.ppy\\.sh\\/beatmapsets\\/\\d+(#(osu|taiko|fruits|mania)\\/\\d+)?$')]],
      text: [''],
      checkbox: [false]
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