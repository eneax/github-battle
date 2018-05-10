var React = require('react');

class Popular extends React.Component {
  render() {
    var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <ul className='languages'>
        {languages.map(function(lang) {
          return (
            <li>
              {lang}
            </li>
          )
        })}
      </ul>
    )
  }
}

module.exports = Popular;