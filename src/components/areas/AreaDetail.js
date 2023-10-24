import React from 'react';
import moment from 'moment';
import { Button, Flex, Heading, Text, Provider, defaultTheme } from '@adobe/react-spectrum';

function AreaDetail({ area, onEdit, onDelete }) {
  return (
    <Provider theme={defaultTheme}>
      <Flex direction="column" gap="size-100">
        <Heading level={2}>Area Detail</Heading>
        <Text>Name: {area.name}</Text>
        <Text>Created At: {moment(area.created_at).format('LL')}</Text>
        <Text>Updated At: {moment(area.updated_at).format('LL')}</Text>
        <Flex>
          <Button variant="cta" onPress={onEdit}>Edit</Button>
          <Button variant="negative" onPress={onDelete}>Delete</Button>
        </Flex>
      </Flex>
    </Provider>
  );
}

export default AreaDetail;
