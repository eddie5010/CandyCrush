import { CookieType } from "../Data/ExtraCookieTypeManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    m_playButton: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.bindHanlder();

    }

    // update (dt) {}

    private bindHanlder()
    {
        let handler = new cc.Component.EventHandler();
        handler.target = this.node;
        handler.component = "Login"
        handler.handler = "playButtonCallBack";
        handler.customEventData = "PlayButton";
        this.m_playButton.clickEvents.push(handler);
    }

    private playButtonCallBack(event, customEventData)
    {
        cc.director.loadScene("Main", function()
        {
            
            cc.loader.loadResDir("texture/Sprites/", cc.SpriteFrame, function(err, prefab) 
            {
    
                
            }.bind(this));

        }.bind(this));

    }

}
