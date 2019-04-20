import React, { PureComponent } from "react";
import classes from "./GithubInfo.module.scss";
import utilClasses from "../../../Util/Util.module.scss";
import { ReactComponent as Fork } from "../../../Assets/SVG/code-fork.svg";
import { ReactComponent as Star } from "../../../Assets/SVG/star-outlined.svg";
import { ReactComponent as Eye } from "../../../Assets/SVG/visibility.svg";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/ProfileAction";
import SomethingWentWrong from "../../../HOC/ErrorHandler/SomethingWentWrong";
import { Github } from "../../../keys/Keys";

class GithubInfo extends PureComponent {
  state = {
    clientId: Github.clientId,
    clientSecret: Github.clientSecret,
    count: 5,
    sort: "created:asc",
    repos: []
  };
  componentDidMount = async () => {
    if (!this.state.repos.length > 0) {
      try {
        const response = await fetch(
          `https://api.github.com/users/${
            this.props.profile.githubUserName
          }/repos?per_page=${this.state.count}&sort=${
            this.state.sort
          }&client_id=${this.state.clientId}&client_secret=${
            this.state.clientSecret
          }`
        );
        const repos = await response.json();
        if (this.refs.myRef) {
          this.setState({ repos });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  somethingWentWrongCloseHandler = () => {
    this.props.onSomethingWentWrongClose();
  };

  render() {
    let reposItems;
    if (this.state.repos.length > 0) {
      reposItems = this.state.repos.map(repo => (
        <div className={classes.GithubInfo_Repos} key={repo.id}>
          <div className={classes.GithubInfo_Repos__LinkContainer}>
            <a
              className={classes.GithubInfo_Repos__LinkContainer_Link}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.name}
            </a>
            <p className={utilClasses.Paragraph}>{repo.description}</p>
          </div>
          <div className={classes.GithubInfo_Repos__Info}>
            <span>
              <Star className={classes.GithubInfo_Repos__Info_Svg} />
              <p className={utilClasses.Paragraph}>
                Stars: {repo.stargazers_count}
              </p>
            </span>
            <span>
              <Eye className={classes.GithubInfo_Repos__Info_Svg} />
              <p className={utilClasses.Paragraph}>
                Watchers: {repo.watchers_count}
              </p>
            </span>
            <span>
              <Fork className={classes.GithubInfo_Repos__Info_Svg} />
              <p className={utilClasses.Paragraph}>Forks: {repo.forks_count}</p>
            </span>
          </div>
        </div>
      ));
    } else {
      reposItems = (
        <div className={classes.GithubInfo_Repos}>
          <p className={utilClasses.Paragraph}>There are no repositories.</p>
        </div>
      );
    }

    if (this.props.somethingWentWrong) {
      return (
        <SomethingWentWrong
          somethingWentWrong={this.props.somethingWentWrong}
          somethingWentWrongCloseHandler={this.somethingWentWrongCloseHandler}
        />
      );
    }
    return (
      <div className={classes.GithubInfo} ref="myRef">
        <h2
          className={utilClasses.Secondary__Heading}
          style={{ marginTop: "4rem" }}
        >
          Latest Github Repository
        </h2>
        {reposItems}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    profile: state.profileReducer.profile,
    somethingWentWrong: state.profileReducer.somethingWentWrong
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSomethingWentWrongClose: () =>
      dispatch(actions.profileSomethingWentWrongCloseHandler())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GithubInfo);
