import React, { useState, useEffect } from "react";
import "../../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getError } from "../../logic/utils";
import { useSelector } from "react-redux";

function LoginContainer({ onLoginSuccess, fullPage = false, initialMode = "login" }) {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.user);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(initialMode === "signup");

  useEffect(() => {
    setIsSigningUp(initialMode === "signup");
  }, [initialMode]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleAuthAction = (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setProcessing(false);
      return;
    }

    if (isSigningUp && name.trim().length < 2) {
      setError("Please enter your name.");
      setProcessing(false);
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      setProcessing(false);
      return;
    }

    if (isSigningUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Update profile with name
          updateProfile(userCredential.user, {
            displayName: name
          }).then(() => {
            if (onLoginSuccess) {
              onLoginSuccess();
            } else {
              navigate("/");
            }
          });
        })
        .catch((err) => {
          setProcessing(false);
          setError(getError(err.message));
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (onLoginSuccess) {
            onLoginSuccess();
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          setProcessing(false);
          setError(getError(err.message));
        });
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      if (onLoginSuccess) onLoginSuccess();
      navigate("/");
    });
  };

  const getUserName = (profile) => {
    if (profile?.displayName) return profile.displayName;
    return profile?.email ? profile.email.split("@")[0] : "Usuário";
  };

  // If LOGGED IN: Show the columns of links
  if (profile) {
    return (
      <div className="login-popover__content">
        <div className="login-popover__header">
          <h3>Olá, {getUserName(profile)}</h3>
          <button className="login-popover__link-btn" onClick={handleLogout}>Sair</button>
        </div>
        <div className="login-popover__columns">
          <div className="login-popover__column">
            <h4>Suas listas</h4>
            <ul>
              <li><Link to="/lists">Criar uma Lista de desejos</Link></li>
              <li><Link to="/lists">Lista do Bebê</Link></li>
            </ul>
          </div>
          <div className="login-popover__separator" />
          <div className="login-popover__column">
            <h4>Sua conta</h4>
            <ul>
              <li><Link to="/account">Sua conta</Link></li>
              <li><Link to="/orders">Seus pedidos</Link></li>
              <li><Link to="/wishlist">Sua Lista de desejos</Link></li>
              <li><Link to="/continue-shopping">Continuar comprando</Link></li>
              <li><Link to="/recommendations">Recomendados para você</Link></li>
              <li><Link to="/subscribe-and-save">Programe e Poupe</Link></li>
              <li><Link to="/prime">Sua assinatura Prime</Link></li>
              <li><Link to="/subscriptions">Inscrições e assinaturas</Link></li>
              <li><Link to="/manage-content">Gerencie seu conteúdo e dispositivos</Link></li>
              <li><Link to="/prime-video">Seu Prime Video</Link></li>
              <li><Link to="/kindle-unlimited">Seu Kindle Unlimited</Link></li>
              <li><Link to="/photos">Seu Amazon Photos</Link></li>
              <li><Link to="/apps">Seus aplicativos e dispositivos</Link></li>
              <li><button className="login-popover__link-btn" style={{ marginTop: '10px' }} onClick={handleLogout}>Sair da conta</button></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // If LOGGED OUT: Show only the Login or SignUp form
  return (
    <div className={fullPage ? "login__container full" : "login__container"}>
      <h2>{isSigningUp ? "Create Account" : "Sign In"}</h2>
      <form onSubmit={handleAuthAction}>
        {!!error && <p className="login__error">{error}</p>}

        {isSigningUp && (
          <>
            <label htmlFor="login__name">Your name</label>
            <input
              type="text"
              id="login__name"
              value={name}
              onChange={(e) => {
                setError(null);
                setName(e.target.value);
              }}
              required
              placeholder="First and last name"
            />
          </>
        )}

        <label htmlFor="login__email">Email address</label>
        <input
          type="email"
          id="login__email"
          value={email}
          onChange={(e) => {
            setError(null);
            setEmail(e.target.value);
          }}
          required
        />

        <label htmlFor="login__password">Password</label>
        <input
          type="password"
          id="login__password"
          value={password}
          onChange={(e) => {
            setError(null);
            setPassword(e.target.value);
          }}
          required
          placeholder="At least 6 characters"
        />

        <button
          type="submit"
          className="login__signInButton"
          disabled={processing}
        >
          {isSigningUp ? "Create your Amazon Clone account" : "Sign In"}
        </button>
      </form>

      <p className="login__terms">
        By {isSigningUp ? "creating an account" : "continuing"}, you agree to Charles' Amazon Clone Conditions of Use and Privacy Notice.
      </p>

      <div className="login__toggle">
        {isSigningUp ? (
          <p>Already on Amazon Clone? <button className="login-popover__link-btn" onClick={() => setIsSigningUp(false)}>Sign In</button></p>
        ) : (
          <p>New to Amazon Clone? <button className="login-popover__link-btn" onClick={() => setIsSigningUp(true)}>Create an account</button></p>
        )}
      </div>
    </div>
  );
}

export default LoginContainer;