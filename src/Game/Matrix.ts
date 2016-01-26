module Game {
	/**
	 *
	 * @author 
	 *
	 */
	export class Matrix extends Components.Matrix
	{
        private static _matrix: Matrix = null;
        private logArr: number[] = [];
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
            this.logArr.length = this.m * this.n;
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
            if (!this.canSet2(i, j, block)) return false;
            this.setPart(i, j, block);
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
        
        protected canSet(i, j, block: Block): boolean
        {
            if (i + block.m > this.m) return false;
            if (j + block.n > this.n) return false;
            return true;
        }
        
        protected canSet2(i, j, block: Block): boolean
        {
            var matrixShape = this.getPart(i, j, block.m, block.n);
            for (var k = 0; k < matrixShape.length; k++) {
                if (matrixShape[k] + block.type.shape[k] > 1) return false;
            }
            return true;
        }
        
        protected setPart(i, j, block: Block) 
        {
            var base = i * this.n + j;
            block.type.shape.forEach((hasBlock, k) =>
            {
                var index = base + k % block.n + Math.floor(k / block.n) * this.n;
                this.logArr[index] = this.logArr[index] || 0;
                if (hasBlock) this.logArr[index]++;
            }, this);
        }
        
        protected getPart(i, j, m, n): number[]
        {
            var ret = [];
            var base = i * this.n + j;
            for (var k = 0; k < m * n; k++) {
                var index = base + k % n + Math.floor(k / n) * this.n;
                ret[k] = this.logArr[index] || 0;
            }
            return ret;
        }
        
        public getLineSetLog(i:number):number[]
        {
            var start = i * this.n;
            var ret = []
            for (var k = 0; k < this.n; k++) {
                ret[k] = this.logArr[start + k] || 0;
            }
            return ret;
        }
        
        public getVerticalSetLog(j: number): number[]
        {
            var ret = []
            for (var i = 0; i < this.n; i++) {
                ret[i] = this.logArr[j + i * this.n] || 0;
            }
            return ret;
        }
	}
}
