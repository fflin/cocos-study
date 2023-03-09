// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Animation = cc.Animation;
import AnimationClip = cc.AnimationClip;

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start () {
        var animation = this.node.getComponent(Animation)

        let sf = []

        for (let i = 1; i < 19; i++) {

            cc.resources.load('FlyingMoney/'+i, cc.SpriteFrame, (error, spriteFrame) => {
                sf.push(spriteFrame)
                if (sf.length == 18) {
                    console.log('sf == 18 load animation')
                    var clip = AnimationClip.createWithSpriteFrames(sf, 10)
                    clip.name = "anim_run";
                    clip.wrapMode = cc.WrapMode.Loop;
                    clip.speed = 1
                    animation.addClip(clip);
                    animation.play('anim_run');
                }
            })
        }
    }
}
