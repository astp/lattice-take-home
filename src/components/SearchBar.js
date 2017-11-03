import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class Search extends React.Component {
  constructor(props) {
    super(props);
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

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
