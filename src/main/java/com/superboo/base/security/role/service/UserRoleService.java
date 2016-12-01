package com.superboo.base.security.role.service;

import java.util.List;

import com.superboo.base.security.role.entity.UserRole;

/**  
 * 用户角色业务接口
 * @author peiran zhang
 * @date 2016年12月1日
 */
public interface UserRoleService {
	
	/**
	 * 判断角色是否被使用
	 * @param roleId
	 * @return
	 * @author peiran zhang
	 * @date 2016年12月1日
	 */
	 boolean isRoleUsed(Long roleId);
	 
	 /**
	  * 根据userId,获得用户角色信息
	  * @param userId
	  * @return
	  * @author peiran zhang
	  * @date 2016年12月1日
	  */
	 List<UserRole> findByUserId(Long userId);
	 
	 /**
	  * 保存人员角色
	  * @param userId
	  * @param roleIds
	  * @author peiran zhang
	  * @date 2016年12月1日
	  */
	 void save(Long userId, Long... roleIds);
}
