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
            super(4, 2, { width: 110 / 2, height: 110, left: 5, top: 45 }, (id, geometry) => {
                return new Game.MBox(id, 0xaaaaff, geometry);
            });
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) =>
            {
                var [i, j] = this.getPosition(e.stageX, e.stageY),
                    box = <MBox>this.getBox(i, j);
                if(box.hasChanged) {
                    box.clear();
                }
                else {
                    box.changeColor(0xaaff33);
                }
            }, this);
		}
	}
}
