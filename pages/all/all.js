//index.js
//获取应用实例
import common from '../common/common'
import category from '../common/category'
import articles from '../common/articles'
const app = common.app

const page = {
  onLoad() {
    console.log('all.js onload...')
    this.setData({
      articles:articles
    })
  }
}

Page(page)
