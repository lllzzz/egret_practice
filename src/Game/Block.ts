module Game {
	/**
	 *
	 * @author 
	 *
	 */
	export class Block extends Components.Matrix
	{
        public constructor(public type:BlockType,  geometry: {
            width: number, height: number, left: number, top: number 
        }) 
		{
            super(type.m, type.n, geometry, (id, geometry) =>
            {
                var alpha = type.shape[id];
                return new Components.Box(id, 0x00ff00, geometry, alpha);
            }, true);
            
		}
		
        public changeSize(width: number, height: number, left:number, top: number)
        {
            var newBlock: Block = new Block(this.type, {width: width, height: height, left: left, top: top})
            this.parent.addChild(newBlock);
            this.parent.removeChild(this);
            return newBlock;
        }
	}
}
