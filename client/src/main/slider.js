import React, { useState, useEffect } from 'react';
import './slider.css';

const randomReviews = [
"ಬ್ಯಾಂಕ್ ಅತ್ಯುತ್ತಮ ಗ್ರಾಹಕ ಸೇವೆ ಮತ್ತು ತ್ವರಿತ ಬೆಂಬಲವನ್ನು ನೀಡುತ್ತದೆ",
"ನಾನು ಸುಲಭವಾಗಿ ಮತ್ತು ಯಾವುದೇ ತೊಂದರೆಯಿಲ್ಲದೆ ಸಾಲಕ್ಕಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಾಯಿತು. ಹೆಚ್ಚು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ!",
"ಅವರ ಮೊಬೈಲ್ ಬ್ಯಾಂಕಿಂಗ್ ಅಪ್ಲಿಕೇಶನ್ ಬಹಳ ಸ್ಪಷ್ಟ ಮತ್ತು ಬಳಸಲು ಸುಲಭವಾಗಿದೆ",
"ಈ ಬ್ಯಾಂಕ್ ನನ್ನ ವರ್ಷಗಳಿಂದ ನನ್ನ ಮೊದಲ ಆಯ್ಕೆಯಾಗಿದೆ, ಬಹಳ ವಿಶ್ವಾಸಾರ್ಹವಾಗಿದೆ",
"ಖಾತೆ ನಿರ್ವಹಣೆ ಸರಳವಾಗಿದೆ ಮತ್ತು ಅವರ ಸಲಹೆಗಾರರು ಬಹಳ ಸಹಾಯಕರಾಗಿದ್ದಾರೆ",
"ಅವರ ಹೂಡಿಕೆ ಆಯ್ಕೆಗಳು ಮತ್ತು ಇಳುವರಿಗಳಿಂದ ನಾನು ಪ್ರಭಾವಿತನಾಗಿದ್ದೇನೆ",
"ಶಾಖಾ ಸಿಬ್ಬಂದಿ ಸ್ನೇಹಪರರಾಗಿದ್ದಾರೆ ಮತ್ತು ಯಾವಾಗಲೂ ಸಹಾಯ ಮಾಡಲು ಸಿದ್ಧರಾಗಿದ್ದಾರೆ",
"ನಾನು ಹೊಂದಿರುವ ಅತ್ಯುತ್ತಮ ಬ್ಯಾಂಕಿಂಗ್ ಅನುಭವ, ಎಲ್ಲವೂ ಸರಳವಾಗಿದೆ",
"ಅವರ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಆಯ್ಕೆಗಳು ಅದ್ಭುತವಾಗಿವೆ ಮತ್ತು ಅದ್ಭುತ ಪ್ರತಿಫಲಗಳೊಂದಿಗೆ",
"ನಾನು ನನ್ನ ಉಳಿತಾಯದೊಂದಿಗೆ ಈ ಬ್ಯಾಂಕ್ ಅನ್ನು ನಂಬುತ್ತೇನೆ. ಅವರ ಭದ್ರತೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ!",
"ಅತ್ಯುತ್ತಮ ಸೇವೆ", "ಬ್ಯಾಂಕ್ ಎಲ್ಲಾ ಪ್ರಯೋಜನಗಳನ್ನು ನೀಡುತ್ತದೆ"
];


const randomNames = [
  "John Doe", "Jane Smith", "Robert Johnson", "Emily Davis",
  "Michael Brown", "Laura Wilson", "James Miller", "Linda White",
  "Paul Garcia", "Anna Martinez", "Jamen Martin", "Lucid"
];

const randomImages = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
  "https://randomuser.me/api/portraits/women/6.jpg",
  "https://randomuser.me/api/portraits/men/7.jpg",
  "https://randomuser.me/api/portraits/women/8.jpg",
  "https://randomuser.me/api/portraits/men/9.jpg",
  "https://randomuser.me/api/portraits/women/10.jpg",
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
];

const testimonialsData = Array.from({ length: 12 }, (_, index) => ({
  name: randomNames[index],
  text: randomReviews[index],
  image: randomImages[index],
}));

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 4 >= testimonialsData.length ? 0 : prevIndex + 4
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonial-slider">
      <div className="testimonial-container">
        {testimonialsData.slice(currentIndex, currentIndex + 4).map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="testimonial-image"
            />
            <div className="testimonial-content">
              <p className="testimonial-text">{testimonial.text}</p>
              <h3 className="testimonial-name">{testimonial.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSlider;
