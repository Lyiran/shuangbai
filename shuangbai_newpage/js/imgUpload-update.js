filechooser.onchange = function () {
	if (!this.files.length) return;
	var files = Array.prototype.slice.call(this.files);
	if (files.length > 1) {
		alert("最多同时只可上传一张图片");
		return;
	}
	files.forEach (function (file, i) {
		if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
		var reader = new FileReader ();
		var li = document.createElement("li");
		li.innerHTML = '<div class="progress"><span><span></span>div>';
		$(".img-list").append($(li));

		reader.onload = function () {
			var result = this.result;
			var img = new Image();
			img.src = result;
			//如果图片大小小于200kb,则直接上传
			if (result.length <= maxsize) {
				$(li).css("background-img", "url('+ result +')");
				img = null;
				upload(result, file.type, $(li));

				return;
			}

			//图片加载完毕之后进行压缩，然后上传
			if (img.complete) {
				callback();
			} else {
				img.onload = callback;
			}

			function callback() {
				var data = compress(img);
				$(li).css("background-img", "url('+ data +')");
				upload(data, file, $(li));
				img = null;
			}
		};
		reader.readAsDataURL(file);
	})
};

//图片压缩方法
function compress (img) {
	var initSize = img.src.length;
	var width = img.width;
	var height = img.height;

	//如果图片大于四百万像素，计算压缩比将大小压缩至400万以下
	var ratio;
	if ((ratio = width * height / 4000000)>1) {
		ratio = Math.sqrt(ratio);
		width /= ratio;
		height /= ratio;
	} else {
		ratio = 1;
	}
	canvas.width = width;
	canvas.height = height;
}

//铺底色
ctx,fillStyle = '#fff';
ctx.fileRect(0, 0, canvas.width, canvas.height);

//如果图片像素大于100万则使用瓦片绘制
var count;
if ((count = width * height / 1000000) > 1) {
	count = ~~(Math.sqrt(count)+1);//计算要分成多少块瓦片

	//
}