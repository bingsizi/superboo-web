package com.superboo.core.easyui.vo;

import java.util.ArrayList;
import java.util.List;

/**
 * easyui 中tree组件的数据封装
 * 
 * @author peiran zhang
 * @date 2016年11月29日
 */
public class Tree {
	
	private String id;// id
	private String text;// 显示的内容
	private String state = "open";// 默认为展开状态 open为展开,closed为关闭
	private String iconCls;// 节点图标
	private boolean checked = false;// 是否选中
	private Object obj; // 自定义属性
	private List<Tree> children = new ArrayList<Tree>();// 子部门集

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}

	public List<Tree> getChildren() {
		return children;
	}

	public void setChildren(List<Tree> children) {
		this.children = children;
	}

}
