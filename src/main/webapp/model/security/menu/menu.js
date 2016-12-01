/**
 * security menu 首页 2016-11-29 16:28:42
 */
Super.namespace("security.menu");

Super.security.menu = (function($, path) {

	// 配置
	var config = {

		listUrl : function() {
			return path + "/security/menu/list";
		},

		removeUrl : function() {
			return path + "/security/menu/delete";
		},
		
		saveUrl:function(){
			return path + "/security/menu/save";
		},
		
		updateUrl:function(){
			return path + "/security/menu/update";
		}
	}
	Object.freeze(config);

	// 初始化
	function init() {
		$("#menuGrid").datagrid({
			url : config.listUrl(),
			fitColumns : true,
			fit : true,
			nowrap : true,
			rownumbers : true,
			singleSelect : true,
			showFooter : true,
			pagination : true,
			border : false,
			pageSize : 20,
			columns : [ [ {
				field : "id",
				title : "ID",
				width : 10
			}, {
				field : "name",
				title : "名称",
				width : 10
			}, {
				field : "type",
				title : "类型",
				width : 10
			}, {
				field : "icon",
				title : "图标",
				width : 10
			}, {
				field : "indexUrl",
				title : "响应地址",
				width : 10
			}, {
				field : "permission",
				title : "权限",
				width : 10
			}, {
				field : "parentId",
				title : "上级菜单",
				width : 10
			}, {
				field : "parentIds",
				title : "所有上级",
				width : 10
			}, {
				field : "seq",
				title : "排序",
				width : 10
			} ] ],
			toolbar : '#tb',
			footer : '#ft'
		});
	}

	/**
	 * 获得选中行
	 */
	function getSelected() {
		var selected = $('#menuGrid').datagrid('getSelected');
		return selected;
	}

	/**
	 * 公开方法
	 */
	var publicMethod = {

		/**
		 * 提交查询
		 */
		searchForm : function() {
			var param = $('#searchForm').serialize();
			$('#menuGrid').datagrid({
				url : config.listUrl() + "?" + param
			});
		},

		/**
		 * 提交表单
		 */
		formSubmit : function(operation) {
			// 验证表达提交是否有问题
			if (!$('#menuForm').form('validate')) {
				Popbox.formError();
				return null;
			}
			var url = "";
			if (operation == 'save') {
				url = config.saveUrl();
			} else if (operation = 'edit') {
				url = config.updateUrl();
			}
			// 提交数据
			$.ajax({
				url : url,
				dataType : 'json',
				type : 'post',
				data : $('#menuForm').serialize(),
				success : function(data) {
					Popbox.alert(data.message);
					if (data.success) {
						$("#menuGrid").datagrid("reload");
						$('#menuDialog').dialog('close');
					}
				}
			});
		},

		/**
		 * 显示新增窗口
		 */
		showAdd : function() {
			$("#menuDialog").dialog({
				modal : true
			}).dialog("open").dialog('setTitle', '新增菜单');
			$("#save").show();
			$("#edit").hide();
			$("#menuForm").form('clear');
		},

		/**
		 * 显示修改窗口
		 */
		showEdit : function() {
			var selected = getSelected();
			if (selected) {
				$("#menuDialog").dialog({
					modal : true
				}).dialog("open").dialog('setTitle', '修改菜单');
				$("#save").hide();
				$("#edit").show();
				$('#menuId').attr("readonly", "readonly");
				if (selected.parentId === null) {
					selected.parentId = "";
				}
				$("#menuForm").form('load', selected);
			} else {
				Popbox.unSelectError();
			}
		},

		/**
		 * 删除
		 */
		remove : function() {
			var selected = getSelected();
			if (!selected) {
				Popbox.unSelectError();
				return;
			}
			$.messager.confirm('消息提醒', '确定删该菜单吗?此操作不可恢复!', function(r) {
				if (r) {
					// 提交数据
					$.getJSON(config.removeUrl(), {
						id : selected.id
					}, function(json) {
						if (json.success) {
							var index = $('#menuGrid').datagrid('getRowIndex',selected);
							$('#menuGrid').datagrid('deleteRow', index);
						}
						Popbox.alert(json.message);
					});
				}
			});
		}
	}

	return {
		init : init,
		method : publicMethod
	}

})(jQuery, basePath);

//执行
$(function(){
	Super.security.menu.init();
})