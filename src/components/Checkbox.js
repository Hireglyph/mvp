/** @jsx jsx */

import { Component } from 'react';
import { jsx } from 'theme-ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

const checkboxSx = {
  color: 'mediumGray',
  fontSize: '12px',
  '.flex-container': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  '.checkbox': {
    marginRight: '5px',
  }
}

export default class Checkbox extends Component {
  render() {
    const { label, checked, handleCheck } = this.props;

    return (
      <div sx={checkboxSx}>
        <div className="flex-container">
          <div onClick={handleCheck}>
          { checked ?
            <FontAwesomeIcon icon={faCheckSquare} className="checkbox" /> :
            <FontAwesomeIcon icon={faSquare} className="checkbox" /> }
          </div>
          <div className="label">
            {label}
          </div>
        </div>
      </div>
    );
  }
}
