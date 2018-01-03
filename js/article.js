var GLOBAL = GLOBAL || {};
$(function () {
	
	$('#header').load('header.html');
	$('#footer').load('footer.html');
	
	//钢笔动画
	$('.title_list .pen').click(function () {
		$('.title_list').animate({"width":"100px",backgroundPositionX:"-680px"},0,function () {
			$('.title_list').animate({"width":"780px",backgroundPositionX:"-320px"},1000);
		})
	})
	
	//点赞效果
	var likeTipsArr = ["娘娘威武","皇上万岁，万万岁","爱死你啦~","再点一下试试"];
	var ifLikeCliked = false;  				//判断是否点击过，点击过后设置为true，if判断时不再执行语句
	$('.like_btn').click(function () {
		
		if (!ifLikeCliked) {
			ifLikeCliked=true;              //已经点击过
			$('.like_tips').text( likeTipsArr[ Math.floor( Math.random()*likeTipsArr.length ) ] );
			doMove();
			
		}else if ( ifLikeCliked && $('.like_tips').text()=="再点一下试试" ) { 
			//当内容为"再点一下试试"时增加的互动
			$('.like_tips').text("喊你点你就点啊");
			doMove();
		}
		
	});
	
	function doMove () {
		$('.like_tips').animate({"top":"0",opacity:"1"},600,'elasticOut',function () {
			
			$('.like_tips').delay(600).animate({"left":"-500px",opacity:"0"},function () {
				
				$('.like_tips').animate({"top":"200px","left":"258px",opacity:"0"},0,'backIn');
				$('.like_btn').addClass("like_btn_clicked");
				
			});
			
		})
	}
	
	//加载文章详情
	loadArticleDetail();
	
})

//加载数据方法
function loadArticleDetail () {
	if ( getUrlParams('type') ) {
		var result = articleData[getUrlParams('type')+getUrlParams('articleId')];
		$('#typeTitle').html(result.data.typeTitle);
		$('#typeEntitle').html(result.data.typeEntitle); 
		$('#articleTitle').html(result.data.title); 
		$('#updateTime').html(result.data.updateAt); 
		$('#auther').html(result.data.updateByFullName); 
		$('#cover').attr('src',result.data.coverImg); 
		$('#content').html(result.data.content); 	
	}
}



//获取页面url传来的参数
function  getUrlParams(name) {
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	var r = window.location.search.substring(1).match(reg); //获取到一个数组
	if (r!=null) {
		return r[2];
	}else {
		return '';
	}
}