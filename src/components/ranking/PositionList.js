import React from 'react'
import { Table } from 'semantic-ui-react'

class PositionList extends React.Component {

    constructor(props) {
        super(props) 
    }
    renderPositionCell(positionObject) {
        return (
        <Table.Row key = {positionObject._id}>
            <Table.Cell>{positionObject.position}</Table.Cell>
            <Table.Cell>{positionObject.playerName}</Table.Cell> 
            <Table.Cell>{positionObject.clubName }</Table.Cell>
            <Table.Cell>{positionObject.rating}</Table.Cell>
        </Table.Row>
        )
    }

    render() {
        return (
            <div>
                <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Position</Table.HeaderCell>
                        <Table.HeaderCell>Player</Table.HeaderCell>
                        <Table.HeaderCell>Club</Table.HeaderCell> 
                        <Table.HeaderCell>Rating</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {this.props.positions.map((position) => {
                        return this.renderPositionCell(position)
                    })}
                </Table>
            </div>
        )
    }
}

export default PositionList