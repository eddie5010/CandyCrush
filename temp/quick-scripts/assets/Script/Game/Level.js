(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/Level.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bb9d0zof+pMQb5Q2tcgb3bj', 'Level', __filename);
// Script/Game/Level.ts

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
var Cookie_1 = require("./Cookie");
var ExtraCookieTypeManager_1 = require("../Data/ExtraCookieTypeManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
exports.CookieAnimationTimeInterval = 0.15;
var Level = /** @class */ (function (_super) {
    __extends(Level, _super);
    function Level() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_tileNode = null;
        _this.m_cookieNode = null;
        _this.m_tileNodeInstance = null;
        _this.m_cookieInstance = null;
        //  audio clips
        _this.m_swapAudioClip = null;
        _this.m_invalidSwapAudioClip = null;
        _this.m_matchAudioClip = null;
        _this.m_fallingAudioClip = null;
        _this.m_addCookiesAudioClip = null;
        // private m_swapCookieArray: Array<cc.Node> = [];
        _this.m_tilesJSONArray = new Array();
        _this.m_tilesNodesArray = new Array();
        _this.m_cookieNodesArray = new Array();
        return _this;
    }
    // private cookies = Array2D<Cookie>(columns: numColumns, rows: numRows)
    // LIFE-CYCLE CALLBACKS:
    Level.prototype.onLoad = function () {
        // this.loadCookieInstance();
        // this.loadTileJsonData();
        this.loadAudioRes();
    };
    Level.prototype.start = function () {
        this.m_tileNodeInstance.active = false;
        // this.initTileNodeUI();
    };
    Level.prototype.update = function (dt) {
    };
    Level.prototype.shuffle = function () {
        cc.log("shuffle func is called");
        //  test func
        // this.detectPossibleSwaps();
        // this.detectHorizontalMatches();
        // this.detectVerticalMatches();
        // this.fillHoles();
        // while (this.checkFillHoles()) 
        // {
        // }
        // this.topUpCookies();
    };
    Level.prototype.initDataAndUI = function () {
        this.initTileNodeArray();
        this.initClearCookieNodeArray();
        this.initTileNodeUI();
        //
        this.loadCookieInstance();
    };
    Level.prototype.resetTileJSONArray = function () {
        for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
            var tmpJsonArray = [];
            for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y; index_Y++) {
                tmpJsonArray.push(0);
            }
            this.m_tilesJSONArray.push(tmpJsonArray);
        }
    };
    Level.prototype.initTileNodeArray = function () {
        for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y; index_Y++) {
            var tmpArray = [];
            for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
                tmpArray.push(null);
            }
            this.m_tilesNodesArray.push(tmpArray);
        }
    };
    Level.prototype.initClearCookieNodeArray = function () {
        for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y; index_Y++) {
            var tmpArray = [];
            for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
                tmpArray.push(null);
            }
            this.m_cookieNodesArray.push(tmpArray);
        }
    };
    Level.prototype.initTileNodeUI = function () {
        for (var idx_Y = 0; idx_Y < ExtraCookieTypeManager_1.CookieMax_Y; idx_Y++) {
            for (var idx_X = 0; idx_X < ExtraCookieTypeManager_1.CookieMax_X; idx_X++) {
                if (this.m_tilesJSONArray[idx_X][idx_Y] > 0) {
                    var tileItem = cc.instantiate(this.m_tileNodeInstance);
                    // tileItem.x = tileItem.width / 2 + tileItem.width * idx_X;
                    // tileItem.y = tileItem.height / 2 + tileItem.height * idx_Y;
                    tileItem.setPosition(this.getCookiePosition(idx_X, idx_Y));
                    tileItem.active = true;
                    this.m_tileNode.addChild(tileItem);
                    this.m_tilesNodesArray[idx_X][idx_Y] = tileItem;
                }
            }
        }
    };
    // public cookie(column: number, row: number): Cookie {
    //     // precondition(column >= 0 && column < this.numColumns)
    //     // precondition(row >= 0 && row < this.numRows)
    //     // return cookies[column, row]
    //     return null;
    // }
    // private shuffle(): Array<Cookie> {
    //     // return this.createInitialCookies()
    //     return [];
    // }
    // private createInitialCookies(): Array<Cookie> {
    //     let set: Array<Cookie> = []
    //     // 1
    //     // for row in 0..<numRows {
    //     //   for column in 0..<numColumns {
    //     //     // 2
    //     //     let cookieType = CookieType.random()
    //     //     // 3
    //     //     let cookie = Cookie(column: column, row: row, cookieType: cookieType)
    //     //     cookies[column, row] = cookie
    //     //     // 4
    //     //     set.insert(cookie)
    //     //   }
    //     // }
    //     return set;
    // }
    Level.prototype.loadTileJsonData = function (jsonRes) {
        if (jsonRes == "") {
            return;
        }
        cc.loader.loadRes(jsonRes, function (err, jsonAsset) {
            if (err != null) {
                return;
            }
            this.resetTileJSONArray();
            var data = jsonAsset.json;
            var tileArray = data.tiles;
            for (var index_Y = 0; index_Y < tileArray.length; index_Y++) {
                var element = tileArray[index_Y];
                for (var idx = 0; idx < element.length; idx++) {
                    var e = element[idx];
                    this.m_tilesJSONArray[idx][tileArray.length - index_Y - 1] = e;
                }
            }
            this.initDataAndUI();
        }.bind(this));
    };
    Level.prototype.loadCookieInstance = function () {
        cc.loader.loadRes("prefab/Cookie", function (error, prefab) {
            if (error != null) {
                return;
            }
            this.m_hasLoadedCookie = true;
            var node = cc.instantiate(prefab);
            this.m_cookieInstance = node;
            //
            this.createInitialCookies();
        }.bind(this));
    };
    Level.prototype.controlAllCookieTouchable = function (touchable) {
        for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
            for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y; index_Y++) {
                var cookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (cookieNode) {
                    var script = cookieNode.getComponent("Cookie");
                    script.setCookieTouchable(touchable);
                }
            }
        }
    };
    Level.prototype.createInitialCookies = function () {
        if (this.m_cookieInstance == null) {
            this.loadCookieInstance();
        }
        else {
            for (var idx_Y = 0; idx_Y < ExtraCookieTypeManager_1.CookieMax_Y; idx_Y++) {
                for (var idx_X = 0; idx_X < ExtraCookieTypeManager_1.CookieMax_X; idx_X++) {
                    if (this.m_tilesNodesArray[idx_X][idx_Y] == null) {
                        continue;
                    }
                    var cookieType = Math.floor(Math.random() * ExtraCookieTypeManager_1.CookieType.CookieTypeCount);
                    var node = this.createCookieAtLevel(idx_X, idx_Y, cookieType);
                    var script = node.getComponent("Cookie");
                    if (idx_X >= 2) {
                        var node_X_1 = this.m_cookieNodesArray[idx_X - 1][idx_Y];
                        var node_X_2 = this.m_cookieNodesArray[idx_X - 2][idx_Y];
                        while (node_X_1 && node_X_1.getComponent("Cookie").getCookieType() == cookieType && node_X_2 && node_X_2.getComponent("Cookie").getCookieType() == cookieType) {
                            cookieType = Math.floor(Math.random() * ExtraCookieTypeManager_1.CookieType.CookieTypeCount);
                            script.setCookieType(cookieType);
                        }
                    }
                    if (idx_Y >= 2) {
                        var node_Y_1 = this.m_cookieNodesArray[idx_X][idx_Y - 1];
                        var node_Y_2 = this.m_cookieNodesArray[idx_X][idx_Y - 2];
                        while (node_Y_1 && node_Y_1.getComponent("Cookie").getCookieType() == cookieType && node_Y_2 && node_Y_2.getComponent("Cookie").getCookieType() == cookieType) {
                            cookieType = Math.floor(Math.random() * ExtraCookieTypeManager_1.CookieType.CookieTypeCount);
                            script.setCookieType(cookieType);
                        }
                    }
                }
            }
            //
            this.firstDetectAllChains();
        }
    };
    // private checkCookies() {
    //     this.getCheckedCookies();
    // }
    Level.prototype.startSwapCookies = function (cookieNode, swapDirection) {
        if (cookieNode == null) {
            this.node.runAction(cc.sequence(cc.delayTime(exports.CookieAnimationTimeInterval), cc.callFunc(function () {
                this.controlAllCookieTouchable(true);
            }.bind(this))));
            return;
        }
        var script = cookieNode.getComponent("Cookie");
        var cookiePos = script.getCookie_X_Y();
        var newCookiePos = script.getCookie_X_Y();
        if (swapDirection == Cookie_1.CookieSwapDirection.LEFT) {
            newCookiePos.x -= 1;
        }
        else if (swapDirection == Cookie_1.CookieSwapDirection.RIGHT) {
            newCookiePos.x += 1;
        }
        else if (swapDirection == Cookie_1.CookieSwapDirection.UP) {
            newCookiePos.y += 1;
        }
        else if (swapDirection == Cookie_1.CookieSwapDirection.DOWN) {
            newCookiePos.y -= 1;
        }
        if (cookiePos.x != newCookiePos.x || cookiePos.y != newCookiePos.y) {
            var swapCookieNode = null;
            for (var key in this.m_cookieNode.children) {
                if (this.m_cookieNode.children.hasOwnProperty(key)) {
                    var element = this.m_cookieNode.children[key];
                    // if (element == null) { continue; }
                    var script_1 = element.getComponent("Cookie");
                    var tmpCookiePos = script_1.getCookie_X_Y();
                    if (tmpCookiePos.x == newCookiePos.x && tmpCookiePos.y == newCookiePos.y) {
                        swapCookieNode = element;
                        script_1.setOperationState(true);
                        break;
                    }
                }
            }
            if (swapCookieNode != null) {
                script.setOperationState(true);
                this.performSwapCookies(cookieNode, swapCookieNode);
            }
        }
    };
    Level.prototype.performSwapCookies = function (firstCookieNode, lastCookieNode) {
        this.swapCookies(firstCookieNode, lastCookieNode);
        this.node.runAction(cc.sequence(cc.delayTime(exports.CookieAnimationTimeInterval * 2), cc.callFunc(function () {
            this.detectAllChains(firstCookieNode, lastCookieNode);
        }.bind(this))));
    };
    Level.prototype.swapCookies = function (firstCookieNode, lastCookieNode) {
        if (firstCookieNode == null || lastCookieNode == null) {
            return;
        }
        var swapTimeInterval = exports.CookieAnimationTimeInterval;
        var firstScript = firstCookieNode.getComponent("Cookie");
        var lastScript = lastCookieNode.getComponent("Cookie");
        var tmpFirst_X_Y = firstScript.getCookie_X_Y();
        var tmpLast_X_Y = lastScript.getCookie_X_Y();
        var absXLength = Math.abs(tmpFirst_X_Y.x - tmpLast_X_Y.x);
        var absYLength = Math.abs(tmpFirst_X_Y.y - tmpLast_X_Y.y);
        if (absXLength + absYLength == 1) {
            this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
            var firstCookiePos = firstCookieNode.position;
            var lastCookiePos = lastCookieNode.position;
            //一个为all的cookie或者两个都是extra的cookie
            var isExtraSwap = false;
            if (firstScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_All || lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_All) {
                isExtraSwap = true;
            }
            else if (firstScript.getExtraType() != ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal && lastScript.getExtraType() != ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal) {
                isExtraSwap = true;
            }
            if (!this.hasChain(firstCookieNode) && !this.hasChain(lastCookieNode) && !isExtraSwap) {
                this.playInvalidSwapAudio();
                this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
                this.restoreCookieOperateState();
                lastCookieNode.runAction(cc.sequence(cc.moveTo(swapTimeInterval, firstCookiePos), cc.delayTime(swapTimeInterval), cc.moveTo(swapTimeInterval, lastCookiePos)));
                firstCookieNode.runAction(cc.sequence(cc.moveTo(swapTimeInterval, lastCookiePos), cc.delayTime(swapTimeInterval), cc.moveTo(swapTimeInterval, firstCookiePos)));
            }
            else {
                this.playSwapAudio();
                lastCookieNode.runAction(cc.moveTo(swapTimeInterval, firstCookiePos));
                firstCookieNode.runAction(cc.moveTo(swapTimeInterval, lastCookiePos));
            }
        }
    };
    //刚刚加载完检测
    Level.prototype.firstDetectAllChains = function () {
        this.controlAllCookieTouchable(true);
        this.node.runAction(cc.sequence(cc.delayTime(exports.CookieAnimationTimeInterval * 8), cc.callFunc(function () {
            this.detectAllChains();
        }.bind(this))));
    };
    //  检查是否存在可消除chain
    Level.prototype.detectAllChains = function (firstCookieNode, lastCookieNode) {
        var isExtraSwap = false;
        var chainsArray = [];
        if (firstCookieNode != null && lastCookieNode != null) {
            var firstScript = firstCookieNode.getComponent("Cookie");
            var lastScript = lastCookieNode.getComponent("Cookie");
            if (firstScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_All || lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_All) {
                isExtraSwap = true;
            }
            else if (firstScript.getExtraType() != ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal && lastScript.getExtraType() != ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal) {
                isExtraSwap = true;
            }
        }
        if (isExtraSwap) {
            chainsArray = this.detectExtraMatches(firstCookieNode, lastCookieNode);
        }
        else {
            chainsArray = this.detectMatches();
        }
        if (chainsArray.length > 0) {
            var delayTime = this.removeMatches(chainsArray);
            this.node.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(function () {
                this.checkFillHolesAnimation();
            }.bind(this))));
        }
        else {
            this.controlAllCookieTouchable(true);
        }
    };
    // private hasEmptyHoles(): boolean {
    //     let hasEmptyHoles: boolean = false;
    //     for (let index_X = 0; index_X < CookieMax_X; index_X++)
    //     {
    //         for (let index_Y = 0; index_Y < CookieMax_Y; index_Y++)
    //         {
    //             let cookieNode = this.m_cookieNodesArray[index_X][index_Y];
    //             if (cookieNode == null && this.m_tilesNodesArray[index_X][index_Y] != null)
    //             {
    //                 hasEmptyHoles = true;
    //                 break;
    //             }
    //         }
    //         if (hasEmptyHoles)
    //         {
    //             break;
    //         }
    //     }
    //     return hasEmptyHoles;
    // }
    Level.prototype.swapCookiesInArray = function (firstCookie_X_Y, lastCookie_X_Y) {
        var firstCookieNode = this.m_cookieNodesArray[firstCookie_X_Y.x][firstCookie_X_Y.y];
        var lastCookieNode = this.m_cookieNodesArray[lastCookie_X_Y.x][lastCookie_X_Y.y];
        if (firstCookieNode == null || lastCookieNode == null) {
            return;
        }
        //
        var firstScript = firstCookieNode.getComponent("Cookie");
        var lastScript = lastCookieNode.getComponent("Cookie");
        var tmpFirst_X_Y = firstScript.getCookie_X_Y();
        var tmpLast_X_Y = lastScript.getCookie_X_Y();
        firstScript.setCookie_X_Y(tmpLast_X_Y.x, tmpLast_X_Y.y);
        lastScript.setCookie_X_Y(tmpFirst_X_Y.x, tmpFirst_X_Y.y);
        var tmpFirstNode = this.m_cookieNodesArray[firstCookie_X_Y.x][firstCookie_X_Y.y];
        this.m_cookieNodesArray[firstCookie_X_Y.x][firstCookie_X_Y.y] = lastCookieNode;
        this.m_cookieNodesArray[lastCookie_X_Y.x][lastCookie_X_Y.y] = tmpFirstNode;
    };
    //所有cookie是否被交换过状态重置为false
    Level.prototype.restoreCookieOperateState = function () {
        for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
            for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y; index_Y++) {
                var cookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (cookieNode == null) {
                    continue;
                }
                var script = cookieNode.getComponent("Cookie");
                script.setOperationState(false);
            }
        }
    };
    // private unCheckAllCookies() {
    //     for (const key in this.m_cookieNode.children) {
    //         if (this.m_cookieNode.children.hasOwnProperty(key)) {
    //             const element = this.m_cookieNode.children[key];
    //             let script = element.getComponent("Cookie");
    //             script.unCheckedCookie();
    //         }
    //     }
    // }
    Level.prototype.detectPossibleSwaps = function () {
        // var set: Set<Swap> = []
        for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X - 1; index_X++) {
            for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y - 1; index_Y++) {
                //detect right
                var firstCookieNode = this.m_cookieNodesArray[index_X][index_Y];
                var lastCookieNode = this.m_cookieNodesArray[index_X + 1][index_Y];
                if (firstCookieNode == null || lastCookieNode == null) {
                    continue;
                }
                var firstScript = firstCookieNode.getComponent("Cookie");
                var lastScript = lastCookieNode.getComponent("Cookie");
                var tmpFirst_X_Y = firstScript.getCookie_X_Y();
                var tmpLast_X_Y = lastScript.getCookie_X_Y();
                if (firstScript.getCookieType() == lastScript.getCookieType()) {
                    continue;
                }
                this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
                if (this.hasChain(firstCookieNode) || this.hasChain(lastCookieNode)) {
                    cc.log("valiable swap at right cookie:[" + index_X, "," + index_Y + "]" + " AND " + "cookie:[" + String(index_X + 1) + "," + index_Y + "]");
                }
                this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
                //detect top
                lastCookieNode = this.m_cookieNodesArray[index_X][index_Y + 1];
                if (lastCookieNode == null) {
                    continue;
                }
                lastScript = lastCookieNode.getComponent("Cookie");
                tmpLast_X_Y = lastScript.getCookie_X_Y();
                if (firstScript.getCookieType() == lastScript.getCookieType()) {
                    continue;
                }
                this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
                if (this.hasChain(firstCookieNode) || this.hasChain(lastCookieNode)) {
                    cc.log("valiable swap at top cookie:[" + index_X, "," + index_Y + "]" + " AND " + "cookie:[" + index_X + "," + String(index_Y + 1) + "]");
                }
                this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
            }
        }
        // possibleSwaps = set
    };
    Level.prototype.hasChain = function (cookie) {
        var cookieScript = cookie.getComponent("Cookie");
        var cookieType = cookieScript.getCookieType();
        var cookie_X = cookieScript.getCookie_X_Y().x;
        var cookie_Y = cookieScript.getCookie_X_Y().y;
        // Horizontal chain check
        var horizontalLength = 1;
        // Left
        var i = cookie_X - 1;
        while (i >= 0 && this.m_cookieNodesArray[i][cookie_Y] && this.m_cookieNodesArray[i][cookie_Y].getComponent("Cookie").getCookieType() == cookieType) {
            i -= 1;
            horizontalLength += 1;
        }
        // Right
        i = cookie_X + 1;
        while (i < ExtraCookieTypeManager_1.CookieMax_X && this.m_cookieNodesArray[i][cookie_Y] && this.m_cookieNodesArray[i][cookie_Y].getComponent("Cookie").getCookieType() == cookieType) {
            i += 1;
            horizontalLength += 1;
        }
        if (horizontalLength >= 3) {
            return true;
        }
        // Vertical chain check
        var verticalLength = 1;
        // Down
        i = cookie_Y - 1;
        while (i >= 0 && this.m_cookieNodesArray[cookie_X][i] && this.m_cookieNodesArray[cookie_X][i].getComponent("Cookie").getCookieType() == cookieType) {
            i -= 1;
            verticalLength += 1;
        }
        // Up
        i = cookie_Y + 1;
        while (i < ExtraCookieTypeManager_1.CookieMax_Y && this.m_cookieNodesArray[cookie_X][i] && this.m_cookieNodesArray[cookie_X][i].getComponent("Cookie").getCookieType() == cookieType) {
            i += 1;
            verticalLength += 1;
        }
        return verticalLength >= 3;
    };
    //extra的两个cookie或者normalcookie与extra allcookie交换时调用
    Level.prototype.detectExtraMatches = function (firstCookieNode, lastCookieNode) {
        var allMatchesArray = [];
        if (firstCookieNode != null && lastCookieNode != null) {
            var firstScript = firstCookieNode.getComponent("Cookie");
            var lastScript = lastCookieNode.getComponent("Cookie");
            if (firstScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal && lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_All) {
                var extraMatchedItem = this.detectExtraAllFuncMatches(lastScript.getCookieObject(), firstScript.getCookieType());
                extraMatchedItem.push(lastScript.getCookieObject());
                allMatchesArray.push(extraMatchedItem);
                lastScript.setExtraTrigerState(true);
            }
            else if (firstScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_All && lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal) {
                var extraMatchedItem = this.detectExtraAllFuncMatches(firstScript.getCookieObject(), lastScript.getCookieType());
                extraMatchedItem.push(firstScript.getCookieObject());
                allMatchesArray.push(extraMatchedItem);
                firstScript.setExtraTrigerState(true);
            }
            else if (firstScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_All && lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_All) {
                var extraMatchedItem = this.detectExtraAll_ALL_FuncMatches();
                if (extraMatchedItem.length > 0) {
                    allMatchesArray.push(extraMatchedItem);
                }
                firstScript.setExtraTrigerState(true);
                lastScript.setExtraTrigerState(true);
            }
            else if (firstScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_All && lastScript.getExtraType() != ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal) {
                var extraMatchedItem = this.changeNormalCookieFromExtraAllCookie(lastScript.getCookieObject());
                extraMatchedItem.push(firstScript.getCookieObject());
                extraMatchedItem.push(lastScript.getCookieObject());
                allMatchesArray.push(extraMatchedItem);
                firstScript.setExtraTrigerState(true);
            }
            else if (lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_All && firstScript.getExtraType() != ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal) {
                var extraMatchedItem = this.changeNormalCookieFromExtraAllCookie(firstScript.getCookieObject());
                extraMatchedItem.push(firstScript.getCookieObject());
                extraMatchedItem.push(lastScript.getCookieObject());
                allMatchesArray.push(extraMatchedItem);
                lastScript.setExtraTrigerState(true);
            }
            else if (firstScript.getExtraType() != ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal && lastScript.getExtraType() != ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal) {
                if (firstScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Bomb) {
                    if (lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Bomb) {
                        //5*5
                        var extraMatchedItem = this.detectExtraBombFuncMatches(firstScript.getCookieObject(), 2);
                        extraMatchedItem.push(firstScript.getCookieObject());
                        extraMatchedItem.push(lastScript.getCookieObject());
                        allMatchesArray.push(extraMatchedItem);
                    }
                    else if (lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Horizontal || lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Vertical) {
                        //3行+3列
                        var extraMatchedItem = this.detectExtraLine_X_Y_FuncMatches(lastScript.getCookieObject(), 1);
                        extraMatchedItem.push(firstScript.getCookieObject());
                        extraMatchedItem.push(lastScript.getCookieObject());
                        allMatchesArray.push(extraMatchedItem);
                    }
                }
                else if (firstScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Horizontal || firstScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Vertical) {
                    if (lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Bomb) {
                        //3行+3列
                        var extraMatchedItem = this.detectExtraLine_X_Y_FuncMatches(firstScript.getCookieObject(), 1);
                        extraMatchedItem.push(firstScript.getCookieObject());
                        extraMatchedItem.push(lastScript.getCookieObject());
                        allMatchesArray.push(extraMatchedItem);
                    }
                    else if (lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Horizontal || lastScript.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Vertical) {
                        //1行+1列
                        var extraMatchedItem = this.detectExtraLine_X_Y_FuncMatches(lastScript.getCookieObject(), 0);
                        extraMatchedItem.push(firstScript.getCookieObject());
                        extraMatchedItem.push(lastScript.getCookieObject());
                        allMatchesArray.push(extraMatchedItem);
                    }
                }
                firstScript.setExtraTrigerState(true);
                lastScript.setExtraTrigerState(true);
            }
        }
        return allMatchesArray;
    };
    //检测普通cookie组成的三消
    Level.prototype.detectMatches = function () {
        var allMatchesArray = [];
        var allHorizontalMatchesArray = this.detectHorizontalMatches();
        var allVerticalMatchesArray = this.detectVerticalMatches();
        //  combine matches array from horizontal and vertical matches array if possible
        if (allHorizontalMatchesArray.length == 0) {
            allMatchesArray = allVerticalMatchesArray;
        }
        else if (allVerticalMatchesArray.length == 0) {
            allMatchesArray = allHorizontalMatchesArray;
        }
        else {
            //  横、竖重叠的要合并成一个array
            for (var index_H = 0; index_H < allHorizontalMatchesArray.length; index_H++) {
                var element_H = allHorizontalMatchesArray[index_H];
                var hasSameCookie = false;
                for (var index_V = 0; index_V < allVerticalMatchesArray.length; index_V++) {
                    var element_V = allVerticalMatchesArray[index_V];
                    if (ExtraCookieTypeManager_1.default.getInstance().hasSameElementTwoArray(element_H, element_V)) {
                        hasSameCookie = true;
                        //combine
                        var combineArray = [];
                        for (var key in element_H) {
                            if (element_H.hasOwnProperty(key)) {
                                var element = element_H[key];
                                combineArray.push(element);
                            }
                        }
                        allHorizontalMatchesArray[index_H] = [];
                        for (var k_V in element_V) {
                            if (element_V.hasOwnProperty(k_V)) {
                                var ele = element_V[k_V];
                                var hasSame = false;
                                for (var index = 0; index < combineArray.length; index++) {
                                    var e = combineArray[index];
                                    if (ele.pos_X == e.pos_X && ele.pos_Y == e.pos_Y) {
                                        hasSame = true;
                                        break;
                                    }
                                }
                                if (!hasSame) {
                                    combineArray.push(ele);
                                }
                            }
                        }
                        allVerticalMatchesArray[index_V] = [];
                        allMatchesArray.push(combineArray);
                        break;
                    }
                }
                if (!hasSameCookie) {
                    allMatchesArray.push(element_H);
                }
            }
            for (var index_V = 0; index_V < allVerticalMatchesArray.length; index_V++) {
                var element_V = allVerticalMatchesArray[index_V];
                if (element_V.length > 0) {
                    allMatchesArray.push(element_V);
                }
            }
        }
        return allMatchesArray;
    };
    //  detect extra cookie func chains
    Level.prototype.detectExtraCookieFuncMatches = function (extraCookie) {
        var extraMatchedItem = [];
        if (extraCookie.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Horizontal || extraCookie.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Vertical) {
            extraMatchedItem = this.detectExtraLineFuncMatches(extraCookie);
        }
        else if (extraCookie.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_Bomb) {
            extraMatchedItem = this.detectExtraBombFuncMatches(extraCookie, 1);
        }
        else if (extraCookie.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_All) {
            var cookieType = Math.floor(Math.random() * ExtraCookieTypeManager_1.CookieType.CookieTypeCount);
            extraMatchedItem = this.detectExtraAllFuncMatches(extraCookie, cookieType);
        }
        return extraMatchedItem;
    };
    Level.prototype.detectExtraLineFuncMatches = function (extraCookie) {
        var extraMatchedItem = [];
        if (extraCookie.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Horizontal) {
            for (var index = 0; index < ExtraCookieTypeManager_1.CookieMax_X; index++) {
                var node = this.m_cookieNodesArray[index][extraCookie.pos_Y];
                if (node != null) {
                    var script = node.getComponent("Cookie");
                    var cookieObj = {
                        normalType: script.getCookieType(),
                        extraType: script.getExtraType(),
                        pos_X: script.getCookie_X_Y().x,
                        pos_Y: script.getCookie_X_Y().y,
                        isOpetation: script.getOperationState(),
                        isExtraTriger: script.getExtraTrigerState()
                    };
                    extraMatchedItem.push(cookieObj);
                }
            }
        }
        else {
            for (var index = 0; index < ExtraCookieTypeManager_1.CookieMax_Y; index++) {
                var node = this.m_cookieNodesArray[extraCookie.pos_X][index];
                if (node != null) {
                    var script = node.getComponent("Cookie");
                    var cookieObj = {
                        normalType: script.getCookieType(),
                        extraType: script.getExtraType(),
                        pos_X: script.getCookie_X_Y().x,
                        pos_Y: script.getCookie_X_Y().y,
                        isOpetation: script.getOperationState(),
                        isExtraTriger: script.getExtraTrigerState()
                    };
                    extraMatchedItem.push(cookieObj);
                }
            }
        }
        return extraMatchedItem;
    };
    //炸弹消除队列检测，offset=1，默认消除3*3；offset=2，两个bomb的cookie叠加效果消除
    Level.prototype.detectExtraBombFuncMatches = function (extraCookie, offset) {
        var extraMatchedItem = [];
        if (extraCookie.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_Bomb) {
            for (var index_X = extraCookie.pos_X - offset; index_X <= extraCookie.pos_X + offset; index_X++) {
                for (var index_Y = extraCookie.pos_Y - offset; index_Y <= extraCookie.pos_Y + offset; index_Y++) {
                    if (index_X >= 0 && index_X < ExtraCookieTypeManager_1.CookieMax_X && index_Y >= 0 && index_Y < ExtraCookieTypeManager_1.CookieMax_Y) {
                        var node = this.m_cookieNodesArray[index_X][index_Y];
                        if (node != null) {
                            var script = node.getComponent("Cookie");
                            var cookieObj = {
                                normalType: script.getCookieType(),
                                extraType: script.getExtraType(),
                                pos_X: script.getCookie_X_Y().x,
                                pos_Y: script.getCookie_X_Y().y,
                                isOpetation: script.getOperationState(),
                                isExtraTriger: script.getExtraTrigerState()
                            };
                            extraMatchedItem.push(cookieObj);
                        }
                    }
                }
            }
        }
        return extraMatchedItem;
    };
    //bomb的cookie与line的cookie混合消除或者两个line的cookie混合消除，line 的中心点以一个line的cookie为参考
    Level.prototype.detectExtraLine_X_Y_FuncMatches = function (lineCookieObj, offset) {
        var extraMatchedItem = [];
        // if (extraCookie.extraType == CookieExtraType.Extra_Bomb)
        // {
        //添加整列
        for (var index_X = lineCookieObj.pos_X - offset; index_X <= lineCookieObj.pos_X + offset; index_X++) {
            for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y; index_Y++) {
                if (index_X >= 0 && index_X < ExtraCookieTypeManager_1.CookieMax_X && index_Y >= 0 && index_Y < ExtraCookieTypeManager_1.CookieMax_Y) {
                    var node = this.m_cookieNodesArray[index_X][index_Y];
                    if (node != null) {
                        var script = node.getComponent("Cookie");
                        var cookieObj = {
                            normalType: script.getCookieType(),
                            extraType: script.getExtraType(),
                            pos_X: script.getCookie_X_Y().x,
                            pos_Y: script.getCookie_X_Y().y,
                            isOpetation: script.getOperationState(),
                            isExtraTriger: script.getExtraTrigerState()
                        };
                        extraMatchedItem.push(cookieObj);
                    }
                }
            }
        }
        //添加整行
        for (var index_Y = lineCookieObj.pos_Y - offset; index_Y <= lineCookieObj.pos_Y + offset; index_Y++) {
            for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
                if (index_X >= 0 && index_X < ExtraCookieTypeManager_1.CookieMax_X && index_Y >= 0 && index_Y < ExtraCookieTypeManager_1.CookieMax_Y) {
                    var node = this.m_cookieNodesArray[index_X][index_Y];
                    if (node != null) {
                        var script = node.getComponent("Cookie");
                        var cookieObj = {
                            normalType: script.getCookieType(),
                            extraType: script.getExtraType(),
                            pos_X: script.getCookie_X_Y().x,
                            pos_Y: script.getCookie_X_Y().y,
                            isOpetation: script.getOperationState(),
                            isExtraTriger: script.getExtraTrigerState()
                        };
                        var hasAdded = false;
                        for (var key in extraMatchedItem) {
                            if (extraMatchedItem.hasOwnProperty(key)) {
                                var element = extraMatchedItem[key];
                                if (element.pos_X == cookieObj.pos_X && element.pos_Y == cookieObj.pos_Y) {
                                    hasAdded = true;
                                    break;
                                }
                            }
                        }
                        if (!hasAdded) {
                            extraMatchedItem.push(cookieObj);
                        }
                    }
                }
            }
        }
        // }
        return extraMatchedItem;
    };
    //两个all的cookie组合，全屏消除
    Level.prototype.detectExtraAll_ALL_FuncMatches = function () {
        var extraMatchedItem = [];
        for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
            for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y; index_Y++) {
                var node = this.m_cookieNodesArray[index_X][index_Y];
                if (node == null) {
                    continue;
                }
                var script = node.getComponent("Cookie");
                extraMatchedItem.push(script.getCookieObject());
            }
        }
        return extraMatchedItem;
    };
    //all的cookie被触发后消除某个类型的cookie
    Level.prototype.detectExtraAllFuncMatches = function (extraCookie, targetCookieType) {
        var extraMatchedItem = [];
        if (extraCookie.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_All && !extraCookie.isExtraTriger) {
            for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
                for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y; index_Y++) {
                    var node = this.m_cookieNodesArray[index_X][index_Y];
                    if (node == null) {
                        continue;
                    }
                    var script = node.getComponent("Cookie");
                    if (script.getCookieType() == targetCookieType) {
                        extraMatchedItem.push(script.getCookieObject());
                    }
                }
            }
        }
        return extraMatchedItem;
    };
    //all的cookie与extra的其他cookie混合触发后，将其他类型的同normal类型cookie变成类似的extra类型cookie
    Level.prototype.changeNormalCookieFromExtraAllCookie = function (extraCookie) {
        var extraMatchedItem = [];
        for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
            for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y; index_Y++) {
                var node = this.m_cookieNodesArray[index_X][index_Y];
                if (node == null) {
                    continue;
                }
                var script = node.getComponent("Cookie");
                if (script.getCookieType() == extraCookie.normalType && script.getExtraType() == ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal) {
                    if (extraCookie.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_Bomb) {
                        script.setExtraType(ExtraCookieTypeManager_1.CookieExtraType.Extra_Bomb);
                    }
                    else if (extraCookie.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Horizontal || extraCookie.extraType == ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Vertical) {
                        script.setExtraType(Math.random() < 0.5 ? ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Horizontal : ExtraCookieTypeManager_1.CookieExtraType.Extra_Line_Vertical);
                    }
                    extraMatchedItem.push(script.getCookieObject());
                }
            }
        }
        return extraMatchedItem;
    };
    //  detect horizontal chains
    Level.prototype.detectHorizontalMatches = function () {
        var allHorizontalMatchesArray = [];
        for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y; index_Y++) {
            var horizontalMatchedItem = [];
            var firstCookieNode = null;
            for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X - 2;) {
                firstCookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (firstCookieNode == null) {
                    index_X++;
                    continue;
                }
                horizontalMatchedItem = [];
                var firstScript = firstCookieNode.getComponent("Cookie");
                var firstCookieType = firstScript.getCookieType();
                var cookieObj = {
                    normalType: firstCookieType,
                    extraType: firstScript.getExtraType(),
                    pos_X: firstScript.getCookie_X_Y().x,
                    pos_Y: firstScript.getCookie_X_Y().y,
                    isOpetation: firstScript.getOperationState(),
                    isExtraTriger: firstScript.getExtraTrigerState()
                };
                horizontalMatchedItem.push(cookieObj);
                var idx = index_X + 1;
                for (; idx < ExtraCookieTypeManager_1.CookieMax_X; idx++) {
                    var cookieItemNode = this.m_cookieNodesArray[idx][index_Y];
                    if (cookieItemNode == null) {
                        break;
                    }
                    var cookieItemScript = cookieItemNode.getComponent("Cookie");
                    if (cookieItemScript.getCookieType() == firstCookieType) {
                        var cookieObj_1 = {
                            normalType: firstCookieType,
                            extraType: cookieItemScript.getExtraType(),
                            pos_X: cookieItemScript.getCookie_X_Y().x,
                            pos_Y: cookieItemScript.getCookie_X_Y().y,
                            isOpetation: cookieItemScript.getOperationState(),
                            isExtraTriger: cookieItemScript.getExtraTrigerState()
                        };
                        horizontalMatchedItem.push(cookieObj_1);
                    }
                    else {
                        break;
                    }
                }
                if (horizontalMatchedItem.length >= 3) {
                    allHorizontalMatchesArray.push(horizontalMatchedItem);
                    index_X = idx;
                }
                else {
                    index_X++;
                }
            }
        }
        return allHorizontalMatchesArray;
    };
    //  detect vertical chains
    Level.prototype.detectVerticalMatches = function () {
        var allVerticalMatchesArray = [];
        for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
            var verticalMatchedItem = [];
            var firstCookieNode = null;
            for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y - 2;) {
                firstCookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (firstCookieNode == null) {
                    index_Y++;
                    continue;
                }
                verticalMatchedItem = [];
                var firstScript = firstCookieNode.getComponent("Cookie");
                var firstCookieType = firstScript.getCookieType();
                var cookieObj = {
                    normalType: firstCookieType,
                    extraType: firstScript.getExtraType(),
                    pos_X: firstScript.getCookie_X_Y().x,
                    pos_Y: firstScript.getCookie_X_Y().y,
                    isOpetation: firstScript.getOperationState(),
                    isExtraTriger: firstScript.getExtraTrigerState()
                };
                verticalMatchedItem.push(cookieObj);
                var idx_y = index_Y + 1;
                for (; idx_y < ExtraCookieTypeManager_1.CookieMax_Y; idx_y++) {
                    var cookieItemNode = this.m_cookieNodesArray[index_X][idx_y];
                    if (cookieItemNode == null) {
                        break;
                    }
                    var cookieItemScript = cookieItemNode.getComponent("Cookie");
                    if (cookieItemScript.getCookieType() == firstCookieType) {
                        var cookieObj_2 = {
                            normalType: firstCookieType,
                            extraType: cookieItemScript.getExtraType(),
                            pos_X: cookieItemScript.getCookie_X_Y().x,
                            pos_Y: cookieItemScript.getCookie_X_Y().y,
                            isOpetation: cookieItemScript.getOperationState(),
                            isExtraTriger: cookieItemScript.getExtraTrigerState()
                        };
                        verticalMatchedItem.push(cookieObj_2);
                    }
                    else {
                        break;
                    }
                }
                if (verticalMatchedItem.length >= 3) {
                    allVerticalMatchesArray.push(verticalMatchedItem);
                    index_Y = idx_y;
                }
                else {
                    index_Y++;
                }
            }
        }
        return allVerticalMatchesArray;
    };
    Level.prototype.removeMatches = function (matchesArray) {
        var delayTime = exports.CookieAnimationTimeInterval * 2;
        this.playMatchAudio();
        var allExrtaMatchesArray = [];
        for (var index = 0; index < matchesArray.length; index++) {
            var element = matchesArray[index];
            for (var key in element) {
                if (element.hasOwnProperty(key)) {
                    var ele = element[key];
                    if (ele.pos_X >= 0 && ele.pos_X < ExtraCookieTypeManager_1.CookieMax_X && ele.pos_Y >= 0 && ele.pos_Y < ExtraCookieTypeManager_1.CookieMax_Y) {
                        var itemNode = this.m_cookieNodesArray[ele.pos_X][ele.pos_Y];
                        if (itemNode != null) {
                            var itemScript = itemNode.getComponent("Cookie");
                            if (itemScript.getExtraType() != ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal && !itemScript.getExtraTrigerState()) {
                                //特殊道具产生的消除
                                var extraMatches = this.detectExtraCookieFuncMatches(itemScript.getCookieObject());
                                if (extraMatches.length > 0) {
                                    // this.removeMatches(extraMatches);
                                    allExrtaMatchesArray.push(extraMatches);
                                }
                            }
                            this.m_cookieNodesArray[ele.pos_X][ele.pos_Y] = null;
                            itemNode.runAction(cc.sequence(cc.fadeOut(exports.CookieAnimationTimeInterval), cc.delayTime(exports.CookieAnimationTimeInterval), cc.removeSelf()));
                        }
                    }
                }
            }
            this.restoreCookieOperateState();
            if (element.length > 3) {
                var extraCookieTypeData = ExtraCookieTypeManager_1.default.getInstance().getExtraCookieTypeByChain(element);
                if (extraCookieTypeData != null && this.m_cookieNodesArray[extraCookieTypeData.pos_X][extraCookieTypeData.pos_Y] == null) {
                    var cookieItem = this.createCookieAtLevel(extraCookieTypeData.pos_X, extraCookieTypeData.pos_Y, extraCookieTypeData.normalType, extraCookieTypeData.extraType, this.getCookiePosition(extraCookieTypeData.pos_X, extraCookieTypeData.pos_Y));
                    cookieItem.runAction(cc.sequence(cc.scaleTo(exports.CookieAnimationTimeInterval, 1.2), cc.scaleTo(exports.CookieAnimationTimeInterval, 1)));
                }
            }
        }
        //
        if (allExrtaMatchesArray.length > 0) {
            delayTime = exports.CookieAnimationTimeInterval * 3;
            this.removeMatches(allExrtaMatchesArray);
        }
        return delayTime;
    };
    //  消除之后cookie下落将下面的hole填满
    Level.prototype.checkFillHolesAnimation = function () {
        if (this.checkFillHoles()) {
            //  drop down to fill holes
            this.node.runAction(cc.sequence(cc.delayTime(exports.CookieAnimationTimeInterval), cc.callFunc(function () {
                this.checkFillHolesAnimation();
            }.bind(this))));
        }
        else {
            //  top up to create new cookie
            this.checkTopUpCookiesAnimation();
        }
    };
    Level.prototype.checkFillHoles = function () {
        var needDropToFill = false;
        for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
            for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y - 1; index_Y++) {
                var cookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (cookieNode == null && this.m_tilesNodesArray[index_X][index_Y] != null) {
                    // cookie above shoule drop down here
                    for (var idx = index_Y + 1; idx < ExtraCookieTypeManager_1.CookieMax_Y; idx++) {
                        var itemNode = this.m_cookieNodesArray[index_X][idx];
                        if (itemNode != null) {
                            needDropToFill = true;
                            break;
                        }
                    }
                }
                if (needDropToFill) {
                    break;
                }
            }
            if (needDropToFill) {
                break;
            }
        }
        if (needDropToFill) {
            this.fillHoles();
        }
        return needDropToFill;
    };
    Level.prototype.fillHoles = function () {
        this.playFallingAudio();
        for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
            for (var index_Y = 0; index_Y < ExtraCookieTypeManager_1.CookieMax_Y - 1; index_Y++) {
                var cookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (cookieNode == null && this.m_tilesNodesArray[index_X][index_Y] != null) {
                    // cookie above shoule drop down here
                    for (var idx = index_Y + 1; idx < ExtraCookieTypeManager_1.CookieMax_Y; idx++) {
                        var itemNode = this.m_cookieNodesArray[index_X][idx];
                        if (itemNode != null) {
                            this.m_cookieNodesArray[index_X][index_Y] = itemNode;
                            this.m_cookieNodesArray[index_X][idx] = null;
                            var itemScript = itemNode.getComponent("Cookie");
                            itemScript.setCookie_X_Y(index_X, index_Y);
                            itemNode.runAction(cc.moveTo(exports.CookieAnimationTimeInterval * Math.abs(idx - index_Y), this.getCookiePosition(index_X, index_Y)));
                            break;
                        }
                    }
                    break;
                }
            }
        }
    };
    //  由上方产生新的cookie并且降落填充
    Level.prototype.checkTopUpCookiesAnimation = function () {
        if (this.checkTopUpCookies()) {
            this.node.runAction(cc.sequence(cc.delayTime(exports.CookieAnimationTimeInterval), cc.callFunc(function () {
                this.checkTopUpCookiesAnimation();
            }.bind(this))));
        }
        else {
            this.node.runAction(cc.sequence(cc.delayTime(exports.CookieAnimationTimeInterval), cc.callFunc(function () {
                this.detectAllChains();
            }.bind(this))));
        }
    };
    Level.prototype.checkTopUpCookies = function () {
        var needTopUpCookie = false;
        for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
            for (var index_Y = ExtraCookieTypeManager_1.CookieMax_Y - 1; index_Y >= 0; index_Y--) {
                var cookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (cookieNode == null && this.m_tilesNodesArray[index_X][index_Y] != null) {
                    needTopUpCookie = true;
                    break;
                }
            }
            if (needTopUpCookie) {
                break;
            }
        }
        if (needTopUpCookie) {
            this.topUpCookies();
        }
        return needTopUpCookie;
    };
    //  上方产生cookie填充上面数最后一个空白cookie
    Level.prototype.topUpCookies = function () {
        this.playAddCookiesAudio();
        for (var index_X = 0; index_X < ExtraCookieTypeManager_1.CookieMax_X; index_X++) {
            //  get top empty tile position
            var maxY = ExtraCookieTypeManager_1.CookieMax_Y;
            for (var index_Y = ExtraCookieTypeManager_1.CookieMax_Y - 1; index_Y >= 0; index_Y--) {
                var tileNode = this.m_tilesNodesArray[index_X][index_Y];
                if (tileNode != null) {
                    break;
                }
                else {
                    maxY = index_Y;
                }
            }
            //  get bottom tile position with empty cookie
            var finalY = ExtraCookieTypeManager_1.CookieMax_Y - 1;
            for (var tmpY = ExtraCookieTypeManager_1.CookieMax_Y - 1; tmpY >= 0; tmpY--) {
                if (this.m_tilesNodesArray[index_X][tmpY] != null && this.m_cookieNodesArray[index_X][tmpY] == null) {
                    finalY = tmpY;
                }
            }
            //  create cookie at top and drop it down
            if (this.m_tilesNodesArray[index_X][finalY] != null && this.m_cookieNodesArray[index_X][finalY] == null) {
                var cookieType = Math.floor(Math.random() * ExtraCookieTypeManager_1.CookieType.CookieTypeCount);
                var cookieItem = this.createCookieAtLevel(index_X, finalY, cookieType, ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal, this.getCookiePosition(index_X, maxY));
                cookieItem.runAction(cc.moveTo(exports.CookieAnimationTimeInterval * (Math.abs(maxY - finalY)), this.getCookiePosition(index_X, finalY)));
            }
        }
    };
    Level.prototype.createCookieAtLevel = function (index_X, index_Y, cookieType, extraCookieType, cookieStartPos) {
        if (extraCookieType === void 0) { extraCookieType = ExtraCookieTypeManager_1.CookieExtraType.Extra_Normal; }
        var node = cc.instantiate(this.m_cookieInstance);
        if (cookieStartPos) {
            node.setPosition(cookieStartPos);
        }
        else {
            node.setPosition(this.getCookiePosition(index_X, index_Y));
        }
        this.m_cookieNode.addChild(node);
        this.m_cookieNodesArray[index_X][index_Y] = node;
        var script = node.getComponent("Cookie");
        script.init(index_X, index_Y, cookieType, extraCookieType);
        script.setCookieMovingSwapDelegate(function (cookieNode, swapDirection) {
            this.controlAllCookieTouchable(false);
            this.startSwapCookies(cookieNode, swapDirection);
        }.bind(this));
        return node;
    };
    Level.prototype.getCookiePosition = function (index_X, index_Y) {
        var itemPos = cc.Vec2.ZERO;
        itemPos.x = Cookie_1.CookieTile_Width / 2 + Cookie_1.CookieTile_Width * index_X;
        itemPos.y = Cookie_1.CookieTile_Height / 2 + Cookie_1.CookieTile_Height * index_Y;
        return itemPos;
    };
    Level.prototype.loadAudioRes = function () {
        cc.loader.loadRes("music/Chomp", cc.AudioClip, function (err, clip) {
            this.m_swapAudioClip = clip;
        }.bind(this));
        cc.loader.loadRes("music/Error", cc.AudioClip, function (err, clip) {
            this.m_invalidSwapAudioClip = clip;
        }.bind(this));
        cc.loader.loadRes("music/KaChing", cc.AudioClip, function (err, clip) {
            this.m_matchAudioClip = clip;
        }.bind(this));
        cc.loader.loadRes("music/Scrape", cc.AudioClip, function (err, clip) {
            this.m_fallingAudioClip = clip;
        }.bind(this));
        cc.loader.loadRes("music/Drip", cc.AudioClip, function (err, clip) {
            this.m_addCookiesAudioClip = clip;
        }.bind(this));
    };
    Level.prototype.playSwapAudio = function () {
        if (this.m_swapAudioClip == null) {
            return;
        }
        var audioID = cc.audioEngine.playEffect(this.m_swapAudioClip, false);
    };
    Level.prototype.playInvalidSwapAudio = function () {
        if (this.m_invalidSwapAudioClip == null) {
            return;
        }
        var audioID = cc.audioEngine.playEffect(this.m_invalidSwapAudioClip, false);
    };
    Level.prototype.playMatchAudio = function () {
        if (this.m_matchAudioClip == null) {
            return;
        }
        var audioID = cc.audioEngine.playEffect(this.m_matchAudioClip, false);
    };
    Level.prototype.playFallingAudio = function () {
        if (this.m_fallingAudioClip == null) {
            return;
        }
        var audioID = cc.audioEngine.playEffect(this.m_fallingAudioClip, false);
    };
    Level.prototype.playAddCookiesAudio = function () {
        if (this.m_addCookiesAudioClip == null) {
            return;
        }
        var audioID = cc.audioEngine.playEffect(this.m_addCookiesAudioClip, false);
    };
    __decorate([
        property(cc.Node)
    ], Level.prototype, "m_tileNode", void 0);
    __decorate([
        property(cc.Node)
    ], Level.prototype, "m_cookieNode", void 0);
    __decorate([
        property(cc.Node)
    ], Level.prototype, "m_tileNodeInstance", void 0);
    Level = __decorate([
        ccclass
    ], Level);
    return Level;
}(cc.Component));
exports.default = Level;

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
        //# sourceMappingURL=Level.js.map
        