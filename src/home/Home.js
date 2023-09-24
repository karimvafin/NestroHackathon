import "./Home.css"
import { Block1 }  from '../blocks/block1/Block1'

export const Home = () => {

    // const points = [
    //     { id: 1, lat: 50.906, lng: 34.793991999999996, label: 'Точка 1' },
    //   ];
    

    return(
        <div className="home">
            <Block1/>
        </div>
    )
}