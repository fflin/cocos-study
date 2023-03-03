import { _decorator, Component, Node, native } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('hello')
export class hello extends Component {
    /**
     *
     */
    isDone : boolean = false;
    line:number = 23;

    start() {
        this.isDone = true;
        this.line = 25
        this.isDone = false

        console.log("isDone"+this.isDone+this.line)


        // native.bridge.onNative("")


        let list : number[] = [1,2,3]
        let list1 : Array<number> = [1,2,3]
        let list2 = []


    }


    update(deltaTime: number) {

    }


}


