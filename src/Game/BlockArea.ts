module Game {
	/**
	 *
	 * @author 
	 *
	 */
	export class BlockArea 
	{
        private static BLOCK_BOX_SIZE;
        private currBlock: Block;
        private leftBlock: number;
        
        public constructor(private stage: egret.DisplayObjectContainer) 
        {
            BlockArea.BLOCK_BOX_SIZE = Config.BLOCK_DESIGN_SIZE / BlockType.MAX_SIZE;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.endMoveBlock, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveBlock, this);
	    }
	    
	    public makeArea() 
	    {
            this.leftBlock = 3;
            for (var i = 0; i < 3; i++) {
                var b = this.makeBlock(i);
                this.stage.addChild(b);
            }
	    }
	    
        private makeBlock(index: number = 0): Block
	    {
            var type = new BlockType();
            var [x, y] = this.getPosition(type);
            x += index * (Config.BLOCK_DESIGN_SIZE + Config.BLOCK_DESGIN_BASE_PADDING) + Config.BLOCK_DESGIN_BASE_LEFT;
            y += Config.BLOCK_DESIGN_TOP;
            var block = new Block(type, {
                width: BlockArea.BLOCK_BOX_SIZE * type.n,
                height: BlockArea.BLOCK_BOX_SIZE * type.m,
                left: x, top: y
            });
            block.addEventListener('BLOCK_TOUCH_BEGIN', () =>
            {
                this.currBlock = block;
            }, this)
            return block;
	    }
	    
        public getPosition(type: BlockType): number[]
        {
            return [(BlockType.MAX_SIZE - type.n) / 2 * BlockArea.BLOCK_BOX_SIZE, 
                    (BlockType.MAX_SIZE - type.m) / 2 * BlockArea.BLOCK_BOX_SIZE];
        }
        
        private moveBlock(e:egret.TouchEvent)
        {
            if (this.currBlock == null) return;
            this.currBlock.x = e.stageX - this.currBlock.width / 2;
            this.currBlock.y = e.stageY - this.currBlock.height / 2;
        }
        
        private endMoveBlock()
        {
            if (this.currBlock == null) return;
            if (this.currBlock.attachOnEnd()) {
                console.log(this.leftBlock);
                if (--this.leftBlock == 0) this.makeArea();
            }
            this.currBlock = null;
        }
	}
}
