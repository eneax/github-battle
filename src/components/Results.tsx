import * as React from "react";
import PropTypes from "prop-types";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser,
  FaCode,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import queryString from "query-string";

import { battle, Player, User } from "../utils/api";

import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";

const ProfileList = ({ profile }: { profile: User }) => (
  <ul className="card-list">
    <li>
      <FaUser color="rgb(239, 115, 115)" size={22} />
      {profile.name}
    </li>
    {profile.location && (
      <li>
        <Tooltip text="User's location">
          <FaCompass color="rgb(144, 115, 255)" size={22} />
          {profile.location}
        </Tooltip>
      </li>
    )}
    {profile.company && (
      <li>
        <Tooltip text="User's company">
          <FaBriefcase color="#795548" size={22} />
          {profile.company}
        </Tooltip>
      </li>
    )}
    <li>
      <FaUsers color="rgb(129, 195, 245)" size={22} />
      {profile.followers.toLocaleString()} followers
    </li>
    <li>
      <FaUserFriends color="rgb(64, 183, 95)" size={22} />
      {profile.following.toLocaleString()} following
    </li>
    <li>
      <Tooltip text="User's public repos">
        <FaCode color="rgb(59, 76, 85)" size={22} />
        {profile.public_repos.toLocaleString()} repositories
      </Tooltip>
    </li>
  </ul>
);

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

interface ResultsReducerState {
  winner: Player | null;
  loser: Player | null;
  error: string | null;
  loading: boolean;
}

type ResultsReducerAction =
  | {
      type: "success";
      winner: Player;
      loser: Player;
    }
  | {
      type: "error";
      error: string;
    };

const resultsReducer = (
  state: ResultsReducerState,
  action: ResultsReducerAction
): ResultsReducerState => {
  if (action.type === "success") {
    return {
      winner: action.winner,
      loser: action.loser,
      error: null,
      loading: false,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  } else {
    throw new Error("Unexpected action type!");
  }
};

const initialState = {
  winner: null,
  loser: null,
  error: null,
  loading: true,
};

const Results = ({ location }: { location: { search: string } }) => {
  const [state, dispatch] = React.useReducer(resultsReducer, initialState);
  const { playerOne, playerTwo } = queryString.parse(location.search);

  React.useEffect(() => {
    battle([playerOne, playerTwo] as [string, string])
      .then((players) =>
        dispatch({ type: "success", winner: players[0], loser: players[1] })
      )
      .catch((error) => dispatch({ type: "error", error: error.message }));
  }, [playerOne, playerTwo]);

  const { winner, loser, error, loading } = state;

  if (loading === true || !winner || !loser) {
    return <Loading text="Battling" />;
  }

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <React.Fragment>
      <div className="grid space-around container-sm">
        {/* Winner */}
        <Card
          header={winner.score === loser.score ? "Tie" : "Winner"}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>

        {/* Loser */}
        <Card
          header={winner.score === loser.score ? "Tie" : "Loser"}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          name={loser.profile.login}
          href={loser.profile.html_url}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>

      <Link className="btn dark-btn btn-space" to="/battle">
        Reset
      </Link>
    </React.Fragment>
  );
};

export default Results;
