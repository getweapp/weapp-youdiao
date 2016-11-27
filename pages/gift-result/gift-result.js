//index.js
//获取应用实例
import common from '../common/common'
import { handleTitle } from '../../utils/utils'
import result from '../common/search_result'
import category, { defaultItem } from '../common/category'
const app = common.app
const keys = Object.keys(category)
const categorys = Object.keys(category).map(item => category[item])

// console.log(keys);
// console.log(category);
console.log(categorys);

const page = {

  data: {
    // 控制模态提示框的显示隐藏
    modalHidden: true,
    // 控制loading的显示隐藏
    loadingHidden: false,
    // 控制顶部调出来的actionSheet显示隐藏
    actionSheetHidden: true,
    // 控制orderBy调出来的actionSheet显示隐藏
    orderByActionSheetHidden: true,
    // orderBy排序字段
    orderByActionSheetItems:['综合排序','最新商品','价格从高到低','价格从低到高'],
    // categorys: categorys,
    keyword: ''
  }

  ,bindItemTap(e) {

    const target = e.target
    const item = target.dataset.item
    const group = target.dataset.group
    console.log('bindItemTap')
    console.log(item)

    // rendered_title = clearBRandQuot(rendered_title.replace(/<<<<(.*?)>>>>/gi, "<span class='target-word'>$1</span>"));
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

    this.setData({
      categorys: categorys,
      category: category,
      currentIndex: -1
    })

    this.hideActiveSheet()
  }

  ,renderByQuery(query){

  }

  ,onLoad(options) {

    console.log('onload')
    // query处理
    let queryParameterString = options.queryParameter
    console.log(queryParameterString)
    queryParameterString = '{"query": "雨伞", "relation": "妈妈", "scene": "新年", "category": "生活日用", "price": [500, 800]}'

    if(queryParameterString) {

      const queryParameter = JSON.parse(queryParameterString)
      queryParameter.m = 'wechat'
      const keyword = queryParameter.query
      console.log(queryParameter);
      if (queryParameter && keyword) {
        this.setData({
          keyword: keyword
          ,categorys: categorys
        })
      }


      setTimeout(() => {
        console.log(result);
        const IMG_URL_PREFIX = 'http://a.diaox2.com/cms/sites/default/files'
        const meta_infos = result.meta_infos
        // raiders 攻略
        let raiders = []
        // goods 单品
        let goods = []
        const aids = result.aids
        for(let aid of aids){
          let meta_info = meta_infos[aid]
          const ctype = meta_info.ctype
          const cover_image_url = meta_info.cover_image_url
          if( !/http:\/\/|https:\/\//i.test(cover_image_url) ){
            meta_info.cover_image_url = IMG_URL_PREFIX + cover_image_url
          }
          meta_info.aid = aid
          console.log(meta_info.title);
          meta_info.title = handleTitle(meta_info.title)
          console.log(meta_info.title);
          if(ctype !== 2){
            raiders.push(meta_info)
          }else if(ctype === 2){
            goods.push(meta_info)
          }
        }
        // 攻略最多只有2篇
        if( raiders.length > 2){
          raiders = raiders.slice(0, 2)
        }

        /**
         * 1. ctype不准  不是不准，是文章的ctype应该是2
         * 2. remove_aids数据不全
         * 3. 单品无price过滤掉
         *    price: 'N/A'
         */

        // 单品至少有2篇
        // 不足2篇，remove_aids来补
        if( goods.length < 2){
          const aids = result.remove_aids
          // console.log(aids);
          for(let aid of aids){
            let meta_info = meta_infos[aid]
            if(!meta_info) continue
            if(meta_info.ctype === 2){
              console.log('done');
              goods.push(meta_info)
            }else{
              console.log('done else');
            }
          }
        }

        console.log(raiders);
        console.log(goods);

        this.setData({
          loadingHidden: true,
          raiders: raiders,
          goods: goods
        })

      }, 200)
      // wx.request({
      //   url: 'http://s.diaox2.com/ddsearch_dev/q',
      //   header: {'Content-Type': 'application/json'},
      //   data: queryParameter,
      //   success(res) {}
      // })
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
    const item = e.target.dataset.item
    const cat = category[item]
    const index = keys.indexOf(item)
    if (item) {
      this.showActionSheet(cat)
      this.setData({
        currentIndex:index
      })
    }
  }
  ,showActionSheet(category = {}) {
    console.log(category);
    this.setData({
      actionSheetHidden: false,
      category: category
    })
  }
  ,hideActiveSheet() {
    this.setData({
      actionSheetHidden: true,
      currentIndex: -1
    })
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
