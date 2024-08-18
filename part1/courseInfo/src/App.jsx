import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content
        part1={course.parts[0].name}
        exercises1={course.parts[0].exercises}
        part2={course.parts[1].name}
        exercises2={course.parts[1].exercises}
        part3={course.parts[2].name}
        exercises3={course.parts[2].exercises}
      />
      <Total
        exercises1={course.parts[0].exercises}
        exercises2={course.parts[1].exercises}
        exercises3={course.parts[2].exercises}
      />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Number of exercises: {exercises}</p>
    </div>
  );
};

const Content = ({
  part1,
  exercises1,
  part2,
  exercises2,
  part3,
  exercises3,
}) => {
  return (
    <div>
      <Part name={part1} exercises={exercises1} />
      <Part name={part2} exercises={exercises2} />
      <Part name={part3} exercises={exercises3} />
    </div>
  );
};

const Total = ({ exercises1, exercises2, exercises3 }) => {
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
};

export default App;
