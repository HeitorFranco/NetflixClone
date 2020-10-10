import React, { useState, useEffect, useContext } from "react";
import { QueryContext } from "../contexts/queryContext";
import "./Header.css";
import Logo from "../assets/Logo_Hectoflix.png";
import SearchIcon from "@material-ui/icons/Search";
import Tmdb from "../Tmdb";
// import { Container } from './styles';

function Header({ black }) {
  const [visibleSearchMobile, setVisibleSearchMobile] = useState(false);
  const { query, setQuery, movies, setMovies } = useContext(QueryContext);

  useEffect(() => {
    async function Teste() {
      if (query.length) {
        const response = await Tmdb.GetMovies(query);
        console.log(response.results);
        setMovies(response.results);
      }
    }
    Teste();
  }, [query]);

  const handleSubmit = async () => {
    if (query.length) {
      const response = await Tmdb.GetMovies(query, 1);

      setMovies(response.results);
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleOpenSearchMobile = () => {
    setVisibleSearchMobile(!visibleSearchMobile);
  };
  return (
    <header className={black && "black"}>
      <div className="header--logo">
        <a href="/">
          <img src={Logo} alt="Logo_Netflix" />
        </a>
      </div>

      <div className="right">
        <div className="search-block">
          <div
            className="search-back"
            style={{
              display:
                window.innerWidth < 600
                  ? visibleSearchMobile
                    ? "flex"
                    : "none"
                  : "flex",
            }}
          >
            <div onClick={handleSubmit}>
              <SearchIcon />
            </div>

            <input
              onChange={handleChange}
              type="search"
              onKeyUp={handleEnter}
              placeholder="Search"
            />
          </div>
          <div className="search-mobile" onClick={handleOpenSearchMobile}>
            <SearchIcon />
          </div>
        </div>

        <div className="header--user">
          <a href="/">
            <img
              src="https://occ-0-417-185.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABXtDHDNmrrzum0MxRNJgSUfokYEH2wRn7NTntbAjNF0oz3HJ--5mtUdBoxmv0282xmsL1LpSUKxx72YBaOIgoNRhQZ40.png"
              alt="Usuário"
            />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
