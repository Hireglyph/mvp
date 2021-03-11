/** @jsx jsx */

import { Component } from "react";
import { jsx } from 'theme-ui';
import Latex from "react-latex";

import { length } from "../constants/PrevLength";

const TpPreviewSx = {
  fontFamily: 'Gotham-Book',
};

export default class TpPreview extends Component {
  render() {
    const { initial, approach, solution, expanded } = this.props;
    return (
      <div sx={TpPreviewSx}>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <div>
          <span>{initial ? "Initial:" : ""}</span>
          <span>
            {expanded ? (
              <Latex>{initial}</Latex>
            ) : (
              initial && (
                <Latex>
                  {initial.slice(0, length + 1) +
                    (initial.length > length ? "..." : "")}
                </Latex>
              )
            )}
          </span>
        </div>
        <div>
          <span>
            {approach ? "Approaches:" : ""}
          </span>
          <span>
            {expanded ? (
              <Latex>{approach}</Latex>
            ) : (
              approach && (
                <Latex>
                  {approach.slice(0, length + 1) +
                    (approach.length > length ? "..." : "")}
                </Latex>
              )
            )}
          </span>
        </div>
        <div>
          <span>{solution ? "Solution:" : ""}</span>
          <span>
            {expanded ? (
              <Latex>{solution}</Latex>
            ) : (
              solution && (
                <Latex>
                  {solution.slice(0, length + 1) +
                    (solution.length > length ? "..." : "")}
                </Latex>
              )
            )}
          </span>
        </div>
      </div>
    );
  }
}
