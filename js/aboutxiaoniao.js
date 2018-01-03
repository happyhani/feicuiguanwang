var GLOBLE = {}||GLOBLE;
$(function () {
//	设置每一部分的宽高为当前浏览器的宽高,高度需要减去50px，顶部导航为50px
	$('.wrap_block, .main_wrap, .gaishu_block').css( "height",( $(window).height()-50 )+'px' );
	$('.gaishu_block').width( $(window).width() );

//	当浏览器调整大小时,重新设置整屏的宽高
	$(window).resize(function () {
		$('.wrap_block, .main_wrap, .gaishu_block').css( "height",( $(window).height()-50 )+'px' );
		$('.gaishu_block').width( $(window).width() );
		
		//设置内容居中
		if (mainSlideIndex) {        //当没有设置过mainSlideIndex时，也就是第一次打开页面或者mainSlideIndex的值不为0
			if (GLOBLE.resizeTimer) {
				clearInterval(GLOBLE.resizeTimer);
			}
			GLOBLE.resizeTimer = setTimeout(function () {
				mainSlideGoing = true;
				mainSlideGo();
			},200)
		}
		
	});
	
//	设置启动动画
//提前执行一遍运动（用于针对ie不能很好的识别img.load()
	doWelcomeAnimate();
	function doWelcomeAnimate () {
		GLOBLE.welcomeAnimateTimer = setTimeout(function () {
			$('.welcome_content').animate({"top":"40%"},600);     //从58%移动到40%的动画
			$('.welcome_content .welcome_animate').each(function (index,element) {
				var $this = $(this);
				setTimeout(function () {
					$this.show().addClass("animated fadeInUp");
				},200*(index+1));         //设置不同的时间间隔，依次向上动画
			});
			
			setTimeout(function () {
				$('.welcome_wrap').slideUp(600,"easeOutStrong",function () {
					GLOBLE.welcomeOver = true;     
					//用于鼠标上下滑动的判断条件。当启动动画还在执行的时候，滚动鼠标不让内部内容进行滚动。
				});
			},2500);
			
		},4000);
	}
	
//	点击欢迎页面两次后,自动收起
	var welcomeDBclick = false;
	$('.welcome_content').click(function () {
		if (welcomeDBclick) {
			$('.welcome_wrap').slideUp(600,'easeOutStrong',function () {
				GLOBLE.welcomeOver = true;   //动画已经收起，可以向下滚动
			});
		}else {
			welcomeDBclick = true;
		}
	});

	
	
	
//	滚动方法所需变量
	var mainSlideIndex = 0,     //滚动第几个模块 index值
	    mainSlideGoing = false, //是否正在滚动
	    mainSlideDelay = 0,     //用于检测是第一次滚动还是第二次滚动，这里我们是在鼠标第二次滚动时才去实现页面滚动
	    mainSlideTimer = null;  //保存滚动时的定时器


//	兼容浏览器--滑轮滚动方向检测
	var scrollFunc = function (e) {
		var e = e || window.event;
		if (e.wheelDelta) {      //ie 谷歌
			if (e.wheelDelta > 0) {
//				alert("向上滚动");
				mainSlideUp();
			}
			if (e.wheelDelta < 0) {
//				alert("向下滚动");
				//三目运算，判断启动动画是否结束，结束后才能向下滚动
				!!GLOBLE.welcomeOver?mainSlideDown():'';

			}
		}else if(e.detail){      //ff
			if (e.detail > 0) {
//				alert("向下滚动");
				!!GLOBLE.welcomeOver?mainSlideDown():'';

				
			}
			if (e.detail < 0) {
//				alert("向上滚动");
				mainSlideUp();
			}
		}
	}
	
//	绑定滚动事件 兼容各浏览器
	if (document.addEventListener) {
		//firefox
		document.addEventListener('DOMMouseScroll',scrollFunc,false);
	}
	//ie 谷歌
	window.onmousewheel = document.onmousewheel = scrollFunc;
	
//	向下滚动
	function mainSlideDown() {
		
		if (mainSlideDelay < 1) {     //判断是否第一次滚动
			clearInterval(mainSlideTimer);
			mainSlideTimer = setTimeout(function () { 
				//设置定时器的目的，在鼠标滚轮滚动完一次之后再+1。
				//因为在鼠标滚动过程中会一直触发鼠标滚轮事件。否则在滚轮滚动时会一直mainSlideDelay++;
				mainSlideDelay++;
			},100)
		}else if(!mainSlideGoing){
			mainSlideGoing = true;    //代表此时正在滚动
			mainSlideIndex++;
			if ( mainSlideIndex > $('.wrap_block').length-2 ) {
				mainSlideIndex = $('.wrap_block').length-2; 
				//如果已经是最后一页，再向下滚动时就一直停在最后一页
			}
			mainSlideGo();           //滚动方法
			
		}
	
	}
//	向上滚动
	function mainSlideUp () {
		if (mainSlideDelay < 1) {     //判断是否第一次滚动
			clearInterval(mainSlideTimer);
			mainSlideTimer = setTimeout(function () { 
				//设置定时器的目的，在鼠标滚轮滚动完一次之后再+1。
				//因为在鼠标滚动过程中会一直触发鼠标滚轮事件。否则在滚轮滚动时会一直mainSlideDelay++;
				mainSlideDelay++;
			},100)
		}else if(!mainSlideGoing){
			mainSlideGoing = true;    //代表此时正在滚动
			mainSlideIndex--;
			if ( mainSlideIndex <0 ) {
				mainSlideIndex = 0; 
				//如果已经是第一页，再向上滚动时就一直停在第一页
			}
			mainSlideGo();           //滚动方法
			
		}
	}



//	滚动方法
	function mainSlideGo () {
		$('.main_slide').animate({"top":"-"+$(".wrap_block").height()*mainSlideIndex+"px"},600,function () {
			mainSlideGoing = false;
			mainSlideDelay = 0;
			if ( mainSlideIndex==0 ) {
//				不设置当前项
			}else if ( mainSlideIndex == 4 ) {
//				此时app和联系我们都设置当前项
				$(".nav_piece").removeClass('now').eq(mainSlideIndex-1).addClass('now');
				$('.nav_piece').eq(mainSlideIndex).addClass('now');
			}else {
//				对应的每一页设置当前项
				$('.nav_piece').removeClass('now').eq(mainSlideIndex-1).addClass('now');
			}
		})
	}
	
	//点击导航，滚动到对应模块
	$('.nav_piece h2').click(function () {
		var navIndex = $(this).parent().index('.nav_piece');
		if (navIndex == 4) { //app下载和联系我们都是当前项
			navIndex = 3;
		};
		if (navIndex !=5 ) {  //如果点击的不是返回主页，那就和mainSlideIndex对应起来再执行滚动方法
			mainSlideIndex = navIndex+1;
			mainSlideGo();
		}
		
	})
//	点击donext,进入下一页

	$('.welcome2_content .donext').click(function () {
		mainSlideIndex = 1;
		mainSlideGo();
	});
	
	
	//设置hash值
	var mainHash = window.location.hash.substring(1);
	if (mainHash) {
		if ( mainHash==0||mainHash==1||mainHash==2||mainHash==3||mainHash==4 ) {
			$('.welcome_wrap').slideUp(0,function () {
				GLOBLE.welcomeOver = true; //用于鼠标上下滑动整屏滚动出发的判断条件
			});
			mainSlideIndex = mainHash;
			mainSlideGo();
			gaishuMove();
			window.location.hash='';
		}
	}
	
//概述轮播
	$('.gaishu_goright').mouseenter(function () {
		$(this).removeClass('nohover');   //鼠标移入时去掉右箭头的抖动效果
	});
	
	var gaishuIndex = 0;
	$('.gaishu_goleft').css('opacity',0.3);//刚进入页面时，左箭头透明度为0.3,不能向左点击
	
	//向右点击
	$('.gaishu_goright').click(function () {
		gaishuIndex++;
		if (gaishuIndex > 2) {
			gaishuIndex = 2;
			$('.gaishu_goright').css('opacity',0.3);
		}else {
			gaishuMove();  //封装轮播移动方法
		}
	});
	
	//向左点击
	$('.gaishu_goleft').click(function () {
		gaishuIndex--;
		if (gaishuIndex<0) {
			gaishuIndex = 0;
			$('.gaishu_goleft').css("opacity",0.3);
		}else {
			gaishuMove();
		}
	});
	
	
	//轮播方法
	function gaishuMove () {
		$('.gaishu_goleft, .gaishu_goright').css('opacity',0.3);  //在轮播过程中，左右箭头透明度0.3,以示不可点击
		$('.gaishu_slider').animate({"left":"-"+$('.gaishu_block').width()*gaishuIndex+"px"},600,function () {
			$('.gaishu_goleft,.gaishu_goright').css("opacity",1);
		});
	}
	
	//价值模块 呼吸灯
	setInterval(function () {
		$('.jiazhi_huxideng').fadeIn(1200,function () {
			$('.jiazhi_huxideng').delay(200).fadeOut(400);
		})
	},2000);
	
	//小鸟掌云 切换事件
	//点击右按钮
	$('.yunmove_btn_right').click(function () {
		$This = $(this); //存一下当前元素$('.yunmove_btn_right')
		
		//切换按钮背景颜色
		$('.yunmove_btn.now').animate({"left":"78px"},200,function () {
			$('.yunmove_btn.now').removeClass('now');
			
			$This.find('.yunmove_btn').animate({"left":"0"},400).addClass('now');
		});
		
		//移动文字
		$('.yun_slider').animate({"left":'-910px'},600);
		
	});
	
	//点击左按钮
	$('.yunmove_btn_left').click(function () {
		$This = $(this); //存一下当前元素$('.yunmove_btn_left')
		
		//切换按钮背景颜色
		$('.yunmove_btn.now').animate({"left":"-78px"},200,function () {
			$('.yunmove_btn.now').removeClass('now');
			
			$This.find('.yunmove_btn').animate({"left":"0"},400).addClass('now');
		});
		
		//移动文字
		$('.yun_slider').animate({"left":'0'},600);
		
	});
	
	
})