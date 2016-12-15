/**
 * security role 2016-11-29 16:28:42
 */
Super.namespace("security.role");

Super.security.role = (function($, path) {

	// 配置
	var config = {

		roleListUrl : function() {
			return path + "/security/role/list";
		},

		roleDeleteUrl : function() {
			return path + "/security/role/delete";
		},

		menuListUrl : function(id) {
			return path + "/security/role/menuList?id=" + id
		},

		saveRoleMenuUrl : function() {
			return path + "/security/role/saveRoleMenu";
		},

		saveRoleUrl : function() {
			return path + "/security/role/save";
		},

		updateRoleUrl : function() {
			return path + "/security/role/update";
		}

	}
	Object.freeze(config);

	// 初始化
	function init() {
		$("#roleGrid").datagrid({
			url : config.roleListUrl(),
			fitColumns : true,
			fit : true,
			border : false,
			nowrap : false,
			rownumbers : true,
			singleSelect : true,
			showFooter : true,
			columns : [ [ {
				field : "name",
				title : "角色名称",
				width : 100
			}, {
				field : "code",
				title : "角色标识",
				width : 100
			}, {
				field : "description",
				title : "描述",
				width : 200
			} ] ],
			footer : '#ft'
		});
	}

	/**
	 * 获得选中行
	 */
	function getSelected() {
		var selected = $('#roleGrid').datagrid('getSelected');
		return selected;
	}

	/**
	 * 公开方法
	 */
	var publicMethod = {

		showAdd : function() {
			$("#roleDialog").dialog({
				modal : true
			}).dialog("open").dialog('setTitle', '新增角色');
			$("#save").show();
			$("#edit").hide();
			$("#submitForm").form('clear');
			$("#name").focus();
		},

		showEdit : function() {
			var selected = getSelected();
			if (selected) {
				$("#roleDialog").dialog({
					modal : true
				}).dialog("open").dialog('setTitle', '修改角色');
				$("#save").hide();
				$("#edit").show();
				$("#submitForm").form('load', selected);
			} else {
				Popbox.unSelectError();
			}
		},

		// 删除
		remove : function() {
			var selected = getSelected();

			if (!selected) {
				Popbox.unSelectError();
				return;
			}

			var flag = Popbox.confirm("确定删除该角色吗?此操作不可恢复!");

			if (flag) {
				$.getJSON(config.roleDeleteUrl(), {
					id : selected.id
				}, function(json) {
					if (json.success) {
						var index = $('#roleGrid').datagrid('getRowIndex',
								selected);
						$('#roleGrid').datagrid('deleteRow', index);
					}
					Popbox.alert(json.message);
				});
			}
		},

		// 设置菜单
		setMenu : function() {
			var selected = getSelected();
			if (selected) {
				$('#menuTree').tree({
					url : config.menuListUrl(selected.id)
				});
				$("#menuDialog").dialog({
					modal : true
				}).dialog("open").dialog('setTitle', '角色菜单配置');
			} else {
				Popbox.unSelectError();
			}
		},

		// 保存菜单
		saveMenu : function() {
			var row = getSelected();
			if (row) {
				var nodes = $('#menuTree').tree('getChecked');
				var s = '';
				for (var i = 0; i < nodes.length; i++) {
					if (s != '')
						s += ',';
					s += nodes[i].id;
				}
				// 提交数据
				$.ajax({
					url : config.saveRoleMenuUrl(),
					dataType : 'json',
					type : 'post',
					data : {
						id : row.id,
						menuIds : s
					},
					success : function(data) {
						Popbox.alert(data.message);
						if (data.success) {
							$("#menuDialog").dialog({
								modal : true
							}).dialog("close");
						}
					}
				});
			} else {
				Popbox.unSelectError();
			}
		},

		// 提交表单
		formSubmit : function(operation) {
			// 验证表达提交是否有问题
			if (!$('#submitForm').form('validate')) {
				Popbox.formError();
				return null;
			}
			var url = "";
			if (operation == 'save')
				url = config.saveRoleUrl();
			else if (operation = 'edit')
				url = config.updateRoleUrl();
			// 提交数据
			$.ajax({
				url : url,
				dataType : 'json',
				type : 'post',
				data : $('#submitForm').serialize(),
				success : function(data) {
					Popbox.alert(data.message);
					if (data.success) {
						$("#roleGrid").datagrid("reload");
						$('#roleDialog').dialog('close');
					}
				}
			});
		}
	}

	return {
		init : init,
		method : publicMethod
	}

})(jQuery, basePath);

// 执行
$(function() {
	Super.security.role.init();
})