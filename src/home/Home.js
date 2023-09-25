import "./Home.css"
import { Block1 }  from '../blocks/block1/Block1'
import { Block2 } from "../blocks/ block2/Block2"
import { Footer } from "../blocks/footer/Footer"

export const Home = () => {

    return(
        <div className="home">
            <Block2/>
            <Block1/>
            <Footer/>
        </div>
    )
}