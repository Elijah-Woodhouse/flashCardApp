import { React } from 'react';

export default function FeedbackMessage(isCorrect) {

    

    return (
        <div>
          {isCorrect ? (
            <div className="correct-element">
              <h1>Correct!</h1>
            </div>
          ) : (
            <div className="false-element">
              <h1>Nope!</h1>
            </div>
          )}
        </div>
      );
}