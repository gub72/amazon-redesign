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
        /^(([^<>()[\]\\.,;:\s@"]+(\.([^<>()[\]\\.,;:\s@"]+))*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleAuthAction = (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido.");
      setProcessing(false);
      return;
    }

    if (isSigningUp && name.trim().length < 2) {
      setError("Por favor, insira seu nome.");
      setProcessing(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setProcessing(false);
      return;
    }

    if (isSigningUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
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

  const getInitials = (profile) => {
    const name = getUserName(profile);
    return name.charAt(0).toUpperCase();
  };

  // ─── LOGGED IN: Account popover with columns ───
  if (profile) {
    return (
      <div className="login-popover__content">
        <div className="login-popover__userBanner">
          <div className="login-popover__avatar">{getInitials(profile)}</div>
          <div className="login-popover__userInfo">
            <span className="login-popover__userName">{getUserName(profile)}</span>
            <span className="login-popover__userEmail">{profile?.email}</span>
          </div>
        </div>
        <div className="login-popover__columns">
          <div className="login-popover__column">
            <h4>Suas listas</h4>
            <ul>
              <li><Link to="/lists">Criar uma Lista de desejos</Link></li>
              <li><Link to="/lists">Lista do Bebê</Link></li>
              <li><Link to="/lists">Descobrir seus interesses</Link></li>
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
              <li><Link to="/manage-content">Gerencie conteúdo e dispositivos</Link></li>
            </ul>
          </div>
        </div>
        <div className="login-popover__footer">
          <button className="login-popover__logout-btn" onClick={handleLogout}>
            Sair da conta
          </button>
        </div>
      </div>
    );
  }

  // ─── LOGGED OUT: Login / Signup form ───
  return (
    <div className={fullPage ? "login__container full" : "login__container"}>
      <h2>{isSigningUp ? "Criar conta" : "Fazer login"}</h2>
      <form onSubmit={handleAuthAction}>
        {!!error && <p className="login__error">{error}</p>}

        {isSigningUp && (
          <>
            <label htmlFor="login__name">Seu nome</label>
            <input
              type="text"
              id="login__name"
              value={name}
              onChange={(e) => {
                setError(null);
                setName(e.target.value);
              }}
              required
              placeholder="Nome e sobrenome"
            />
          </>
        )}

        <label htmlFor="login__email">E-mail</label>
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

        <label htmlFor="login__password">Senha</label>
        <input
          type="password"
          id="login__password"
          value={password}
          onChange={(e) => {
            setError(null);
            setPassword(e.target.value);
          }}
          required
          placeholder="Mínimo de 6 caracteres"
        />

        <button
          type="submit"
          className="login__signInButton"
          disabled={processing}
        >
          {processing
            ? "Carregando..."
            : isSigningUp
              ? "Criar sua conta"
              : "Continuar"
          }
        </button>
      </form>

      <p className="login__terms">
        Ao {isSigningUp ? "criar uma conta" : "continuar"}, você concorda com as{" "}
        <Link to="/terms">Condições de Uso</Link> e o{" "}
        <Link to="/privacy">Aviso de Privacidade</Link> da Amazon.
      </p>

      <div className="login__toggle">
        {isSigningUp ? (
          <p>Já tem uma conta? <button className="login-popover__link-btn" onClick={() => setIsSigningUp(false)}>Fazer login</button></p>
        ) : (
          <p>Novo por aqui? <button className="login-popover__link-btn" onClick={() => setIsSigningUp(true)}>Crie sua conta</button></p>
        )}
      </div>
    </div>
  );
}

export default LoginContainer;