import './Card.css'

export const CardType = {
  FIRST: "first",
  SECOND: "second",
  THIRD: "third"
};

export function CardWrapper(props) {
    const classes = "card " + props.className;
    return <div className={classes}>{props.children}</div>;
}

export const Card = (props) => {

    return (
        <div>
            <div className={`card-${props.cardType}`}>
                {props.cardType === CardType.FIRST && (
                    <div>
                        <div className='chart-card'>{props.chart}</div>
                        <div className="card-text">{props.text}</div>
                    </div>
                )}
            </div>
        </div>
    );
};
