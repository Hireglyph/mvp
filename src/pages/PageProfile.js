import React from 'react';

import { firebaseConnect, isLoaded } from 'react-redux-firebase';

class PageProfile extends React.Component {
    render() {
        return (<div>User profile!</div>);
    }
}

export default firebaseConnect([])(PageProfile);
