$(function () {
	var claimPhoneNum = $('#j-user-iphone');
  var phoneReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	function checkInput () {
		if (claimPhoneNum.val() === ''){
      layer.open({
        content: '请输入您的手机号',
        style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
      return false;
		} else if ( phoneReg.test(claimPhoneNum.val()) === false ) {
      layer.open({
        content: '请您输入正确的手机号',
        style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
      return false;
		} else {
      layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none; '
      });
      submitData();
      return false;
		}
	}

	//点击前台判断
  $('#j-inquire-btn').click(function () {
    checkInput();
    return false;
  });

	//向后台发送数据
	function submitData() {
		$.post('/path/to/file', {
			claimPhoneNum: claimPhoneNum.val()
		}).done(function (res) {
			if (res.code == 0) {
				layer.closeAll();
				location.href = 'http://www.baidu.com/';
			} else {
				layer.closeAll();
        layer.open({
          content: res.message,//后端返回错误信息 前台呈现弹层提示用户
          style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
          time: 5
        });
        return true;
			}
		});
	}

});
