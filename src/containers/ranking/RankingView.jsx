import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getRanking } from '../../reducers/rankingReducer';
import PositionList from '../../components/ranking/PositionList';

const orderPositions = (selectedRanking) => {
  const copyList = selectedRanking.positions.slice();
  return copyList.sort((a, b) => a.position - b.position);
};

const orderPositionGroups = (orderedPositions) => {
  let i = 0;
  return orderedPositions.reduce((currentList, currentPosition) => {
    const copyList = currentList;
    if (copyList[i] && currentList[i].length >= 100) {
      i += 1;
    }
    if (!currentList[i]) {
      copyList[i] = [];
    }
    copyList[i].push(currentPosition);
    return copyList;
  }, []);
};

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
    const { location, getRankingById } = this.props;
    const { rankingId } = location.match.params;
    getRankingById(rankingId);
  }

  toggleLeft() {
    const { selectedIndex } = this.state;
    this.setState({
      selectedIndex: selectedIndex - 1,
    });
  }

  toggleRight() {
    const { selectedIndex } = this.state;
    this.setState({
      selectedIndex: selectedIndex + 1,
    });
  }

  renderNavigationButtons(listLength) {
    const { selectedIndex } = this.state;
    return (
      <div id="navigationButtons">
        <Button
          onClick={this.toggleLeft}
          disabled={selectedIndex === 0}
        >
          <Icon name="angle double left" />
        </Button>
        <Button
          onClick={this.toggleRight}
          disabled={selectedIndex === listLength - 1}
        >
          <Icon name="angle double right" />
        </Button>
      </div>
    );
  }

  render() {
    const { ranking } = this.props;
    if (ranking.loading) {
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
    const { selectedRanking } = ranking;
    if (!selectedRanking.positions) {
      return (
        <p>
          No ranking with this id!
        </p>
      );
    }
    const orderedPositions = orderPositions(selectedRanking);
    const orderedPositionGroups = orderPositionGroups(orderedPositions);
    const players = `${selectedRanking.competitionName}, players ${orderedPositions.length}`;
    const { selectedIndex } = this.state;
    const pageInfo = `Showing page ${selectedIndex + 1} / ${orderedPositionGroups.length}`;
    return (
      <div>
        <h3>
          {players}
        </h3>
        <h4>
          {pageInfo}
        </h4>
        {this.renderNavigationButtons(orderedPositionGroups.length)}
        <PositionList positions={orderedPositionGroups[selectedIndex]} />
        {this.renderNavigationButtons(orderedPositionGroups.length)}
      </div>

    );
  }
}

RankingView.propTypes = {
  location: PropTypes.shape({
    match: { params: { rankingId: PropTypes.string } },
  }).isRequired,
  ranking: PropTypes.shape({
    loading: PropTypes.bool,
    allRankings: PropTypes.array,
    selectedRanking: { positions: PropTypes.array, competitionName: PropTypes.string },
  }).isRequired,
  getRankingById: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getRankingById: getRanking,
};

const mapStateToProps = state => ({
  ranking: state.ranking,
});

const connectedRankingView = connect(mapStateToProps, mapDispatchToProps)(RankingView);

export default connectedRankingView;
