import { CookieType, CookieTypeObject, CookieExtraType, CookieMax_X, CookieMax_Y } from "../Data/ExtraCookieTypeManager";

const {ccclass, property} = cc._decorator;

export enum CookieSwapDirection {
    NONE,
    LEFT,
    UP,
    RIGHT,
    DOWN,
}

export const CookieTile_Width: number = 96;
export const CookieTile_Height: number = 108;

type CookieMovingSwapDelegate = (cookieNode: cc.Node, direction: CookieSwapDirection) => void;

@ccclass
export default class Cookie extends cc.Component {

    @property(cc.Button)
    m_button: cc.Button = null;

    private cookieTypeObject: CookieTypeObject = {
        normalType: CookieType.Sprite_0,
        extraType: CookieExtraType.Extra_Normal,
        pos_X: CookieMax_X,
        pos_Y: CookieMax_Y,
        isOpetation: false,
        isExtraTriger: false
    }

    // private sprite: cc.Sprite = null;

    private cookieNormalSpriteArray: Array<cc.SpriteFrame> = [];
    private cookieHighlightedSpriteArray: Array<cc.SpriteFrame> = [];
    private cookieExtraLineHorizontalSprite: cc.SpriteFrame = null;
    private cookieExtraLineVerticalSprite: cc.SpriteFrame = null;
    private cookieExtraBombSprite: cc.SpriteFrame = null;
    private cookieExtraAllSprite: cc.SpriteFrame = null;
    private cookieExtraLineHorizontalNormalArray: Array<cc.SpriteFrame> = [];
    private cookieExtraLineHorizontalHighlightedArray: Array<cc.SpriteFrame> = [];
    private cookieExtraLineVerticalNormalArray: Array<cc.SpriteFrame> = [];
    private cookieExtraLineVerticalHighlightedArray: Array<cc.SpriteFrame> = [];
    private cookieExtraBombNormalArray: Array<cc.SpriteFrame> = [];
    private cookieExtraBombHighlightedArray: Array<cc.SpriteFrame> = [];
    private cookieExtraAllNormal: cc.SpriteFrame = null;
    private cookieExtraAllHighlighted: cc.SpriteFrame = null;

    private m_canInitUI: boolean = false;
    private m_cookieMovingSwapDel: CookieMovingSwapDelegate = null;
    private m_ptDragStart: cc.Vec2;

