(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/GameScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'GameScene', __filename);
// Script/Game/GameScene.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.background = null;
        _this.m_levelNode = null;
        _this.m_shuffleButton = null;
        _this.m_backButton = null;
        return _this;
    }
    GameScene.prototype.onLoad = function () {
    };
    GameScene.prototype.start = function () {
        this.bindHandler();
        this.playBGM();
    };
    GameScene.prototype.onDestroy = function () {
        this.stopBGM();
    };
    GameScene.prototype.update = function () {
    };
    GameScene.prototype.updateLevelJSONData = function (jsonRes) {
        if (jsonRes == "") {
            return;
        }
        if (this.m_levelNode) {
            var levelScript = this.m_levelNode.getComponent("Level");
            levelScript.loadTileJsonData(jsonRes);
        }
    };
    GameScene.prototype.bindHandler = function () {
        var handler = new cc.Component.EventHandler();
        handler.target = this.node;
        handler.component = "GameScene";
        handler.handler = "shuffleButtonCallBack";
        handler.customEventData = "ShuffleButton";
        this.m_shuffleButton.clickEvents.push(handler);
        var handlerBack = new cc.Component.EventHandler();
        handlerBack.target = this.node;
        handlerBack.component = "GameScene";
        handlerBack.handler = "backButtonCallBack";
        handlerBack.customEventData = "BackButton";
        this.m_backButton.clickEvents.push(handlerBack);
    };
    GameScene.prototype.shuffleButtonCallBack = function (event, customEventData) {
        if (this.m_levelNode) {
            var levelScript = this.m_levelNode.getComponent("Level");
            levelScript.shuffle();
        }
    };
    GameScene.prototype.backButtonCallBack = function (event, customEventData) {
        cc.director.loadScene("Main", function () {
        });
    };
    GameScene.prototype.playBGM = function () {
        // cc.loader.loadRes("music/MiningByMoonlight", cc.AudioClip, function (err, clip) {
        //     var audioID = cc.audioEngine.playMusic(clip, true);
        // });
    };
    GameScene.prototype.stopBGM = function () {
        cc.audioEngine.stopMusic();
    };
    __decorate([
        property(cc.Sprite)
    ], GameScene.prototype, "background", void 0);
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "m_levelNode", void 0);
    __decorate([
        property(cc.Button)
    ], GameScene.prototype, "m_shuffleButton", void 0);
    __decorate([
        property(cc.Button)
    ], GameScene.prototype, "m_backButton", void 0);
    GameScene = __decorate([
        ccclass
    ], GameScene);
    return GameScene;
}(cc.Component));
exports.default = GameScene;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameScene.js.map
        