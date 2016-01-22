module Components {
	/**
	 *
	 * @author 
	 *
	 */
	export class Matrix extends Base
	{
        public boxStore: Box[] = [];
        public constructor(public n: number, geometry: {
            width: number, height: number, left: number, top: number }) 
        {
            super(geometry.width, geometry.height, geometry.left, geometry.top);
            var boxStore: Box[] = [];
            var boxWidth: number = geometry.width / n - 1,
                boxHeight: number = geometry.height / n - 1;
            for(var i = 0; i < n * n; i++) {
                var _i = Math.floor(i / n),
                    _j = i % n;
                var _x = (boxWidth + 1) * _j,
                    _y = (boxHeight + 1) * _i;
                var _box = new Box(i, 0xaaaaaa, { width: boxWidth, height: boxHeight, left: _x, top: _y });
                boxStore.push(_box);
                this.addChild(_box);
            }
            this.boxStore = boxStore;
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
            for (var i = 0; i < this.n; i++) {
                vertical.push(this.boxStore[indexStart + i * this.n]);
            }
            return vertical;
        }
        
        /**
         * 坐标->下标
         */ 
        public getPosition(x: number, y: number): number[]
        { 
            if(x < this.x || x > this.x + this.width || y < this.y || y > this.y + this.height) return [];
            return [Math.floor((y - this.y) / (this.height / this.n)), Math.floor((x - this.x) / (this.width / this.n))];
        }
        
        /**
         * 下标->Index
         */ 
        public getBox(i: number, j: number): Box
        {
            var index = i * this.n + j;
            return this.boxStore[index];
        }
	}
}
