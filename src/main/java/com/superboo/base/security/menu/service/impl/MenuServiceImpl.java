package com.superboo.base.security.menu.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import javax.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.superboo.base.security.menu.dao.MenuDao;
import com.superboo.base.security.menu.entity.Menu;
import com.superboo.base.security.menu.entity.RoleMenu;
import com.superboo.base.security.menu.service.MenuService;
import com.superboo.base.security.menu.service.RoleMenuService;
import com.superboo.core.easyui.vo.Tree;
import com.superboo.core.pojo.Page;

/**
 * 资源业务层
 * 
 * @author zhangpeiran
 * @version
 * @date 2016年5月9日 上午11:03:36
 */
@Service("menuService")
@Transactional
public class MenuServiceImpl implements MenuService {

	@Resource
	private MenuDao menuDao;

	@Resource
	private RoleMenuService roleMenuService;


	@Override
	public void save(Menu menu) {
		if (menu.getParentId() != null) {
			Menu pareMenu = find(menu.getParentId());
			if (pareMenu != null) {
				String parentIds = "";
				if (StringUtils.isNoneBlank(pareMenu.getParentIds())) {
					parentIds = pareMenu.getParentIds() + pareMenu.getId() + "/";
				} else {
					parentIds = "/" + pareMenu.getId() + "/";
				}
				menu.setParentIds(parentIds);
			}
		}
		menuDao.save(menu);
	}

	@Transactional(readOnly = true)
	@Override
	public Menu find(Long id) {
		return menuDao.findById(id);
	}

	@Transactional(readOnly = true)
	@Override
	public boolean isUsed(Long id) {
		return roleMenuService.isMenuUsed(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Menu> findChilds(Long id) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("parentId", id);
		return menuDao.executeQuery("from Menu where parentId=:parentId order by seq", paramMap);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Menu> findRootMenus() {
		String queryString = "from Menu where parentId is null or parentId='' order by seq";
		return menuDao.executeQuery(queryString, new HashMap<String, Object>());
	}

	@Transactional(readOnly = true)
	@Override
	public Page<Menu> findByPage(Page<Menu> page, String name) {
		Map<String, Object> paramMap = new HashMap<>();
		String hql = "from Menu where 1=1 ";
		if (StringUtils.isNoneBlank(name)) {
			hql += " and name = :name";
			paramMap.put("name", name);
		}
		return menuDao.findPage(page, hql, paramMap);
	}

	@Override
	public void saveRoleMenu(Long roleId, Long[] menuIds) {
		// 首先删除角色原有菜单配置
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("roleId", roleId);
		menuDao.executeUpdate("delete from RoleMenu where roleId=:roleId", paramMap);
		// 保存新的菜单项
		for (Long menuId : menuIds) {
			RoleMenu rm = new RoleMenu();
			rm.setRoleId(roleId);
			rm.setMenuId(menuId);
			roleMenuService.save(rm);
		}
	}

	@Transactional(readOnly = true)
	@Override
	public List<Menu> findByIds(Long... ids) {
		return menuDao.executeQuery(Restrictions.in("id", ids));
	}

	@Transactional(readOnly = true)
	@Override
	public Long[] findMenuIds(Long... roleIds) {

		List<RoleMenu> list = roleMenuService.findByRoleIds(roleIds);

		Long[] menuIds = new Long[list.size()];
		for (int i = 0; i < list.size(); i++) {
			menuIds[i] = list.get(i).getMenuId();
		}
		// 排重
		if (menuIds.length > 1) {
			Set<Long> set = new TreeSet<>();
			for (Long id : menuIds) {
				set.add(id);
			}
			Long[] ids = new Long[set.size()];
			int j = 0;
			for (Long id : set) {
				ids[j++] = id;
			}
			return ids;
		}
		return menuIds;
	}

	@Transactional(readOnly = true)
	@Override
	public long countNum() {
		return menuDao.countResult("from Menu", new HashMap<>());
	}

	@Transactional(readOnly = true)
	@Override
	public List<Tree> findTreeMenus() {
		List<Tree> treeList = new ArrayList<Tree>();
		List<Menu> rootMenuList = findRootMenus();
		if (rootMenuList.size() > 0) {
			for (Menu menu : rootMenuList) {
				Tree tree = new Tree();
				tree.setId(menu.getId() + "");
				tree.setText(menu.getName());
				tree.setIconCls(menu.getIcon());
				tree.setObj(menu.getIndexUrl());
				setChildrenList(menu, tree);
				treeList.add(tree);
			}
		}
		return treeList;
	}

	/**
	 * 设置子菜单List
	 * 
	 * @param menu
	 * @param tv
	 * @return
	 */
	private Menu setChildrenList(Menu menu, Tree tv) {
		List<Menu> childrenList = findChilds(menu.getId());
		if (childrenList.size() > 0) {
			List<Tree> treeList = new ArrayList<Tree>();
			for (Menu tempMenu : childrenList) {
				Tree treevo = new Tree();
				treevo.setId(tempMenu.getId() + "");
				treevo.setText(tempMenu.getName());
				treevo.setIconCls(tempMenu.getIcon());
				treevo.setObj(tempMenu.getIndexUrl());
				treeList.add(treevo);
				setChildrenList(tempMenu, treevo);
			}
			tv.setChildren(treeList);
		}
		return menu;
	}

	@Transactional(readOnly = true)
	@Override
	public void remove(Long id) {
		menuDao.deleteById(id);
	}
}
