/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import { AswQrcodeErrorCorrectionLevel } from './enum/qr-code-type';
import { QrCodeConstant } from './qr-code-constant';
import * as QRCode from 'qrcode';

@Component({
    selector: 'asw-qr-code',
    template: `<canvas #aswQrCode class="aclass"></canvas >`
})
export class QrCodeComponent implements AfterViewInit {

    @ViewChild('aswQrCode') aswQrCode!: ElementRef<HTMLCanvasElement>;

    @Input() value: string = QrCodeConstant.value;
    @Input() size?: number;
    @Input() errorCorrectionLevel: AswQrcodeErrorCorrectionLevel = AswQrcodeErrorCorrectionLevel.MEDIUM;
    @Input() centerImageSrc?: string;
    @Input() centerImageWidth?: number | string;
    @Input() centerImageHeight?: number | string;
    @Input() centerImageSize: string | number = QrCodeConstant.centerImageSize;
    @Input() colorDark = QrCodeConstant.colorDark;
    @Input() colorLight = QrCodeConstant.colorLight;
    @Input() version?: number;
    private centerImage?: HTMLImageElement;


    constructor() { }

    ngAfterViewInit(): void {
        this.createQrCode();
    }

    createQrCode(): void {
        if (!this.value) {
            return;
        }
        const canvas = this.aswQrCode.nativeElement;
        if (!canvas) {
            // native element not available on server side rendering
            return;
        }
        const context = canvas.getContext('2d');

        if (context) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
        this.toCanvas(canvas);
        this.setCenterImage(canvas, context);
    }

    private setCenterImage(canvas: any, context: any): void {
        const centerImageSrc = this.centerImageSrc;
        const centerImageWidth = this.getDefaultValue(this.centerImageWidth, QrCodeConstant.centerImageSize);
        const centerImageHeight = this.getDefaultValue(this.centerImageHeight, QrCodeConstant.centerImageSize);
        if (centerImageSrc && context) {

            if (!this.centerImage) {
                this.centerImage = new Image(centerImageWidth, centerImageHeight);
            }

            if (centerImageSrc !== this.centerImage?.src) {
                this.centerImage.src = centerImageSrc;
            }

            if (centerImageWidth !== this.centerImage.width) {
                this.centerImage.width = centerImageWidth;
            }

            if (centerImageHeight !== this.centerImage.height) {
                this.centerImage.height = centerImageHeight;
            }

            const centerImage = this.centerImage;

            centerImage.onload = () => {
                context.drawImage(
                    centerImage,
                    canvas.width / 2 - centerImageWidth / 2,
                    canvas.height / 2 - centerImageHeight / 2, centerImageWidth, centerImageHeight,
                );
            };
        }
    }

    private toCanvas(canvas: any): Promise<any> {
        return QRCode.toCanvas(canvas, this.value, {
            version: this.version,
            errorCorrectionLevel: this.errorCorrectionLevel,
            width: this.size,
            color: {
                dark: this.colorDark,
                light: this.colorLight
            }
        });
    }

    private getDefaultValue(value: string | number | undefined, defaultValue: number): number {
        if (!value) {
            return defaultValue;
        }

        if (typeof value === 'string') {
            return parseInt(value, 10);
        }

        return value;
    }

}
