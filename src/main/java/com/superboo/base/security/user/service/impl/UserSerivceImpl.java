package com.superboo.base.security.user.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.superboo.base.security.menu.entity.Menu;
import com.superboo.base.security.menu.service.MenuService;
import com.superboo.base.security.role.entity.Role;
import com.superboo.base.security.role.service.RoleService;
import com.superboo.base.security.user.Dao.UserDao;
import com.superboo.base.security.user.entity.User;
import com.superboo.base.security.user.service.UserService;
import com.superboo.core.pojo.Page;
import com.superboo.core.util.DateUtils;
import com.superboo.core.util.EncryptionUtil;

/**
 * 用户业务层
 * 
 * @author zhangpeiran
 * @version
 * @date 2016年5月9日 上午10:17:15
 */
@Service("userService")
@Transactional
public class UserSerivceImpl implements UserService{
	
	@Resource
	private UserDao userDao;
	@Resource
	private RoleService roleService;
	@Resource
	private MenuService menuService;
	
	@Override
	public void lock(Long id){
		Map<String,Object> map = new HashMap<>();
		map.put("id",id);
		map.put("locked",1);
		userDao.executeUpdate("update User set locked=:locked where id=:id", map);
	}

	@Override
	public void unLock(Long id){
		Map<String,Object> map = new HashMap<>();
		map.put("id",id);
		map.put("locked",0);
		userDao.executeUpdate("update User set locked=:locked where id=:id", map);
	}
	
	@Override
	public void saveUser(User user,Long[] roleIds){
		//先保存user
		if(user.getCreateTime()==null){
			user.setCreateTime(DateUtils.getSystemTime());
		}
		//修改时不修改密码
		if(user.getId()==null){
			//加密
			user.setPassword(EncryptionUtil.md5ToBase64(user.getPassword()));
		}
		
		userDao.save(user);
		//再保存用户角色
		roleService.saveUserRole(user.getId(), roleIds);
	}
	
	@Transactional(readOnly = true)
	@Override
	public Page<User> findPage(Page<User> page,Long orgId,String username,String realName){
	    String hql = "select u,o.name from User u,Org o where u.orgId = o.id ";
	    Map<String,Object> paramMap = new HashMap<>();
	    if(orgId!=null){
	    	hql+=" and o.id =:orgId";
	    	paramMap.put("orgId", orgId);
	    }
	    if(StringUtils.isNoneEmpty(username)){
	    	hql+=" and u.username like :username";
	    	paramMap.put("username","%"+username+"%");
	    }
	    if(StringUtils.isNoneEmpty(realName)){
	    	hql+=" and u.realName like :realName";
	    	paramMap.put("realName","%"+realName+"%");
	    }
	    
	    hql+=" order by u.createTime desc";
	    Page<User> returnPage = userDao.findPage(page, hql, paramMap);
	    //进行二次封装
	    if(returnPage.getTotal()>0){
	    	List<User> userList = new ArrayList<>();
	    	for(Object obj:returnPage.getRows()){
	    		Object[] objs = (Object[])obj;
	    		User user = (User)objs[0];
	    		String orgName = objs[1].toString();
	    		if(StringUtils.isNotEmpty(orgName)){
	    			user.setOrgName(orgName);
	    		}
	    		userList.add(user);
	    	}
	    	returnPage.setRows(userList);
	    }
	    return returnPage;
	}

	@Transactional(readOnly = true)
	@Override
	public User findByUsername(String username) {
		String hql = "from User where username = :username";
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("username", username);
		List<User> list = userDao.executeQuery(hql, paramMap);
		return (list.size() > 0) ? list.get(0) : null;
	}

	@Transactional(readOnly = true)
	@Override
	public Set<String> findRoleCode(String username) {
		Set<String> roleSet = new HashSet<>();
		User user = findByUsername(username);
		if (user != null) {
			Long[] roleIds = roleService.findRoleIds(user.getId());
			if (roleIds.length > 0) {
				List<Role> roleList = roleService.findByIds(roleIds);
				for (Role role : roleList) {
					roleSet.add(role.getCode());
				}
			}
		}
		return roleSet;
	}

	@Transactional(readOnly = true)
	@Override
	public List<Role> findRoles(Long id) {
		User user = find(id);
		if (user != null) {
			Long[] roleIds = roleService.findRoleIds(user.getId());
			if (roleIds.length > 0) {
				return roleService.findByIds(roleIds);
			}
		}
		return Collections.emptyList();
	}

	@Transactional(readOnly = true)
	@Override
	public Set<String> findPermissions(String username) {
		Set<String> permissionSet = new HashSet<>();
		User user = findByUsername(username);
		if (user != null) {
			List<Menu> list = findMenus(user.getId());
			for (Menu menu : list) {
				String permission = menu.getPermission();
				if (StringUtils.isNotBlank(permission)) {
					permissionSet.add(permission);
				}
			}
			return permissionSet;
		}
		return permissionSet;
	}

	@Transactional(readOnly = true)
	@Override
	public List<Menu> findMenus(Long id) {
		User user = find(id);
		if (user != null) {
			Long[] roleIds = roleService.findRoleIds(user.getId());
			if (roleIds.length > 0) {
				Long[] menuIds = menuService.findMenuIds(roleIds);
				if (menuIds.length > 0) {
					return menuService.findByIds(menuIds);
				}
			}
		}
		return Collections.emptyList();
	}
	
	@Override
	public void resetPassword(Long id, String pass) {
		Map<String,Object> map = new HashMap<>();
		map.put("password",EncryptionUtil.md5ToBase64(pass));
		map.put("id",id);
		String hql = "update User set password = :password where id=:id";
		userDao.executeUpdate(hql,map);
	}
	
	@Transactional(readOnly = true)
	@Override
	public User find(Long id){
		return userDao.findById(id);
	}

	@Override
	public void setLastLoginTime(Long id) {
		
		Map<String,Object> map = new HashMap<>();
		map.put("lastLoginTime",DateUtils.getSystemTime());
		map.put("id",id);
		String hql = "update User set lastLoginTime = :lastLoginTime where id=:id";
		userDao.executeUpdate(hql,map);
	}
}
