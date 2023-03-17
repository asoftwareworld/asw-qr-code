/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { ErrorCorrectionLevel } from '../types/type';

interface ErrorCorrectionLevels {
    [key: string]: ErrorCorrectionLevel;
}

export default {
    L: 'L',
    M: 'M',
    Q: 'Q',
    H: 'H'
} as ErrorCorrectionLevels;
