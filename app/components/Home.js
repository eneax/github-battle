import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <header className="tc">
        <div className="cover bg-left bg-center-l">
          <div className="pb5 pb6-m pb7-l">
            <div className="tc-l mt5 mt6-m mt6-l ph3">
              <h1 className="f2 f1-l white-90 mb0 lh-title">Welcome to Github Battlefield</h1>
              <h2 className="fw1 f3 white-80 mt3 mb4">The only place where you can challenge your friends and discover popular repositories</h2>
              <Link className='button f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3' to='/battle'>
                Battle Now
              </Link> 
              <span className="dib v-mid ph3 white-70 mb3">or</span>
              <Link className='button f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3' to='/popular'>
                Discover Repos
              </Link>
            </div>
          </div>
        </div> 
      </header>
    )
  }
}

export default Home;