import * as React from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";

import { fetchPopularRepos } from "../utils/api";

import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";

const LanguagesNav = ({ selected, onUpdateLanguage }) => {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={selected === language ? { color: "rgb(187, 46, 31)" } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
};

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

const ReposGrid = ({ repos }) => (
  <ul className="grid space-around">
    {repos.map((repo, index) => {
      const { name, owner, html_url, stargazers_count, forks, open_issues } =
        repo;
      const { login, avatar_url } = owner;

      return (
        <li key={html_url}>
          <Card
            header={`#${index + 1}`}
            avatar={avatar_url}
            href={html_url}
            name={name}
          >
            <ul className="card-list">
              <li>
                <Tooltip text="GitHub username">
                  <FaUser color="rgb(255, 191, 116)" size={22} />
                  <a href={`https://github.com/${login}`}>{login}</a>
                </Tooltip>
              </li>
              <li>
                <FaStar color="rgb(255, 215, 0)" size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                {open_issues.toLocaleString()} open
              </li>
            </ul>
          </Card>
        </li>
      );
    })}
  </ul>
);

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

const popularReducer = (state, action) => {
  if (action.type === "success") {
    return {
      ...state,
      [action.selectedLanguage]: action.repos,
      error: null,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.error.message,
    };
  } else {
    throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const Popular = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("All");
  const [state, dispatch] = React.useReducer(popularReducer, { error: null }); // combine repos and error

  // Prevent the component from rendering if the state changes
  const fetchedLanguages = React.useRef([]);

  React.useEffect(() => {
    // Fetch only the languages that we haven't already fetched
    if (fetchedLanguages.current.includes(selectedLanguage) === false) {
      fetchedLanguages.current.push(selectedLanguage);

      fetchPopularRepos(selectedLanguage)
        .then((repos) => dispatch({ type: "success", selectedLanguage, repos }))
        .catch((error) => dispatch({ type: "error", error }));
    }
  }, [fetchedLanguages, selectedLanguage]);

  const isLoading = () => !state[selectedLanguage] && state.error === null;

  return (
    <React.Fragment>
      <LanguagesNav
        selected={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />

      {isLoading() && <Loading text="Fetching Repos" />}

      {state.error && <p className="center-text error">{state.error}</p>}

      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </React.Fragment>
  );
};

export default Popular;
