import React from 'react';
import YouTube from 'react-youtube';
import {
  func,
  number,
  object,
  string,
} from 'prop-types';

import {
  MovieDetailsContainer,
  FakeMovieDetailsContainer,
  Closer,
  CoverImage,
  Title,
  Shadow,
  GradientShadow,
  ButtonsContainer,
  DetailsContent,
  Synopsis,
} from './styles';
import PlayButton from '../../components/PlayButton';
import MetaList from './MetaList';
import AddListButton from '../../components/AddListButton';

const MovieDetails = ({
  handleChangeIsPreviewOpen,
  height,
  detailsData,
  imdbId,
  resetDetailsData,
}) => {
  const opts = {
    height: '170%',
    width: '100%',
    playerVars: {
      showinfo: 0,
      controls: 0,
      loop: 1,
      modestbranding: 0,
      rel: 0,
    },
  };

  return (
    <FakeMovieDetailsContainer height={height}>
      {(detailsData && imdbId === detailsData.movie.imdbId) &&
        <MovieDetailsContainer height={height}>
          <Shadow>
            <Title>{detailsData.movie.title}</Title>
            <DetailsContent>
              <Synopsis>{detailsData.movie.summary}</Synopsis>
              <ButtonsContainer>
                <PlayButton to={`/video/${detailsData.movie.imdbId}`} />
                <AddListButton />
              </ButtonsContainer>
              {console.log(detailsData.movie)}
              <MetaList
                cast={detailsData.movie.actors}
                genres={detailsData.movie.genres}
                production={detailsData.movie.production}
              />
            </DetailsContent>
          </Shadow>
          <GradientShadow />
          <CoverImage height={height}>
            <YouTube
              videoId={detailsData.movie.trailer}
              onReady={event => event.target.playVideo()}
              opts={opts}
            />
          </CoverImage>
        </MovieDetailsContainer>
      }
      {height !== 0 &&
        <Closer onClick={() => {
          handleChangeIsPreviewOpen();
          resetDetailsData();
          }}
        />
      }
    </FakeMovieDetailsContainer>
  )
};

MovieDetails.propTypes = {
  handleChangeIsPreviewOpen: func.isRequired,
  height: number.isRequired,
  detailsData: object,
  imdbId: string,
  resetDetailsData: func.isRequired,
};

export default MovieDetails;
