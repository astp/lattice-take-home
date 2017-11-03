import React from 'react';
import { Input } from 'semantic-ui-react';

class Search extends React.Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    this.props.onSearch(e.target.value);
  }
  render() {
    return (
      <Input fluid icon="search" onKeyUp={this.handleSearch} placeholder="Search..." />
    );
  }
}

export default Search;
