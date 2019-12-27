
const {ccclass, property} = cc._decorator;

export const CookieMax_X: number = 9;
export const CookieMax_Y: number = 9;

export enum CookieType {
    Sprite_0,
    Sprite_1,
    Sprite_2,
    Sprite_3,
    Sprite_4,
    Sprite_5,

    CookieTypeCount,

    NONE        //特殊类型，不通过三个相同类型消除
}
export enum CookieExtraType {
    Extra_Normal = 0,            //普通cookie
    Extra_Line_Horizontal = 1,   //
    Extra_Line_Vertical = 2,     //
    Extra_Bomb = 3,
    Extra_All = 4,               //

    CookieTypeMax,
};

//CookieTypeAndColumnRow
export interface CookieTypeObject {
    normalType: CookieType;
    extraType: CookieExtraType;
    pos_X: number;
    pos_Y: number;
    isOpetation: boolean;
    isExtraTriger: boolean;
};

let g_cookieDataMgr: ExtraCookieTypeManager = null;

@ccclass
export default class ExtraCookieTypeManager extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}


    public static getInstance():ExtraCookieTypeManager
    {
        if (g_cookieDataMgr == null)
        {
            g_cookieDataMgr = new ExtraCookieTypeManager();
        }
        return g_cookieDataMgr;
    }

    public getExtraCookieTypeByChain(chains: Array<CookieTypeObject>): CookieTypeObject
    {
        if (chains.length <= 0) { return null; }
        //检测是否有同类型连续cookie
        let continueXCountArray: Array<number> = [];                    //x方向每列cookie数量
        let continueYCountArray: Array<number> = [];                    //y方向每行cookie数量
        let cookieTypeArray: Array<CookieType> = [];                    //每种类型的cookie的数量
        let continueChainsAll_X: Array<Array<CookieTypeObject>> = [];   //x方向所有连续的chain
        let continueChainsAll_Y: Array<Array<CookieTypeObject>> = [];   //y方向所有连续的chain
        let combineSameTypeChains: Array<Array<CookieTypeObject>> = []; //
        for (let index = 0; index < CookieMax_X; index++) {
            continueXCountArray[index] = 0;
        }
        for (let index = 0; index < CookieMax_Y; index++) {
            continueYCountArray[index] = 0;
        }
        for (let index = 0; index < CookieType.CookieTypeCount; index++) {
            cookieTypeArray.push(0);
        }
        //cookie信息统计
        for (let index = 0; index < chains.length; index++) {
            const element = chains[index];
            continueXCountArray[element.pos_X]++;
            continueYCountArray[element.pos_Y]++;
            cookieTypeArray[element.normalType]++;
        }
        //cookie信息分析
        for (let index_Type = 0; index_Type < cookieTypeArray.length; index_Type++) {
            const typeCount = cookieTypeArray[index_Type];  //extra类型，同类型至少达到4个
            if (typeCount >= 4)
            {
                //y固定沿着x方向检测
                for (let index_Y = 0; index_Y < continueYCountArray.length; index_Y++) {
                    const yCount = continueYCountArray[index_Y];
                    if (yCount >= 3)
                    {
                        let tmpArray: Array<CookieTypeObject> = [];
                        for (let index_X = 0; index_X < chains.length; index_X++) {
                            const startObj = chains[index_X];
                            if (startObj.normalType == index_Type && startObj.pos_Y == index_Y)
                            {
                                tmpArray.push(startObj);
                            }
                        }

                        tmpArray.sort(this.comparison_function_X);







                        if (tmpArray.length >= 3)
                        {
                            let itemArray: Array<CookieTypeObject> = [];
                            for (let i = 0; i < tmpArray.length - 2;) {
                                itemArray = [];
                                let element = tmpArray[i];
                                itemArray.push(element);
                                let j = i + 1
                                for (; j < tmpArray.length; j++) {
                                    const ele = tmpArray[j];
                                    if (Math.abs(element.pos_X - ele.pos_X) == 1)
                                    {
                                        element = ele;
                                        itemArray.push(ele);
                                    }
                                    else 
                                    {
                                        break;
                                    }
                                    
                                }
                                if (itemArray.length >= 3)
                                {
                                    continueChainsAll_X.push(itemArray);
                                    i = j;
                                }
                                else
                                {
                                    i++;
                                }
                            }
                        }
                    }
                }
                //x固定沿着y方向
                for (let index_X = 0; index_X < continueXCountArray.length; index_X++) {
                    const xCount = continueXCountArray[index_X];
                    if (xCount >= 3)
                    {
                        let tmpArray: Array<CookieTypeObject> = [];
                        for (let index_Y = 0; index_Y < chains.length; index_Y++) {
                            const startObj = chains[index_Y];
                            if (startObj.normalType == index_Type && startObj.pos_X == index_X)
                            {
                                tmpArray.push(startObj);
                            }
                        }

                        tmpArray.sort(this.comparison_function_Y);



                        if (tmpArray.length >= 3)
                        {
                            let itemArray: Array<CookieTypeObject> = [];
                            for (let i = 0; i < tmpArray.length - 2;) {
                                itemArray = [];
                                let element = tmpArray[i];
                                itemArray.push(element);
                                let j = i + 1
                                for (; j < tmpArray.length; j++) {
                                    const ele = tmpArray[j];
                                    if (Math.abs(element.pos_Y - ele.pos_Y) == 1)
                                    {
                                        element = ele;
                                        itemArray.push(ele);
                                    }
                                    else
                                    {
                                        break;
                                    }
                                }
                                if (itemArray.length >= 3)
                                {
                                    continueChainsAll_Y.push(itemArray);
                                    i = j;
                                }
                                else 
                                {
                                    i++;
                                }
                            }
                        }
                    }
                }
                //combine x and y direction chains
                if (continueChainsAll_X.length > 0 && continueChainsAll_Y.length > 0)
                {
                    //  横、竖重叠的要合并成一个array
                    for (let index_H = 0; index_H < continueChainsAll_X.length; index_H++) {
                        const element_H = continueChainsAll_X[index_H];
                        let hasSameCookie: boolean = false;
                        for (let index_V = 0; index_V < continueChainsAll_Y.length; index_V++) {
                            const element_V = continueChainsAll_Y[index_V];
                            if (this.hasSameElementTwoArray(element_H, element_V))
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
                                continueChainsAll_X[index_H] = [];
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
                                continueChainsAll_Y[index_V] = [];
                                combineSameTypeChains.push(combineArray);
                                break;
                            }
                        }
                        if (!hasSameCookie)
                        {
                            combineSameTypeChains.push(element_H);
                        }
                    }
                    for (let index_V = 0; index_V < continueChainsAll_Y.length; index_V++)
                    {
                        const element_V = continueChainsAll_Y[index_V];
                        if (element_V.length > 0)
                        {
                            combineSameTypeChains.push(element_V);
                        }
                    }


                }
                else
                {
                    if (continueChainsAll_X.length > 0) { combineSameTypeChains = continueChainsAll_X; }
                    if (continueChainsAll_Y.length > 0) { combineSameTypeChains = continueChainsAll_Y; }
                }


            }
        }


        for (let index = 0; index < combineSameTypeChains.length; index++) {
            const element = combineSameTypeChains[index];
            let obj = this.getExtraCookieTypeBySameTypeChain(element);
            if (obj != null)
            {
                return obj;
            }
        }



    }

    public hasSameElementTwoArray(firstArray: Array<CookieTypeObject>, lastArray: Array<CookieTypeObject>): boolean
    {
        let hasSameElement = false;
        for (const key_first in firstArray) {
            if (firstArray.hasOwnProperty(key_first)) {
                const element_first: CookieTypeObject = firstArray[key_first];
                for (const key_last in lastArray) {
                    if (lastArray.hasOwnProperty(key_last)) {
                        const element_last = lastArray[key_last];
                        if (element_first.pos_X == element_last.pos_X && element_first.pos_Y == element_last.pos_Y)
                        {
                            hasSameElement = true;
                            break;
                        }
                    }
                }
                if (hasSameElement)
                {
                    break;
                }
            }
        }
        return hasSameElement;
    }

    private getExtraCookieTypeBySameTypeChain(chains: Array<CookieTypeObject>): CookieTypeObject
    {
        if (chains.length <= 3) { return null; }

        let normalType = CookieType.CookieTypeCount;
        let extraType = CookieExtraType.Extra_Normal;
        let target_X = CookieMax_X;
        let target_Y = CookieMax_Y;
        let maxXArray: Array<number> = [];
        let maxYArray: Array<number> = [];
        let cookieNormalTypeArray: Array<CookieType> = [];
        for (let index = 0; index < CookieMax_X; index++) {
            maxXArray[index] = 0;
        }
        for (let index = 0; index < CookieMax_Y; index++) {
            maxYArray[index] = 0;
        }
        for (let index = 0; index < CookieType.CookieTypeCount; index++) {
            cookieNormalTypeArray.push(0);
        }
        let hasOpetation: Boolean = false;
        for (let index = 0; index < chains.length; index++) 
        {
            const element = chains[index];
            maxXArray[element.pos_X]++;
            maxYArray[element.pos_Y]++;
            cookieNormalTypeArray[element.normalType]++;
            if (element.isOpetation) 
            {
                hasOpetation = true;
                target_X = element.pos_X;
                target_Y = element.pos_Y;
            }
            if (index == 0)
            {
                normalType = element.normalType;
            }
        }
        //  如果消除组不是同样的普通类型的无法产生特殊cookie
        let cookieTypeCount = 0;
        for (let index = 0; index < cookieNormalTypeArray.length; index++) {
            const element = cookieNormalTypeArray[index];
            if (element > 1)
            {
                cookieTypeCount++;
            }
        }
        if (cookieTypeCount > 1)
        {
            return null;
        }
        let maxCountValueX = maxXArray[0];
        let maxCountValueY = maxYArray[0];
        let maxX = 0;
        let maxY = 0;
        for (let index = 1; index < maxXArray.length; index++) {
            const element = maxXArray[index];
            if (element > maxCountValueX)
            {
                maxCountValueX = element;
                maxX = index;
            }
        }
        for (let index = 0; index < maxYArray.length; index++) {
            const element = maxYArray[index];
            if (element > maxCountValueY)
            {
                maxCountValueY = element;
                maxY = index;
            }
        }
        if (maxCountValueX >= 5 || maxCountValueY >= 5)
        {
            extraType = CookieExtraType.Extra_All;
            normalType = CookieType.NONE;
        }
        else if (maxCountValueX >= 3 && maxCountValueY >= 3)
        {
            extraType = CookieExtraType.Extra_Bomb;
        }
        else
        {
            extraType = maxCountValueX > 3 ? CookieExtraType.Extra_Line_Horizontal : CookieExtraType.Extra_Line_Vertical;
        }
        //掉落时自动产生的
        if (!hasOpetation)
        {
            if (extraType == CookieExtraType.Extra_Line_Horizontal || extraType == CookieExtraType.Extra_Line_Vertical)
            {
                const element = chains[1];
                target_X = element.pos_X;
                target_Y = element.pos_Y;
            }
            else if (extraType == CookieExtraType.Extra_All)
            {
                const element = chains[2];
                target_X = element.pos_X;
                target_Y = element.pos_Y;
            }
            else
            {
                target_X = maxX;
                target_Y = maxY;
            }
        }
        let cookieObj: CookieTypeObject = {
            normalType: normalType,
            extraType: extraType,
            pos_X: target_X,
            pos_Y: target_Y,
            isOpetation: false,
            isExtraTriger: false
        }
        
        return cookieObj;
    }

    private comparison_function_X(x: CookieTypeObject, y: CookieTypeObject): number {
        if (x.pos_X < y.pos_X) {
            return -1;
        } else if (x.pos_X > y.pos_X) {
            return 1;
        } else {
            return 0;
        }
    }
    private comparison_function_Y(x: CookieTypeObject, y: CookieTypeObject): number {
        if (x.pos_Y < y.pos_Y) {
            return -1;
        } else if (x.pos_Y > y.pos_Y) {
            return 1;
        } else {
            return 0;
        }
    }

    // public getExtraCookieTypeByChain(chains: Array<CookieTypeObject>): CookieTypeObject
    // {
    //     if (chains.length <= 0)
    //     {
    //         return null;
    //     }

    //     let orignalChains = chains;
    //     let isSameType: boolean = true;
    //     let hasChain: boolean = false;
    //     let preCookieObj = chains[0];
    //     let firstCookieObj = chains[0];
    //     for (let index = 1; index < chains.length; index++) {
    //         const element = chains[index];
    //         if (preCookieObj.normalType != element.normalType)
    //         {
    //             isSameType = false;
    //             break;
    //         }
    //     }
    //     //检查是否有连续同类型
    //     let continueChain_X: Array<CookieTypeObject> = [];
    //     let continueChain_Y: Array<CookieTypeObject> = [];
    //     continueChain_X.push(firstCookieObj);
    //     continueChain_Y.push(firstCookieObj);
    //     for (let index = 1; index < chains.length; index++) {
    //         const element = chains[index];
    //         if (element.normalType == preCookieObj.normalType)
    //         {
    //             if (element.pos_Y == firstCookieObj.pos_Y && Math.abs(element.pos_X - preCookieObj.pos_X) == 1)
    //             {
    //                 continueChain_X.push(element);
    //             }
    //             else 
    //             {
    //                 // if (continueChain_X.length < 3)
    //                 // {
    //                 //     continueChain_X = [];
    //                 //     continueChain_X.push(element);
    //                 // }
    //             }
    //             if (element.pos_X == firstCookieObj.pos_X && Math.abs(element.pos_Y - preCookieObj.pos_Y) == 1)
    //             {
    //                 continueChain_Y.push(element);
    //             }
    //             else 
    //             {
    //                 // if (continueChain_Y.length < 3)
    //                 // {
    //                 //     continueChain_Y = [];
    //                 //     continueChain_Y.push(element);
    //                 // }
    //             }
    //         }
    //         preCookieObj = element;
    //     }
    //     if (continueChain_X.length >= 3) { hasChain = true; }
    //     if (continueChain_Y.length >= 3) { hasChain = true; }
    //     if (!isSameType)
    //     {
    //         if (continueChain_X.length > 3)
    //         {
    //             chains = continueChain_X;
    //         }
    //         else if (continueChain_Y.length > 3)
    //         {
    //             chains = continueChain_Y;
    //         }
    //         else
    //         {
    //             chains = [];
    //         }
    //     }
    //     else
    //     {
    //         if (!hasChain) { return null; }
    //     }
    //     if (chains.length <= 0) { return null; }

    //     let normalType = CookieType.CookieTypeCount;
    //     let extraType = CookieExtraType.Extra_Normal;
    //     let target_X = CookieMax_X;
    //     let target_Y = CookieMax_Y;
    //     let maxXArray: Array<number> = [];
    //     let maxYArray: Array<number> = [];
    //     let cookieNormalTypeArray: Array<CookieType> = [];
    //     for (let index = 0; index < CookieMax_X; index++) {
    //         maxXArray[index] = 0;
    //     }
    //     for (let index = 0; index < CookieMax_Y; index++) {
    //         maxYArray[index] = 0;
    //     }
    //     for (let index = 0; index < CookieType.CookieTypeCount; index++) {
    //         cookieNormalTypeArray.push(0);
    //     }
    //     let hasOpetation: Boolean = false;
    //     for (let index = 0; index < chains.length; index++) {
    //         const element = chains[index];
    //         maxXArray[element.pos_X]++;
    //         maxYArray[element.pos_Y]++;
    //         cookieNormalTypeArray[element.normalType]++;
    //         if (element.isOpetation)
    //         {
    //             hasOpetation = true;
    //             target_X = element.pos_X;
    //             target_Y = element.pos_Y;
    //         }
    //         if (index == 0)
    //         {
    //             normalType = element.normalType;
    //         }
    //     }
    //     //  如果消除组不是同样的普通类型的无法产生特殊cookie
    //     let cookieTypeCount = 0;
    //     for (let index = 0; index < cookieNormalTypeArray.length; index++) {
    //         const element = cookieNormalTypeArray[index];
    //         if (element > 1)
    //         {
    //             cookieTypeCount++;
    //         }
    //     }
    //     if (cookieTypeCount > 1)
    //     {
    //         return null;
    //     }

    //     let maxCountValueX = maxXArray[0];
    //     let maxCountValueY = maxYArray[0];
    //     let maxX = 0;
    //     let maxY = 0;
    //     for (let index = 1; index < maxXArray.length; index++) {
    //         const element = maxXArray[index];
    //         if (element > maxCountValueX)
    //         {
    //             maxCountValueX = element;
    //             maxX = index;
    //         }
    //     }
    //     for (let index = 0; index < maxYArray.length; index++) {
    //         const element = maxYArray[index];
    //         if (element > maxCountValueY)
    //         {
    //             maxCountValueY = element;
    //             maxY = index;
    //         }
    //     }
    //     // if ((maxCountValueX >= 5 || maxCountValueY >= 5) && cookieTypeCount >= 5)
    //     if (maxCountValueX >= 5 || maxCountValueY >= 5)
    //     {
    //         extraType = CookieExtraType.Extra_All;
    //         normalType = CookieType.NONE;
    //     }
    //     else if (maxCountValueX >= 3 && maxCountValueY >= 3)
    //     {
    //         extraType = CookieExtraType.Extra_Bomb;
    //     }
    //     else
    //     {
    //         extraType = maxCountValueX > 3 ? CookieExtraType.Extra_Line_Horizontal : CookieExtraType.Extra_Line_Vertical;
    //     }
    //     //掉落时自动产生的
    //     if (!hasOpetation)
    //     {
    //         if (extraType == CookieExtraType.Extra_Line_Horizontal || extraType == CookieExtraType.Extra_Line_Vertical)
    //         {
    //             const element = chains[1];
    //             target_X = element.pos_X;
    //             target_Y = element.pos_Y;
    //         }
    //         else
    //         {
    //             target_X = maxX;
    //             target_Y = maxY;
    //         }
    //     }
    //     let cookieObj: CookieTypeObject = {
    //         normalType: normalType,
    //         extraType: extraType,
    //         pos_X: target_X,
    //         pos_Y: target_Y,
    //         isOpetation: false,
    //         isExtraTriger: false
    //     }
        
    //     return cookieObj;
    // }


}

