package com.superboo.base.security.user.entity;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.superboo.core.basemoudel.entity.IdEntity;
import com.superboo.core.json.JsonDateSerializer;

/**
 * user用户类
 * 
 * @author zhangpeiran
 * @version
 * @date 2016年5月3日 上午10:42:41
 */
@Entity
@Table(name = "sys_user")
public class User extends IdEntity {

	/** 必要属性 **/
	private String username;// 用户名
	private String password;// 密码
	private int locked = 0;// 0未锁定,1锁定
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date createTime;// 创建时间
	private String realName;// 真实姓名
	private Long orgId;// 所属机构Id
	private Date lastLoginTime;// 最后一次登录时间

	/** 非持久化 **/
	@Transient
	private String orgName;// 所属机构名称

	public String getOrgName() {
		return orgName;
	}

	/** get and set **/

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getLocked() {
		return locked;
	}

	public void setLocked(int locked) {
		this.locked = locked;
	}

	public Date getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	public static void main(String[] args) throws Exception {

		// 测试结果User类本身能序列化,但是在别的类中被ManyToOne的时候就无法序列化,可能和hibernate的懒加载有关系

		User user = new User();
		user.setRealName("我来测试");

		// 序列化到文件
		ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("d:/my.out"));
		oos.writeObject(user);
		oos.flush(); // 缓冲流
		oos.close(); // 关闭流

		// 读取
		ObjectInputStream in = new ObjectInputStream(new FileInputStream("d:/my.out"));
		User u = (User) in.readObject();
		System.out.println(u.getRealName());
		in.close();
	}
}
