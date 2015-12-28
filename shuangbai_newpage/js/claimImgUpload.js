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
	var phoneBill = $('#j_phone_bil');
	var insureDescribe = $('#j_insure_describe');

	var inputFile = $('.j-ipt-file');

	inputFile.change(function () {
		var files = this.files;
		var selfInputCt = $(this).parents('.input-ct');
		console.log(files);
		imgOnChoose({
			files: files,
			onChoosed: function (base64) {
				selfInputCt.data('img-base64', base64);
				selfInputCt.css({
					backgroundImage: 'url('+ base64 +')'
				});
			},
			onCompressed: function (base64) {
				selfInputCt.data('img-base64', base64);
				selfInputCt.css({
					backgroundImage: 'url('+ base64 +')'
				});
			}
		});
	});


	var imgBtn = $('#j-submit');
	imgBtn.click(function() {
		//获取图片base64数据
		var imgsBase64 = {
			phoneFront: $('.j-ipt-phone-front').data('img-base64'),
			phoneBack: $('.j-ipt-phone-back').data('img-base64'),
			idFront: $('.j-ipt-id-front').data('img-base64'),
			idBack: $('.j-ipt-id-front').data('img-base64'),
			phoneBill: $('.j-ipt-phone-bil').data('img-base64'),
			insureDescribe: $('.j-ipt-insure-descb').data('img-base64'),
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
		} else if (typeof imgsBase64.phoneBill === 'undefined') {
      layer.open({
        content: '购买发票或购机收据未上传',
        style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
		} else if ( typeof imgsBase64.insureDescribe === 'undefined') {
      layer.open({
        content: '出险详细经过描述还未上传',
        style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none;',
        time: 3
      });
		}	else {
			alert('所有图片都上传完毕了!');
			console.log(imgsBase64);
			return; //待删

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



	});




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





  /**
   * 图片选中处理，显示在页面上，并调用压缩及上传函数
   * @param  {[type]} opts [description]
   * @return {[type]}      [description]
   */
  function imgOnChoose (opts) {

    // 图片小于100kb不压缩
    var maxsize = 100*1024;

    if (!opts.files.length) {
      return;
    }

    var files = Array.prototype.slice.call(opts.files);

    if (files.length > 1) {
      alert('最多同时上传1张');
      return;
    }

    files.forEach(function (file, i) {
      var rePicType = /\/(?:jpeg|png|gif)/i;
      if (!rePicType.test(file.type)) {
      	alert('图片格式只能为jpg,png或gif!');
        return;
      }

      var reader = new FileReader();

      // 获取图片大小
      var size = file.size/1024 > 1024 ? Math.floor(10*file.size/1024/1024)/10 + 'MB' :  Math.floor(file.size/1024) + 'KB';

      reader.readAsDataURL(file);

      reader.onload = function () {
        var result = this.result;
        var img = new Image();
        img.src = result;

        opts.onChoosed&&opts.onChoosed(result);

        // 如果图片大小小于100kb，则直接上传
        if (result.length <= maxsize) {
          img = null;
          // console.log('图片直接上传');
          opts.onCompressed&&opts.onCompressed(result);
          return;
        }

        // 图片加载完毕后进行压缩，然后上传
        if (img.complete) {
          callback();
        } else {
          img.onload = callback;
        }

        function callback () {
          var data = compressImg(img);
          opts.onCompressed&&opts.onCompressed(data);
          img = null;
        }

      };
    });

  }


  /**
   * 使用canvas对大图片压缩
   * @param  {[type]} img [description]
   * @return {[type]}     [description]
   */
  function compressImg (img) {

    // 用于压缩图片的canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // 瓦片canvas
    var tCanvas = document.createElement('canvas');
    var tctx = tCanvas.getContext('2d');

    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;

    // 如果图片大于400w像素，计算压缩比并将大小压至400w以下
    // ratio -- 压缩比
    var ratio = width*height / 4000000;
    if ( ratio > 1 ) {
      // eg: width: 2000 height: 3000 ratio = 6000000/4000000 = 1.5
      // 平方根？？？
      ratio = Math.sqrt(ratio);
      width = width / ratio;
      height = height / ratio;
    } else {
      ratio = 1;
    }

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var count = width * height / 1000000;
    // 如果图片大于100w像素则使用瓦片绘制
    if ( count > 1 ) {
      // 计算要分成多少块瓦片
      count = Math.floor(Math.sqrt(count)+1);

      // 计算每块瓦片的宽和高
      var nw = Math.floor(width / count);
      var nh = Math.floor(height / count);

      tCanvas.width = nw;
      tCanvas.height = nh;

      // ???
      for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }

    // 进行最小压缩
    var ndata = canvas.toDataURL('image/jpeg', 0.1);

    // console.log('压缩前：' + initSize);
    // console.log('压缩后：' + ndata.length);
    // console.log('压缩率：' + Math.floor(100*(initSize - ndata.length) / initSize) + '%' );
    tCanvas.width = tCanvas.height = canvas.width = canvas.heigth = 0;
    return ndata;
  }


});