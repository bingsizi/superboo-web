/**
 * security role 2016-11-29 16:28:42
 */
Super.namespace("security.org");

Super.security.org = (function($, path) {

	// 配置
	var config = {
			
		listUrl:function(){
			return path + "/security/org/list";
		},
		
		saveUrl:function(){
			return path + "/security/org/save";
		},
		
		updateUrl:function(){
			return path + "/security/org/update";
		},
		
		removeUrl:function(){
			return path + "/security/org/delete";
		}

	}
	Object.freeze(config);

	// 初始化
	function init() {
		$("#orgTree").treegrid({
			url : config.listUrl(),
			idField : 'id',
			treeField : 'name',
			fit : true,
		    border:false,
			rownumbers : true,
			fitColumns : true,
			loadMsg:"正在加载数据...",
			autoRowHeight : false,
			toolbar : [{
				iconCls:'icon-collapse-all',
				text:'全部折叠',
				handler:function(){
					$('#orgTree').treegrid('collapseAll');
		        }
			},{
				iconCls:'icon-expand-all',
				text:'全部展开',
				handler:function(){
				    $('#orgTree').treegrid('expandAll');
				}
			},{
				iconCls : 'icon-reload',
				text : '刷新',
				handler : function() {
					var selected = getSelected();
					if(selected)
					    $("#orgTree").treegrid('reload',selected.id);
					else
						$("#orgTree").treegrid('reload');
				}
			},{
			 	text:'新增',
			 	iconCls:'icon-add',
			 	handler:function(){
			 		var row = getSelected();
				 	$("#orgDialog").dialog({modal:true}).dialog("open").dialog('setTitle','新增组织');
				 	$("#save").show();
				 	$("#edit").hide();
				 	$("#orgForm").form('clear');
				 	if(row){
					 	$("#parentName").html(row.name);
					 	$("#_parentId").val(row.id);
				 	}else{
				 		$("#parentName").html("无上级");
					 	$("#_parentId").val(null);
				 	}
				 	$("#sel").combobox('setValue','0');
			 	}
			},{
			 	text:'修改',
			 	iconCls:'icon-edit',
			 	handler:function(){
			 		var selected = getSelected();
			 		if (selected) {
			 			$("#orgDialog").dialog({modal:true}).dialog("open").dialog('setTitle','修改组织');
					 	$("#save").hide();
					 	$("#edit").show();
					 	var node = $("#orgTree").treegrid('getParent',selected.id);
					 	if(node==null)
					 	   $("#parentName").html("无上级");
					 	else
					 	   $("#parentName").html(node.name);
			 			$("#orgForm").form('load', selected);
			 			$("#_parentId").val(selected._parentId);
			 			$("#sel").combobox('setValue',selected.sel);
				 	} else {
				 		Popbox.unSelectError();
					}
			 	}
			} ,{
			 	text:'删除',
			 	iconCls:'icon-remove',
			 	handler:function(){
			 		var selected = getSelected();
			 		//判断是否选中了要删除的组织
			 		if (!selected) {
			 			Popbox.unSelectError();
			 			return ;
				 	}
			 		//判断组织下是否有子组织
			 		var nodes = $("#orgTree").treegrid('getChildren',selected.id);
			 		if(nodes.length>0){
			 			Popbox.alert("请先删除子组织");
			 			return ;
			 		}
			 		
			 		var flag = Popbox.confirm("确定要删除吗?此操作不可恢复");
			 		if(flag){
						//提交数据
						$.getJSON(config.removeUrl(),{id:selected.id},function(json){
							if(json.success){
								var node = $('#orgTree').treegrid('getParent', selected.id);
								if(node==null){
									$('#orgTree').treegrid('reload');
								}else{
									$('#orgTree').treegrid('reload',node.id);
								}
							}
							Popbox.alert(json.message);
						});
			 		}
			 	}
			}],
			columns : [ [ {
				field : 'name',
				title : '组织名称',
				width : 50
			},  {
				field : 'code',
				title : '编码',
				width : 50
			},{
				field : 'createTime',
				title : '创建时间',
				width : 50
			}] ]
		});
	}

	//获得选中行
	function getSelected() {
		var selected = $('#orgTree').treegrid('getSelected');
		return selected;
	}
	
	//公开出去的方法
	var publicMethod = {
			formSubmit:function (operation){
				//验证表达提交是否有问题
				if(!$('#orgForm').form('validate')){
					Popbox.formError();
					return null;
				}
				var url="";
				if(operation=='save')
				   url=config.saveUrl();
				else if(operation='edit')
				   url=config.updateUrl();
				//提交数据
				$.ajax({
					  url: url,
					  dataType: 'json',
					  border:false,
					  type:'post',
					  data: $('#orgForm').serialize(),
					  success: function(data){
						  Popbox.alert(data.message);
						  if(data.success){
							  var row = getSelected();
							  if(row && row.parentId!=null){
									$('#orgTree').treegrid('reload', row.parentId);
							  }else{
									$("#orgTree").treegrid('reload');
							  }
							  $('#orgDialog').dialog('close');
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
	Super.security.org.init();
})