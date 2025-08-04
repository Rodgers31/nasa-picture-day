import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Navbar from './Navbar';

// Animated star background
const moveStars = keyframes`
  from { background-position: 0 0, 0 0, 0 0; }
  to { background-position: 1000px 500px, 800px 400px, 600px 300px; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Background = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(ellipse at 20% 30%, #fff3 1px, transparent 1px),
    radial-gradient(ellipse at 70% 80%, #fff5 1.5px, transparent 1.5px),
    radial-gradient(ellipse at 50% 50%, #fff8 2px, transparent 2px),
    linear-gradient(135deg, #232526 0%, #414345 100%);
  background-size: 200px 200px, 300px 300px, 400px 400px, cover;
  background-repeat: repeat;
  animation: ${moveStars} 60s linear infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.13);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 28px;
  padding: 2.5rem 3rem 2rem 3rem;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 750px;
  width: 97vw;
  animation: ${fadeIn} 1s cubic-bezier(0.4, 1.4, 0.6, 1) 0.2s both;
  border: 1.5px solid #00c6ff33;
  position: relative;
`;

const MediaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 24px #0072ff33;
  background: #181c24;
`;

const Mainpic = styled.img`
  max-width: 100%;
  max-height: 60vh;
  border-radius: 18px;
  transition: transform 0.4s cubic-bezier(0.4, 1.4, 0.6, 1);
  &:hover {
    transform: scale(1.025) rotate(-1deg);
  }
`;

const StyledIframe = styled.iframe`
  width: 100%;
  min-height: 350px;
  border-radius: 18px;
  box-shadow: 0 4px 24px #0003;
  background: #111;
`;

const HeaderTit = styled.h1`
  font-size: 2.3rem;
  color: #00c6ff;
  margin-bottom: 0.5rem;
  text-align: center;
  letter-spacing: 1.5px;
  font-weight: 800;
  text-shadow: 0 2px 12px #0072ff44;
`;

const Divider = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  border-radius: 2px;
  margin: 1.2rem auto 1.2rem auto;
`;

const Para = styled.p`
  color: #e0e0e0;
  font-size: 1.13rem;
  margin: 0.3rem 0 0.7rem 0;
  text-align: center;
  line-height: 1.7;
`;

const DateText = styled.p`
  color: #fff;
  font-size: 1.08rem;
  margin-bottom: 0.7rem;
  text-align: center;
  font-weight: 600;
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  border-radius: 8px;
  padding: 0.2rem 1.1rem;
  display: inline-block;
  box-shadow: 0 2px 8px #0072ff22;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ActionButton = styled.button`
  padding: 0.7rem 2.2rem;
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  box-shadow: 0 2px 8px #0072ff44;
  transition: background 0.3s, transform 0.2s;
  cursor: pointer;
  letter-spacing: 1px;
  &:hover {
    background: linear-gradient(90deg, #0072ff 0%, #00c6ff 100%);
    transform: translateY(-2px) scale(1.04);
  }
`;

export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to get a random date string in NASA APOD's range
  function getRandomDate() {
    const start = new Date(1995, 5, 16).getTime();
    const end = new Date().getTime();
    const random = new Date(start + Math.random() * (end - start));
    return random.toISOString().split('T')[0];
  }

  async function fetchPhoto(date = null) {
    setLoading(true);
    let url = `https://api.nasa.gov/planetary/apod?api_key=iZvpt2enGO2YWHPPYBSLwhtZyJvdAVhS89HYkc68`;
    if (date) url += `&date=${date}`;
    const res = await fetch(url);
    const data = await res.json();
    setPhotoData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPhoto();
    // eslint-disable-next-line
  }, []);

  if (loading || !photoData)
    return (
      <Background>
        <Navbar />
        <Card style={{ minHeight: '400px', justifyContent: 'center' }}>
          <Para>Loading NASA's magic...</Para>
        </Card>
      </Background>
    );

  return (
    <Background>
      <Navbar />
      <Card>
        <MediaContainer>
          {photoData.media_type === 'image' ? (
            <Mainpic src={photoData.url} alt={photoData.title} />
          ) : (
            <StyledIframe
              title='space-video'
              src={photoData.url}
              frameBorder='0'
              allow='encrypted-media'
              allowFullScreen
            />
          )}
        </MediaContainer>
        <HeaderTit>{photoData.title}</HeaderTit>
        <DateText>{photoData.date}</DateText>
        <Divider />
        <Para>{photoData.explanation}</Para>
        <ButtonRow>
          <ActionButton onClick={() => fetchPhoto(getRandomDate())}>
            🌠 See Another Random Day
          </ActionButton>
          <ActionButton onClick={() => fetchPhoto()}>🔄 Back to Today</ActionButton>
        </ButtonRow>
      </Card>
    </Background>
  );
}
