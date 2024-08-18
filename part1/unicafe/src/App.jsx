import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const Statistics = ({ good, neutral, bad }) => {
    const totalFeedback = good + neutral + bad;
    const averageScore = totalFeedback ? (good - bad) / totalFeedback : 0;
    const positiveFeedbackPercentage = totalFeedback
      ? (good / totalFeedback) * 100
      : 0;

    if (totalFeedback === 0) {
      return <p>No feedback given</p>;
    }

    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="Total Feedback" value={totalFeedback} />
            <StatisticLine
              text="Average Score"
              value={averageScore.toFixed(2)}
            />
            <StatisticLine
              text="Positive Feedback"
              value={positiveFeedbackPercentage.toFixed(2) + "%"}
            />
          </tbody>
        </table>
      </div>
    );
  };

  const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
  };

  const StatisticLine = ({ text, value }) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    );
  };

  return (
    <div>
      <h1 style={{ display: "block", fontSize: "20px" }}>Give Feedback</h1>
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
