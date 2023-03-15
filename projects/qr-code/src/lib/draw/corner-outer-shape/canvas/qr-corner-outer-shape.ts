/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import cornerOuterShapeTypes from '../../../api/cornerOuterShapeTypes';
import { CornerOuterShapeType, RotateFigureArgsCanvas, BasicFigureDrawArgsCanvas, DrawArgsCanvas } from '../../../types/type';

export default class QRCornerOuterShape {
    _context: CanvasRenderingContext2D;
    _type: CornerOuterShapeType;

    constructor({ context, type }: { context: CanvasRenderingContext2D; type: CornerOuterShapeType }) {
        this._context = context;
        this._type = type;
    }

    draw(x: number, y: number, size: number, rotation: number): void {
        const context = this._context;
        const type = this._type;
        let drawFunction;

        switch (type) {
            case cornerOuterShapeTypes['square']:
                drawFunction = this._drawSquare;
                break;
            case cornerOuterShapeTypes['rounded']:
                drawFunction = this._drawRounded;
                break;
            case cornerOuterShapeTypes['circle']:
            default:
                drawFunction = this._drawCircle;
        }

        drawFunction.call(this, { x, y, size, context, rotation });
    }

    _rotateFigure({ x, y, size, context, rotation = 0, draw }: RotateFigureArgsCanvas): void {
        const cx = x + size / 2;
        const cy = y + size / 2;

        context.translate(cx, cy);
        rotation && context.rotate(rotation);
        draw();
        context.closePath();
        rotation && context.rotate(-rotation);
        context.translate(-cx, -cy);
    }

    _basicCircle(args: BasicFigureDrawArgsCanvas): void {
        const { size, context } = args;
        const dotSize = size / 7;

        this._rotateFigure({
            ...args,
            draw: () => {
                context.arc(0, 0, size / 2, 0, Math.PI * 2);
                context.arc(0, 0, size / 2 - dotSize, 0, Math.PI * 2);
            }
        });
    }

    _basicSquare(args: BasicFigureDrawArgsCanvas): void {
        const { size, context } = args;
        const dotSize = size / 7;

        this._rotateFigure({
            ...args,
            draw: () => {
                context.rect(-size / 2, -size / 2, size, size);
                context.rect(-size / 2 + dotSize, -size / 2 + dotSize, size - 2 * dotSize, size - 2 * dotSize);
            }
        });
    }

    _basicRounded(args: BasicFigureDrawArgsCanvas): void {
        const { size, context } = args;
        const dotSize = size / 7;

        this._rotateFigure({
            ...args,
            draw: () => {
                context.arc(-dotSize, -dotSize, 2.5 * dotSize, Math.PI, -Math.PI / 2);
                context.lineTo(dotSize, -3.5 * dotSize);
                context.arc(dotSize, -dotSize, 2.5 * dotSize, -Math.PI / 2, 0);
                context.lineTo(3.5 * dotSize, -dotSize);
                context.arc(dotSize, dotSize, 2.5 * dotSize, 0, Math.PI / 2);
                context.lineTo(-dotSize, 3.5 * dotSize);
                context.arc(-dotSize, dotSize, 2.5 * dotSize, Math.PI / 2, Math.PI);
                context.lineTo(-3.5 * dotSize, -dotSize);

                context.arc(-dotSize, -dotSize, 1.5 * dotSize, Math.PI, -Math.PI / 2);
                context.lineTo(dotSize, -2.5 * dotSize);
                context.arc(dotSize, -dotSize, 1.5 * dotSize, -Math.PI / 2, 0);
                context.lineTo(2.5 * dotSize, -dotSize);
                context.arc(dotSize, dotSize, 1.5 * dotSize, 0, Math.PI / 2);
                context.lineTo(-dotSize, 2.5 * dotSize);
                context.arc(-dotSize, dotSize, 1.5 * dotSize, Math.PI / 2, Math.PI);
                context.lineTo(-2.5 * dotSize, -dotSize);
            }
        });
    }

    _drawCircle({ x, y, size, context, rotation }: DrawArgsCanvas): void {
        this._basicCircle({ x, y, size, context, rotation });
    }

    _drawSquare({ x, y, size, context, rotation }: DrawArgsCanvas): void {
        this._basicSquare({ x, y, size, context, rotation });
    }

    _drawRounded({ x, y, size, context, rotation }: DrawArgsCanvas): void {
        this._basicRounded({ x, y, size, context, rotation });
    }
}
