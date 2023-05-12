import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { WarehouseJobsInfoComponent } from './components/warehouse-jobs-info/warehouse-jobs-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { QRscannerComponent } from './components/qrscanner/qrscanner.component';
import {MatBadgeModule} from '@angular/material/badge';
import { JobsShowModalComponent } from './components/jobs-show-modal/jobs-show-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        JobsShowModalComponent
    ],
    providers: [provideAnimations(), {
        provide: "API_BASE_URL", useValue: environment.baseUrl
    }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        WarehouseJobsInfoComponent,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        QRscannerComponent,
        MatBadgeModule,
        MatDialogModule,
        CommonModule
    ]
})
export class AppModule { }
