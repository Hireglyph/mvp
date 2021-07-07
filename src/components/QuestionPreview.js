/** @jsx jsx */

import { jsx } from 'theme-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { BoxQuestSx } from 'theme/ComponentStyle.js';

class QuestionPreview extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hotQuestsExpanded: new Set(),
    };
  }

  expandQuest = (quests, expanded, questId) => {
    let newSet = new Set(this.state[quests]);
    expanded ? newSet.delete(questId) : newSet.add(questId);
    this.setState({ [quests]: newSet });
  };

  render() {

    const { questId, question, solved } = this.props;

    if (!isLoaded(question)) {
      return null;
    }
    
    const maxTags = 1;
    const maxDropdownDisplay = 1;
    const keyArr = question.tags && Object.keys(question.tags);
    const displayDropdown = keyArr.length > maxTags;

    // topics that are displayed in the problem box
    const topics = question.tags && keyArr.map((tag, i) =>
      <div key={i}>
        {(i < maxDropdownDisplay || !displayDropdown) 
          && <div className="tag topic-tag">{tag}</div>}
      </div>
    );

    // topics that are displayed in dropdown
    const dropdownTopics = question.tags && keyArr.map((tag, i) =>
      <div key={i}>
        {(i >= maxDropdownDisplay) && <div className="tag topic-tag dropdown-tag">{tag}</div>}
      </div>
    );

    const expanded = this.state.hotQuestsExpanded.has(questId);

    // display question: title, difficulty, tags
    // + checkmark if user has solved the question
    return (
      <div sx={BoxQuestSx}>
        <div className="related-quest-box" key={questId}>
          <Link className="box-quest-box-link related-quest-box-link" to={`/q/${questId}/my`}>
            <div className="question-title">
              #{questId}: {question.title}
            </div>
            <div className="box-quest-tags">
              <div className="topic-container" 
                onMouseEnter={() => 
                  this.expandQuest('hotQuestsExpanded', false, questId)
                }  
                onMouseOver={() => 
                  this.expandQuest('hotQuestsExpanded', false, questId)
                }  
                onMouseLeave={() => 
                  this.expandQuest('hotQuestsExpanded', true, questId)
                }
              >
                {topics}
                {(keyArr && displayDropdown && !expanded) 
                  && <FontAwesomeIcon icon={faAngleRight} className="drop-arrow"/>}
                {(keyArr && displayDropdown && expanded) 
                  && <FontAwesomeIcon icon={faAngleDown} className="drop-arrow"/>}
              </div>
              <div className="box-quest-icon-box">
                {solved && <FontAwesomeIcon icon={faCheck} className="check" />}
                <div className={"box-quest-diff  " + question.difficulty}></div>
              </div>
            </div>
          </Link>
          {(keyArr && displayDropdown && expanded) 
            && <div className="dropdown box-quests-dropdown" >{dropdownTopics}</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { questions, questionHistory } = state.firebase.data;
  const question = questions && questions[props.questId];
  const solved = questionHistory && questionHistory[props.questId];

  return { question, solved };
}

export default compose(
  connect(mapStateToProps)
)(QuestionPreview);
