/**
 * security role 2016-11-29 16:28:42
 */
Super.namespace("security.user");

Super.security.user = (function($, path) {

	// 配置
	var config = {
			
		orgTreeUrl:function(){
			return path +"/security/user/orgTree";
		},
		
		userListUrl:function(id){
			if(id){
				return path +"/security/user/list?orgId="+id;
			}else{
				return path +"/security/user/list";
			}
		},
		
		lockUrl:function(){
			return path + "/security/user/locked";
		},
		
		saveUrl:function(){
			return path + "/security/user/save";
		},
		
		updateUrl:function(){
			return path + "/security/user/update";
		},
		
		roleIdsUrl:function(){
			return path + "/security/user/roleIds";
		}
		

	}
	Object.freeze(config);

	// 初始化
	function init() {
		loadOrg();
		loadUser();
	}
	
	//加载组织机构
	function loadOrg(){
	  $('#orgTree').tree({  
		    url : config.orgTreeUrl(),
			singleSelect : true,
			animate:true,
			lines:true,
			onClick:function(node){
				//清空from表单
				$("#realNameSearch").val("");
				$("#usernameSearch").val("");
				$('#userGrid').datagrid({
					url : config.userListUrl(node.id)
				});
			}
		});
	}
	
	//加载用户
	function loadUser(){
		$("#userGrid").datagrid({
			url:config.userListUrl(),
			fitColumns:true,
			fit:true,
			border:false,
			nowrap:true,
			rownumbers:true,
			singleSelect:true,
			showFooter:true,
			pagination:true,
			border:false,
			pageSize:20,
			columns:[[
		        {field:"username", title:"用户名", width:10},
				{field:"realName", title:"真实姓名", width:10},
				{field:"locked", title:"锁定状态", width:10,formatter:function(value){
					if(value==0){
						return "<span style=\"color:#fff;padding:3px 5px;background:green;\">正常</span>"
					}else if(value==1){
						return "<span style=\"color:#fff;padding:3px 5px;background:red;\">锁定</span>"
					}else{
						return value;
					}
				}},
				{field:"orgName", title:"组织机构", width:10},
				{field:"createTime", title:"创建日期", width:10}
			]],
			toolbar : '#tb',
			footer:'#ft'
		});
	}

	//获得选中行
	function getSelected() {
		var selected = $('#userGrid').datagrid('getSelected');
		return selected;
	}

	/**
	 * 公开方法
	 */
	var publicMethod = {
			
			//查询
			searchForm:function (){
				var param=$('#searchForm').serialize();
				var row = $('#orgTree').tree('getSelected');
				if(row)
					param+="&orgId="+row.id;
				$('#userGrid').datagrid({
					url : config.userListUrl()+"?"+param
				});
			},
			
			//显示新增
			showAdd:function (){
				$("#userDialog").dialog({modal:true}).dialog("open").dialog('setTitle','新增用户');
			 	$("#save").show();
			 	$("#edit").hide();
			 	$("#passwordTr").show();
			 	$("#submitForm").form('clear');
			},
			
			//显示修改
			showEdit:function (){
				var row = getSelected();
				if(row){
					$.getJSON(config.roleIdsUrl(),{id:row.id},function(json){
						$("#userDialog").dialog({modal:true}).dialog("open").dialog('setTitle','修改用户');
					 	$("#save").hide();
					 	$("#edit").show();
					 	$("#passwordTr").hide();
					 	$("#submitForm").form('load', row);
			            if(json!=null){
			    		 	$("#roleIds").combobox('setValues',json);
			            }
					});
				}else{
					Popbox.unSelectError();
				}
			},
			
			//锁定
			locked:function (){
				var row = getSelected();
				if(row){
					var msg = "";
					if(row.locked==1){
						msg = "是否要解锁这个用户";
					}else{
						msg = "是否要锁定这个用户";
					}
					var flag = Popbox.confirm(msg);
					if(flag){
						$.getJSON(config.lockUrl(),{id:row.id,lock:row.locked},function(json){
							if(json.success){
								 $("#userGrid").datagrid("reload");
							}
						});
					}
				}else{
					Popbox.unSelectError();
				}
			},
			
			//重置密码
			resetPass:function (){
				var row = getSelected();
				if(row){
					var pass = prompt("重置密码,长度在1-50之间");
					if(pass&&pass.length<50){
						$.post("${ctx}/security/user/resetPass",{id:row.id,pass:pass},
								  function(data){
							          Popbox.alert(data.message);
								  }, "json");
					}else{
						Popbox.alertError("密码格式输入有错误");
					}
				}else{
					Popbox.unSelectError();
				}
			},
			
			//提交表单
			formSubmit:function (operation){
				//验证表达提交是否有问题
				if(!$('#submitForm').form('validate')){
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
					  type:'post',
					  data: $('#submitForm').serialize(),
					  success: function(data){
						  Popbox.alert(data.message);
						  if(data.success){
							  $("#userGrid").datagrid("reload");
							  $('#userDialog').dialog('close');
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
	Super.security.user.init();
})