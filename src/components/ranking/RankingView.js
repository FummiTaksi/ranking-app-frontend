import React from 'react'
import { connect } from 'react-redux'
import { getRanking, deleteRanking } from '../../reducers/rankingReducer'
import PositionList from './PositionList'
import { bindActionCreators } from '../../../../../Library/Caches/typescript/2.9/node_modules/redux';

class RankingView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0
        }
        this.toggleLeft = this.toggleLeft.bind(this)
        this.toggleRight = this.toggleRight.bind(this)
    }

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

    toggleLeft() {
        this.setState({
            selectedIndex: this.state.selectedIndex - 1
        })
    }

    toggleRight() {
        this.setState({
            selectedIndex: this.state.selectedIndex + 1
        })
    }

    orderPositionGroups(orderedPositions) {
        let i = 0
        return orderedPositions.reduce((currentList, currentPosition) => {
            if (currentList[i] && currentList[i].length >= 100) {
                i++;
            }
            if (!currentList[i]) {
                currentList[i] = []
            }
            currentList[i].push(currentPosition)
            return currentList
        },[])
    }
    render() {
        if (!this.props.ranking) {
            return <p>No ranking with this id!</p>
        }
        if (!this.props.ranking.positions) {
            return <p>Loading ranking...</p>
        }
        const orderedPositions = this.orderPositions()
        const orderedPositionGroups = this.orderPositionGroups(orderedPositions);
        return (
            <div>
                <h3>{this.props.ranking.competitionName}, players {orderedPositions.length}</h3>
                <h4>Showing page {this.state.selectedIndex + 1 }/ {orderedPositionGroups.length} </h4>
                <PositionList positions= {orderedPositionGroups[this.state.selectedIndex]}/>
                <button onClick={this.toggleLeft} disabled= {this.state.selectedIndex === 0}>Previous page</button>
                <button onClick={this.toggleRight} disabled= {this.state.selectedIndex === orderedPositionGroups.length - 1}>Next page</button>
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