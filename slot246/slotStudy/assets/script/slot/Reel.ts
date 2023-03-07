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

    /**
     * 一列中有多少个Tile
     */
    @property({type: [cc.Node], visible: false})
    private tiles = []

    @property({type: cc.Prefab})
    public _tilePrefab = null

    public stopSpinning = false

    private result: Array<number> = []

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

    start() {

    }

    update(dt) {
    }

    async shuffle() {
        this.tiles = []
        await this.createReel()

        for (let i = 0; i < this.tiles.length; i += 1) {
            this.tiles[i].getComponent('Tile').setRandom()
        }
        this.reelAnchor.getComponent(cc.Layout).enabled = false

    }

    createReel() {
        let newTile: cc.Node

        for (let i = 0; i < 5; i += 1) {
            newTile = cc.instantiate(this.tilePrefab)
            this.reelAnchor.addChild(newTile)
            this.tiles[i] = newTile
        }
    }

    doSpin(windUp: number) {
        this.stopSpinning = false

        this.reelAnchor.children.forEach(element => {
            const dirModifier = this.spinDirection == Aux.Direction.Down ? -1 : 1

            const delay = cc.tween(element).delay(windUp)
            const start = cc.tween(element).by(1, {position: cc.v2(0, 144 * dirModifier)}, {easing: 'backIn'})
            const doChange = cc.tween().call(() => this.changeCallBack(element))
            const callSpinning = cc.tween(element).call(() => this.doSpinning(element, 5))

            delay.then(start).then(doChange).then(callSpinning).start()
        })
    }

    changeCallBack(element) {
        const el = element
        const dirModifier = this.spinDirection == Aux.Direction.Down ? -1 : 1
        if (el.position.y * dirModifier > 288) {
            el.position = cc.v2(0, -288 * dirModifier)

            let pop = null
            if (this.result != null && this.result.length > 0) {
                /**
                 * 从数组中删除最后一个元素并返回它
                 */
                pop = this.result.pop()
            }

            if (pop != null && pop >= 0) {
                el.getComponent("Tile").setTile(pop)
            } else {
                el.getComponent("Tile").setRandom()
            }

        }

    }

    doSpinning(element, time = 1) {
        const dirModifier = this.spinDirection === Aux.Direction.Down ? -1 : 1

        const move = cc.tween().by(0.05, {position: cc.v2(0, 144 * dirModifier)})
        const doChange = cc.tween().call(() => this.changeCallBack(element))
        const repeat = cc.tween(element).repeat(time, move.then(doChange))
        const checkEnd = cc.tween().call(() => this.checkEndCallBack(element))

        repeat.then(checkEnd).start()

    }

    checkEndCallBack(element: cc.Node = null) {
        const el = element
        if (this.stopSpinning) {
            this.getComponent(cc.AudioSource).play()
            this.doStop(el)
        } else {
            this.doSpinning(el)
        }
    }

    doStop(element: cc.Node) {
        const dirModifier = this.spinDirection === Aux.Direction.Down ? -1 : 1

        const move = cc.tween(element).by(0.05, {position: cc.v2(0, 144 * dirModifier)})
        const doChange = cc.tween().call(() => this.changeCallBack(element))
        const end = cc.tween().by(0.2, {position: cc.v2(0, 144 * dirModifier)}, {easing: 'bounceOut'})

        move.then(doChange).then(move).then(doChange).then(end).then(doChange).start()


    }


}
