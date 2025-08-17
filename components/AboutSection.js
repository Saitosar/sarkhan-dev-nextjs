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
                <div className="about-content">
                    <div className="about-card" onClick={openModal}>
                        <Image src="/assets/profile-photo.jpg" alt={t.aboutName} width={400} height={500} loading="lazy" />
                    </div>
                    <div className="about-text">
                        <h3>{t.aboutName}</h3>
                        <p>{t.aboutShortBio}</p>
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
                        <h3>{t.aboutName}</h3>
                        <p>{t.aboutLongBio}</p>

                        <div className="skills-section">
                            <h4>{t.skillsTitle}</h4>
                            <ul className="skills-list">
                                {t.skillsList.map(skill => <li key={skill}>{skill}</li>)}
                            </ul>
                        </div>

                        <div className="career-map">
                            <h4>{t.careerMapTitle}</h4>
                            <div className="timeline">
                                <div className="timeline-item right">
                                    <div className="timeline-content">
                                        <h5>{t.career1Title}</h5>
                                        <p className="date">{t.career1Date}</p>
                                        <p>{t.career1Desc}</p>
                                    </div>
                                </div>
                                <div className="timeline-item left">
                                    <div className="timeline-content">
                                        <h5>{t.career2Title}</h5>
                                        <p className="date">{t.career2Date}</p>
                                        <p>{t.career2Desc}</p>
                                    </div>
                                </div>
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