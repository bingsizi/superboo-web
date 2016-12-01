package com.superboo.base.security.menu.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import com.superboo.core.basemoudel.entity.IdEntity;

/**
 * 角色菜单表
 * 
 * @author zhangpeiran
 * @version
 * @date 2016年5月9日 上午10:12:22
 */
@Entity
@Table(name = "sys_role_menu")
public class RoleMenu extends IdEntity {

	private Long roleId;
	private Long menuId;

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public Long getMenuId() {
		return menuId;
	}

	public void setMenuId(Long menuId) {
		this.menuId = menuId;
	}
}
