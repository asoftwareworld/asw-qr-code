/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import cornerInnerShapeTypes from '../../../api/cornerInnerShapeTypes';
import { CornerInnerShapeType, RotateFigureArgs, BasicFigureDrawArgs, DrawArgs } from '../../../types/type';

export default class QRCornerInnerShape {
    _element?: SVGElement;
    _svg: SVGElement;
    _type: CornerInnerShapeType;

    constructor({ svg, type }: { svg: SVGElement; type: CornerInnerShapeType }) {
        this._svg = svg;
        this._type = type;
    }

    draw(x: number, y: number, size: number, rotation: number): void {
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

        drawFunction.call(this, { x, y, size, rotation });
    }

    _rotateFigure({ x, y, size, rotation = 0, draw }: RotateFigureArgs): void {
        const cx = x + size / 2;
        const cy = y + size / 2;

        draw();
        this._element?.setAttribute('transform', `rotate(${(180 * rotation) / Math.PI},${cx},${cy})`);
    }

    _basicCircle(args: BasicFigureDrawArgs): void {
        const { size, x, y } = args;

        this._rotateFigure({
            ...args,
            draw: () => {
                this._element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                this._element.setAttribute('cx', String(x + size / 2));
                this._element.setAttribute('cy', String(y + size / 2));
                this._element.setAttribute('r', String(size / 2));
            }
        });
    }

    _basicSquare(args: BasicFigureDrawArgs): void {
        const { size, x, y } = args;

        this._rotateFigure({
            ...args,
            draw: () => {
                this._element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                this._element.setAttribute('x', String(x));
                this._element.setAttribute('y', String(y));
                this._element.setAttribute('width', String(size));
                this._element.setAttribute('height', String(size));
            }
        });
    }

    _drawCircle({ x, y, size, rotation }: DrawArgs): void {
        this._basicCircle({ x, y, size, rotation });
    }

    _drawSquare({ x, y, size, rotation }: DrawArgs): void {
        this._basicSquare({ x, y, size, rotation });
    }
}
