import Cookie, { CookieSwapDirection, CookieTile_Width, CookieTile_Height } from "./Cookie";
import ExtraCookieTypeManager, { CookieType, CookieMax_X, CookieMax_Y, CookieTypeObject, CookieExtraType } from "../Data/ExtraCookieTypeManager";

const {ccclass, property} = cc._decorator;


export const CookieAnimationTimeInterval: number = 0.15;


@ccclass
export default class Level extends cc.Component {

    @property(cc.Node)
    m_tileNode: cc.Node = null;
    @property(cc.Node)
    m_cookieNode: cc.Node = null;
    @property(cc.Node)
    m_tileNodeInstance: cc.Node = null;


    private m_cookieInstance = null;
    //  audio clips
    private m_swapAudioClip: cc.AudioClip = null;
    private m_invalidSwapAudioClip: cc.AudioClip = null;
    private m_matchAudioClip: cc.AudioClip = null;
    private m_fallingAudioClip: cc.AudioClip = null;
    private m_addCookiesAudioClip: cc.AudioClip = null;
    

    // private m_swapCookieArray: Array<cc.Node> = [];

    private m_tilesJSONArray: Array<Array<number>> = new Array<Array<number>>();
    private m_tilesNodesArray: Array<Array<cc.Node>> = new Array<Array<cc.Node>>();
    private m_cookieNodesArray: Array<Array<cc.Node>> = new Array<Array<cc.Node>>();

