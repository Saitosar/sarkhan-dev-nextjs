// components/AboutSection.js
import { useState, useRef } from 'react';
import Image from 'next/image';
import FocusTrap from 'focus-trap-react';

const AboutSection = ({ t }) => {
    const [isAboutModalOpen, setAboutModalOpen] = useState(false);
    const triggerRef = useRef(null);

    const openModal = (e) => {
        triggerRef.current = e.currentTarget;
        setAboutModalOpen(true);
    };

    const closeModal = () => {
        setAboutModalOpen(false);
        triggerRef.current?.focus();
    };

    return (
     <>
        <section id="about">
            <div className="container">
                <h2>{t.aboutSectionTitle}</h2>
                <div className="about-container">
                    <div className="about-image-wrapper" onClick={openModal} tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && openModal(e)}>
                         <Image src="/assets/profile-photo.jpg" alt={t.aboutName} width={400} height={500} loading="lazy" />
                    </div>
                    <div className="about-text">
                        <h3>{t.aboutName}</h3>
                        <p>{t.aboutShortBio}</p>
                        <div className="about-skills-preview">
                          {t.skillsListShort.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
                        </div>
                        <button className="btn" onClick={openModal}>{t.readMore}</button>
                    </div>
                </div>
            </div>
        </section>

        {isAboutModalOpen && (
            <FocusTrap active={isAboutModalOpen} focusTrapOptions={{ onDeactivate: closeModal, initialFocus: false }}>
                <div className="fullscreen-overlay active" onClick={closeModal}>
                    <div className="fullscreen-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <button className="modal-close-btn" onClick={closeModal}>&times;</button>
                        <h3 className="modal-main-title">{t.aboutName}</h3>
                        
                        <div className="modal-layout">
                            <div className="modal-column modal-column-left">
                                <h4>{t.aboutSectionTitle}</h4>
                                <p className="about-long-bio">{t.aboutLongBio}</p>

                                <h4>{t.careerMapTitle}</h4>
                                <div className="timeline">
                                  {t.careerHistory.map((job, index) => (
                                    <div className="timeline-item-new" key={index}>
                                      <h5>{job.title}</h5>
                                      <p className="company">{job.company}</p>
                                      <p className="date">{job.date}</p>
                                      <p>{job.desc}</p>
                                    </div>
                                  ))}
                                </div>
                            </div>
                            <div className="modal-column modal-column-right">
                                <h4>{t.skillsTitle}</h4>
                                <ul className="skills-list">
                                    {t.skillsList.map(skill => <li key={skill}>{skill}</li>)}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </FocusTrap>
        )}
     </>
    );
};

export default AboutSection;