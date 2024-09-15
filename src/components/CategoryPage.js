import { useParams, Link } from "react-router-dom";
import { Box, Button, Container } from "@mui/material";
import EastIcon from '@mui/icons-material/East';

import CategoryMenu from "../shared/CategoryMenu";
import useData from "../hooks/useData";

export default function CategoryPage() {
  const { cId } = useParams();
  const { categories } = useData('categories');

  const category = categories.find(cat => cat.id === cId);
  
  return(
    <Container>
      <h2>Popularne kategorije</h2>
      <CategoryMenu></CategoryMenu>
      <Box py={5}>
        {category && (
          <>
            <div className="category-img">
              <img src={category.imgURL} alt="category img" />
            </div>
            <Box pt={4} display="flex" justifyContent="space-between" alignItems="center">
              <h1>{category.name}</h1>
              <Button component={Link} to={`/cars?category=${category.name}`} variant="outlined" color="primary">
                <span style={{fontSize: "17px"}}>Search for this type of cars</span>
                <EastIcon />
              </Button>
            </Box>
            <div className="category-desc">
            <p>{category.desc}</p>
            </div>
          </>
        )}
      </Box>
    </Container>
  )
}