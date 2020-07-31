import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { 
  Card, 
  CardMedia, 
  makeStyles, 
  CardContent, 
  Typography, 
  Container, 
  Divider, 
  CardActions, 
  Button,
  Grid,
  } from '@material-ui/core';

import Layout from '../templates/Layout';
import NavBar from '../templates/NavBar'

const pageQuery = graphql`
  {
    gcms {
      sponsors {
        url
        brief
        company
        logo {
          url 
        }
      }
    }
  }
`

export const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  media: {
    height: 200,
    objectFit: 'contain'
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Noto Sans JP',
    fontSize: '1.5rem',
    marginBottom: theme.spacing(1)
  },
  brief: {
    textAlign: 'left',
    fontFamily: 'Noto Sasn JP',
    fontSize: '1rem',
    color: "gray",
  },
  cards: {
    paddingTop: theme.spacing(10),
    display: "flex"
  }
}));

function SponsorCard (props) {
  const classes = useStyle();
  const name = props.sponsor.company
  const brief = props.sponsor.brief
  const url = props.sponsor.url
  const img = props.sponsor.logo.url
  let CardAction;

  if (url) {
    CardAction = 
      <CardActions>
        <Button size="small" color="primary" component={Link} to={url}>
          スポンサー様HPへ
        </Button>
      </CardActions>;
  }

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          component="img"
          src = {img}
        />
        <CardContent>
          <Typography className={classes.title}>
            {name}
          </Typography>
          <Typography className={classes.brief}>
            {brief}
          </Typography>
        </CardContent>
        <Divider style={{marginTop: "auto"}}/>
        {CardAction}
      </Card>
    </>
  )
}

export const Sponsors = (props) => {
  const classes = useStyle()
  const sponsors = props.sponsors
  return(
    <Grid container justify="left" spacing={1} className={classes.cards}>
      {sponsors.map(({...sponsor}) => (
        <Grid item xs={12} sm={6} md={4} align="center" style={{display: "flex",}}>
          <SponsorCard sponsor={sponsor} />
        </Grid>
      ))}
    </Grid>
  )
}

const SponsorPage = () => {
  const {gcms: {sponsors}} = useStaticQuery(pageQuery)
  const classes = useStyle()

  return (
    <>
      <Layout>
        <NavBar/>
        <Container maxWidth="md">
          <Sponsors sponsors={sponsors}/>
        </Container>
      </Layout>
    </>
  )
}

export default SponsorPage;