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
            {m: 1, n: 1, shape: [1]},
            {m: 2, n: 2, shape: [1, 1, 1, 0]},
        ];
        
        public shape: number[];
        public constructor(protected type?: number) 
        {
            if (isNaN(this.type)) {
                this.type = Math.floor(Math.random() * BlockType.TYPES.length);
            }
            this.shape = BlockType.TYPES[this.type].shape;
		}
        
        public get m(): number 
        { 
            return BlockType.TYPES[this.type].m;
        }
        
        public get n(): number
        {
            return BlockType.TYPES[this.type].n;
        }
	}
}
