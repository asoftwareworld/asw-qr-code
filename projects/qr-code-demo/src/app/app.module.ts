import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AswQrCodeModule } from 'projects/qr-code/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AswQrCodeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
