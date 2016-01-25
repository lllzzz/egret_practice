module Game {
	/**
	 *
	 * @author 
	 *
	 */
	export class Matrix extends Components.Matrix
	{
        private static _matrix: Matrix = null;
    	public static getInstence() {
    	    if (Matrix._matrix == null) {
                Matrix._matrix = new Matrix();
    	    }
            return Matrix._matrix;
    	}
    	
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
		}
		
		/**
		 * 将Block吸附在Matrix上
		 */ 
        public attach(block: Block): boolean
        {
            var blockX: number = block.x + block.getBox().width / 2,
                blockY: number = block.y + block.getBox().height / 2;
            var [i, j] = this.getPositionByXY(blockX, blockY);
            if (isNaN(i)) return false;
            if (!this.canSet(i, j, block)) return false;
            var [x, y] = this.getStageXY(i, j);
            var tw = egret.Tween.get(block);
            tw.to({ x: x, y: y }, 200).call(() => {
                block.boxStore.forEach((b, index) =>
                {
                    if(block.type.shape[index]) {
                        var [bi, bj] = block.getPositionByIndex(index);
                        (<MBox>this.getBox(i + bi, j + bj)).changeColor(b.color);
                    }
                });
                block.parent.removeChild(block);    
            })
            return true;
        }
        
        private canSet(i, j, block: Block): boolean
        {
            if (i + block.m > this.m) return false;
            if (j + block.n > this.n) return false;
            return true;
        }
	}
}
