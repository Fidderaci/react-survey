// Components don't need to be separeted into individual files
// Here we have a smaller component that helps compose the AnswersItem below

import PropTypes from "prop-types";

const answersSet = {
  swimming: "Swimming",
  bathing: "Bathing",
  chatting: "Chatting",
  noTime: "I don't like to spend time with it"
};

function ItemsList({ list }) {
  return (
    <ul>
      {list.map((item) => (
        <li key={item}>{answersSet[item]}</li>
      ))}
    </ul>
  );
}

ItemsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired
};


export default function AnswersItem({
  answerItem: { username, colour, timeSpent, review },
    onEdit,
    index
}) {
  return (
    <li>
      <article className="answer">
        <h3>{username || "Some random person"} said:</h3>
        <p>
          <em>How do you rate your rubber duck colour?</em>
          <span className="answer__line">{colour}</span>
        </p>
        <p>
          <em>How do you like to spend time with your rubber duck?</em>
          <ItemsList list={timeSpent} />
        </p>
        <p>
          <em>What else have you got to say about your rubber duck?</em>
          <span className="answer__line">{review}</span>
        </p>
        <button type="button" onClick={() => onEdit(index)}>Edit</button>
      </article>
    </li>
  );
}

AnswersItem.propTypes = {
  answerItem: PropTypes.shape({
    username: PropTypes.string,
    colour: PropTypes.string,
    timeSpent: PropTypes.arrayOf(PropTypes.string),
    review: PropTypes.string,
    onEdit: PropTypes.func,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
