import { Link, useParams } from "react-router-dom";
import { Box, Container, Grid, ListItem } from "@mui/material";

import useData from "../hooks/useData";
import NewsCard from "../shared/NewsCard";

export default function NewsPage() {
  const { nId } = useParams();
  const { news } = useData('news');

  const article = news.find(item => item.id === +nId);

  // const cid = news.length-1;
  // if(isNaN(parseInt(window.location.href[window.location.href.length-1]))){
  //   window.location.href = window.location.href.replace("1", cid);
  // }
  return(
    <>
      <Container>
        <Box py={5}>
          {article && (
            <>
              <h1>{article.title}</h1>
              <p>Published: {article.date}</p>
              <div className="article-img">
                <img src={article.imgURL} alt="article img" />
              </div>
              <div className="article-desc">
              <p>{article.text}</p>
              </div>
            </>
          )}
        </Box>
      </Container>
      <div style={{backgroundColor: "#555"}}>
        <Container>
          <Grid container spacing={2} py={3}>
          {news.map(dataItem => {
            return (
              <Grid item xs={12} sm={6} md={4} key={dataItem.id}>
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
    </>
  )
}
