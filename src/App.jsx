
import './App.css';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { Authenticator } from '@aws-amplify/ui-react';
import {listLists} from './graphql/queries'
import '@aws-amplify/ui-react/styles.css';
import awsConfig from './aws-exports';
import { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import MainHeader from './components/headers/MainHeader';
import Lists from './components/Lists/Lists';
import { Button, Container, Icon } from 'semantic-ui-react';

Amplify.configure(awsConfig);

const client = generateClient();


function App() {
  const [lists, setLists] = useState([])

  async function fetchList() {
    const { data } = await client.graphql({
      query: listLists,
    });
    setLists(data.listLists.items)
  }
  
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <button onClick={signOut}>Sign out</button>
          <Button className='floatingButton'>
            <Icon name='plus' className='floatingButton_icon'/>
          </Button>
          <Container>
            <MainHeader />
            <ul>
              <Lists lists={lists} />
            </ul>
          </Container>
        </main>
      )}
    </Authenticator>
  )
}

export default App
