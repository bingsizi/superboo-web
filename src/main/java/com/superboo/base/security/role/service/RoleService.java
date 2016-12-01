package com.superboo.base.security.role.service;

import java.util.List;

import com.superboo.base.security.role.entity.Role;

/**
 * 角色业务接口
 * 
 * @author peiran zhang
 * @date 2016年12月1日
 */
public interface RoleService {

	/**
	 * 删除角色,连同角色菜单表中的数据一起删除
	 * 
	 * @param role
	 * @author zhangpeiran 2016年5月11日 下午2:26:27
	 */
	void remove(Role role);

	/**
	 * 判断角色有没有被使用
	 * 
	 * @param id
	 * @return
	 * @author zhangpeiran 2016年5月11日 下午2:23:28
	 */
	boolean isUsed(Long id);

	/**
	 * 根据ids获得roles
	 * 
	 * @param ids
	 * @return
	 * @author zhangpeiran 2016年5月9日 上午10:38:28
	 */
	List<Role> findByIds(Long... ids);

	/**
	 * 根据userId获得拥有的roleIds
	 * 
	 * @param userId
	 * @return
	 * @author zhangpeiran 2016年5月9日 上午10:35:50
	 */
	Long[] findRoleIds(Long userId);

	/**
	 * 保存人员角色
	 * 
	 * @param userId
	 * @param roleIds
	 * @author zhangpeiran 2016年5月9日 下午5:29:56
	 */
	void saveUserRole(Long userId, Long... roleIds);
	
	/**
	 * 获得全部角色
	 * @return
	 * @author peiran zhang
	 * @date 2016年12月1日
	 */
	List<Role> findAll();
	
	/**
	 *新增一个角色
	 * @param role
	 * @author peiran zhang
	 * @date 2016年12月1日
	 */
	void save(Role role);
	
	/**
	 * 根据id返回
	 * @param id
	 * @return
	 * @author peiran zhang
	 * @date 2016年12月1日
	 */
	Role find(Long id);
}
