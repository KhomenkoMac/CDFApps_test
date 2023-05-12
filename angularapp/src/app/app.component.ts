import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { QRscannerComponent } from './components/qrscanner/qrscanner.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { JobsShowModalComponent } from './components/jobs-show-modal/jobs-show-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    http: HttpClient,
    public dialog: MatDialog) {
    // http.<WeatherForecast[]>('/wearhousejobs')
    // .subscribe({
    //   error(err) {
    //     console.error(err);
    //   },
    //   complete() {
    //     console.log('hellow');
    //   },
    // });

    // result => {
    //   this.forecasts = result;
    // },
    // error => console.error(error),
    // ()=> console.log('fff')
  }

  title = 'angularapp'
  isScanByCamera: boolean = false
  
  fullyScannedJobs: Array<string> = ['HW-10230123', 'HW-10230123']
  unseenScannedJobs: number = 2

  showJobs(){
    this.unseenScannedJobs = 0
    this.dialog.open(JobsShowModalComponent, {
      data: { fullyScannedJobs: this.fullyScannedJobs }
    })
  }

  onFullyScannedJob(warehousjobReference: string){
    console.log(warehousjobReference);
    this.fullyScannedJobs.push(warehousjobReference)
    this.unseenScannedJobs += 1
  }
  
  onScanned($event: any){
    console.log($event);
  }
  
  onSwitchedToQRScan(){
    this.isScanByCamera = !this.isScanByCamera
  }
}
