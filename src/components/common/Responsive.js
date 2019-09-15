import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    width: 768px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

Responsive.propTypes = {
  children: PropTypes.func
};

function Responsive({ children, ...rest }) {
  return (
    <ResponsiveBlock {...rest}>
      {children}
    </ResponsiveBlock>
  );
}

export default Responsive;
