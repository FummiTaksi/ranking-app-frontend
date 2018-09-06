import React from 'react';
import PropTypes from 'prop-types';

import Graph from './Graph';

const mapDates = positions => positions.map(position => position.date.substring(0, 10));

const mapRatings = positions => positions.map(position => position.rating);

const mapPositions = positions => positions.map(position => position.position);

function Graphs({ positions }) {
  const dates = mapDates(positions);
  const ratings = mapRatings(positions);
  const onlyPositions = mapPositions(positions);

  return (
    <div>
      <Graph
        labels={dates}
        data={ratings}
        header="Rating over time"
        label="Rating"
      />
      <Graph
        labels={dates}
        data={onlyPositions}
        header="Position in mens ranking over time"
        label="Position"
      />
    </div>
  );
}

Graphs.propTypes = {
  positions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Graphs;
