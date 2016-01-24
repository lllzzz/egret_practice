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
		    
	    }
	    
        public makeBlock(index: number = 0): Block
	    {
            var type = new BlockType(0);
            var [x, y] = 
	    }
	    
        private getPosition(type: BlockType): number[]
        {
            
        }
	    
	}
}
