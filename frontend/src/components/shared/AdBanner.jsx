import React from 'react';

const AdBanner = ({ image, link, alt = "Advertisement" }) => {
  return (
    <div className="w-full flex justify-center ${className}">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={image}
          alt={alt}
          className="max-w-full h-auto object-contain"
           onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </a>
    </div>
  );
};

export default AdBanner;