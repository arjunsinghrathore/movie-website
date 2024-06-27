import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';

const Homepage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from TMDB API
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: 'YOUR_TMDB_API_KEY'
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">CineConnect</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        {/* <h1>Welcome to CineConnect</h1> */}
        {movies.length > 0 && (
          <Carousel>
            {movies.map((movie) => (
              <Carousel.Item key={movie.id}>
                <img
                  className="d-block w-100"
                  src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                  alt={movie.title}
                />
                <Carousel.Caption>
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>
    </div>
  );
};

export default Homepage;
