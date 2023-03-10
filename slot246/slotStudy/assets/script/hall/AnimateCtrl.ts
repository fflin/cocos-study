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
export default class AnimateCtrl extends cc.Component {

    @property(cc.Sprite)
    animateSprite = null


    onCafeBtnClick() {
        var animation = this.animateSprite.getComponent(Animation)

        let sf = []

        for (let i = 1; i < 19; i++) {

            // cc.assetManager.loadBundle('dealer3Plist', () =>{
            //
            // })
            cc.assetManager.resources.load('atlas/dealer3Plist/dealer3Plist', (error, frame) => {
                this.animateSprite.frame = frame
                console.log('error = ', error)
            })
            // cc.resources.load('FlyingMoney/'+i, cc.SpriteFrame, (error, spriteFrame) => {
            //     sf.push(spriteFrame)
            //     if (sf.length == 18) {
            //         console.log('sf == 18 load animation')
            //         var clip = AnimationClip.createWithSpriteFrames(sf, 10)
            //         clip.name = "anim_run";
            //         clip.wrapMode = cc.WrapMode.Loop;
            //         clip.speed = 1
            //         animation.addClip(clip);
            //         animation.play('anim_run');
            //     }
            // })
        }
    }
}
