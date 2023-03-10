import {_decorator, Component, Node, loader} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('Login')
export class Login extends Component {
    start() {

    }

    onFaceBookLogin(str, s) {
        console.log("str = ", str)
        console.log("s = ", s)

        /**
         * 根据Label内容宽高，调整Button宽高
         */
        // this.node.getChildByName("Label").getComponent(cc.Label).string = "666"
        // this.node.width = this.node.getChildByName("Label").width
        // this.node.height = this.node.getChildByName("Label").height

        /**
         * post请求
         */
        let h = loader.getXMLHttpRequest()
        console.log("hhhhhhh")
        h.open("post", "http://test-app.mailang2.huofeng.cn/api/v2/device/register")

        /**
         * header部分
         */
        h.setRequestHeader("content-type","application/json;charset=utf-8")
        // h.setRequestHeader("signature","dev")
        h.setRequestHeader("X-Device-Country","CN")

        /**
         * 响应部分
         */
        h.onreadystatechange = () => {
            let status = h.status
            console.log("status", status)
            console.log("response", h.response)
        }

        /**
         * body部分
         */
        let o = {
            app_id:"cime",
            app_state:1,
            sign:"dev",
            device_id:"7c8f5dc2857f4ace"
        }
        let ojson = JSON.stringify(o)
        h.send(ojson)

        /**
         * 这样组合也是可以的
         */
        // h.setRequestHeader("content-type","application/x-www-form-urlencoded")
        // h.send("app_id=cime&app_state=1&app_version=2.0.67(67)&sign=dev&device_id=7c8f5dc2857f4ace")

        /**
         * 第三种请求方式
         */
        // h.open("post", "http://test-app.mailang2.huofeng.cn/api/app/cime/init?app_id=cime&app_state=1&app_version=2.0.67(67)&brand=huawei&channel=qa&device_id=7c8f5dc2857f4ace&locale=en&model=AL00&os=android&os_version=29&t=1677828462714")
        // h.send()
    }
}



