import React, { useEffect, useState, useContext } from "react";
import "./HomePage.css";
import Tmdb from "../Tmdb";
import MovieRow from "./MovieRow";
import FeaturedMovie from "./FeaturedMovie";
import Header from "./Header";
import { QueryContext } from "../contexts/queryContext";

function App() {
  const [page, setPage] = useState(1);
  const { query, setQuery, movies, setMovies } = useContext(QueryContext);
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  const colorVoteAverage = (voteAverage) => {
    if (voteAverage >= 8.0) {
      return "#2ecc71";
    }
    if (voteAverage >= 6.0) {
      return "yellow";
    }

    if (voteAverage >= 2.0) {
      return "#c0392b";
    }

    if (voteAverage >= 0) {
      return "#f00";
    }
  };

  const addPage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    const getMovies = async () => {
      if (query.length) {
        const response = await Tmdb.GetMovies(query, page);
        setMovies([...movies, ...response.results]);
      }
    };

    getMovies();
  }, [page]);

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista Total
      let list = await Tmdb.getHomeList();

      // Pegando o Featured

      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await Tmdb.GetMovieInfo(chosen.id, "tv");
      setTimeout(() => {
        setFeaturedData(chosenInfo);
        setMovieList(list);
      }, 200);
    };

    loadAll();
  }, []);
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {query.length && movies ? (
        <>
          <div className="list-search">
            {movies.map((movie, key) => {
              if (movie.original_name || movie.original_title) {
                return (
                  <>
                    <div key={key} className="movieSearch--item">
                      <img
                        draggable="false"
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        /*onError={(e) => {
                        console.log((e.target.src = "s"));
                      }}*/
                        alt={movie.original_name || movie.original_title}
                      />
                      <div className="movie-info">
                        <h1>{movie.original_name || movie.original_title}</h1>
                        <div
                          className="movie-info-vote-average"
                          style={{
                            color: colorVoteAverage(movie.vote_average),
                          }}
                        >
                          {movie.vote_average}
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
          <input
            className="moreMovies"
            type="button"
            value="+ Mostrar Mais"
            onClick={addPage}
          />
        </>
      ) : (
        <>
          {featuredData && <FeaturedMovie item={featuredData} />}

          <section className="lists">
            {movieList.map((item, key) => (
              <MovieRow key={key} title={item.title} items={item.items} />
            ))}
          </section>

          <footer>
            Feito com{" "}
            <span role="img" aria-label="coração">
              🧡
            </span>{" "}
            pelo HeitorMaf
            <br />
            Direitos de imagem para Netflix <br />
            Dados pegos do site Themoviedb.org <br />
          </footer>

          {movieList.length <= 0 && (
            <div className="loading">
              <img
                src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2000,c_limit/Netflix_LoadTime.gif"
                alt="Carregando"
              ></img>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
