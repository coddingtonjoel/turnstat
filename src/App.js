import './App.css';
import React, { useState, useEffect } from 'react';
import { DiscogsClient } from '@lionralfs/discogs-client/browser';
import CollectionTable from './CollectionTable';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [collection, setCollection] = useState(false);
  const getReleases = async (username) => {
    let col = new DiscogsClient({
      auth: {
        method: 'discogs',
        consumerKey: process.env.REACT_APP_CONSUMER_KEY,
        consumerSecret: process.env.REACT_APP_CONSUMER_SECRET
      }
    }).user().collection();
    const {data, err} = await col.getReleases(username, 0, {page: 1, per_page: 1000});
    if (err) {
      console.log(err);
      setCollection({});
    }
    else {
      console.log("Collection:", data);
      setCollection(data);
    }
  }
  useEffect(() => {
    getReleases('coddingtonjoel');
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className='TableContainer'>
            <CollectionTable collection={collection} />
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
