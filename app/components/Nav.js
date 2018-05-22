import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav () {
  return (
    <nav className='dt w-100 border-box pa3 ph5-ns'>
      <NavLink exact activeClassName='active' to='/' className='dtc v-mid near-black link dim w-25'>
        <i className="fab fa-github-alt fa-2x dib w2 h2 br-100"></i>
      </NavLink>
      
      <div className='dtc v-mid w-75 tr'>
        <NavLink activeClassName='active' to='/battle' className='link dim near-black f6 f5-ns dib mr3 mr4-ns'>
          Battle
        </NavLink>

        <NavLink activeClassName='active' to='/popular' className='link dim near-black f6 f5-ns dib'>
          Popular
        </NavLink>
      </div>
    </nav>
  )
}


/*

<ul className="nav">
  <li>
    <NavLink exact activeClassName="active" to="/">
      Home
    </NavLink>
  </li>
  <li>
    <NavLink activeClassName="active" to="/battle">
      Battle
    </NavLink>
  </li>
  <li>
    <NavLink activeClassName="active" to="/popular">
      Popular
    </NavLink>
  </li>
</ul>;

*/ 



/*

<nav class="dt w-100 border-box pa3 ph5-ns">
  <a class="dtc v-mid mid-gray link dim w-25" href="#" title="Home">
    <img src="http://tachyons.io/img/logo.jpg" class="dib w2 h2 br-100" alt="Site Name">
  </a>
  <div class="dtc v-mid w-75 tr">
    <a class="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#" title="About">Services</a>
    <a class="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#" title="Store">Blog</a>
    <a class="link dim dark-gray f6 f5-ns dib" href="#" title="Contact">Join Us</a>
  </div>
</nav>


*/