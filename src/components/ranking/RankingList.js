import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRankings, deleteRanking } from '../../reducers/rankingReducer'

class RankingList extends React.Component {

     async componentDidMount() {
         await this.props.getRankings()
    }

    renderRankingCell(rankingObject) {
        const date = rankingObject.date.substring(0,10)
        const linkToRanking = "/rankings/" + rankingObject._id
        return (
          <tr key = {rankingObject._id}>
            <td>
                <Link to={linkToRanking}> {rankingObject.competitionName}</Link>
            </td>
            <td>{date}</td> 
            <td>{rankingObject.positions.length }</td>
            <td>{ this.props.credentials.admin && this.deleteButton(rankingObject._id)}</td>
        </tr>
        )
    }

    deleteRanking(rankingId) {
        this.props.deleteRanking(rankingId)
    }

    deleteButton(rankingId) {
        return (
            <button onClick = {() => this.deleteRanking(rankingId)}>Delete</button>
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
        if (!rankings || rankings.positions) {
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
    getRankings,
    deleteRanking
}

const mapStateToProps = (state) => {
    return {
        rankings: state.ranking,
        credentials: state.login
    }
}

const connectedRankingList = connect(mapStateToProps, mapDispatchToProps)(RankingList)
export default connectedRankingList