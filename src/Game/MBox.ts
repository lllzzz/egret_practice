module Game {
	/**
	 *
	 * @author 
	 *
	 */
    export class MBox extends Components.Box
	{
        public hasChanged: boolean = false;
        public constructor(id: number, color: number, geometry: any) 
		{
            super(id, color, geometry);
		}
		
		public clear()
		{
            this.changeColor(this.color);
            this.hasChanged = false;
		}
		
		public changeColor(color) 
		{
            this.draw(color);
            this.hasChanged = true;
		}
	}
}