    // private cookies = Array2D<Cookie>(columns: numColumns, rows: numRows)

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.loadCookieInstance();
        // this.loadTileJsonData();
        this.loadAudioRes();

    }

    start () {
        this.m_tileNodeInstance.active = false;
        // this.initTileNodeUI();
        
    }

    update (dt) 
    {

    }

    public shuffle() {
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

    }

    private initDataAndUI() {
        this.initTileNodeArray();
        this.initClearCookieNodeArray();
        this.initTileNodeUI();
        //
        this.loadCookieInstance();
    }

    private resetTileJSONArray() {
        for (let index_X = 0; index_X < CookieMax_X; index_X++) {
            let tmpJsonArray: Array<number> = [];
            for (let index_Y = 0; index_Y < CookieMax_Y; index_Y++) {
                tmpJsonArray.push(0);
            }
            this.m_tilesJSONArray.push(tmpJsonArray);
        }
    }
    private initTileNodeArray() {
        for (let index_Y = 0; index_Y < CookieMax_Y; index_Y++) {
            let tmpArray: Array<cc.Node> = [];
            for (let index_X = 0; index_X < CookieMax_X; index_X++) {
                tmpArray.push(null);
            }
            this.m_tilesNodesArray.push(tmpArray);
        }
    }
    private initClearCookieNodeArray() {
        for (let index_Y = 0; index_Y < CookieMax_Y; index_Y++) {
            let tmpArray: Array<cc.Node> = [];
            for (let index_X = 0; index_X < CookieMax_X; index_X++) {
                tmpArray.push(null);
            }
            this.m_cookieNodesArray.push(tmpArray);
        }
    }

    private initTileNodeUI() {
        for (let idx_Y = 0; idx_Y < CookieMax_Y; idx_Y++) {
            for (let idx_X = 0; idx_X < CookieMax_X; idx_X++) {
                if (this.m_tilesJSONArray[idx_X][idx_Y] > 0) {
                    let tileItem = cc.instantiate(this.m_tileNodeInstance);
                    // tileItem.x = tileItem.width / 2 + tileItem.width * idx_X;
                    // tileItem.y = tileItem.height / 2 + tileItem.height * idx_Y;
                    tileItem.setPosition(this.getCookiePosition(idx_X, idx_Y));
                    tileItem.active = true;
                    this.m_tileNode.addChild(tileItem);
                    this.m_tilesNodesArray[idx_X][idx_Y] = tileItem;    
                }
            }   
        }
    }

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

    public loadTileJsonData(jsonRes: string) {
        if (jsonRes == "") { return; }
        cc.loader.loadRes(jsonRes, function (err, jsonAsset) {
            if(err != null) {
                return;
            }
            this.resetTileJSONArray();
            let data = jsonAsset.json;
            let tileArray = data.tiles;
            for (let index_Y = 0; index_Y < tileArray.length; index_Y++) {
                const element = tileArray[index_Y];
                for (let idx = 0; idx < element.length; idx++) {
                    const e = element[idx];
                    this.m_tilesJSONArray[idx][tileArray.length - index_Y - 1] = e;
                }
            }

            this.initDataAndUI();
        }.bind(this));
    }
    private loadCookieInstance() {
        cc.loader.loadRes("prefab/Cookie", function(error, prefab) {
            if(error != null) {
                return;
            }
            this.m_hasLoadedCookie = true;
            let node = cc.instantiate(prefab);
            this.m_cookieInstance = node;
            //
            this.createInitialCookies();
        }.bind(this));
    }

    private controlAllCookieTouchable(touchable: boolean)
    {
        for (let index_X = 0; index_X < CookieMax_X; index_X++)
        {
            for (let index_Y = 0; index_Y < CookieMax_Y; index_Y++)
            {
                let cookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (cookieNode)
                {
                    let script: Cookie = cookieNode.getComponent("Cookie");
                    script.setCookieTouchable(touchable);
                }
            }
        }
    }

    private createInitialCookies() {
        if (this.m_cookieInstance == null) 
        {
            this.loadCookieInstance();
        }
        else 
        {
            for (let idx_Y = 0; idx_Y < CookieMax_Y; idx_Y++) 
            {
                for (let idx_X = 0; idx_X < CookieMax_X; idx_X++) 
                {
                    if (this.m_tilesNodesArray[idx_X][idx_Y] == null) 
                    {
                        continue;
                    }
                    let cookieType = Math.floor(Math.random() * CookieType.CookieTypeCount);

                    let node = this.createCookieAtLevel(idx_X, idx_Y, cookieType);
                    let script: Cookie = node.getComponent("Cookie");

                    

                    if (idx_X >= 2) 
                    {
                        let node_X_1 = this.m_cookieNodesArray[idx_X - 1][idx_Y];
                        let node_X_2 = this.m_cookieNodesArray[idx_X - 2][idx_Y];
                        while (node_X_1 && node_X_1.getComponent("Cookie").getCookieType() == cookieType && node_X_2 && node_X_2.getComponent("Cookie").getCookieType() == cookieType) {
                            cookieType = Math.floor(Math.random() * CookieType.CookieTypeCount);
                            script.setCookieType(cookieType);
                        }
                    }
                    if (idx_Y >= 2) 
                    {
                        let node_Y_1 = this.m_cookieNodesArray[idx_X][idx_Y - 1];
                        let node_Y_2 = this.m_cookieNodesArray[idx_X][idx_Y - 2];
                        while (node_Y_1 && node_Y_1.getComponent("Cookie").getCookieType() == cookieType && node_Y_2 && node_Y_2.getComponent("Cookie").getCookieType() == cookieType) {
                            cookieType = Math.floor(Math.random() * CookieType.CookieTypeCount);
                            script.setCookieType(cookieType);
                        }
                    }

                }
            }
            //
            this.firstDetectAllChains();
        }
    }

    // private checkCookies() {
    //     this.getCheckedCookies();
    // }
    private startSwapCookies(cookieNode: cc.Node, swapDirection: CookieSwapDirection) {
        if (cookieNode == null) 
        {
            this.node.runAction(cc.sequence(cc.delayTime(CookieAnimationTimeInterval), cc.callFunc(function () {
                this.controlAllCookieTouchable(true);
            }.bind(this))));
            return; 
        }
        
        let script: Cookie = cookieNode.getComponent("Cookie");
        let cookiePos = script.getCookie_X_Y();
        let newCookiePos = script.getCookie_X_Y();
        if (swapDirection == CookieSwapDirection.LEFT) {
            newCookiePos.x -= 1;
        }
        else if (swapDirection == CookieSwapDirection.RIGHT) {
            newCookiePos.x += 1;
        }
        else if (swapDirection == CookieSwapDirection.UP) {
            newCookiePos.y += 1;
        }
        else if (swapDirection == CookieSwapDirection.DOWN) {
            newCookiePos.y -= 1;
        }
        if (cookiePos.x != newCookiePos.x || cookiePos.y != newCookiePos.y) {
            let swapCookieNode: cc.Node = null;
            for (const key in this.m_cookieNode.children) {
                if (this.m_cookieNode.children.hasOwnProperty(key)) {
                    const element = this.m_cookieNode.children[key];
                    // if (element == null) { continue; }
                    let script: Cookie = element.getComponent("Cookie");
                    let tmpCookiePos = script.getCookie_X_Y();
                    if (tmpCookiePos.x == newCookiePos.x && tmpCookiePos.y == newCookiePos.y) {
                        swapCookieNode = element;
                        script.setOperationState(true);
                        break;
                    }
                }
            }
            if (swapCookieNode != null) {
                script.setOperationState(true);
                this.performSwapCookies(cookieNode, swapCookieNode);
            }
        }
    }

    private performSwapCookies(firstCookieNode: cc.Node, lastCookieNode: cc.Node)
    {
        this.swapCookies(firstCookieNode, lastCookieNode);
        this.node.runAction(cc.sequence(cc.delayTime(CookieAnimationTimeInterval * 2), cc.callFunc(function () {
            this.detectAllChains(firstCookieNode, lastCookieNode);
        }.bind(this))));
        
    }
    private swapCookies(firstCookieNode: cc.Node, lastCookieNode: cc.Node)
    {
        if (firstCookieNode == null || lastCookieNode == null) { return; }
        let swapTimeInterval = CookieAnimationTimeInterval;
        let firstScript: Cookie = firstCookieNode.getComponent("Cookie");
        let lastScript: Cookie = lastCookieNode.getComponent("Cookie");
        let tmpFirst_X_Y = firstScript.getCookie_X_Y();
        let tmpLast_X_Y = lastScript.getCookie_X_Y();
        let absXLength = Math.abs(tmpFirst_X_Y.x - tmpLast_X_Y.x);
        let absYLength = Math.abs(tmpFirst_X_Y.y - tmpLast_X_Y.y);
        if (absXLength + absYLength == 1) {
            this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
            let firstCookiePos = firstCookieNode.position;
            let lastCookiePos = lastCookieNode.position;
            //一个为all的cookie或者两个都是extra的cookie
            let isExtraSwap: boolean = false;
            if (firstScript.getExtraType() == CookieExtraType.Extra_All || lastScript.getExtraType() == CookieExtraType.Extra_All)
            {
                isExtraSwap = true;
            }
            else if (firstScript.getExtraType() != CookieExtraType.Extra_Normal && lastScript.getExtraType() != CookieExtraType.Extra_Normal)
            {
                isExtraSwap = true;
            }
            if (!this.hasChain(firstCookieNode) && !this.hasChain(lastCookieNode) && !isExtraSwap)
            {
                this.playInvalidSwapAudio();
                this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
                this.restoreCookieOperateState();
                lastCookieNode.runAction(cc.sequence(cc.moveTo(swapTimeInterval, firstCookiePos), cc.delayTime(swapTimeInterval), cc.moveTo(swapTimeInterval, lastCookiePos)));
                firstCookieNode.runAction(cc.sequence(cc.moveTo(swapTimeInterval, lastCookiePos), cc.delayTime(swapTimeInterval), cc.moveTo(swapTimeInterval, firstCookiePos)));
            }
            else
            {
                this.playSwapAudio();
                lastCookieNode.runAction(cc.moveTo(swapTimeInterval, firstCookiePos));
                firstCookieNode.runAction(cc.moveTo(swapTimeInterval, lastCookiePos));
            }
        }
    }

    //刚刚加载完检测
    private firstDetectAllChains()
    {
        this.controlAllCookieTouchable(true);
        this.node.runAction(cc.sequence(cc.delayTime(CookieAnimationTimeInterval * 8), cc.callFunc(function () 
        {
            this.detectAllChains();
        }.bind(this))));
    }
    //  检查是否存在可消除chain
    private detectAllChains(firstCookieNode?: cc.Node, lastCookieNode?: cc.Node)
    {
        let isExtraSwap: boolean = false;
        let chainsArray = [];
        if (firstCookieNode != null && lastCookieNode != null)
        {
            let firstScript: Cookie = firstCookieNode.getComponent("Cookie");
            let lastScript: Cookie = lastCookieNode.getComponent("Cookie");
            if (firstScript.getExtraType() == CookieExtraType.Extra_All || lastScript.getExtraType() == CookieExtraType.Extra_All)
            {
                isExtraSwap = true;
            }
            else if (firstScript.getExtraType() != CookieExtraType.Extra_Normal && lastScript.getExtraType() != CookieExtraType.Extra_Normal)
            {
                isExtraSwap = true;
            }

        }
        if (isExtraSwap)
        {
            chainsArray = this.detectExtraMatches(firstCookieNode, lastCookieNode);
        }
        else
        {
            chainsArray = this.detectMatches();
        }
        if (chainsArray.length > 0)
        {
            let delayTime = this.removeMatches(chainsArray);
            this.node.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(function () {
                this.checkFillHolesAnimation();
            }.bind(this))));
        }
        else 
        {
            this.controlAllCookieTouchable(true);
        }
    }
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
    private swapCookiesInArray(firstCookie_X_Y: cc.Vec2, lastCookie_X_Y: cc.Vec2)
    {
        let firstCookieNode = this.m_cookieNodesArray[firstCookie_X_Y.x][firstCookie_X_Y.y];
        let lastCookieNode = this.m_cookieNodesArray[lastCookie_X_Y.x][lastCookie_X_Y.y];
        if (firstCookieNode == null || lastCookieNode == null) { return; }
        //
        let firstScript: Cookie = firstCookieNode.getComponent("Cookie");
        let lastScript: Cookie = lastCookieNode.getComponent("Cookie");
        let tmpFirst_X_Y = firstScript.getCookie_X_Y();
        let tmpLast_X_Y = lastScript.getCookie_X_Y();
        firstScript.setCookie_X_Y(tmpLast_X_Y.x, tmpLast_X_Y.y);
        lastScript.setCookie_X_Y(tmpFirst_X_Y.x, tmpFirst_X_Y.y);
        let tmpFirstNode = this.m_cookieNodesArray[firstCookie_X_Y.x][firstCookie_X_Y.y];
        this.m_cookieNodesArray[firstCookie_X_Y.x][firstCookie_X_Y.y] = lastCookieNode;
        this.m_cookieNodesArray[lastCookie_X_Y.x][lastCookie_X_Y.y] = tmpFirstNode;
    }

    //所有cookie是否被交换过状态重置为false
    private restoreCookieOperateState()
    {
        for (let index_X = 0; index_X < CookieMax_X; index_X++) {
            for (let index_Y = 0; index_Y < CookieMax_Y; index_Y++) {
                let cookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (cookieNode == null) { continue; }
                let script: Cookie = cookieNode.getComponent("Cookie");
                script.setOperationState(false);
            }
        }
    }
    
    // private unCheckAllCookies() {
    //     for (const key in this.m_cookieNode.children) {
    //         if (this.m_cookieNode.children.hasOwnProperty(key)) {
    //             const element = this.m_cookieNode.children[key];
    //             let script = element.getComponent("Cookie");
    //             script.unCheckedCookie();
    //         }
    //     }
    // }

    private detectPossibleSwaps() {
        // var set: Set<Swap> = []

        for (let index_X = 0; index_X < CookieMax_X - 1; index_X++) {
            for (let index_Y = 0; index_Y < CookieMax_Y - 1; index_Y++) {
                //detect right
                let firstCookieNode = this.m_cookieNodesArray[index_X][index_Y];
                let lastCookieNode = this.m_cookieNodesArray[index_X + 1][index_Y];
                if (firstCookieNode == null || lastCookieNode == null) { continue; }
                let firstScript: Cookie = firstCookieNode.getComponent("Cookie");
                let lastScript: Cookie = lastCookieNode.getComponent("Cookie");
                let tmpFirst_X_Y = firstScript.getCookie_X_Y();
                let tmpLast_X_Y = lastScript.getCookie_X_Y();
                if (firstScript.getCookieType() == lastScript.getCookieType()) { continue; }
                this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
                if (this.hasChain(firstCookieNode) || this.hasChain(lastCookieNode))
                {
                    cc.log("valiable swap at right cookie:["+index_X,","+index_Y+"]" + " AND " + "cookie:["+String(index_X + 1)+","+index_Y+"]");
                }
                this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
                //detect top
                lastCookieNode = this.m_cookieNodesArray[index_X][index_Y + 1];
                if (lastCookieNode == null) { continue; }
                lastScript = lastCookieNode.getComponent("Cookie");
                tmpLast_X_Y = lastScript.getCookie_X_Y();
                if (firstScript.getCookieType() == lastScript.getCookieType()) { continue; }
                this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
                if (this.hasChain(firstCookieNode) || this.hasChain(lastCookieNode))
                {
                    cc.log("valiable swap at top cookie:["+index_X,","+index_Y+"]" + " AND " + "cookie:["+index_X+","+String(index_Y + 1)+"]");
                }
                this.swapCookiesInArray(tmpFirst_X_Y, tmpLast_X_Y);
            }
        }
      
        // possibleSwaps = set
    }
    private hasChain(cookie: cc.Node): Boolean {
        let cookieScript: Cookie = cookie.getComponent("Cookie");
        let cookieType = cookieScript.getCookieType();
        let cookie_X = cookieScript.getCookie_X_Y().x;
        let cookie_Y = cookieScript.getCookie_X_Y().y;

        // Horizontal chain check
        let horizontalLength = 1;
      
        // Left
        let i = cookie_X - 1;
        while (i >= 0 && this.m_cookieNodesArray[i][cookie_Y] && this.m_cookieNodesArray[i][cookie_Y].getComponent("Cookie").getCookieType() == cookieType)
        {
            i -= 1;
            horizontalLength += 1;
        }
        // Right
        i = cookie_X + 1
        while (i < CookieMax_X && this.m_cookieNodesArray[i][cookie_Y] && this.m_cookieNodesArray[i][cookie_Y].getComponent("Cookie").getCookieType() == cookieType)
        {
            i += 1;
            horizontalLength += 1;
        }
        if (horizontalLength >= 3)
        {
            return true;
        }
      
        // Vertical chain check
        var verticalLength = 1;
      
        // Down
        i = cookie_Y - 1;
        while (i >= 0 && this.m_cookieNodesArray[cookie_X][i] && this.m_cookieNodesArray[cookie_X][i].getComponent("Cookie").getCookieType() == cookieType)
        {
            i -= 1;
            verticalLength += 1;
        }
        // Up
        i = cookie_Y + 1;
        while (i < CookieMax_Y && this.m_cookieNodesArray[cookie_X][i] && this.m_cookieNodesArray[cookie_X][i].getComponent("Cookie").getCookieType() == cookieType)
        {
            i += 1;
            verticalLength += 1;
        }
        return verticalLength >= 3;
    }

    //extra的两个cookie或者normalcookie与extra allcookie交换时调用
    private detectExtraMatches(firstCookieNode: cc.Node, lastCookieNode: cc.Node): Array<Array<CookieTypeObject>>
    {
        let allMatchesArray: Array<Array<CookieTypeObject>> = [];
        if (firstCookieNode != null && lastCookieNode != null)
        {
            let firstScript: Cookie = firstCookieNode.getComponent("Cookie");
            let lastScript: Cookie = lastCookieNode.getComponent("Cookie");
            if (firstScript.getExtraType() == CookieExtraType.Extra_Normal && lastScript.getExtraType() == CookieExtraType.Extra_All)
            {
                let extraMatchedItem = this.detectExtraAllFuncMatches(lastScript.getCookieObject(), firstScript.getCookieType());
                extraMatchedItem.push(lastScript.getCookieObject());
                allMatchesArray.push(extraMatchedItem);
                lastScript.setExtraTrigerState(true);
            }
            else if (firstScript.getExtraType() == CookieExtraType.Extra_All && lastScript.getExtraType() == CookieExtraType.Extra_Normal) {
                
                let extraMatchedItem = this.detectExtraAllFuncMatches(firstScript.getCookieObject(), lastScript.getCookieType());
                extraMatchedItem.push(firstScript.getCookieObject());
                allMatchesArray.push(extraMatchedItem);
                firstScript.setExtraTrigerState(true);
            }
            else if (firstScript.getExtraType() == CookieExtraType.Extra_All && lastScript.getExtraType() == CookieExtraType.Extra_All)
            {
                let extraMatchedItem = this.detectExtraAll_ALL_FuncMatches();
                if (extraMatchedItem.length > 0)
                {
                    allMatchesArray.push(extraMatchedItem);
                }
                firstScript.setExtraTrigerState(true);
                lastScript.setExtraTrigerState(true);
            }
            else if (firstScript.getExtraType() == CookieExtraType.Extra_All && lastScript.getExtraType() != CookieExtraType.Extra_Normal) {
                let extraMatchedItem = this.changeNormalCookieFromExtraAllCookie(lastScript.getCookieObject());
                extraMatchedItem.push(firstScript.getCookieObject());
                extraMatchedItem.push(lastScript.getCookieObject());
                allMatchesArray.push(extraMatchedItem);
                firstScript.setExtraTrigerState(true);
            }
            else if (lastScript.getExtraType() == CookieExtraType.Extra_All && firstScript.getExtraType() != CookieExtraType.Extra_Normal) {
                let extraMatchedItem = this.changeNormalCookieFromExtraAllCookie(firstScript.getCookieObject());
                extraMatchedItem.push(firstScript.getCookieObject());
                extraMatchedItem.push(lastScript.getCookieObject());
                allMatchesArray.push(extraMatchedItem);
                lastScript.setExtraTrigerState(true);
            }
            else if (firstScript.getExtraType() != CookieExtraType.Extra_Normal && lastScript.getExtraType() != CookieExtraType.Extra_Normal)
            {
                if (firstScript.getExtraType() == CookieExtraType.Extra_Bomb)
                {
                    if (lastScript.getExtraType() == CookieExtraType.Extra_Bomb)
                    {
                        //5*5
                        let extraMatchedItem = this.detectExtraBombFuncMatches(firstScript.getCookieObject(), 2);
                        extraMatchedItem.push(firstScript.getCookieObject());
                        extraMatchedItem.push(lastScript.getCookieObject());
                        allMatchesArray.push(extraMatchedItem);
                    }
                    else if (lastScript.getExtraType() == CookieExtraType.Extra_Line_Horizontal || lastScript.getExtraType() == CookieExtraType.Extra_Line_Vertical)
                    {
                        //3行+3列
                        let extraMatchedItem = this.detectExtraLine_X_Y_FuncMatches(lastScript.getCookieObject(), 1);
                        extraMatchedItem.push(firstScript.getCookieObject());
                        extraMatchedItem.push(lastScript.getCookieObject());
                        allMatchesArray.push(extraMatchedItem);
                    }
                }
                else if (firstScript.getExtraType() == CookieExtraType.Extra_Line_Horizontal || firstScript.getExtraType() == CookieExtraType.Extra_Line_Vertical)
                {
                    if (lastScript.getExtraType() == CookieExtraType.Extra_Bomb)
                    {
                        //3行+3列
                        let extraMatchedItem = this.detectExtraLine_X_Y_FuncMatches(firstScript.getCookieObject(), 1);
                        extraMatchedItem.push(firstScript.getCookieObject());
                        extraMatchedItem.push(lastScript.getCookieObject());
                        allMatchesArray.push(extraMatchedItem);
                    }
                    else if (lastScript.getExtraType() == CookieExtraType.Extra_Line_Horizontal || lastScript.getExtraType() == CookieExtraType.Extra_Line_Vertical)
                    {
                        //1行+1列
                        let extraMatchedItem = this.detectExtraLine_X_Y_FuncMatches(lastScript.getCookieObject(), 0);
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
    }
    //检测普通cookie组成的三消
    private detectMatches(): Array<Array<CookieTypeObject>>
    {
        let allMatchesArray: Array<Array<CookieTypeObject>> = [];
        let allHorizontalMatchesArray = this.detectHorizontalMatches();
        let allVerticalMatchesArray = this.detectVerticalMatches();
        //  combine matches array from horizontal and vertical matches array if possible
        if (allHorizontalMatchesArray.length == 0)
        {
            allMatchesArray = allVerticalMatchesArray;
        }
        else if (allVerticalMatchesArray.length == 0)
        {
            allMatchesArray = allHorizontalMatchesArray;
        }
        else
        {
            //  横、竖重叠的要合并成一个array
            for (let index_H = 0; index_H < allHorizontalMatchesArray.length; index_H++) {
                const element_H = allHorizontalMatchesArray[index_H];
                let hasSameCookie: boolean = false;
                for (let index_V = 0; index_V < allVerticalMatchesArray.length; index_V++) {
                    const element_V = allVerticalMatchesArray[index_V];
                    if (ExtraCookieTypeManager.getInstance().hasSameElementTwoArray(element_H, element_V))
                    {
                        hasSameCookie = true;
                        //combine
                        let combineArray: Array<CookieTypeObject> = [];
                        for (const key in element_H) {
                            if (element_H.hasOwnProperty(key)) {
                                const element = element_H[key];
                                combineArray.push(element);
                            }
                        }
                        allHorizontalMatchesArray[index_H] = [];
                        for (const k_V in element_V) {
                            if (element_V.hasOwnProperty(k_V))
                            {
                                const ele = element_V[k_V];
                                let hasSame = false;
                                for (let index = 0; index < combineArray.length; index++)
                                {
                                    const e = combineArray[index];
                                    if (ele.pos_X == e.pos_X && ele.pos_Y == e.pos_Y)
                                    {
                                        hasSame = true;
                                        break;
                                    }
                                }
                                if (!hasSame)
                                {
                                    combineArray.push(ele);
                                }
                            }
                        }
                        allVerticalMatchesArray[index_V] = [];
                        allMatchesArray.push(combineArray);
                        break;
                    }
                }
                if (!hasSameCookie)
                {
                    allMatchesArray.push(element_H);
                }
            }
            for (let index_V = 0; index_V < allVerticalMatchesArray.length; index_V++)
            {
                const element_V = allVerticalMatchesArray[index_V];
                if (element_V.length > 0)
                {
                    allMatchesArray.push(element_V);
                }
            }
        }
        return allMatchesArray;
    }
    //  detect extra cookie func chains
    private detectExtraCookieFuncMatches(extraCookie: CookieTypeObject): Array<CookieTypeObject>
    {
        let extraMatchedItem: Array<CookieTypeObject> = [];
        if (extraCookie.extraType == CookieExtraType.Extra_Line_Horizontal || extraCookie.extraType == CookieExtraType.Extra_Line_Vertical)
        {
            extraMatchedItem = this.detectExtraLineFuncMatches(extraCookie);
        }
        else if (extraCookie.extraType == CookieExtraType.Extra_Bomb)
        {
            extraMatchedItem = this.detectExtraBombFuncMatches(extraCookie, 1);
        }
        else if (extraCookie.extraType == CookieExtraType.Extra_All)
        {
            let cookieType = Math.floor(Math.random() * CookieType.CookieTypeCount);
            extraMatchedItem = this.detectExtraAllFuncMatches(extraCookie, cookieType);
        }
        return extraMatchedItem;
    }
    private detectExtraLineFuncMatches(extraCookie: CookieTypeObject): Array<CookieTypeObject>
    {
        let extraMatchedItem: Array<CookieTypeObject> = [];
        if (extraCookie.extraType == CookieExtraType.Extra_Line_Horizontal)
        {
            for (let index = 0; index < CookieMax_X; index++) {
                let node = this.m_cookieNodesArray[index][extraCookie.pos_Y];
                if (node != null)
                {
                    let script: Cookie = node.getComponent("Cookie");
                    let cookieObj: CookieTypeObject = {
                        normalType: script.getCookieType(),
                        extraType: script.getExtraType(),
                        pos_X: script.getCookie_X_Y().x,
                        pos_Y: script.getCookie_X_Y().y,
                        isOpetation: script.getOperationState(),
                        isExtraTriger: script.getExtraTrigerState()
                    }
                    extraMatchedItem.push(cookieObj);
                }
            }
        }
        else{
            for (let index = 0; index < CookieMax_Y; index++) {
                let node = this.m_cookieNodesArray[extraCookie.pos_X][index];
                if (node != null)
                {
                    let script: Cookie = node.getComponent("Cookie");
                    let cookieObj: CookieTypeObject = {
                        normalType: script.getCookieType(),
                        extraType: script.getExtraType(),
                        pos_X: script.getCookie_X_Y().x,
                        pos_Y: script.getCookie_X_Y().y,
                        isOpetation: script.getOperationState(),
                        isExtraTriger: script.getExtraTrigerState()
                    }
                    extraMatchedItem.push(cookieObj);
                }
            }
        }
        return extraMatchedItem;
    }
    //炸弹消除队列检测，offset=1，默认消除3*3；offset=2，两个bomb的cookie叠加效果消除
    private detectExtraBombFuncMatches(extraCookie: CookieTypeObject, offset: number): Array<CookieTypeObject>
    {
        let extraMatchedItem: Array<CookieTypeObject> = [];
        if (extraCookie.extraType == CookieExtraType.Extra_Bomb)
        {
            for (let index_X = extraCookie.pos_X - offset; index_X <= extraCookie.pos_X + offset; index_X++) {
                for (let index_Y = extraCookie.pos_Y - offset; index_Y <= extraCookie.pos_Y + offset; index_Y++) {
                    if (index_X >= 0 && index_X < CookieMax_X && index_Y >= 0 && index_Y < CookieMax_Y)
                    {
                        let node = this.m_cookieNodesArray[index_X][index_Y];
                        if (node != null)
                        {
                            let script: Cookie = node.getComponent("Cookie");
                            let cookieObj: CookieTypeObject = {
                                normalType: script.getCookieType(),
                                extraType: script.getExtraType(),
                                pos_X: script.getCookie_X_Y().x,
                                pos_Y: script.getCookie_X_Y().y,
                                isOpetation: script.getOperationState(),
                                isExtraTriger: script.getExtraTrigerState()
                            }
                            extraMatchedItem.push(cookieObj);
                        }
                    }
                }
            }
        }
        return extraMatchedItem;
    }
    //bomb的cookie与line的cookie混合消除或者两个line的cookie混合消除，line 的中心点以一个line的cookie为参考
    private detectExtraLine_X_Y_FuncMatches(lineCookieObj: CookieTypeObject, offset: number): Array<CookieTypeObject>
    {
        let extraMatchedItem: Array<CookieTypeObject> = [];
        // if (extraCookie.extraType == CookieExtraType.Extra_Bomb)
        // {
            //添加整列
            for (let index_X = lineCookieObj.pos_X - offset; index_X <= lineCookieObj.pos_X + offset; index_X++) {
                for (let index_Y = 0; index_Y < CookieMax_Y; index_Y++) {
                    if (index_X >= 0 && index_X < CookieMax_X && index_Y >= 0 && index_Y < CookieMax_Y)
                    {
                        let node = this.m_cookieNodesArray[index_X][index_Y];
                        if (node != null)
                        {
                            let script: Cookie = node.getComponent("Cookie");
                            let cookieObj: CookieTypeObject = {
                                normalType: script.getCookieType(),
                                extraType: script.getExtraType(),
                                pos_X: script.getCookie_X_Y().x,
                                pos_Y: script.getCookie_X_Y().y,
                                isOpetation: script.getOperationState(),
                                isExtraTriger: script.getExtraTrigerState()
                            }
                            extraMatchedItem.push(cookieObj);
                        }
                    }
                }
            }
            //添加整行
            for (let index_Y = lineCookieObj.pos_Y - offset; index_Y <= lineCookieObj.pos_Y + offset; index_Y++) {
                for (let index_X = 0; index_X < CookieMax_X; index_X++) {
                    if (index_X >= 0 && index_X < CookieMax_X && index_Y >= 0 && index_Y < CookieMax_Y)
                    {
                        let node = this.m_cookieNodesArray[index_X][index_Y];
                        if (node != null)
                        {
                            let script: Cookie = node.getComponent("Cookie");
                            let cookieObj: CookieTypeObject = {
                                normalType: script.getCookieType(),
                                extraType: script.getExtraType(),
                                pos_X: script.getCookie_X_Y().x,
                                pos_Y: script.getCookie_X_Y().y,
                                isOpetation: script.getOperationState(),
                                isExtraTriger: script.getExtraTrigerState()
                            }
                            let hasAdded: boolean = false;
                            for (const key in extraMatchedItem) {
                                if (extraMatchedItem.hasOwnProperty(key)) {
                                    const element = extraMatchedItem[key];
                                    if (element.pos_X == cookieObj.pos_X && element.pos_Y == cookieObj.pos_Y)
                                    {
                                        hasAdded = true;
                                        break;
                                    }
                                }
                            }
                            if (!hasAdded)
                            {
                                extraMatchedItem.push(cookieObj);
                            }
                        }
                    }
                }
            }
        // }
        return extraMatchedItem;
    }
    //两个all的cookie组合，全屏消除
    private detectExtraAll_ALL_FuncMatches(): Array<CookieTypeObject>
    {
        let extraMatchedItem: Array<CookieTypeObject> = [];
        for (let index_X = 0; index_X < CookieMax_X; index_X++) {
            for (let index_Y = 0; index_Y < CookieMax_Y; index_Y++) {
                let node = this.m_cookieNodesArray[index_X][index_Y];
                if (node == null) { continue; }
                let script = node.getComponent("Cookie");
                extraMatchedItem.push(script.getCookieObject());
            }
        }
        return extraMatchedItem;
    }
    //all的cookie被触发后消除某个类型的cookie
    private detectExtraAllFuncMatches(extraCookie: CookieTypeObject, targetCookieType: CookieType): Array<CookieTypeObject>
    {
        let extraMatchedItem: Array<CookieTypeObject> = [];
        if (extraCookie.extraType == CookieExtraType.Extra_All && !extraCookie.isExtraTriger)
        {
            for (let index_X = 0; index_X < CookieMax_X; index_X++) {
                for (let index_Y = 0; index_Y < CookieMax_Y; index_Y++) {
                    let node = this.m_cookieNodesArray[index_X][index_Y];
                    if (node == null) { continue; }
                    let script = node.getComponent("Cookie");
                    if (script.getCookieType() == targetCookieType)
                    {
                        extraMatchedItem.push(script.getCookieObject());
                    }
                }

            }
        }
        return extraMatchedItem;
    }
    //all的cookie与extra的其他cookie混合触发后，将其他类型的同normal类型cookie变成类似的extra类型cookie
    private changeNormalCookieFromExtraAllCookie(extraCookie: CookieTypeObject): Array<CookieTypeObject>
    {
        let extraMatchedItem: Array<CookieTypeObject> = [];
        for (let index_X = 0; index_X < CookieMax_X; index_X++) {
            for (let index_Y = 0; index_Y < CookieMax_Y; index_Y++) {
                let node = this.m_cookieNodesArray[index_X][index_Y];
                if (node == null) { continue; }
                let script = node.getComponent("Cookie");
                if (script.getCookieType() == extraCookie.normalType && script.getExtraType() == CookieExtraType.Extra_Normal)
                {
                    if (extraCookie.extraType == CookieExtraType.Extra_Bomb)
                    {
                        script.setExtraType(CookieExtraType.Extra_Bomb);
                    }
                    else if (extraCookie.extraType == CookieExtraType.Extra_Line_Horizontal || extraCookie.extraType == CookieExtraType.Extra_Line_Vertical)
                    {
                        script.setExtraType(Math.random() < 0.5 ? CookieExtraType.Extra_Line_Horizontal : CookieExtraType.Extra_Line_Vertical);
                    }
                    extraMatchedItem.push(script.getCookieObject());
                }
            }
        }
        return extraMatchedItem;
    }
    //  detect horizontal chains
    private detectHorizontalMatches(): Array<Array<CookieTypeObject>> {
        let allHorizontalMatchesArray: Array<Array<CookieTypeObject>> = [];
        for (let index_Y = 0; index_Y < CookieMax_Y; index_Y++) {
            let horizontalMatchedItem: Array<CookieTypeObject> = [];
            let firstCookieNode = null;
            for (let index_X = 0; index_X < CookieMax_X - 2;) {
                firstCookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (firstCookieNode == null)
                {
                    index_X++;
                    continue; 
                }
                horizontalMatchedItem = [];
                let firstScript: Cookie = firstCookieNode.getComponent("Cookie");
                let firstCookieType = firstScript.getCookieType();
                let cookieObj: CookieTypeObject = {
                    normalType: firstCookieType,
                    extraType: firstScript.getExtraType(),
                    pos_X: firstScript.getCookie_X_Y().x,
                    pos_Y: firstScript.getCookie_X_Y().y,
                    isOpetation: firstScript.getOperationState(),
                    isExtraTriger: firstScript.getExtraTrigerState()
                }
                horizontalMatchedItem.push(cookieObj);
                let idx = index_X + 1
                for (; idx < CookieMax_X; idx++)
                {
                    let cookieItemNode = this.m_cookieNodesArray[idx][index_Y];
                    if (cookieItemNode == null) { break; }
                    let cookieItemScript: Cookie = cookieItemNode.getComponent("Cookie");
                    if (cookieItemScript.getCookieType() == firstCookieType) {
                        let cookieObj: CookieTypeObject = {
                            normalType: firstCookieType,
                            extraType: cookieItemScript.getExtraType(),
                            pos_X: cookieItemScript.getCookie_X_Y().x,
                            pos_Y: cookieItemScript.getCookie_X_Y().y,
                            isOpetation: cookieItemScript.getOperationState(),
                            isExtraTriger: cookieItemScript.getExtraTrigerState()
                        }
                        horizontalMatchedItem.push(cookieObj);
                    }
                    else
                    {
                        break;
                    }
                }
                if (horizontalMatchedItem.length >= 3)
                {
                    allHorizontalMatchesArray.push(horizontalMatchedItem);
                    index_X = idx;
                }
                else
                {
                    index_X++;
                }
            }
        }
        return allHorizontalMatchesArray;
    }
    //  detect vertical chains
    private detectVerticalMatches(): Array<Array<CookieTypeObject>>
    {
        let allVerticalMatchesArray: Array<Array<CookieTypeObject>> = [];
        for (let index_X = 0; index_X < CookieMax_X; index_X++) {
            let verticalMatchedItem: Array<CookieTypeObject> = [];
            let firstCookieNode = null;
            for (let index_Y = 0; index_Y < CookieMax_Y - 2;) {
                firstCookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (firstCookieNode == null)
                {
                    index_Y++;
                    continue; 
                }
                verticalMatchedItem = [];
                let firstScript: Cookie = firstCookieNode.getComponent("Cookie");
                let firstCookieType = firstScript.getCookieType();
                let cookieObj: CookieTypeObject = {
                    normalType: firstCookieType,
                    extraType: firstScript.getExtraType(),
                    pos_X: firstScript.getCookie_X_Y().x,
                    pos_Y: firstScript.getCookie_X_Y().y,
                    isOpetation: firstScript.getOperationState(),
                    isExtraTriger: firstScript.getExtraTrigerState()
                }
                verticalMatchedItem.push(cookieObj);
                let idx_y = index_Y + 1
                for (; idx_y < CookieMax_Y; idx_y++)
                {
                    let cookieItemNode = this.m_cookieNodesArray[index_X][idx_y];
                    if (cookieItemNode == null) { break; }
                    let cookieItemScript: Cookie = cookieItemNode.getComponent("Cookie");
                    if (cookieItemScript.getCookieType() == firstCookieType) {
                        let cookieObj: CookieTypeObject = {
                            normalType: firstCookieType,
                            extraType: cookieItemScript.getExtraType(),
                            pos_X: cookieItemScript.getCookie_X_Y().x,
                            pos_Y: cookieItemScript.getCookie_X_Y().y,
                            isOpetation: cookieItemScript.getOperationState(),
                            isExtraTriger: cookieItemScript.getExtraTrigerState()
                        }
                        verticalMatchedItem.push(cookieObj);
                    }
                    else
                    {
                        break;
                    }
                }
                if (verticalMatchedItem.length >= 3)
                {
                    allVerticalMatchesArray.push(verticalMatchedItem);
                    index_Y = idx_y;
                }
                else
                {
                    index_Y++;
                }
            }
        }
        return allVerticalMatchesArray;
    }



    private removeMatches(matchesArray: Array<Array<CookieTypeObject>>): number
    {
        let delayTime: number = CookieAnimationTimeInterval * 2;
        this.playMatchAudio();
        let allExrtaMatchesArray: Array<Array<CookieTypeObject>> = [];

        for (let index = 0; index < matchesArray.length; index++)
        {
            const element = matchesArray[index];
            for (const key in element)
            {
                if (element.hasOwnProperty(key))
                {
                    const ele = element[key];
                    if (ele.pos_X >= 0 && ele.pos_X < CookieMax_X && ele.pos_Y >= 0 && ele.pos_Y < CookieMax_Y)
                    {
                        let itemNode = this.m_cookieNodesArray[ele.pos_X][ele.pos_Y];
                        if (itemNode != null)
                        {
                            let itemScript: Cookie = itemNode.getComponent("Cookie");
                            if (itemScript.getExtraType() != CookieExtraType.Extra_Normal && !itemScript.getExtraTrigerState())
                            {
                                //特殊道具产生的消除
                                let extraMatches = this.detectExtraCookieFuncMatches(itemScript.getCookieObject());
                                if (extraMatches.length > 0)
                                {
                                    // this.removeMatches(extraMatches);
                                    allExrtaMatchesArray.push(extraMatches);
                                }
                            }
                            this.m_cookieNodesArray[ele.pos_X][ele.pos_Y] = null;
                            itemNode.runAction(cc.sequence(cc.fadeOut(CookieAnimationTimeInterval), cc.delayTime(CookieAnimationTimeInterval), cc.removeSelf()));
                        }
                    }
                }
            }
            this.restoreCookieOperateState();
            if (element.length > 3)
            {
                let extraCookieTypeData: CookieTypeObject = ExtraCookieTypeManager.getInstance().getExtraCookieTypeByChain(element);
                if (extraCookieTypeData != null && this.m_cookieNodesArray[extraCookieTypeData.pos_X][extraCookieTypeData.pos_Y] == null)
                {
                    let cookieItem = this.createCookieAtLevel(extraCookieTypeData.pos_X, extraCookieTypeData.pos_Y, extraCookieTypeData.normalType, extraCookieTypeData.extraType, this.getCookiePosition(extraCookieTypeData.pos_X, extraCookieTypeData.pos_Y));
                    cookieItem.runAction(cc.sequence(cc.scaleTo(CookieAnimationTimeInterval, 1.2), cc.scaleTo(CookieAnimationTimeInterval, 1)));
                }
            }
        }
        //
        if (allExrtaMatchesArray.length > 0)
        {
            delayTime = CookieAnimationTimeInterval * 3;
            this.removeMatches(allExrtaMatchesArray);
        }
        return delayTime;
    }

    //  消除之后cookie下落将下面的hole填满
    private checkFillHolesAnimation() {
        if (this.checkFillHoles())
        {
            //  drop down to fill holes
            this.node.runAction(cc.sequence(cc.delayTime(CookieAnimationTimeInterval), cc.callFunc(function () 
            {
                this.checkFillHolesAnimation();
            }.bind(this))));
        }
        else 
        {
            //  top up to create new cookie
            this.checkTopUpCookiesAnimation();
        }
    }
    private checkFillHoles(): boolean
    {
        let needDropToFill = false;
        for (let index_X = 0; index_X < CookieMax_X; index_X++)
        {
            for (let index_Y = 0; index_Y < CookieMax_Y - 1; index_Y++)
            {
                let cookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (cookieNode == null && this.m_tilesNodesArray[index_X][index_Y] != null)
                {
                    // cookie above shoule drop down here
                    for (let idx = index_Y + 1; idx < CookieMax_Y; idx++)
                    {
                        let itemNode = this.m_cookieNodesArray[index_X][idx];
                        if (itemNode != null)
                        {
                            needDropToFill = true;
                            break;
                        }
                    }
                }
                if (needDropToFill)
                {
                    break;
                }
            }
            if (needDropToFill)
            {
                break;
            }
        }
        if (needDropToFill)
        {
            this.fillHoles();
        }
        return needDropToFill;
    }
    private fillHoles()
    {
        this.playFallingAudio();
        for (let index_X = 0; index_X < CookieMax_X; index_X++)
        {
            for (let index_Y = 0; index_Y < CookieMax_Y - 1; index_Y++)
            {
                let cookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (cookieNode == null && this.m_tilesNodesArray[index_X][index_Y] != null)
                {
                    // cookie above shoule drop down here
                    for (let idx = index_Y + 1; idx < CookieMax_Y; idx++)
                    {
                        let itemNode = this.m_cookieNodesArray[index_X][idx];
                        if (itemNode != null)
                        {
                            this.m_cookieNodesArray[index_X][index_Y] = itemNode;
                            this.m_cookieNodesArray[index_X][idx] = null;
                            let itemScript: Cookie = itemNode.getComponent("Cookie");
                            itemScript.setCookie_X_Y(index_X, index_Y);
                            itemNode.runAction(cc.moveTo(CookieAnimationTimeInterval * Math.abs(idx - index_Y), this.getCookiePosition(index_X, index_Y)));
                            break;
                        }                  
                    }
                    break;
                }

            }
        }
    }

    //  由上方产生新的cookie并且降落填充
    private checkTopUpCookiesAnimation() {
        if (this.checkTopUpCookies())
        {
            this.node.runAction(cc.sequence(cc.delayTime(CookieAnimationTimeInterval), cc.callFunc(function () 
            {
                this.checkTopUpCookiesAnimation();
            }.bind(this))));
        }
        else
        {
            this.node.runAction(cc.sequence(cc.delayTime(CookieAnimationTimeInterval), cc.callFunc(function () 
            {
                this.detectAllChains();
            }.bind(this))));
        }
    }
    private checkTopUpCookies(): boolean {
        let needTopUpCookie = false;
        for (let index_X = 0; index_X < CookieMax_X; index_X++)
        {
            for (let index_Y = CookieMax_Y - 1; index_Y >= 0; index_Y--)
            {
                let cookieNode = this.m_cookieNodesArray[index_X][index_Y];
                if (cookieNode == null && this.m_tilesNodesArray[index_X][index_Y] != null)
                {
                    needTopUpCookie = true;
                    break;
                }
            }
            if (needTopUpCookie) { break; }
        }
        if (needTopUpCookie)
        {
            this.topUpCookies();
        }
        return needTopUpCookie;
    }
    //  上方产生cookie填充上面数最后一个空白cookie
    private topUpCookies() {
        this.playAddCookiesAudio();
        for (let index_X = 0; index_X < CookieMax_X; index_X++)
        {
            //  get top empty tile position
            let maxY = CookieMax_Y;
            for (let index_Y = CookieMax_Y - 1; index_Y >= 0; index_Y--)
            {
                let tileNode = this.m_tilesNodesArray[index_X][index_Y];
                if (tileNode != null)
                {
                    break;
                }
                else
                {
                    maxY = index_Y;
                }
            }
            //  get bottom tile position with empty cookie
            let finalY = CookieMax_Y - 1;
            for (let tmpY = CookieMax_Y - 1; tmpY >= 0; tmpY--) {
                if (this.m_tilesNodesArray[index_X][tmpY] != null && this.m_cookieNodesArray[index_X][tmpY] == null)
                {
                    finalY = tmpY;
                }
            }
            //  create cookie at top and drop it down
            if (this.m_tilesNodesArray[index_X][finalY] != null && this.m_cookieNodesArray[index_X][finalY] == null)
            {
                let cookieType = Math.floor(Math.random() * CookieType.CookieTypeCount);
                let cookieItem = this.createCookieAtLevel(index_X, finalY, cookieType, CookieExtraType.Extra_Normal, this.getCookiePosition(index_X, maxY));
                cookieItem.runAction(cc.moveTo(CookieAnimationTimeInterval * (Math.abs(maxY - finalY)), this.getCookiePosition(index_X, finalY)));    
            }
        }
    }

    private createCookieAtLevel(index_X: number, index_Y: number, cookieType: CookieType, extraCookieType: CookieExtraType = CookieExtraType.Extra_Normal, cookieStartPos?: cc.Vec2): cc.Node
    {
        let node = cc.instantiate(this.m_cookieInstance);
        if (cookieStartPos)
        {
            node.setPosition(cookieStartPos);
        }
        else
        {
            node.setPosition(this.getCookiePosition(index_X, index_Y));
        }
        this.m_cookieNode.addChild(node);
        this.m_cookieNodesArray[index_X][index_Y] = node;
        let script: Cookie = node.getComponent("Cookie");
        script.init(index_X, index_Y, cookieType, extraCookieType);
        script.setCookieMovingSwapDelegate(function (cookieNode: cc.Node, swapDirection: CookieSwapDirection) {
            this.controlAllCookieTouchable(false);
            this.startSwapCookies(cookieNode, swapDirection);
        }.bind(this));
        return node;
    }
    private getCookiePosition(index_X: number, index_Y: number): cc.Vec2
    {
        let itemPos: cc.Vec2 = cc.Vec2.ZERO;
        itemPos.x = CookieTile_Width / 2 + CookieTile_Width * index_X;
        itemPos.y = CookieTile_Height / 2 + CookieTile_Height * index_Y;
        return itemPos;
    }

    private loadAudioRes()
    {
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
    }
    private playSwapAudio()
    {
        if (this.m_swapAudioClip == null) { return; }
        var audioID = cc.audioEngine.playEffect(this.m_swapAudioClip, false);
    }
    private playInvalidSwapAudio()
    {
        if (this.m_invalidSwapAudioClip == null) { return; }
        var audioID = cc.audioEngine.playEffect(this.m_invalidSwapAudioClip, false);
    }
    private playMatchAudio()
    {
        if (this.m_matchAudioClip == null) { return; }
        var audioID = cc.audioEngine.playEffect(this.m_matchAudioClip, false);
    }
    private playFallingAudio()
    {
        if (this.m_fallingAudioClip == null) { return; }
        var audioID = cc.audioEngine.playEffect(this.m_fallingAudioClip, false);
    }
    private playAddCookiesAudio()
    {
        if (this.m_addCookiesAudioClip == null) { return; }
        var audioID = cc.audioEngine.playEffect(this.m_addCookiesAudioClip, false);
    }


}
