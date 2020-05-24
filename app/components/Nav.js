import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav () {
  return (
    <nav className='dt w-100 border-box pa3 ph5-ns'>
      <NavLink exact activeClassName='active' to='/' className='dtc v-mid white active-effect'>
        <i className="fab fa-github-alt fa-2x dib w2 h2 br-100"></i>
      </NavLink>
      
      <div className='dtc v-mid w-75 tr'>
        <NavLink activeClassName='active' to='/battle' className='white active-effect f6 f5-ns dib mr3 mr4-ns'>
          Battle
        </NavLink>

        <NavLink activeClassName='active' to='/popular' className='white active-effect f6 f5-ns dib'>
          Popular
        </NavLink>
      </div>
    </nav>
  )
}