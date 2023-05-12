import { Component, Inject } from '@angular/core';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface DialogData{
  fullyScannedJobs: Array<string>
}

@Component({
  selector: 'app-jobs-show-modal',
  templateUrl: './jobs-show-modal.component.html',
  styleUrls: ['./jobs-show-modal.component.css']
})
export class JobsShowModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
