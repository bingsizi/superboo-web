<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglib.jsp"%>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/common/base.jsp"%>
<%@ include file="/common/jqueryEasyUi.jsp"%>
<script type="text/javascript" src="${ctx}/static/script/superJs.1.0.js"></script>
<script type="text/javascript" src="${ctx}/static/script/widget/popbox.js"></script>
<script type="text/javascript" src="${ctx}/static/model/admin/security/menu/menu.js"></script>
<title>菜单管理</title>
</head>
<body style="margin: 0px;">
<table id="menuGrid"></table>
<!-- toolbar -->
<div id="tb" style="padding:5px 5px;">
    <form id="searchForm">
		<span style="margin: 0px 2px">菜单名称：</span><input type="text" name="name" style="width:200px;"/>
	    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="Super.security.menu.method.searchForm();">搜索</a>
	</form>
</div>
<!-- footer -->
<div id="ft" style="padding:2px 5px;">
	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="Super.security.menu.method.showAdd();">新增</a>
	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:true" onclick="Super.security.menu.method.showEdit();">修改</a>
	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="Super.security.menu.method.remove();">删除</a>
</div>
<!-- 增加/修改菜单框 -->
<div id="menuDialog" class="easyui-dialog" style="width:500px; height:400px;padding:5px;"  data-options="closed:true">
	<form  id="menuForm">
	    <input type="hidden" name="id"/>
		<table class="table">
			<tr>
				<td align="right">菜单名称:</td>
				<td>
				   <input name="name" type="text" class="input bd-notnull">
				</td>
			</tr>
			<tr>
				<td align="right">类型:</td>
				<td>
				   <select name="type"  class="input">
				       <option value="菜单">菜单</option>
				       <option value="功能权限">功能权限</option>
				   </select>
				</td>
			</tr>
			<tr>
				<td align="right">上级菜单:</td>
				<td>
			        <select name="parentId" class="easyui-combotree" style="width:200px;" data-options="url:'${ctx}/security/menu/menuTree',onShowPanel:function(){
			           $(this).combotree('reload','${ctx}/security/menu/menuTree')
			        }"></select>
				</td>
			</tr>
			<tr>
				<td align="right">菜单初始首页:</td>	
				<td>
				   <input name="indexUrl" type="text"  class="input">
				</td>
			</tr>
			<tr>
				<td align="right">顺序:</td>	
				<td>
				   <input name="seq" type="text" class="input">
				</td>
			</tr>
			<tr>
				<td align="right">图标:</td>	
				<td>
				   <input name="icon" type="text" class="input">
				</td>
			</tr>
			<tr>
				<td align="right">权限:</td>	
				<td>
				   <input name="permission" type="text" class="input">
				</td>
			</tr>
			<tr>
			   <td colspan="2" align="center">
				   <a href="#" id="save" onclick="Super.security.menu.method.formSubmit('save')" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a>
				   <a href="#" id="edit" onclick="Super.security.menu.method.formSubmit('edit')" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">更新</a>
				   <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="javascript:$('#menuDialog').dialog('close');">关闭</a>
			   </td>
			</tr>
		</table>
	</form>
</div>
</body>
</html>