import {_decorator, Component, Node, loader} from 'cc';
import {HttpConstants} from "db://assets/ts/HttpConstants";
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
    doPost(path: String, params: []) {
        let request = loader.getXMLHttpRequest()

        var url = new HttpConstants().HttpUrl +"/api/"+path

        request.open("POST", url)

        /**
         * header部分
         */
        this.addHeader(request)

        /**
         * body部分
         */
        let body = {
            app_id: "cime",
            app_state: 1,
            "app_version": "2.0.67(67)",
            "brand": "huawei",
            "channel": "qa",
            "device_id": "7c8f5dc2857f4ace",
            "locale": "en",
            "model": "YAL-AL00",
            "os": "android",
            "os_version": "29",
            "t": 1677828464639
        }

        let bodyToJson = JSON.stringify(body)

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
        request.send(bodyToJson)
    }

    private addHeader(request: XMLHttpRequest) {
        request.setRequestHeader("content-type","application/json;charset=utf-8")
        request.setRequestHeader("X-Device-Language","zh")
        request.setRequestHeader("X-Device-Country","CN")
        request.setRequestHeader("X-Network-Type","NETWORK_WIFI")
        request.setRequestHeader("X-Device-Timezone","Asia/Shanghai")
        request.setRequestHeader("signature","")
        request.setRequestHeader("APP-ID","cime")
        request.setRequestHeader("token","")
    }








}