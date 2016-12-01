package com.superboo.base.security.menu.service.impl;

import java.util.List;

import javax.annotation.Resource;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.superboo.base.security.menu.dao.RoleMenuDao;
import com.superboo.base.security.menu.entity.RoleMenu;
import com.superboo.base.security.menu.service.RoleMenuService;

/**  
 * 角色资源业务层
 * @company 新龙科技
 * @author zhangpeiran
 * @version 
 * @date 2016年5月9日 上午11:03:01
 */
@Service("roleMenuService")
@Transactional
public class RoleMenuServiceImpl implements RoleMenuService{
	
	@Resource
	private RoleMenuDao roleMenuDao;
	
	/**
	 * 判断menu是否使用过
	 * @param menuId
	 * @return
	 * @author zhangpeiran 2016年5月11日 上午9:49:37
	 */
	@Transactional(readOnly = false)
	@Override
	public boolean isMenuUsed(Long menuId){
		int count = roleMenuDao.countResult(roleMenuDao.createCriteria(Restrictions.eq("menuId", menuId)));
		return (count>0)?true:false;
	}

	@Override
	public void save(RoleMenu rm) {
		roleMenuDao.save(rm);
	}

	@Override
	public List<RoleMenu> findByRoleIds(Long[] roleIds) {
		return roleMenuDao.executeQuery(Restrictions.in("roleId", roleIds));
	}
}
