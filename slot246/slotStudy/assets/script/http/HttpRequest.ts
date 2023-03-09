import {HttpConstants} from "./HttpConstants";
import loader = cc.loader;
import {MD5} from "../utils/MD5";
/**
 * Http请求的封装
 */
export class HttpRequest {
    /**
     * 一个完整的请求
     * URL: https://qa.icake.live:8080/api/v2/device/register
     * Method: @POST
     * Headers:
     * ┌ content-type: application/json;charset=utf-8
     * ├ token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMjA5MTEzLCJkZXZpY2VJZCI6IjdjOGY1ZGMyODU3ZjRhY2U
     * ├ X-Device-Language: zh
     * ├ X-Device-Country: CN
     * ├ X-Network-Type: NETWORK_WIFI
     * ├ X-Device-Timezone: Asia/Shanghai
     * ├ signature: 789c93e4c9861d989500d257d60c551c
     * ├ APP-ID: cime
     * └
     *
     *
     * Body:
     * {
     *     "app_id": "cime",
     *     "app_state": 1,
     *     "app_version": "2.0.67(67)",
     *     "brand": "huawei",
     *     "channel": "qa",
     *     "device_id": "7c8f5dc2857f4ace",
     *     "locale": "en",
     *     "model": "YAL-AL00",
     *     "os": "android",
     *     "os_version": "29",
     *     "t": 1677828464639
     * }
     *
     */
    /**
     * post请求封装
     * @param path  url请求path
     * @param params 非公共参数，用于拼接到公共参数后面，计算签名使用
     */
    doPost(path: String, params: {}) {
        let request = loader.getXMLHttpRequest()

        var url = new HttpConstants().HttpUrl +"/api/"+path

        request.open("POST", url)

        /**
         * body部分
         */
        let body = {
            app_id: "zahrah",
            app_state: 1,
            "app_version": "2.0.67(67)",
            "brand": "huawei",
            "channel": "qa",
            "device_id": "7c8f5dc2857f4ace",
            "locale": "en",
            "model": "YAL-AL00",
            "os": "android",
            "os_version": "29",
            "t": new Date().getTime()   // 到毫秒
            // "t": Date.parse(new Date()) // 到秒
        }

        /**
         * 合并两个json数据，新属性覆盖旧属性
         */
        let mergedBody = Object.assign(body, params)

        let bodyToJson = JSON.stringify(mergedBody)

        console.log("bodyToJson", bodyToJson)


        /**
         * header部分
         */
        this.addHeader(request, mergedBody)


        /**
         * 发送请求
         */
        request.send(bodyToJson)

        /**
         * 这个方法会回调3次，第1次response是空
         */
        // request.onreadystatechange = () => {
        //     let status = request.status
        //     let resp = request.response.toString()
        //     console.log("HttpRequest post status = ", status, new Date().getTime())
        //     // res(status.toString())
        // }

        request.onloadstart = (e) => {
            console.log('HttpRequest  onLoadStart', new Date().getTime())
        }

        request.onload = (e) =>{
            console.log('HttpRequest  onLoad', new Date().getTime())
        }

        return new Promise<string>(res => {
            request.onloadend = (e) => {
                console.log('HttpRequest  onLoad end', new Date().getTime())
                res(request.response.toString())
            }
        })


    }

    doGet(path: String, params: {}) {

        let request = loader.getXMLHttpRequest()

        var url = new HttpConstants().HttpUrl +"/api/"+path

        request.open("GET", url+"?app_id=cime&app_state=1&app_version=2.0.67(67)&brand=huawei&channel=qa&device_id=7c8f5dc2857f4ace&locale=en&model=AL00&os=android&os_version=29&t=1677828462714")

        /**
         * header部分
         */
        this.addHeader(request)

        // this.getSign(bodyToJson)
        /**
         * 响应
         */
        request.onreadystatechange = () => {
            let status = request.status
            console.log("HttpRequest post status = ", status)
        }

        /**
         * 发送请求
         */
        request.send()
    }

    testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDEwMDM1LCJkZXZpY2VJZCI6IjdjOGY1ZGMyODU3ZjRhY2UiLCJ0IjoxNjY4NDk3NDA3NTY3LCJpYXQiOjE2Njg0OTc0MDd9.-1p8XK3XxyiZZsti1JGP1aFDdjQlVrHRN_fInb8Hdoo"
    private addHeader(request: XMLHttpRequest, jsonData: any = "") {
        let sign = this.getSign(jsonData)
        let md5Sign = this.signMD5(sign)
        request.setRequestHeader("content-type","application/json;charset=utf-8")
        request.setRequestHeader("X-Device-Language","zh")
        request.setRequestHeader("X-Device-Country","CN")
        request.setRequestHeader("X-Network-Type","NETWORK_WIFI")
        request.setRequestHeader("X-Device-Timezone","Asia/Shanghai")
        request.setRequestHeader("signature",md5Sign)
        request.setRequestHeader("APP-ID","zahrah")
        request.setRequestHeader("token",this.testToken)
    }

    signMD5(signStr: string): string {
        // 2 拼接AES加密
        signStr += "&"+new HttpConstants().AESKey
        console.log("signMD5 sign finally = ", signStr)
        // 3 MD5加密
        let md5Res = new MD5().md5(signStr, 32)
        console.log("signMD5 md5Res = ", md5Res)
        return md5Res
    }

    /**
     * 参数加密，方法见文档
     * @param data json对象，非字符串
     */
    getSign(data):string {
        let signStr = ''
        // console.log("entries", 'getSign data = '+ data)

        let entries = Object.entries(data).sort()

        // console.log("entries length = ", entries.length)
        if (entries.length < 1) {
            return signStr
        }

        entries = entries.filter(([k, v], index) => {
            if (k == null || v == null || v === '' || k === 'sign') {
                return false
            }
            return true
        })


        entries.forEach(([k, v], index) => {
            // console.log("entries k ",k , v)
            let pre = index !== 0 ? '&' : ''
            if (v instanceof Object) {
                signStr += pre + this.getSign(v)
            } else {
                signStr += pre + k + '=' + v
            }
        })
        // console.log("signStr = ", signStr)
        // a=100&a=1&b=2&c=3&a=4&b=5&c=6&a=10&b=11&0=1&1=2&2=3
        // a=100&a=1&b=2&c=3&a=4&b=5&c=6&a=10&b=11&0=1&1=2&2=3
        return signStr
    }





}