/** @jsx jsx */

import { jsx } from 'theme-ui';
import { Component } from "react";
import Latex from "react-latex";
import { length } from "constants/PrevLength";

const TpPreviewSx = {
  '.tp-preview-label': {
    fontFamily: 'Gotham-Bold',
  },
};

export default class TpPreview extends Component {
  render() {
    const { initial, approach, solution, expanded } = this.props;
    return (
      expanded
      ?
      <div sx={TpPreviewSx}>
        {initial && (
          <div>
            <div className="tp-preview-label">
              Initial:
            </div>
            <div>
              <Latex>{initial}</Latex>
            </div>
          </div>
        )}
        {approach && (
          <div>
            <div className="tp-preview-label">
              Approaches:
            </div>
            <div>
              <Latex>{approach}</Latex>
            </div>
          </div>
        )}
        {solution && (
          <div>
            <div className="tp-preview-label">
              Solution:
            </div>
            <div>
              <Latex>{solution}</Latex>
            </div>
          </div>
        )}
      </div>
      :
      <div sx={TpPreviewSx}>
        {initial && (
          <div>
            <span className="tp-preview-label">
              Initial:
            </span>
            <span>
              <Latex>
                {initial.slice(0, length + 1) +
                (initial.length > length ? "..." : "")}
              </Latex>
            </span>
          </div>
        )}
        {approach && (
          <div>
            <span className="tp-preview-label">
              Approaches:
            </span>
            <span>
              <Latex>
                {approach.slice(0, length + 1) +
                (approach.length > length ? "..." : "")}
              </Latex>
            </span>
          </div>
        )}
        {solution && (
          <div>
            <span className="tp-preview-label">
              Solution:
            </span>
            <span>
              <Latex>
                {solution.slice(0, length + 1) +
                (solution.length > length ? "..." : "")}
              </Latex>
            </span>
          </div>
        )}
      </div>
    );
  }
}
