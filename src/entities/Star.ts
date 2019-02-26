import { PixiApplication } from '../services/PixiApplication';
import { Utils } from '../services/Utils';

import { Entity } from './Entity';

export class Star extends Entity {
    private readonly gfx: PIXI.Graphics;
    private vy: number;
    private radius: number;
    private color: number;

    constructor(private readonly pixiApplication: PixiApplication, private colorize: number) {
        super();

        this.gfx = new PIXI.Graphics();
        this.fromTheTop();
        this.gfx.y = Utils.randomInt(0, this.pixiApplication.height);
        this.draw();

        pixiApplication.application.stage.addChild(this.gfx);
    }

    public draw(): void {
        this.gfx.clear();
        this.gfx.beginFill(this.color);
        this.gfx.drawCircle(0, 0, this.radius);
        this.gfx.endFill();
    }

    /**
     * Same as in constructor, except start from the top of the screen (y=0).
     */
    public fromTheTop(): void {
        this.radius = Utils.randomInt(1, 3);
        this.color = Utils.randomFloat(0, 0.5) * ((this.colorize / 100) + 0.5) * 0xFFFFFF, Utils.randomFloat(0.5, 1);
        this.gfx.x = Utils.randomInt(0, this.pixiApplication.width);
        this.gfx.y = -1 * Utils.randomInt(0, 100);

        this.vy = Utils.randomFloat(0.5, 3);
    }

    public update(): void {
        this.gfx.y += this.vy;
        if (this.gfx.y > this.pixiApplication.height) {
            this.fromTheTop();
        }
    }

    public destroy(): void {
        this.pixiApplication.application.stage.removeChild(this.gfx);
    }
}
