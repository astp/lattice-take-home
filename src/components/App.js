import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Container, Menu, Icon } from 'semantic-ui-react';
import SearchBar from './SearchBar';
import MoviesContainer from './MoviesContainer';
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.state = {
      movies: [],
      isNewQuery: false,
      currentPage: 1,
      queryString: '',
    };
  }
  componentWillMount() {
    this.getMovies();
  }

  getMovies() {
    const { currentPage } = this.state;
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5b19221d20b929615d236692cea743e4&language=en-US&page=${currentPage}`)
      .then(res => res.json())
      .then((movies) => {
        this.setState({ movies });
      });
  }

  handleSearch(query) {
    this.setState({ isNewQuery: true, queryString: query });
    const { currentPage } = this.state;
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=5b19221d20b929615d236692cea743e4&language=en-US&page=${currentPage}&query=${query}&include_adult=false`)
      .then(res => res.json())
      .then(movies => this.setState({ movies }));
  }

  handlePageClick(data) {
    const selected = data.selected + 1;
    const { isNewQuery, queryString } = this.state;
    this.setState({ currentPage: selected });
    if (isNewQuery) {
      this.handleSearch(queryString);
      this.getMovies();
    }
  }

  render() {
    const { movies, isNewQuery } = this.state;
    return (
      <div className="App">
        <Menu stackable>
          <Menu.Item>
            <Icon name="ticket" inverted size="large" />
          </Menu.Item>
        </Menu>
        <Container>
          <SearchBar onSearch={this.handleSearch} isNewQuery={isNewQuery} />
          {isNewQuery ?
            <h1>Movie Results</h1> :
            <h1>Popular Movie</h1>
          }
          {movies.results && !movies.results.length &&
            <h4>No results found..</h4>
          }
          {movies.results &&
            <MoviesContainer movies={movies} />
          }

        </Container>

        {movies.results &&
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            pageCount={movies.total_pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        }

      </div>
    );
  }
}

export default App;
