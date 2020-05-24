import React from 'react';
import queryString from 'query-string';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile ({ info }) {

  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login} >
      <ul className='space-list-items white'>
        {info.name && <li className='f3 mb2 b'>{info.name}</li>}
        {info.location && <li className='mb2'>{info.location}</li>}
        {info.company && <li className='mb2'>{info.company}</li>}
        <li className='mb2'>Followers: {info.followers.toLocaleString()}</li>
        <li className='mb2'>Following: {info.following.toLocaleString()}</li>
        <li className='mb2'>Public Repos: {info.public_repos}</li>
        {info.blog && <li className='mb2'><a className='info-blog' href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player ({ label, score, profile }) {
  return (
    <div>
      <h1 className='white f1-l f2 b db mb2 tc'>{label}</h1>
      <h3 className='tc score'>Score: {score.toLocaleString()}</h3>
      <Profile info={profile}/>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }
  async componentDidMount() {
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);

    const players = await battle([
      playerOneName,
      playerTwoName
    ])
    
    if (players === null) {
      return this.setState(() => ({
        error: 'Looks like there was an error. Check that both users exist on Github!',
        loading: false
      }))
    }

    this.setState(() => ({
      error: null,
      winner: players[0],
      loser: players[1],
      loading: false
    }));
  }
  render() {
    const { error, winner, loser, loading } = this.state;
    
    if (loading === true) {
      return <Loading />
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player 
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />

        <Player 
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

export default Results;