package com.superboo.base.security.user.service;

import java.util.List;
import java.util.Set;

import com.superboo.base.security.menu.entity.Menu;
import com.superboo.base.security.role.entity.Role;
import com.superboo.base.security.user.entity.User;
import com.superboo.core.pojo.Page;

/**
 * 
 * @author peiran zhang
 * @date 2016年12月2日
 */
public interface UserService {

	/**
	 * 锁定用户
	 * 
	 * @param id
	 * @author zhangpeiran 2016年5月12日 下午2:49:22
	 */
	void lock(Long id);

	/**
	 * 解锁用户
	 * 
	 * @param id
	 * @author zhangpeiran 2016年5月12日 下午2:50:47
	 */
	void unLock(Long id);
	
	/**
	 * 保存用户
	 * @param user
	 * @param roleIds
	 * @author zhangpeiran 2016年5月12日 下午1:52:37
	 */
	 void saveUser(User user,Long[] roleIds);
	
	/**
	 * 分页查询user
	 * @param orgId
	 * @param username
	 * @param realName
	 * @return
	 * @author zhangpeiran 2016年5月12日 上午11:08:10
	 */
	 Page<User> findPage(Page<User> page,Long orgId,String username,String realName);
	
	/**
	 * 根据用户名得到用户
	 * 
	 * @param username
	 * @return
	 * @author zhangpeiran 2016年5月9日 上午10:19:40
	 */
	 User findByUsername(String username);
	
	/**
	 * 根据用户名获得角色标识集合
	 * 
	 * @param username
	 * @return
	 * @author zhangpeiran 2016年5月9日 上午10:27:13
	 */
	 Set<String> findRoleCode(String username);
	
	/**
	 * 根据用户id返回角色list
	 * 
	 * @param id
	 * @return
	 * @author zhangpeiran 2016年5月9日 上午10:59:16
	 */
	 List<Role> findRoles(Long id);
	
	/**
	 * 根据用户名得到资源权限标识集合
	 * 
	 * @param username
	 * @return
	 * @author zhangpeiran 2016年5月9日 上午11:00:36
	 */
	 Set<String> findPermissions(String username);
	
	/**
	 * 根据用户id,返回拥有的所有菜单和权限
	 * 
	 * @param id
	 * @return
	 * @author zhangpeiran 2016年5月9日 上午11:01:17
	 */
	 List<Menu> findMenus(Long id);
	
	/**
	 * 重置密码
	 * @param id
	 * @param pass
	 * @author zhangpeiran 2016年6月6日 上午11:40:09
	 */
	 void resetPassword(Long id, String pass);
	
	/**
	 * 根据id返回一个用户
	 * @param id
	 * @return
	 * @author peiran zhang
	 * @date 2016年12月2日
	 */
	 User find(Long id);
	
	/**
	 * 修改最后登录时间
	 * @param id
	 * @author peiran zhang
	 * @date 2016年12月2日
	 */
	void setLastLoginTime(Long id);
}
