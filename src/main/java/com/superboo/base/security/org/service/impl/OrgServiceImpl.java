package com.superboo.base.security.org.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.superboo.base.enums.Status;
import com.superboo.base.security.org.dao.OrgDao;
import com.superboo.base.security.org.entity.Org;
import com.superboo.base.security.org.service.OrgService;
import com.superboo.base.security.org.support.OrgTreeGridVO;
import com.superboo.core.easyui.vo.Tree;
import com.superboo.core.util.DateUtils;

/**
 * 组织机构业务方法
 * 
 * @author zhangpeiran
 * @version
 * @date 2016年5月12日 上午8:48:39
 */
@Service("orgService")
@Transactional
public class OrgServiceImpl implements OrgService {

	@Resource
	private OrgDao orgDao;

	@Transactional(readOnly = true)
	@Override
	public List<Org> findOwnAndChilds(Long id) {

		String hql = "from Org org where parentIds like '%/" + id + "/%' and status = :status";

		Map<String, Object> params = new HashMap<>();
		params.put("status", Status.正常);

		List<Org> list = orgDao.executeQuery(hql, params);

		// 加入本身
		list.add(0, find(id));

		return list;
	}

	@Override
	public void save(Org org) {
		if (org.getCreateTime() == null) {
			org.setCreateTime(DateUtils.getSystemTime());
		}
		if (org.getParentId() != null) {
			Org parentOrg = find(org.getParentId());
			if (parentOrg != null) {
				String parentIds = "";
				if (StringUtils.isNotBlank(parentOrg.getParentIds())) {
					parentIds = parentOrg.getParentIds() + parentOrg.getId() + "/";
				} else {
					parentIds = "/" + parentOrg.getId() + "/";
				}
				org.setParentIds(parentIds);
			}
		}
		orgDao.save(org);
	}

	@Override
	public void deleteById(Long id) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("id", id);
		paramMap.put("status", Status.删除);
		orgDao.executeUpdate("update Org set status = :status where id = :id", paramMap);
	}

	@Transactional(readOnly = true)
	@Override
	public Org find(Long id) {
		Org org = orgDao.findById(id);
		if (org != null && org.getStatus() == Status.正常) {
			return org;
		}
		return null;
	}

	@Transactional(readOnly = true)
	@Override
	public List<OrgTreeGridVO> orgTreeGridList(Long id) {
		List<OrgTreeGridVO> otgvList = new ArrayList<OrgTreeGridVO>();
		List<Org> list = new ArrayList<Org>();
		// 如果是根节点部门
		if (id == null) {
			list = findRoot();
		} else {
			list = findChilds(id);
		}
		for (Org org : list) {
			OrgTreeGridVO otgv = new OrgTreeGridVO();
			BeanUtils.copyProperties(org, otgv, new String[] { "id" });
			otgv.set_parentId(org.getParentId() + "");
			otgv.setId(org.getId() + "");
			boolean flag = isLeafNode(org.getId());
			if (flag)
				otgv.setState("closed");
			else
				otgv.setState("open");
			otgvList.add(otgv);
		}
		return otgvList;
	}

	@Transactional(readOnly = true)
	@Override
	public List<Tree> orgTreeList(Long id) {
		List<Tree> list = new ArrayList<Tree>();
		// 获得根节点
		List<Org> rootList = new ArrayList<>();
		if (id == null) {
			rootList = findRoot();
		} else {
			rootList.add(find(id));
		}
		if (!rootList.isEmpty()) {
			for (Org org : rootList) {
				Tree tv = new Tree();
				tv.setId(org.getId() + "");
				tv.setText(org.getName());
				setChildrenList(org, tv);
				list.add(tv);
			}
		}
		return list;
	}

	/**
	 * 设置子部门List
	 * 
	 * @param org
	 * @param deptTreeVo
	 * @return
	 * @author zhangpeiran 2016年5月12日 上午9:14:57
	 */
	private Org setChildrenList(Org org, Tree deptTreeVo) {
		List<Org> childrenList = findChilds(org.getId());
		if (childrenList.size() > 0) {
			List<Tree> childTreeList = new ArrayList<Tree>();
			for (Org subOrg : childrenList) {
				Tree tv = new Tree();
				tv.setId(subOrg.getId() + "");
				tv.setText(subOrg.getName());
				childTreeList.add(tv);
				setChildrenList(subOrg, tv);
			}
			deptTreeVo.setChildren(childTreeList);
		}
		return org;
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<Org> findAllChilds(Long id) {
		List<Org> returnList = new ArrayList<Org>();
		fillChildData(id, returnList);
		return returnList;
	}

	/**
	 * 遍历部门
	 * 
	 * @param departId
	 * @param returnList
	 * @author gql 2015-10-13 下午3:42:09
	 */
	private void fillChildData(Long id, List<Org> returnList) {
		List<Org> list = findChilds(id);
		if (null != list && list.size() > 0) {
			for (Org org : list) {
				returnList.add(org);
				findAllChilds(org.getId());
			}
		}
	}

	@Transactional(readOnly = true)
	@Override
	public List<Org> findRoot() {
		Map<String, Object> map = new HashMap<>();
		map.put("status", Status.正常);
		return orgDao.executeQuery("from Org where parentId is null and status=:status", map);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Org> findChilds(Long id) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("parentId", id);
		paramMap.put("status", Status.正常);
		return orgDao.executeQuery("from Org where parentId=:parentId and status=:status", paramMap);
	}

	@Transactional(readOnly = true)
	@Override
	public boolean isLeafNode(Long id) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("parentId", id);
		paramMap.put("status", Status.正常);
		long count = orgDao.countResult("from Org where parentId=:parentId and status=:status", paramMap);
		return (count > 0) ? true : false;
	}
}
