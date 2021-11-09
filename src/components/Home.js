import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../index.css';

const TakePic = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  let time = new Date().toLocaleTimeString();
  const [curretTime, setCurretTime] = useState(time);

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setCurretTime(time);
  };
  setInterval(UpdateTime, 1000);
  return (
    <>
      <h1 className='time'>{curretTime}</h1>
    </>
  );
};

export default function Home() {
  return (
    <TakePic>
      <App />
      <Link to='/nasaphoto'>
        <div>
          <h1>Click: Picture of the day!</h1>
        </div>
      </Link>
      <div>
        <h4> Made by: Rodgers Otieno</h4>
        <section className='underline'></section>
      </div>
    </TakePic>
  );
}
