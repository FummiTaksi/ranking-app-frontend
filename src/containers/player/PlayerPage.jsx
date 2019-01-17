import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlayers } from '../../reducers/playerReducer';
import Introduction from '../../components/player/Introduction';
import FilterForm from '../../components/player/FilterForm';
import PlayerList from '../../components/player/PlayerList';

const nameContainsFilter = (name, filter) => name.toLowerCase().includes(filter.toLowerCase());

class PlayerPage extends React.Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      filteredPlayers: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.filterPlayers = this.filterPlayers.bind(this);
  }

  async componentDidMount() {
    const { getAllPlayers } = this.props;
    const { playerName } = this.state;
    await getAllPlayers();
    this.filterPlayers(playerName);
  }

  handleNameChange(e) {
    this.setState({
      playerName: e.target.value,
    });
    this.filterPlayers(e.target.value);
  }

  filterPlayers(filter) {
    const { player } = this.props;
    const { players } = player;
    const filteredPlayers = players.filter(dbPlayer => nameContainsFilter(dbPlayer.name, filter));
    this.setState({
      filteredPlayers,
    });
  }

  amountOfResults() {
    const { filteredPlayers } = this.state;
    const { length } = filteredPlayers;
    if (length === 0) {
      return (
        <h2>No players found</h2>);
    }
    return (
      <h2>
        {`Showing ${length} players that matched your search`}
      </h2>
    );
  }

  render() {
    const { player } = this.props;
    if (!player || player.loading) {
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
    const { playerName, filteredPlayers } = this.state;
    return (
      <div>
        <Introduction />
        <FilterForm handleNameChange={this.handleNameChange} playerName={playerName} />
        {this.amountOfResults()}
        <PlayerList players={filteredPlayers} />
      </div>
    );
  }
}

PlayerPage.propTypes = {
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

const connectedPlayerPage = connect(mapStateToProps, mapDispatchToProps)(PlayerPage);

export default connectedPlayerPage;
