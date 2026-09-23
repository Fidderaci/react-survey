import { useState } from "react";
import AnswersList from "./AnswersList";

const initialFormState = {
  color: "",
  spendTime: [],
  review: "",
  username: "",
  email: ""
};

function Survey() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [answersList, setAnswersList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  function handleEdit(index) {
    const answer = answersList[index];
    setFormData({
      color: answer.colour,
      spendTime: answer.timeSpent,
      review: answer.review,
      username: answer.username,
      email: "",
    });
    setEditingIndex(index);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSpendTimeChange(event) {
    const { value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      spendTime: checked
        ? [...prev.spendTime, value]
        : prev.spendTime.filter((item) => item !== value)
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);

    const newAnswer = {
      username: formData.username,
      colour: formData.color,
      timeSpent: formData.spendTime,
      review: formData.review
    };

    if (editingIndex !== null) {
      setAnswersList((prev) =>
        prev.map((answer, i) => (i === editingIndex ? newAnswer : answer))
    );
  } else {
      setAnswersList((prev) => [...prev, newAnswer]);
    }

    setFormData(initialFormState);
    setEditingIndex(null);
    setOpen(true);
  }

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        <AnswersList answersList={answersList} onEdit={handleEdit} />
      </section>
      <section className="survey__form">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Tell us what you think about your rubber duck!</h2>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck colour?</h3>
            <ul>
              <li>
                <input
                  id="color-one"
                  type="radio"
                  name="color"
                  value="1"
                  checked={formData.color === "1"}
                  onChange={handleChange}
                />
                <label htmlFor="color-one">1</label>
              </li>
              <li>
                <input
                  id="color-two"
                  type="radio"
                  name="color"
                  value="2"
                  checked={formData.color === "2"}
                  onChange={handleChange}
                />
                <label htmlFor="color-two">2</label>
              </li>
              <li>
                <input
                  id="color-three"
                  type="radio"
                  name="color"
                  value="3"
                  checked={formData.color === "3"}
                  onChange={handleChange}
                />
                <label htmlFor="color-three">3</label>
              </li>
              <li>
                <input
                  id="color-four"
                  type="radio"
                  name="color"
                  value="4"
                  checked={formData.color === "4"}
                  onChange={handleChange}
                />
                <label htmlFor="color-four">4</label>
              </li>
            </ul>
          </div>
          <div className="form__group">
            <h3>How do you like to spend time with your rubber duck</h3>
            <ul>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="swimming"
                    checked={formData.spendTime.includes("swimming")}
                    onChange={handleSpendTimeChange}
                  />
                  Swimming
                </label>
              </li>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="bathing"
                    checked={formData.spendTime.includes("bathing")}
                    onChange={handleSpendTimeChange}
                  />
                  Bathing
                </label>
              </li>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="chatting"
                    checked={formData.spendTime.includes("chatting")}
                    onChange={handleSpendTimeChange}
                  />
                  Chatting
                </label>
              </li>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="noTime"
                    checked={formData.spendTime.includes("noTime")}
                    onChange={handleSpendTimeChange}
                  />
                  I don&apos;t like to spend time with it
                </label>
              </li>
            </ul>
          </div>
          <label>
            What else have you got to say about your rubber duck?
            <textarea
              name="review"
              cols="30"
              rows="10"
              value={formData.review}
              onChange={handleChange}
            ></textarea>
          </label>
          <label>
            Put your name here (if you feel like it):
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Leave us your email pretty please??
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <input className="form__submit" type="submit" value="Submit Survey!" />
        </form>
      </section>
    </main>
  );
}

export default Survey;
