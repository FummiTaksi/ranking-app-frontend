import React from 'react';
import {
  Header, Icon, Segment, Divider,
} from 'semantic-ui-react';

const Introduction = () => (
  <div>
    <Header as="h2" icon textAlign="center">
      <Icon name="chart line" circular />
      <Header.Content>
        All rating data in one place
      </Header.Content>
    </Header>
    <Segment>
        Filter players by writing name to search bar and clicking button,
         then click player which ranking history you want to view
      <Divider />
        Note: Player names are stored in database surname first.
        Examples for successfull searches for player which name is Matti Meikäläinen:
      <Divider />
      Meikäläinen, Meikäläinen Matti, Matti, Meikäl
      <Divider />
      TIP: Write either surname before firstname, or only firstname.
    </Segment>
  </div>
);

export default Introduction;
