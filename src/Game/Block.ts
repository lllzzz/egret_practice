module Game {
	/**
	 *
	 * @author 
	 *
	 */
	export class Block extends Components.Matrix
	{
        public newScale = 1;
        public constructor(public type:BlockType,  geometry: {
            width: number, height: number, left: number, top: number 
        }) 
		{
            super(type.m, type.n, geometry, (id, geometry) =>
            {
                var alpha = type.shape[id];
                return new Components.Box(id, 0x00ff00, geometry, alpha);
            });
            this.newScale = Game.Matrix.getInstence().boxWidth / this.boxWidth;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeOnTouch, this);
		}
		
		
        public changeSize(x:number)
        {
            var tw = egret.Tween.get(this);
            tw.to({
                scaleX: this.newScale,
                scaleY: this.newScale,
                x: x - this.width * this.newScale / 2,
                y: this.y - this.height * this.newScale / 2,
                width: this.width * this.newScale,
                height: this.height * this.newScale,
            }).call(() => { this.dispatchEventWith('BLOCK_TOUCH_BEGIN') });
        }
        
        private beginX: number;
        private beginY: number;
        private changeOnTouch(e: egret.TouchEvent)
        {
            this.beginX = this.x;
            this.beginY = this.y;
            this.changeSize(e.stageX);
        }
        
        public attachOnEnd()
        {
            if (!Game.Matrix.getInstence().attach(this)) {
                console.log('hahah')
                var tw = egret.Tween.get(this);
                tw.to({
                    scaleX: 1,
                    scaleY: 1,
                    x: this.beginX,
                    y: this.beginY,
                    width: this.width / this.newScale,
                    height: this.height / this.newScale,
                }, 200)
            }
        }
	}
}
