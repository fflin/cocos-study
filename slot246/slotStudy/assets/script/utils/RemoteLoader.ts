/**
 * 远程加载器
 * @author 陈皮皮 (ifaswind)
 * @version 20210930
 * @see RemoteLoader.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/core/remote/RemoteLoader.ts
 */
export default class RemoteLoader {

    /**
     * 加载纹理
     * @param url 资源地址
     * @param callback 加载回调
     */
    public static loadTexture(url: string, callback?: (error: Error, texture: cc.Texture2D) => void) {
        return new Promise<cc.Texture2D>(res => {
            cc.assetManager.loadRemote(url, cc.Texture2D, (error: Error, texture: cc.Texture2D) => {
                if (error || !(texture instanceof cc.Texture2D)) {
                    callback && callback(error, null);
                    res(null);
                    console.log("loadTexture error = ！！！！", error, texture)
                } else {
                    console.log("loadTexture error = ", error)
                    callback && callback(null, texture);
                    res(texture);
                }
            });
        });
    }

}
