// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Prefab = cc.Prefab;
import ScrollView = cc.ScrollView;
import Label = cc.Label;
import Sprite = cc.Sprite;
import {HttpRequest} from "../http/HttpRequest";
import {HttpBaseModel} from "../model/HttpBaseModel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    itemGame: Prefab = null

    imageUrl = "https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500.webp"


    setViewData(json) {

        let model: HttpBaseModel = JSON.parse(json)

        console.log("setViewData", model.err_code)

        const content = this.node.getComponent(ScrollView).content;

        if (model.err_code == 0) {
            content.removeAllChildren()
            let results = model.data.results;
            console.log("results", results)


            for (const result of results) {
                console.log('result = ', result)
                // console.log('result = ', result)
                let user: UserModel = result
                const item = cc.instantiate(this.itemGame)
                item.children.forEach(ele => {
                    const label = ele.getComponent(Label)
                    if (label != null) {
                        label.string = user.nickname
                    }

                    let sprite = ele.getComponent(Sprite)
                    if (sprite != null) {
                        cc.assetManager.loadRemote(user.headurl, cc.Texture2D, (err, texture: cc.Texture2D) => {
                            // Use texture to create sprite frame
                            sprite.spriteFrame = new cc.SpriteFrame(texture);
                        });
                    }
                })
                content.addChild(item)
            }
        }
    }

    start() {

        let req = new HttpRequest()
        if (req != null) {
            console.log('req is not null -------------')
            // req.doPost("v2/user/recommendList", {"page_no": "1", "page_size": "20", "area_code": "0"})
            req.doPost("v2/user/recommendList", {"page_no": "1", "page_size": "20", "area_code": "0"}).then(r => {
                console.log("recommend list ", r, new Date().getTime())
                this.setViewData(r)
            })
        } else {
            console.log('req is null -------------')
        }

        const content = this.node.getComponent(ScrollView).content;
        for (let i = 0; i < 10; i++) {
            const item = cc.instantiate(this.itemGame)
            // log('item', item)
            item.children.forEach(ele => {
                const label = ele.getComponent(Label)
                if (label != null) {
                    label.string = "item:" + i
                }


                /**
                 * 获取脚本
                 */
                // const t = ele.getComponent('RemoteTexture')
                // if (t != null) {
                //     t.url = this.imageUrl
                // }


                /**
                 * 获取组件
                 */
                let sprite = ele.getComponent(Sprite)
                if (sprite != null) {

                    /**
                     * 加载远程图片
                     */
                    cc.assetManager.loadRemote(this.imageUrl, cc.Texture2D, (err, texture: cc.Texture2D) => {
                        // Use texture to create sprite frame
                        sprite.spriteFrame = new cc.SpriteFrame(texture);
                    });

                    /**
                     * 加载本地图片
                     */
                    // cc.resources.load(this.imageUrl, cc.Texture2D, (error: Error, texture: cc.Texture2D) => {
                    //     sprite.spriteFrame = new cc.SpriteFrame(texture);
                    // })
                }

            })


            content.addChild(item)
        }
    }
}
