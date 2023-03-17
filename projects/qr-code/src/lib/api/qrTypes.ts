/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { TypeNumber } from '../types/type';

interface TypesMap {
    [key: number]: TypeNumber;
}

const qrTypes: TypesMap = {};

for (let type = 0; type <= 40; type++) {
    qrTypes[type] = type as TypeNumber;
}

// 0 types is autodetect

// types = {
//     0: 0,
//     1: 1,
//     ...
//     40: 40
// }

export default qrTypes;
