package com.superboo.base.security.menu.service;

import java.util.List;

import com.superboo.base.security.menu.entity.RoleMenu;

/**  
 * 角色菜单业务层
 * @author peiran zhang
 * @date 2016年11月30日
 */
public interface RoleMenuService {
	
	/**
	 * 判断菜单是否被角色所引用
	 * @param menuId
	 * @return
	 * @author peiran zhang
	 * @date 2016年11月30日
	 */
	boolean isMenuUsed(Long menuId);

	/**
	 * 保存角色菜单
	 * @param rm
	 * @author peiran zhang
	 * @date 2016年11月30日
	 */
	void save(RoleMenu rm);
	
	/**
	 * 根据roleIds返回角色菜单
	 * @param roleIds
	 * @return
	 * @author peiran zhang
	 * @date 2016年11月30日
	 */
	List<RoleMenu> findByRoleIds(Long[] roleIds);
}
