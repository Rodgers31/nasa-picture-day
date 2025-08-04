import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Background = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s ease;
`;

const Time = styled.h1`
  color: #fff;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px #000a;
`;

const NasaButton = styled(Link)`
  margin: 2rem 0 1rem 0;
  padding: 1rem 2.5rem;
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 4px 16px 0 #0072ff44;
  transition: background 0.3s, transform 0.2s;
  cursor: pointer;
  &:hover {
    background: linear-gradient(90deg, #0072ff 0%, #00c6ff 100%);
    transform: translateY(-2px) scale(1.04);
  }
`;

const QuizButton = styled(Link)`
  margin: 0.5rem 0 1.5rem 0;
  padding: 0.9rem 2.2rem;
  background: linear-gradient(90deg, #ffb347 0%, #ffcc33 100%);
  color: #232526;
  font-size: 1.15rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 2px 8px 0 #ffb34744;
  transition: background 0.3s, transform 0.2s;
  cursor: pointer;
  letter-spacing: 1px;
  &:hover {
    background: linear-gradient(90deg, #ffcc33 0%, #ffb347 100%);
    transform: translateY(-2px) scale(1.04);
  }
`;

const Author = styled.div`
  color: #e0e0e0;
  font-size: 1rem;
  margin-top: 1.5rem;
  text-align: center;
  letter-spacing: 1px;
`;

const Underline = styled.div`
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  border-radius: 2px;
  margin: 0.5rem auto 0 auto;
`;

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return <Time>{currentTime}</Time>;
}

export default function Home() {
  return (
    <Background>
      <Card>
        <Clock />
        <NasaButton to='/nasaphoto'>
          <span role='img' aria-label='rocket'>
            🚀
          </span>{' '}
          Nasa Picture of the Day!
        </NasaButton>
        <QuizButton to='/quiz'>
          <span role='img' aria-label='quiz'>
            🌌
          </span>{' '}
          Night Sky Quiz
        </QuizButton>
        <Author>
          Made by: Rodgers Otieno
          <Underline />
        </Author>
      </Card>
    </Background>
  );
}
