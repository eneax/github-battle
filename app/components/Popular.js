import React from 'react'

class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
    }

    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
    })
  }

  render() {
    const languages = ['All', 'JavaScript', 'CSS', 'Ruby', 'Java', 'Python']

    return (
      <ul className="flex-center">
        {languages.map(language => (
          <li key={language}>
            <button
              className="btn-clear nav-link"
              onClick={() => this.updateLanguage(language)}
              style={language === this.state.selectedLanguage ? { color: 'rgb(187, 46, 31)' } : null}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}

export default Popular
