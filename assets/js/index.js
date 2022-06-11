//获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token'),
    // },
    success: (res) => {
      // console.log(res)
      if (res.status !== 0) return layer.msg(res.message)
      layer.msg('获取用户信息成功')
      //调用宣染函数
      renderAvatar(res.data)
    },
    //请求身份验证跳转
    // complete: (res) => {
    //   //在complete 回调函数中,可以使用res.responseJSON 拿到服务器响应回来的数据
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     //强制清空 token
    //     localStorage.removeItem('token')
    //     //强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // },
  })
}

//渲染用户信息
const renderAvatar = (user) => {
  const name = user.nickname || user.username
  // 宣染欢迎语
  $('#welcome').html(`欢迎${name}`)
  //按需渲染头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}

//退出登录
$('#btnLogout').click(() => {
  layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function () {
    // 清空本地存储里面的 token
    localStorage.removeItem('token')
    // 重新跳转到登录页面
    location.href = '/login.html'
  })
})
//获取用户列表
getUserInfo()
