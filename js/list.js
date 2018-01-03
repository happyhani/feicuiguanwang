var GLOBAL = GLOBAL || {};

$(function() {
	//	引入头部和尾部
	$('#header').load('header.html');
	$('#footer').load('footer.html');

	//钢笔动画
	$('.title_list .pen').click(function() {
		$('.title_list').animate({
			"width": "100px",
			backgroundPositionX: "-1000px"
		}, 0, function() {
			$('.title_list').animate({
				"width": "1100px",
				backgroundPositionX: "0px"
			}, 2000, "easeOutStrong");
		})
	})
	
	//数据加载
	loadArticleList();
	
//	点击加载下一页
	$('#listMore').click(function () {
		if (GLOBAL.pageStart < GLOBAL.pageCount) {
			loadArticleList();
		}
	})
	
	//点击content_one,跳转到对应的文章详情页。利用事件委托
	$('#articleList').delegate('.content_one','click',function () {
		var Url = getUrlParams('type');
		window.open('article.html?'+"type=xiaoniaoNews"+'&articleId='+$(this).attr('articleId'),'_blank');

	})

})

	//数据加载方法
	function loadArticleList () {
		if (!GLOBAL.pageStart) {
			$('#articleList').html('');
			GLOBAL.pageStart=0;
		}
		var itemHtml = '';
		var result = listData["listData0"+GLOBAL.pageStart];
		var list = result.data.list;
		if (!list || !list.length) {
			$('#articleList').html('暂时没有内容，敬请期待！');
			
		}else {
			var updateTime;
			for (var i=0;i < list.length;i++) {
				updateTime = list[i].updateAt || list[i].creatAt;
				itemHtml = $('#itemHtml').html().replace('$articleId$',list[i].sysId)
												.replace("$articleCover$",list[i].coverImg)
												.replace('$articleTitle$',list[i].title)
												.replace('$updateTime$',updateTime?updateTime.substring(0,10):'')
												.replace('$describe$',list[i].describe);
												
				$('#articleList').append(itemHtml);//将替换好的数据模板追加到 图文 #articleList 这个div中
			}
		}
		
//		瀑布流加载实现
		GLOBAL.pageStart = result.data.pageStart + 1;   //每次数据加载完，GLOBAL.pageStart +1
		GLOBAL.pageCount = Math.ceil(result.data.count/result.data.pageSize);// 计算一共加载多少页
		if (GLOBAL.pageStart >= GLOBAL.pageCount) {			//当是最后一页时，隐藏'点击下载更多'，并且上面的图片修改为‘没有更多内容’
			$('#listMore').css('opacity','0').prev('img').attr('src','images/list_gomore_bg_nomore.jpg');
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
//alert( getUrlParams('type') );
//Reg 表示匹配出：&+url 参数名字=值+& ，其中&可以不存在。这样会返回一个数组
//["type=xiaoniaoNews", "", "xiaoniaoNews", ""]

//
//jquery 的 delegate 介绍：
//$(selector).delegate(childSelector,event,data,function)；
//
//childSelector 必需。规定要附加事件处理程序的一个或多个子元素。
//event 必需。规定附加到元素的一个或多个事件。由空格分隔多个事件值。必须是有效的
//事件。
//data 可选。规定传递到函数的额外数据。
//function 必需。规定当事件发生时运行的函数。
//
//当点击的时候，我么执行 window.open 方法，打开 article.html 页面，传递两个参数
//“type”和“articleId”，以便后面的详情页面接收参数显示对于的数据。
//
//由于.content_one 是后来添加到页面的 dom，直接绑定 click 事件是不起作用的，这里
//我们采用事件委托的方式，把事件委托到$("#articleList")上。