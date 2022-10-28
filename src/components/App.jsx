import React, { useState } from 'react';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const optionsOfFeedBack = () => {
    const optionsArray = [...Object.keys({ good, neutral, bad })];

    return optionsArray;
  };

  const feedbackCounter = event => {
    const feedbackOptionValue = event.currentTarget.value;

    switch (feedbackOptionValue) {
      case 'good':
        return setGood(prevState => prevState + 1);
      case 'neutral':
        return setNeutral(prevState => prevState + 1);
      case 'bad':
        return setBad(prevState => prevState + 1);
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    const total = good + neutral + bad;

    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const percentage = Math.round((good / (good + neutral + bad)) * 100);

    return percentage;
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={optionsOfFeedBack()}
          onLeaveFeedback={feedbackCounter}
        />
      </Section>
      <Section title="Statistics">
        {good || neutral || bad > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="Oops! There is no feedback" />
        )}
      </Section>
    </>
  );
};
