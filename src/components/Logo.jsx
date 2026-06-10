import React from 'react';
import logoImg from '../assets/logo.png';

export const Logo = () => (
  <div className="bawra-brand-logo">
    <img 
      src={logoImg} 
      alt="Bawra Skill House Logo" 
      className="brand-logo-img" 
      style={{ height: '42px', width: 'auto', objectFit: 'contain', display: 'block' }}
    />
  </div>
);

export default Logo;
