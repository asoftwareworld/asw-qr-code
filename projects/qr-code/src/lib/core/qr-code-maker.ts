/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import getMode from '../tools/getMode';
import mergeDeep from '../tools/merge';
import downloadURI from '../tools/downloadURI';
import AswQrCanvas from './qr-canvas';
import AswQrSVG from './qr-svg';
import drawTypes from '../api/drawTypes';

import defaultOptions, { RequiredSettings } from './qr-options';
import sanitizeOptions from '../tools/sanitizeOptions';
import { Extension, QRCode, Options, DownloadOptions } from '../types/type';
import qrcode from 'qrcode-generator';

export default class AswQrCodeMaker {
    _options: RequiredSettings;
    _container?: HTMLElement;
    _canvas?: AswQrCanvas;
    _svg?: AswQrSVG;
    _qr?: QRCode | any;
    _canvasDrawingPromise?: Promise<void>;
    _svgDrawingPromise?: Promise<void>;

    constructor(options?: Partial<Options>) {
        this._options = options ? sanitizeOptions(mergeDeep(defaultOptions, options) as RequiredSettings) : defaultOptions;
        this.update();
    }

    static _clearContainer(container?: HTMLElement): void {
        if (container) {
            container.innerHTML = '';
        }
    }

    async _getQRStylingElement(extension: Extension = 'png'): Promise<AswQrCanvas | AswQrSVG> {
        if (!this._qr) throw 'QR code is empty';

        if (extension.toLowerCase() === 'svg') {
            let promise, svg: AswQrSVG;

            if (this._svg && this._svgDrawingPromise) {
                svg = this._svg;
                promise = this._svgDrawingPromise;
            } else {
                svg = new AswQrSVG(this._options);
                promise = svg.drawQR(this._qr);
            }

            await promise;

            return svg;
        } else {
            let promise, canvas: AswQrCanvas;

            if (this._canvas && this._canvasDrawingPromise) {
                canvas = this._canvas;
                promise = this._canvasDrawingPromise;
            } else {
                canvas = new AswQrCanvas(this._options);
                promise = canvas.drawQR(this._qr);
            }

            await promise;

            return canvas;
        }
    }

    update(options?: Partial<Options>): void {
        AswQrCodeMaker._clearContainer(this._container);
        this._options = options ? sanitizeOptions(mergeDeep(this._options, options) as RequiredSettings) : this._options;

        if (!this._options.data) {
            return;
        }

        qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
        this._qr = qrcode(this._options.density.typeNumber, this._options.density.errorCorrectionLevel);
        this._qr.addData(this._options.data, this._options.density.mode || getMode(this._options.data));
        this._qr.make();

        if (this._options.type === drawTypes['canvas']) {
            this._canvas = new AswQrCanvas(this._options);
            this._canvasDrawingPromise = this._canvas.drawQR(this._qr);
            this._svgDrawingPromise = undefined;
            this._svg = undefined;
        } else {
            this._svg = new AswQrSVG(this._options);
            this._svgDrawingPromise = this._svg.drawQR(this._qr);
            this._canvasDrawingPromise = undefined;
            this._canvas = undefined;
        }

        this.append(this._container);
    }

    append(container?: HTMLElement): void {
        if (!container) {
            return;
        }

        if (typeof container.appendChild !== 'function') {
            throw 'Container should be a single DOM node';
        }

        if (this._options.type === drawTypes['canvas']) {
            if (this._canvas) {
                container.appendChild(this._canvas.getCanvas());
            }
        } else {
            if (this._svg) {
                container.appendChild(this._svg.getElement());
            }
        }

        this._container = container;
    }

    async getRawData(extension: Extension = 'png'): Promise<Blob | null> {
        if (!this._qr) throw 'QR code is empty';
        const element = await this._getQRStylingElement(extension);

        if (extension.toLowerCase() === 'svg') {
            const serializer = new XMLSerializer();
            const source = serializer.serializeToString(((element as unknown) as AswQrSVG).getElement());

            return new Blob(["<?xml version='1.0' standalone='no'?>\r\n'" + source], { type: 'image/svg+xml' });
        } else {
            return new Promise((resolve) =>
                ((element as unknown) as AswQrCanvas).getCanvas().toBlob(resolve, `image/${extension}`, 1)
            );
        }
    }

    async download(downloadOptions?: Partial<DownloadOptions> | string): Promise<void> {
        if (!this._qr) throw 'QR code is empty';
        let extension = 'png' as Extension;
        let name = 'qr';

        //TODO remove deprecated code in the v2
        if (typeof downloadOptions === 'string') {
            extension = downloadOptions as Extension;
            console.warn(
                "Extension is deprecated as argument for 'download' method, please pass object { name: '...', extension: '...' } as argument"
            );
        } else if (typeof downloadOptions === 'object' && downloadOptions !== null) {
            if (downloadOptions.name) {
                name = downloadOptions.name;
            }
            if (downloadOptions.extension) {
                extension = downloadOptions.extension;
            }
        }

        const element = await this._getQRStylingElement(extension);

        if (extension.toLowerCase() === 'svg') {
            const serializer = new XMLSerializer();
            let source = serializer.serializeToString(((element as unknown) as AswQrSVG).getElement());

            source = "<?xml version='1.0' standalone='no'?>\r\n" + source;
            const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
            downloadURI(url, `${name}.svg`);
        } else {
            const url = ((element as unknown) as AswQrCanvas).getCanvas().toDataURL(`image/${extension}`);
            downloadURI(url, `${name}.${extension}`);
        }
    }
}
