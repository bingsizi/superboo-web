package com.superboo.base.security.menu.dao;

import org.hibernate.criterion.Criterion;
import org.springframework.stereotype.Repository;
import com.superboo.base.security.menu.entity.RoleMenu;
import com.superboo.core.basemoudel.dao.BaseDao;

/**  
 * 
 * @author peiran zhang
 * @date 2016年11月30日
 */
@Repository
public class RoleMenuDao extends BaseDao<RoleMenu,Long>{

	protected int count(Criterion...criterions){
		return countResult(createCriteria(criterions));
	}
}
