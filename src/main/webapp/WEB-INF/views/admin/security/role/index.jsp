<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglib.jsp"%>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/common/base.jsp"%>
<%@ include file="/common/jqueryEasyUi.jsp"%>
<script type="text/javascript" src="${ctx}/static/script/superJs.1.0.js"></script>
<script type="text/javascript" src="${ctx}/static/script/widget/popbox.js"></script>
<script type="text/javascript" src="${ctx}/static/model/admin/security/role/role.js"></script>
<title>角色管理</title>
</head>
<body style="margin: 0px;">
<table id="roleGrid"></table>
<!-- footer -->
<div id="ft" style="padding:2px 5px;">
	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="Super.security.role.method.showAdd();">新增</a>
	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:true" onclick="Super.security.role.method.showEdit();">修改</a>
	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="Super.security.role.method.remove();">删除</a>
	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-menu',plain:true" onclick="Super.security.role.method.setMenu();">菜单</a>
</div>
<!-- 增加/修改角色框 -->
<div id="roleDialog" class="easyui-dialog" style="width:400px; height:400px;" data-options="closed:true">
	<form id="submitForm">
	    <input type="hidden" name="id"/>
		<table class="table">
			<tr>
				<td align="right">角色名称:</td>
				<td>
				   <input name="name" type="text" class="input bd-notnull">
				</td>
			</tr>
			<tr>
				<td align="right">标识:</td>
				<td>
				   <input name="code" type="text" class="input bd-notnull">
				   <br>
				   <span style="color:#d5d5d5;">(用拼音或者英文)</span>
				</td>
			</tr>
			<tr>
				<td class="td_marked">备注：</td>
				<td class="td_content">
				   <textarea name="description" cols="30" rows="3" class="input textarea"></textarea>
				</td>
			</tr>
			<tr>
			   <td class="td_content" colspan="2" align="center">
			        <a href="#" id="save" onclick="Super.security.role.method.formSubmit('save')" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a>
					<a href="#" id="edit" onclick="Super.security.role.method.formSubmit('edit')" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">保存</a>
					<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="javascript:$('#roleDialog').dialog('close');">取消</a>
			   </td>
			</tr>
		</table>
	</form>
</div>
<!-- 菜单配置框 -->
<div id="menuDialog" class="easyui-dialog" style="width:350px; height:400px; padding:10px 20px;" closed="true">
	<ul id="menuTree" class="easyui-tree" data-options="animate:true,checkbox:true,lines:true,cascadeCheck:false"></ul> 
	<br>
    <div class="buttonContent" style="text-align: center;">
		<a href="#" id="menuSave" onclick="Super.security.role.method.saveMenu();" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">保存</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="javascript:$('#menuDialog').dialog('close');">关闭</a>
	</div> 
    <br>
</div>
</body>
</html>