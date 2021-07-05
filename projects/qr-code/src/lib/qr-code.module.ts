/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AswQrCodeComponent } from './qr-code.component';

@NgModule({
    declarations: [
        AswQrCodeComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AswQrCodeComponent
    ]
})
export class AswQrCodeModule { }
