"use strict";
cc._RF.push(module, '65fe2qVfTZKpIaALnW70HtL', 'Cookie');
// Script/Game/Cookie.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ExtraCookieTypeManager_1 = require("../Data/ExtraCookieTypeManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CookieSwapDirection;
(function (CookieSwapDirection) {
    CookieSwapDirection[CookieSwapDirection["NONE"] = 0] = "NONE";
    CookieSwapDirection[CookieSwapDirection["LEFT"] = 1] = "LEFT";
    CookieSwapDirection[CookieSwapDirection["UP"] = 2] = "UP";
    CookieSwapDirection[CookieSwapDirection["RIGHT"] = 3] = "RIGHT";
    CookieSwapDirection[CookieSwapDirection["DOWN"] = 4] = "DOWN";
})(CookieSwapDirection = exports.CookieSwapDirection || (exports.CookieSwapDirection = {}));
exports.CookieTile_Width = 96;
exports.CookieTile_Height = 108;
var Cookie = /** @class */ (function (_super) {
    __extends(Cookie, _super);
    function Cookie() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_button = null;
        _this.cookieTypeObject = {
            normalType: ExtraCookieTypeManager_1.CookieType.Sprite_0,
            extraType: ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal,
            pos_X: ExtraCookieTypeManager_1.CookieMax_X,
            pos_Y: ExtraCookieTypeManager_1.CookieMax_Y,
            isOpetation: false,
            isExtraTriger: false
        };
        // private sprite: cc.Sprite = null;
        _this.cookieNormalSpriteArray = [];
        _this.cookieHighlightedSpriteArray = [];
        _this.cookieExtraLineHorizontalSprite = null;
        _this.cookieExtraLineVerticalSprite = null;
        _this.cookieExtraBombSprite = null;
        _this.cookieExtraAllSprite = null;
        _this.cookieExtraLineHorizontalNormalArray = [];
        _this.cookieExtraLineHorizontalHighlightedArray = [];
        _this.cookieExtraLineVerticalNormalArray = [];
        _this.cookieExtraLineVerticalHighlightedArray = [];
        _this.cookieExtraBombNormalArray = [];
        _this.cookieExtraBombHighlightedArray = [];
        _this.cookieExtraAllNormal = null;
        _this.cookieExtraAllHighlighted = null;
        _this.m_canInitUI = false;
        _this.m_cookieMovingSwapDel = null;
        _this.m_hasSwapedCookie = false;
        _this.m_cookieTouchable = true;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Cookie.prototype.onLoad = function () {
        this.onLoadCookieTexture();
    };
    Cookie.prototype.onLoadCookieTexture = function () {
        cc.loader.loadResDir("texture/Sprites/", cc.SpriteFrame, function (err, prefab) {
            this.m_canInitUI = true;
            for (var index = 0; index < ExtraCookieTypeManager_1.CookieType.CookieTypeCount; index++) {
                var res = "texture/Sprites/Sprite_" + index;
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
    };
    Cookie.prototype.start = function () {
    };
    // update (dt) {}
    // static isEqual(lhs: Cookie, rhs: Cookie): boolean {
    //     return lhs.idx_X == rhs.idx_X && lhs.idx_Y == rhs.idx_Y;
    // }
    Cookie.randomSprite = function () {
        return Math.floor(Math.random() * ExtraCookieTypeManager_1.CookieType.CookieTypeCount + 1);
    };
    // public isChecked(): boolean {
    //     return false;
    // }
    // public unCheckedCookie() {
    // this.m_toggle.isChecked = false;
    // }
    // public setCookieCheckedDelegate(delegate: CookieCheckedDelegate) {
    //     this.m_cookieCheckedDel = delegate;
    // }
    Cookie.prototype.setCookieTouchable = function (touchable) {
        this.m_button.interactable = touchable;
        this.m_cookieTouchable = touchable;
    };
    Cookie.prototype.setCookieMovingSwapDelegate = function (delegate) {
        this.m_cookieMovingSwapDel = delegate;
    };
    Cookie.prototype.setCookieType = function (cookieType) {
        this.cookieTypeObject.normalType = cookieType;
        if (!this.m_canInitUI) {
            this.onLoadCookieTexture();
        }
        else {
            this.updateButtonFrame();
        }
    };
    Cookie.prototype.getCookieType = function () {
        return this.cookieTypeObject.normalType;
    };
    Cookie.prototype.setExtraType = function (extraType) {
        this.cookieTypeObject.extraType = extraType;
        if (!this.m_canInitUI) {
            this.onLoadCookieTexture();
        }
        else {
            this.updateButtonFrame();
        }
    };
    Cookie.prototype.getExtraType = function () {
        return this.cookieTypeObject.extraType;
    };
    Cookie.prototype.setExtraTrigerState = function (isTriger) {
        this.cookieTypeObject.isExtraTriger = isTriger;
    };
    Cookie.prototype.getExtraTrigerState = function () {
        return this.cookieTypeObject.isExtraTriger;
    };
    Cookie.prototype.getCookieObject = function () {
        return this.cookieTypeObject;
    };
    Cookie.prototype.updateButtonFrame = function () {
        var cookieNormalType = this.cookieTypeObject.normalType;
        var normalSprite = this.cookieNormalSpriteArray[cookieNormalType];
        var hoverSprite = this.cookieNormalSpriteArray[cookieNormalType];
        var disabledSprite = this.cookieNormalSpriteArray[cookieNormalType];
        var pressedSprite = this.cookieHighlightedSpriteArray[cookieNormalType];
        if (this.cookieTypeObject.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Horizontal) {
            normalSprite = this.cookieExtraLineHorizontalNormalArray[cookieNormalType];
            hoverSprite = this.cookieExtraLineHorizontalNormalArray[cookieNormalType];
            disabledSprite = this.cookieExtraLineHorizontalNormalArray[cookieNormalType];
            pressedSprite = this.cookieExtraLineHorizontalHighlightedArray[cookieNormalType];
        }
        else if (this.cookieTypeObject.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Vertical) {
            normalSprite = this.cookieExtraLineVerticalNormalArray[cookieNormalType];
            hoverSprite = this.cookieExtraLineVerticalNormalArray[cookieNormalType];
            disabledSprite = this.cookieExtraLineVerticalNormalArray[cookieNormalType];
            pressedSprite = this.cookieExtraLineVerticalHighlightedArray[cookieNormalType];
        }
        else if (this.cookieTypeObject.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_Bomb) {
            normalSprite = this.cookieExtraBombNormalArray[cookieNormalType];
            hoverSprite = this.cookieExtraBombNormalArray[cookieNormalType];
            disabledSprite = this.cookieExtraBombNormalArray[cookieNormalType];
            pressedSprite = this.cookieExtraBombHighlightedArray[cookieNormalType];
        }
        else if (this.cookieTypeObject.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_All) {
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
    };
    Cookie.prototype.init = function (idx_X, idx_Y, cookieType, extraType) {
        this.cookieTypeObject.pos_X = idx_X;
        this.cookieTypeObject.pos_Y = idx_Y;
        this.setCookieType(cookieType);
        this.setExtraType(extraType);
        //
        this.bindHandler();
    };
    Cookie.prototype.setCookie_X_Y = function (idx_X, idx_Y) {
        this.cookieTypeObject.pos_X = idx_X;
        this.cookieTypeObject.pos_Y = idx_Y;
    };
    Cookie.prototype.getCookie_X_Y = function () {
        return new cc.Vec2(this.cookieTypeObject.pos_X, this.cookieTypeObject.pos_Y);
    };
    Cookie.prototype.setOperationState = function (isOperation) {
        this.cookieTypeObject.isOpetation = isOperation;
    };
    Cookie.prototype.getOperationState = function () {
        return this.cookieTypeObject.isOpetation;
    };
    Cookie.prototype.hasValue = function () {
        return this.cookieTypeObject.pos_X * 10 + this.cookieTypeObject.pos_Y;
    };
    Cookie.prototype.description = function () {
        return "type:\(" + this.cookieTypeObject.normalType + ") square:(\(" + this.cookieTypeObject.pos_X + "),\(" + this.cookieTypeObject.pos_Y + "))";
    };
    Cookie.prototype.bindHandler = function () {
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
    };
    // private cookieCallback(event, customEventData) {
    //     cc.log(this.description());
    //     if (this.m_cookieCheckedDel) {
    //         this.m_cookieCheckedDel();
    //     }
    // }
    Cookie.prototype.cookieTouchStartCallback = function (event, customEventData) {
        if (!this.m_cookieTouchable)
            return;
        cc.log(this.description());
        this.m_hasSwapedCookie = false;
        this.m_ptDragStart = this.node.convertToNodeSpaceAR(event.touch.getLocation());
    };
    Cookie.prototype.cookieTouchMoveCallback = function (event, customEventData) {
        if (!this.m_cookieTouchable)
            return;
        var m_ptDrag = this.node.convertToNodeSpaceAR(event.touch.getLocation());
        this.checkCurrentTouchPosition(m_ptDrag);
    };
    Cookie.prototype.cookieTouchEndedCancelCallback = function (event, customEventData) {
        if (!this.m_cookieTouchable)
            return;
        var m_ptDrag = this.node.convertToNodeSpaceAR(event.touch.getLocation());
        this.checkCurrentTouchPosition(m_ptDrag);
    };
    Cookie.prototype.checkCurrentTouchPosition = function (m_ptDrag) {
        var offset_X = m_ptDrag.x - this.m_ptDragStart.x;
        var offset_Y = m_ptDrag.y - this.m_ptDragStart.y;
        var offset_X_ABS = Math.abs(offset_X);
        var offset_Y_ABS = Math.abs(offset_Y);
        var swapDirection = CookieSwapDirection.NONE;
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
    };
    __decorate([
        property(cc.Button)
    ], Cookie.prototype, "m_button", void 0);
    Cookie = __decorate([
        ccclass
    ], Cookie);
    return Cookie;
}(cc.Component));
exports.default = Cookie;

cc._RF.pop();