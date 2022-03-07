import React from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "@material-ui/core";
import {
  SearchOutlined,
  AppsOutlined,
  NotificationsNone,
} from "@material-ui/icons";
import { addUser } from "../../redux/action/User";
const Header = () => {
  const user = useSelector((state) => {
    return state.userData.user;
  });
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(addUser(null));
  };
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://github.com/MohamedThawfeek/Youtube_Clone/blob/main/src/assets/logo1.png?raw=true"
          alt=""
        />
      </div>
      <div className="header__center">
        <div className="header__input">
          <input type="text" placeholder={`Search video ${user.displayName}`} />
          <Button>
            <SearchOutlined className="button" />
          </Button>
        </div>
      </div>
      <div className="header__right">
        <AppsOutlined />
        <NotificationsNone />
        <Avatar src={user.photoURL} className="header__avatar" />
        <h5>{user.displayName}</h5>
        <Button type="submit" onClick={signOut}>
          SignOut
        </Button>
      </div>
    </div>
  );
};

export default Header;
