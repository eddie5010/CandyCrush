import Level from "./Level";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property(cc.Sprite)
    background: cc.Sprite = null;
    @property(cc.Node)
    m_levelNode: cc.Node = null;
    @property(cc.Button)
    m_shuffleButton: cc.Button = null;
    @property(cc.Button)
    m_backButton: cc.Button = null;

    onLoad() {

    }

    start () {
        this.bindHandler();
        this.playBGM();
    }

    onDestroy() {
        this.stopBGM();
    }

    update() {
    }

    public updateLevelJSONData(jsonRes: string)
    {
        if (jsonRes == "") { return; }
        if (this.m_levelNode)
        {
            let levelScript: Level = this.m_levelNode.getComponent("Level");
            levelScript.loadTileJsonData(jsonRes);
        }
    }

    private bindHandler() {
        let handler = new cc.Component.EventHandler();
        handler.target = this.node;
        handler.component = "GameScene"
        handler.handler = "shuffleButtonCallBack";
        handler.customEventData = "ShuffleButton";
        this.m_shuffleButton.clickEvents.push(handler);
        let handlerBack = new cc.Component.EventHandler();
        handlerBack.target = this.node;
        handlerBack.component = "GameScene"
        handlerBack.handler = "backButtonCallBack";
        handlerBack.customEventData = "BackButton";
        this.m_backButton.clickEvents.push(handlerBack);
    }
    private shuffleButtonCallBack(event, customEventData) {
        if (this.m_levelNode) {
            let levelScript: Level = this.m_levelNode.getComponent("Level");
            levelScript.shuffle();
        }
    }
    private backButtonCallBack(event, customEventData) {
        cc.director.loadScene("Main", function()
        {
            
        });
    }

    private playBGM()
    {
        // cc.loader.loadRes("music/MiningByMoonlight", cc.AudioClip, function (err, clip) {
        //     var audioID = cc.audioEngine.playMusic(clip, true);
        // });
    }
    private stopBGM()
    {
        cc.audioEngine.stopMusic();
    }

}
