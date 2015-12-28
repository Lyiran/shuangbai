$(function() {
  function fileBase64 (opts) {
    var reader = new FileReader();
    reader.readAsDataURL(opts.file);
    reader.onload = function () {
      opts.callback&&opts.callback(reader.result);
    };
  }

	var phfaceOrImei = $('#j_phfaceOrImei');
	var phoneBack = $('#j_phoneBack');
	var idFace = $('#j_face');
	var idBack = $('#j_back');
	var inputContentArry = $('.input-ct');


	inputContentArry.click(function() {
		var self = $(this);
		var input = self.find('input');
		// var span = self.find('span');
		input.change(function () {
			var selfInput = $(this);
			fileBase64({
				file: selfInput[0].files[0],
				callback: function (res) {

					// 把图片base64存储在元素的属性里
					// data-img-base64属性
					self.data('img-base64', res);


					// span.text(res);
					console.log(res);
					console.log(self);
					self.css({
						background: 'url('+res+')'
					});
				}
			});
		});

	});

	var imgBtn = $('#j-submit');
	imgBtn.click(function() {
		//获取图片base64数据
		var imgsBase64 = {
			phoneFront: $('.j-ipt-phone-front').data('img-base64'),
			phoneBack: $('.j-ipt-phone-back').data('img-base64'),
			idFront: $('.j-ipt-id-front').data('img-base64'),
			idBack: $('.j-ipt-id-front').data('img-base64')
		};
		console.log(imgsBase64);
		// 如果没上传的话  imgsBase64.phoneFront的值就是undefined ...

		if (typeof imgsBase64.phoneFront === 'undefined') {
      layer.open({
        content: '手机正面和IMEI号没上传!',
        style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
		} else if (typeof imgsBase64.phoneBack === 'undefined') {
      layer.open({
        content: '手机反面没上传!',
        style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
		} else if (typeof imgsBase64.idFront === 'undefined') {
      layer.open({
        content: '身份证正面未上传!',
        style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
		} else if (typeof imgsBase64.idBack === 'undefined') {
      layer.open({
        content: '身份证反面未上传',
        style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
		} else {
			alert('所有图片都上传完毕了!');
			$.post('后台地址',imgsBase64).done(function (res) {
				//success
				if(res.code == 0) {
					location.href='path/file'
				}
				//wrong
				else if (res.code == 1) {
		      layer.open({
		        content: '上传有误',
		        style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
		        time: 3
		      });

				}

			});
		}

		// console.log(img0);
	});

	/*phfaceOrImei.change(function() {
		var imeiFile = phfaceOrImei.files[0];
		fileBase64({
			imeifile: imeiFile,
			callback: function(res) {

			}
		})
	});*/
	



	/*
	* 图片实例弹层
	*/
	var photoDemo = $('#j_photoDemo');
  var dialogBg = $('#j-dialog-backdrap');
  var dialogAlert = $('#j-dialog-alert');
  //点击弹层提示
  photoDemo.click(function() {
  	dialogShow(dialogAlert);
  });
  //显示对话框
	function dialogShow (dialog) {
		dialogBg.show();
		dialog.show();
		dialog.find('.btn-ok').click(
			function () {
				dialogHide(dialog);
			});
	}

	//关闭对话框
	function dialogHide (dialog) {
		dialogBg.hide();
		dialog.hide();
	}


});