package com.demo.model;

import java.util.List;

public class MixUser {
	public List<User> users;
	public OtherUser otherUser;
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public OtherUser getOtherUser() {
		return otherUser;
	}
	public void setOtherUser(OtherUser otherUser) {
		this.otherUser = otherUser;
	}
}
