import "./Home.css"
import { Block1 } from "../blocks/Block1"
import { Header } from "../blocks/header/Header"

export const Home = () => {

    // const points = [
    //     { id: 1, lat: 50.906, lng: 34.793991999999996, label: 'Точка 1' },
    //   ];
    

    return(
        <div className="home">
            {/* <Header/> */}
            {/* <div className="home-wrapper"> */}
            <Block1/>
            {/* <Block1 points={points} onMarkerClick={handleMarkerClick} /> */}
                {/* <ul>
                    <li>ghj</li>
                    <li>ghj</li>
                    <li>ghj</li>
                    <li>ghj</li>
                    <li>ghj</li>
                </ul> */}
            {/* </div> */}
        </div>
    )
}