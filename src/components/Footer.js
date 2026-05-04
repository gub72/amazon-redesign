import React, { useState } from "react";
import "../styles/Footer.css";

const footerLinks = [
  {
    title: "Conheça-nos",
    links: [
      "Sobre a Amazon",
      "Informações corporativas",
      "Carreiras",
      "Comunicados à imprensa",
      "Comunidade",
      "Acessibilidade",
      "Amazon Science",
    ],
  },
  {
    title: "Ganhe dinheiro conosco",
    links: [
      "Venda na Amazon",
      "Proteja e construa a sua marca",
      "Forneça para a Amazon",
      "Publique seus livros",
      "Seja um associado",
      "Anuncie seus produtos",
    ],
  },
  {
    title: "Pagamento",
    links: [
      "Meios de Pagamento",
      "Compre com Pontos",
      "Cartão de crédito Amazon",
    ],
  },
  {
    title: "Deixe-nos ajudar você",
    links: [
      "Sua conta",
      "Frete e prazo de entrega",
      "Devoluções e reembolsos",
      "Gerencie seu conteúdo e dispositivos",
      "Recalls e alertas de segurança do produto",
      "Ajuda",
    ],
  },
];

function FooterAccordion({ section }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`footer__accordion ${open ? "open" : ""}`}>
      <button
        className="footer__accordion-header"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{section.title}</span>
        <span className="footer__accordion-icon">{open ? "−" : "+"}</span>
      </button>
      <ul className="footer__accordion-body">
        {section.links.map((link) => (
          <li key={link}>
            <a href="#top">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">

      {/* Main links grid — desktop */}
      <nav className="footer__main" aria-label="Links úteis do rodapé">
        <div className="footer__columns desktop-footer-links">
          {footerLinks.map((section) => (
            <div className="footer__column" key={section.title}>
              <h3 className="footer__column-title">{section.title}</h3>
              <ul className="footer__column-links">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#top">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="footer__accordion-list mobile-footer-links">
          {footerLinks.map((section) => (
            <FooterAccordion key={section.title} section={section} />
          ))}
        </div>
      </nav>

      {/* Divider + logo + country */}
      <div className="footer__mid">
        <div className="footer__mid-inner">
          <a href="#top" className="footer__logo" aria-label="Voltar para o topo da Amazon">
            <svg className="footer__logo-img" width="90" height="28" viewBox="0 0 82 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g>
                <path d="M50.8599 19.3987C46.1004 22.9184 39.2018 24.7962 33.2623 24.7962C24.9341 24.7962 17.4366 21.7058 11.7645 16.5659C11.3189 16.1617 11.7181 15.6108 12.2529 15.9256C18.3743 19.4989 25.9431 21.6486 33.7614 21.6486C39.0343 21.6486 44.8348 20.5541 50.1682 18.2828C50.9739 17.9394 51.6478 18.8121 50.8599 19.3987Z" fill="#FF6200" />
                <path d="M52.8385 17.1274C52.2324 16.3477 48.817 16.759 47.284 16.9414C46.817 16.9987 46.7457 16.5909 47.1664 16.2976C49.8866 14.3768 54.3501 14.9312 54.8706 15.5751C55.3912 16.2225 54.7352 20.7114 52.179 22.854C51.7868 23.1831 51.4125 23.0078 51.5872 22.5714C52.1611 21.1335 53.4482 17.9108 52.8385 17.1274Z" fill="#FF6200" />
                <path d="M47.391 2.73768V0.870557C47.391 0.587984 47.6049 0.398411 47.8616 0.398411H56.1934C56.4608 0.398411 56.6747 0.591562 56.6747 0.870557V2.46942C56.6711 2.73768 56.4465 3.08821 56.0472 3.64263L51.7298 9.82704C53.3341 9.78769 55.0276 10.0273 56.4822 10.85C56.8101 11.036 56.8993 11.3079 56.9242 11.5761V13.5684C56.9242 13.8403 56.6248 14.1586 56.311 13.9941C53.7477 12.6456 50.343 12.499 47.5087 14.0084C47.2199 14.1658 46.9169 13.851 46.9169 13.5792V11.687C46.9169 11.383 46.9204 10.8643 47.2235 10.4029L52.2254 3.20625H47.8723C47.6049 3.20625 47.391 3.01668 47.391 2.73768Z" fill="white" />
                <path d="M16.9982 14.3875H14.4634C14.221 14.3697 14.0284 14.1872 14.0106 13.9547V0.902751C14.0106 0.641639 14.2281 0.434179 14.499 0.434179H16.8627C17.1087 0.444903 17.3048 0.634484 17.3226 0.870557V2.57673H17.369C17.9858 0.927786 19.1444 0.15876 20.706 0.15876C22.2924 0.15876 23.2836 0.927786 23.9966 2.57673C24.6098 0.927786 26.0038 0.15876 27.4976 0.15876C28.56 0.15876 29.7222 0.598715 30.4317 1.58593C31.2338 2.68403 31.0698 4.27931 31.0698 5.67787L31.0663 13.9154C31.0663 14.1765 30.8488 14.3875 30.5778 14.3875H28.0466C27.7935 14.3697 27.5903 14.1658 27.5903 13.9154V6.99773C27.5903 6.4469 27.6402 5.07338 27.519 4.55115C27.33 3.67482 26.7631 3.42802 26.0287 3.42802C25.4155 3.42802 24.7738 3.83936 24.5135 4.4975C24.2533 5.15565 24.2782 6.25732 24.2782 6.99773V13.9154C24.2782 14.1765 24.0608 14.3875 23.7898 14.3875H21.2586C21.0019 14.3697 20.8022 14.1658 20.8022 13.9154L20.7987 6.99773C20.7987 5.54195 21.0375 3.3994 19.2371 3.3994C17.4153 3.3994 17.4866 5.48829 17.4866 6.99773V13.9154C17.4866 14.1765 17.2692 14.3875 16.9982 14.3875Z" fill="white" />
                <path d="M63.8478 0.15876C67.609 0.15876 69.6447 3.3994 69.6447 7.51996C69.6447 11.501 67.3951 14.6594 63.8478 14.6594C60.1543 14.6594 58.1436 11.4187 58.1436 7.38046C58.1436 3.31714 60.1793 0.15876 63.8478 0.15876ZM63.8692 2.82353C62.001 2.82353 61.8834 5.37741 61.8834 6.96912C61.8834 8.5644 61.8584 11.9696 63.8478 11.9696C65.8122 11.9696 65.9049 9.22255 65.9049 7.54857C65.9049 6.4469 65.8585 5.13061 65.527 4.08616C65.2418 3.17764 64.6749 2.82353 63.8692 2.82353Z" fill="white" />
                <path d="M74.5217 14.3875H71.9976C71.7445 14.3697 71.5413 14.1658 71.5413 13.9154L71.5377 0.859826C71.5591 0.620176 71.7694 0.434179 72.0261 0.434179H74.3756C74.5966 0.444903 74.7784 0.595139 74.8283 0.79902V2.79491H74.8747C75.5842 1.01006 76.5788 0.15876 78.3293 0.15876C79.4666 0.15876 80.5754 0.5701 81.2884 1.69681C81.9515 2.74126 81.9515 4.4975 81.9515 5.76014V13.9762C81.923 14.2051 81.7126 14.3875 81.4631 14.3875H78.9211C78.6894 14.3697 78.4969 14.198 78.4719 13.9762V6.88685C78.4719 5.45968 78.6359 3.37079 76.8854 3.37079C76.2687 3.37079 75.7018 3.78571 75.4202 4.41523C75.0636 5.21288 75.0173 6.00694 75.0173 6.88685V13.9154C75.0137 14.1765 74.7927 14.3875 74.5217 14.3875Z" fill="white" />
                <path d="M40.7491 8.15306V7.60222C38.9166 7.60222 36.9808 7.99568 36.9808 10.1633C36.9808 11.2614 37.5476 12.0054 38.5209 12.0054C39.2339 12.0054 39.8721 11.5654 40.275 10.85C40.7741 9.97011 40.7491 9.14385 40.7491 8.15306ZM43.3053 14.3518C43.1378 14.502 42.8953 14.5127 42.7064 14.4126C41.865 13.7115 41.7153 13.386 41.2518 12.7171C39.8614 14.1407 38.8774 14.5664 37.0735 14.5664C34.9415 14.5664 33.2802 13.2465 33.2802 10.6032C33.2802 8.53936 34.396 7.13365 35.9825 6.4469C37.3587 5.83883 39.2803 5.73152 40.7491 5.56341V5.23434C40.7491 4.62984 40.7955 3.91447 40.4425 3.39225C40.1324 2.92368 39.5405 2.73053 39.02 2.73053C38.0539 2.73053 37.1911 3.22771 36.9808 4.25785C36.938 4.48677 36.7704 4.71211 36.5423 4.72285L34.0823 4.45815C33.8755 4.41166 33.6474 4.24354 33.7044 3.9252C34.2713 0.934942 36.9629 0.0335693 39.373 0.0335693C40.6065 0.0335693 42.218 0.362641 43.1912 1.29978C44.4248 2.45511 44.3071 3.99674 44.3071 5.67429V9.63746C44.3071 10.8286 44.7991 11.3508 45.2626 11.9946C45.4266 12.2235 45.4622 12.499 45.2555 12.6706C44.7385 13.1034 43.8187 13.9082 43.3125 14.3589L43.3053 14.3518Z" fill="white" />
                <path d="M7.51841 8.15306V7.60222C5.68593 7.60222 3.75006 7.99568 3.75006 10.1633C3.75006 11.2614 4.31691 12.0054 5.2902 12.0054C6.00323 12.0054 6.64139 11.5654 7.04425 10.85C7.54337 9.97011 7.51841 9.14385 7.51841 8.15306ZM10.0746 14.3518C9.90706 14.502 9.66463 14.5127 9.47568 14.4126C8.6343 13.7115 8.48457 13.386 8.0211 12.7171C6.63069 14.1407 5.64671 14.5664 3.84275 14.5664C1.71079 14.5664 0.0494385 13.2465 0.0494385 10.6032C0.0494385 8.53936 1.16533 7.13365 2.75182 6.4469C4.12796 5.83883 6.04957 5.73152 7.51841 5.56341V5.23434C7.51841 4.62984 7.56476 3.91447 7.21181 3.39225C6.90164 2.92368 6.30983 2.73053 5.78932 2.73053C4.82317 2.73053 3.9604 3.22771 3.75006 4.25785C3.70727 4.48677 3.53971 4.71211 3.31154 4.72285L0.851596 4.45815C0.644817 4.41166 0.416648 4.24354 0.47369 3.9252C1.04055 0.934942 3.73223 0.0335693 6.14227 0.0335693C7.37581 0.0335693 8.98725 0.362641 9.96054 1.29978C11.1941 2.45511 11.0764 3.99674 11.0764 5.67429V9.63746C11.0764 10.8286 11.5684 11.3508 12.0319 11.9946C12.1959 12.2235 12.2315 12.499 12.0248 12.6706C11.5078 13.1034 10.588 13.9082 10.0817 14.3589L10.0746 14.3518Z" fill="white" />
              </g>
            </svg>
          </a>
          <button className="footer__country-btn" id="footer-country-btn" aria-label="Selecionar país ou região">
            <span className="footer__flag" role="img" aria-label="Brasil">
              🇧🇷
            </span>
            Brasil
          </button>
        </div>
      </div>

      {/* Bottom legal */}
      <div className="footer__bottom">
        <nav className="footer__bottom-links" aria-label="Informações legais">
          <a href="#top">Condições de Uso</a>
          <span className="footer__separator" aria-hidden="true">|</span>
          <a href="#top">Notificação de Privacidade</a>
          <span className="footer__separator" aria-hidden="true">|</span>
          <a href="#top">Cookies</a>
          <span className="footer__separator" aria-hidden="true">|</span>
          <a href="#top">Anúncios Baseados em Interesses</a>
        </nav>
        <small className="footer__copyright">
          © 2021-2026 Amazon.com, Inc. ou suas afiliadas
        </small>
      </div>

      {/* Company info */}
      <address className="footer__company" style={{ fontStyle: "normal" }}>
        <small>
          <p>
            Amazon Serviços de Varejo do Brasil Ltda. | CNPJ 15.436.940/0001-03
          </p>
          <p>
            Av. Juscelino Kubitschek, 2041, Torre E, 18° andar - São Paulo CEP:
            04543-011 |{" "}
            <a href="#top">Fale conosco</a>
            {" | "}
            <a href="mailto:ajuda@amazon.com.br">ajuda-amazon@amazon.com.br</a>
          </p>
          <p>
            Formas de pagamento aceitas: cartões de crédito (Visa, MasterCard, Elo
            e American Express), cartões de débito (Visa e Elo), Boleto e Pix.
          </p>
        </small>
      </address>
    </footer>
  );
}

export default Footer;
