/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import modes from '../api/modes';
import { Mode } from '../types/type';

export default function getMode(data: string): Mode {
    switch (true) {
        case /^[0-9]*$/.test(data):
            return modes['numeric'];
        case /^[0-9A-Z $%*+\-./:]*$/.test(data):
            return modes['alphanumeric'];
        default:
            return modes['byte'];
    }
}
