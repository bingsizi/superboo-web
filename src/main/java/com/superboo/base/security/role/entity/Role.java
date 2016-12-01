package com.superboo.base.security.role.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import com.superboo.core.basemoudel.entity.IdEntity;

/**
 * 角色表
 * 
 * @author zhangpeiran
 * @version
 * @date 2016年5月9日 上午9:46:08
 */
@Entity
@Table(name = "sys_role")
public class Role extends IdEntity {
	private String name;// 角色名称
	private String code;// 角色code码,请用英文.用以放入到权限中
	private String description;// 角色描述

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