    private m_hasSwapedCookie: boolean = false;
    private m_cookieTouchable: boolean = true;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.onLoadCookieTexture();
    }

    private onLoadCookieTexture() {
        cc.loader.loadResDir("texture/Sprites/", cc.SpriteFrame, function(err, prefab) {
            this.m_canInitUI = true;
            for (let index = 0; index < CookieType.CookieTypeCount; index++) {
                let res: string = "texture/Sprites/Sprite_" + index;
                this.cookieNormalSpriteArray.push(new cc.SpriteFrame(res));
                res += "_Highlighted";
                this.cookieHighlightedSpriteArray.push(new cc.SpriteFrame(res));
                res = "texture/Sprites/extra/Sprite_" + index + "_LH";
                this.cookieExtraLineHorizontalNormalArray.push(new cc.SpriteFrame(res));
                res += "_Highlighted";
                this.cookieExtraLineHorizontalHighlightedArray.push(new cc.SpriteFrame(res));
                res = "texture/Sprites/extra/Sprite_" + index + "_LV";
                this.cookieExtraLineVerticalNormalArray.push(new cc.SpriteFrame(res));
                res += "_Highlighted";
                this.cookieExtraLineVerticalHighlightedArray.push(new cc.SpriteFrame(res));
                res = "texture/Sprites/extra/Sprite_" + index + "_Bomb";
                this.cookieExtraBombNormalArray.push(new cc.SpriteFrame(res));
                res += "_Highlighted";
                this.cookieExtraBombHighlightedArray.push(new cc.SpriteFrame(res));
                this.cookieExtraAllNormal = new cc.SpriteFrame("texture/Sprites/extra/All");
                this.cookieExtraAllHighlighted = new cc.SpriteFrame("texture/Sprites/extra/All_Highlighted");
            }

            this.updateButtonFrame();
        }.bind(this));

    }

    start () {

    }

    // update (dt) {}

    // static isEqual(lhs: Cookie, rhs: Cookie): boolean {
    //     return lhs.idx_X == rhs.idx_X && lhs.idx_Y == rhs.idx_Y;
    // }
    static randomSprite(): CookieType {
        return Math.floor(Math.random() * CookieType.CookieTypeCount + 1);
    }

    // public isChecked(): boolean {
    //     return false;
    // }
    // public unCheckedCookie() {
        // this.m_toggle.isChecked = false;
    // }

    // public setCookieCheckedDelegate(delegate: CookieCheckedDelegate) {
    //     this.m_cookieCheckedDel = delegate;
    // }
    public setCookieTouchable(touchable: boolean)
    {
        this.m_button.interactable = touchable;
        this.m_cookieTouchable = touchable;
    }
    public setCookieMovingSwapDelegate(delegate: CookieMovingSwapDelegate) {
        this.m_cookieMovingSwapDel = delegate;
    }

    public setCookieType(cookieType: CookieType) {
        this.cookieTypeObject.normalType = cookieType;
        if (!this.m_canInitUI) {
            this.onLoadCookieTexture();
        }
        else {
            this.updateButtonFrame();
        }
    }
    public getCookieType(): CookieType {
        return this.cookieTypeObject.normalType;
    }
    public setExtraType(extraType: CookieExtraType)
    {
        this.cookieTypeObject.extraType = extraType;
        if (!this.m_canInitUI) {
            this.onLoadCookieTexture();
        }
        else {
            this.updateButtonFrame();
        }
    }
    public getExtraType(): CookieExtraType
    {
        return this.cookieTypeObject.extraType;
    }
    public setExtraTrigerState(isTriger: boolean)
    {
        this.cookieTypeObject.isExtraTriger = isTriger;
    }
    public getExtraTrigerState(): boolean
    {
        return this.cookieTypeObject.isExtraTriger;
    }
    public getCookieObject(): CookieTypeObject
    {
        return this.cookieTypeObject;
    }
    private updateButtonFrame() {
        let cookieNormalType = this.cookieTypeObject.normalType;
        let normalSprite: cc.SpriteFrame = this.cookieNormalSpriteArray[cookieNormalType];
        let hoverSprite: cc.SpriteFrame = this.cookieNormalSpriteArray[cookieNormalType];
        let disabledSprite: cc.SpriteFrame = this.cookieNormalSpriteArray[cookieNormalType];
        let pressedSprite: cc.SpriteFrame = this.cookieHighlightedSpriteArray[cookieNormalType];
 
        
        if (this.cookieTypeObject.extraType == CookieExtraType.Extra_Line_Horizontal)
        {
            normalSprite = this.cookieExtraLineHorizontalNormalArray[cookieNormalType];
            hoverSprite = this.cookieExtraLineHorizontalNormalArray[cookieNormalType];
            disabledSprite = this.cookieExtraLineHorizontalNormalArray[cookieNormalType];
            pressedSprite = this.cookieExtraLineHorizontalHighlightedArray[cookieNormalType];
        }
        else if (this.cookieTypeObject.extraType == CookieExtraType.Extra_Line_Vertical)
        {
            normalSprite = this.cookieExtraLineVerticalNormalArray[cookieNormalType];
            hoverSprite = this.cookieExtraLineVerticalNormalArray[cookieNormalType];
            disabledSprite = this.cookieExtraLineVerticalNormalArray[cookieNormalType];
            pressedSprite = this.cookieExtraLineVerticalHighlightedArray[cookieNormalType];
        }
        else if (this.cookieTypeObject.extraType == CookieExtraType.Extra_Bomb)
        {
            normalSprite = this.cookieExtraBombNormalArray[cookieNormalType];
            hoverSprite = this.cookieExtraBombNormalArray[cookieNormalType];
            disabledSprite = this.cookieExtraBombNormalArray[cookieNormalType];
            pressedSprite = this.cookieExtraBombHighlightedArray[cookieNormalType];
        }
        else if (this.cookieTypeObject.extraType == CookieExtraType.Extra_All)
        {
            normalSprite = this.cookieExtraAllNormal;
            hoverSprite = this.cookieExtraAllNormal;
            disabledSprite = this.cookieExtraAllNormal;
            pressedSprite = this.cookieExtraAllHighlighted;
        }
        this.m_button.normalSprite = normalSprite;
        this.m_button.hoverSprite = hoverSprite;
        this.m_button.disabledSprite = disabledSprite;
        this.m_button.pressedSprite = pressedSprite;
        this.m_button.node.active = true;
    }

    public init(idx_X: number, idx_Y: number, cookieType: CookieType, extraType: CookieExtraType) {
        this.cookieTypeObject.pos_X = idx_X;
        this.cookieTypeObject.pos_Y = idx_Y
        this.setCookieType(cookieType);
        this.setExtraType(extraType);
        //
        this.bindHandler();
    }
    public setCookie_X_Y(idx_X: number, idx_Y: number) {
        this.cookieTypeObject.pos_X = idx_X;
        this.cookieTypeObject.pos_Y = idx_Y
    }
    public getCookie_X_Y(): cc.Vec2 {
        return new cc.Vec2(this.cookieTypeObject.pos_X, this.cookieTypeObject.pos_Y);
    }
    public setOperationState(isOperation: boolean)
    {
        this.cookieTypeObject.isOpetation = isOperation;
    }
    public getOperationState(): boolean
    {
        return this.cookieTypeObject.isOpetation;
    }
    public hasValue(): number {
        return this.cookieTypeObject.pos_X * 10 + this.cookieTypeObject.pos_Y
    }
    public description(): string {
        return "type:\(" + this.cookieTypeObject.normalType + ") square:(\(" + this.cookieTypeObject.pos_X + "),\(" + this.cookieTypeObject.pos_Y + "))";
    }

    private bindHandler() {
        // let handler = new cc.Component.EventHandler();
        // handler.target = this.node;
        // handler.component = "Cookie"
        // handler.handler = "cookieCallback";
        // handler.customEventData = "";
        // this.m_button.clickEvents.push(handler);

        this.m_button.node.on(cc.Node.EventType.TOUCH_START, this.cookieTouchStartCallback, this);
        this.m_button.node.on(cc.Node.EventType.TOUCH_MOVE, this.cookieTouchMoveCallback, this);
        this.m_button.node.on(cc.Node.EventType.TOUCH_END, this.cookieTouchEndedCancelCallback, this);
        this.m_button.node.on(cc.Node.EventType.TOUCH_CANCEL, this.cookieTouchEndedCancelCallback, this);

    }

    // private cookieCallback(event, customEventData) {
    //     cc.log(this.description());
    //     if (this.m_cookieCheckedDel) {
    //         this.m_cookieCheckedDel();
    //     }
    // }
    private cookieTouchStartCallback(event, customEventData) {
        if (!this.m_cookieTouchable) return;
        cc.log(this.description());
        this.m_hasSwapedCookie = false;
        this.m_ptDragStart = this.node.convertToNodeSpaceAR(event.touch.getLocation());
    }
    private cookieTouchMoveCallback(event, customEventData) {
        if (!this.m_cookieTouchable) return;
        let m_ptDrag = this.node.convertToNodeSpaceAR(event.touch.getLocation());
        this.checkCurrentTouchPosition(m_ptDrag);
    }
    private cookieTouchEndedCancelCallback(event, customEventData) {
        if (!this.m_cookieTouchable) return;
        let m_ptDrag = this.node.convertToNodeSpaceAR(event.touch.getLocation());
        this.checkCurrentTouchPosition(m_ptDrag);
    }
    private checkCurrentTouchPosition(m_ptDrag: cc.Vec2) {
        let offset_X = m_ptDrag.x - this.m_ptDragStart.x;
        let offset_Y = m_ptDrag.y - this.m_ptDragStart.y;
        let offset_X_ABS = Math.abs(offset_X);
        let offset_Y_ABS = Math.abs(offset_Y);
        let swapDirection: CookieSwapDirection = CookieSwapDirection.NONE;
        if (offset_X_ABS < this.node.width / 2 && offset_Y_ABS > this.node.height / 2) {
            swapDirection = offset_Y > 0 ? CookieSwapDirection.UP : CookieSwapDirection.DOWN;
        }
        else if (offset_Y_ABS < this.node.height / 2 && offset_X_ABS > this.node.width / 2) {
            swapDirection = offset_X > 0 ? CookieSwapDirection.RIGHT : CookieSwapDirection.LEFT;
        }
        if (swapDirection > CookieSwapDirection.NONE && !this.m_hasSwapedCookie) {
            this.m_hasSwapedCookie = true;
            this.setOperationState(true);
            if (this.m_cookieMovingSwapDel) {
                this.m_cookieMovingSwapDel(this.node, swapDirection);
            }
        }
    }

}
