/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import cornerOuterShapeTypes from '../../../api/cornerOuterShapeTypes';
import { CornerOuterShapeType, DrawArgs, BasicFigureDrawArgs, RotateFigureArgs } from '../../../types/type';

export default class QRCornerOuterShape {
    _element?: SVGElement;
    _svg: SVGElement;
    _type: CornerOuterShapeType;

    constructor({ svg, type }: { svg: SVGElement; type: CornerOuterShapeType }) {
        this._svg = svg;
        this._type = type;
    }

    draw(x: number, y: number, size: number, rotation: number): void {
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
        const dotSize = size / 7;

        this._rotateFigure({
            ...args,
            draw: () => {
                this._element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                this._element.setAttribute('clip-rule', 'evenodd');
                this._element.setAttribute(
                    'd',
                    `M ${x + size / 2} ${y}` + // M cx, y //  Move to top of ring
                    `a ${size / 2} ${size / 2} 0 1 0 0.1 0` + // a outerRadius, outerRadius, 0, 1, 0, 1, 0 // Draw outer arc, but don't close it
                    `z` + // Z // Close the outer shape
                    `m 0 ${dotSize}` + // m -1 outerRadius-innerRadius // Move to top point of inner radius
                    `a ${size / 2 - dotSize} ${size / 2 - dotSize} 0 1 1 -0.1 0` + // a innerRadius, innerRadius, 0, 1, 1, -1, 0 // Draw inner arc, but don't close it
                    `Z` // Z // Close the inner ring. Actually will still work without, but inner ring will have one unit missing in stroke
                );
            }
        });
    }

    _basicSquare(args: BasicFigureDrawArgs): void {
        const { size, x, y } = args;
        const dotSize = size / 7;

        this._rotateFigure({
            ...args,
            draw: () => {
                this._element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                this._element.setAttribute('clip-rule', 'evenodd');
                this._element.setAttribute(
                    'd',
                    `M ${x} ${y}` +
                    `v ${size}` +
                    `h ${size}` +
                    `v ${-size}` +
                    `z` +
                    `M ${x + dotSize} ${y + dotSize}` +
                    `h ${size - 2 * dotSize}` +
                    `v ${size - 2 * dotSize}` +
                    `h ${-size + 2 * dotSize}` +
                    `z`
                );
            }
        });
    }

    _basicRounded(args: BasicFigureDrawArgs): void {
        const { size, x, y } = args;
        const dotSize = size / 7;

        this._rotateFigure({
            ...args,
            draw: () => {
                this._element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                this._element.setAttribute('clip-rule', 'evenodd');
                this._element.setAttribute(
                    'd',
                    `M ${x} ${y + 2.5 * dotSize}` +
                    `v ${2 * dotSize}` +
                    `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${dotSize * 2.5} ${dotSize * 2.5}` +
                    `h ${2 * dotSize}` +
                    `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${dotSize * 2.5} ${-dotSize * 2.5}` +
                    `v ${-2 * dotSize}` +
                    `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${-dotSize * 2.5} ${-dotSize * 2.5}` +
                    `h ${-2 * dotSize}` +
                    `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${-dotSize * 2.5} ${dotSize * 2.5}` +
                    `M ${x + 2.5 * dotSize} ${y + dotSize}` +
                    `h ${2 * dotSize}` +
                    `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${dotSize * 1.5} ${dotSize * 1.5}` +
                    `v ${2 * dotSize}` +
                    `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${-dotSize * 1.5} ${dotSize * 1.5}` +
                    `h ${-2 * dotSize}` +
                    `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${-dotSize * 1.5} ${-dotSize * 1.5}` +
                    `v ${-2 * dotSize}` +
                    `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${dotSize * 1.5} ${-dotSize * 1.5}`
                );
            }
        });
    }

    _drawCircle({ x, y, size, rotation }: DrawArgs): void {
        this._basicCircle({ x, y, size, rotation });
    }

    _drawSquare({ x, y, size, rotation }: DrawArgs): void {
        this._basicSquare({ x, y, size, rotation });
    }

    _drawRounded({ x, y, size, rotation }: DrawArgs): void {
        this._basicRounded({ x, y, size, rotation });
    }
}
