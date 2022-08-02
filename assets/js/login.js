$('#link_reg').on('click', function () {
  // 点击去注册 去注册盒子隐藏登录显示
  $('.login-box').hide();
  $('.reg-box').show()
})
$('#link_login').on('click', function () {
  // 点击登录 去登录盒子隐藏去注册显示
  $('.login-box').show();
  $('.reg-box').hide()
})
const form = layui.form

// const baseURL = "http://www.liulongbin.top:3007"
const layer = layui.layer
// 通过 form.verify() 方法自定义校验规则
form.verify({

  // 校验两次密码是否一致的规则
  repass: (val) => {
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败,则return一个提示消息即可
    const pwd = $(".reg-box [name=password").val();
    if (pwd !== val) return "两次密码不一致"
  },
  // 自定义一个叫 pwd 的校验规则
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
});

// ! 检测注册页面的提交事件
$('#form_reg').on('submit', function (e) {
  // 阻止默认提交行为

  e.preventDefault();
  // 把表单里面的用户输入信息获取过来
  const data = $(this).serialize()
  // 发起ajax 请求提交数据
  $.ajax({
    type: 'POST',
    url:  '/api/reguser',
    data,
    success: res => {
      console.log(res);
      const { message, status } = res
      if (status !== 0) return layer.msg(message)
      $('#link_login').click()
    }
  })
})
// ! 检测登录页面的提交事件
$('#form_login').on('submit', function (e) {
  console.log(1);
  e.preventDefault();
  // 把表单里面的用户输入信息获取过来
  const data = $(this).serialize()
  $.ajax({
    type: 'POST',
    url: '/api/login',
    data,
    success: res => {
      console.log(res);
      const { message, status, token } = res
      if (status !== 0) return layer.msg(message)
      localStorage.setItem('token', token)
      location.href = "/index.html"

    }
  })
})