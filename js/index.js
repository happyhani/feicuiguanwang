
$(function(){
	
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	
	//banner轮播开始
	(function(){
		//先获取banner相关的元素
		var oDiv = $('.banner_wrap'),
		    oPrev = oDiv.find('.prev'),
		    oNext = oDiv.find('.next'),
		    aSpan = oDiv.find('.middle span'),
		    animateFather = null, //动画的父级
		    nowIndex = 0,         //当前是第几张轮播图
		    bannerTimer = null;
		    
		    animateFather = $('.banner_one').eq(0);
		    animateImage();
		    //小图片运动的方法
		    function animateImage(){
		    	animateFather.find('.image01').show().addClass('animated fadeInLeft');
		    	setTimeout(function(){
		    		animateFather.find('.image02').show().addClass('animated bounceInRight');
		    		animateFather.find('.image03').show().addClass('animated fadeIn');
		    		
		    	},300);
		    }
		    //图片运动的方法结束
		    
		    //点击上下切换效果
		    oNext.click(function (){
		    	bannerTimer=null;
		    	if (nowIndex < $('.banner_change .middle span').length-1) {
		    		nowIndex++;
		    	}else {
		    		nowIndex = 0;
		    	}
		    	bannerAnimate();
		    });
		    oPrev.click(function(){
		    	bannerTimer=null;
		    	
		    	if (nowIndex > 0) {
		    		nowIndex--;
		    	}else{
		    		nowIndex = $(".banner_change .middle span").length-1;
		    	}
		    	bannerAnimate();
		    	
		    });
		    
		    //点击上下切换效果结束
		    
		    //中间小点点击切换
		    aSpan.click(function(){
		    	bannerTimer=null;
		    	nowIndex = $(this).index()-0; 
		    	bannerAnimate();
		    })
		    
		    //中间小点点击切换结束
		    
		     
		    //banner轮播方法        将他封装到一个方法中，可以重复调用，避免重复的代码
		    function bannerAnimate(){
		    	$(".banner_change .middle span").removeClass('now');
		    	$(".banner_change .middle span").eq(nowIndex).addClass('now');
		    	$('.banner_one').fadeOut(200);
		    	animateFather = $('.banner_one').eq(nowIndex);
		    	animateFather.fadeIn(200);
		    	animateImage();    //封装好的3个小图动画
		    }
		    
		    //banner轮播方法结束
		    
		    //自动播放方法
		    function bannerAuto () {
		    	
		    	if (nowIndex < $(".banner_change .middle span").length-1) {
		    		nowIndex++;
		    	}else {
		    		nowIndex = 0;
		    	}
		    	bannerAnimate();

		    }
		    //自动播放方法结束
		    
		    //自动播放定时器
		    bannerTimer=null;
		    bannerTimer = setInterval(bannerAuto,3000);

	})();

	//banner轮播结束
	
	//主要产品  6个
	(function () {
		var oDiv = $('#chanpin01'),
		    oPrev = oDiv.find('.prev'),
		    oNext = oDiv.find('.next'),
		    aDot = oDiv.find('.now_linebtn_one'),
		    aSpan = oDiv.find('.now_line span'),
		    aContents = oDiv.find('.content_one'),
		    nowIndex = 0;
		    //点击上下页
		    oNext.click(function () {
		    	nowIndex++;
		    	if (nowIndex>=aDot.length) {
		    		nowIndex=0;
		    	}
		    	doFade('fadeInRight');
		    	
		    })
		    oPrev.click(function () {
		    	nowIndex--;
		    	if (nowIndex<0) {
		    		nowIndex = aDot.length-1;
		    	}
		    	doFade('fadeInLeft');
		    })
		    aSpan.click(function () {
		    	var index = aDot.index($(this).parent());
		    	var action = (nowIndex>index)?'fadeInLeft':'fadeInRight';
		    	nowIndex=index;
		    	doFade(action);
		    })
		    //点击上下页
		    
		    function doFade (action) {
		    	aDot.removeClass('now').eq(nowIndex).addClass('now');
		    	aContents.fadeOut(0).eq(nowIndex).fadeIn(200);
		    	aContents.eq(nowIndex).find('h2,p,img').attr('class','').addClass('animated '+action);
		    	
		    	
		    }
	})();
	
	
	
	//主要产品结束
	
	//公司简介 只有一页时，点击不可用，隐藏
	$('.jianjie .now_line, .jianjie .change_line span').css('opacity','0');
	
	//业务范围
	(function () {
		var oDiv = $('.yewu'),
		    aCenterimgs = oDiv.find('.centerimg'),
		    aIcons = oDiv.find('.shousuo_icon'),
		    aDitails = oDiv.find('.yewucontent_ditail'),
		    nowIndex = 0;
		    
//		    鼠标移入时 animate抖动效果
		aCenterimgs.add(aIcons).hover(function () {
			$(this).addClass('animated tada');
		},function () {
			$(this).removeClass('animated tada');
			
		})
//		    鼠标移入时 animate抖动效果结束
		
//		点击伸缩
		aIcons.click(function () {
			nowIndex = aIcons.index($(this));
			doSlide();
			
		})
		aCenterimgs.click(function () {
			nowIndex = aCenterimgs.index($(this));
			doSlide();
		})
		function doSlide () {
			if ( aIcons.eq(nowIndex).hasClass('zhankai') ) {//判断当前图标是否有zhankai 的类名。有zhankai类名代表当前为展开状态
				aDitails.stop().slideUp(300);
				aIcons.removeClass('zhankai');
			}else {
				aDitails.stop().slideUp(300).delay(300).eq(nowIndex).slideDown(300);
				aIcons.removeClass('zhankai').eq(nowIndex).addClass('zhankai');
			}
		}

//		点击伸缩结束




	})();
	//业务范围结束
	
	//团队介绍头像鼠标移入效果
	$('.team_box .headimg').hover(function () {
		$(this).find('a').stop().fadeIn(400);
	},function () {
		$(this).find('a').stop().fadeOut(400);
	});
	
	
	//团队介绍
	(function () {
		var oDiv = $('.teamcontent_wrap'),		//最外面的包裹层div
		    oPrev = oDiv.find('.prev'),
		    oNext = oDiv.find('.next'),
		    moveDiv = oDiv.find('.team_move'),  //中间用于设置运动的div
		    timer = null, 					   //图片轮播的定时器
		    nextTimer = null,                  //点击上一页定时器
		    prevTimer = null,                  //点击下一页定时器
		    nowIndex = 0;
		    
		    oNext.click(function () {
		    	clearInterval( nextTimer );
		    	nextTimer = setTimeout(function () {
		    		doNext();
		    	},200)
		    });
		    oPrev.click(function () {
		    	clearInterval(prevTimer);
		    	prevTimer = setTimeout(function () {
		    		doPrev();
		    	},200)
		    });
		    function doPrev () {
		    	moveDiv.find('.twoteam_wrap:last').insertBefore(moveDiv.find('.twoteam_wrap:first'));
		    	moveDiv.animate({'left':'-1100px'},0);
		    	moveDiv.animate({'left':'0px'},1000,'backOut');
		    	nowIndex--;
		    	if (nowIndex<0) {
		    		nowIndex = oDiv.find('.middle_points').find('span').length-1;
		    	}
		    	oDiv.find('.middle_points').find('span').removeClass('now').eq(nowIndex).addClass('now');
		    	
		    }
		    function doNext () {
		    	moveDiv.animate({'left':'-1100px'},1000,'backIn',function(){
		    		moveDiv.find('.twoteam_wrap:first').appendTo(moveDiv);
		    		moveDiv.animate({'left':"0px"},0);
		    	});
		    	nowIndex++;
		    	if (nowIndex >= oDiv.find('.middle_points').find('span').length) {
		    		nowIndex = 0;
		    	}
		    	oDiv.find('.middle_points').find('span').removeClass('now').eq(nowIndex).addClass('now');
		    }
		    //自动轮播
		    function autoMove () {
		    	clearInterval( timer );
		    	timer = setInterval(function () {
		    		doNext();
		    	},5500)
		    }
		    autoMove();
		    
		    //鼠标移入清除定时器，不再自动播放，当鼠标移开继续自动播放
		    oDiv.hover(function () {
		    	clearInterval(timer);
		    },autoMove);
		   
	})();
	
	//团队介绍结束
	
	
	
})
