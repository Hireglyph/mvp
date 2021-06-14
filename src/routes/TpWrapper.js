import React from 'react';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Switch } from 'react-router-dom';

import PageQuestion from 'pages/PageQuestion';
import PageTp from 'pages/PageTp';
import PageNotFound from 'pages/PageNotFound';
import Loading from 'components/Loading';

const initialState = {
  sorted: false,
  createdTP: false,
  keys: [],
  time: [],
}

class TpWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps, prevState) {
    // reset state if questId changes (aka navigation via related question)
    if (prevProps.questId !== this.props.questId) {
      this.setState(initialState);
    }

    /* sort all the TPs once, the first time the user is in PageQuestion when they
      are in the TpWrapper route for the questId; OR sort the TPs again once a user submits
      their own TP so it is at the top of the New TPs section on PageQuestion */
    if (this.props.isPageQuestion && isLoaded(this.props.tps)
        && (!this.state.sorted || this.state.createdTP)) {
      let keys = this.props.tps ? Object.keys(this.props.tps) : [];
      keys.sort((a, b) => this.props.tps[b].total - this.props.tps[a].total);
      this.setState({
        keys,
        sorted: true,
        createdTP: false,
        time: this.props.tps ? Object.keys(this.props.tps).reverse() : [],
      });
    }
  }

  tpCreated = () => this.setState({ createdTP: true });

  render() {
    const {
      emailVerified,
      onboarded,
      question,
      questId,
      questIsLoaded,
      tps,
      uid,
      isPageQuestion
    } = this.props;

    if (isPageQuestion && uid && !isLoaded(tps)) {
      return <Loading />
    }

    return (
      <div className="TpWrapper">
        <Switch>
          {/* Question Page */}
          <Route
            exact path="/q/:questId/:questParam?"
            render={props =>
              <PageQuestion
                uid={uid}
                emailVerified={emailVerified}
                onboarded={onboarded}
                question={question}
                questId={questId}
                questIsLoaded={questIsLoaded}
                questParam={props.match.params.questParam}
                tps={tps}
                keys={this.state.keys}
                time={this.state.time}
                tpCreated={this.tpCreated}
              />
            }
          />

          <Route
            exact path="/q/:questId/community/:sortBy"
            render={props =>
              <PageQuestion
                uid={uid}
                emailVerified={emailVerified}
                onboarded={onboarded}
                question={question}
                questId={questId}
                questIsLoaded={questIsLoaded}
                sortBy={props.match.params.sortBy}
                tps={tps}
                keys={this.state.keys}
                time={this.state.time}
                tpCreated={this.tpCreated}
              />
            }
          />

          {/* TP Page */}
          <Route
            exact path="/tp/:questId/:tpId"
            render={props =>
              <PageTp
                uid={uid}
                questId={questId}
                tpId={props.match.params.tpId}
              />
            }
          />

          {/* catch broken routes */}
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const tps = state.firebase.data.tps && state.firebase.data.tps[props.questId];
  return { tps, };
}

export default compose(
  /* pull all /tps/props.questId if on PageQuestion (not pageTp)
  and do not pull TPs if user is not logged in */
  firebaseConnect(props =>
    props.uid && props.isPageQuestion
      ? [{ path: '/tps/' + props.questId }]
      : []
  ),
  connect(mapStateToProps)
)(TpWrapper);
