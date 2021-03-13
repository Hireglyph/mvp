import React, { Component } from "react";
import Latex from "react-latex";
import { length } from "constants/PrevLength";

export default class TpPreview extends Component {
  render() {
    const { initial, approach, solution, expanded } = this.props;
    return (
      <div>
        <div>
          {initial ? "Initial:" : ""}
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
        </div>
        <div>
          {approach ? "Approaches:" : ""}
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
        </div>
        <div>
          {solution ? "Solution:" : ""}
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
        </div>
      </div>
    );
  }
}
