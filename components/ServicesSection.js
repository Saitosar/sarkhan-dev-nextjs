// components/ServicesSection.js (НОВЫЙ ФАЙЛ)
import React from 'react';

const ServicesSection = ({ t }) => {
  return (
    <section id="services">
      <div className="container">
        <h2>{t.servicesSectionTitle}</h2>
        <div className="service-card">
          <div className="service-content">
            <h3>{t.mentorshipTitle}</h3>
            <p>{t.mentorshipDescription}</p>
            <h4>{t.mentorshipIncludesTitle}</h4>
            <ul>
              {t.mentorshipIncludesList && t.mentorshipIncludesList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className="service-cta">
              <a href="#contact" className="btn">{t.mentorshipCtaButton}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;