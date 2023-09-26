import './Block2.css'
import Icon from '../../assets/img/home/фон.png'

export const Block2 = () => {

    const scrollToDown = () => {
        window.scrollTo({
          top: window.scrollY + window.innerHeight * 1.1,
          behavior: 'smooth',
        });
    };

    return(
        <div className='block2'>
            <div className='block2-wrapper'>
                <div className='block2-text2'>Road Analyzer</div>
                <div className='block2-text2'>Оценка рентабельности заправочных пунктов</div>
                <button onClick={scrollToDown}>
                    <div className='button-text'>Get started</div>
                </button>
            </div>
        </div>
    )
}