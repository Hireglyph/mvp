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
        <div className="tp-preview-label">
          {initial && "Initial:"}
        </div>
        <div>
          {initial && (
            <Latex>{initial}</Latex>
          )}
        </div>
        <div className="tp-preview-label">
          {approach && "Approaches:"}
        </div>
        <div>
          {approach && (
            <Latex>{approach}</Latex>
          )}
        </div>
        <div className="tp-preview-label">
          {solution && "Solution:"}
        </div>
        <div>
          {solution && (
            <Latex>{solution}</Latex>
          )}
        </div>
      </div>
      :
      <div sx={TpPreviewSx}>
        <div>
          <span className="tp-preview-label">
            {initial && "Initial:"}
          </span>
          <span>
            {initial && (
              <Latex>
                {initial.slice(0, length + 1) +
                (initial.length > length ? "..." : "")}
              </Latex>
            )}
          </span>
        </div>
        <div>
          <span className="tp-preview-label">
            {approach && "Approaches:"}
          </span>
          <span>
            {approach && (
              <Latex>
                {approach.slice(0, length + 1) +
                (approach.length > length ? "..." : "")}
              </Latex>
            )}
          </span>
        </div>
        <div>
          <span className="tp-preview-label">
            {solution && "Solution:"}
          </span>
          <span>
            {solution && (
              <Latex>
                {solution.slice(0, length + 1) +
                (solution.length > length ? "..." : "")}
              </Latex>
            )}
          </span>
        </div>
      </div>
    )
    ;
  }
}
