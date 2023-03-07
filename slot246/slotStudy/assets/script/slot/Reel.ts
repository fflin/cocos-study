// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Aux from '../SlotEnum'
const {ccclass, property} = cc._decorator;

@ccclass
export default class Reel extends cc.Component {

    @property({type: cc.Node})
    public reelAnchor = null

    @property({type: cc.Enum(Aux.Direction)})
    public spinDirection = Aux.Direction.Up

    @property({type: [cc.Node], visible: false})
    private tiles = []

    @property({type: cc.Prefab})
    public _tilePrefab = null

    @property({type: cc.Prefab})
    get tilePrefab(): cc.Prefab {
        return this._tilePrefab;
    }

    /**
     * 在cocos上拖动组件，会执行到set方法
     * @param value
     */
    set tilePrefab(value: cc.Prefab) {
        this._tilePrefab = value;
        this.reelAnchor.removeAllChildren()
        this.tiles = []
    }

    start () {

    }

    // update (dt) {}
}
