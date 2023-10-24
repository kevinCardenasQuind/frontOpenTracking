import React from 'react';
import { Provider, defaultTheme, Heading } from '@adobe/react-spectrum';

function Home() {
  return (
    <Provider theme={defaultTheme}>
      <div style={{ padding: '20px' }}>
        <Heading level={1}>Home Page</Heading>
      </div>
    </Provider>
  );
}

export default Home;
