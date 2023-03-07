// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Machine extends cc.Component {

    @property(cc.Node)
    public button: cc.Node = null

    @property(cc.Node)
    public glows = null

    @property(cc.Prefab)
    public _reelPrefab = null

    @property(cc.Prefab)
    get reelPrefab(): any {
        return this._reelPrefab;
    }

    set reelPrefab(value: any) {
        this._reelPrefab = value;
        this.node.removeAllChildren()
    }

    @property({type: cc.Integer})
    private _numberOfReels = 5

    @property({type: cc.Integer, range: [1, 6], slide: true})
    get numberOfReels(): number {
        return this._numberOfReels;
    }

    set numberOfReels(value: number) {
        this._numberOfReels = value;
    }

    private reels = []

    public spinning = false


    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {

    }

    update (dt) {}
}
