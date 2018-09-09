import React from 'react';
import {
  Header, Icon, Segment, Divider,
} from 'semantic-ui-react';

const AboutPage = () => (
  <div id="aboutPage">
    <Header as="h2" icon textAlign="center">
      <Icon name="table tennis" circular />
      <Header.Content>
          Welcome to Ranking-app!
      </Header.Content>
    </Header>
    <Segment>
        Purpose of this website is to offer long term statisctics
        for players who play in Finland.
      <Divider />
          This website is developed in co-operation with Finnish table tennis union:
      {' '}
      <a href="http://www.sptl.fi/sptl_uudet/">
          www.sptl.fi
      </a>
      <Divider />
      <Icon name="github" circular />
          View source code:
      {' '}
      <a href="https://github.com/FummiTaksi/ranking-app-backend">
        https://github.com/FummiTaksi/ranking-app-backend
      </a>
      <Divider />
      Any questions or suggestions?
      {' '}
      <a href="mailto:mustonealeksi@gmail.com">
         Please contact
      </a>
    </Segment>
  </div>
);

export default AboutPage;
