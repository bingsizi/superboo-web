package com.superboo.base.security.org.service;

import java.util.List;
import com.superboo.base.security.org.entity.Org;
import com.superboo.base.security.org.support.OrgTreeGridVO;
import com.superboo.core.easyui.vo.Tree;

/**
 * 
 * @author peiran zhang
 * @date 2016年12月2日
 */
public interface OrgService {

	/**
	 * 根据id,返回自己及以下所有组织机构
	 * 
	 * @param id
	 * @return
	 * @author zhangpeiran 2016年6月6日 上午9:54:36
	 */
	List<Org> findOwnAndChilds(Long id);

	/**
	 * 保存部门方法
	 */
	void save(Org org);

	/**
	 * 根据id删除
	 * 
	 * @param id
	 * @author zhangpeiran 2016年5月12日 上午9:44:22
	 */
	void deleteById(Long id);

	/**
	 * 重写findId
	 */
	Org find(Long id);

	/**
	 * 根据id获得子treegrid数据
	 * 
	 * @param id
	 * @param compId
	 * @return
	 */
	List<OrgTreeGridVO> orgTreeGridList(Long id);

	/**
	 * 一次性全部获取部门树结构的方法,如果id有值以当前id为起点
	 * 
	 * @param id
	 * @return
	 * @author zhangpeiran 2016年5月12日 上午9:09:27
	 */
	List<Tree> orgTreeList(Long id);

	/**
	 * 查询所有子部门，不包含本部门
	 * 
	 * @param departId
	 * @return
	 */
	List<Org> findAllChilds(Long id);

	/**
	 * 获得根节点
	 * 
	 * @return
	 * @author zhangpeiran 2016年5月12日 上午8:57:21
	 */
	List<Org> findRoot();

	/**
	 * 根据id获得子节点
	 * 
	 * @param id
	 * @return
	 * @author zhangpeiran 2016年5月12日 上午8:59:13
	 */
	List<Org> findChilds(Long id);

	/**
	 * 判断这个id节点下是否含有子节点.
	 * 
	 * @param id
	 * @return
	 * @author zhangpeiran 2016年5月12日 上午9:02:11
	 */
	boolean isLeafNode(Long id);
}
