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
                            <h3>Let's connect!</h3>
                            <p>
                                Open to remote or hybrid opportunities with international teams. Feel free to reach out via email or connect with me on social media.
                            </p>
                            <a href="mailto:sarkhan.hajiyev@gmail.com" className="contact-link">sarkhan.hajiyev@gmail.com</a>
                            <div className="social-links">
                                <a href="https://linkedin.com/in/sarkhanhajiyev" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/saitosar" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;