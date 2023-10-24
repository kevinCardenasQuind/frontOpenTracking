import React, { useState } from 'react';
import { authenticate } from '../../services/authService';
import { Button, TextField, Provider, defaultTheme, Flex, Text } from '@adobe/react-spectrum';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authenticate(userName, password);
      window.location.href = '/';
    } catch (error) {
      setError('Authentication failed');
    }
  };

  return (
    <Provider theme={defaultTheme}>
      <Flex direction="column" gap="size-100" alignItems="center" padding="size-200">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            placeholder="Username"
            value={userName}
            onInput={(e) => setUserName(e.target.value)}
          />
          <TextField
            type="password"
            placeholder="Password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="cta">
            Login
          </Button>
        </form>
        {error && (
          <Text UNSAFE_style={{ color: 'red' }}>
            {error}
          </Text>
        )}
        </Flex>
    </Provider>
  );
}

export default Login;
