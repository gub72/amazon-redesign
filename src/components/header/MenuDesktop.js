import React, { useState } from 'react';

const MenuDesktop = () => {
    const [activeLink, setActiveLink] = useState('');

    const menuItems = [
        'Venda na Amazon',
        'Chega em 15 min',
        'Ofertas do Dia',
        'Mais Vendidos',
        'Games',
        'Livros',
        'Prime',
        'Música',
        'Casa',
        'Eletrônicos'
    ];

    const handleLinkClick = (item) => {
        setActiveLink(item);
        // Aqui você pode adicionar a lógica de navegação
        console.log(`Clicou em: ${item}`);
    };

    return (
        <nav className="menu-desktop">
            <div className="menu-container">
                <ul className="menu-list">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`menu-item ${activeLink === item ? 'active' : ''}`}
                        >
                            <a
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick(item);
                                }}
                                className="menu-link"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default MenuDesktop;