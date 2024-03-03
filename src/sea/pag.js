// src/components/GoogleImageSearch.js
import  { useState } from 'react';
import axios from 'axios';

const GoogleImageSearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: 'AIzaSyA2U3AmLwmtDqMwFZf7rY7IhmvyN9midj0',
          cx: 'f70171c97d5b248bf',
          q: `${query} 4k wallpaper`,
          searchType: 'image',
          fileType: 'jpg',
          imgSize: 'xxlarge',
        },
      });

      setImages(response.data.items);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSaveImage = (imageUrl) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg';
    link.target = '_blank';

    // Simulate a click on the anchor to trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the temporary anchor from the document
    document.body.removeChild(link);
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <div>
        {images.map((image) => (
          <div key={image.link}>
            <img src={image.link} alt={image.title} />
            <button onClick={() => handleSaveImage(image.link)}>Save</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleImageSearch;
