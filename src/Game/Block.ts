module Game {
	/**
	 *
	 * @author 
	 *
	 */
	export class Block extends Components.Matrix
	{
//        private boxStore: Components.Box[] = [];
        private type: BlockType;
        public constructor(type:BlockType,  geometry: {
            width: number, height: number, left: number, top: number 
        }) 
		{
            super(type.m, type.n, geometry, (id, geometry) => {
                var alpha = type.shape[id];
                return new Components.Box(id, 0xaaafff, geometry, alpha);
            });
            
		}
	}
}
