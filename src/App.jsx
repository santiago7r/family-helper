
import './App.css';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { Authenticator } from '@aws-amplify/ui-react';
import {listLists} from './graphql/queries'
import '@aws-amplify/ui-react/styles.css';
import awsConfig from './aws-exports';
import { useEffect, useState } from 'react';

Amplify.configure(awsConfig);

const client = generateClient();


function App() {
  const [list, setList] = useState([])

  async function fetchList() {
    const { data } = await client.graphql({
      query: listLists,
    });
    setList(data.listLists.items)
    console.log(data)
  }
  
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <h1>Welcome to Amplify</h1>
          <ul>
            {list.map(item => <li key={item.id}>{item.title}</li>)}
          </ul>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  )
}

export default App
