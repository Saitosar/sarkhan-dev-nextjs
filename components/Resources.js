// components/Resources.js
import React from 'react';
import { resourcesData } from '@/lib/resourcesData';
import Icon from './Icon';

const ResourcesSection = ({ t, lang }) => {
  const currentResources = resourcesData[lang] || resourcesData['en'];

  return (
    <section id="resources">
      <div className="container">
        <h2>{t.resourcesSectionTitle}</h2>
        <div className="resources-grid">
          {currentResources.map(resource => {
            const isDownloadLink = resource.url.startsWith('/');

            return (
              <div className="resource-card" key={resource.id}>
                {resource.category && (
                  <span className="resource-category-tag">{resource.category}</span>
                )}
                <div className="resource-icon-wrapper">
                  <Icon name={resource.iconName} />
                </div>
                <h3>{resource.title}</h3>
                <hr className="resource-divider" />
                <p>{resource.description}</p>
                <div className="resource-card-footer">
                  <a 
                    href={resource.url} 
                    className="btn" 
                    download={isDownloadLink ? true : undefined}
                    target={isDownloadLink ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                  >
                    {isDownloadLink ? 'Yüklə' : t.viewButton}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;