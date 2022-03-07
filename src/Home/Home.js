import React from "react";
import { useSelector } from "react-redux";
import Login from "../components/login/Login";
import "../App.css";
import Header from "../components/header/Header";
import Feed from "../components/feed/Feed";
import Sidebar from "../components/sidebar/Sidebar";
const Home = () => {
  const user = useSelector((state) => {
    return state.userData.user;
  });
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="app__body">
            <Sidebar />
            <Feed />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
