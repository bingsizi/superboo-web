/**
 * admin main 首页
 * 2016-11-29 16:28:42
 */
Super.namespace("admin.main");

Super.admin.main = (function($, path) {

	var config = {

		menuUrl : function() {
			return path + "/admin/main/menu";
		}
	}
	Object.freeze(config);

	//初始化
	function init() {
		loadMenu();
	}

	//加载菜单
	function loadMenu() {
		$('#menu').tree({
			url : config.menuUrl(),
			method : 'post',
			animate : true,
			onSelect : function(node) {
				var title = node.text;
				var iconCls = node.iconCls;
				var url = null;
				
				if(node.obj){
					url = path+node.obj;
				}
				
				//在工作空间打开
				resetMainWork(title,iconCls,url);
			}
		});
	}
	
	/**
	 * 从新渲染工作空间
	 */
	function resetMainWork(title,iconCls,url){
		
		$('#content').panel({
			title : title,
			iconCls : iconCls
		});

		if(url){
			mainWork.location.href=url;
		}
	}
	
	return {
		init:init
	}

})(jQuery, basePath);