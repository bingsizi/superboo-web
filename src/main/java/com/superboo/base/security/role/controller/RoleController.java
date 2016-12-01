package com.superboo.base.security.role.controller;

import java.util.Collections;
import java.util.List;
import javax.servlet.ServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.superboo.base.security.role.entity.Role;
import com.superboo.core.basemoudel.controller.admin.AdminController;
import com.superboo.core.easyui.vo.Tree;

/**
 * 角色管理
 * 
 * @author zhangpeiran
 * @version
 * @date 2016年5月11日 下午1:54:44
 */
@RequestMapping("/security/role")
@Controller
public class RoleController extends AdminController {
	/**
	 * 跳转页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "index")
	public String index() {
		return "security/role/index";
	}

	/**
	 * 获得全部角色
	 * 
	 * @return
	 */
	@RequestMapping(value = "list")
	@ResponseBody
	public Object list(ServletRequest request) {
		return serviceManager.roleService.findAll();
	}

	/**
	 * 增加一个角色
	 * 
	 * @param role
	 * @return
	 */
	@RequestMapping(value = "save")
	@ResponseBody
	public Object saveRole(ServletRequest request) {
		try {

			String name = request.getParameter("name");
			String code = request.getParameter("code");
			String description = request.getParameter("description");

			// 验证角色名称是否为空
			if (StringUtils.isEmpty(name)) {
				return getErrorMsg("角色名称不能为空");
			}
			if (StringUtils.isEmpty(code)) {
				return getErrorMsg("角色编号不能为空");
			}

			Role role = new Role();
			role.setName(name);
			role.setCode(code);
			role.setDescription(description);

			serviceManager.roleService.save(role);

			return getSuccessMsg("保存角色成功,角色名称为:" + role.getName());
		} catch (Exception e) {
			e.printStackTrace();
			return getErrorMsg(e.getMessage());
		}
	}

	/**
	 * 修改一个角色
	 * 
	 * @param role
	 * @return
	 */
	@RequestMapping(value = "update")
	@ResponseBody
	public Object updateRole(ServletRequest request) {
		try {

			String id = request.getParameter("id");
			String name = request.getParameter("name");
			String code = request.getParameter("code");
			String description = request.getParameter("description");

			// 验证角色ID是否为空
			if (StringUtils.isBlank(id)) {
				return getErrorMsg("ID不能为空");
			}

			// 验证角色名称是否为空
			if (StringUtils.isBlank(name)) {
				return getErrorMsg("角色名称不能为空");
			}

			// 验证角色标识是否为空
			if (StringUtils.isBlank(code)) {
				return getErrorMsg("角色标识不能为空");
			}

			// 验证角色是否存在
			Role oldRole = serviceManager.roleService.find(Long.valueOf(id));
			if (oldRole == null)
				return getErrorMsg("未找到要修改的角色");

			oldRole.setName(name);
			oldRole.setCode(code);
			oldRole.setDescription(description);
			// 修改角色信息
			serviceManager.roleService.save(oldRole);
			return getSuccessMsg("修改角色成功,角色名称为:" + name);
		} catch (Exception e) {
			e.printStackTrace();
			return getErrorMsg(e.getMessage());
		}
	}

	/**
	 * 删除一个角色
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "delete")
	@ResponseBody
	public Object delete(Long id) {
		try {
			// 验证ID是否为空
			if (id == null) {
				return getErrorMsg("请选择要删除的角色");
			}
			// 验证角色是否存在
			Role role = serviceManager.roleService.find(id);
			if (role == null) {
				return getErrorMsg("未找到要删除的角色");
			}
			// 验证角色下是否有用户
			if (serviceManager.roleService.isUsed(id))
				return getErrorMsg("角色下有用户,无法删除角色");
			// 删除角色
			serviceManager.roleService.remove(role);
			return getSuccessMsg("删除角色[" + role.getName() + "]成功");
		} catch (Exception e) {
			e.printStackTrace();
			return getErrorMsg("系统错误:" + e.getMessage());
		}
	}

	/**
	 * 配置角色菜单项
	 * 
	 * @param roleId
	 * @param menuIds
	 * @return
	 */
	@RequestMapping(value = "saveRoleMenu")
	@ResponseBody
	public Object saveRoleMenu(Long id, String menuIds) {
		// 判断角色ID是否为诶空
		if (id == null)
			return getErrorMsg("角色Id不能为空");
		// 验证菜单项是否为空
		if (StringUtils.isEmpty(menuIds))
			menuIds = null;
		else {
			String[] ids = menuIds.split(",");
			Long[] longIds = new Long[ids.length];
			for (int i = 0; i < ids.length; i++) {
				longIds[i] = Long.valueOf(ids[i]);
			}
			serviceManager.menuService.saveRoleMenu(id, longIds);
		}
		return getSuccessMsg("更改配置成功");
	}

	/**
	 * 根据角色展示菜单
	 * 
	 * @param roleId
	 * @return
	 */
	@RequestMapping(value = "menuList")
	@ResponseBody
	public List<Tree> menuList(Long id) {
		if (id == null)
			return Collections.emptyList();
		// 获得树形全部菜单
		List<Tree> treeList = serviceManager.menuService.findTreeMenus();
		// 获得角色拥有的菜单
		Long[] menusIds = serviceManager.menuService.findMenuIds(id);
		setChecked(treeList, menusIds);
		return treeList;
	}

	/**
	 * 设置菜单和角色拥有菜单的配置项
	 * 
	 * @param treeList
	 * @param roleMenuList
	 */
	private void setChecked(List<Tree> treeList, Long[] menusIds) {
		for (Tree tv : treeList) {
			tv.setChecked(checkContainsMenu(tv.getId(), menusIds));
			if (!tv.getChildren().isEmpty())
				setChecked(tv.getChildren(), menusIds);
		}
	}

	/**
	 * 是否含有子菜单
	 * 
	 * @param menuId
	 * @param roleMenuList
	 * @return
	 */
	private boolean checkContainsMenu(String tvId, Long[] menusIds) {
		if (StringUtils.isEmpty(tvId))
			return false;
		if (menusIds.length <= 0)
			return false;
		for (Long menuId : menusIds) {
			if (menuId == Long.valueOf(tvId)) {
				return true;
			}
		}
		return false;
	}
}
