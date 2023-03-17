/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import cornerInnerShapeTypes from '../../../api/cornerInnerShapeTypes';
import { CornerInnerShapeType, RotateFigureArgsCanvas, BasicFigureDrawArgsCanvas, DrawArgsCanvas } from '../../../types/type';

export default class QRCornerInnerShape {
    _context: CanvasRenderingContext2D;
    _type: CornerInnerShapeType;

    constructor({ context, type }: { context: CanvasRenderingContext2D; type: CornerInnerShapeType }) {
        this._context = context;
        this._type = type;
    }

    draw(x: number, y: number, size: number, rotation: number): void {
        const context = this._context;
        const type = this._type;
        let drawFunction;

        switch (type) {
            case cornerInnerShapeTypes['square']:
                drawFunction = this._drawSquare;
                break;
            case cornerInnerShapeTypes['circle']:
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

        this._rotateFigure({
            ...args,
            draw: () => {
                context.arc(0, 0, size / 2, 0, Math.PI * 2);
            }
        });
    }

    _basicSquare(args: BasicFigureDrawArgsCanvas): void {
        const { size, context } = args;

        this._rotateFigure({
            ...args,
            draw: () => {
                context.rect(-size / 2, -size / 2, size, size);
            }
        });
    }

    _drawCircle({ x, y, size, context, rotation }: DrawArgsCanvas): void {
        this._basicCircle({ x, y, size, context, rotation });
    }

    _drawSquare({ x, y, size, context, rotation }: DrawArgsCanvas): void {
        this._basicSquare({ x, y, size, context, rotation });
    }
}
