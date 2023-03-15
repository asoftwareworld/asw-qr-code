/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
export interface UnknownObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export type MiddleShapeType = 'circle' | 'rounded' | 'smooth' | 'smooth-rounded' | 'square' | 'thin-rounded';
export type CornerInnerShapeType = 'circle' | 'square';
export type CornerOuterShapeType = 'circle' | 'square' | 'rounded';
export type Extension = 'svg' | 'png' | 'jpeg' | 'webp';
export type GradientType = 'radial' | 'linear';
export type DrawType = 'canvas' | 'svg';

export type Gradient = {
    type: GradientType;
    rotation?: number;
    colorStops: {
        offset: number;
        color: string;
    }[];
};

export interface MiddleShapeTypes {
    [key: string]: MiddleShapeType;
}

export interface GradientTypes {
    [key: string]: GradientType;
}

export interface CornerInnerShapeTypes {
    [key: string]: CornerInnerShapeType;
}

export interface CornerOuterShapeTypes {
    [key: string]: CornerOuterShapeType;
}

export interface DrawTypes {
    [key: string]: DrawType;
}

export interface Density {
    typeNumber?: TypeNumber;
    mode?: Mode;
    errorCorrectionLevel?: ErrorCorrectionLevel;
}

export interface LogoStyle {
    hideBackgroundCircle?: boolean;
    logoSize?: number;
    crossOrigin?: string;
    logoMargin?: number;
}

export interface CornerOuterShape {
    type?: CornerOuterShapeType;
    color?: string;
}

export interface CornerInnerShape {
    type?: CornerInnerShapeType;
    color?: string;
}

export interface MiddleShape {
    type?: MiddleShapeType;
    color?: string;
}

export type TypeNumber =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40;

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type Mode = 'Numeric' | 'Alphanumeric' | 'Byte' | 'Kanji';
export interface QRCode {
    addData(data: string, mode?: Mode): void;
    make(): void;
    getModuleCount(): number;
    isDark(row: number, col: number): boolean;
    createImgTag(cellSize?: number, margin?: number): string;
    createSvgTag(cellSize?: number, margin?: number): string;
    createSvgTag(opts?: { cellSize?: number; margin?: number; scalable?: boolean }): string;
    createDataURL(cellSize?: number, margin?: number): string;
    createTableTag(cellSize?: number, margin?: number): string;
    createASCII(cellSize?: number, margin?: number): string;
    renderTo2dContext(context: CanvasRenderingContext2D, cellSize?: number): void;
}

export type Options = {
    type?: DrawType;
    width?: number;
    height?: number;
    outerMargin?: number;
    data?: string;
    logo?: string;
    density?: {
        typeNumber?: TypeNumber;
        mode?: Mode;
        errorCorrectionLevel?: ErrorCorrectionLevel;
    };
    logoStyle?: {
        hideBackgroundCircle?: boolean;
        logoSize?: number;
        crossOrigin?: string;
        logoMargin?: number;
    };
    middleShape?: {
        type?: MiddleShapeType;
        color?: string;
        gradient?: Gradient;
    };
    cornerOuterShape?: {
        type?: CornerOuterShapeType;
        color?: string;
        gradient?: Gradient;
    };
    cornerInnerShape?: {
        type?: CornerInnerShapeType;
        color?: string;
        gradient?: Gradient;
    };
    backgroundStyle?: {
        color?: string;
        gradient?: Gradient;
    };
};

export type FilterFunction = (i: number, j: number) => boolean;

export type DownloadOptions = {
    name?: string;
    extension?: Extension;
};

export type DrawArgs = {
    x: number;
    y: number;
    size: number;
    rotation?: number;
    getNeighbor?: GetNeighbor;
};

export type BasicFigureDrawArgs = {
    x: number;
    y: number;
    size: number;
    rotation?: number;
};

export type RotateFigureArgs = {
    x: number;
    y: number;
    size: number;
    rotation?: number;
    draw: () => void;
};

export type DrawArgsCanvas = DrawArgs & {
    context: CanvasRenderingContext2D;
};

export type BasicFigureDrawArgsCanvas = BasicFigureDrawArgs & {
    context: CanvasRenderingContext2D;
};

export type RotateFigureArgsCanvas = RotateFigureArgs & {
    context: CanvasRenderingContext2D;
};

export type GetNeighbor = (x: number, y: number) => boolean;
