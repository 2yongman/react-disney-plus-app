import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import requests from '../api/request';
import './Banner.css'
import { styled } from "styled-components";

const Banner = () => {

  const [movie, setMovie] = useState([]);

  const [isClicked,setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    //현재 상영중인 영화 정보들 가져오기
    const response = await axios.get(requests.fetchNowPlaying);
    //여러 영화 중 영화 하나의 ID를 가져오기
    const movieId = response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id

    // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const {data: movieDetail}= await axios.get(`movie/${movieId}`,{params: { append_to_response: "videos" } //비디오 정보도 달라!
  })
    setMovie(movieDetail);
  }

  const truncate = (str,n) => {
    return str?.length > n ? str.substring(0,n) + "..." : str;
  }

  if(isClicked){
    return(
      <>
        <Container>
          <HomeContainer>
            <Iframe 
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&mute1&playlist=${movie.videos.results[0].key}`}
            width="640"
            heigth="360"
            framborder="0"
            allow="autoplay; fullscreen"
            >
            </Iframe>
          </HomeContainer>
        </Container>
        <button onClick={()=>setIsClicked(false)}>X</button>
      </>
    )
    
  } else {
    return (
      <div>
        <header className='banner' style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover"
        }}>
          <div className='banner__contents'>
            <h1 className='banner__title'>
              {movie.title || movie.name || movie.original_name} 
            </h1>
  
            <div className='banner__buttons'>
              {movie?.videos?.results[0]?.key &&
                <button 
                  className='banner__button play'
                  onClick={() => setIsClicked(true)}
                >
                Play
                </button>
              }
  
  
            </div>
            <p className='banner__description'>
              {truncate(movie.overview,100)}
            </p>
          </div>
          <div className='banner--fadeBottom' />
        </header>
      </div>
    )
  }
  }

  

export default Banner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`