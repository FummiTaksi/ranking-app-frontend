import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPlayer } from '../../reducers/playerReducer';
import Graphs from '../../components/graph/Graphs';

const sortPositionsByDate = positions => positions.sort((a, b) => {
  return a.date > b.date;
});

class PlayerView extends React.Component {
  componentDidMount() {
    const { location, getPlayerById } = this.props;
    const { playerId } = location.match.params;
    getPlayerById(playerId);
  }

  render() {
    const { player } = this.props;
    const { selectedPlayer } = player;
    if (!player || player.loading) {
      return (
        <p>
          Loading
        </p>
      );
    }
    if (!selectedPlayer || player.error) {
      return (
        <p>
          Error
        </p>
      );
    }
    const sorted = sortPositionsByDate(selectedPlayer.positions);
    return (
      <div>
        <h2>
          {`Statistics of ${selectedPlayer.name}`}
        </h2>
        <Graphs positions={sorted} />
      </div>

    );
  }
}

PlayerView.propTypes = {
  location: PropTypes.shape({
    match: { params: { rankingId: PropTypes.string } },
  }).isRequired,
  getPlayerById: PropTypes.func.isRequired,
  player: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.bool,
    player: { name: PropTypes.string, position: PropTypes.number, rating: PropTypes.number },
  }).isRequired,
};

const mapStateToProps = state => ({
  player: state.player,
});

const mapDispatchToProps = {
  getPlayerById: getPlayer,
};

const connectedPlayerView = connect(mapStateToProps, mapDispatchToProps)(PlayerView);

export default connectedPlayerView;
