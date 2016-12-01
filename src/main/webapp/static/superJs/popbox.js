/**
 * 综合弹出窗口和弹出框js,依赖于jquery
 * auth:peiran zhang
 * time:2016-12-1 11:17:03
 */
;var Popbox = (function($){
	
	var FORMERROR = "表单错误";
	var UNSELECT = "未选中记录";
	
	return {
		
		/**
		 * 表单提交错误
		 */
		formError:function(){
			this.alertError(FORMERROR);
		},
		
		/**
		 * 未选中错误
		 */
		unSelectError:function(){
			this.alertError(UNSELECT);
		},
		
		/**
		 * 提示框
		 */
		alert:function(msg){
			alert(msg);
		},
		
		/**
		 * 成功提示框
		 */
		alertSuccess:function(msg){
			alert("success:"+msg);
		},
		
		/**
		 * 失败提示框
		 */
		alertError:function(msg){
			alert("error:"+msg);
		},
		
		/**
		 * 确认框
		 */
		confirm:function(msg){
			return confirm(msg);
		}
	}
})(jQuery);