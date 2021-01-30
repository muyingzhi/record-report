var loadingss;

var loadings = new Vue({
  methods: {
    startLoading: function () {
      loadingss = this.$loading({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.7)'
      });
    },
    endLoading: function () {
      loadingss.close();
    }
  }
});

//请求拦截
axios.interceptors.request.use(function (config) {
  loadings.startLoading(); //请求时的加载动画
  return config; //加载动画的时候把config return 回去
}, function (error) {
  return Promise.reject(error);
})
//响应拦截
axios.interceptors.response.use(function (response) {
  loadings.endLoading(); //结束加载动画
  if(response.data.code==500){
    Vue.prototype.$message({
      type: 'error',
      message: response.data.msg
    });
  }
  return response; //结束时把response return回去
}, function (error) {
  //错误提醒
  loadings.endLoading(); //如果错误也结束动画
  let tmp = '请求错误，请刷新重试';
  switch(error.response.status){
    case 404:
      tmp = "页面找不到："+error.config.url
    case 401:
  }
  Vue.prototype.$message({
    type: 'info',
    message: tmp
  });
  return Promise.reject(error);
});







// var serverurl = "http://211.144.5.80:30117/platform_system/";
var serverurl = "http://localhost/";


String.prototype.getParam = function (key) {
  //解析url传过来的参数
  var url = this;
  var urls = url.split("?");
  if (urls.length > 1) {
    var arges = urls[1];
    var argesArr = arges.split("&");
    var argesArrLen = argesArr.length;
    for (var i = 0; i < argesArrLen; i++) {
      var itemName = argesArr[i].split("=")[0];
      var itemValue = argesArr[i].split("=")[1];
      if (itemName == key) {
        return decodeURI(itemValue);
      }
    }
  }
  return "";
}