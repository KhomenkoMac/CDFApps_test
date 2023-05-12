import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, map, tap, switchMap, catchError } from 'rxjs';
import { WarehouseJobsInfoService } from './warehouse-jobs-info.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import {MatCardModule} from '@angular/material/card';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from "@angular/forms";



@Component({
  selector: 'snack-bar-component-example-snack',
  template: '<span class="example-pizza-party"></span>',
  styles: [
    `
    .example-pizza-party {
      color: #96e6b3;
    }
  `,
  ],
})
export class PizzaPartyComponent {}

@Component({
  selector: 'app-warehouse-jobs-info',
  standalone: true,
  imports: [CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatTableModule, 
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule],
  templateUrl: './warehouse-jobs-info.component.html',
  styleUrls: ['./warehouse-jobs-info.component.scss']
})
export class  WarehouseJobsInfoComponent implements OnInit{
  constructor(
    private readonly _warehouseJobsService: WarehouseJobsInfoService,
    private _snackBar: MatSnackBar) {   
  }

  displayedColumns: string[] = ['#', 'Warehouse job reference', 'Box reference', 'Condition'];
  boxConditions: BoxCondition[] = [
    { viewValue: 'Good', value: 'good'},
    { viewValue: 'Broken', value: 'broken'}
  ]

  dataSource = new MatTableDataSource<ScannedBoxElement>();
  clickedRows = new Set<ScannedBoxElement>();

  selectedRow?: ScannedBoxElement 
  
  boxReference = new FormControl('')

  @Output('SwitchedToQRScan')
  switchedToQRScan = new EventEmitter();

  @Output('JobFullyScanned')
  JobFullyScanned = new EventEmitter<string>();

  ngOnInit(): void {
    
  }

  durationInSeconds = 5;
  openSnackBar(message: string) {
    this._snackBar.open(`Scanned QR-code value: ${message}`, 'Ok', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  onSubmit(){
    if (this.boxReference.value == '') {
      return
    }
    this.receiveBox()
  }

  onClickedScan(){
    this.switchedToQRScan.emit()
  }

  onSubmitByCamera(scannedQrString: string){
    console.log('onSubmitByCamera');
    
    this.parseQrCodeString(scannedQrString)
    this.boxReference.setValue(scannedQrString)
    this.openSnackBar(scannedQrString)
  }

  onSelected(row: ScannedBoxElement){
    console.log(row);
    this.selectedRow = row
  }

  onUpdateBoxCondition(){
    this._warehouseJobsService
    .updateBoxCondition(this.selectedRow!.boxReference, this.selectedRow!.condition).subscribe(x=>{
      console.log(x);
      
    })
  }

  private parseQrCodeString(rawQrString: string): string{
    return 'fake'
  }
  
  private receiveBox(): void {
    this._warehouseJobsService.markBoxAsReceived(this.boxReference.value!)
    .pipe(
      filter(value=> value && value !== undefined),
      tap(value=> {
        if (value && value.isReceived) {
          this.JobFullyScanned.emit(value.jobNumber)  
        }
      }),
      map((value)=> { 
        console.log(value);
        return <ScannedBoxElement> {
          boxReference: this.boxReference.value!,
          warehouseJobReference: value.jobNumber,
          condition: 'good'
        };
      }),
      tap(_ => {
        this.boxReference.reset()
      }),
    )
    .subscribe(value=> {
      value.number = this.dataSource.data.length + 1
      this.dataSource = new MatTableDataSource<ScannedBoxElement>([...this.dataSource.data, value])
    })
  }

}


export interface ScannedBoxElement{
  number: number
  warehouseJobReference: string 
  boxReference: string
  condition: string,
  conditionChanged: boolean
}


interface BoxCondition {
  value: string;
  viewValue: string;
}
