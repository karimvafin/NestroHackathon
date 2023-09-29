import "./Home.css"
import { Block1 }  from '../blocks/block1/Block1'
import { Block2 } from "../blocks/block2/Block2"
import { Footer } from "../blocks/footer/Footer"
import SliderbarMenu from "../components/sliderbarMenu/SliderbarMenu"
import { Header } from '../blocks/header/Header'
import { useState } from "react"

export const Home = () => {
    const menuItems = [
        { to: '/', label: 'dashboard' },
        { to: '/about', label: 'map' },
        { to: '/services', label: 'table' },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="home">
            {/* <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} /> */}
            {isMenuOpen && <SliderbarMenu menuItems={menuItems} />}
            <Block2 />
            <Block1 />
            <Footer />
        </div>
    );
};
