import React from 'react';
import {
  Header, Icon,
} from 'semantic-ui-react';

const Introduction = () => (
  <div>
    <Header as="h2" icon textAlign="center">
      <Icon name="chart line" circular />
      <Header.Content>
        All rating data in one place
      </Header.Content>
      <div className="sub header">
       Filter players by writing players name, click players name to view statistics
      </div>
      <div className="sub header">
        NOTE: Write surname before firstname
      </div>
    </Header>
  </div>
);

export default Introduction;
