import React from 'react'

class PositionList extends React.Component {

    constructor(props) {
        super(props) 
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
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Position</th>
                        <th>Player</th>
                        <th>Club</th> 
                        <th>Rating</th>
                    </tr>
                    {this.props.positions.map((position) => {
                        return this.renderPositionCell(position)
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PositionList