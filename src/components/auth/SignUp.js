import React, { useEffect, useState } from "react";
import "../../styles/Login.css";
import { Link } from "react-router-dom";
import LoginContainer from "./LoginContainer";

function SignUp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="login">
      <div className={mounted ? "login__wrapper active" : "login__wrapper"}>
        <Link to="/">
          <img src={'/assets/icons/logo-dark.png'} alt="amazon" className="login__logo" width={136} height={54} />
        </Link>

        <LoginContainer fullPage={true} initialMode="signup" />
      </div>
    </div>
  );
}

export default SignUp;
