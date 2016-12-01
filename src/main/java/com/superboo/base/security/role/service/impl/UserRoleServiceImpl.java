package com.superboo.base.security.role.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.superboo.base.security.role.dao.UserRoleDao;
import com.superboo.base.security.role.entity.UserRole;
import com.superboo.base.security.role.service.UserRoleService;

/**
 * 用户角色业务层
 * 
 * @company 新龙科技
 * @author zhangpeiran
 * @version
 * @date 2016年5月9日 上午10:30:30
 */
@Service("userRoleService")
@Transactional
public class UserRoleServiceImpl implements UserRoleService {

	@Resource
	private UserRoleDao userRoleDao;

	@Override
	public boolean isRoleUsed(Long roleId) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("roleId", roleId);
		long count = userRoleDao.countResult("from UserRole where roleId = :roleId", paramMap);
		return (count > 0) ? true : false;
	}

	@Override
	public List<UserRole> findByUserId(Long userId) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("userId", userId);
		List<UserRole> list = userRoleDao.executeQuery("from UserRole where userId = :userId ", paramMap);
		return list;
	}

	@Override
	public void save(Long userId, Long... roleIds) {
		//先删除用户角色关系
		Map<String,Object> map = new HashMap<>();
		map.put("userId",userId);
		userRoleDao.executeUpdate("delete from UserRole where userId = :userId",map);
		//再保存
		for (Long id : roleIds) {
			UserRole ur = new UserRole();
			ur.setUserId(userId);
			ur.setRoleId(id);
			userRoleDao.save(ur);
		}
	}

}
