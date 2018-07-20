import React from 'react';
import { Table } from 'semantic-ui-react';

const renderPositionCell = (positionObject) => {
  return (
    <Table.Row key={positionObject._id}>
      <Table.Cell>
        {positionObject.position}
      </Table.Cell>
      <Table.Cell>
        {positionObject.playerName}
      </Table.Cell>
      <Table.Cell>
        {positionObject.clubName }
      </Table.Cell>
      <Table.Cell>
        {positionObject.rating}
      </Table.Cell>
    </Table.Row>
  );
};

class PositionList extends React.Component {
  render() {
    return (
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Position
              </Table.HeaderCell>
              <Table.HeaderCell>
                Player
              </Table.HeaderCell>
              <Table.HeaderCell>
                Club
              </Table.HeaderCell>
              <Table.HeaderCell>
                Rating
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <tbody>
            {this.props.positions.map((position) => {
              return renderPositionCell(position)
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PositionList;
