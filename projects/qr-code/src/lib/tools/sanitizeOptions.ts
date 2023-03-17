/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import { RequiredSettings } from '../core/qr-options';
import { Gradient } from '../types/type';

function sanitizeGradient(gradient: Gradient): Gradient {
    const newGradient = { ...gradient };

    if (!newGradient.colorStops || !newGradient.colorStops.length) {
        throw "Field 'colorStops' is required in gradient";
    }

    if (newGradient.rotation) {
        newGradient.rotation = Number(newGradient.rotation);
    } else {
        newGradient.rotation = 0;
    }

    newGradient.colorStops = newGradient.colorStops.map((colorStop: { offset: number; color: string }) => ({
        ...colorStop,
        offset: Number(colorStop.offset)
    }));

    return newGradient;
}

export default function sanitizeOptions(options: RequiredSettings): RequiredSettings {
    const newOptions = { ...options };

    newOptions.width = Number(newOptions.width);
    newOptions.height = Number(newOptions.height);
    newOptions.outerMargin = Number(newOptions.outerMargin);
    newOptions.logoStyle = {
        ...newOptions.logoStyle,
        hideBackgroundCircle: Boolean(newOptions.logoStyle.hideBackgroundCircle),
        logoSize: Number(newOptions.logoStyle.logoSize),
        logoMargin: Number(newOptions.logoStyle.logoMargin)
    };

    if (newOptions.outerMargin > Math.min(newOptions.width, newOptions.height)) {
        newOptions.outerMargin = Math.min(newOptions.width, newOptions.height);
    }

    newOptions.middleShape = {
        ...newOptions.middleShape
    };
    if (newOptions.middleShape.gradient) {
        newOptions.middleShape.gradient = sanitizeGradient(newOptions.middleShape.gradient);
    }

    if (newOptions.cornerOuterShape) {
        newOptions.cornerOuterShape = {
            ...newOptions.cornerOuterShape
        };
        if (newOptions.cornerOuterShape.gradient) {
            newOptions.cornerOuterShape.gradient = sanitizeGradient(newOptions.cornerOuterShape.gradient);
        }
    }

    if (newOptions.cornerInnerShape) {
        newOptions.cornerInnerShape = {
            ...newOptions.cornerInnerShape
        };
        if (newOptions.cornerInnerShape.gradient) {
            newOptions.cornerInnerShape.gradient = sanitizeGradient(newOptions.cornerInnerShape.gradient);
        }
    }

    if (newOptions.backgroundStyle) {
        newOptions.backgroundStyle = {
            ...newOptions.backgroundStyle
        };
        if (newOptions.backgroundStyle.gradient) {
            newOptions.backgroundStyle.gradient = sanitizeGradient(newOptions.backgroundStyle.gradient);
        }
    }

    return newOptions;
}
