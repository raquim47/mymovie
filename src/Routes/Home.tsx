function Home(){
  return null
}
export default Home;
// import { AnimatePresence, motion } from 'framer-motion';
// import { useState } from 'react';
// import { useQuery } from 'react-query';
// import { useNavigate, useMatch } from 'react-router-dom';
// import styled from 'styled-components';
// // import { getMovies, IGetMoviesResult } from '../api';
// import { makeImagePath } from '../utils';

// const Wrapper = styled.div``;

// const Loader = styled.div`
//   height: 20vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Banner = styled.div<{ $bgPhoto: string }>`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   height: 100vh;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
//     url(${(props) => props.$bgPhoto});
//   background-size: cover;
// `;

// const Title = styled.h2`
//   font-size: 60px;
//   margin-bottom: 20px;
// `;

// const Overview = styled.p`
//   font-size: 24px;
//   width: 50%;
// `;

// const Slider = styled.div`
//   position: relative;
//   top: -100px;
// `;

// const Row = styled(motion.div)`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   gap: 5px;
//   width: 100%;
// `;

// const Box = styled(motion.div)<{ $bgPhoto: string }>`
//   height: 100px;
//   font-size: 40px;
//   background-color: white;
//   background-image: url(${(props) => props.$bgPhoto});
//   background-size: cover;
//   background-position: center center;
//   cursor: pointer;

//   &:first-child {
//     transform-origin: center left;
//   }

//   &:last-child {
//     transform-origin: center right;
//   }
// `;

// const Info = styled(motion.div)`
//   top: 100%;
//   position: relative;
//   bottom: 0;
//   width: 100%;
//   padding: 10px;
//   background-color: ${(props) => props.theme.black.lighter};
//   opacity: 0;
//   h4 {
//     text-align: center;
//     font-size: 12px;
//   }
// `;
// const BigMovie = styled(motion.div)`
//   position: fixed;
//   width: 40vw;
//   height: 70%;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   margin: auto;
//   border-radius: 10px;
//   overflow: hidden;
//   background-color: ${(props) => props.theme.black.lighter};
// `;

// const BigCover = styled.div`
//   width: 100%;
//   background-size: cover;
//   background-position: center center;
//   height: 300px;
// `;

// const BigTitle = styled.h2`
//   position: relative;
//   top: -70px;
//   padding: 20px;
//   font-size: 30px;
//   color: ${(props) => props.theme.white.white};
// `;

// const BigOverview = styled.p`
//   position: relative;
//   top: -70px;
//   padding: 20px;
//   color: ${(props) => props.theme.white.white};
// `;
// const Overlay = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   opacity: 0;
// `;

// const rowVariants = {
//   hidden: {
//     x: window.outerWidth - 10,
//   },
//   visible: {
//     x: 0,
//   },
//   exit: {
//     x: -window.outerWidth + 10,
//   },
// };

// const BoxVariants = {
//   normal: {
//     scale: 1,
//   },
//   hover: {
//     scale: 1.3,
//     y: -50,
//     transition: {
//       type: 'tween',
//       duration: 0.2,
//       delay: 0.3,
//     },
//   },
//   exit: {
//     zIndex: 10,
//   },
// };

// const infoVariants = {
//   hover: {
//     opacity: 1,
//     transition: {
//       type: 'tween',
//       duration: 0.2,
//       delay: 0.2,
//     },
//   },
// };
// const offset = 6;

// function Home() {
//   const navigate = useNavigate();
//   const bigMovieMatch = useMatch('/movies/:movieId');

//   const { data, isLoading } = useQuery<IGetMoviesResult>(
//     ['movies', 'nowPlaying'],
//     getMovies
//   );
//     console.log(data)
//   const [index, setIndex] = useState(0);
//   const [leaving, setLeaving] = useState(false);
//   const increaseIndex = () => {
//     if (!data) return;
//     if (leaving) return;
//     setLeaving(true);
//     const totalMovies = data.results.length - 1;
//     const maxIndex = Math.floor(totalMovies / offset) - 1;
//     setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
//   };
//   const toggleLeaving = () => setLeaving((prev) => !prev);

//   const onBoxClicked = (movieId: number) => {
//     navigate(`/detail/${movieId}`);
//   };

//   const onOverlayClicked = () => navigate('/');
//   const clickedMovie =
//     bigMovieMatch?.params.movieId &&
//     data?.results.find(
//       (movie) => String(movie.id) === bigMovieMatch.params.movieId
//     );
//   return (
//     <Wrapper>
//       {isLoading ? (
//         <Loader>Loading...</Loader>
//       ) : (
//         <>
//           <Banner
//             onClick={increaseIndex}
//             $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
//           >
//             <Title>{data?.results[0].title}</Title>
//             <Overview>{data?.results[0].overview}</Overview>
//           </Banner>
//           <Slider>
//             <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
//               <Row
//                 variants={rowVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ type: 'linear', duration: 2 }}
//                 key={index}
//               >
//                 {data?.results
//                   .slice(1)
//                   .slice(offset * index, offset * index + offset)
//                   .map((movie) => (
//                     <Box
//                       layoutId={movie.id + ''}
//                       key={movie.id}
//                       onClick={() => onBoxClicked(movie.id)}
//                       variants={BoxVariants}
//                       initial="normal"
//                       whileHover="hover"
//                       exit="exit"
//                       transition={{ type: 'tween' }}
//                       $bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
//                     >
//                       <Info variants={infoVariants}>
//                         <h4>{movie.title}</h4>
//                       </Info>
//                     </Box>
//                   ))}
//               </Row>
//             </AnimatePresence>
//           </Slider>
//         </>
//       )}
//     </Wrapper>
//   );
// }
// export default Home;
