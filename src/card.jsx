import { cardClick } from './App.jsx'

const Card = ({ data }) => {
    // console.log(data)
    return (
        <div className={
            `card ${data.state}`
        } onClick={()=> { cardClick(data) }}>
            <div className="front"></div>
            <div className="back">
                <img src={data.image} alt="" />
            </div>
        </div>
    )
}

export default Card