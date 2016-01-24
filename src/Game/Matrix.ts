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
            super(Config.MATRIX_DESIGN_N, Config.MATRIX_DESIGN_N, { 
                width: Config.MATRIX_DESIGN_WIDTH, 
                height: Config.MATRIX_DESIGN_HEIGHT, 
                left: Config.MATRIX_DESIGN_LEFT, 
                top: Config.MATRIX_DESIGN_TOP 
            }, (id, geometry) => {
                return new Game.MBox(id, 0xaaaaff, geometry);
            });
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) =>
            {
                var [i, j] = this.getPositionByXY(e.stageX, e.stageY),
                    box = <MBox>this.getBox(i, j);
                if(box.hasChanged) {
                    box.clear();
                }
                else {
                    box.changeColor(0xaaff33);
                }
            }, this);
		}
		
		/**
		 * 将Block吸附在Matrix上
		 */ 
        public attach(block: Block): void
        {
            var blockX: number = block.x + block.getBox().width / 2,
                blockY: number = block.y + block.getBox().height / 2;
            var [i, j] = this.getPositionByXY(blockX, blockY),
                [x, y] = this.getStageXY(i, j);
            var tw = egret.Tween.get(block);
            tw.to({ x: x, y: y }, 500).call(() => {
                block.boxStore.forEach((b, index) =>
                {
                    if(block.type.shape[index]) {
                        var [bi, bj] = block.getPositionByIndex(index);
                        (<MBox>this.getBox(i + bi, j + bj)).changeColor(b.color);
                    }
                });
                block.parent.removeChild(block);    
            })
        }
	}
}
