import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  makeStyles
} from '@material-ui/core';
import LayoutView from 'src/components/LayoutView';
import ImageIcon from '@material-ui/icons/Image';
import { client } from 'src/utils/api-client';
import { usePaginatedQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
  root: { height: '100%' },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const JoinView = () => {
  const classes = useStyles();

  const [pagination] = useState({
    query: '',
    limit: 10
  });
  const fetchTags = pagination =>
    client(
      'search/rooms?q=' + pagination.query + '&per_page=' + pagination.limit
    );
  const { resolvedData: rooms } = usePaginatedQuery(
    ['rooms', 'list', pagination],
    () => fetchTags(pagination)
  );

  return (
    <LayoutView
      className={classes.root}
      pageTitle="Home">
      <List
        className={classes.root}
        disablePadding>
        {rooms?.data?.rows.map(item => (
          <ListItem
          key={item.id}
          component="a"
          href={`/room/${item.uuid}`}
            button
            divider>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${item.roomName} (${item.users.length} users)`}
              secondary={item.uuid} />
          </ListItem>
        ))}
      </List>
    </LayoutView>
  );
};

export default JoinView;
