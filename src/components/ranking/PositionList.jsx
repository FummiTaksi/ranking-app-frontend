import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const renderPositionCell = positionObject => (
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

function PositionList({ positions }) {
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
          {positions.map(position => renderPositionCell(position))}
        </tbody>
      </Table>
    </div>
  );
}

PositionList.propTypes = {
  positions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PositionList;
