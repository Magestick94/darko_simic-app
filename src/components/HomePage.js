
//Ubacivanje Componenta iz componentske biblioteke
import { Container, Grid, ListItem } from "@mui/material";

import CategoryMenu from "../shared/CategoryMenu";
import NewsCard from "../shared/NewsCard";
import useData from "../hooks/useData";

//Ubacivanje Componenta iz componentske biblioteke
import { Link } from "react-router-dom";

import MakeMenu from "../shared/MakeMenu";

export default function HomePage() {
  
  let { news } = useData('news');

  return(
    <>
      <div className="home-page-img">
        <h1>Every Type of Car On One Place</h1>
      </div>
      <Container>
        <h2>Popularne kategorije</h2>
        <CategoryMenu></CategoryMenu>
      </Container>
      <div className="home-latest-news">
        <Container>
          <h2>Latest news</h2>
          <Grid container spacing={2} pb={3}>
            {news.slice(0, 3).map(dataItem => {
              return (
                <Grid item xs={4} key={dataItem.id}>
                  <ListItem>
                    <Link to={`/news/${dataItem.id}`} style={{textDecoration: "none"}}>
                      <NewsCard props={dataItem}></NewsCard>
                    </Link>
                  </ListItem>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </div>
      <Container>
        <h2>Makes</h2>
        <MakeMenu></MakeMenu>
      </Container>
    </>
  )
}


/*
Koriscenje Komponenta Iz Komponentske Biblioteke
  <Container>
    <h2>Popularne kategorije</h2>
    <CategoryMenu></CategoryMenu>
  </Container>
*/