/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AswQrCodeComponent } from './qr-code.component';

describe('AswQrCodeComponent', () => {
    let component: AswQrCodeComponent;
    let fixture: ComponentFixture<AswQrCodeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AswQrCodeComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AswQrCodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
