// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tile extends cc.Component {

    @property({type: [cc.SpriteFrame], visible: true})
    private textures = []

    get tileCount() {
        return this.textures.length;
    }

    start() {

    }

    async onLoad(): Promise<void> {
        await this.loadTextures()
    }

    async loadTextures(): Promise<boolean> {
        const self = this
        return new Promise<boolean>(resolve => {
            cc.loader.loadResDir("gfx/Square", cc.SpriteFrame, function afterLoad(error, loadedTextures) {
                self.textures = loadedTextures
                resolve(true)
            })
        })
    }

    // update (dt) {}

    setRandom() {
        const randomIndex = Math.floor(Math.random() * this.textures.length)
        // console.log("random index = ", randomIndex)
        this.setTile(randomIndex)
    }

    setTile(index: number) {
        this.node.getComponent(cc.Sprite).spriteFrame = this.textures[index]
    }
}
