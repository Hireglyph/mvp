/** @jsx jsx */

import { jsx } from 'theme-ui';
import { ContentPrivacySx } from 'theme/ContentPrivacyStyle';
import { ReactTitle } from 'react-meta-tags';

const PageContentPolicy = function () {
  return (
    <div sx={ContentPrivacySx}>
      <ReactTitle title="Content Policy | Hireglyph"/>
      <div className="main-title">Hireglyph Content Policy</div>
      <div>
        Hireglyph is a place of learning and community based on
        collaboration, and as such, we want to make the website as
        comfortable and safe for everyone as possible. By using
        Hireglyph, you consent to the following rules:
      </div>
      <div className="content-chunk">
        <div className="sub-title">Rule 1</div>
        <div>
          No hate speech, including sexism and racism. Hireglyph
          is founded on the principle that anyone, regardless of
          background, can succeed in specialized fields. We do not
          tolerate content that obstructs this principle and deters
          individuals from success.
        </div>
      </div>
      <div className="content-chunk">
        <div className="sub-title">Rule 2</div>
        <div>
          No offensive language or behaviors towards other users.
          Offensive language and/or behaviour makes people
          uncomfortable and/or makes people feel attacked, and we
          want Hireglyph to be a place where everyone is comfortable
          and able to learn.
        </div>
      </div>
      <div className="content-chunk">
        <div className="sub-title">Rule 3</div>
        <div>
          No advertising. While you may reference and/or link to
          specific products or companies that are relevant in
          context and may benefit other users, an environment where
          users post or give feedback with the sole intention of
          promoting a product will distract from the interview
          preparation activities taking place on Hireglyph.
        </div>
      </div>
      <div className="content-chunk">
        <div className="sub-title">Rule 4</div>
        <div>
          No harassment of other users, including revealing their
          private information. Harassing other users and revealing
          private information has real-world consequences and hurts
          the physical and/or mental safety of users.
        </div>
      </div>
      <div className="content-chunk">
        <div className="sub-title">Rule 5</div>
        <div>
          No spamming. Please do not post the same TP to a question
          multiple times, and please do not post the same feedback
          to a TP multiple times. Do not post inauthentic content,
          including unoriginal TPs to a question copied from another
          user or found online. Do not use an automated system to
          complete actions, such as posting TPs and/or feedback,
          and upvoting/downvoting content. Do not post blatantly
          irrelevant content.
        </div>
      </div>
      <div className="content-chunk">
        <div className="sub-title">Rule 6</div>
        <div>
          No sexually explicit content. Sexually explicit content
          makes our users uncomfortable and unable to concentrate
          on interview preparation.
        </div>
      </div>
      <div className="content-chunk">
        <div className="sub-title">Rule 7</div>
        <div>
          No illegal activity of any kind. You may be charged and/or
          convicted for illegal activity you do on Hireglyph.
        </div>
      </div>
    </div>
  );
};

export default PageContentPolicy;
