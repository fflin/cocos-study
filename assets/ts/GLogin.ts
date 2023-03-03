import {_decorator, Component, Node, log} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('GLogin')
export class GLogin extends Component {
    start() {
        this.node.on("click", (button) => {
            console.log("click ----- ")

            /**
             * fetch方法get请求
             */
            fetch("http://test-app.mailang2.huofeng.cn/api/app/cime/init?app_id=cime&app_state=1&app_version=2.0.67(67)&brand=huawei&channel=qa&device_id=7c8f5dc2857f4ace&locale=en&model=AL00&os=android&os_version=29&t=1677828462714").then((response: Response) => {
                // log("http response = ", response.json())
                // log("http response text = ", response.text())
                log("http response = ", response.url)
                log("http response = ", response.status)
                return response
            }).then((value) => {
                log("http value = ", value)
                /**
                 * response.json()已经将json数据转为了对象
                 */
                 // let abbbb:InitModel = value.json() as unknown as InitModel;

                value.json().then((v) => {

                    let abbbb:InitModel = v

                    log("abbbb", abbbb.err_code, abbbb.err_msg, abbbb.data.proto)

                    log("json then", v.err_code, v.err_msg)

                    log("json proto", v.data.proto)

                })

            })


        })



        this.node.on(Node.EventType.TOUCH_START, (event) => {
            log("event touch start")
        })
    }

    update(deltaTime: number) {

    }
}


