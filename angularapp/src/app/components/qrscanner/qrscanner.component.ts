import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-qrscanner',
  standalone: true,
  imports: [
    CommonModule,ZXingScannerModule,
    MatCardModule,
  ],
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.css']
})
export class QRscannerComponent {
  @Output('ScanQRCode')
  ScanQrCode = new EventEmitter();

  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];

  onScanned(scannedString: string){
    if (scannedString.length === 0) {
      console.log('Qr code string is empty');
      return;
    }
    this.ScanQrCode.emit(scannedString)
  }

}
