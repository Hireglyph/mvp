/** @jsx jsx */

import ReactLoading from 'react-loading';
import { jsx } from 'theme-ui';

const LoadingSx = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '100px'
}

// loading animation
const Loading = function () {
  return (
    <div sx={LoadingSx}>
      <ReactLoading type="bars" width={150} />
    </div>
  );
};

export default Loading;
