module Game {
	/**
	 *
	 * @author 
	 *
	 */
	export class Matrix extends Components.Matrix
	{
		public constructor() 
		{
            super(4, { width: 110, height: 110, left: 5, top: 45 }, function(id, geometry) {
                return new Game.MBox(id, 0xaaaaff, geometry);
            });
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) =>
            {
                var [i, j] = this.getPosition(e.stageX, e.stageY),
                    box = this.getBox(i, j);
                box.changeColor(0xaaff33);
            }, this);
		}
	}
}
