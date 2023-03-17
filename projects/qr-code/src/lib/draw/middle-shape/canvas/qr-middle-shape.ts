/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
import middleShapeTypes from '../../../api/middleShapeTypes';
import {
    MiddleShapeType,
    GetNeighbor,
    RotateFigureArgsCanvas,
    BasicFigureDrawArgsCanvas,
    DrawArgsCanvas
} from '../../../types/type';

export default class QRMiddleShape {
    _context: CanvasRenderingContext2D;
    _type: MiddleShapeType;

    constructor({ context, type }: { context: CanvasRenderingContext2D; type: MiddleShapeType }) {
        this._context = context;
        this._type = type;
    }

    draw(x: number, y: number, size: number, getNeighbor: GetNeighbor): void {
        const context = this._context;
        const type = this._type;
        let drawFunction;

        switch (type) {
            case middleShapeTypes['circle']:
                drawFunction = this._drawCircle;
                break;
            case middleShapeTypes['smooth']:
                drawFunction = this._drawSmooth;
                break;
            case middleShapeTypes['smoothRounded']:
                drawFunction = this._drawSmoothRounded;
                break;
            case middleShapeTypes['rounded']:
                drawFunction = this._drawRounded;
                break;
            case middleShapeTypes['thinRounded']:
                drawFunction = this._drawThinRounded;
                break;
            case middleShapeTypes['square']:
            default:
                drawFunction = this._drawSquare;
        }

        drawFunction.call(this, { x, y, size, context, getNeighbor });
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

    //if rotation === 0 - right side is rounded
    _basicSideRounded(args: BasicFigureDrawArgsCanvas): void {
        const { size, context } = args;

        this._rotateFigure({
            ...args,
            draw: () => {
                context.arc(0, 0, size / 2, -Math.PI / 2, Math.PI / 2);
                context.lineTo(-size / 2, size / 2);
                context.lineTo(-size / 2, -size / 2);
                context.lineTo(0, -size / 2);
            }
        });
    }

    //if rotation === 0 - top right corner is rounded
    _basicCornerRounded(args: BasicFigureDrawArgsCanvas): void {
        const { size, context } = args;

        this._rotateFigure({
            ...args,
            draw: () => {
                context.arc(0, 0, size / 2, -Math.PI / 2, 0);
                context.lineTo(size / 2, size / 2);
                context.lineTo(-size / 2, size / 2);
                context.lineTo(-size / 2, -size / 2);
                context.lineTo(0, -size / 2);
            }
        });
    }

    //if rotation === 0 - top right corner is rounded
    _basicCornerThinRounded(args: BasicFigureDrawArgsCanvas): void {
        const { size, context } = args;

        this._rotateFigure({
            ...args,
            draw: () => {
                context.arc(-size / 2, size / 2, size, -Math.PI / 2, 0);
                context.lineTo(-size / 2, size / 2);
                context.lineTo(-size / 2, -size / 2);
            }
        });
    }

    _basicCornersRounded(args: BasicFigureDrawArgsCanvas): void {
        const { size, context } = args;

        this._rotateFigure({
            ...args,
            draw: () => {
                context.arc(0, 0, size / 2, -Math.PI / 2, 0);
                context.lineTo(size / 2, size / 2);
                context.lineTo(0, size / 2);
                context.arc(0, 0, size / 2, Math.PI / 2, Math.PI);
                context.lineTo(-size / 2, -size / 2);
                context.lineTo(0, -size / 2);
            }
        });
    }

    _basicCornersThinRounded(args: BasicFigureDrawArgsCanvas): void {
        const { size, context } = args;

        this._rotateFigure({
            ...args,
            draw: () => {
                context.arc(-size / 2, size / 2, size, -Math.PI / 2, 0);
                context.arc(size / 2, -size / 2, size, Math.PI / 2, Math.PI);
            }
        });
    }

    _drawCircle({ x, y, size, context }: DrawArgsCanvas): void {
        this._basicCircle({ x, y, size, context, rotation: 0 });
    }

    _drawSquare({ x, y, size, context }: DrawArgsCanvas): void {
        this._basicSquare({ x, y, size, context, rotation: 0 });
    }

    _drawRounded({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
        const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

        const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

        if (neighborsCount === 0) {
            this._basicCircle({ x, y, size, context, rotation: 0 });
            return;
        }

        if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
            this._basicSquare({ x, y, size, context, rotation: 0 });
            return;
        }

        if (neighborsCount === 2) {
            let rotation = 0;

            if (leftNeighbor && topNeighbor) {
                rotation = Math.PI / 2;
            } else if (topNeighbor && rightNeighbor) {
                rotation = Math.PI;
            } else if (rightNeighbor && bottomNeighbor) {
                rotation = -Math.PI / 2;
            }

            this._basicCornerRounded({ x, y, size, context, rotation });
            return;
        }

        if (neighborsCount === 1) {
            let rotation = 0;

            if (topNeighbor) {
                rotation = Math.PI / 2;
            } else if (rightNeighbor) {
                rotation = Math.PI;
            } else if (bottomNeighbor) {
                rotation = -Math.PI / 2;
            }

            this._basicSideRounded({ x, y, size, context, rotation });
            return;
        }
    }

    _drawThinRounded({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
        const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

        const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

        if (neighborsCount === 0) {
            this._basicCircle({ x, y, size, context, rotation: 0 });
            return;
        }

        if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
            this._basicSquare({ x, y, size, context, rotation: 0 });
            return;
        }

        if (neighborsCount === 2) {
            let rotation = 0;

            if (leftNeighbor && topNeighbor) {
                rotation = Math.PI / 2;
            } else if (topNeighbor && rightNeighbor) {
                rotation = Math.PI;
            } else if (rightNeighbor && bottomNeighbor) {
                rotation = -Math.PI / 2;
            }

            this._basicCornerThinRounded({ x, y, size, context, rotation });
            return;
        }

        if (neighborsCount === 1) {
            let rotation = 0;

            if (topNeighbor) {
                rotation = Math.PI / 2;
            } else if (rightNeighbor) {
                rotation = Math.PI;
            } else if (bottomNeighbor) {
                rotation = -Math.PI / 2;
            }

            this._basicSideRounded({ x, y, size, context, rotation });
            return;
        }
    }

    _drawSmooth({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
        const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

        const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

        if (neighborsCount === 0) {
            this._basicCornersRounded({ x, y, size, context, rotation: Math.PI / 2 });
            return;
        }

        if (!leftNeighbor && !topNeighbor) {
            this._basicCornerRounded({ x, y, size, context, rotation: -Math.PI / 2 });
            return;
        }

        if (!rightNeighbor && !bottomNeighbor) {
            this._basicCornerRounded({ x, y, size, context, rotation: Math.PI / 2 });
            return;
        }

        this._basicSquare({ x, y, size, context, rotation: 0 });
    }

    _drawSmoothRounded({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
        const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
        const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
        const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
        const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

        const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

        if (neighborsCount === 0) {
            this._basicCornersRounded({ x, y, size, context, rotation: Math.PI / 2 });
            return;
        }

        if (!leftNeighbor && !topNeighbor) {
            this._basicCornerThinRounded({ x, y, size, context, rotation: -Math.PI / 2 });
            return;
        }

        if (!rightNeighbor && !bottomNeighbor) {
            this._basicCornerThinRounded({ x, y, size, context, rotation: Math.PI / 2 });
            return;
        }

        this._basicSquare({ x, y, size, context, rotation: 0 });
    }
}
