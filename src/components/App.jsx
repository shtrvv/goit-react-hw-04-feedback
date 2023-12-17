import { useState } from "react"
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions"
import Notification from "./Notification/Notification"
import Section from "./Section/Section"
import Statistics from "./Statistics/Statistics"

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })

  const incrementValue = (e) => {
    const key = e.target.name;
    setFeedback((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }))
  }

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  }

  const countPositiveFeedbackPercentage = () => {
    return Math.round((feedback.good / countTotalFeedback()) * 100);
  }

  const total = countTotalFeedback();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={incrementValue}
        />
      </Section>
      <Section title="Please leave feedback">
        {total ? <Statistics
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={total}
          positivePercentage={countPositiveFeedbackPercentage()}
        /> :
          <Notification message="There is no feedback" />}
      </Section>
    </>
  )
}

export default App