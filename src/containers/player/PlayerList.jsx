import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { getPlayers } from '../../reducers/playerReducer';

class PlayerList extends React.Component {
  componentDidMount() {
    const { getAllPlayers } = this.props;
    getAllPlayers();
  }

  render() {
    const { player } = this.props;
    if (player.loading) {
      return (
        <p>
          Please be patient :)
        </p>
      );
    }
    if (player.error) {
      return (
        <p>
           Error
        </p>
      );
    }
    return (
      <h2>
        {`Database contains ${player.players.length} players`}
      </h2>
    );
  }
}

PlayerList.propTypes = {
  getAllPlayers: PropTypes.func.isRequired,
  player: PropTypes.shape({
    players: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  getAllPlayers: getPlayers,
};

const mapStateToProps = state => ({
  player: state.player,
});

const connectedPlayerList = connect(mapStateToProps, mapDispatchToProps)(PlayerList);

export default connectedPlayerList;
