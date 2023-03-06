import {_decorator, Component, Node, loader, log} from 'cc';
import {HttpRequest} from "db://assets/ts/HttpRequest";
import {HttpConstants} from "db://assets/ts/HttpConstants";
import {MD5} from "db://assets/ts/MD5";
const {ccclass, property} = _decorator;
@ccclass('RequestTest')
export class RequestTest extends Component{

   start() {
       this.node.on("click", () => {
           log("click----")
           // new HttpRequest().doPost("app/cime/init",{"aaa":1,"bbb":2,"app_id":"baty"})
           new HttpRequest().doGet("app/cime/init",{"aaa":1,"bbb":2,"app_id":"baty"})
           // this.testSign()
       })
   }

   testSign() {
       let str = {
           "c":{"b":"11","a":"10"},
           "a":"100",
           "b":[{"c":"3","b":"2","a":"1"},{"c":"6","b":"5","a":"4"}],
           "d":[1,2,3]
       }
       // 1 获取签名
       let sign = new HttpRequest().getSign(str)
       console.log("testSign sign = ", sign)
       // 2 拼接AES加密
       sign += "&"+new HttpConstants().AESKey
       console.log("testSign sign finally = ", sign)
       // 3 MD5加密
       let md5Res = new MD5().md5(sign, 32)
       console.log("testSign md5Res = ", md5Res)
   }

}