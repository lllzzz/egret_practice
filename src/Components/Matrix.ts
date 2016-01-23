module Components {
	/**
	 *
	 * @author 
	 *
	 */
	export class Matrix extends Base
	{
        public boxStore: Box[] = [];
        public constructor(public m:number, public n: number, geometry: {
            width: number, height: number, left: number, top: number },
            newBoxCallback: Function) 
        {
            super(geometry.width, geometry.height, geometry.left, geometry.top);
            var boxStore: Box[] = [];
            var boxWidth: number = geometry.width / n - 1,
                boxHeight: number = geometry.height / m - 1;
            for(var i = 0; i < m * n; i++) {
                var _i = Math.floor(i / n),
                    _j = i % n;
                console.log(_i, _j)
                var _x = (boxWidth + 1) * _j,
                    _y = (boxHeight + 1) * _i;
                var _box = newBoxCallback.call(this, i, { width: boxWidth, height: boxHeight, left: _x, top: _y })
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
            for (var i = 0; i < this.m; i++) {
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
            return [Math.floor((y - this.y) / (this.height / this.m)), Math.floor((x - this.x) / (this.width / this.n))];
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
