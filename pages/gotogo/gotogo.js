//index.js
//获取应用实例
'use strict'
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
import gotogos from '../common/gotogo'

const cids = gotogos.map( gotogo => Number(gotogo.cid) )
console.log(cids);
// 反转数组。由于zindex最后的在最上面，所以反转数组使第一个元素变成
// 最后一个，这样在界面上就显示为正常的顺序了
gotogos.reverse()
console.log(gotogos);
let currentIndex = 0

const page = {
  data: {
     animationData: {}
  }
  // ,onPullDownRefresh(){
  //     console.log('下拉刷新');
  //     this.setData({
  //       gotogos: gotogos
  //     })
  //     currentIndex = 0;
  // }
  ,onLoad(){
    this.setData({
      gotogos: gotogos
    })
    console.log( cids[0] );
    // 为了防止页面缓存，每次刷新页面之后都会重置currentIndex
    currentIndex = 0;
  }

  ,dislike(){
    // 如果到最后，提示用户并返回
    if(currentIndex >= cids.length - 1){
      wx.showToast({
        title: '已经到最后啦亲~',
        duration: 1000
      })
      return;
    }

    /**
     * 创建一个动画实例animation。调用实例的方法来描述动画。最后通过动画实例的export方法
     * 导出动画数据传递给组件的animation属性
     * 注意；export方法每次调用后会清理掉之前的动画操作
     */
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.scale(1.5,1.5).rotate(-20).translateX(-100).opacity(0).step()
    this.setData({
      animationData:animation.export(),
      currentCid: cids[currentIndex++]
    })
    // 上面的动画结束后，再次调用动画，把动画元素移出屏幕，防止用户
    // 误点击一个看不见的卡片，然后跳转
    setTimeout(function() {
      animation.translateX(1000).step()
      this.setData({
        animationData:animation.export()
      })
    }.bind(this),400)
  }
}


Object.assign(page, common)

Page(page)
