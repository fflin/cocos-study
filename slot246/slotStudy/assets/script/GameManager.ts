// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 这是整个程序的入口
 */
@ccclass
export default class NewClass extends cc.Component {

    @property({type: cc.Node})
    matchine: cc.Node = null

    @property({type: cc.AudioClip})
    audioClip: cc.AudioClip = null

    start () {

    }

    update (dt) {}


    onButtonClick() {

    }
}
