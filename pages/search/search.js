import common from '../common/common'
const app = common.app

// const historys = ['电动牙刷','中秋礼物','电脑','呵呵呵','给老婆的礼物']
const historys = ['电动牙刷','中秋礼物','电脑','呵呵呵','给老婆的礼物']
const hots = ['电动牙刷','中秋礼物','数码相机','收纳整理']

import articles from '../common/articles'


const page = {

  onLoad(options) {
    this.setData({
      historys: historys,
      hots:hots,
      articles: articles
    })
  }
  ,clearAll(){
    console.log('点击了清空');
  }
  ,changeAll(){
    console.log('点击了换一批');
  }

  ,historyItemTap(e){
     const target = e.target;
     const item = target.dataset.item;

     console.log(item);
  }
  ,hotItemTap(e){
     const target = e.target;
     const item = target.dataset.item;

     console.log(item);
  }
  ,showActionSheet(items = []) {
    this.setData({
      actionSheetHidden: false,
      actionSheetItems: items
    })
  }
  ,hideActiveSheet() {
    this.setData({
      actionSheetHidden: true
    })
  }

  ,bindItemTap(e) {
    console.log('bindItemTap')
    const value = e.target.dataset.item
    console.log(value)
    this.hideActiveSheet()
  }

  ,actionSheetChange() {
    this.hideActiveSheet()
  }

  ,search() {
    const keyword = this.data.keyword
    console.log(keyword);
    if (!keyword || !keyword.trim()) {
      return this.showModal('你还没有输入内容哦亲')
    }
    wx.navigateTo({
      url: '../result/result?keyword=' + keyword
    })
  }
}

Object.assign(page, common)
Page(page)
