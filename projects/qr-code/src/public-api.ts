/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

export * from './lib/qr-code.component';
export * from './lib/qr-code.module';

import AswQrCodeMaker from './lib/core/qr-code-maker';
import middleShapeTypes from './lib/api/middleShapeTypes';
import cornerInnerShapeTypes from './lib/api/cornerInnerShapeTypes';
import cornerOuterShapeTypes from './lib/api/cornerOuterShapeTypes';
import errorCorrectionLevels from './lib/api/errorCorrectionLevels';
import errorCorrectionPercents from './lib/api/errorCorrectionPercents';
import modes from './lib/api/modes';
import qrTypes from './lib/api/qrTypes';
import drawTypes from './lib/api/drawTypes';

export * from './lib/types/type';

export {
    middleShapeTypes,
    cornerInnerShapeTypes,
    cornerOuterShapeTypes,
    errorCorrectionLevels,
    errorCorrectionPercents,
    modes,
    qrTypes,
    drawTypes
};

export default AswQrCodeMaker;
