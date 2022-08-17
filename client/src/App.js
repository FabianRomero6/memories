import React, { useEffect } from 'react';
import { AppBar, Container, Grid, Grow, Typography } from '@mui/material';
import Posts from './components/posts';
import Form from './components/form';
import styles from './App.module.css';
import { useDispatch } from 'react-redux';
import { getPosts } from './slice/postsSlice';

const memories =
  'https://raw.githubusercontent.com/adrianhajdin/project_mern_memories/master/client/src/images/memories.png?token=AF56X74XONEUGZ4FD2FUIA27UURPI';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={styles.app_bar} position="static" color="inherit">
        <Typography className={styles.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={styles.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyItems="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
