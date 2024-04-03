import { connect } from "react-redux";

const Leaderboard = ({ rankedUsers }) => {
  const sortedRankedUsersIds = Object.keys(rankedUsers).sort((a, b) => {
    return rankedUsers[a].ranking - rankedUsers[b].ranking;
  });

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Ranking</th>
          <th scope="col">Users</th>
          <th scope="col">Answered</th>
          <th scope="col">Created</th>
        </tr>
      </thead>
      <tbody>
        {sortedRankedUsersIds.map((usr) => {
          const user = rankedUsers[usr];
          console.log(user);
          return (
            <tr key={user.id}>
              <th scope="row">{user.ranking + 1}</th>
              <td>
                <div className="container">
                  <div className="row nav justify-content-center">
                    <div className="col-sm-2">
                      <img
                        src={user.avatarURL}
                        style={{ width: 64, height: 64 }}
                      />
                    </div>
                    <div className="col-sm-2">
                      <p>{user.name}</p>
                      <p className="text-muted">{user.id}</p>
                    </div>
                  </div>
                </div>
              </td>
              <td>{user.answered}</td>
              <td>{user.created}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => {
  const rankedUsersIds = Object.keys(users).sort((a, b) => {
    return (
      Object.keys(users[b].answers).length +
      users[b].questions.length -
      (Object.keys(users[a].answers).length + users[a].questions.length)
    );
  });
  const rankedUsers = rankedUsersIds.map((userId) => users[userId]);
  const leaderBoardUsers = rankedUsers.map((user, index) => {
    return {
      [user.id]: {
        ranking: index,
        name: user.name,
        id: user.id,
        answered: Object.keys(user.answers).length,
        created: user.questions.length,
        avatarURL: user.avatarURL,
      },
    };
  });

  const leaderBoardUsersObj = Object.assign({}, ...leaderBoardUsers);

  return {
    rankedUsers: leaderBoardUsersObj,
  };
};

export default connect(mapStateToProps)(Leaderboard);
