// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Prefab = cc.Prefab;
import ScrollView = cc.ScrollView;

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    itemGame: Prefab = null

    start () {
        const content = this.node.getComponent(ScrollView).content;
        for (let i = 0; i < 10; i++) {
            const item = cc.instantiate(this.itemGame)
            content.addChild(item)
        }

    }
}
