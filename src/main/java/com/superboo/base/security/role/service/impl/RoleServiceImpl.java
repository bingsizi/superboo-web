package com.superboo.base.security.role.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.superboo.base.security.menu.service.RoleMenuService;
import com.superboo.base.security.role.dao.RoleDao;
import com.superboo.base.security.role.entity.Role;
import com.superboo.base.security.role.entity.UserRole;
import com.superboo.base.security.role.service.RoleService;
import com.superboo.base.security.role.service.UserRoleService;

/**
 * 角色业务层
 * 
 * @author zhangpeiran
 * @version
 * @date 2016年5月9日 上午10:36:48
 */
@Service("roleService")
@Transactional
public class RoleServiceImpl implements RoleService {
	
	@Resource
	private RoleDao roleDao;

	@Resource
	private UserRoleService userRoleService;
	@Resource
	private RoleMenuService roleMenuService;
	
	/**
	 * 删除角色,连同角色菜单表中的数据一起删除
	 * @param role
	 * @author zhangpeiran 2016年5月11日 下午2:26:27
	 */
	@Override
	public void remove(Role role){
		//删除角色菜单表中对应数据
		Map<String,Object> paramMap = new HashMap<>();
		paramMap.put("roleId",role.getId());
		roleMenuService.removeByRoleId(role.getId());
		//删除角色
		roleDao.delete(role);
	}
	
	/**
	 * 判断角色有没有被使用
	 * @param id
	 * @return
	 * @author zhangpeiran 2016年5月11日 下午2:23:28
	 */
	@Transactional(readOnly = true)
	@Override
	public boolean isUsed(Long id){
		return userRoleService.isRoleUsed(id);
	}
	
	/**
	 * 根据ids获得roles
	 * 
	 * @param ids
	 * @return
	 * @author zhangpeiran 2016年5月9日 上午10:38:28
	 */
	@Transactional(readOnly = true)
	@Override
	public List<Role> findByIds(Long... ids) {
		return roleDao.executeQuery(Restrictions.in("id",ids));
	}

	/**
	 * 根据userId获得拥有的roleIds
	 * 
	 * @param userId
	 * @return
	 * @author zhangpeiran 2016年5月9日 上午10:35:50
	 */
	@Transactional(readOnly = true)
	@Override
	public Long[] findRoleIds(Long userId) {
		List<UserRole> list = userRoleService.findByUserId(userId);
		Long[] roleIds = new Long[list.size()];
		for (int i = 0; i < list.size(); i++) {
			roleIds[i] = list.get(i).getRoleId();
		}
		return roleIds;
	}

	/**
	 * 保存人员角色
	 * 
	 * @param userId
	 * @param roleIds
	 * @author zhangpeiran 2016年5月9日 下午5:29:56
	 */
	@Override
	public void saveUserRole(Long userId, Long... roleIds) {
		userRoleService.save(userId, roleIds);
	}

	@Override
	public List<Role> findAll() {
		return roleDao.findAll();
	}

	@Override
	public void save(Role role) {
		roleDao.save(role);
	}

	@Override
	public Role find(Long id) {
		return roleDao.findById(id);
	}
}
