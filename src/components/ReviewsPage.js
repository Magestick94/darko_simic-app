import { Link, useParams } from "react-router-dom";
import { Box, Container, Grid, ListItem } from "@mui/material";

import useData from "../hooks/useData";
import NewsCard from "../shared/NewsCard";

export default function ReviewsPage() {
  const { rId } = useParams();
  const { reviews } = useData('reviews');

  const article = reviews.find(item => item.id === +rId);

  return(
    <>
      <Container>
        <Box pb={4}>
          <h2>Recenzije</h2>
          <p>Već skoro 70 godina pružamo recenzije novih automobila. Naš tim urednika, pisaca i saradnika čine automobilski stručnjaci koji su vozili gotovo svaki automobil na tržištu. Sveobuhvatni testni postupak Car and Driver-a istražuje performanse vozila, prostranost, udobnost, karakteristike, potrošnju goriva, domet električne vožnje, vrednost i još mnogo toga. Svake godine testiramo stotine vozila i merimo oko 200 podataka za svaki od njih. Uzimamo u obzir naša stvarna iskustva stečena iz kilometara provedenih za volanom kako bismo detaljno obradili svaki aspekt svakodnevnog iskustva vožnje.</p>
        </Box>
      </Container>
      <Container>
        {article && (
          <Box pb={5}>
            <h1>{article.title}</h1>
            <p>Published: {article.date}</p>
            <div className="article-img">
              <img src={article.imgURL} alt="article img" />
            </div>
            <div className="article-desc">
            <p>{article.text}</p>
            </div>
          </Box>
        )}
      </Container>
      <div style={{backgroundColor: "#555"}}>
        <Container>
          <Grid container spacing={2} py={3}>
          {reviews.map(dataItem => {
            return (
              <Grid item xs={12} sm={6} md={4} key={dataItem.id}>
                <ListItem>
                  <Link to={`/reviews/${dataItem.id}`} style={{textDecoration: "none"}}>
                    <NewsCard props={dataItem}></NewsCard>
                  </Link>
                </ListItem>
              </Grid>
              )
            })}
          </Grid>
        </Container>
      </div>
    </>
  )
}