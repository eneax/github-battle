import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  static defaultProps = {
    label: 'Username',
  }
  state = {
    username: ''
  }
  handleChange = (event) => {
    const value = event.target.value;

    this.setState(() => ({ username: value }));
  }
  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }
  render() {
    const { username } = this.state;
    const { label } = this.props;
    return (
      <form className='pa4 black-80 mt3 mt6-m mt6-l center' onSubmit={this.handleSubmit}>
        <div className="measure tc">
          <label className='white f1-l f2 b db mb2' htmlFor='username'>
            {label}
          </label>
          <input
            className='input-reset ba bw1 b--white bg-transparent white pa2 mb2 db w-100 br2 tc'
            id='username'
            placeholder='Github Username'
            type='text'
            autoComplete='off'
            value={username}
            onChange={this.handleChange}
          />
          <button
            className='ba b--white bw1 bg-transparent white f6 no-underline grow dib v-mid ph3 pv2 mb3 br2'
            type='submit'
            disabled={!username}>
              Submit
          </button>
        </div>
      </form>
    )
  }
}

class Battle extends React.Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null,
  }
  handleSubmit = (id, username) => {
    this.setState(() => ({
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`
    }));
  }
  handleReset = (id) => {
    this.setState(() => ({
      [id + 'Name']: '',
      [id + 'Image']: null
    }));
  }
  render() {
    const { match } = this.props;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;

    return (
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />
          }

          {playerOneImage !== null && 
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
            >
              <button
                className='reset ba b--white bw1 bg-transparent white f6 no-underline grow dib v-mid ph3 pv2 mb3 br2'
                onClick={ () => { this.handleReset('playerOne')} }
              >
                Reset
              </button>
            </PlayerPreview>
          }

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />
          }

          {playerTwoImage !== null &&
            <PlayerPreview 
              avatar={playerTwoImage}
              username={playerTwoName}
            >
              <button
                className='reset ba b--white bw1 bg-transparent white f6 no-underline grow dib v-mid ph3 pv2 mb3 br2'
                onClick={ () => { this.handleReset('playerTwo')} }
              >
                Reset
              </button>
            </PlayerPreview>
          }
        </div>

        {playerOneImage && playerTwoImage && 
          <Link 
            className='battle w-30 w-10-ns ba b--white bw1 bg-transparent white f6 no-underline grow v-mid tc center ph3 pv2 mt2 mb3 br2'
            to={{
              pathname: match.url + '/results',
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}
          >
            Battle
          </Link>
        }
      </div>
    )
  }
}

export default Battle;