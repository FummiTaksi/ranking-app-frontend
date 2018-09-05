import React from 'react';
import {
  Header, Icon, Segment, Divider,
} from 'semantic-ui-react';

const HomePage = () => (
  <div>
    <Header as="h2" icon textAlign="center">
      <Icon name="table tennis" circular />
      <Header.Content>
          Welcome to Ranking-app!
      </Header.Content>
    </Header>
    <Segment>
        Purpose of this website is to offer Finnish table tennis rankings in user readable form.
      <Divider />
          This website is developed in co-operation with Finnish table tennis union:
      {' '}
      <a href="http://www.sptl.fi/sptl_uudet/">
          www.sptl.fi
      </a>
    </Segment>
  </div>
);

export default HomePage;
