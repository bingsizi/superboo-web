package com.superboo.base.security.org.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import com.superboo.base.enums.Status;
import com.superboo.core.basemoudel.entity.IdEntity;

/**
 * 组织机构
 * 
 * @author zhangpeiran
 * @version
 * @date 2016年5月9日 上午9:40:55
 */
@Entity
@Table(name = "sys_org")
public class Org extends IdEntity {

	private String name;// 组织机构名称
	@Column(unique = true, length = 100)
	private String code;// 唯一编码
	private int seq;// 显示顺序
	private Long parentId;// 父机构id
	private String parentIds;// 父编号列表 例如:如0/1/2/表示其祖先是2、1、0；其中根节点父Id为0
	@Enumerated(EnumType.ORDINAL)
	private Status status;
	private Date createTime;// 创建时间

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getParentIds() {
		return parentIds;
	}

	public void setParentIds(String parentIds) {
		this.parentIds = parentIds;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
