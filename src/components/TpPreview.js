/** @jsx jsx */

import { jsx } from 'theme-ui';
import { Component } from 'react';
import Latex from 'react-latex';
import { length } from 'constants/PrevLength';
import { displayContent } from 'utils/display';

const TpPreviewSx = {
  '.tp-preview-label': {
    fontFamily: 'Gotham-Bold',
  },

  '.tp-preview-block': {
    marginBottom: '2px',
  },

  '.format-text': {
    whiteSpace: 'pre-wrap',
  },
};

export default class TpPreview extends Component {
  render() {
    const { initial, approach, solution, expanded } = this.props;
    return (
      expanded ? (
        // if expanded: display full initial/approach/solution
        <div sx={TpPreviewSx}>
          {initial && (
            <div className="tp-preview-block format-text">
              <div className="tp-preview-label">
                Initial:
              </div>
              <div>
                <Latex>{displayContent(initial)}</Latex>
              </div>
            </div>
          )}
          {approach && (
            <div className="tp-preview-block format-text">
              <div className="tp-preview-label">
                Approach(es) Tried:
              </div>
              <div>
                <Latex>{displayContent(approach)}</Latex>
              </div>
            </div>
          )}
          {solution && (
            <div className="tp-preview-block format-text">
              <div className="tp-preview-label">
                Final Solution:
              </div>
              <div>
                <Latex>{displayContent(solution)}</Latex>
              </div>
            </div>
          )}
        </div>
      ) : (
        // if not expanded: only display initial/approach/solution up to "length"
        <div sx={TpPreviewSx}>
          {initial && (
            <div className="tp-preview-block">
              <span className="tp-preview-label">
                Initial:&nbsp;
              </span>
              <span>
                <Latex>
                  {displayContent(
                    initial.slice(0, length + 1) +
                    (initial.length > length ? '...' : '')
                  )}
                </Latex>
              </span>
            </div>
          )}
          {approach && (
            <div className="tp-preview-block">
              <span className="tp-preview-label">
                Approach(es) Tried:&nbsp;
              </span>
              <span>
                <Latex>
                  {displayContent(
                    approach.slice(0, length + 1) +
                    (approach.length > length ? '...' : '')
                  )}
                </Latex>
              </span>
            </div>
          )}
          {solution && (
            <div className="tp-preview-block">
              <span className="tp-preview-label">
                Final Solution:&nbsp;
              </span>
              <span>
                <Latex>
                  {displayContent(
                    solution.slice(0, length + 1) +
                    (solution.length > length ? '...' : '')
                  )}
                </Latex>
              </span>
            </div>
          )}
        </div>
      )
    );
  }
}
