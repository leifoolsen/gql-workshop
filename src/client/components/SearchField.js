import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

const searcBox = {
  display: 'flex',
  margin: '32px 0',
  maxWidth: '400px'
};

const searchLabel = {
  marginRight: '16px'
};

const searchInput = {
  flex: '1'
};

const searchButton = {
  marginLeft: '16px'
};

const SearchField = ({id = uuid(), label, value, onSearch}) => {
  let textInput = null;

  const search = () => {
    if (onSearch) {
      onSearch(textInput.value);
    }
  };

  return (
    <div style={searcBox}>
      <label style={searchLabel} htmlFor={id}>
        {label}
      </label>
      <input
        style={searchInput}
        id={id}
        type="text"
        ref={(input) => {
          textInput = input;
        }}
        defaultValue={value}
      />
      <button style={searchButton} type="button" onClick={search}>
        Søk
      </button>
    </div>
  );
};

SearchField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onSearch: PropTypes.func
};

export default SearchField;
