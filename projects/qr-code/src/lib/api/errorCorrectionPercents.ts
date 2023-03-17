/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
interface ErrorCorrectionPercents {
    [key: string]: number;
}

export default {
    L: 0.07,
    M: 0.15,
    Q: 0.25,
    H: 0.3
} as ErrorCorrectionPercents;
