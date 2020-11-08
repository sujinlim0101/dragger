import React from 'react';
import styled from 'styled-components';

const CircleBox: React.FC = styled.div`
  border: 1px solid #d2d2d2;
  background-color: orange;
  width: 20vh;
  height: 20vh;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = () => {
  return <CircleBox>drag me!</CircleBox>;
};
export default Box;
