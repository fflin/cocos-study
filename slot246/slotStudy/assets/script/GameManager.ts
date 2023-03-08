// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {SlotRoller} from "./slot/SlotRoller";

const {ccclass, property} = cc._decorator;

/**
 * 这是整个程序的入口
 */
@ccclass
export default class NewClass extends cc.Component {

    @property({type: cc.Node})
    machine: cc.Node = null

    /**
     * 音乐组件
     */
    @property({type: cc.AudioClip})
    audioClip: cc.AudioClip = null

    private block = false

    private result: IResult = null

    /**
     * 逻辑代码
     */
    start() {
        this.machine.getComponent('Machine').createMachine()
    }

    /**
     * 不断的检查，是否可停止
     * @param dt
     */
    update(dt) {
        if (this.block && this.result != null) {
            this.informStop()
            this.result = null
        }
    }

    informStop() {
        this.machine.getComponent('Machine').stop(this.result)
    }


    /**
     * 按钮点击转动老虎机
     */
    onButtonClick() {
        cc.audioEngine.playEffect(this.audioClip, false)
        let machineComp = this.machine.getComponent('Machine')
        if (machineComp.spinning == false) {
            this.block = false
            machineComp.spin()
            this.requestResult()
        } else if (!this.block) {
            this.block = true
            machineComp.lock()
        }
    }

    async requestResult(): Promise<void> {
        this.result = null
        this.result = await this.getAnswer()
    }

    getAnswer(): Promise<IResult> {
        return new Promise<IResult>(resolve => {
            setTimeout(() => {
                const result = SlotRoller.roll(this.tileCount, this.realCount)
                resolve(result)
            }, 1000 + 500 * Math.random())
        })
    }

    private _tileCount: number = 0
    get tileCount(): number {
        if (this._tileCount <= 0) {
            try {
                let tt = this.machine.getChildByName('Reel').getChildByName('In')
                    .getChildByName('Tile')
                console.log("tt", tt)
                this._tileCount = tt.getComponent('Tile').tileCount
                console.log("this._tileCount = try", this._tileCount)
            } catch (e) {
                this._tileCount = 0
                console.log("this._tileCount = catch", this._tileCount)
            }
        }
        console.log("this._tileCount = ", this._tileCount)
        return this._tileCount
    }


    private _reelCount = 0
    get realCount() : number{
        if (this._reelCount <= 0) {
            try {
                this._reelCount = this.machine.getComponent('Machine').numberOfReels
            } catch (e) {
                this._reelCount = 0
            }
        }
        return this._reelCount
    }



}
