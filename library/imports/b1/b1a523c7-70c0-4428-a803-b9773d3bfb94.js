"use strict";
cc._RF.push(module, 'b1a52PHcMBEKKgDuXc9O/uU', 'ExtraCookieTypeManager');
// Script/Data/ExtraCookieTypeManager.ts

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
exports.CookieMax_X = 9;
exports.CookieMax_Y = 9;
var CookieType;
(function (CookieType) {
    CookieType[CookieType["Sprite_0"] = 0] = "Sprite_0";
    CookieType[CookieType["Sprite_1"] = 1] = "Sprite_1";
    CookieType[CookieType["Sprite_2"] = 2] = "Sprite_2";
    CookieType[CookieType["Sprite_3"] = 3] = "Sprite_3";
    CookieType[CookieType["Sprite_4"] = 4] = "Sprite_4";
    CookieType[CookieType["Sprite_5"] = 5] = "Sprite_5";
    CookieType[CookieType["CookieTypeCount"] = 6] = "CookieTypeCount";
    CookieType[CookieType["NONE"] = 7] = "NONE"; //特殊类型，不通过三个相同类型消除
})(CookieType = exports.CookieType || (exports.CookieType = {}));
var CookieExtraType;
(function (CookieExtraType) {
    CookieExtraType[CookieExtraType["Extra_Normal"] = 0] = "Extra_Normal";
    CookieExtraType[CookieExtraType["Extra_Line_Horizontal"] = 1] = "Extra_Line_Horizontal";
    CookieExtraType[CookieExtraType["Extra_Line_Vertical"] = 2] = "Extra_Line_Vertical";
    CookieExtraType[CookieExtraType["Extra_Bomb"] = 3] = "Extra_Bomb";
    CookieExtraType[CookieExtraType["Extra_All"] = 4] = "Extra_All";
    CookieExtraType[CookieExtraType["CookieTypeMax"] = 5] = "CookieTypeMax";
})(CookieExtraType = exports.CookieExtraType || (exports.CookieExtraType = {}));
;
;
var g_cookieDataMgr = null;
var ExtraCookieTypeManager = /** @class */ (function (_super) {
    __extends(ExtraCookieTypeManager, _super);
    function ExtraCookieTypeManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtraCookieTypeManager_1 = ExtraCookieTypeManager;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    ExtraCookieTypeManager.prototype.start = function () {
    };
    // update (dt) {}
    ExtraCookieTypeManager.getInstance = function () {
        if (g_cookieDataMgr == null) {
            g_cookieDataMgr = new ExtraCookieTypeManager_1();
        }
        return g_cookieDataMgr;
    };
    ExtraCookieTypeManager.prototype.getExtraCookieTypeByChain = function (chains) {
        if (chains.length <= 0) {
            return null;
        }
        //检测是否有同类型连续cookie
        var continueXCountArray = []; //x方向每列cookie数量
        var continueYCountArray = []; //y方向每行cookie数量
        var cookieTypeArray = []; //每种类型的cookie的数量
        var continueChainsAll_X = []; //x方向所有连续的chain
        var continueChainsAll_Y = []; //y方向所有连续的chain
        var combineSameTypeChains = []; //
        for (var index = 0; index < exports.CookieMax_X; index++) {
            continueXCountArray[index] = 0;
        }
        for (var index = 0; index < exports.CookieMax_Y; index++) {
            continueYCountArray[index] = 0;
        }
        for (var index = 0; index < CookieType.CookieTypeCount; index++) {
            cookieTypeArray.push(0);
        }
        //cookie信息统计
        for (var index = 0; index < chains.length; index++) {
            var element = chains[index];
            continueXCountArray[element.pos_X]++;
            continueYCountArray[element.pos_Y]++;
            cookieTypeArray[element.normalType]++;
        }
        //cookie信息分析
        for (var index_Type = 0; index_Type < cookieTypeArray.length; index_Type++) {
            var typeCount = cookieTypeArray[index_Type]; //extra类型，同类型至少达到4个
            if (typeCount >= 4) {
                //y固定沿着x方向检测
                for (var index_Y = 0; index_Y < continueYCountArray.length; index_Y++) {
                    var yCount = continueYCountArray[index_Y];
                    if (yCount >= 3) {
                        var tmpArray = [];
                        for (var index_X = 0; index_X < chains.length; index_X++) {
                            var startObj = chains[index_X];
                            if (startObj.normalType == index_Type && startObj.pos_Y == index_Y) {
                                tmpArray.push(startObj);
                            }
                        }
                        tmpArray.sort(this.comparison_function_X);
                        if (tmpArray.length >= 3) {
                            var itemArray = [];
                            for (var i = 0; i < tmpArray.length - 2;) {
                                itemArray = [];
                                var element = tmpArray[i];
                                itemArray.push(element);
                                var j = i + 1;
                                for (; j < tmpArray.length; j++) {
                                    var ele = tmpArray[j];
                                    if (Math.abs(element.pos_X - ele.pos_X) == 1) {
                                        element = ele;
                                        itemArray.push(ele);
                                    }
                                    else {
                                        break;
                                    }
                                }
                                if (itemArray.length >= 3) {
                                    continueChainsAll_X.push(itemArray);
                                    i = j;
                                }
                                else {
                                    i++;
                                }
                            }
                        }
                    }
                }
                //x固定沿着y方向
                for (var index_X = 0; index_X < continueXCountArray.length; index_X++) {
                    var xCount = continueXCountArray[index_X];
                    if (xCount >= 3) {
                        var tmpArray = [];
                        for (var index_Y = 0; index_Y < chains.length; index_Y++) {
                            var startObj = chains[index_Y];
                            if (startObj.normalType == index_Type && startObj.pos_X == index_X) {
                                tmpArray.push(startObj);
                            }
                        }
                        tmpArray.sort(this.comparison_function_Y);
                        if (tmpArray.length >= 3) {
                            var itemArray = [];
                            for (var i = 0; i < tmpArray.length - 2;) {
                                itemArray = [];
                                var element = tmpArray[i];
                                itemArray.push(element);
                                var j = i + 1;
                                for (; j < tmpArray.length; j++) {
                                    var ele = tmpArray[j];
                                    if (Math.abs(element.pos_Y - ele.pos_Y) == 1) {
                                        element = ele;
                                        itemArray.push(ele);
                                    }
                                    else {
                                        break;
                                    }
                                }
                                if (itemArray.length >= 3) {
                                    continueChainsAll_Y.push(itemArray);
                                    i = j;
                                }
                                else {
                                    i++;
                                }
                            }
                        }
                    }
                }
                //combine x and y direction chains
                if (continueChainsAll_X.length > 0 && continueChainsAll_Y.length > 0) {
                    //  横、竖重叠的要合并成一个array
                    for (var index_H = 0; index_H < continueChainsAll_X.length; index_H++) {
                        var element_H = continueChainsAll_X[index_H];
                        var hasSameCookie = false;
                        for (var index_V = 0; index_V < continueChainsAll_Y.length; index_V++) {
                            var element_V = continueChainsAll_Y[index_V];
                            if (this.hasSameElementTwoArray(element_H, element_V)) {
                                hasSameCookie = true;
                                //combine
                                var combineArray = [];
                                for (var key in element_H) {
                                    if (element_H.hasOwnProperty(key)) {
                                        var element = element_H[key];
                                        combineArray.push(element);
                                    }
                                }
                                continueChainsAll_X[index_H] = [];
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
                                continueChainsAll_Y[index_V] = [];
                                combineSameTypeChains.push(combineArray);
                                break;
                            }
                        }
                        if (!hasSameCookie) {
                            combineSameTypeChains.push(element_H);
                        }
                    }
                    for (var index_V = 0; index_V < continueChainsAll_Y.length; index_V++) {
                        var element_V = continueChainsAll_Y[index_V];
                        if (element_V.length > 0) {
                            combineSameTypeChains.push(element_V);
                        }
                    }
                }
                else {
                    if (continueChainsAll_X.length > 0) {
                        combineSameTypeChains = continueChainsAll_X;
                    }
                    if (continueChainsAll_Y.length > 0) {
                        combineSameTypeChains = continueChainsAll_Y;
                    }
                }
            }
        }
        for (var index = 0; index < combineSameTypeChains.length; index++) {
            var element = combineSameTypeChains[index];
            var obj = this.getExtraCookieTypeBySameTypeChain(element);
            if (obj != null) {
                return obj;
            }
        }
    };
    ExtraCookieTypeManager.prototype.hasSameElementTwoArray = function (firstArray, lastArray) {
        var hasSameElement = false;
        for (var key_first in firstArray) {
            if (firstArray.hasOwnProperty(key_first)) {
                var element_first = firstArray[key_first];
                for (var key_last in lastArray) {
                    if (lastArray.hasOwnProperty(key_last)) {
                        var element_last = lastArray[key_last];
                        if (element_first.pos_X == element_last.pos_X && element_first.pos_Y == element_last.pos_Y) {
                            hasSameElement = true;
                            break;
                        }
                    }
                }
                if (hasSameElement) {
                    break;
                }
            }
        }
        return hasSameElement;
    };
    ExtraCookieTypeManager.prototype.getExtraCookieTypeBySameTypeChain = function (chains) {
        if (chains.length <= 3) {
            return null;
        }
        var normalType = CookieType.CookieTypeCount;
        var extraType = CookieExtraType.Extra_Normal;
        var target_X = exports.CookieMax_X;
        var target_Y = exports.CookieMax_Y;
        var maxXArray = [];
        var maxYArray = [];
        var cookieNormalTypeArray = [];
        for (var index = 0; index < exports.CookieMax_X; index++) {
            maxXArray[index] = 0;
        }
        for (var index = 0; index < exports.CookieMax_Y; index++) {
            maxYArray[index] = 0;
        }
        for (var index = 0; index < CookieType.CookieTypeCount; index++) {
            cookieNormalTypeArray.push(0);
        }
        var hasOpetation = false;
        for (var index = 0; index < chains.length; index++) {
            var element = chains[index];
            maxXArray[element.pos_X]++;
            maxYArray[element.pos_Y]++;
            cookieNormalTypeArray[element.normalType]++;
            if (element.isOpetation) {
                hasOpetation = true;
                target_X = element.pos_X;
                target_Y = element.pos_Y;
            }
            if (index == 0) {
                normalType = element.normalType;
            }
        }
        //  如果消除组不是同样的普通类型的无法产生特殊cookie
        var cookieTypeCount = 0;
        for (var index = 0; index < cookieNormalTypeArray.length; index++) {
            var element = cookieNormalTypeArray[index];
            if (element > 1) {
                cookieTypeCount++;
            }
        }
        if (cookieTypeCount > 1) {
            return null;
        }
        var maxCountValueX = maxXArray[0];
        var maxCountValueY = maxYArray[0];
        var maxX = 0;
        var maxY = 0;
        for (var index = 1; index < maxXArray.length; index++) {
            var element = maxXArray[index];
            if (element > maxCountValueX) {
                maxCountValueX = element;
                maxX = index;
            }
        }
        for (var index = 0; index < maxYArray.length; index++) {
            var element = maxYArray[index];
            if (element > maxCountValueY) {
                maxCountValueY = element;
                maxY = index;
            }
        }
        if (maxCountValueX >= 5 || maxCountValueY >= 5) {
            extraType = CookieExtraType.Extra_All;
            normalType = CookieType.NONE;
        }
        else if (maxCountValueX >= 3 && maxCountValueY >= 3) {
            extraType = CookieExtraType.Extra_Bomb;
        }
        else {
            extraType = maxCountValueX > 3 ? CookieExtraType.Extra_Line_Horizontal : CookieExtraType.Extra_Line_Vertical;
        }
        //掉落时自动产生的
        if (!hasOpetation) {
            if (extraType == CookieExtraType.Extra_Line_Horizontal || extraType == CookieExtraType.Extra_Line_Vertical) {
                var element = chains[1];
                target_X = element.pos_X;
                target_Y = element.pos_Y;
            }
            else if (extraType == CookieExtraType.Extra_All) {
                var element = chains[2];
                target_X = element.pos_X;
                target_Y = element.pos_Y;
            }
            else {
                target_X = maxX;
                target_Y = maxY;
            }
        }
        var cookieObj = {
            normalType: normalType,
            extraType: extraType,
            pos_X: target_X,
            pos_Y: target_Y,
            isOpetation: false,
            isExtraTriger: false
        };
        return cookieObj;
    };
    ExtraCookieTypeManager.prototype.comparison_function_X = function (x, y) {
        if (x.pos_X < y.pos_X) {
            return -1;
        }
        else if (x.pos_X > y.pos_X) {
            return 1;
        }
        else {
            return 0;
        }
    };
    ExtraCookieTypeManager.prototype.comparison_function_Y = function (x, y) {
        if (x.pos_Y < y.pos_Y) {
            return -1;
        }
        else if (x.pos_Y > y.pos_Y) {
            return 1;
        }
        else {
            return 0;
        }
    };
    var ExtraCookieTypeManager_1;
    ExtraCookieTypeManager = ExtraCookieTypeManager_1 = __decorate([
        ccclass
    ], ExtraCookieTypeManager);
    return ExtraCookieTypeManager;
}(cc.Component));
exports.default = ExtraCookieTypeManager;

cc._RF.pop();