module Game {
	/**
	 *
	 * @author 
	 *
	 */
	export class BlockType 
	{
        /**
         * 类型配置
         */ 
        protected static TYPES: any[] = [
            { m: 1, n: 1, shape: [1]},
            { m: 2, n: 2, shape: [1, 1, 1, 0]},
            { m: 3, n: 1, shape: [1, 0, 1] },
            { m: 5, n: 1, shape: [1, 1, 1, 1, 1]},
            { m: 3, n: 2, shape: [1, 0, 1, 0, 1, 1] },
        ];
        
        public static MAX_SIZE = Config.BLOCK_TYPE_MAX_SIZE;
        public shape: number[];
        public m: number;
        public n: number;
        
        public constructor(protected type?: number) 
        {
            if (isNaN(this.type)) {
                this.type = Math.floor(Math.random() * BlockType.TYPES.length);
            }
            this.m = BlockType.TYPES[this.type].m;
            this.n = BlockType.TYPES[this.type].n;
            this.shape = BlockType.TYPES[this.type].shape.slice(0);
            this.trans();
		}
        
        private trans()
        {
            if (Math.random() < 0.5) {
                var tmp = this.m;
                this.m = this.n;
                this.n = tmp;
            }
            var num = this.shape.length;
            if (Math.random() > 1 / num) {
                this.shape.sort(() => { return Math.random() < 0.5 ? -1 : 1; });
            }
            // 检查首行是否全空
            var isFirstLineEmpty = true;
            var isLastLineEmpty = true;
            for (var k = 0; k < this.n; k ++) {
                if (this.shape[k]) isFirstLineEmpty = false;
                if (this.shape[k + (this.n) * (this.m - 1)]) isLastLineEmpty = false;
            }
            if (isFirstLineEmpty) {
                this.shape = this.shape.slice(this.n);
                this.m--;
            }
            if (isLastLineEmpty) {
                this.shape = this.shape.slice(0, this.n * (this.m - 1));
                this.m--;
            }
            
            // 检查首列是否全空
            var isFirstVerticalEmpty = true;
            var isLastVerticalEmpty = true;
            for (var k = 0; k < this.m; k++) {
                if (this.shape[k * this.n]) isFirstVerticalEmpty = false;
                if (this.shape[(k+1) * this.n - 1]) isLastVerticalEmpty = false;
            }
            if (isFirstVerticalEmpty) {
                var _shape = [];
                this.shape.forEach((point, index) => {
                    if (index % this.n) _shape.push(point);
                })
                this.shape = _shape.slice(0);
                this.n--;
            }
            if (isLastVerticalEmpty) {
                var _shape = [];
                this.shape.forEach((point, index) =>
                {
                    if (index % this.n !== this.n - 1) _shape.push(point);
                })
                this.shape = _shape.slice(0);
                this.n--;
            }
                
        }
 
	}
}
