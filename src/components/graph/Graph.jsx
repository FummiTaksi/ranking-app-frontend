import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function Graph({
  header, label, labels, data, options,
}) {
  const lineData = {
    labels,
    datasets: [
      {
        label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data,
      },
    ],
  };
  return (
    <div>
      <h2>
        {header}
      </h2>
      <Line data={lineData} options={options} />
    </div>
  );
}

Graph.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  header: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.shape({
    scale: PropTypes.shape({
      yAxes: PropTypes.shape({
        ticks: PropTypes.shape({
          reverse: PropTypes.shape({ reverse: PropTypes.bool.isRequired }),
        }),
      }),
    }),
  }).isRequired,
};

export default Graph;
