/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import AswQrCodeMaker from './core/qr-code-maker';
import { CornerInnerShape, CornerOuterShape, Density, DownloadOptions, DrawType, LogoStyle, MiddleShape } from './types/type';


@Component({
    selector: 'asw-qr-code',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div id="aswQRCodeElement-{{uniqueId}}"></div>`,
})
export class AswQrCodeComponent implements OnChanges, AfterViewInit {
    uniqueId = new Date().getTime();
    @Input() type?: DrawType = 'canvas';
    @Input() width?: number = 200;
    @Input() height?: number = 200;
    @Input() outerMargin?: number = 0;
    @Input() qrData: string = '';
    @Input() public logo?: string;
    @Input() public allowEmptyString = false;
    @Input() density?: Density = {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
    };
    @Input() logoStyle?: LogoStyle = {
        hideBackgroundCircle: true,
        logoSize: 0.4,
        logoMargin: 20,
        crossOrigin: 'anonymous',
    };
    @Input() middleShape?: MiddleShape = {
        color: '#000',
        type: 'smooth'
    };
    @Input() backgroundColor? = '#fff';
    @Input() cornerInnerShape?: CornerInnerShape = {
        color: '#000',
    };
    @Input() cornerOuterShape?: CornerOuterShape = {
        color: '#000',
    };

    private config: any

    viewInitialized = true;
    @Output() qrCodeURL = new EventEmitter<SafeUrl>();

    constructor(@Inject(DOCUMENT) private document: Document, private sanitizer: DomSanitizer) { }

    async ngOnChanges(): Promise<void> {
        if (this.viewInitialized) {
            return;
        }
        await this.createQRCode();
    }

    async ngAfterViewInit(): Promise<void> {
        this.config = new AswQrCodeMaker({
            height: this.height,
            outerMargin: this.outerMargin,
            width: this.width,
            logo: this.logo,
            type: this.type,
            data: this.qrData,
            density: this.density,
            logoStyle: this.logoStyle,
            middleShape: this.middleShape,
            backgroundStyle: {
                color: this.backgroundColor
            }
        });
        await this.createQRCode();
    }

    protected isValidQrCodeText(data: string | null): boolean {
        if (this.allowEmptyString === false) {
            return !(
                typeof data === 'undefined' ||
                data === '' ||
                data === 'null' ||
                data === null
            )
        }
        return !(typeof data === 'undefined')
    }

    private async createQRCode(): Promise<void> {
        // Set sensitive defaults
        if (this.density?.typeNumber && this.density.typeNumber > 40) {
            console.warn('[asw-qr-code] max value for `typeNumber` is 40')
            this.density.typeNumber = 40
        } else if (this.density?.typeNumber && this.density.typeNumber < 1) {
            console.warn('[asw-qr-code]`min value for `typeNumber` is 1')
            this.density.typeNumber = 1
        } else if (this.density?.typeNumber !== undefined && isNaN(this.density.typeNumber)) {
            console.warn(
                '[asw-qr-code] typeNumber should be a number, defaulting to auto.'
            )
            this.density.typeNumber = undefined
        }
        try {
            if (!this.isValidQrCodeText(this.qrData)) {
                throw new Error(
                    "[asw-qr-code] Field `qrdata` is empty, set 'allowEmptyString=\"true\"' to overwrite this behaviour."
                )
            }

            // This is a workaround to allow an empty string as qrdata
            if (this.isValidQrCodeText(this.qrData) && this.qrData === '') {
                this.qrData = ' '
            }
            this.config.update({
                height: this.height,
                outerMargin: this.outerMargin,
                width: this.width,
                type: this.type,
                logo: this.logo,
                data: this.qrData,
                density: this.density,
                logoStyle: this.logoStyle,
                middleShape: this.middleShape,
                backgroundStyle: {
                    color: this.backgroundColor
                },
                cornerInnerShape: this.cornerInnerShape,
                cornerOuterShape: this.cornerOuterShape
            });
            if (this.viewInitialized) {
                this.viewInitialized = false;
                const container: any = this.document.getElementById('aswQRCodeElement-' + this.uniqueId);
                this.config.append(container);
            }
        } catch (e: any) {
            console.error('[asw-qr-code] Error generating QR Code:', e.message)
        }
    }

    download(downloadOptions?: Partial<DownloadOptions> | string): void {
        this.config.download(downloadOptions);
    }
}
