module Components {
	/**
	 *
	 * @author 
	 *
	 */
	export class Matrix extends Base
	{
        public boxStore: Box[] = [];
        public boxWidth: number = 0;
        public boxHeight: number = 0;
        public static padding: number = Config.MATRIX_DESIGN_PADDING;
        public constructor(public m:number, public n: number, geometry: {
            width: number, height: number, left: number, top: number },
            newBoxCallback: Function, hasParent: boolean = false) 
        {
            super(geometry.width, geometry.height, geometry.left, geometry.top, hasParent);
            var boxStore: Box[] = [];
            var boxWidth: number = geometry.width / n - Matrix.padding,
                boxHeight: number = geometry.height / m - Matrix.padding;
            for(var i = 0; i < m * n; i++) {
                var _i = Math.floor(i / n),
                    _j = i % n;
                var _x = (boxWidth + Matrix.padding) * _j,
                    _y = (boxHeight + Matrix.padding) * _i;
                var _box = newBoxCallback.call(this, i, { width: boxWidth, height: boxHeight, left: _x, top: _y })
                boxStore.push(_box);
                this.addChild(_box);
            }
            this.boxStore = boxStore;
            this.boxWidth = boxWidth;
            this.boxHeight = boxHeight;
        }
        
        /**
         * 获取一行
         */ 
        public getLine(num: number): Box[]
        {
            var line: Box[] = [],
                indexStart = num * this.n;
            for(var i = 0; i < this.n; i++) {
                line.push(this.boxStore[i + indexStart]);
            }
            return line;
        }
        
        /**
         * 获取一列
         */ 
        public getVertical(num: number): Box[]
        {
            var vertical: Box[] = [],
                indexStart = num;
            for (var i = 0; i < this.m; i++) {
                vertical.push(this.boxStore[indexStart + i * this.n]);
            }
            return vertical;
        }
        
        /**
         * 坐标->下标
         */ 
        public getPositionByXY(x: number, y: number): number[]
        { 
            if(x < this.x || x > this.x + this.width || y < this.y || y > this.y + this.height) return [];
            return [Math.floor((y - this.y) / (this.height / this.m)), Math.floor((x - this.x) / (this.width / this.n))];
        }
        
        /**
         * 下标->Index
         */ 
        public getBox(i?: number, j?: number): Box
        {
            i = i || 0;
            j = j || 0;
            var index = i * this.n + j;
            return this.boxStore[index];
        }
        
        /**
         * 下标->坐标
         */ 
        public getStageXY(i:number, j:number): number[]
        {
            return [this.x + this.width / this.n * j, this.y + this.height / this.m * i];
        }
        
        /**
         * Index->下标
         */ 
        public getPositionByIndex(index: number): number[]
        {
            return [Math.floor(index / this.n), index % this.n]
        }
        
	}
}
