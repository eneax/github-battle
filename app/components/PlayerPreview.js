import React from 'react';
import PropTypes from 'prop-types';

export default function PlayerPreview ({ avatar, username, children }) {
  return (
    <div className='mw5 center br3 pa3 pa4-ns mv3 ba b--white tc mt3 mt5-m mt5-l'>
      <div className=''>
        <img
          className='br-100 h4 w4 dib ba b--black-05 bg-near-white pa1'
          src={avatar}
          alt={'Avatar for ' + username}  
        />
        <h2 className='username tc'>@{username}</h2>
      </div>
      {children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}