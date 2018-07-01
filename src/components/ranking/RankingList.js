import React from 'react'
import { connect } from 'react-redux'
import { getRankings } from '../../reducers/rankingReducer'

class RankingList extends React.Component {

     componentDidMount() {
         this.props.getRankings();
    }

    renderRankingCell(rankingObject) {
        const date = rankingObject.date.substring(0,10);
        return (
        <tr key = {rankingObject._id}>
            <td>{rankingObject.competitionName}</td>
            <td>{date}</td> 
            <td>{rankingObject.positions.length}</td>
        </tr>
        )
    }

    getTimeOfCompetition = (rankingObject) => {
        const date = new Date(rankingObject.date)
        return date.getTime()
    }

    orderRankingsByDate()  {
        const copyList =  this.props.rankings.slice()
        return copyList.sort((a,b) => {
            return this.getTimeOfCompetition(b) - this.getTimeOfCompetition(a)
        })
    }


    render() {
        const rankings = this.props.rankings
        if (!rankings) {
            return <p>Loading rankings from database...</p>
        }
        if (rankings.length === 0) {
            return <p>No rankings saved to database yet</p>
        }
        const orderedRankings = this.orderRankingsByDate()
        return (
            <div>
                <h3>Here are all {orderedRankings.length} rankings that are uploaded to this site</h3>
                <table>
                    <tbody>
                    <tr>
                        <th>Competition name</th>
                        <th>Date</th> 
                        <th>Players</th>
                    </tr>
                    {orderedRankings.map((ranking) => {
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

const connectedRankingList = connect(mapStateToProps, mapDispatchToProps)(RankingList)
export default connectedRankingList