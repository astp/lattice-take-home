import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Card, Icon } from 'semantic-ui-react';
import image from '../image.png';

const MoviesContainer = ({ movies }) => (
  <Grid>
    <Grid.Row columns={4}>
      {movies.results.map((movie) => {
        const img = movie.poster_path ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}` : image;

        return (
          <Grid.Column key={movie.id}>
            <Card>
              <Image className="card-image"size="medium" src={img} />
              <Card.Content textAlign="left">
                <Card.Header >
                  {movie.title}
                </Card.Header>
                <Card.Meta>{movie.release_date}</Card.Meta>
                <Card.Content extra >
                  {movie.vote_average}
                  <Icon name="star" color="yellow" />
                </Card.Content>
              </Card.Content>
              <Card.Content extra>
                <a href={`https://www.themoviedb.org/movie/${movie.id}`}>
                  <Icon name="info" />
                  More Info
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
        );
      })}
    </Grid.Row>
  </Grid>
);

MoviesContainer.propTypes = {
  movies: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      vote_average: PropTypes.number,
      title: PropTypes.string,
      release_date: PropTypes.string,
    })),
  }).isRequired,
};

export default MoviesContainer;
