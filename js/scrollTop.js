
$(function () {
	
	//判断何时隐藏何时出现
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('#scrollTop_wrap').fadeIn();
		}else {
			$('#scrollTop_wrap').fadeOut(0);
			
		}
	})
	
	//点击返回顶部
	$('#scrollTop').click(function () {
		//固定定位的scrollTop_wrap设置飞出动画
		$(this).parent().animate({'bottom':1000,'opacity':0},400,function () {
			$('#scrollTop_wrap').css({'opacity':1,'bottom':200}).fadeOut(0);
		})
		//滚动距离回归为0
		$('html,body').animate({scrollTop:0},400);
	})
	
})

