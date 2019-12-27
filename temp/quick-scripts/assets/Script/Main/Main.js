(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Main/Main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0d166Gzv9tKhqg6ZdhiiKMO', 'Main', __filename);
// Script/Main/Main.ts

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
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_logoutButton = null;
        _this.m_levelButtonsNode = null;
        _this.m_levelButtonInstance = null;
        _this.m_levelButtonsArray = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Main.prototype.start = function () {
        this.m_levelButtonInstance.active = false;
        this.bindHanlder();
        this.loadLevels();
    };
    // update (dt) {}
    Main.prototype.bindHanlder = function () {
        var handler = new cc.Component.EventHandler();
        handler.target = this.node;
        handler.component = "Main";
        handler.handler = "logoutButtonCallBack";
        handler.customEventData = "LogoutButton";
        this.m_logoutButton.clickEvents.push(handler);
    };
    Main.prototype.logoutButtonCallBack = function (event, customEventData) {
        cc.director.loadScene("Login", function () {
            // let nodeMain = cc.find("Canvas/node_main", cc.director.getScene());
            // this.mainPrefab = nodeMain.getComponent("MainPrefab");
            // this.turnToPage(Enum_LayerType.HOME_PAGE);
            // cc.loader.loadRes("prefab/node_notice", function(error, prefab){
            //     LoadingPrefab.getInstance().remove();
            //     if(error != null){
            //         PromptPrefab.getInstance().showPrompt(TEXT.Common_Load_Failure);
            //         return;
            //     }
            //     let node = cc.instantiate(prefab);
            //     nodeMain.addChild(node);
            //     node.zIndex = nodeMain.getChildByName("node_content").zIndex + 1;
            // });
        }.bind(this));
    };
    Main.prototype.loadLevels = function () {
        var maxLength = 15;
        var layoutHeight = 50;
        for (var index = 0; index < maxLength; index++) {
            var node = cc.instantiate(this.m_levelButtonInstance);
            if (node) {
                node.getChildByName("Label").getComponent(cc.Label).string = String(index + 1);
                node.active = true;
                this.m_levelButtonsArray.push(node);
                this.m_levelButtonsNode.addChild(node);
                layoutHeight += (this.m_levelButtonsNode.getComponent(cc.Layout).spacingY + node.height);
                this.m_levelButtonsNode.height = layoutHeight;
                //
                var handler = new cc.Component.EventHandler();
                handler.target = this.node;
                handler.component = "Main";
                handler.handler = "levelButtonCallBack";
                handler.customEventData = "Levels/Level_" + index;
                node.getComponent(cc.Button).clickEvents.push(handler);
            }
        }
    };
    Main.prototype.levelButtonCallBack = function (event, customEventData) {
        cc.log(customEventData);
        cc.director.loadScene("GameScene", function (error, prefab) {
            var gameSceneNode = cc.find("GameScene/GameSceneNode", cc.director.getScene());
            var gameSceneScript = gameSceneNode.getComponent("GameScene");
            gameSceneScript.updateLevelJSONData(customEventData);
        }.bind(this));
    };
    __decorate([
        property(cc.Button)
    ], Main.prototype, "m_logoutButton", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "m_levelButtonsNode", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "m_levelButtonInstance", void 0);
    Main = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

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
        //# sourceMappingURL=Main.js.map
        