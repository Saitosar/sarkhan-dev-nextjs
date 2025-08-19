// components/ContactSection.js
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const ContactSection = ({ t }) => {
    const formSchema = z.object({
        name: z.string().min(1, { message: t.validation.nameRequired }),
        email: z.string().email({ message: t.validation.emailInvalid }).min(1, { message: t.validation.emailRequired }),
        message: z.string().min(10, { message: t.validation.messageMin }),
    });

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data) => {
        console.log("Form submitted:", data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Thank you for your message!");
        reset();
    };

    return (
        <section id="contact">
            <div className="container">
                <h2>{t.contactSectionTitle}</h2>
                <div className="contact-wrapper">
                    <div className="contact-layout">
                        {/* Левая колонка: Форма */}
                        <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="form-group">
                                <label htmlFor="name-input">{t.formNamePlaceholder}</label>
                                <input id="name-input" {...register("name")} type="text" placeholder={t.formNamePlaceholder} />
                                {errors.name && <p className="form-error">{errors.name.message}</p>}
                            </div>
                            <div className="form-group">
                                 <label htmlFor="email-input">{t.formEmailPlaceholder}</label>
                                <input id="email-input" {...register("email")} type="email" placeholder={t.formEmailPlaceholder} />
                                {errors.email && <p className="form-error">{errors.email.message}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-input">{t.formMessagePlaceholder}</label>
                                <textarea id="message-input" {...register("message")} placeholder={t.formMessagePlaceholder}></textarea>
                                {errors.message && <p className="form-error">{errors.message.message}</p>}
                            </div>
                            <div className="form-footer">
                                <button type="submit" className="btn" disabled={isSubmitting}>{isSubmitting ? t.formSubmitting : t.formSubmitButton}</button>
                            </div>
                        </form>
                        
                        {/* Правая колонка: Информация */}
                        <div className="contact-info">
                            <h3>{t.contactInfoTitle}</h3>
                            <p>{t.contactInfoText}</p>
                            <ul className="contact-list">
                                <li>
                                    <a href="mailto:sarkhan.hajiyev@gmail.com" className="contact-link">
                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        <span>sarkhan.hajiyev@gmail.com</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://linkedin.com/in/sarkhanhajiyev" target="_blank" rel="noopener noreferrer" className="contact-link">
                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                        <span>LinkedIn</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/saitosar" target="_blank" rel="noopener noreferrer" className="contact-link">
                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                        <span>GitHub</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;