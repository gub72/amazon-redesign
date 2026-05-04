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
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon"
              className="footer__logo-img"
            />
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
