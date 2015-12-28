$(function () {
    var imei = $('#j-IMEI');
    var userName = $('#j-userName');
    var idNum = $('#j-idNum');
    var phoneNum = $('#j-phonenum');
    var phoneBrand = $('#j-phoneBrand');
    var phoneType = $('#j-phoneType');
    var buyDate = $('#j-buyDate');
    var checkBox = $('#j-checkBox');
  //前端判断用户数据
  function checkFillInfo () {
    var nameReg = /^[\u4e00-\u9fa5]{2,4}$/;
    var IDReg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
    var phoneReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    var IEMIReg = /^\d{15}$/;

    if(imei.val() ==  null || imei.val() == ''){
      layer.open({
        content: '请输入IMEI号',
        style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none; font-size:14px;',
        time: 3
      });
      return false;
    }
    else if(IEMIReg.test(imei.val()) === false){
      layer.open({
        content: '请输入正确的IEMI号',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none; font-size:14px;border-radius: 0%;',
        time: 3
      });
      return false; 
    }
    else if(userName.val() ==  null || userName.val() == ''){
      layer.open({
        content: '请输入姓名',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none; font-size:14px;border-radius: 0%;',
        time: 3
      });
      return false;
    }
    else if(nameReg.test(userName.val()) === false){
      layer.open({
        content: '请输入中文姓名',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none; font-size:14px;border-radius: 0%;',
        time: 3
      });
      return false;
    }
    else if(idNum.val() == null || idNum.val() == ''){
      layer.open({
        content: '请输入身份证号',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
      return false;
    }
    else if(IDReg.test(idNum.val()) === false){
      layer.open({
        content: '请输入正确的身份证号',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none; ',
        time: 3
      });
      return false;
    }
    else if(phoneNum.val() == null || phoneNum.val() == ''){
      layer.open({
        content: '请输入联系电话',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
      return false;
    }
    else if(phoneReg.test(phoneNum.val()) === false){
      layer.open({
        content: '请输入正确的联系电话',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
      return false;
    }else if(phoneBrand.val() == null || phoneBrand.val() == ''){
      layer.open({
        content: '请输入手机品牌',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
      return false;
    }
    else if(phoneType.val() == null || phoneType.val() == ''){
      layer.open({
        content: '请输入手机型号',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
      return false;
    }else if(buyDate.val() == null || buyDate.val() == ''){
      layer.open({
        content: '请输入购机时间',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none; ',
        time: 3
      });
      return false;
    }
    else if(!checkBox[0].checked){
      layer.open({
        content: '请阅读并同意该条款',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none; ',
        time: 3
      });
      return false;
    }
    else {
      layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中',
        style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none; '
      });
      submitTypeData();
      return false;
    }
    return true;

  }

  //判断结束


  // 点击调用前台判断
  $('#j-btn-submit').click(function () {
    checkFillInfo();
    return false;
  });


  //向后台发送数据
  function submitTypeData() {

    //后台接收处理数据接口
    $.post('/path/to/file',{
      imei: imei.val(),
      peopleName: userName.val(),
      peopleId: idNum.val(),
      phoneNumber: phoneNum.val(),
      phoneBrand: phoneBrand.val(),
      phoneModel: phoneType.val(),
      buyTime: buyDate.val()
    }).done(function (res) {
      /*{
        "code": 0,
        "message": "success",
        "data": [
        'imei': '111111111112345',
        ]
      }*/

      //约定0为数据验证成功 页面跳转
      if (res.code == 0) {
        layer.closeAll();
        location.href = 'http://www.baidu.com/';
      }
      //code=1表示填写信息错误
      else if (res.code == 1) {
        layer.closeAll();
        layer.open({
          content: res.message,//后端返回错误信息 前台呈现弹层提示用户
          style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none; font-size:14px;border-radius: 0%;',
          time: 5
        });
        return true;

      }
    });
  }


});