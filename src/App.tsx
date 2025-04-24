import { Button, Card, Container, Grid, GridItem, Text } from '@chakra-ui/react';
import { useEffect} from 'react';
import useUserStore from './service/user-service';

const App = () => {
  const {loading ,users , length , getUsers , updateUser , deleteUser , postUser} = useUserStore();

  const newUser = {
    id: Math.floor(Math.random() * 1000),
    title: 'New User',
    body: 'This is a new user.',
  };

  useEffect(() => {
    const controller = new AbortController();
    getUsers(controller);
    return () => controller.abort();
  },[])
  console.log(users.length);
  return (
    <Container p={4} bgColor={'gray.100'}>
      <Button
        variant='solid'
        bg={'green.500'}
        mb={5}
        onClick={() => postUser(newUser)}>Add User</Button>
      {users && <Text>{length}</Text>}
      {loading && <p>Loading...</p>}
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>
        {users.map((user) => (
          <GridItem key={user.id}>
            <Card.Root maxW='sm' overflow='hidden'>
              <Card.Body gap='2'>
                <Card.Title>{user.title.toLocaleLowerCase()}</Card.Title>
                <Card.Description>{user.body}</Card.Description>
              </Card.Body>
              <Card.Footer gap='2'>
                <Button variant='solid' bg={'blue.500'} onClick={() => updateUser(user.id)}>
                  Update
                </Button>
                <Button
                  variant='solid'
                  bg={'red.500'}
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </Button>
              </Card.Footer>
            </Card.Root>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
