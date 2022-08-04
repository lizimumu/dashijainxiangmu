// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 给上传框绑定事件  点击让上传框模拟点击
$('#uploadBtn').click(function () {
  $('#file').click()
})
$('#file').change(function (e) {
  console.log(1);
  let files = e.target.files
  if (files.length === 0) return layer.msg('请选择上传文件')
  let file = files[0]
  //  获取图片路径
  let imgUrl = URL.createObjectURL(file)
  console.log(imgUrl);
  // 3. 重新初始化裁剪区域
  $image
    .cropper("destroy") // 销毁旧的裁剪区域
    .attr("src", imgUrl) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
}
)
//  为确定按钮绑定点击事件
$("#sendBtn").click(() => {
  // 1、拿到用户裁切之后的头像
  // 直接复制代码即可
  const dataURL = $image.cropper("getCroppedCanvas", {
    // 创建一个 Canvas 画布
    width: 100,
    height: 100,
  })
    .toDataURL("image/png");
  // 2、发送 ajax 请求，发送到服务器
  $.ajax({
    type: "POST",
    url: "/my/update/avatar",
    data: {
      avatar: dataURL,
    },
    success: function (res) {
      const { status, message } = res
      layer.msg(message);
      if (status !== 0) 
      
      layer.msg("更换头像成功！");
      window.parent.getUserinfo();
    },
  });
});