const app = getApp()
const common = {
  app: app,
  showModal(info) {
    this.setData({
      modalHidden: false,
      info: info
    })
  }


  ,hideModal() {
    this.setData({
      modalHidden: true,
      info: ''
    })
  }


  // 执行时机 onLod -> onShow -> onReady
  // ,onLoad() {
  //   console.log('onLoad')
  // }
  ,onReady(){
    // console.log('onReady')
  }
  ,onShow(){
    // console.log('onShow')
  }
  ,onHide(){
    // console.log('onHide')
  }
  ,onUnload(){
    // console.log('onUnload');
  }
}
export default common

// module.exports = common
