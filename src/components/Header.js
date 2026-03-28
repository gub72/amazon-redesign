import React, { useState } from "react";
import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineRight } from "react-icons/ai";
import { MdPersonOutline } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { TbMenu2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { auth } from "../config/firebase";
import MenuDesktop from "../components/header/MenuDesktop";
import LoginContainer from "./auth/LoginContainer";
import "../styles/LoginModal.css";

function Header() {
  const cart = useSelector((state) => state.cart);
  const { profile } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [mobileNav, setMobileNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setShowMobileSearch(false);
    } else {
      navigate("/search");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleAuthentication = (e) => {
    if (e) e.preventDefault();

    if (window.innerWidth <= 840) {
      if (!profile) navigate("/login");
      setMobileNav(false);
      return;
    }

    setShowLoginModal((prev) => !prev);
  };

  const getUserName = (profile) => {
    if (profile?.displayName) return profile.displayName;
    return profile?.email ? profile.email.split("@")[0] : "Usuário";
  };

  return (
    <div className="header">
      <div className="header__container">
        {/* Mobile Left: Hamburger */}
        <button
          aria-label="open menu"
          aria-controls="mobile-nav"
          aria-expanded={mobileNav}
          className="header__toggleOpen header__toggleOpen--mobile desktop-hidden"
          onClick={() => setMobileNav(true)}
        >
          <TbMenu2 />
        </button>

        {/* Logo (Desktop & Mobile) */}
        <Link to="/" className="header__logoLink">
          <svg className="header__logo" width="82" height="25" viewBox="0 0 82 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_206_106)">
              <path d="M50.8599 19.3987C46.1004 22.9184 39.2018 24.7962 33.2623 24.7962C24.9341 24.7962 17.4366 21.7058 11.7645 16.5659C11.3189 16.1617 11.7181 15.6108 12.2529 15.9256C18.3743 19.4989 25.9431 21.6486 33.7614 21.6486C39.0343 21.6486 44.8348 20.5541 50.1682 18.2828C50.9739 17.9394 51.6478 18.8121 50.8599 19.3987Z" fill="#FF6200" />
              <path d="M52.8385 17.1274C52.2324 16.3477 48.817 16.759 47.284 16.9414C46.817 16.9987 46.7457 16.5909 47.1664 16.2976C49.8866 14.3768 54.3501 14.9312 54.8706 15.5751C55.3912 16.2225 54.7352 20.7114 52.179 22.854C51.7868 23.1831 51.4125 23.0078 51.5872 22.5714C52.1611 21.1335 53.4482 17.9108 52.8385 17.1274Z" fill="#FF6200" />
              <path d="M47.391 2.73768V0.870557C47.391 0.587984 47.6049 0.398411 47.8616 0.398411H56.1934C56.4608 0.398411 56.6747 0.591562 56.6747 0.870557V2.46942C56.6711 2.73768 56.4465 3.08821 56.0472 3.64263L51.7298 9.82704C53.3341 9.78769 55.0276 10.0273 56.4822 10.85C56.8101 11.036 56.8993 11.3079 56.9242 11.5761V13.5684C56.9242 13.8403 56.6248 14.1586 56.311 13.9941C53.7477 12.6456 50.343 12.499 47.5087 14.0084C47.2199 14.1658 46.9169 13.851 46.9169 13.5792V11.687C46.9169 11.383 46.9204 10.8643 47.2235 10.4029L52.2254 3.20625H47.8723C47.6049 3.20625 47.391 3.01668 47.391 2.73768Z" fill="white" />
              <path d="M16.9982 14.3875H14.4634C14.221 14.3697 14.0284 14.1872 14.0106 13.9547V0.902751C14.0106 0.641639 14.2281 0.434179 14.499 0.434179H16.8627C17.1087 0.444903 17.3048 0.634484 17.3226 0.870557V2.57673H17.369C17.9858 0.927786 19.1444 0.15876 20.706 0.15876C22.2924 0.15876 23.2836 0.927786 23.9966 2.57673C24.6098 0.927786 26.0038 0.15876 27.4976 0.15876C28.56 0.15876 29.7222 0.598715 30.4317 1.58593C31.2338 2.68403 31.0698 4.27931 31.0698 5.67787L31.0663 13.9154C31.0663 14.1765 30.8488 14.3875 30.5778 14.3875H28.0466C27.7935 14.3697 27.5903 14.1658 27.5903 13.9154V6.99773C27.5903 6.4469 27.6402 5.07338 27.519 4.55115C27.33 3.67482 26.7631 3.42802 26.0287 3.42802C25.4155 3.42802 24.7738 3.83936 24.5135 4.4975C24.2533 5.15565 24.2782 6.25732 24.2782 6.99773V13.9154C24.2782 14.1765 24.0608 14.3875 23.7898 14.3875H21.2586C21.0019 14.3697 20.8022 14.1658 20.8022 13.9154L20.7987 6.99773C20.7987 5.54195 21.0375 3.3994 19.2371 3.3994C17.4153 3.3994 17.4866 5.48829 17.4866 6.99773V13.9154C17.4866 14.1765 17.2692 14.3875 16.9982 14.3875Z" fill="white" />
              <path d="M63.8478 0.15876C67.609 0.15876 69.6447 3.3994 69.6447 7.51996C69.6447 11.501 67.3951 14.6594 63.8478 14.6594C60.1543 14.6594 58.1436 11.4187 58.1436 7.38046C58.1436 3.31714 60.1793 0.15876 63.8478 0.15876ZM63.8692 2.82353C62.001 2.82353 61.8834 5.37741 61.8834 6.96912C61.8834 8.5644 61.8584 11.9696 63.8478 11.9696C65.8122 11.9696 65.9049 9.22255 65.9049 7.54857C65.9049 6.4469 65.8585 5.13061 65.527 4.08616C65.2418 3.17764 64.6749 2.82353 63.8692 2.82353Z" fill="white" />
              <path d="M74.5217 14.3875H71.9976C71.7445 14.3697 71.5413 14.1658 71.5413 13.9154L71.5377 0.859826C71.5591 0.620176 71.7694 0.434179 72.0261 0.434179H74.3756C74.5966 0.444903 74.7784 0.595139 74.8283 0.79902V2.79491H74.8747C75.5842 1.01006 76.5788 0.15876 78.3293 0.15876C79.4666 0.15876 80.5754 0.5701 81.2884 1.69681C81.9515 2.74126 81.9515 4.4975 81.9515 5.76014V13.9762C81.923 14.2051 81.7126 14.3875 81.4631 14.3875H78.9211C78.6894 14.3697 78.4969 14.198 78.4719 13.9762V6.88685C78.4719 5.45968 78.6359 3.37079 76.8854 3.37079C76.2687 3.37079 75.7018 3.78571 75.4202 4.41523C75.0636 5.21288 75.0173 6.00694 75.0173 6.88685V13.9154C75.0137 14.1765 74.7927 14.3875 74.5217 14.3875Z" fill="white" />
              <path d="M40.7491 8.15306V7.60222C38.9166 7.60222 36.9808 7.99568 36.9808 10.1633C36.9808 11.2614 37.5476 12.0054 38.5209 12.0054C39.2339 12.0054 39.8721 11.5654 40.275 10.85C40.7741 9.97011 40.7491 9.14385 40.7491 8.15306ZM43.3053 14.3518C43.1378 14.502 42.8953 14.5127 42.7064 14.4126C41.865 13.7115 41.7153 13.386 41.2518 12.7171C39.8614 14.1407 38.8774 14.5664 37.0735 14.5664C34.9415 14.5664 33.2802 13.2465 33.2802 10.6032C33.2802 8.53936 34.396 7.13365 35.9825 6.4469C37.3587 5.83883 39.2803 5.73152 40.7491 5.56341V5.23434C40.7491 4.62984 40.7955 3.91447 40.4425 3.39225C40.1324 2.92368 39.5405 2.73053 39.02 2.73053C38.0539 2.73053 37.1911 3.22771 36.9808 4.25785C36.938 4.48677 36.7704 4.71211 36.5423 4.72285L34.0823 4.45815C33.8755 4.41166 33.6474 4.24354 33.7044 3.9252C34.2713 0.934942 36.9629 0.0335693 39.373 0.0335693C40.6065 0.0335693 42.218 0.362641 43.1912 1.29978C44.4248 2.45511 44.3071 3.99674 44.3071 5.67429V9.63746C44.3071 10.8286 44.7991 11.3508 45.2626 11.9946C45.4266 12.2235 45.4622 12.499 45.2555 12.6706C44.7385 13.1034 43.8187 13.9082 43.3125 14.3589L43.3053 14.3518Z" fill="white" />
              <path d="M7.51841 8.15306V7.60222C5.68593 7.60222 3.75006 7.99568 3.75006 10.1633C3.75006 11.2614 4.31691 12.0054 5.2902 12.0054C6.00323 12.0054 6.64139 11.5654 7.04425 10.85C7.54337 9.97011 7.51841 9.14385 7.51841 8.15306ZM10.0746 14.3518C9.90706 14.502 9.66463 14.5127 9.47568 14.4126C8.6343 13.7115 8.48457 13.386 8.0211 12.7171C6.63069 14.1407 5.64671 14.5664 3.84275 14.5664C1.71079 14.5664 0.0494385 13.2465 0.0494385 10.6032C0.0494385 8.53936 1.16533 7.13365 2.75182 6.4469C4.12796 5.83883 6.04957 5.73152 7.51841 5.56341V5.23434C7.51841 4.62984 7.56476 3.91447 7.21181 3.39225C6.90164 2.92368 6.30983 2.73053 5.78932 2.73053C4.82317 2.73053 3.9604 3.22771 3.75006 4.25785C3.70727 4.48677 3.53971 4.71211 3.31154 4.72285L0.851596 4.45815C0.644817 4.41166 0.416648 4.24354 0.47369 3.9252C1.04055 0.934942 3.73223 0.0335693 6.14227 0.0335693C7.37581 0.0335693 8.98725 0.362641 9.96054 1.29978C11.1941 2.45511 11.0764 3.99674 11.0764 5.67429V9.63746C11.0764 10.8286 11.5684 11.3508 12.0319 11.9946C12.1959 12.2235 12.2315 12.499 12.0248 12.6706C11.5078 13.1034 10.588 13.9082 10.0817 14.3589L10.0746 14.3518Z" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_206_106">
                <rect width="82" height="24.831" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>

        {/* Desktop Search */}
        <div className="header__search header__search--desktop mobile-hidden">
          <label htmlFor="product-search" className="visually-hidden">Search</label>
          <button className="header__searchFilter--desktop" aria-label="Search products">
            <span className="header__searchFilter__text">Todos</span>
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="header__searchFilter__icon">
              <path d="M7.50791 0.462579L3.97664 4.13008C3.92698 4.18159 3.85966 4.21053 3.78948 4.21053C3.7193 4.21053 3.65198 4.18159 3.60233 4.13008L0.0710812 0.462579C0.024299 0.410437 -0.00116933 0.341471 4.12618e-05 0.270211C0.00125185 0.19895 0.0290469 0.130961 0.0775707 0.0805645C0.126094 0.030168 0.191559 0.00130015 0.260171 4.28533e-05C0.328784 -0.00121445 0.395188 0.025237 0.445393 0.073824L3.60233 0.0805645L7.13358 0.073824C7.18379 0.025237 7.25017 -0.00121445 7.31879 4.28533e-05C7.38742 0.00130015 7.45284 0.030168 7.5014 0.0805645C7.54989 0.130961 7.57772 0.19895 7.5789 0.270211C7.58015 0.341471 7.55469 0.410437 7.50791 0.462579Z" fill="#656565" />
            </svg>
          </button>
          <input
            id="product-search"
            type="text"
            className="header__searchInput header__searchInput--desktop"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pesquisar Amazon.com.br"
          />
          <button className="header__searchIcon header__searchIcon--desktop" aria-label="Search products" onClick={handleSearch}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_10703_248)">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.33844 1.74882C3.35593 1.74882 1.74879 3.35596 1.74879 5.33847C1.74879 7.32098 3.35593 8.92812 5.33844 8.92812C7.32095 8.92812 8.92809 7.32098 8.92809 5.33847C8.92809 3.35596 7.32095 1.74882 5.33844 1.74882ZM1.19653 5.33847C1.19653 3.05096 3.05093 1.19656 5.33844 1.19656C7.62595 1.19656 9.48034 3.05096 9.48034 5.33847C9.48034 7.62598 7.62595 9.48037 5.33844 9.48037C3.05093 9.48037 1.19653 7.62598 1.19653 5.33847Z" fill="#ffffff" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.87684 7.8769C7.98467 7.76906 8.1595 7.76906 8.26734 7.8769L10.504 10.1135C10.6118 10.2214 10.6118 10.3962 10.504 10.504C10.3961 10.6119 10.2213 10.6119 10.1135 10.504L7.87684 8.2674C7.769 8.15956 7.769 7.98473 7.87684 7.8769Z" fill="#ffffff" />
              </g>
              <defs>
                <clipPath id="clip0_10703_248">
                  <rect width="11.7814" height="11.7814" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        {/* Navigation Group */}
        <nav className="header__nav">
          {/* Desktop User Section */}
          <div style={{ position: "relative" }} className="mobile-hidden">
            <div className="header__navLink header__navLink--user" onClick={handleAuthentication} style={{ cursor: "pointer" }}>
              <div className="header__option header__option--user">
                <span className="header__optionOne">Olá, {profile ? getUserName(profile) : "faça seu login"}</span>
                <span className="header__optionTwo">{profile ? "Contas e mais" : "Acessar conta"}</span>
              </div>
              <div className="header__iconLogin">
                <svg className="header__iconLoginSvg" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_206_120)">
                    <path d="M19.0609 17.5332C17.5787 14.9719 15.2519 13.1748 12.5481 12.4126C13.8626 11.7444 14.9138 10.6529 15.5321 9.31421C16.1504 7.9755 16.2998 6.46757 15.9563 5.03355C15.6127 3.59953 14.7962 2.32301 13.6384 1.40982C12.4806 0.496635 11.049 0 9.57436 0C8.09976 0 6.66814 0.496635 5.51033 1.40982C4.35252 2.32301 3.53601 3.59953 3.19245 5.03355C2.8489 6.46757 2.99832 7.9755 3.61663 9.31421C4.23494 10.6529 5.2861 11.7444 6.60061 12.4126C3.89686 13.1738 1.56998 14.971 0.0877973 17.5332C0.0470983 17.5972 0.0197704 17.6688 0.00745781 17.7437C-0.00485481 17.8185 -0.00189761 17.8951 0.0161512 17.9688C0.0342 18.0425 0.0669675 18.1117 0.112483 18.1724C0.157998 18.2331 0.21532 18.284 0.281 18.3219C0.34668 18.3599 0.419362 18.3842 0.494672 18.3934C0.569982 18.4025 0.646365 18.3963 0.719224 18.3752C0.792084 18.354 0.859915 18.3184 0.918637 18.2704C0.977359 18.2223 1.02576 18.1629 1.06092 18.0957C2.86186 14.9841 6.04373 13.1269 9.57436 13.1269C13.105 13.1269 16.2869 14.9841 18.0878 18.0957C18.123 18.1629 18.1714 18.2223 18.2301 18.2704C18.2888 18.3184 18.3566 18.354 18.4295 18.3752C18.5024 18.3963 18.5787 18.4025 18.654 18.3934C18.7294 18.3842 18.802 18.3599 18.8677 18.3219C18.9334 18.284 18.9907 18.2331 19.0362 18.1724C19.0818 18.1117 19.1145 18.0425 19.1326 17.9688C19.1506 17.8951 19.1536 17.8185 19.1413 17.7437C19.129 17.6688 19.1016 17.5972 19.0609 17.5332ZM4.13686 6.56444C4.13686 5.489 4.45576 4.43772 5.05324 3.54352C5.65072 2.64933 6.49995 1.95239 7.49352 1.54084C8.48709 1.12929 9.58039 1.02161 10.6352 1.23142C11.6899 1.44122 12.6588 1.9591 13.4193 2.71954C14.1797 3.47999 14.9074 5.50363 14.9074 5.50363C14.9074 5.50363 15.0095 7.6517 14.598 8.64528C14.1864 9.63885 13.4895 10.4881 12.5953 11.0856C11.7011 11.683 10.6498 12.0019 9.57436 12.0019C8.13278 12.0002 6.75074 11.4268 5.73139 10.4074C4.71203 9.38806 4.1386 8.00602 4.13686 6.56444Z" fill="white" />
                  </g>
                  <defs><clipPath id="clip0_206_120"><rect width="20" height="19" fill="white" /></clipPath></defs>
                </svg>
              </div>
            </div>
            {showLoginModal && (
              <>
                <div className="popover-backdrop" onClick={() => setShowLoginModal(false)} />
                <div className="login-popover">
                  <LoginContainer onLoginSuccess={() => setShowLoginModal(false)} />
                </div>
              </>
            )}
          </div>

          {/* Mobile Icon Group */}
          <div className="header__mobileIcons desktop-hidden">
            <button className="header__mobileIcon" onClick={() => setShowMobileSearch(!showMobileSearch)}>
              {showMobileSearch ? <CgClose /> : <AiOutlineSearch />}
            </button>
            <button className="header__mobileIcon" onClick={handleAuthentication}>
              <svg className="header__iconLoginSvg" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_206_120)">
                  <path d="M19.0609 17.5332C17.5787 14.9719 15.2519 13.1748 12.5481 12.4126C13.8626 11.7444 14.9138 10.6529 15.5321 9.31421C16.1504 7.9755 16.2998 6.46757 15.9563 5.03355C15.6127 3.59953 14.7962 2.32301 13.6384 1.40982C12.4806 0.496635 11.049 0 9.57436 0C8.09976 0 6.66814 0.496635 5.51033 1.40982C4.35252 2.32301 3.53601 3.59953 3.19245 5.03355C2.8489 6.46757 2.99832 7.9755 3.61663 9.31421C4.23494 10.6529 5.2861 11.7444 6.60061 12.4126C3.89686 13.1738 1.56998 14.971 0.0877973 17.5332C0.0470983 17.5972 0.0197704 17.6688 0.00745781 17.7437C-0.00485481 17.8185 -0.00189761 17.8951 0.0161512 17.9688C0.0342 18.0425 0.0669675 18.1117 0.112483 18.1724C0.157998 18.2331 0.21532 18.284 0.281 18.3219C0.34668 18.3599 0.419362 18.3842 0.494672 18.3934C0.569982 18.4025 0.646365 18.3963 0.719224 18.3752C0.792084 18.354 0.859915 18.3184 0.918637 18.2704C0.977359 18.2223 1.02576 18.1629 1.06092 18.0957C2.86186 14.9841 6.04373 13.1269 9.57436 13.1269C13.105 13.1269 16.2869 14.9841 18.0878 18.0957C18.123 18.1629 18.1714 18.2223 18.2301 18.2704C18.2888 18.3184 18.3566 18.354 18.4295 18.3752C18.5024 18.3963 18.5787 18.4025 18.654 18.3934C18.7294 18.3842 18.802 18.3599 18.8677 18.3219C18.9334 18.284 18.9907 18.2331 19.0362 18.1724C19.0818 18.1117 19.1145 18.0425 19.1326 17.9688C19.1506 17.8951 19.1536 17.8185 19.1413 17.7437C19.129 17.6688 19.1016 17.5972 19.0609 17.5332ZM4.13686 6.56444C4.13686 5.489 4.45576 4.43772 5.05324 3.54352C5.65072 2.64933 6.49995 1.95239 7.49352 1.54084C8.48709 1.12929 9.58039 1.02161 10.6352 1.23142C11.6899 1.44122 12.6588 1.9591 13.4193 2.71954C14.1797 3.47999 14.9074 5.50363 14.9074 5.50363C14.9074 5.50363 15.0095 7.6517 14.598 8.64528C14.1864 9.63885 13.4895 10.4881 12.5953 11.0856C11.7011 11.683 10.6498 12.0019 9.57436 12.0019C8.13278 12.0002 6.75074 11.4268 5.73139 10.4074C4.71203 9.38806 4.1386 8.00602 4.13686 6.56444Z" fill="white" />
                </g>
                <defs><clipPath id="clip0_206_120"><rect width="20" height="19" fill="white" /></clipPath></defs>
              </svg>
            </button>
          </div>

          {/* Cart (Applies to both) */}
          <Link to="/checkout" className="header__navLink header__navLink--cart">
            <div className="header__optionBasket">
              <div>
                <div className="header__optionBasketCount">{cart.length}</div>
                <svg className="header__optionBasketIcon" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.625 17.8125C8.625 18.0721 8.54802 18.3258 8.4038 18.5417C8.25958 18.7575 8.0546 18.9258 7.81477 19.0251C7.57494 19.1244 7.31104 19.1504 7.05644 19.0998C6.80184 19.0491 6.56798 18.9241 6.38442 18.7406C6.20087 18.557 6.07586 18.3232 6.02522 18.0686C5.97458 17.814 6.00057 17.5501 6.09991 17.3102C6.19925 17.0704 6.36747 16.8654 6.58331 16.7212C6.79915 16.577 7.05291 16.5 7.3125 16.5C7.6606 16.5 7.99444 16.6383 8.24058 16.8844C8.48672 17.1306 8.625 17.4644 8.625 17.8125ZM17.0625 16.5C16.8029 16.5 16.5492 16.577 16.3333 16.7212C16.1175 16.8654 15.9492 17.0704 15.8499 17.3102C15.7506 17.5501 15.7246 17.814 15.7752 18.0686C15.8259 18.3232 15.9509 18.557 16.1344 18.7406C16.318 18.9241 16.5518 19.0491 16.8064 19.0998C17.061 19.1504 17.3249 19.1244 17.5648 19.0251C17.8046 18.9258 18.0096 18.7575 18.1538 18.5417C18.298 18.3258 18.375 18.0721 18.375 17.8125C18.375 17.4644 18.2367 17.1306 17.9906 16.8844C17.7444 16.6383 17.4106 16.5 17.0625 16.5ZM21.3497 4.4775L18.6759 13.1691C18.5478 13.5911 18.2871 13.9606 17.9325 14.2228C17.5779 14.4851 17.1482 14.6261 16.7072 14.625H7.69406C7.24561 14.6233 6.8098 14.4762 6.45209 14.2058C6.09438 13.9353 5.83409 13.556 5.71031 13.125L2.32031 1.26094C2.30908 1.22166 2.28533 1.18713 2.25267 1.16259C2.22001 1.13805 2.18023 1.12485 2.13937 1.125H0.5625C0.413316 1.125 0.270242 1.06574 0.164752 0.960248C0.0592632 0.854758 0 0.711684 0 0.5625C0 0.413316 0.0592632 0.270242 0.164752 0.164752C0.270242 0.0592632 0.413316 0 0.5625 0H2.13937C2.42434 0.00076838 2.70136 0.0939279 2.92888 0.265499C3.15641 0.43707 3.32215 0.677799 3.40125 0.951563L4.20094 3.75H20.8125C20.9004 3.75009 20.9871 3.77079 21.0656 3.81045C21.1441 3.85012 21.2122 3.90763 21.2644 3.97837C21.3167 4.04911 21.3516 4.13112 21.3664 4.2178C21.3812 4.30448 21.3755 4.39343 21.3497 4.4775Z" fill="white" />
                </svg>
              </div>
            </div>
          </Link>
        </nav>
      </div>

      <div className="mobile-hidden">
        <MenuDesktop />
      </div>

      {/* Conditionally rendered Mobile Search Bar */}
      {showMobileSearch && (
        <div className="header__mobileSearch desktop-hidden">
          <div className="header__search header__search--mobile">
            <input
              type="text"
              className="header__searchInput header__searchInput--mobile"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pesquisar..."
            />
            <button className="header__searchIcon header__searchIcon--mobile" onClick={handleSearch}>
              <AiOutlineSearch />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Side Navigation */}
      <div className={`desktop-hidden header__mobileNav ${mobileNav ? "header__mobileNav--active" : ""}`} id="mobile-nav">
        <div className={`header__mobileNavContainer ${mobileNav ? "header__mobileNavContainer--active" : ""}`}>
          <div className="header__mobileNavHeader">
            <div className="header__mobileNavUser">
              <MdPersonOutline className="header__mobileNavUserIcon" />
              <span className="header__mobileNavUserEmail">Olá, {profile ? getUserName(profile) : "Faça seu login"}</span>
            </div>
          </div>
          <div className="header__mobileNavContent">
            <div className="header__mobileNavSection">
              <h3>Tendências</h3>
              <ul>
                <li><Link to="/best-sellers" onClick={() => setMobileNav(false)}>Mais vendidos <AiOutlineRight /></Link></li>
                <li><Link to="/new-releases" onClick={() => setMobileNav(false)}>Novidades <AiOutlineRight /></Link></li>
                <li><Link to="/movers-shakers" onClick={() => setMobileNav(false)}>Produtos em alta <AiOutlineRight /></Link></li>
              </ul>
            </div>
            <div className="header__mobileNavSeparator" />
            <div className="header__mobileNavSection">
              <h3>Conteúdo Digital</h3>
              <ul>
                <li><Link to="/prime-video" onClick={() => setMobileNav(false)}>Prime Video <AiOutlineRight /></Link></li>
                <li><Link to="/music" onClick={() => setMobileNav(false)}>Amazon Music <AiOutlineRight /></Link></li>
                <li><Link to="/kindle" onClick={() => setMobileNav(false)}>Kindle <AiOutlineRight /></Link></li>
              </ul>
            </div>
            <div className="header__mobileNavSeparator" />
            <div className="header__mobileNavSection">
              <h3>Configurações</h3>
              <ul>
                <li><Link to="/account" onClick={() => setMobileNav(false)}>Sua Conta <AiOutlineRight /></Link></li>
                <li><Link to="/help" onClick={() => setMobileNav(false)}>Ajuda <AiOutlineRight /></Link></li>
                {profile ? (
                  <li><button className="header__mobileNavLogout" onClick={() => { auth.signOut(); setMobileNav(false); }}>Sair <AiOutlineRight /></button></li>
                ) : (
                  <li><Link to="/login" onClick={() => setMobileNav(false)}>Login / Cadastrar <AiOutlineRight /></Link></li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <button className={`header__toggleClose ${mobileNav ? "header__toggleClose--active" : ""}`} onClick={() => setMobileNav(false)}>
          <CgClose />
        </button>
      </div>
    </div>
  );
}

export default Header;