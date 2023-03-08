// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import log = cc.log;

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    content = null // 内容区域

    @property(cc.Prefab)
    gameItem = null // 内容

    @property(cc.ScrollView)
    scrollGameList = null // 滚动节点

    // 防抖
    isEnd: Boolean
    // page 页 limit 数量
    page: number
    limit: number

    onLoad() {
        this.page = 1
        this.limit = 10

        this.isEnd = true
        this.getGameList()
    }

    getGameList() {

        for (let i = 0; i < 20; i++) {
            this.gameRankingList()
        }

        this.scrollGameList.node.on('scroll-to-right', this.callback, this);
    }

    i = 0
    // 每条数据的渲染
    gameRankingList() {
        // 获取块的实例
        let node = cc.instantiate(this.gameItem);

        log("list --- ", this.i++)
        this.content.addChild(node)


        // // 排名
        // let sortNumber = node.getChildByName("labelNumber").getComponent(Label)
        // sortNumber.string = i
        // // set nickName
        // let nickName = node.getChildByName('nickName').getComponent(Label);
        // nickName.string = user.nickname;
        //
        // // 头像
        // assetManager.loadRemote(user.avatar, {ext: '.png'}, function (err, texture: ImageAsset) {
        //     let avatarUrl = node.getChildByName("mask").children[0].getComponent(Sprite)
        //     avatarUrl.spriteFrame = SpriteFrame.createWithImage(texture)
        // });
    }

    callback() {
        if (this.isEnd) {
            this.page++
            this.getGameList()
        }
    }

    start() {

    }

    // update (dt) {}
}
