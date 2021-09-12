/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Component } from '@angular/core';
import { AswQrcodeErrorCorrectionLevel } from '@asoftwareworld/qrcode';

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
    centerImageSize = 50;
}
