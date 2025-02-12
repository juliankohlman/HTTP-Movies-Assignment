import React, { useState, useEffect } from "react";
import axios from "axios";

export const UpdateMovie = props => {
  console.log(props);
  let id = props.match.params.id;
  console.log("id", id);

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  // const [update, setUpdate] = useState(movie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, []);

  console.log(movie);

  /* 
  {
    id: 5, => pulled from url param
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: 89,
    stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}
  */
  const handleChange = e => {
    console.log(update);
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  /* 
  {movie.stars.map((star, index) => {
            return (
              <input
                type="text"
                name="stars"
                value={star}
                onChange={e => handleStars(e.target.value, index)}
              />
            );
          })}
  */
  const handleStars = (value, idx) => {
    // based on the index set star equal to e.target.value else star remains unchanged
    const changedStar = movie.stars.map((star, i) =>
      i === idx ? value : star
    );
    setMovie({ ...movie, stars: changedStar });
  };

  const movieUpdate = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res);
        setMovie(res.data);
        // setUpdate({});
        props.history.push(`/movies/${id}`);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>{movie.title}</h2>
      <form onSubmit={movieUpdate}>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          placeholder={movie.title}
          value={movie.title}
          onChange={handleChange}
        />
        <label>Director: </label>
        <input
          type="text"
          name="director"
          placeholder={movie.director}
          value={movie.director}
          onChange={handleChange}
        />
        <label>Metascore: </label>
        <input
          type="number"
          name="metascore"
          placeholder={movie.metascore}
          value={movie.metascore}
          onChange={handleChange}
        />
        <label>Stars: </label>
        {movie.stars.map((star, index) => {
          return (
            <input
              type="text"
              name="stars"
              value={star}
              onChange={e => handleStars(e, index)}
            />
          );
        })}
        <button>Update {movie.title}</button>
      </form>
      {/* <form>
        <input type="text" name="title" id="" />
      </form> */}
    </div>
  );
};
