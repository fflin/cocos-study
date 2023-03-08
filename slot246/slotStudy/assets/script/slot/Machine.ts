// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Aux from '../SlotEnum'

const {ccclass, property} = cc._decorator;
const {log} = cc;

/**
 * 老虎机结构
 * Machine -> n*Reel -> n*Tile
 */
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

    onLoad() {
    }

    start() {

    }

    update(dt) {
    }

    /**
     * 初始化Machine，生成Reels
     */
    createMachine() {
        log("create Machine")
        /**
         * this.node表示当前脚本绑定的node节点
         */
        log("this.node = ", this.node)
        // 先移除上面的Child
        this.node.destroyAllChildren()

        this.reels = []

        let newReel: cc.Node

        for (let i = 0; i < this.numberOfReels; i += 1) {
            newReel = cc.instantiate(this.reelPrefab)
            // 至此已经可以根据配置的Reel数量，显示出对应列数的布局了
            this.node.addChild(newReel)

            this.reels[i] = newReel

            // 获取创建的Reel
            const reelScript = newReel.getComponent("Reel")
            // Reel里，创建Tile
            reelScript.shuffle()
            // reelScript.reelAnchor.getComponent(cc.Layout).enabled = false
        }

        this.node.getComponent(cc.Widget).updateAlignment()


    }

    /**
     * 旋转方法
     */
    spin() {
        this.spinning = true
        this.button.getChildByName('Label').getComponent(cc.Label).string = 'STOP'
        this.disableGlow()

        for (let i = 0; i < this.numberOfReels; i++) {
            const theReel = this.reels[i].getComponent('Reel')

            if (i % 2) {
                theReel.spinDirection = Aux.Direction.Down
            } else {
                theReel.spinDirection = Aux.Direction.Up
            }

            theReel.doSpin(0.03 * i)
        }


    }

    lock() {
        this.button.getComponent(cc.Button).interactable = false
    }

    disableGlow() {
        try {
            for (const line of this.glows.children) {
                for (const glow of line.children) {
                    const skel: sp.Skeleton = glow.getComponent('sp.Skeleton')
                    skel.animation = null
                }
            }
        } catch (e) {
            console.log("disableGlow e = ", e)
        }
    }

    stop(result: IResult = null) {
        /**
         * 固定时间内停止终止状态
         */
        setTimeout(() => {
            this.spinning = false
            this.button.getComponent(cc.Button).interactable = true
            this.button.getChildByName('Label').getComponent(cc.Label).string = "SPIN"
            this.enableGlow(result)
        }, 1500)

        /**
         * 让Reel停下来
         */
        const rngMod = Math.random() / 2
        for (let i = 0; i < this.numberOfReels; i++) {
            const spinDelay = i < 2 + rngMod ? i / 4 : rngMod * (i - 2) + i / 4
            const theReel = this.reels[i].getComponent('Reel')

            setTimeout(() => {
                theReel.readyStop(result.reels[i])
            }, spinDelay * 1000)
        }

    }

    private enableGlow(result: IResult) {
        for (const lineIndex of result.equalLines) {
            try {
                const line: cc.Node = this.glows.children[lineIndex]
                for (const glow of line.children) {
                    const skel: sp.Skeleton = glow.getComponent('sp.Skeleton')
                    skel.animation = "loop"
                }
            } catch (e) {
                console.log('enable glow e = ', e)
            }
        }
    }
}
