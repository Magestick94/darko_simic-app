import { Link } from "react-router-dom";

export default function MakeButton({make}) {
  return(
    <Link to={`/cars?make=${make.name}`} style={{textDecoration: "none"}}>
      <button className="make-btn">
        <div className="make-btn-img">
          <img src={`${make.imgURL}`} alt="make logo"/>
        </div>
        <div className="make-btn-name">
          {make.name}
        </div>
      </button>
    </Link>
  )
}