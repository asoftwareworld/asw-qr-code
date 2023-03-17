/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { Mode } from '../types/type';

interface Modes {
    [key: string]: Mode;
}

export default {
    numeric: 'Numeric',
    alphanumeric: 'Alphanumeric',
    byte: 'Byte',
    kanji: 'Kanji'
} as Modes;
