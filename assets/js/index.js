function getUserinfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    data: null,
    success: res => {
      // console.log(res);
      const { status, message } = res
      if (status !== 0) return layer.msg(message)

      renderAvatar(res.data)
    }
  })
}
const renderAvatar = data => {
  let name = data.nickname || data.username
  // console.log(name);
  $('#welcome').html(`欢迎 ${name}`);

  // 按需渲染用户头像
  if (data.user_pic !== null) {
    // 渲染图片头像
    $(".layui-nav-img").attr("src", data.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    let firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName);
  }

}
getUserinfo()
// 退出登录
$('#exitBtn').on('click', function () {
  layui.layer.confirm(
    "确定退出登录？",
    { icon: 3, title: "" },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem("token");
      // 重新跳转到登录页面
      location.href = "/login.html";
    }
  );
})
