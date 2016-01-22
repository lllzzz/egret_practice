module Components {
	/**
	 *
	 * @author 
	 *
	 */
	export class Box extends Base
	{
    	
        public constructor(public id: number, public color: number, geometry: {
            width: number, height: number, left: number, top: number}) 
		{
            super(geometry.width, geometry.height, geometry.left, geometry.top, true);
            this.graphics.beginFill(this.color);
            this.graphics.drawRoundRect(0, 0, this.width, this.height, this.width * 0.3, this.height * 0.3);
            this.graphics.endFill();
            
            var text: egret.TextField = new egret.TextField();
            text.text = id.toString();
            text.size = 5;
            text.width = this.width; text.height = this.height;
            text.textAlign = egret.HorizontalAlign.CENTER;
            text.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(text);
		}
	}
}
