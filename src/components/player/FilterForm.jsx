import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

function FilterForm({ handleNameChange, playerName }) {
  return (
    <div>
    Name:
      <Input type="text" onChange={handleNameChange} value={playerName} text="Name" />
    </div>
  );
}

FilterForm.propTypes = {
  handleNameChange: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
};

export default FilterForm;
