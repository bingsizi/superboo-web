package com.superboo.core.basemoudel.service;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.superboo.base.security.menu.service.MenuService;

/**  
 * 业务接口管理类
 * @author peiran zhang
 * @date 2016年11月30日
 */
@Service
public class ServiceManager {
	
	@Resource
	public MenuService menuService;
}
