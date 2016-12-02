<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglib.jsp"%>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/common/base.jsp"%>
<%@ include file="/common/jqueryEasyUi.jsp"%>
<%@ include file="/common/superFramework.jsp"%>
<script type="text/javascript" src="${ctx}/model/security/user/user.js"></script>
<title>用户管理</title>
</head>
<body class="easyui-layout">
	<!-- 西 -->
	<div id="west" data-options="region:'west',split:true,border:false" style="width:180px;padding: 10px;">
       <ul id="orgTree"></ul>  
	</div>
	<!-- 中 -->
	<div data-options="region:'center',border:false">
	    <table id="userGrid"></table>
	</div>
	<!-- toolbar -->
	<div id="tb" style="padding:5px 5px;">
	    <form id="searchForm">
			<span style="margin: 0px 2px">用户名：</span><input id="usernameSearch" type="text" name="username" style="width: 100px;"/>
			<span style="margin: 0px 2px">真实姓名：</span><input id="realNameSearch" type="text" name="realName" style="width: 100px;"/>
		    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="Super.security.user.method.searchForm();">搜索</a>
		</form>
	</div>
	<!-- footer -->
	<div id="ft" style="padding:2px 5px;">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="Super.security.user.method.showAdd();">新增</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:true" onclick="Super.security.user.method.showEdit();">修改</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="Super.security.user.method.locked();">锁定/解锁</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-pass',plain:true" onclick="Super.security.user.method.resetPass();">重置密码</a>
	</div>
	<!-- 增加/修改用户-->
	<div id="userDialog" class="easyui-dialog" style="width:390px; height:400px; padding:10px 20px;"  data-options="closed:true">
		<form  id="submitForm">
		    <input type="hidden" name="id"/>
			<table class="table">
				<tr>
					<td align="right">用户名：</td>
					<td>
					   <input type="text" name="username" class="input bd-notnull"/>
					</td>
				</tr>
				<tr id="passwordTr">
					<td align="right">密码：</td>
					<td>
					   <input type="password" name="password" class="input bd-notnull"/>
					</td>
				</tr>
				<tr>
					<td align="right">真实姓名：</td>
					<td>
					    <input type="text" name="realName" class="input"/>
					</td>
				</tr>
				<tr>
					<td align="right">组织机构：</td>
					<td>
					    <select id="orgId" name="orgId" class="easyui-combotree" style="width:200px;" data-options="url:'${ctx}/security/user/orgTree'"></select>
					</td>
				</tr>
				<tr>
					<td align="right">角色：</td>
					<td>
					     <select id="roleIds" name="roleIds" class="easyui-combobox" style="width:200px;" data-options="url:'${ctx}/security/user/roleList',valueField:'id',textField:'name',required:true,editable:false,multiple:true"></select>
					</td>
				</tr>
				<tr>
				   <td align="center" colspan="2">
				       <a href="#" id="save" onclick="Super.security.user.method.formSubmit('save')" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">保存</a>
				       <a href="#" id="edit" onclick="Super.security.user.method.formSubmit('edit')" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">更新</a>
				       <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="javascript:$('#userDialog').dialog('close');">取消</a>
				   </td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>