import React from 'react';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Switch } from 'react-router-dom';

import PageQuestion from 'pages/PageQuestion';
import PageTp from 'pages/PageTp';
import PageNotFound from 'pages/PageNotFound';
import Loading from 'components/Loading';

class TpWrapper extends React.Component {
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
      // NOTE: this 'storeAs' is for the bug!
      ? [{ path: '/tps/' + props.questId, storeAs: '/tps/' + props.questId }]
      : []
  ),
  connect(mapStateToProps)
)(TpWrapper);
