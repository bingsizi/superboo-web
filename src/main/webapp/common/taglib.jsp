<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%
	pageContext.setAttribute("v", "1.0");
%>
<c:set var="v" value="?v=${v}" />
<script>var basePath = "${ctx}"</script>