import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRankings, deleteRanking } from '../../reducers/rankingReducer'
import { Table } from 'semantic-ui-react'

class RankingList extends React.Component {

     async componentDidMount() {
         await this.props.getRankings()
    }

    renderRankingCell(rankingObject) {
        const date = rankingObject.date.substring(0,10)
        const linkToRanking = "/rankings/" + rankingObject._id
        return (
          <Table.Row key = {rankingObject._id}>
            <Table.Cell>
                <Link to={linkToRanking}> {rankingObject.competitionName}</Link>
            </Table.Cell>
            <Table.Cell>{date}</Table.Cell> 
            <Table.Cell>{rankingObject.positions.length }</Table.Cell>
            <Table.Cell>{ this.props.credentials.admin && this.deleteButton(rankingObject._id)}</Table.Cell>
        </Table.Row>
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
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Competition name</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell> 
                            <Table.HeaderCell>Players</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {orderedRankings.map((ranking) => {
                        return this.renderRankingCell(ranking)
                    })}
                    </Table.Body>
                </Table>
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
        rankings: state.ranking.allRankings,
        credentials: state.login
    }
}

const connectedRankingList = connect(mapStateToProps, mapDispatchToProps)(RankingList)
export default connectedRankingList