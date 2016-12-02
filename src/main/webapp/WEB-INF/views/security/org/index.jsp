<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglib.jsp"%>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/common/base.jsp"%>
<%@ include file="/common/jqueryEasyUi.jsp"%>
<%@ include file="/common/superFramework.jsp"%>
<script type="text/javascript" src="${ctx}/model/security/org/org.js"></script>
<title>组织机构管理</title>
</head>
<body style="margin: 0px;">
<!-- tree -->
<table id="orgTree"></table>
<!-- 增加/修改组织 -->
<div id="orgDialog" class="easyui-dialog" style="width:390px; height:320px; padding:10px 20px;"  data-options="closed:true">
	<form id="orgForm">
	    <input type="hidden" name="id"/>
	    <input type="hidden" id="_parentId" name="parentId"/>
		<table class="table">
			<tr>
				<td align="right">上级：</td>
				<td>
				   <span id="parentName"></span>
				</td>
			</tr>
			<tr>
				<td align="right">组织名称：</td>
				<td>
				   <input type="text" name="name" class="input bd-notnull"/>
				</td>
			</tr>
			<tr>
				<td align="right">编码：</td>
				<td>
				   <input type="text" name="code" class="input bd-notnull"/>
				</td>
			</tr>
			<tr>
			   <td align="center" colspan="2">
			        <a href="#" id="save" onclick="Super.security.org.method.formSubmit('save')" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">保存</a>
					<a href="#" id="edit" onclick="Super.security.org.method.formSubmit('edit')" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">更新</a>
					<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="javascript:$('#orgDialog').dialog('close');">取消</a>
			   </td>
			</tr>
		</table>
	</form>
</div>
</body>
</html>