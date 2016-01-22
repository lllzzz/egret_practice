module Game {
	/**
	 *
	 * @author 
	 *
	 */
    export class MBox extends Components.Box implements Contract.Box
	{
        public constructor(id: number, color: number, geometry: any) 
		{
            super(id, color, geometry);
		}
		
		public clear()
		{
            this.changeColor(this.color);
		}
		
		public changeColor(color) 
		{
            this.draw(color);
		}
	}
}
