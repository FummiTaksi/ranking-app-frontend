import React from 'react'
import { connect } from 'react-redux'
import { getRanking, deleteRanking } from '../../reducers/rankingReducer'

class RankingView extends React.Component {

    componentDidMount() {
        const rankingId = this.props.location.match.params.rankingId;
        this.props.getRanking(rankingId)
    }

    orderPositions()  {
        const copyList =  this.props.ranking.positions.slice()
        return copyList.sort((a,b) => {
            return a.position - b.position
        })
    }

    renderPositionCell(positionObject) {
        return (
        <tr key = {positionObject._id}>
            <td>{positionObject.position}</td>
            <td>{positionObject.playerName}</td> 
            <td>{positionObject.clubName }</td>
            <td>{positionObject.rating}</td>
        </tr>
        )
    }
    render() {
        if (!this.props.ranking) {
            return <p>No ranking with this id!</p>
        }
        if (!this.props.ranking.positions) {
            return <p>Loading ranking...</p>
        }
        const orderedPositions = this.orderPositions()

        return (
            <div>
                <h3>{this.props.ranking.competitionName}</h3>
                <table>
                    <tbody>
                    <tr>
                        <th>Position</th>
                        <th>Player</th>
                        <th>Club</th> 
                        <th>Rating</th>
                    </tr>
                    {orderedPositions.map((position) => {
                        return this.renderPositionCell(position)
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getRanking,
    deleteRanking
}

const mapStateToProps = (state) => {
    return {
        ranking: state.ranking.selectedRanking,
        credentials: state.login
    }
}

const connectedRankingView = connect(mapStateToProps, mapDispatchToProps)(RankingView)

export default connectedRankingView