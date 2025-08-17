// components/resources.js
import React from 'react';

const ResourcesSection = ({ t }) => (
    <section id="resources">
        <div className="container">
            <h2>{t.resourcesSectionTitle}</h2>
            <div className="resources-grid">
                 <div className="resource-card">
                    <h3>{t.res1Title}</h3>
                    <p>{t.res1Desc}</p>
                    <a href="#" className="btn">{t.viewButton}</a>
                </div>
                {/* Новые ресурсы будут добавляться сюда */}
            </div>
        </div>
    </section>
);

export default ResourcesSection;