window.__require = function e(o, t, i) {
function r(n, c) {
if (!t[n]) {
if (!o[n]) {
var p = n.split("/");
p = p[p.length - 1];
if (!o[p]) {
var s = "function" == typeof __require && __require;
if (!c && s) return s(p, !0);
if (a) return a(p, !0);
throw new Error("Cannot find module '" + n + "'");
}
}
var l = t[n] = {
exports: {}
};
o[n][0].call(l.exports, function(e) {
return r(o[n][1][e] || e);
}, l, l.exports, e, o, t, i);
}
return t[n].exports;
}
for (var a = "function" == typeof __require && __require, n = 0; n < i.length; n++) r(i[n]);
return r;
}({
Cookie: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "65fe2qVfTZKpIaALnW70HtL", "Cookie");
Object.defineProperty(t, "__esModule", {
value: !0
});
var i, r = e("../Data/ExtraCookieTypeManager"), a = cc._decorator, n = a.ccclass, c = a.property;
(function(e) {
e[e.NONE = 0] = "NONE";
e[e.LEFT = 1] = "LEFT";
e[e.UP = 2] = "UP";
e[e.RIGHT = 3] = "RIGHT";
e[e.DOWN = 4] = "DOWN";
})(i = t.CookieSwapDirection || (t.CookieSwapDirection = {}));
t.CookieTile_Width = 96;
t.CookieTile_Height = 108;
var p = function(e) {
__extends(o, e);
function o() {
var o = null !== e && e.apply(this, arguments) || this;
o.m_button = null;
o.cookieTypeObject = {
normalType: r.CookieType.Sprite_0,
extraType: r.CookieExtraType.Extra_Normal,
pos_X: r.CookieMax_X,
pos_Y: r.CookieMax_Y,
isOpetation: !1,
isExtraTriger: !1
};
o.cookieNormalSpriteArray = [];
o.cookieHighlightedSpriteArray = [];
o.cookieExtraLineHorizontalSprite = null;
o.cookieExtraLineVerticalSprite = null;
o.cookieExtraBombSprite = null;
o.cookieExtraAllSprite = null;
o.cookieExtraLineHorizontalNormalArray = [];
o.cookieExtraLineHorizontalHighlightedArray = [];
o.cookieExtraLineVerticalNormalArray = [];
o.cookieExtraLineVerticalHighlightedArray = [];
o.cookieExtraBombNormalArray = [];
o.cookieExtraBombHighlightedArray = [];
o.cookieExtraAllNormal = null;
o.cookieExtraAllHighlighted = null;
o.m_canInitUI = !1;
o.m_cookieMovingSwapDel = null;
o.m_hasSwapedCookie = !1;
o.m_cookieTouchable = !0;
return o;
}
o.prototype.onLoad = function() {
this.onLoadCookieTexture();
};
o.prototype.onLoadCookieTexture = function() {
cc.loader.loadResDir("texture/Sprites/", cc.SpriteFrame, function(e, o) {
this.m_canInitUI = !0;
for (var t = 0; t < r.CookieType.CookieTypeCount; t++) {
var i = "texture/Sprites/Sprite_" + t;
this.cookieNormalSpriteArray.push(new cc.SpriteFrame(i));
i += "_Highlighted";
this.cookieHighlightedSpriteArray.push(new cc.SpriteFrame(i));
i = "texture/Sprites/extra/Sprite_" + t + "_LH";
this.cookieExtraLineHorizontalNormalArray.push(new cc.SpriteFrame(i));
i += "_Highlighted";
this.cookieExtraLineHorizontalHighlightedArray.push(new cc.SpriteFrame(i));
i = "texture/Sprites/extra/Sprite_" + t + "_LV";
this.cookieExtraLineVerticalNormalArray.push(new cc.SpriteFrame(i));
i += "_Highlighted";
this.cookieExtraLineVerticalHighlightedArray.push(new cc.SpriteFrame(i));
i = "texture/Sprites/extra/Sprite_" + t + "_Bomb";
this.cookieExtraBombNormalArray.push(new cc.SpriteFrame(i));
i += "_Highlighted";
this.cookieExtraBombHighlightedArray.push(new cc.SpriteFrame(i));
this.cookieExtraAllNormal = new cc.SpriteFrame("texture/Sprites/extra/All");
this.cookieExtraAllHighlighted = new cc.SpriteFrame("texture/Sprites/extra/All_Highlighted");
}
this.updateButtonFrame();
}.bind(this));
};
o.prototype.start = function() {};
o.randomSprite = function() {
return Math.floor(Math.random() * r.CookieType.CookieTypeCount + 1);
};
o.prototype.setCookieTouchable = function(e) {
this.m_button.interactable = e;
this.m_cookieTouchable = e;
};
o.prototype.setCookieMovingSwapDelegate = function(e) {
this.m_cookieMovingSwapDel = e;
};
o.prototype.setCookieType = function(e) {
this.cookieTypeObject.normalType = e;
this.m_canInitUI ? this.updateButtonFrame() : this.onLoadCookieTexture();
};
o.prototype.getCookieType = function() {
return this.cookieTypeObject.normalType;
};
o.prototype.setExtraType = function(e) {
this.cookieTypeObject.extraType = e;
this.m_canInitUI ? this.updateButtonFrame() : this.onLoadCookieTexture();
};
o.prototype.getExtraType = function() {
return this.cookieTypeObject.extraType;
};
o.prototype.setExtraTrigerState = function(e) {
this.cookieTypeObject.isExtraTriger = e;
};
o.prototype.getExtraTrigerState = function() {
return this.cookieTypeObject.isExtraTriger;
};
o.prototype.getCookieObject = function() {
return this.cookieTypeObject;
};
o.prototype.updateButtonFrame = function() {
var e = this.cookieTypeObject.normalType, o = this.cookieNormalSpriteArray[e], t = this.cookieNormalSpriteArray[e], i = this.cookieNormalSpriteArray[e], a = this.cookieHighlightedSpriteArray[e];
if (this.cookieTypeObject.extraType == r.CookieExtraType.Extra_Line_Horizontal) {
o = this.cookieExtraLineHorizontalNormalArray[e];
t = this.cookieExtraLineHorizontalNormalArray[e];
i = this.cookieExtraLineHorizontalNormalArray[e];
a = this.cookieExtraLineHorizontalHighlightedArray[e];
} else if (this.cookieTypeObject.extraType == r.CookieExtraType.Extra_Line_Vertical) {
o = this.cookieExtraLineVerticalNormalArray[e];
t = this.cookieExtraLineVerticalNormalArray[e];
i = this.cookieExtraLineVerticalNormalArray[e];
a = this.cookieExtraLineVerticalHighlightedArray[e];
} else if (this.cookieTypeObject.extraType == r.CookieExtraType.Extra_Bomb) {
o = this.cookieExtraBombNormalArray[e];
t = this.cookieExtraBombNormalArray[e];
i = this.cookieExtraBombNormalArray[e];
a = this.cookieExtraBombHighlightedArray[e];
} else if (this.cookieTypeObject.extraType == r.CookieExtraType.Extra_All) {
o = this.cookieExtraAllNormal;
t = this.cookieExtraAllNormal;
i = this.cookieExtraAllNormal;
a = this.cookieExtraAllHighlighted;
}
this.m_button.normalSprite = o;
this.m_button.hoverSprite = t;
this.m_button.disabledSprite = i;
this.m_button.pressedSprite = a;
this.m_button.node.active = !0;
};
o.prototype.init = function(e, o, t, i) {
this.cookieTypeObject.pos_X = e;
this.cookieTypeObject.pos_Y = o;
this.setCookieType(t);
this.setExtraType(i);
this.bindHandler();
};
o.prototype.setCookie_X_Y = function(e, o) {
this.cookieTypeObject.pos_X = e;
this.cookieTypeObject.pos_Y = o;
};
o.prototype.getCookie_X_Y = function() {
return new cc.Vec2(this.cookieTypeObject.pos_X, this.cookieTypeObject.pos_Y);
};
o.prototype.setOperationState = function(e) {
this.cookieTypeObject.isOpetation = e;
};
o.prototype.getOperationState = function() {
return this.cookieTypeObject.isOpetation;
};
o.prototype.hasValue = function() {
return 10 * this.cookieTypeObject.pos_X + this.cookieTypeObject.pos_Y;
};
o.prototype.description = function() {
return "type:(" + this.cookieTypeObject.normalType + ") square:((" + this.cookieTypeObject.pos_X + "),(" + this.cookieTypeObject.pos_Y + "))";
};
o.prototype.bindHandler = function() {
this.m_button.node.on(cc.Node.EventType.TOUCH_START, this.cookieTouchStartCallback, this);
this.m_button.node.on(cc.Node.EventType.TOUCH_MOVE, this.cookieTouchMoveCallback, this);
this.m_button.node.on(cc.Node.EventType.TOUCH_END, this.cookieTouchEndedCancelCallback, this);
this.m_button.node.on(cc.Node.EventType.TOUCH_CANCEL, this.cookieTouchEndedCancelCallback, this);
};
o.prototype.cookieTouchStartCallback = function(e, o) {
if (this.m_cookieTouchable) {
cc.log(this.description());
this.m_hasSwapedCookie = !1;
this.m_ptDragStart = this.node.convertToNodeSpaceAR(e.touch.getLocation());
}
};
o.prototype.cookieTouchMoveCallback = function(e, o) {
if (this.m_cookieTouchable) {
var t = this.node.convertToNodeSpaceAR(e.touch.getLocation());
this.checkCurrentTouchPosition(t);
}
};
o.prototype.cookieTouchEndedCancelCallback = function(e, o) {
if (this.m_cookieTouchable) {
var t = this.node.convertToNodeSpaceAR(e.touch.getLocation());
this.checkCurrentTouchPosition(t);
}
};
o.prototype.checkCurrentTouchPosition = function(e) {
var o = e.x - this.m_ptDragStart.x, t = e.y - this.m_ptDragStart.y, r = Math.abs(o), a = Math.abs(t), n = i.NONE;
r < this.node.width / 2 && a > this.node.height / 2 ? n = t > 0 ? i.UP : i.DOWN : a < this.node.height / 2 && r > this.node.width / 2 && (n = o > 0 ? i.RIGHT : i.LEFT);
if (n > i.NONE && !this.m_hasSwapedCookie) {
this.m_hasSwapedCookie = !0;
this.setOperationState(!0);
this.m_cookieMovingSwapDel && this.m_cookieMovingSwapDel(this.node, n);
}
};
__decorate([ c(cc.Button) ], o.prototype, "m_button", void 0);
return o = __decorate([ n ], o);
}(cc.Component);
t.default = p;
cc._RF.pop();
}, {
"../Data/ExtraCookieTypeManager": "ExtraCookieTypeManager"
} ],
ExtraCookieTypeManager: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "b1a52PHcMBEKKgDuXc9O/uU", "ExtraCookieTypeManager");
Object.defineProperty(t, "__esModule", {
value: !0
});
var i, r, a = cc._decorator, n = a.ccclass;
a.property;
t.CookieMax_X = 9;
t.CookieMax_Y = 9;
(function(e) {
e[e.Sprite_0 = 0] = "Sprite_0";
e[e.Sprite_1 = 1] = "Sprite_1";
e[e.Sprite_2 = 2] = "Sprite_2";
e[e.Sprite_3 = 3] = "Sprite_3";
e[e.Sprite_4 = 4] = "Sprite_4";
e[e.Sprite_5 = 5] = "Sprite_5";
e[e.CookieTypeCount = 6] = "CookieTypeCount";
e[e.NONE = 7] = "NONE";
})(i = t.CookieType || (t.CookieType = {}));
(function(e) {
e[e.Extra_Normal = 0] = "Extra_Normal";
e[e.Extra_Line_Horizontal = 1] = "Extra_Line_Horizontal";
e[e.Extra_Line_Vertical = 2] = "Extra_Line_Vertical";
e[e.Extra_Bomb = 3] = "Extra_Bomb";
e[e.Extra_All = 4] = "Extra_All";
e[e.CookieTypeMax = 5] = "CookieTypeMax";
})(r = t.CookieExtraType || (t.CookieExtraType = {}));
var c = null, p = function(e) {
__extends(o, e);
function o() {
return null !== e && e.apply(this, arguments) || this;
}
a = o;
o.prototype.start = function() {};
o.getInstance = function() {
null == c && (c = new a());
return c;
};
o.prototype.getExtraCookieTypeByChain = function(e) {
if (e.length <= 0) return null;
for (var o = [], r = [], a = [], n = [], c = [], p = [], s = 0; s < t.CookieMax_X; s++) o[s] = 0;
for (s = 0; s < t.CookieMax_Y; s++) r[s] = 0;
for (s = 0; s < i.CookieTypeCount; s++) a.push(0);
for (s = 0; s < e.length; s++) {
o[(C = e[s]).pos_X]++;
r[C.pos_Y]++;
a[C.normalType]++;
}
for (var l = 0; l < a.length; l++) {
if (a[l] >= 4) {
for (var h = 0; h < r.length; h++) {
if (r[h] >= 3) {
for (var u = [], _ = 0; _ < e.length; _++) {
(m = e[_]).normalType == l && m.pos_Y == h && u.push(m);
}
u.sort(this.comparison_function_X);
if (u.length >= 3) for (var k = [], y = 0; y < u.length - 2; ) {
k = [];
var C = u[y];
k.push(C);
for (var d = y + 1; d < u.length; d++) {
var f = u[d];
if (1 != Math.abs(C.pos_X - f.pos_X)) break;
C = f;
k.push(f);
}
if (k.length >= 3) {
n.push(k);
y = d;
} else y++;
}
}
}
for (_ = 0; _ < o.length; _++) {
if (o[_] >= 3) {
for (u = [], h = 0; h < e.length; h++) {
var m;
(m = e[h]).normalType == l && m.pos_X == _ && u.push(m);
}
u.sort(this.comparison_function_Y);
if (u.length >= 3) for (k = [], y = 0; y < u.length - 2; ) {
k = [];
C = u[y];
k.push(C);
for (d = y + 1; d < u.length; d++) {
f = u[d];
if (1 != Math.abs(C.pos_Y - f.pos_Y)) break;
C = f;
k.push(f);
}
if (k.length >= 3) {
c.push(k);
y = d;
} else y++;
}
}
}
if (n.length > 0 && c.length > 0) {
for (var x = 0; x < n.length; x++) {
for (var g = n[x], T = !1, E = 0; E < c.length; E++) {
var v = c[E];
if (this.hasSameElementTwoArray(g, v)) {
T = !0;
var A = [];
for (var b in g) if (g.hasOwnProperty(b)) {
C = g[b];
A.push(C);
}
n[x] = [];
for (var N in v) if (v.hasOwnProperty(N)) {
f = v[N];
var S = !1;
for (s = 0; s < A.length; s++) {
var M = A[s];
if (f.pos_X == M.pos_X && f.pos_Y == M.pos_Y) {
S = !0;
break;
}
}
S || A.push(f);
}
c[E] = [];
p.push(A);
break;
}
}
T || p.push(g);
}
for (E = 0; E < c.length; E++) {
(v = c[E]).length > 0 && p.push(v);
}
} else {
n.length > 0 && (p = n);
c.length > 0 && (p = c);
}
}
}
for (s = 0; s < p.length; s++) {
C = p[s];
var O = this.getExtraCookieTypeBySameTypeChain(C);
if (null != O) return O;
}
};
o.prototype.hasSameElementTwoArray = function(e, o) {
var t = !1;
for (var i in e) if (e.hasOwnProperty(i)) {
var r = e[i];
for (var a in o) if (o.hasOwnProperty(a)) {
var n = o[a];
if (r.pos_X == n.pos_X && r.pos_Y == n.pos_Y) {
t = !0;
break;
}
}
if (t) break;
}
return t;
};
o.prototype.getExtraCookieTypeBySameTypeChain = function(e) {
if (e.length <= 3) return null;
for (var o = i.CookieTypeCount, a = r.Extra_Normal, n = t.CookieMax_X, c = t.CookieMax_Y, p = [], s = [], l = [], h = 0; h < t.CookieMax_X; h++) p[h] = 0;
for (h = 0; h < t.CookieMax_Y; h++) s[h] = 0;
for (h = 0; h < i.CookieTypeCount; h++) l.push(0);
var u = !1;
for (h = 0; h < e.length; h++) {
p[(f = e[h]).pos_X]++;
s[f.pos_Y]++;
l[f.normalType]++;
if (f.isOpetation) {
u = !0;
n = f.pos_X;
c = f.pos_Y;
}
0 == h && (o = f.normalType);
}
var _ = 0;
for (h = 0; h < l.length; h++) {
(f = l[h]) > 1 && _++;
}
if (_ > 1) return null;
var k = p[0], y = s[0], C = 0, d = 0;
for (h = 1; h < p.length; h++) {
if ((f = p[h]) > k) {
k = f;
C = h;
}
}
for (h = 0; h < s.length; h++) {
if ((f = s[h]) > y) {
y = f;
d = h;
}
}
if (k >= 5 || y >= 5) {
a = r.Extra_All;
o = i.NONE;
} else a = k >= 3 && y >= 3 ? r.Extra_Bomb : k > 3 ? r.Extra_Line_Horizontal : r.Extra_Line_Vertical;
if (!u) if (a == r.Extra_Line_Horizontal || a == r.Extra_Line_Vertical) {
n = (f = e[1]).pos_X;
c = f.pos_Y;
} else if (a == r.Extra_All) {
var f;
n = (f = e[2]).pos_X;
c = f.pos_Y;
} else {
n = C;
c = d;
}
return {
normalType: o,
extraType: a,
pos_X: n,
pos_Y: c,
isOpetation: !1,
isExtraTriger: !1
};
};
o.prototype.comparison_function_X = function(e, o) {
return e.pos_X < o.pos_X ? -1 : e.pos_X > o.pos_X ? 1 : 0;
};
o.prototype.comparison_function_Y = function(e, o) {
return e.pos_Y < o.pos_Y ? -1 : e.pos_Y > o.pos_Y ? 1 : 0;
};
var a;
return o = a = __decorate([ n ], o);
}(cc.Component);
t.default = p;
cc._RF.pop();
}, {} ],
GameScene: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "e1b90/rohdEk4SdmmEZANaD", "GameScene");
Object.defineProperty(t, "__esModule", {
value: !0
});
var i = cc._decorator, r = i.ccclass, a = i.property, n = function(e) {
__extends(o, e);
function o() {
var o = null !== e && e.apply(this, arguments) || this;
o.background = null;
o.m_levelNode = null;
o.m_shuffleButton = null;
o.m_backButton = null;
return o;
}
o.prototype.onLoad = function() {};
o.prototype.start = function() {
this.bindHandler();
this.playBGM();
};
o.prototype.onDestroy = function() {
this.stopBGM();
};
o.prototype.update = function() {};
o.prototype.updateLevelJSONData = function(e) {
if ("" != e && this.m_levelNode) {
this.m_levelNode.getComponent("Level").loadTileJsonData(e);
}
};
o.prototype.bindHandler = function() {
var e = new cc.Component.EventHandler();
e.target = this.node;
e.component = "GameScene";
e.handler = "shuffleButtonCallBack";
e.customEventData = "ShuffleButton";
this.m_shuffleButton.clickEvents.push(e);
var o = new cc.Component.EventHandler();
o.target = this.node;
o.component = "GameScene";
o.handler = "backButtonCallBack";
o.customEventData = "BackButton";
this.m_backButton.clickEvents.push(o);
};
o.prototype.shuffleButtonCallBack = function(e, o) {
if (this.m_levelNode) {
this.m_levelNode.getComponent("Level").shuffle();
}
};
o.prototype.backButtonCallBack = function(e, o) {
cc.director.loadScene("Main", function() {});
};
o.prototype.playBGM = function() {};
o.prototype.stopBGM = function() {
cc.audioEngine.stopMusic();
};
__decorate([ a(cc.Sprite) ], o.prototype, "background", void 0);
__decorate([ a(cc.Node) ], o.prototype, "m_levelNode", void 0);
__decorate([ a(cc.Button) ], o.prototype, "m_shuffleButton", void 0);
__decorate([ a(cc.Button) ], o.prototype, "m_backButton", void 0);
return o = __decorate([ r ], o);
}(cc.Component);
t.default = n;
cc._RF.pop();
}, {} ],
Level: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "bb9d0zof+pMQb5Q2tcgb3bj", "Level");
Object.defineProperty(t, "__esModule", {
value: !0
});
var i = e("./Cookie"), r = e("../Data/ExtraCookieTypeManager"), a = cc._decorator, n = a.ccclass, c = a.property;
t.CookieAnimationTimeInterval = .15;
var p = function(e) {
__extends(o, e);
function o() {
var o = null !== e && e.apply(this, arguments) || this;
o.m_tileNode = null;
o.m_cookieNode = null;
o.m_tileNodeInstance = null;
o.m_cookieInstance = null;
o.m_swapAudioClip = null;
o.m_invalidSwapAudioClip = null;
o.m_matchAudioClip = null;
o.m_fallingAudioClip = null;
o.m_addCookiesAudioClip = null;
o.m_tilesJSONArray = new Array();
o.m_tilesNodesArray = new Array();
o.m_cookieNodesArray = new Array();
return o;
}
o.prototype.onLoad = function() {
this.loadAudioRes();
};
o.prototype.start = function() {
this.m_tileNodeInstance.active = !1;
};
o.prototype.update = function(e) {};
o.prototype.shuffle = function() {
cc.log("shuffle func is called");
};
o.prototype.initDataAndUI = function() {
this.initTileNodeArray();
this.initClearCookieNodeArray();
this.initTileNodeUI();
this.loadCookieInstance();
};
o.prototype.resetTileJSONArray = function() {
for (var e = 0; e < r.CookieMax_X; e++) {
for (var o = [], t = 0; t < r.CookieMax_Y; t++) o.push(0);
this.m_tilesJSONArray.push(o);
}
};
o.prototype.initTileNodeArray = function() {
for (var e = 0; e < r.CookieMax_Y; e++) {
for (var o = [], t = 0; t < r.CookieMax_X; t++) o.push(null);
this.m_tilesNodesArray.push(o);
}
};
o.prototype.initClearCookieNodeArray = function() {
for (var e = 0; e < r.CookieMax_Y; e++) {
for (var o = [], t = 0; t < r.CookieMax_X; t++) o.push(null);
this.m_cookieNodesArray.push(o);
}
};
o.prototype.initTileNodeUI = function() {
for (var e = 0; e < r.CookieMax_Y; e++) for (var o = 0; o < r.CookieMax_X; o++) if (this.m_tilesJSONArray[o][e] > 0) {
var t = cc.instantiate(this.m_tileNodeInstance);
t.setPosition(this.getCookiePosition(o, e));
t.active = !0;
this.m_tileNode.addChild(t);
this.m_tilesNodesArray[o][e] = t;
}
};
o.prototype.loadTileJsonData = function(e) {
"" != e && cc.loader.loadRes(e, function(e, o) {
if (null == e) {
this.resetTileJSONArray();
for (var t = o.json.tiles, i = 0; i < t.length; i++) for (var r = t[i], a = 0; a < r.length; a++) {
var n = r[a];
this.m_tilesJSONArray[a][t.length - i - 1] = n;
}
this.initDataAndUI();
}
}.bind(this));
};
o.prototype.loadCookieInstance = function() {
cc.loader.loadRes("prefab/Cookie", function(e, o) {
if (null == e) {
this.m_hasLoadedCookie = !0;
var t = cc.instantiate(o);
this.m_cookieInstance = t;
this.createInitialCookies();
}
}.bind(this));
};
o.prototype.controlAllCookieTouchable = function(e) {
for (var o = 0; o < r.CookieMax_X; o++) for (var t = 0; t < r.CookieMax_Y; t++) {
var i = this.m_cookieNodesArray[o][t];
if (i) {
i.getComponent("Cookie").setCookieTouchable(e);
}
}
};
o.prototype.createInitialCookies = function() {
if (null == this.m_cookieInstance) this.loadCookieInstance(); else {
for (var e = 0; e < r.CookieMax_Y; e++) for (var o = 0; o < r.CookieMax_X; o++) if (null != this.m_tilesNodesArray[o][e]) {
var t = Math.floor(Math.random() * r.CookieType.CookieTypeCount), i = this.createCookieAtLevel(o, e, t).getComponent("Cookie");
if (o >= 2) for (var a = this.m_cookieNodesArray[o - 1][e], n = this.m_cookieNodesArray[o - 2][e]; a && a.getComponent("Cookie").getCookieType() == t && n && n.getComponent("Cookie").getCookieType() == t; ) {
t = Math.floor(Math.random() * r.CookieType.CookieTypeCount);
i.setCookieType(t);
}
if (e >= 2) for (var c = this.m_cookieNodesArray[o][e - 1], p = this.m_cookieNodesArray[o][e - 2]; c && c.getComponent("Cookie").getCookieType() == t && p && p.getComponent("Cookie").getCookieType() == t; ) {
t = Math.floor(Math.random() * r.CookieType.CookieTypeCount);
i.setCookieType(t);
}
}
this.firstDetectAllChains();
}
};
o.prototype.startSwapCookies = function(e, o) {
if (null != e) {
var r = e.getComponent("Cookie"), a = r.getCookie_X_Y(), n = r.getCookie_X_Y();
o == i.CookieSwapDirection.LEFT ? n.x -= 1 : o == i.CookieSwapDirection.RIGHT ? n.x += 1 : o == i.CookieSwapDirection.UP ? n.y += 1 : o == i.CookieSwapDirection.DOWN && (n.y -= 1);
if (a.x != n.x || a.y != n.y) {
var c = null;
for (var p in this.m_cookieNode.children) if (this.m_cookieNode.children.hasOwnProperty(p)) {
var s = this.m_cookieNode.children[p], l = s.getComponent("Cookie"), h = l.getCookie_X_Y();
if (h.x == n.x && h.y == n.y) {
c = s;
l.setOperationState(!0);
break;
}
}
if (null != c) {
r.setOperationState(!0);
this.performSwapCookies(e, c);
}
}
} else this.node.runAction(cc.sequence(cc.delayTime(t.CookieAnimationTimeInterval), cc.callFunc(function() {
this.controlAllCookieTouchable(!0);
}.bind(this))));
};
o.prototype.performSwapCookies = function(e, o) {
this.swapCookies(e, o);
this.node.runAction(cc.sequence(cc.delayTime(2 * t.CookieAnimationTimeInterval), cc.callFunc(function() {
this.detectAllChains(e, o);
}.bind(this))));
};
o.prototype.swapCookies = function(e, o) {
if (null != e && null != o) {
var i = t.CookieAnimationTimeInterval, a = e.getComponent("Cookie"), n = o.getComponent("Cookie"), c = a.getCookie_X_Y(), p = n.getCookie_X_Y();
if (Math.abs(c.x - p.x) + Math.abs(c.y - p.y) == 1) {
this.swapCookiesInArray(c, p);
var s = e.position, l = o.position, h = !1;
a.getExtraType() == r.CookieExtraType.Extra_All || n.getExtraType() == r.CookieExtraType.Extra_All ? h = !0 : a.getExtraType() != r.CookieExtraType.Extra_Normal && n.getExtraType() != r.CookieExtraType.Extra_Normal && (h = !0);
if (this.hasChain(e) || this.hasChain(o) || h) {
this.playSwapAudio();
o.runAction(cc.moveTo(i, s));
e.runAction(cc.moveTo(i, l));
} else {
this.playInvalidSwapAudio();
this.swapCookiesInArray(c, p);
this.restoreCookieOperateState();
o.runAction(cc.sequence(cc.moveTo(i, s), cc.delayTime(i), cc.moveTo(i, l)));
e.runAction(cc.sequence(cc.moveTo(i, l), cc.delayTime(i), cc.moveTo(i, s)));
}
}
}
};
o.prototype.firstDetectAllChains = function() {
this.controlAllCookieTouchable(!0);
this.node.runAction(cc.sequence(cc.delayTime(8 * t.CookieAnimationTimeInterval), cc.callFunc(function() {
this.detectAllChains();
}.bind(this))));
};
o.prototype.detectAllChains = function(e, o) {
var t = !1, i = [];
if (null != e && null != o) {
var a = e.getComponent("Cookie"), n = o.getComponent("Cookie");
a.getExtraType() == r.CookieExtraType.Extra_All || n.getExtraType() == r.CookieExtraType.Extra_All ? t = !0 : a.getExtraType() != r.CookieExtraType.Extra_Normal && n.getExtraType() != r.CookieExtraType.Extra_Normal && (t = !0);
}
if ((i = t ? this.detectExtraMatches(e, o) : this.detectMatches()).length > 0) {
var c = this.removeMatches(i);
this.node.runAction(cc.sequence(cc.delayTime(c), cc.callFunc(function() {
this.checkFillHolesAnimation();
}.bind(this))));
} else this.controlAllCookieTouchable(!0);
};
o.prototype.swapCookiesInArray = function(e, o) {
var t = this.m_cookieNodesArray[e.x][e.y], i = this.m_cookieNodesArray[o.x][o.y];
if (null != t && null != i) {
var r = t.getComponent("Cookie"), a = i.getComponent("Cookie"), n = r.getCookie_X_Y(), c = a.getCookie_X_Y();
r.setCookie_X_Y(c.x, c.y);
a.setCookie_X_Y(n.x, n.y);
var p = this.m_cookieNodesArray[e.x][e.y];
this.m_cookieNodesArray[e.x][e.y] = i;
this.m_cookieNodesArray[o.x][o.y] = p;
}
};
o.prototype.restoreCookieOperateState = function() {
for (var e = 0; e < r.CookieMax_X; e++) for (var o = 0; o < r.CookieMax_Y; o++) {
var t = this.m_cookieNodesArray[e][o];
if (null != t) {
t.getComponent("Cookie").setOperationState(!1);
}
}
};
o.prototype.detectPossibleSwaps = function() {
for (var e = 0; e < r.CookieMax_X - 1; e++) for (var o = 0; o < r.CookieMax_Y - 1; o++) {
var t = this.m_cookieNodesArray[e][o], i = this.m_cookieNodesArray[e + 1][o];
if (null != t && null != i) {
var a = t.getComponent("Cookie"), n = i.getComponent("Cookie"), c = a.getCookie_X_Y(), p = n.getCookie_X_Y();
if (a.getCookieType() != n.getCookieType()) {
this.swapCookiesInArray(c, p);
(this.hasChain(t) || this.hasChain(i)) && cc.log("valiable swap at right cookie:[" + e, "," + o + "] AND cookie:[" + String(e + 1) + "," + o + "]");
this.swapCookiesInArray(c, p);
if (null != (i = this.m_cookieNodesArray[e][o + 1])) {
p = (n = i.getComponent("Cookie")).getCookie_X_Y();
if (a.getCookieType() != n.getCookieType()) {
this.swapCookiesInArray(c, p);
(this.hasChain(t) || this.hasChain(i)) && cc.log("valiable swap at top cookie:[" + e, "," + o + "] AND cookie:[" + e + "," + String(o + 1) + "]");
this.swapCookiesInArray(c, p);
}
}
}
}
}
};
o.prototype.hasChain = function(e) {
for (var o = e.getComponent("Cookie"), t = o.getCookieType(), i = o.getCookie_X_Y().x, a = o.getCookie_X_Y().y, n = 1, c = i - 1; c >= 0 && this.m_cookieNodesArray[c][a] && this.m_cookieNodesArray[c][a].getComponent("Cookie").getCookieType() == t; ) {
c -= 1;
n += 1;
}
c = i + 1;
for (;c < r.CookieMax_X && this.m_cookieNodesArray[c][a] && this.m_cookieNodesArray[c][a].getComponent("Cookie").getCookieType() == t; ) {
c += 1;
n += 1;
}
if (n >= 3) return !0;
var p = 1;
c = a - 1;
for (;c >= 0 && this.m_cookieNodesArray[i][c] && this.m_cookieNodesArray[i][c].getComponent("Cookie").getCookieType() == t; ) {
c -= 1;
p += 1;
}
c = a + 1;
for (;c < r.CookieMax_Y && this.m_cookieNodesArray[i][c] && this.m_cookieNodesArray[i][c].getComponent("Cookie").getCookieType() == t; ) {
c += 1;
p += 1;
}
return p >= 3;
};
o.prototype.detectExtraMatches = function(e, o) {
var t = [];
if (null != e && null != o) {
var i = e.getComponent("Cookie"), a = o.getComponent("Cookie");
if (i.getExtraType() == r.CookieExtraType.Extra_Normal && a.getExtraType() == r.CookieExtraType.Extra_All) {
(n = this.detectExtraAllFuncMatches(a.getCookieObject(), i.getCookieType())).push(a.getCookieObject());
t.push(n);
a.setExtraTrigerState(!0);
} else if (i.getExtraType() == r.CookieExtraType.Extra_All && a.getExtraType() == r.CookieExtraType.Extra_Normal) {
(n = this.detectExtraAllFuncMatches(i.getCookieObject(), a.getCookieType())).push(i.getCookieObject());
t.push(n);
i.setExtraTrigerState(!0);
} else if (i.getExtraType() == r.CookieExtraType.Extra_All && a.getExtraType() == r.CookieExtraType.Extra_All) {
(n = this.detectExtraAll_ALL_FuncMatches()).length > 0 && t.push(n);
i.setExtraTrigerState(!0);
a.setExtraTrigerState(!0);
} else if (i.getExtraType() == r.CookieExtraType.Extra_All && a.getExtraType() != r.CookieExtraType.Extra_Normal) {
(n = this.changeNormalCookieFromExtraAllCookie(a.getCookieObject())).push(i.getCookieObject());
n.push(a.getCookieObject());
t.push(n);
i.setExtraTrigerState(!0);
} else if (a.getExtraType() == r.CookieExtraType.Extra_All && i.getExtraType() != r.CookieExtraType.Extra_Normal) {
(n = this.changeNormalCookieFromExtraAllCookie(i.getCookieObject())).push(i.getCookieObject());
n.push(a.getCookieObject());
t.push(n);
a.setExtraTrigerState(!0);
} else if (i.getExtraType() != r.CookieExtraType.Extra_Normal && a.getExtraType() != r.CookieExtraType.Extra_Normal) {
if (i.getExtraType() == r.CookieExtraType.Extra_Bomb) {
if (a.getExtraType() == r.CookieExtraType.Extra_Bomb) {
(n = this.detectExtraBombFuncMatches(i.getCookieObject(), 2)).push(i.getCookieObject());
n.push(a.getCookieObject());
t.push(n);
} else if (a.getExtraType() == r.CookieExtraType.Extra_Line_Horizontal || a.getExtraType() == r.CookieExtraType.Extra_Line_Vertical) {
(n = this.detectExtraLine_X_Y_FuncMatches(a.getCookieObject(), 1)).push(i.getCookieObject());
n.push(a.getCookieObject());
t.push(n);
}
} else if (i.getExtraType() == r.CookieExtraType.Extra_Line_Horizontal || i.getExtraType() == r.CookieExtraType.Extra_Line_Vertical) if (a.getExtraType() == r.CookieExtraType.Extra_Bomb) {
(n = this.detectExtraLine_X_Y_FuncMatches(i.getCookieObject(), 1)).push(i.getCookieObject());
n.push(a.getCookieObject());
t.push(n);
} else if (a.getExtraType() == r.CookieExtraType.Extra_Line_Horizontal || a.getExtraType() == r.CookieExtraType.Extra_Line_Vertical) {
var n;
(n = this.detectExtraLine_X_Y_FuncMatches(a.getCookieObject(), 0)).push(i.getCookieObject());
n.push(a.getCookieObject());
t.push(n);
}
i.setExtraTrigerState(!0);
a.setExtraTrigerState(!0);
}
}
return t;
};
o.prototype.detectMatches = function() {
var e = [], o = this.detectHorizontalMatches(), t = this.detectVerticalMatches();
if (0 == o.length) e = t; else if (0 == t.length) e = o; else {
for (var i = 0; i < o.length; i++) {
for (var a = o[i], n = !1, c = 0; c < t.length; c++) {
var p = t[c];
if (r.default.getInstance().hasSameElementTwoArray(a, p)) {
n = !0;
var s = [];
for (var l in a) if (a.hasOwnProperty(l)) {
var h = a[l];
s.push(h);
}
o[i] = [];
for (var u in p) if (p.hasOwnProperty(u)) {
for (var _ = p[u], k = !1, y = 0; y < s.length; y++) {
var C = s[y];
if (_.pos_X == C.pos_X && _.pos_Y == C.pos_Y) {
k = !0;
break;
}
}
k || s.push(_);
}
t[c] = [];
e.push(s);
break;
}
}
n || e.push(a);
}
for (c = 0; c < t.length; c++) {
(p = t[c]).length > 0 && e.push(p);
}
}
return e;
};
o.prototype.detectExtraCookieFuncMatches = function(e) {
var o = [];
if (e.extraType == r.CookieExtraType.Extra_Line_Horizontal || e.extraType == r.CookieExtraType.Extra_Line_Vertical) o = this.detectExtraLineFuncMatches(e); else if (e.extraType == r.CookieExtraType.Extra_Bomb) o = this.detectExtraBombFuncMatches(e, 1); else if (e.extraType == r.CookieExtraType.Extra_All) {
var t = Math.floor(Math.random() * r.CookieType.CookieTypeCount);
o = this.detectExtraAllFuncMatches(e, t);
}
return o;
};
o.prototype.detectExtraLineFuncMatches = function(e) {
var o = [];
if (e.extraType == r.CookieExtraType.Extra_Line_Horizontal) for (var t = 0; t < r.CookieMax_X; t++) {
if (null != (a = this.m_cookieNodesArray[t][e.pos_Y])) {
var i = {
normalType: (n = a.getComponent("Cookie")).getCookieType(),
extraType: n.getExtraType(),
pos_X: n.getCookie_X_Y().x,
pos_Y: n.getCookie_X_Y().y,
isOpetation: n.getOperationState(),
isExtraTriger: n.getExtraTrigerState()
};
o.push(i);
}
} else for (t = 0; t < r.CookieMax_Y; t++) {
var a;
if (null != (a = this.m_cookieNodesArray[e.pos_X][t])) {
var n;
i = {
normalType: (n = a.getComponent("Cookie")).getCookieType(),
extraType: n.getExtraType(),
pos_X: n.getCookie_X_Y().x,
pos_Y: n.getCookie_X_Y().y,
isOpetation: n.getOperationState(),
isExtraTriger: n.getExtraTrigerState()
};
o.push(i);
}
}
return o;
};
o.prototype.detectExtraBombFuncMatches = function(e, o) {
var t = [];
if (e.extraType == r.CookieExtraType.Extra_Bomb) for (var i = e.pos_X - o; i <= e.pos_X + o; i++) for (var a = e.pos_Y - o; a <= e.pos_Y + o; a++) if (i >= 0 && i < r.CookieMax_X && a >= 0 && a < r.CookieMax_Y) {
var n = this.m_cookieNodesArray[i][a];
if (null != n) {
var c = n.getComponent("Cookie"), p = {
normalType: c.getCookieType(),
extraType: c.getExtraType(),
pos_X: c.getCookie_X_Y().x,
pos_Y: c.getCookie_X_Y().y,
isOpetation: c.getOperationState(),
isExtraTriger: c.getExtraTrigerState()
};
t.push(p);
}
}
return t;
};
o.prototype.detectExtraLine_X_Y_FuncMatches = function(e, o) {
for (var t = [], i = e.pos_X - o; i <= e.pos_X + o; i++) for (var a = 0; a < r.CookieMax_Y; a++) if (i >= 0 && i < r.CookieMax_X && a >= 0 && a < r.CookieMax_Y) {
if (null != (c = this.m_cookieNodesArray[i][a])) {
var n = {
normalType: (p = c.getComponent("Cookie")).getCookieType(),
extraType: p.getExtraType(),
pos_X: p.getCookie_X_Y().x,
pos_Y: p.getCookie_X_Y().y,
isOpetation: p.getOperationState(),
isExtraTriger: p.getExtraTrigerState()
};
t.push(n);
}
}
for (a = e.pos_Y - o; a <= e.pos_Y + o; a++) for (i = 0; i < r.CookieMax_X; i++) if (i >= 0 && i < r.CookieMax_X && a >= 0 && a < r.CookieMax_Y) {
var c;
if (null != (c = this.m_cookieNodesArray[i][a])) {
n = {
normalType: (p = c.getComponent("Cookie")).getCookieType(),
extraType: p.getExtraType(),
pos_X: p.getCookie_X_Y().x,
pos_Y: p.getCookie_X_Y().y,
isOpetation: p.getOperationState(),
isExtraTriger: p.getExtraTrigerState()
};
var p, s = !1;
for (var l in t) if (t.hasOwnProperty(l)) {
var h = t[l];
if (h.pos_X == n.pos_X && h.pos_Y == n.pos_Y) {
s = !0;
break;
}
}
s || t.push(n);
}
}
return t;
};
o.prototype.detectExtraAll_ALL_FuncMatches = function() {
for (var e = [], o = 0; o < r.CookieMax_X; o++) for (var t = 0; t < r.CookieMax_Y; t++) {
var i = this.m_cookieNodesArray[o][t];
if (null != i) {
var a = i.getComponent("Cookie");
e.push(a.getCookieObject());
}
}
return e;
};
o.prototype.detectExtraAllFuncMatches = function(e, o) {
var t = [];
if (e.extraType == r.CookieExtraType.Extra_All && !e.isExtraTriger) for (var i = 0; i < r.CookieMax_X; i++) for (var a = 0; a < r.CookieMax_Y; a++) {
var n = this.m_cookieNodesArray[i][a];
if (null != n) {
var c = n.getComponent("Cookie");
c.getCookieType() == o && t.push(c.getCookieObject());
}
}
return t;
};
o.prototype.changeNormalCookieFromExtraAllCookie = function(e) {
for (var o = [], t = 0; t < r.CookieMax_X; t++) for (var i = 0; i < r.CookieMax_Y; i++) {
var a = this.m_cookieNodesArray[t][i];
if (null != a) {
var n = a.getComponent("Cookie");
if (n.getCookieType() == e.normalType && n.getExtraType() == r.CookieExtraType.Extra_Normal) {
e.extraType == r.CookieExtraType.Extra_Bomb ? n.setExtraType(r.CookieExtraType.Extra_Bomb) : e.extraType != r.CookieExtraType.Extra_Line_Horizontal && e.extraType != r.CookieExtraType.Extra_Line_Vertical || n.setExtraType(Math.random() < .5 ? r.CookieExtraType.Extra_Line_Horizontal : r.CookieExtraType.Extra_Line_Vertical);
o.push(n.getCookieObject());
}
}
}
return o;
};
o.prototype.detectHorizontalMatches = function() {
for (var e = [], o = 0; o < r.CookieMax_Y; o++) for (var t = [], i = null, a = 0; a < r.CookieMax_X - 2; ) if (null != (i = this.m_cookieNodesArray[a][o])) {
t = [];
var n = i.getComponent("Cookie"), c = n.getCookieType(), p = {
normalType: c,
extraType: n.getExtraType(),
pos_X: n.getCookie_X_Y().x,
pos_Y: n.getCookie_X_Y().y,
isOpetation: n.getOperationState(),
isExtraTriger: n.getExtraTrigerState()
};
t.push(p);
for (var s = a + 1; s < r.CookieMax_X; s++) {
var l = this.m_cookieNodesArray[s][o];
if (null == l) break;
var h = l.getComponent("Cookie");
if (h.getCookieType() != c) break;
var u = {
normalType: c,
extraType: h.getExtraType(),
pos_X: h.getCookie_X_Y().x,
pos_Y: h.getCookie_X_Y().y,
isOpetation: h.getOperationState(),
isExtraTriger: h.getExtraTrigerState()
};
t.push(u);
}
if (t.length >= 3) {
e.push(t);
a = s;
} else a++;
} else a++;
return e;
};
o.prototype.detectVerticalMatches = function() {
for (var e = [], o = 0; o < r.CookieMax_X; o++) for (var t = [], i = null, a = 0; a < r.CookieMax_Y - 2; ) if (null != (i = this.m_cookieNodesArray[o][a])) {
t = [];
var n = i.getComponent("Cookie"), c = n.getCookieType(), p = {
normalType: c,
extraType: n.getExtraType(),
pos_X: n.getCookie_X_Y().x,
pos_Y: n.getCookie_X_Y().y,
isOpetation: n.getOperationState(),
isExtraTriger: n.getExtraTrigerState()
};
t.push(p);
for (var s = a + 1; s < r.CookieMax_Y; s++) {
var l = this.m_cookieNodesArray[o][s];
if (null == l) break;
var h = l.getComponent("Cookie");
if (h.getCookieType() != c) break;
var u = {
normalType: c,
extraType: h.getExtraType(),
pos_X: h.getCookie_X_Y().x,
pos_Y: h.getCookie_X_Y().y,
isOpetation: h.getOperationState(),
isExtraTriger: h.getExtraTrigerState()
};
t.push(u);
}
if (t.length >= 3) {
e.push(t);
a = s;
} else a++;
} else a++;
return e;
};
o.prototype.removeMatches = function(e) {
var o = 2 * t.CookieAnimationTimeInterval;
this.playMatchAudio();
for (var i = [], a = 0; a < e.length; a++) {
var n = e[a];
for (var c in n) if (n.hasOwnProperty(c)) {
var p = n[c];
if (p.pos_X >= 0 && p.pos_X < r.CookieMax_X && p.pos_Y >= 0 && p.pos_Y < r.CookieMax_Y) {
var s = this.m_cookieNodesArray[p.pos_X][p.pos_Y];
if (null != s) {
var l = s.getComponent("Cookie");
if (l.getExtraType() != r.CookieExtraType.Extra_Normal && !l.getExtraTrigerState()) {
var h = this.detectExtraCookieFuncMatches(l.getCookieObject());
h.length > 0 && i.push(h);
}
this.m_cookieNodesArray[p.pos_X][p.pos_Y] = null;
s.runAction(cc.sequence(cc.fadeOut(t.CookieAnimationTimeInterval), cc.delayTime(t.CookieAnimationTimeInterval), cc.removeSelf()));
}
}
}
this.restoreCookieOperateState();
if (n.length > 3) {
var u = r.default.getInstance().getExtraCookieTypeByChain(n);
if (null != u && null == this.m_cookieNodesArray[u.pos_X][u.pos_Y]) {
this.createCookieAtLevel(u.pos_X, u.pos_Y, u.normalType, u.extraType, this.getCookiePosition(u.pos_X, u.pos_Y)).runAction(cc.sequence(cc.scaleTo(t.CookieAnimationTimeInterval, 1.2), cc.scaleTo(t.CookieAnimationTimeInterval, 1)));
}
}
}
if (i.length > 0) {
o = 3 * t.CookieAnimationTimeInterval;
this.removeMatches(i);
}
return o;
};
o.prototype.checkFillHolesAnimation = function() {
this.checkFillHoles() ? this.node.runAction(cc.sequence(cc.delayTime(t.CookieAnimationTimeInterval), cc.callFunc(function() {
this.checkFillHolesAnimation();
}.bind(this)))) : this.checkTopUpCookiesAnimation();
};
o.prototype.checkFillHoles = function() {
for (var e = !1, o = 0; o < r.CookieMax_X; o++) {
for (var t = 0; t < r.CookieMax_Y - 1; t++) {
if (null == this.m_cookieNodesArray[o][t] && null != this.m_tilesNodesArray[o][t]) for (var i = t + 1; i < r.CookieMax_Y; i++) {
if (null != this.m_cookieNodesArray[o][i]) {
e = !0;
break;
}
}
if (e) break;
}
if (e) break;
}
e && this.fillHoles();
return e;
};
o.prototype.fillHoles = function() {
this.playFallingAudio();
for (var e = 0; e < r.CookieMax_X; e++) for (var o = 0; o < r.CookieMax_Y - 1; o++) {
if (null == this.m_cookieNodesArray[e][o] && null != this.m_tilesNodesArray[e][o]) {
for (var i = o + 1; i < r.CookieMax_Y; i++) {
var a = this.m_cookieNodesArray[e][i];
if (null != a) {
this.m_cookieNodesArray[e][o] = a;
this.m_cookieNodesArray[e][i] = null;
a.getComponent("Cookie").setCookie_X_Y(e, o);
a.runAction(cc.moveTo(t.CookieAnimationTimeInterval * Math.abs(i - o), this.getCookiePosition(e, o)));
break;
}
}
break;
}
}
};
o.prototype.checkTopUpCookiesAnimation = function() {
this.checkTopUpCookies() ? this.node.runAction(cc.sequence(cc.delayTime(t.CookieAnimationTimeInterval), cc.callFunc(function() {
this.checkTopUpCookiesAnimation();
}.bind(this)))) : this.node.runAction(cc.sequence(cc.delayTime(t.CookieAnimationTimeInterval), cc.callFunc(function() {
this.detectAllChains();
}.bind(this))));
};
o.prototype.checkTopUpCookies = function() {
for (var e = !1, o = 0; o < r.CookieMax_X; o++) {
for (var t = r.CookieMax_Y - 1; t >= 0; t--) {
if (null == this.m_cookieNodesArray[o][t] && null != this.m_tilesNodesArray[o][t]) {
e = !0;
break;
}
}
if (e) break;
}
e && this.topUpCookies();
return e;
};
o.prototype.topUpCookies = function() {
this.playAddCookiesAudio();
for (var e = 0; e < r.CookieMax_X; e++) {
for (var o = r.CookieMax_Y, i = r.CookieMax_Y - 1; i >= 0; i--) {
if (null != this.m_tilesNodesArray[e][i]) break;
o = i;
}
for (var a = r.CookieMax_Y - 1, n = r.CookieMax_Y - 1; n >= 0; n--) null != this.m_tilesNodesArray[e][n] && null == this.m_cookieNodesArray[e][n] && (a = n);
if (null != this.m_tilesNodesArray[e][a] && null == this.m_cookieNodesArray[e][a]) {
var c = Math.floor(Math.random() * r.CookieType.CookieTypeCount);
this.createCookieAtLevel(e, a, c, r.CookieExtraType.Extra_Normal, this.getCookiePosition(e, o)).runAction(cc.moveTo(t.CookieAnimationTimeInterval * Math.abs(o - a), this.getCookiePosition(e, a)));
}
}
};
o.prototype.createCookieAtLevel = function(e, o, t, i, a) {
void 0 === i && (i = r.CookieExtraType.Extra_Normal);
var n = cc.instantiate(this.m_cookieInstance);
a ? n.setPosition(a) : n.setPosition(this.getCookiePosition(e, o));
this.m_cookieNode.addChild(n);
this.m_cookieNodesArray[e][o] = n;
var c = n.getComponent("Cookie");
c.init(e, o, t, i);
c.setCookieMovingSwapDelegate(function(e, o) {
this.controlAllCookieTouchable(!1);
this.startSwapCookies(e, o);
}.bind(this));
return n;
};
o.prototype.getCookiePosition = function(e, o) {
var t = cc.Vec2.ZERO;
t.x = i.CookieTile_Width / 2 + i.CookieTile_Width * e;
t.y = i.CookieTile_Height / 2 + i.CookieTile_Height * o;
return t;
};
o.prototype.loadAudioRes = function() {
cc.loader.loadRes("music/Chomp", cc.AudioClip, function(e, o) {
this.m_swapAudioClip = o;
}.bind(this));
cc.loader.loadRes("music/Error", cc.AudioClip, function(e, o) {
this.m_invalidSwapAudioClip = o;
}.bind(this));
cc.loader.loadRes("music/KaChing", cc.AudioClip, function(e, o) {
this.m_matchAudioClip = o;
}.bind(this));
cc.loader.loadRes("music/Scrape", cc.AudioClip, function(e, o) {
this.m_fallingAudioClip = o;
}.bind(this));
cc.loader.loadRes("music/Drip", cc.AudioClip, function(e, o) {
this.m_addCookiesAudioClip = o;
}.bind(this));
};
o.prototype.playSwapAudio = function() {
if (null != this.m_swapAudioClip) cc.audioEngine.playEffect(this.m_swapAudioClip, !1);
};
o.prototype.playInvalidSwapAudio = function() {
if (null != this.m_invalidSwapAudioClip) cc.audioEngine.playEffect(this.m_invalidSwapAudioClip, !1);
};
o.prototype.playMatchAudio = function() {
if (null != this.m_matchAudioClip) cc.audioEngine.playEffect(this.m_matchAudioClip, !1);
};
o.prototype.playFallingAudio = function() {
if (null != this.m_fallingAudioClip) cc.audioEngine.playEffect(this.m_fallingAudioClip, !1);
};
o.prototype.playAddCookiesAudio = function() {
if (null != this.m_addCookiesAudioClip) cc.audioEngine.playEffect(this.m_addCookiesAudioClip, !1);
};
__decorate([ c(cc.Node) ], o.prototype, "m_tileNode", void 0);
__decorate([ c(cc.Node) ], o.prototype, "m_cookieNode", void 0);
__decorate([ c(cc.Node) ], o.prototype, "m_tileNodeInstance", void 0);
return o = __decorate([ n ], o);
}(cc.Component);
t.default = p;
cc._RF.pop();
}, {
"../Data/ExtraCookieTypeManager": "ExtraCookieTypeManager",
"./Cookie": "Cookie"
} ],
Login: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "caa23tF2m1Kn46Gk8BKp+UY", "Login");
Object.defineProperty(t, "__esModule", {
value: !0
});
var i = cc._decorator, r = i.ccclass, a = i.property, n = function(e) {
__extends(o, e);
function o() {
var o = null !== e && e.apply(this, arguments) || this;
o.m_playButton = null;
return o;
}
o.prototype.start = function() {
this.bindHanlder();
};
o.prototype.bindHanlder = function() {
var e = new cc.Component.EventHandler();
e.target = this.node;
e.component = "Login";
e.handler = "playButtonCallBack";
e.customEventData = "PlayButton";
this.m_playButton.clickEvents.push(e);
};
o.prototype.playButtonCallBack = function(e, o) {
cc.director.loadScene("Main", function() {
cc.loader.loadResDir("texture/Sprites/", cc.SpriteFrame, function(e, o) {}.bind(this));
}.bind(this));
};
__decorate([ a(cc.Button) ], o.prototype, "m_playButton", void 0);
return o = __decorate([ r ], o);
}(cc.Component);
t.default = n;
cc._RF.pop();
}, {} ],
Main: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "0d166Gzv9tKhqg6ZdhiiKMO", "Main");
Object.defineProperty(t, "__esModule", {
value: !0
});
var i = cc._decorator, r = i.ccclass, a = i.property, n = function(e) {
__extends(o, e);
function o() {
var o = null !== e && e.apply(this, arguments) || this;
o.m_logoutButton = null;
o.m_levelButtonsNode = null;
o.m_levelButtonInstance = null;
o.m_levelButtonsArray = [];
return o;
}
o.prototype.start = function() {
this.m_levelButtonInstance.active = !1;
this.bindHanlder();
this.loadLevels();
};
o.prototype.bindHanlder = function() {
var e = new cc.Component.EventHandler();
e.target = this.node;
e.component = "Main";
e.handler = "logoutButtonCallBack";
e.customEventData = "LogoutButton";
this.m_logoutButton.clickEvents.push(e);
};
o.prototype.logoutButtonCallBack = function(e, o) {
cc.director.loadScene("Login", function() {}.bind(this));
};
o.prototype.loadLevels = function() {
for (var e = 50, o = 0; o < 15; o++) {
var t = cc.instantiate(this.m_levelButtonInstance);
if (t) {
t.getChildByName("Label").getComponent(cc.Label).string = String(o + 1);
t.active = !0;
this.m_levelButtonsArray.push(t);
this.m_levelButtonsNode.addChild(t);
e += this.m_levelButtonsNode.getComponent(cc.Layout).spacingY + t.height;
this.m_levelButtonsNode.height = e;
var i = new cc.Component.EventHandler();
i.target = this.node;
i.component = "Main";
i.handler = "levelButtonCallBack";
i.customEventData = "Levels/Level_" + o;
t.getComponent(cc.Button).clickEvents.push(i);
}
}
};
o.prototype.levelButtonCallBack = function(e, o) {
cc.log(o);
cc.director.loadScene("GameScene", function(e, t) {
cc.find("GameScene/GameSceneNode", cc.director.getScene()).getComponent("GameScene").updateLevelJSONData(o);
}.bind(this));
};
__decorate([ a(cc.Button) ], o.prototype, "m_logoutButton", void 0);
__decorate([ a(cc.Node) ], o.prototype, "m_levelButtonsNode", void 0);
__decorate([ a(cc.Node) ], o.prototype, "m_levelButtonInstance", void 0);
return o = __decorate([ r ], o);
}(cc.Component);
t.default = n;
cc._RF.pop();
}, {} ]
}, {}, [ "ExtraCookieTypeManager", "Cookie", "GameScene", "Level", "Login", "Main" ]);