import React, { Component } from 'react';
import Like from './common/like';
import { getMovies } from '../services/movieService';

class Movies extends Component {
  state = {
    movies: getMovies()
  };
  
  handleDelete = (movie) => {
    //need explenation below line. in filter and m=> function
    const updatedMovie = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({movies : updatedMovie})
  }

  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  render() { 
    const {length: count} = this.state.movies;
    if(count === 0) {
      return (
        <p>There is no movies on Database</p>
      );
    }

    return (
      <React.Fragment>
        <p>Showing {count} movies in Database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td> < Like liked={movie.liked} onClick={() => this.handleLiked(movie)} /></td>
                <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
              </tr>
            ))}

          </tbody>
        </table>
      </React.Fragment>
      
    );
  }
}
 
export default Movies;