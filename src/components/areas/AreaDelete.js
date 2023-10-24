import React from 'react';
import { deleteArea } from '../../services/areaServices';
import { Button, Dialog, DialogTrigger, Heading, Text, Provider, defaultTheme, Flex } from '@adobe/react-spectrum';

function AreaDelete({ area, onDeleted }) {

  const handleDelete = async () => {
    try {
      await deleteArea(area.id);
      onDeleted();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting area:', error);
    }
  };

  return (
    <Provider theme={defaultTheme}>
        <DialogTrigger>
            <Button variant="negative">Delete</Button>
            {(close) => (
                <Dialog>
                    <Heading>Delete {area.name}?</Heading>
                    <Flex direction="column" justify-content="space-between">
                        <Text></Text>
                        <Flex>
                            <Button variant="secondary" onPress={close}>Cancel</Button>
                            <Button variant="cta" onPress={() => { handleDelete(); close(); }}>Delete</Button>
                        </Flex>
                    </Flex>
                </Dialog>
            )}
        </DialogTrigger>
    </Provider>
  );
}

export default AreaDelete;
