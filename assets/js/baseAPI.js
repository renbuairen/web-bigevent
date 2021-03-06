//注意:每次调用$.get()或$.post()或$.ajax()的时候,
//会先调用 ajaxPrefilter 这个函数
//在这个函数中,可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options) => {
  //在请求之前拼接上根路径
  options.url = 'http://big-event-api-t.itheima.net:80' + options.url

  // 注入 token
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token'),
    }
  }

  //请求身份验证跳转
  options.complete = (res) => {
    //在complete 回调函数中,可以使用res.responseJSON 拿到服务器响应回来的数据
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      //强制清空 token
      localStorage.removeItem('token')
      //强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})
