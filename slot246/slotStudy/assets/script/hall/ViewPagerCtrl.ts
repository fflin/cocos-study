import PageView = cc.PageView;

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.PageView)
    pageView: PageView = null

    private showViewPager() {
        console.log('pageView', this.pageView)
        console.log('pageView.node', this.pageView.node)

        /**
         * 控制显示ViewPager
         */
        this.pageView.node.active = true
    }

    onBackClick() {
        this.pageView.node.active = false
    }
}
