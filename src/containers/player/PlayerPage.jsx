import React from 'react';
import { connect } from 'react-redux';
import {
  Form, Input, Button, List,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getPlayers } from '../../reducers/playerReducer';
import Introduction from '../../components/player/Introduction';

const renderPlayer = player => (
  <List.Item key={player._id} id={player._id}>
    {player.name}
  </List.Item>
);

const nameContainsFilter = (player, filter) => player.name.toLowerCase().includes(filter);

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

  componentDidMount() {
    const { getAllPlayers } = this.props;
    getAllPlayers();
  }

  handleNameChange(e) {
    this.setState({
      playerName: e.target.value,
    });
  }

  filterPlayers() {
    const { playerName } = this.state;
    if (playerName === '') {
      this.setState({
        filteredPlayers: [],
      });
    }
    const filter = playerName.toLowerCase();
    const { player } = this.props;
    const { players } = player;
    const filteredPlayers = players.filter(dbPlayer => nameContainsFilter(dbPlayer, filter));
    this.setState({
      filteredPlayers,
    });
  }

  amountOfResults() {
    const { filteredPlayers } = this.state;
    const { length } = filteredPlayers;
    if (length === 0) {
      return null;
    }
    return (
      <h2>
        {`Showing ${length} players that matched your search`}
      </h2>
    );
  }

  renderFilteredPlayers() {
    const { filteredPlayers } = this.state;
    return filteredPlayers.map(player => renderPlayer(player));
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
    const { playerName, filteredPlayers } = this.state;
    return (
      <div>
        <Introduction />
        <Form onSubmit={this.filterPlayers}>
          Name:
          <Input type="text" onChange={this.handleNameChange} value={playerName} text="Name" />
          <Button type="submit">
            Search players
          </Button>
        </Form>
        {this.amountOfResults()}
        <List>
          {filteredPlayers.map(dbPlayer => renderPlayer(dbPlayer))}
        </List>
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
