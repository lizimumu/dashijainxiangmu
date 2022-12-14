const form = layui.form
form.verify({

  // 校验两次密码是否一致的规则
  nickname: (val) => {
    if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！"
  },
  // 自定义一个叫 pwd 的校验规则
  email: [/@/, "邮箱格式输入错误"],
});
const initUserinfo = () => {

  $.ajax({
    typeof: "GET",
    url: "/my/userinfo",
    data: null,
    success: res => {
      // console.log(res);
      const { status, message, data } = res;
      if (status !== 0) return layer.msg(message)
      form.val("formUserInfo", data);
    }

  })
}
initUserinfo()
$('#resetBtn').click(function (e) {
  e.preventDefault();
  initUserinfo()

})
$('.layui-form').submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: '/my/userinfo',
    data: form.val('formUserInfo'),
    success: res => {
      // console.log(res);
      const { status, message, data } = res;
      if (status !== 0) return layer.mes(message)
      window.parent.getUserinfo()
    }
  })
})
