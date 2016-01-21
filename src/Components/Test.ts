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
            super(width, height, left, top, Base.TYPE_BACKGROUND);
//            this.graphics.beginFill(0x0000ff);
//            this.graphics.drawRect(0, 0, this.width, this.height);
//            this.graphics.endFill();
            var img: egret.Bitmap = new egret.Bitmap();
            img.width = this.width;
            img.height = this.height;
            img.texture = RES.getRes('bgImage');
            this.addChild(img);
		}
	}
}
