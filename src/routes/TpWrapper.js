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
  keys: [],
  time: [],
}

class TpWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.questId !== this.props.questId) {
      this.setState(initialState);
    }
    if (!prevState.sorted && isLoaded(this.props.tps)) {
      let keys = this.props.tps ? Object.keys(this.props.tps) : [];
      keys.sort((a, b) => this.props.tps[b].total - this.props.tps[a].total);
      this.setState({
        keys,
        sorted: true,
        time: this.props.tps ? Object.keys(this.props.tps).reverse() : [],
      });
    }
  }

  render() {
    const { emailVerified, onboarded, question, questId, tps, uid } = this.props;

    if (uid && !isLoaded(tps)) {
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
                questParam={props.match.params.questParam}
                tps={tps}
                keys={this.state.keys}
                time={this.state.time}
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
                sortBy={props.match.params.sortBy}
                tps={tps}
                keys={this.state.keys}
                time={this.state.time}
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
                tp={tps && tps[props.match.params.tpId]}
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
  firebaseConnect(props =>
    props.uid
      ? [{ path: '/tps/' + props.questId }]
      : []
  ),
  connect(mapStateToProps)
)(TpWrapper);