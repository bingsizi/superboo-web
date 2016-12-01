package com.superboo.base.security.menu.service;

import java.util.List;
import com.superboo.base.security.menu.entity.Menu;
import com.superboo.core.easyui.vo.Tree;
import com.superboo.core.pojo.Page;

/**
 * 菜单业务层
 * 
 * @author peiran zhang
 * @date 2016年11月30日
 */
public interface MenuService {

	/**
	 * 保存菜单
	 * 
	 * @param menu
	 * @author peiran zhang
	 * @date 2016年11月30日
	 */
	void save(Menu menu);

	/**
	 * 根据id返回
	 * 
	 * @param id
	 * @return
	 * @author peiran zhang
	 * @date 2016年11月30日
	 */
	Menu find(Long id);

	/**
	 * 判断menu是否使用过
	 * 
	 * @param id
	 * @return
	 * @author zhangpeiran 2016年5月11日 上午9:52:06
	 */
	boolean isUsed(Long id);

	/**
	 * 根据id,获得所有子
	 * 
	 * @param id
	 * @return
	 * @author zhangpeiran 2016年5月11日 上午9:44:20
	 */
	List<Menu> findChilds(Long id);

	/**
	 * 获得全部根菜单
	 * 
	 * @return
	 * @author zhangpeiran 2016年5月11日 上午9:41:46
	 */
	List<Menu> findRootMenus();

	/**
	 * 分页查询菜单
	 * 
	 * @param page
	 * @param name
	 * @return
	 * @author zhangpeiran 2016年5月11日 上午9:26:20
	 */
	Page<Menu> findByPage(Page<Menu> page, String name);

	/**
	 * 保存角色菜单
	 * 
	 * @param roleId
	 * @param menuIds
	 * @author zhangpeiran 2016年5月10日 上午8:57:22
	 */
	void saveRoleMenu(Long roleId, Long[] menuIds);

	/**
	 * 根据ids获得资源
	 * 
	 * @return
	 * @author zhangpeiran 2016年5月9日 上午11:16:59
	 */
	List<Menu> findByIds(Long... ids);

	/**
	 * 根据roleIds获得拥有的menuIds
	 * 
	 * @param userId
	 * @return
	 * @author zhangpeiran 2016年5月9日 上午10:35:50
	 */
	Long[] findMenuIds(Long... roleIds);

	/**
	 * 获得全部菜单根数
	 * 
	 * @return
	 * @author zhangpeiran 2016年5月9日 下午4:18:24
	 */
	long countNum();

	/**
	 * 获得所有菜单,以树型结构显示
	 * 
	 * @return
	 * @author peiran zhang
	 * @date 2016年11月30日
	 */
	List<Tree> findTreeMenus();
	
	/**
	 * 根据id删除菜单
	 * @param id
	 * @author peiran zhang
	 * @date 2016年12月1日
	 */
	void remove(Long id);
}
