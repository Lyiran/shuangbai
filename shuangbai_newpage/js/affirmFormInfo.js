$(function() {
	layer.open({
		type: 2,
		shadeClose: false,
		content: '加载中',
		style: 'background-color:rgba(222,222,222,0.3); color:#fff; border:none; '
	});
	$.ajax({
		type: 'get',
		url: '请求地址',
		success: function(res) {
			layer.closeAll();
	    $('#j-userName').text();
	    $('#j-userIdNum').text();
	    $('#j-phoneNum').text();
	    $('#j-buyTime').text();
	    $('#j-phoneBrand').text();
	    $('#j-phoneType').text();
	    $('#j-price').text();
		},
		error: function() {
			layer.open({
				content: '获取信息失败',
				style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none; font-size:14px;',
				time: 3
			});
		}
	});
});