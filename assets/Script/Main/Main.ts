import GameScene from "../Game/GameScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(cc.Button)
    m_logoutButton: cc.Button = null;
    @property(cc.Node)
    m_levelButtonsNode: cc.Node = null;
    @property(cc.Node)
    m_levelButtonInstance: cc.Node = null;

    private m_levelButtonsArray: Array<cc.Node> = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.m_levelButtonInstance.active = false;
        this.bindHanlder();
        this.loadLevels();
    }

    // update (dt) {}

    private bindHanlder()
    {
        let handler = new cc.Component.EventHandler();
        handler.target = this.node;
        handler.component = "Main"
        handler.handler = "logoutButtonCallBack";
        handler.customEventData = "LogoutButton";
        this.m_logoutButton.clickEvents.push(handler);
    }
    private logoutButtonCallBack(event, customEventData)
    {
        cc.director.loadScene("Login", function(){
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

    }

    private loadLevels()
    {
        let maxLength = 15;
        let layoutHeight = 50;
        for (let index = 0; index < maxLength; index++) {
            let node = cc.instantiate(this.m_levelButtonInstance);
            if (node)
            {
                node.getChildByName("Label").getComponent(cc.Label).string = String(index + 1);
                node.active = true;
                this.m_levelButtonsArray.push(node);
                this.m_levelButtonsNode.addChild(node);
                layoutHeight += (this.m_levelButtonsNode.getComponent(cc.Layout).spacingY + node.height);
                this.m_levelButtonsNode.height = layoutHeight;

                //
                let handler = new cc.Component.EventHandler();
                handler.target = this.node;
                handler.component = "Main"
                handler.handler = "levelButtonCallBack";
                handler.customEventData = "Levels/Level_" + index;
                node.getComponent(cc.Button).clickEvents.push(handler);
            }
        }
    }
    private levelButtonCallBack(event, customEventData)
    {
        cc.log(customEventData);
        cc.director.loadScene("GameScene", function (error, prefab)
        {
            let gameSceneNode = cc.find("GameScene/GameSceneNode", cc.director.getScene());
            let gameSceneScript: GameScene = gameSceneNode.getComponent("GameScene");
            gameSceneScript.updateLevelJSONData(customEventData);
        }.bind(this));
    }

}
