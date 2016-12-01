<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglib.jsp"%>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/common/jqueryEasyUi.jsp"%>
<script type="text/javascript" src="${ctx}/static/superJs/superJs.1.0.js"></script>
<script type="text/javascript" src="${ctx}/model/admin/main.js"></script>
<title>首页</title>
<script>
$(function(){
	Super.admin.main.init();
});
</script>
</head>
<body class="easyui-layout">
	<div data-options="region:'north',border:false" style="height:60px;background-color: #2d3e50;color:#fff;">
		<h3>标题题目</h3>
	</div>
	<!-- 西 -->
	<div id="west" data-options="region:'west',split:true,hideCollapsedContent:false" title="菜单" style="width:150px; padding:5px;">
		<ul id="menu" class="easyui-tree"></ul>
	</div>
    <!-- 中间部分 -->
    <div id="content" data-options="region:'center',title:'Main Title'">
    	<iframe frameborder="0" name="mainWork" width="100%" height="100%"></iframe>
    </div>
</body>
</html>
