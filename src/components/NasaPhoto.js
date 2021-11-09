import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

// const apiKey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);
  useEffect(() => {
    fetchphoto();
    async function fetchphoto() {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=iZvpt2enGO2YWHPPYBSLwhtZyJvdAVhS89HYkc68`
      );

      const data = await res.json();
      setPhotoData(data);
      console.log(data);
    }
  }, []);

  const Para = styled.p`
    padding: 5px;
  `;
  const DivPic = styled.div`
    padding: 40px;
    margin: auto auto;
    max-height: 100%;
  `;

  const Mainpic = styled.img`
    display: flex;
    margin: auto;
    max-height: 90vh;
  `;
  const HeaderTit = styled.h1`
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  if (!photoData) return <div />;

  return (
    <>
      <Navbar />
      <div>
        {photoData.media_type === 'image' ? (
          <DivPic>
            <Mainpic src={photoData.url} alt={photoData.title} />
          </DivPic>
        ) : (
          <iframe
            title='space-video'
            src={photoData.url}
            frameBorder='0'
            gesture='media'
            allow='encrypted-media'
            allowFullScreen
            className='photo'
          />
        )}

        <div>
          <HeaderTit>{photoData.title}</HeaderTit>
          <Para>{photoData.date}</Para>
          <Para>{photoData.explanation}</Para>
        </div>
      </div>
    </>
  );
}
