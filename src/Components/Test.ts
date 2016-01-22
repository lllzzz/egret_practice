module Components {
	/**
	 *
	 * @author 
	 *
	 */
	export class Test extends Base
	{
        public constructor(width: number, height: number, left: number, top: number) 
		{
            super(width, height, left, top);
            this.graphics.beginFill(0x0000ff);
            this.graphics.drawRect(0, 0, this.width, this.height);
            this.graphics.endFill();
		}
	}
}
