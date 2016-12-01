package com.superboo.moudels.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.superboo.core.basemoudel.controller.admin.AdminController;

/**  
 * 
 * @author peiran zhang
 * @date 2016年12月1日
 */
@Controller
@RequestMapping("admin/main")
public class MainController extends AdminController{
	
	
	@RequestMapping("menu")
	@ResponseBody
	public Object menu(){
		 return serviceManager.menuService.findTreeMenus();
	}
}
