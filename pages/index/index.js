//index.js
//获取应用实例
'use strict'
// const common = require('../common/common')
import common from '../common/common'
import category, { defaultItem } from '../common/category'
import { copy } from '../../utils/utils'
const app = common.app
const category_copy = copy(category)
const keys = Object.keys(category_copy)
const categorys = keys.map((item) => {
  const cat = category_copy[item]
  // 默认选择第1个，即“不限”
  cat.selectedIndex = 0
  cat.items.unshift(defaultItem)
  return cat
})

/*
  TODO:
  1. onLoad 为什么不执行？
     答：因为common.js中已经写了onLoad函数，然后使用Object.assign合并page和common时，common的onLoad给page上的onLoad覆盖了
  2. 在app.js中ajax回调中把数据挂到app对象上，为什么在其他文件引用不到？
*/

// console.log("categorys")
// console.log(categorys)

const page = {
  data: {
    modalHidden: true,
    categorys: categorys,
    keyword: ''
    // ,scrollLeft: 0
  }
  ,onLoad(){
    // 由于gifts是异步挂载到app上的，所以需要间隔查询数据是否ready
    setInterval(function(){
      // console.log(app.gifts)
    },1000)
  }
  ,reset(){
    this.setData({
      categorys: categorys.map(category => {
        category.selectedIndex = 0
        return category
      })
      // ,scrollLeft: 1
    })
  }
  //事件处理函数
  ,select(e){
    const target = e.target;
    // const currentTarget = e.currentTarget;
    // console.log(this); // 整个page对象
    // console.log(target); // 大部分情况下 target === currentTarget 。跟web端是一致的。
    // console.log(currentTarget);
    // console.log(e.detail); // 鼠标点击的x,y轴坐标
    const item = target.dataset.item
    const group = target.dataset.group
    // console.log(group)
    outer:
    for(let i = 0, li = categorys.length; i < li; i++){
      let category = categorys[i]
      let items = category.items
      let name = category.name
      if( name === group ){
        for(let j = 0, lj = items.length; j < lj; j++){
          let data = items[j]
          if(data === item){
            category.selectedIndex = j
            break outer;
          }
        }
      }
    }
    // console.log("categorys")
    // console.log(categorys)
    this.setData({
      categorys: categorys
    })
    // console.log(item)
  }

  ,confirm(){
    const keyword = this.data.keyword
    if (!keyword || !keyword.trim()) {
      // return this.showModal('你还没有输入内容哦亲')
    }
    // const queryParameter = { scene:"告白",relation:"基友",price:[0,1000], query:"第一个" }
    const queryParameter = { query: keyword }
    for (const category of categorys) {
       const name = category.name
       const selectedIndex = category.selectedIndex
       if(selectedIndex === 0){
         continue
       }
       if(name === 'price'){
         queryParameter[name] =
                            category
                                .items[selectedIndex]
                                .split(/-|\+/)
                                .filter(price => price !== '')
       }else{
         queryParameter[name] = category.items[selectedIndex]
       }
    }
    console.log(queryParameter);
    wx.navigateTo({
        url:'../gift-result/gift-result?queryParameter=' + JSON.stringify(queryParameter)
    })
  }

  ,bindChange(e) {
    console.log( e.detail.value )
    const value = e.detail.value
    if(value && value.trim()){
      this.setData({
        keyword: value
      })
    }
  }

}


Object.assign(page, common)

Page(page)
