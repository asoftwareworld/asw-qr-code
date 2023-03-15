/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import qrTypes from '../api/qrTypes';
import drawTypes from '../api/drawTypes';
import errorCorrectionLevels from '../api/errorCorrectionLevels';
import { MiddleShapeType, Options, TypeNumber, ErrorCorrectionLevel, Mode, DrawType, Gradient } from '../types/type';

export interface RequiredSettings extends Options {
    type: DrawType;
    width: number;
    height: number;
    outerMargin: number;
    data: string;
    density: {
        typeNumber: TypeNumber;
        mode?: Mode;
        errorCorrectionLevel: ErrorCorrectionLevel;
    };
    logoStyle: {
        hideBackgroundCircle: boolean;
        logoSize: number;
        crossOrigin?: string;
        logoMargin: number;
    };
    middleShape: {
        type: MiddleShapeType;
        color: string;
        gradient?: Gradient;
    };
    backgroundStyle: {
        color: string;
        gradient?: Gradient;
    };
}

const defaultSettings: RequiredSettings = {
    type: drawTypes['canvas'],
    width: 300,
    height: 300,
    data: '',
    outerMargin: 0,
    density: {
        typeNumber: qrTypes[0],
        mode: undefined,
        errorCorrectionLevel: errorCorrectionLevels['Q']
    },
    logoStyle: {
        hideBackgroundCircle: true,
        logoSize: 0.4,
        crossOrigin: undefined,
        logoMargin: 0
    },
    middleShape: {
        type: 'square',
        color: '#000'
    },
    backgroundStyle: {
        color: '#fff'
    }
};

export default defaultSettings;
