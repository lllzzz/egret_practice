module Components {
	/**
	 * @author laozhu
	 * 图形化组件基类，处理屏幕自适应，组件大小位置自适应等问题
	 * 生成实例前，必须先初始化设计稿
	 */
	export class Base extends egret.Sprite
	{
        protected static stageWidth: number = 0;
        protected static stageHeight: number = 0;

        protected static designWidth: number = 0;
        protected static designHeight: number = 0;

        protected static realWidth: number = 0;
        protected static realHeight: number = 0;

        protected static topWhite: number = 0;
        protected static leftWhite: number = 0;

        public static standard: number;
        public static HEIGHT_BASE = 0;
        public static WIDTH_BASE = 1;

        public constructor(width: number, height: number, left: number, top: number, private hasParent: boolean = false)
		{
            super();
            if (Base.designWidth == 0) {
                throw ('[ERROR] You need run Base.init(width, height)');
            }
            this.setSize(width, height);
            this.setPossion(left, top);
		}

		/**
		 * 初始化设计稿高宽，设定拉伸比例等参数
		 */
        public static init(designWidth: number, designHeight: number): void
        {
            Base.stageWidth = egret.MainContext.instance.stage.stageWidth;
            Base.stageHeight = egret.MainContext.instance.stage.stageHeight;
            Base.designWidth = designWidth;
            Base.designHeight = designHeight;
            if (designHeight / designWidth > Base.stageHeight / Base.stageWidth) {
                Base.standard = Base.HEIGHT_BASE;
                Base.realHeight = Base.stageHeight;
                Base.realWidth = (Base.designWidth / Base.designHeight) * Base.realHeight;
                Base.leftWhite = (Base.stageWidth - Base.realWidth) / 2;
            } else {
                Base.standard = Base.WIDTH_BASE;
                Base.realWidth = Base.stageWidth;
                Base.realHeight = (Base.designHeight / Base.designWidth) * Base.realWidth;
                Base.topWhite = (Base.stageHeight - Base.realHeight) / 2;
            }
            if (DEBUG) {
                console.log(Base.stageWidth, Base.stageHeight);
                console.log(Base.designWidth, Base.designHeight);
                console.log(Base.realWidth, Base.realHeight);
                console.log(Base.leftWhite, Base.topWhite);
            }
        }

        /**
         * 设定高宽
         */
		public setSize(width: number, height: number): void
		{
    	    if (Base.standard === Base.HEIGHT_BASE) {
                this.height = (height / Base.designHeight) * Base.stageHeight;
                this.width = width * this.height / height;
                this.x = 0;
                this.y = - Base.topWhite;
    	    } else {
                this.width = (width / Base.designWidth) * Base.stageWidth;
                this.height = height * this.width / width;
                this.y = 0;
                this.x = - Base.leftWhite;
    	    }
		}

        /**
         * 设置位置
         */
        public setPossion(left: number, top: number): void
        {
            if (Base.standard === Base.HEIGHT_BASE) {
                this.y = (top / Base.designHeight) * Base.realHeight;
                this.x = (left / Base.designWidth) * Base.realWidth;
                if (this.hasParent) this.x += Base.leftWhite; 
            } else {
                this.x = (left / Base.designWidth) * Base.realWidth;
                this.y = (top / Base.designHeight) * Base.realHeight;
                if (this.hasParent) this.y += Base.topWhite;
            }
        }
	}
}
