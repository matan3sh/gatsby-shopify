import React, { useState } from 'react';
import Image from 'gatsby-image';
import { ImageGalleryWrapper } from './styles';
import ImageThumbnail from './ImageThumbnail';

export const ImageGallery = ({ images }) => {
  const [activeImageThumbnail, setActiveImageThumbnail] = useState(images[0]);

  const handleClick = image => {
    setActiveImageThumbnail(image);
  };

  return (
    <ImageGalleryWrapper>
      <div>
        <Image fluid={activeImageThumbnail.localFile.childImageSharp.fluid} />
      </div>
      <div>
        {images.map(image => (
          <ImageThumbnail
            key={image.id}
            isActive={activeImageThumbnail.id === image.id}
            image={image}
            onClick={handleClick}
          />
        ))}
      </div>
    </ImageGalleryWrapper>
  );
};
