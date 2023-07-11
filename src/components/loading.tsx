import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const moveUpDown = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
`;

const Dot = styled.div`
  font-size: 50px;
  animation: ${moveUpDown} 1s linear infinite;
`;

export const Loading: React.FC = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots.length < 3 ? dots + '.' : '.'));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <Dot>{dots}</Dot>
    </Container>
  );
};
