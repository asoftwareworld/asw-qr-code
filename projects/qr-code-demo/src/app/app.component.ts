import { Component } from '@angular/core';
import { AswQrcodeErrorCorrectionLevel } from 'projects/qr-code/src/lib/enum/qr-code-type';

@Component({
    selector: 'asw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'qr-code-demo';
    value = 'https://asoftwareworld.com/';
    size = 180;
    errorCorrectionLevel = AswQrcodeErrorCorrectionLevel.LOW;
    centerImageSrc = 'https://angular.io/assets/images/logos/angular/angular.png';
    centerImageSize = 180;
}
