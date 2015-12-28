$(function() {
	$('.line-title').bind('click',function () {
		var materCent = $(this).next();
		if (!materCent.is(':animated')) {
			materCent.slideToggle();
			$(this).find('.icon').toggleClass('expend');
		}
	});


	$('.more-btn').bind('click',function () {
		var moreCt = $(this).next();
		if (!moreCt.is(':animated')) {
			moreCt.slideToggle();
		}
	});



});