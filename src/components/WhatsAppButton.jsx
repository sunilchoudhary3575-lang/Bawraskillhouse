import React from 'react';
import Icons from './Icons';

export const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/917340053442?text=Hi%20Bawra%20Skill%20House,%20I'm%20interested%20in%20learning%20more%20about%20your%20courses!" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-floating-btn"
      aria-label="Contact us on WhatsApp"
    >
      <Icons.WhatsApp />
    </a>
  );
};

export default WhatsAppButton;
