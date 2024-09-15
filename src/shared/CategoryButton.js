import { Link } from "react-router-dom";

export default function CategoryButton({cat}) {
  return(
    <Link to={`/category/${cat.id}`}>
      <button className="category-btn">
        {cat.name}
      </button>
    </Link>
  )
}