package com.superboo.core.basemoudel.controller.admin;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import com.superboo.core.Constants;
import com.superboo.core.basemoudel.service.ServiceManager;
import com.superboo.core.pojo.Page;

/**
 * 基础 Controller，所有Controller都应继承此类
 */
public class AdminController {
	
	@Resource
	protected ServiceManager serviceManager;
	
	
	/**
	 * 根据easyui Grid的分页插件上传参数,构建的page
	 * @param request
	 * @return
	 * @author zhangpeiran 2016年4月28日 上午9:30:18
	 */
	@SuppressWarnings("rawtypes")
	protected Page buildEasyUiPage(ServletRequest request){
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		Integer pageNo =null,pageSize=null;
		if(null != page)
			pageNo = Integer.valueOf(page);
		else{
			pageNo=1;
		}
		if(null != rows)
			pageSize = Integer.valueOf(rows);
		else{
			pageSize = Constants.ADMIN_PAGE_SIZE;
			
		}
		return new Page(pageNo, pageSize);
	}
	
	
	
	/**
	 * 获取request
	 * @return
	 */
	public static HttpServletRequest getRequest() {
		try{
			ServletRequestAttributes sr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
			return sr.getRequest();
		}catch(Exception ex){
			return null;
		}
	}


	/**
	 * 返回成功信息
	 * 
	 * @param msg
	 * @return
	 */
	protected Msg getSuccessMsg(String msg) {
		Msg successMsg = new Msg();
		successMsg.setSuccess(true);
		successMsg.setMessage(msg);
		return successMsg;
	}

	/**
	 * 返回失败信息
	 * 
	 * @param msg
	 * @return
	 */
	protected Msg getErrorMsg(String msg) {
		Msg successMsg = new Msg();
		successMsg.setSuccess(false);
		successMsg.setMessage(msg);
		return successMsg;
	}
}
