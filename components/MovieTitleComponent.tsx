"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMovie, addToBasket, addToLikedMovies } from "@/store/store";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import {
  Favorite,
  FavoriteBorder,
  AddShoppingCart,
  RemoveShoppingCart,
  ShoppingBasket,
} from "@material-ui/icons";
interface RootState {
  movies: { title: string; inBasket: boolean; liked: boolean }[];
  basket: string[];
  likedMovies: string[];
}
const MovieTitleComponent = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const dispatch = useDispatch();
  function handleAddMovie() {
    const newMovie = {
      title: movieTitle,
      inBasket: false,
      liked: false,
    };
    dispatch(addMovie(newMovie));
    setMovieTitle("");
  }
  function handleToBasket(movieTitle: string) {
    dispatch(addToBasket(movieTitle));
  }
  function handleLikedMovies(movieTitle: string) {
    dispatch(addToLikedMovies(movieTitle));
  }
  const movies = useSelector((state: RootState) => state.movies);
  const basket = useSelector((state: RootState) => state.basket);
  const likedMovies = useSelector((state: RootState) => state.likedMovies);
  return (
    <div className="container">
      <h1>My Movie List</h1>
      <h3>Movie title: {movieTitle}</h3>
      <div className="add-movie">
        <input
          type="text"
          placeholder="Enter a movie title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <button onClick={handleAddMovie}>Add Moive</button>
      </div>
      <div>
        <h2>My movies</h2>
        <ul className="movie-list">
          {movies.map((movie, index) => (
            <Card key={index} className="movie-card">
              <CardContent>
                <Typography variant="h5" component="h5">
                  {movie.title}
                </Typography>
                <CardActions>
                  <Button
                    startIcon={
                      movie.inBasket ? (
                        <RemoveShoppingCart />
                      ) : (
                        <ShoppingBasket />
                      )
                    }
                    onClick={() => handleToBasket(movie.title)}
                  >
                    {!movie.inBasket ? "Add To Basket" : "Remove from basket"}
                  </Button>
                  <Button
                    startIcon={movie.liked ? <Favorite /> : <FavoriteBorder />}
                    onClick={() => handleLikedMovies(movie.title)}
                  >
                    {!movie.liked ? "Liked" : "Disliked"}
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </ul>
      </div>
      <div>
        <h2>My basket: {basket.length}</h2>
        <ul>
          {basket.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Liked movies: {likedMovies.length}</h2>
        <ul>
          {likedMovies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieTitleComponent;
