//index.js
//获取应用实例
import common from '../common/common'
import category,{defaultItem} from '../common/category'

const app = common.app
const category_copy = JSON.parse(JSON.stringify(category))
const keys = Object.keys(category_copy)

// console.log(category_copy)

const categorys = keys.map((item) => {
  const cat = category_copy[item]
  /**
   * 非常奇怪的事情，在result.js
   */
  // 过滤掉items中的‘不限’字段，在结果页永不着
  cat.items = cat.items.filter(each => each !== defaultItem)
  // console.log(cat.items);
  return cat
})

// console.log(categorys)

const page = {

  data: {
    // 控制模态提示框的显示隐藏
    modalHidden: true,
    // 控制顶部调出来的actionSheet显示隐藏
    actionSheetHidden: true,
    // 控制orderBy调出来的actionSheet显示隐藏
    orderByActionSheetHidden: true,
    // orderBy排序字段
    orderByActionSheetItems:['综合排序','最新商品','价格从高到低','价格从低到高'],
    categorys: categorys,
    keyword: ''
  }

  ,onLoad(options) {
    // console.log(app.keyword)
    const keyword = options.keyword
    // console.log(keyword);
    if (keyword && keyword.trim()) {
      this.setData({
        keyword: keyword
      })
    }
  }
  // 查看全部 start
  ,viewAll(){
    wx.navigateTo({
      url:'../all/all'
    })
  }
  // 查看全部 end

  // 排序相关 start
  ,orderBy(){
    this.orderByShowActionSheet()
  }

  ,orderByShowActionSheet(){
    this.setData({
      orderByActionSheetHidden: false,
    })
  }

  ,orderByHideActiveSheet(){
    this.setData({
      orderByActionSheetHidden: true,
    })
  }

  ,orderByBindItemTap(e){
    console.log('orderByBindItemTap')
    const value = e.target.dataset.item
    console.log(value)
    this.orderByHideActiveSheet()
  }

  ,orderByActionSheetChange() {
    this.orderByHideActiveSheet()
  }
  // 排序相关 end

  // 顶部tap操作 start
  ,switchSelectCond(e) {
    console.log('switchSelectCond exec...');
    const item = e.target.dataset.item
    const data = category[item]
    // console.log(item);
    // console.log(data);
    // console.log(category);
    // console.log(categorys);
    // console.log(keys);
    const index = keys.indexOf(item)
    if (data) {
      this.showActionSheet(data.items)
      this.setData({
        currentIndex:index
      })
    }
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

  // 顶部tap操作 end
  ,bindChange(e) {
    console.log( e.detail.value )
    const value = e.detail.value
    if(value && value.trim()){
      this.setData({
        keyword: value
      })
    }
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

// page.openModal = common.openModal
// page.closeModal = common.closeModal
// page.bindChange = common.bindChange
// page.search = common.search

Object.assign(page, common)
Page(page)
  // console.log(app.APP_NAME);
  // console.log('当前有调小程序版本是：%s',app.version);
