import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Navbar from './Navbar';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Background = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2233 0%, #232526 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  padding: 2.5rem 3rem;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 95vw;
  animation: ${fadeIn} 1s ease;
  @media (max-width: 900px) {
    max-width: 95vw;
    padding: 2rem 1.2rem;
  }
  @media (max-width: 600px) {
    padding: 1.2rem 0.5rem;
    border-radius: 14px;
    margin-top: 1.2rem;
  }
`;

const SkyImage = styled.img`
  width: 100%;
  max-width: 600px;
  max-height: 450px;
  border-radius: 18px;
  margin-bottom: 1.2rem;
  box-shadow: 0 4px 24px #0003;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.4, 1.4, 0.6, 1);
  ${({ $zoom }) => $zoom && 'transform: scale(1.5);'}
  @media (max-width: 900px) {
    max-width: 95vw;
    max-height: 320px;
  }
  @media (max-width: 600px) {
    max-width: 100vw;
    max-height: 180px;
    border-radius: 10px;
  }
`;

const Question = styled.h2`
  color: #00c6ff;
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  text-align: center;
`;

const ScoreDisplay = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  color: #00c6ff;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  background: rgba(0, 198, 255, 0.15);
  backdrop-filter: blur(8px);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: 2px solid rgba(0, 198, 255, 0.4);
  box-shadow: 0 4px 16px rgba(0, 198, 255, 0.2);
  z-index: 1000;
  @media (max-width: 600px) {
    top: 1rem;
    right: 1rem;
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }
`;

const OptionButton = styled.button`
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  padding: 0.7rem 2rem;
  margin: 0.5rem 0;
  box-shadow: 0 2px 8px #0072ff44;
  transition: background 0.3s, transform 0.2s;
  transition: background 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  width: 100%;
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 30px;
  }
  &:hover {
    background: linear-gradient(90deg, #0072ff 0%, #00c6ff 100%);
    transform: translateY(-2px) scale(1.04);
  }
`;

const Fact = styled.div`
  color: #fff;
  background: #0072ff33;
  border-radius: 12px;
  padding: 1.2rem 1rem;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  text-align: center;
`;

const NextButton = styled.button`
  margin-top: 1.5rem;
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  padding: 0.7rem 2.2rem;
  box-shadow: 0 2px 8px #0072ff44;
  transition: background 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  letter-spacing: 1px;
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
    border-radius: 30px;
  }
  &:hover {
    background: linear-gradient(90deg, #0072ff 0%, #00c6ff 100%);
    transform: translateY(-2px) scale(1.04);
  }
`;

const DetailsButton = styled.button`
  margin-top: 1rem;
  background: linear-gradient(90deg, #6c5ce7 0%, #a29bfe 100%);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  box-shadow: 0 2px 8px #6c5ce744;
  transition: background 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
    border-radius: 25px;
  }
  &:hover {
    background: linear-gradient(90deg, #a29bfe 0%, #6c5ce7 100%);
    transform: translateY(-2px) scale(1.04);
  }
`;

const ImageDetails = styled.div`
  color: #fff;
  background: #6c5ce733;
  border-radius: 12px;
  padding: 1.2rem 1rem;
  margin-top: 1rem;
  font-size: 0.95rem;
  text-align: left;
  max-height: 300px;
  overflow-y: auto;

  h4 {
    margin: 0 0 0.8rem 0;
    color: #a29bfe;
    font-size: 1.1rem;
  }

  p {
    margin: 0.5rem 0;
    line-height: 1.4;
  }

  .source {
    font-style: italic;
    color: #b2bec3;
    font-size: 0.85rem;
    margin-top: 0.8rem;
  }
`;

// List of astronomy objects to use for quiz (can be expanded)
const OBJECTS = [
  { name: 'Mars', keywords: 'mars planet' },
  { name: 'Jupiter', keywords: 'jupiter planet' },
  { name: 'Saturn', keywords: 'saturn planet' },
  { name: 'Venus', keywords: 'venus planet' },
  { name: 'Mercury', keywords: 'mercury planet' },
  { name: 'Neptune', keywords: 'neptune planet' },
  { name: 'Uranus', keywords: 'uranus planet' },
  { name: 'Earth', keywords: 'earth planet' },
  { name: 'Moon', keywords: 'moon' },
  { name: 'Sirius', keywords: 'sirius star' },
  { name: 'Polaris', keywords: 'polaris star' },
  { name: 'Betelgeuse', keywords: 'betelgeuse star' },
  { name: 'Orion', keywords: 'orion constellation' },
  { name: 'Ursa Major', keywords: 'ursa major constellation' },
  { name: 'Andromeda', keywords: 'andromeda galaxy' },
  { name: 'Milky Way', keywords: 'milky way galaxy' },
  { name: 'Triangulum', keywords: 'triangulum galaxy' },
  { name: 'Whirlpool', keywords: 'whirlpool galaxy' },
];

