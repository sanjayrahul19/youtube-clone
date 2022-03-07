import React from "react";
import "./Login.css";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { auth, google } from "../../firebase/Firebase";
import { signInWithPopup } from "firebase/auth";
import { addUser } from "../../redux/action/User";
const Login = () => {
  const dispatch = useDispatch();
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, google);
      dispatch(addUser(result.user));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          className="login__logo"
          src="https://sccmenno.org/wp-content/uploads/2020/10/Youtube-Logo.png"
          alt="Youtube-Logo"
        />
        <div className="login__button">
          <Button className="login__button1" onClick={signIn}>
            {" "}
            <GoogleIcon className="login__googleIcon" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
