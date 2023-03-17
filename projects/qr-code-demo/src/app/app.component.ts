/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MiddleShape, CornerInnerShape, CornerOuterShape, LogoStyle, Density } from '@asoftwareworld/qrcode';

@Component({
    selector: 'asw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    currentDate: Date = new Date();
    title = 'ASW QR Code Demo';
    option: any;
    drawTpes = [
        { label: 'SVG', value: 'svg' },
        { label: 'Canvas', value: 'canvas' },
    ];
    density: Density = {
        errorCorrectionLevel: 'Q',
        mode: 'Byte',
        typeNumber: 0
    };

    logoStyle: LogoStyle = {
        hideBackgroundCircle: true,
        logoSize: 0.3,
        logoMargin: 0
    };

    backgroundColor = '#ffffff';

    middleShape: MiddleShape = {
        color: '#000',
        type: 'circle'
    };

    cornerInnerShape: CornerInnerShape = {
        color: '#000',
        type: 'circle'
    };

    cornerOuterShape: CornerOuterShape = {
        color: '#000',
        type: 'rounded'
    };
    public qrdata = 'https://asoftwareworld.com';
    value = 0.4;
    cornerOuterShapeColor = '#000000';
    cornerInnerShapeColor = '#000000';
    middleShapeColor = '#000000';
    errorCorrectionLevels = ['L', 'M', 'Q', 'H'];
    modes = ['Numeric', 'Alphanumeric', 'Byte', 'Kanji'];
    middleShapeTypes = [
        { label: 'Circle', value: 'circle' },
        { label: 'Rounded', value: 'rounded' },
        { label: 'Smooth', value: 'smooth' },
        { label: 'Smooth Rounded', value: 'smooth-rounded' },
        { label: 'Square', value: 'square' },
        { label: 'Thin Rounded', value: 'thin-rounded' }
    ];
    cornerInnerShapeTypes = [
        { label: 'None', value: '' },
        { label: 'Circle', value: 'circle' },
        { label: 'Square', value: 'square' }
    ];
    cornerOuterShapeTypes = [
        { label: 'None', value: '' },
        { label: 'Circle', value: 'circle' },
        { label: 'Square', value: 'square' },
        { label: 'Rounded', value: 'rounded' }
    ];
    aswQrCodeSettingForm!: FormGroup;
    aswDensityForm!: FormGroup;
    aswQrLogoStyleForm!: FormGroup;
    aswMiddleShapeForm!: FormGroup;
    aswCornerInnerShapeForm!: FormGroup;
    aswCornerOuterShapeForm!: FormGroup;
    constructor(private formBuilder: FormBuilder){}
    image = '';

    ngOnInit(): void {
        this.option = {
            width: 200,
            height: 200,
            type: 'canvas',
            logo: this.image,
            data: this.qrdata,
            outerMargin: 0,
            density: this.density,
            backgroundColor: this.backgroundColor,
            logoStyle: this.logoStyle,
            cornerInnerShape: this.cornerInnerShape,
            cornerOuterShape: this.cornerOuterShape,
            middleShape: this.middleShape
        };
        this.validateFormBuilder();
        this.aswQrCodeSettingForm.valueChanges.subscribe(val => {
            if (this.aswQrCodeSettingForm.invalid) {
                return;
            }
            this.option.width = val.width;
            this.option.height = val.height;
            this.option.outerMargin = val.outerMargin;
            this.option.type = val.type;
            this.option.data = val.data;
        });
        this.aswQrLogoStyleForm.valueChanges.subscribe(val => {
            if (this.aswQrLogoStyleForm.invalid) {
                return;
            }
            this.option.logoStyle = val;
        });
        this.aswDensityForm.valueChanges.subscribe(val => {
            if (this.aswQrLogoStyleForm.invalid) {
                return;
            }
            this.option.density = val;
        });
        this.aswMiddleShapeForm.valueChanges.subscribe(val => {
            if (this.aswMiddleShapeForm.invalid) {
                return;
            }
            this.option.middleShape = {
                color: this.middleShapeColor,
                type: val.type
            }
        });
        this.aswCornerInnerShapeForm.valueChanges.subscribe(val => {
            if (this.aswCornerInnerShapeForm.invalid) {
                return;
            }
            this.option.cornerInnerShape = {
                color: this.cornerInnerShapeColor,
                type: val.type
            }
        });
        this.aswCornerOuterShapeForm.valueChanges.subscribe(val => {
            if (this.aswCornerOuterShapeForm.invalid) {
                return;
            }
            this.option.cornerOuterShape = {
                color: this.cornerOuterShapeColor,
                type: val.type
            }
        });
    }

    validateFormBuilder(): void {
        this.aswQrCodeSettingForm = this.formBuilder.group({
            width: [200, [Validators.required]],
            height: [200, [Validators.required]],
            outerMargin: [0],
            type: ['canvas'],
            data: ['']
        });
        this.aswDensityForm = this.formBuilder.group({
            typeNumber: [0, [Validators.required]],
            mode: ['Byte', [Validators.required]],
            errorCorrectionLevel: ['Q']
        });
        this.aswQrLogoStyleForm = this.formBuilder.group({
            hideBackgroundCircle: [true],
            logoSize: [0.4, [Validators.required]],
            logoMargin: [0]
        });
        this.aswMiddleShapeForm = this.formBuilder.group({
            type: ['circle'],
            color: ['#fff']
        });
        this.aswCornerInnerShapeForm = this.formBuilder.group({
            type: ['circle'],
            color: ['#fff']
        });
        this.aswCornerOuterShapeForm = this.formBuilder.group({
            type: ['circle'],
            color: ['#fff']
        });
    }

    middleShapeColorChange(): void {
        this.option.middleShape = {
            color: this.middleShapeColor,
            type: this.aswMiddleShapeForm.value.type
        };
    }

    cornerInnerShapeColorChange(): void {
        this.option.cornerInnerShape = {
            color: this.cornerInnerShapeColor,
            type: this.aswCornerInnerShapeForm.value.type
        }
    }

    cornerOuterShapeColorChange(): void {
        this.option.cornerOuterShape = {
            color: this.cornerOuterShapeColor,
            type: this.aswCornerOuterShapeForm.value.type
        };
    }

    backgroundColorChange(): void {
        this.option.backgroundColor = this.backgroundColor;
    }
    insertImage(url: string): void {
        this.option.logo = url;
    }
}