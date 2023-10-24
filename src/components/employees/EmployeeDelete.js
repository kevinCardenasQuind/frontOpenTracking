import { Button, Dialog, DialogTrigger, Heading, Provider, defaultTheme, Flex, Text } from '@adobe/react-spectrum';
import { deleteEmployee } from '../../services/employeeServices';

function EmployeeDelete({ employee, onDeleted }) {
  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.cedula);
      onDeleted(employee);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <Provider theme={defaultTheme}>
      <DialogTrigger>
        <Button variant="negative">Delete</Button>
        {(close) => (
          <Dialog>
          <Heading>Delete {employee.Name}?</Heading>
            <Flex direction="column" justify-content="space-between">
                <Text></Text>
                <Flex justifyContent="">
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

export default EmployeeDelete;