export default function NightSkyQuiz() {
  const [selected, setSelected] = useState(null);
  const [showFact, setShowFact] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [objectOptions, setObjectOptions] = useState([]);
  const [answerObj, setAnswerObj] = useState(null);
  const [question, setQuestion] = useState('');
  const [fact, setFact] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [imageDesc, setImageDesc] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Generate a new quiz round
  async function generateQuizRound() {
    setLoading(true);
    setShowFact(false);
    setShowDetails(false);
    setSelected(null);
    setImgUrl(null);
    setObjectOptions([]);
    setAnswerObj(null);
    setQuestion('');
    setFact('');
    setImageTitle('');
    setImageDesc('');
    setImageSource('');

    // 1. Pick a random object
    const answer = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
    // 2. Fetch a random image for the answer object from NASA API
    let image = null;
    let imageTitle = '';
    let imageDesc = '';
    let imageId = '';
    let answerName = answer.name;
    try {
      const res = await fetch(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(
          answer.keywords
        )}&media_type=image`
      );
      const data = await res.json();
      let items = data.collection && data.collection.items ? data.collection.items : [];

      // Filter for items whose title or description contains the object name
      const nameLower = answer.name.toLowerCase();
      let filtered = items.filter((item) => {
        const title =
          item.data && item.data[0] && item.data[0].title ? item.data[0].title.toLowerCase() : '';
        const desc =
          item.data && item.data[0] && item.data[0].description
            ? item.data[0].description.toLowerCase()
            : '';

        // Filter out artistic concepts, illustrations, simulations, and unrelated content
        const isArtistic =
          title.includes('artist') ||
          title.includes('concept') ||
          title.includes('illustration') ||
          title.includes('rendering') ||
          title.includes('simulation') ||
          title.includes('hypothetical') ||
          title.includes('composite') ||
          title.includes('comet') ||
          title.includes('asteroid') ||
          title.includes('meteor') ||
          desc.includes('artist') ||
          desc.includes('concept') ||
          desc.includes('illustration') ||
          desc.includes('rendering') ||
          desc.includes('simulation') ||
          desc.includes('hypothetical') ||
          desc.includes('composite');

        // For planets, be very strict - title must contain planet name prominently
        const isPlanet = [
          'mars',
          'jupiter',
          'saturn',
          'venus',
          'mercury',
          'neptune',
          'uranus',
          'earth',
        ].includes(nameLower);
        if (isPlanet) {
          // Title must start with planet name or have it as a standalone word
          const titleWords = title.split(/\s+/);
          const hasProminentName =
            titleWords.some((word) => word === nameLower) || title.startsWith(nameLower);
          return hasProminentName && !isArtistic;
        }

        // For other objects, require name in title (not just description)
        const containsNameInTitle = title.includes(nameLower);
        return containsNameInTitle && !isArtistic;
      });

      // If no strict matches found, try with relaxed filtering
      if (filtered.length === 0) {
        filtered = items.filter((item) => {
          const title =
            item.data && item.data[0] && item.data[0].title ? item.data[0].title.toLowerCase() : '';
          const desc =
            item.data && item.data[0] && item.data[0].description
              ? item.data[0].description.toLowerCase()
              : '';

          // Still avoid obvious mismatches
          const hasUnrelatedContent =
            title.includes('comet') ||
            title.includes('asteroid') ||
            title.includes('meteor') ||
            desc.includes('comet') ||
            desc.includes('asteroid') ||
            desc.includes('meteor');

          const containsName = title.includes(nameLower) || desc.includes(nameLower);
          return containsName && !hasUnrelatedContent;
        });
      }

      // Last resort: skip this object and try another one
      if (filtered.length === 0) {
        console.log(`No suitable images found for ${answer.name}, trying another object...`);
        return generateQuizRound(); // Recursively try again with a different object
      }

      if (filtered.length > 0) {
        const randomItem = filtered[Math.floor(Math.random() * filtered.length)];
        image = randomItem.links && randomItem.links[0] ? randomItem.links[0].href : null;
        imageTitle =
          randomItem.data && randomItem.data[0] && randomItem.data[0].title
            ? randomItem.data[0].title
            : '';
        imageDesc =
          randomItem.data && randomItem.data[0] && randomItem.data[0].description
            ? randomItem.data[0].description
            : '';
        imageId =
          randomItem.data && randomItem.data[0] && randomItem.data[0].nasa_id
            ? randomItem.data[0].nasa_id
            : '';

        // Determine the correct answer based on what's actually in the image
        const plausibleAnswers = OBJECTS.filter((obj) => {
          const n = obj.name.toLowerCase();
          const titleMatch = imageTitle.toLowerCase().includes(n);
          const descMatch = imageDesc.toLowerCase().includes(n);
          return titleMatch || descMatch;
        }).sort((a, b) => {
          // Prioritize objects mentioned in title over description
          const aInTitle = imageTitle.toLowerCase().includes(a.name.toLowerCase());
          const bInTitle = imageTitle.toLowerCase().includes(b.name.toLowerCase());
          if (aInTitle && !bInTitle) return -1;
          if (!aInTitle && bInTitle) return 1;
          return 0;
        });

        // Use the most prominent object mentioned in the image as the correct answer
        if (plausibleAnswers.length > 0) {
          answerName = plausibleAnswers[0].name;
        }
      }
    } catch (e) {}
    setImgUrl(image);
    setImageTitle(imageTitle);
    setImageDesc(imageDesc);
    setImageSource(`NASA Image ID: ${imageId}`);

    // 3. Generate diverse answer options
    const correctAnswer = OBJECTS.find((obj) => obj.name === answerName);

    // Create categories for better diversity
    const planets = OBJECTS.filter((obj) => obj.keywords.includes('planet'));
    const stars = OBJECTS.filter((obj) => obj.keywords.includes('star'));
    const constellations = OBJECTS.filter((obj) => obj.keywords.includes('constellation'));
    const galaxies = OBJECTS.filter((obj) => obj.keywords.includes('galaxy'));
    const other = OBJECTS.filter((obj) => obj.name === 'Moon');

    // Remove the correct answer from all categories
    const allCategories = [planets, stars, constellations, galaxies, other];
    allCategories.forEach((category) => {
      const index = category.findIndex((obj) => obj.name === answerName);
      if (index > -1) category.splice(index, 1);
    });

    // Build diverse options (try to get one from each category if possible)
    let distractors = [];
    const categories = [planets, stars, constellations, galaxies, other].filter(
      (cat) => cat.length > 0
    );

    // Get one random option from each available category
    categories.forEach((category) => {
      if (distractors.length < 3 && category.length > 0) {
        const randomObj = category[Math.floor(Math.random() * category.length)];
        distractors.push(randomObj.name);
        // Remove from category to avoid duplicates
        const index = category.findIndex((obj) => obj.name === randomObj.name);
        category.splice(index, 1);
      }
    });

    // If we need more options, randomly fill from remaining objects
    const allRemaining = OBJECTS.filter(
      (obj) => obj.name !== answerName && !distractors.includes(obj.name)
    );

    while (distractors.length < 3 && allRemaining.length > 0) {
      const randomIndex = Math.floor(Math.random() * allRemaining.length);
      distractors.push(allRemaining[randomIndex].name);
      allRemaining.splice(randomIndex, 1);
    }

    // Ensure exactly 3 distractors
    distractors = distractors.slice(0, 3);

    // Combine correct answer with distractors and shuffle
    const options = [answerName, ...distractors].sort(() => 0.5 - Math.random());
    setObjectOptions(options);
    setAnswerObj(correctAnswer || OBJECTS.find((obj) => obj.name === answerName));
    setQuestion('What is the name of the object in this NASA image?');
    setFact('');
    setLoading(false);
  }

  useEffect(() => {
    generateQuizRound();
    // eslint-disable-next-line
  }, []);

  function handleOption(option) {
    setSelected(option);
    setShowFact(true);
    setTotalQuestions(totalQuestions + 1);

    if (answerObj) {
      if (option === answerObj.name) {
        setScore(score + 1);
      }
      setFact(`${answerObj.name}: This is a NASA image of ${answerObj.name}.`);
    }
  }

  function nextQuestion() {
    generateQuizRound();
  }

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  return (
    <Background>
      <Navbar />
      <ScoreDisplay>
        Score: {score} / {totalQuestions}{' '}
        {totalQuestions > 0 && `(${Math.round((score / totalQuestions) * 100)}%)`}
      </ScoreDisplay>
      <Card>
        {loading ? (
          <div style={{ color: '#fff', marginBottom: '1.2rem' }}>Loading NASA image...</div>
        ) : imgUrl ? (
          <SkyImage src={imgUrl} alt='NASA astronomy object' $zoom={showFact} />
        ) : (
          <div style={{ color: '#fff', marginBottom: '1.2rem' }}>No image available.</div>
        )}
        <Question>{question}</Question>
        {objectOptions.map((option) => (
          <OptionButton
            key={option}
            onClick={() => handleOption(option)}
            disabled={showFact}
            style={
              showFact && answerObj && option === answerObj.name
                ? { background: 'linear-gradient(90deg, #00ff99 0%, #00c6ff 100%)', color: '#222' }
                : showFact && option === selected
                ? { background: 'linear-gradient(90deg, #ff4e50 0%, #f9d423 100%)', color: '#222' }
                : {}
            }>
            {option}
          </OptionButton>
        ))}
        {showFact && answerObj && (
          <Fact>
            {selected === answerObj.name ? '✅ Correct!' : '❌ Incorrect.'} <br />
            <strong>{answerObj.name}</strong>: {fact}
            <NextButton onClick={nextQuestion}>Next</NextButton>
            <DetailsButton onClick={toggleDetails}>
              {showDetails ? 'Hide Details' : 'More Details'}
            </DetailsButton>
          </Fact>
        )}
        {showDetails && (
          <ImageDetails>
            <h4>NASA Image Details</h4>
            <p>
              <strong>Title:</strong> {imageTitle || 'No title available'}
            </p>
            <p>
              <strong>Description:</strong> {imageDesc || 'No description available'}
            </p>
            <p className='source'>{imageSource}</p>
          </ImageDetails>
        )}
      </Card>
    </Background>
  );
}
