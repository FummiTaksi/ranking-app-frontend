import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';

const renderPlayer = player => (
  <List.Item key={player._id} id={player._id}>
    <Link to={`/players/${player._id}`}>
      {player.name}
    </Link>
  </List.Item>
);

function PlayerList({ players }) {
  return (
    <List id="playerList">
      {players.map(player => renderPlayer(player))}
    </List>
  );
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayerList;
