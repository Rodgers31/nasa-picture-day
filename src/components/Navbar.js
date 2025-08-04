import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  width: 100vw;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  padding: 1.2rem 2.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HomeLink = styled(Link)`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  box-shadow: 0 2px 8px #0072ff33;
  transition: background 0.3s, transform 0.2s;
  &:hover {
    background: linear-gradient(90deg, #0072ff 0%, #00c6ff 100%);
    transform: scale(1.04);
  }
`;

export default function Navbar() {
  return (
    <NavBarContainer>
      <HomeLink to='/'>
        <span role='img' aria-label='home'>
          🏠
        </span>{' '}
        Take Me Home
      </HomeLink>
    </NavBarContainer>
  );
}
