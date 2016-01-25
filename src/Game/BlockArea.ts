module Game {
	/**
	 *
	 * @author 
	 *
	 */
	export class BlockArea extends Components.Base 
	{
        private static BLOCK_BOX_SIZE;
		public constructor() 
		{
    	    super(Config.BLOCK_DESIGN_SIZE * 3 + Config.BLOCK_DESGIN_BASE_PADDING * 2,
    	          Config.BLOCK_DESIGN_SIZE,
	              Config.BLOCK_DESGIN_BASE_LEFT,
	              Config.BLOCK_DESIGN_TOP);
            BlockArea.BLOCK_BOX_SIZE = Config.BLOCK_DESIGN_SIZE / BlockType.MAX_SIZE;
            for (var i = 0; i < 3; i++) {
                var b = this.makeBlock(i);
                this.addChild(b);
            }
	    }
	    
        public makeBlock(index: number = 0): Block
	    {
            var type = new BlockType();
            var [x, y] = this.getPosition(type);
            x += index * (Config.BLOCK_DESIGN_SIZE + Config.BLOCK_DESGIN_BASE_PADDING);
            console.log(x, y);
            return new Block(type, {
                width: BlockArea.BLOCK_BOX_SIZE * type.n,
                height: BlockArea.BLOCK_BOX_SIZE * type.m,
                left: x, top: y
            });
	    }
	    
        private getPosition(type: BlockType): number[]
        {
            return [(BlockType.MAX_SIZE - type.n) / 2 * BlockArea.BLOCK_BOX_SIZE, 
                    (BlockType.MAX_SIZE - type.m) / 2 * BlockArea.BLOCK_BOX_SIZE];
        }
	    
	}
}
