import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getRankings, deleteRanking } from '../../reducers/rankingReducer';

const getTimeOfCompetition = (rankingObject) => {
  const date = new Date(rankingObject.date);
  return date.getTime();
};

const orderRankingsByDate = (rankings) => {
  const copyList = rankings.slice();
  return copyList.sort((a, b) => getTimeOfCompetition(b) - getTimeOfCompetition(a));
};

class RankingList extends React.Component {
  async componentDidMount() {
    const { getAllRankings } = this.props;
    await getAllRankings();
  }

  deleteRanking(rankingId) {
    const { deleteRankingById } = this.props;
    deleteRankingById(rankingId);
  }

  deleteButton(rankingId) {
    return (
      <button type="button" className="delete" onClick={() => this.deleteRanking(rankingId)}>
        Delete
      </button>
    );
  }

  renderRankingCell(rankingObject) {
    const date = rankingObject.date.substring(0, 10);
    const linkToRanking = `/rankings/${rankingObject._id}`;
    const { credentials } = this.props;
    const { admin } = credentials;
    return (
      <Table.Row key={rankingObject._id}>
        <Table.Cell>
          <Link to={linkToRanking}>
            {' '}
            {rankingObject.competitionName}
          </Link>
        </Table.Cell>
        <Table.Cell>
          {date}
        </Table.Cell>
        <Table.Cell>
          {rankingObject.positions.length }
        </Table.Cell>
        <Table.Cell>
          { admin && this.deleteButton(rankingObject._id)}
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    const { ranking } = this.props;
    const { allRankings } = ranking;
    if (ranking.loading) {
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui textloader">
              Loading rankings from database
            </div>
          </div>
        </div>
      );
    }
    if (allRankings.length === 0) {
      return (
        <p>
          No rankings saved to database yet
        </p>
      );
    }
    const orderedRankings = orderRankingsByDate(allRankings);
    return (
      <div>
        <h3>
          {`Here are all ${orderedRankings.length} rankings that are uploaded to this site`}
        </h3>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Competition name
              </Table.HeaderCell>
              <Table.HeaderCell>
                Date
              </Table.HeaderCell>
              <Table.HeaderCell>
                Players
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orderedRankings.map(mapRanking => this.renderRankingCell(mapRanking))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

RankingList.propTypes = {
  getAllRankings: PropTypes.func.isRequired,
  deleteRankingById: PropTypes.func.isRequired,
  credentials: PropTypes.shape({
    admin: PropTypes.bool,
  }).isRequired,
  ranking: PropTypes.shape({
    allRankings: PropTypes.array,
  }).isRequired,
};

const mapDispatchToProps = {
  getAllRankings: getRankings,
  deleteRankingById: deleteRanking,
};

const mapStateToProps = state => ({
  ranking: state.ranking,
  credentials: state.login,
});

const connectedRankingList = connect(mapStateToProps, mapDispatchToProps)(RankingList);
export default connectedRankingList;
