import React from 'react'
import { connect } from 'react-redux'
import { getRankings } from '../../reducers/rankingReducer'

class RankingsView extends React.Component {

     componentDidMount() {
         this.props.getRankings();
    }

    renderRankingCell(rankingObject) {
        console.log('rankingObject', rankingObject)
        console.log('type of date', rankingObject.date.substring(0,10))
        const date = rankingObject.date.substring(0,10);
        return (
        <tr key = {rankingObject._id}>
            <td>{rankingObject.competitionName}</td>
            <td>{date}</td> 
            <td>{rankingObject.positions.length}</td>
        </tr>
        )
    }


    render() {
        const rankings = this.props.rankings
        if (!rankings) {
            return <p>Loading rankings from database...</p>
        }
        if (rankings.length === 0) {
            return <p>No rankings saved to database yet</p>
        }
        return (
            <div>
                <h3>Here are all {rankings.length} rankings that are uploaded to this site</h3>
                <table>
                    <tbody>
                    <tr>
                        <th>Competition name</th>
                        <th>Date</th> 
                        <th>Players</th>
                    </tr>
                    {rankings.map((ranking) => {
                        return this.renderRankingCell(ranking)
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getRankings
}

const mapStateToProps = (state) => {
    return {
        rankings: state.ranking
    }
}

const connectedRankingsView = connect(mapStateToProps, mapDispatchToProps)(RankingsView)
export default connectedRankingsView