import React from 'react';
import {
  array,
  func,
  object,
  bool,
} from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'lodash';
import VisibilitySensor from 'react-visibility-sensor';
import { compose, lifecycle } from 'recompose';

import {
  getMovies,
  getReqParams,
  getIsFetchPossible,
} from '../../selectors/movies';
import {
  MoviesContainer,
  MoviePreviewContainer,
  ParamsContainer,
  Title,
} from './styles';
import MoviePreview from '../../components/MoviePreview';
import Spinner from '../../components/Spinner';
import GenresWrapperButton from '../../components/GenresWrapperButton';
import RatingWrapperButton from '../../components/RatingWrapperButton';
import req from '../../request';
import {
  addMovies,
  resetMovies,
  resetMoviesParams,
} from '../../actions/movies';

const onChange = (isVisible, addMovies, reqParams) => {
  if (isVisible) {
    req.movies({
      limit: 25,
      offset: reqParams.count,
      genres: reqParams.genres,
      ratings: reqParams.ratings })
      .then(movies => addMovies(movies));
  }
};

const Movies = ({
  movies,
  addMovies,
  reqParams,
  isFetchPossible,
}) => (
  <MoviesContainer>
    <ParamsContainer>
      <Title>Films</Title>
      <GenresWrapperButton selectedGenre={reqParams.genres} />
      <RatingWrapperButton />
    </ParamsContainer>
    <MoviePreviewContainer>
      {map(movies, (movie, index) => <MoviePreview key={movie.imdbId} moviesCount={reqParams.count} pos={index} movie={movie} />)}
    </MoviePreviewContainer>
    {reqParams.q.length === 0 && isFetchPossible &&
      <VisibilitySensor onChange={isVisible => onChange(isVisible, addMovies, reqParams)}>
        <Spinner />
      </VisibilitySensor>
    }
  </MoviesContainer>
);

Movies.propTypes = {
  movies: array.isRequired,
  addMovies: func.isRequired,
  reqParams: object.isRequired,
  isFetchPossible: bool.isRequired,
};

const actions = { addMovies, resetMovies, resetMoviesParams };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
  movies: getMovies(state),
  reqParams: getReqParams(state),
  isFetchPossible: getIsFetchPossible(state),
});

const enhance = compose(

  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillUnmount() {
      this.props.resetMovies();
      this.props.resetMoviesParams();
    },
  }),
);

export default enhance(Movies);
