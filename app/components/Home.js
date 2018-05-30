import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <header className="home tc mt6 ph3">
        <h1 className="f2 f1-l fw2 white mb4 lh-title"><strong>Challenge Your Friends</strong></h1>
        <Link className='button f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3' to='/battle'>
          Battle Now
        </Link>
      </header>
    )
  }
}

export default Home;