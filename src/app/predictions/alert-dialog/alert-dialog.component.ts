import { Component, Inject } from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {

  alertMessage = "";

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data && data.message) {
      this.alertMessage = data.message;
    }
  }

  onClick(): void {
    this.dialogRef.close();
  }
}
