import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

function SelectLanguage ({ selectedLanguage, onSelect }) {
	const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
	
	return (
		<ul className='languages'>
			{languages.map((lang) => {
				return (
					<li
						style={lang === selectedLanguage ? { color: '#d0021b' } : null}
            onClick={() => onSelect(lang)}
						key={lang}>
						{lang}
					</li>
				)
			})}
		</ul>
	)
}

function RepoGrid ({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map(({ name, owner, html_url, stargazers_count }, index) => (
          <li key={name} className='popular-item' >
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img 
                  className='avatar' 
                  src={owner.avatar_url}
                  alt={'Repo for ' + owner.login} />
              </li>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        )
      )}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(lang) {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null
    }));

    fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => ({ repos }))
      });
  } 
  render() {
    const { selectedLanguage, repos } = this.state;

    return (
			<div>
				<SelectLanguage 
					selectedLanguage={selectedLanguage}
					onSelect={this.updateLanguage}
        />
        {!repos 
          ? <Loading />
          : <RepoGrid repos={repos}/>}
			</div>
    )
  }
}

export default Popular;