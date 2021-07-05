/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { TestBed } from '@angular/core/testing';

import { QrCodeService } from './qr-code.service';

describe('QrCodeService', () => {
    let service: QrCodeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(QrCodeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
