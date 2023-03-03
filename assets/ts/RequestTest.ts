import {_decorator, Component, Node, loader, log} from 'cc';
import {HttpRequest} from "db://assets/ts/HttpRequest";
const {ccclass, property} = _decorator;
@ccclass('RequestTest')
export class RequestTest extends Component{

   start() {
       this.node.on("click", () => {
           log("click----")
           new HttpRequest().doPost("v2/device/register",[])
       })
   }

}