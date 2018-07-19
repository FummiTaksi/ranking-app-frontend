import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { getRanking, deleteRanking } from '../../reducers/rankingReducer';
import PositionList from './PositionList';


class RankingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.toggleLeft = this.toggleLeft.bind(this);
    this.toggleRight = this.toggleRight.bind(this);
  }

  componentDidMount() {
    const rankingId = this.props.location.match.params.rankingId;
    this.props.getRanking(rankingId);
  }

  orderPositions(selectedRanking) {
    const copyList = selectedRanking.positions.slice();
    return copyList.sort((a, b) => a.position - b.position);
  }

  toggleLeft() {
    this.setState({
      selectedIndex: this.state.selectedIndex - 1,
    });
  }

  toggleRight() {
    this.setState({
      selectedIndex: this.state.selectedIndex + 1,
    });
  }

  orderPositionGroups(orderedPositions) {
    let i = 0;
    return orderedPositions.reduce((currentList, currentPosition) => {
      if (currentList[i] && currentList[i].length >= 100) {
        i++;
      }
      if (!currentList[i]) {
        currentList[i] = [];
      }
      currentList[i].push(currentPosition);
      return currentList;
    }, []);
  }

  renderNavigationButtons(listLength) {
    return (
      <div id="navigationButtons">
        <Button
          onClick={this.toggleLeft}
          disabled={this.state.selectedIndex === 0}
        >
          <Icon name="angle double left" />
        </Button>
        <Button
          onClick={this.toggleRight}
          disabled={this.state.selectedIndex === listLength - 1}
        >
          <Icon name="angle double right" />
        </Button>
      </div>
    );
  }

  render() {
    if (this.props.ranking.loading) {
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui textloader">
Loading ranking from database
            </div>
          </div>
        </div>
      );
    }
    const selectedRanking = this.props.ranking.selectedRanking;
    if (!selectedRanking.positions) {
      return (
        <p>
No ranking with this id!
        </p>
      );
    }
    const orderedPositions = this.orderPositions(selectedRanking);
    const orderedPositionGroups = this.orderPositionGroups(orderedPositions);
    return (
      <div>
        <h3>
          {selectedRanking.competitionName}
, players
          {' '}
          {orderedPositions.length}
        </h3>
        <h4>
Showing page
          {' '}
          {this.state.selectedIndex + 1 }
          {' '}
/
          {' '}
          {orderedPositionGroups.length}
          {' '}
        </h4>
        {this.renderNavigationButtons(orderedPositionGroups.length)}
        <PositionList positions={orderedPositionGroups[this.state.selectedIndex]} />
        {this.renderNavigationButtons(orderedPositionGroups.length)}
      </div>

    );
  }
}

const mapDispatchToProps = {
  getRanking,
  deleteRanking,
};

const mapStateToProps = state => ({
  ranking: state.ranking,
  credentials: state.login,
});

const connectedRankingView = connect(mapStateToProps, mapDispatchToProps)(RankingView);

export default connectedRankingView;
