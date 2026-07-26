import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle, Send, AlertCircle } from 'lucide-react';
import type { FormData, FormErrors } from '../types';

const EVENT_TYPES = [
  'Wedding Photography',
  'Pre-Wedding Shoot',
  'Portrait Session',
  'Event Photography',
  'Commercial Photography',
  'Product Photography',
  'Drone Photography',
  'Videography',
  'Other',
];


const contactDetails = [
  { icon: Phone, label: 'Call / WhatsApp', value: '+91 95143 62836', href: 'tel:+919514362836', sub: 'Mon–Sat, 9am–7pm' },
  { icon: Mail, label: 'Email Us', value: 'lytrokapture777@gmail.com', href: 'mailto:lytrokapture777@gmail.com', sub: 'We reply within 24hrs' },
  { icon: MapPin, label: 'Based In', value: 'Karuppur, Salem', href: '#', sub: 'Tamil Nadu · Available across South India' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat 9am–7pm', href: '#', sub: 'Sunday by appointment' },
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email';
  const digitsOnly = data.phone.replace(/\D/g, '');
  if (!digitsOnly) errors.phone = 'Phone number is required';
  else if (digitsOnly.length !== 10) errors.phone = 'Phone number must be exactly 10 digits';
  if (!data.eventType) errors.eventType = 'Please select an event type';
  if (!data.eventDate) errors.eventDate = 'Please select your event date';
  if (!data.location.trim()) errors.location = 'Location is required';
  if (!data.message.trim()) errors.message = 'Tell us a bit about your project';
  return errors;
}
const Field = ({ name, label, error, children }: { name?: string; label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-luxury-subtle text-sm font-medium mb-2">{label}</label>
    {children}
    {error && (
      <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
        <AlertCircle size={11} /> {error}
      </p>
    )}
  </div>
);

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', eventType: '',
    eventDate: '', location: '', budget: '', message: '',  // budget kept for type compat
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const update = (field: keyof FormData, value: string) => {
    setFormData(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'ce7883fe-b30f-4463-a895-d97f6ba45371',
          subject: 'Website contact form',
          from_name: formData.name,
          ...formData
        })
      });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="pt-10 md:pt-16 pb-20 md:pb-32 bg-luxury-dark relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luxury-gold/3 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-4">Get in Touch</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Let's Create Something <span className="text-gold-gradient">Extraordinary</span>
          </h2>
          <p className="text-luxury-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Every great photograph starts with a conversation. Tell us about your vision and we'll bring it to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: Contact info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact cards */}
            {contactDetails.map((detail, i) => (
              <motion.a
                key={detail.label}
                href={detail.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4 glass-card rounded-xl p-4 hover:border-luxury-gold/30 border border-luxury-border transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-luxury-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-luxury-gold/20 transition-colors duration-300">
                  <detail.icon size={18} className="text-luxury-gold" />
                </div>
                <div>
                  <p className="text-luxury-muted text-xs font-medium uppercase tracking-wider">{detail.label}</p>
                  <p className="text-white font-medium mt-0.5">{detail.value}</p>
                  <p className="text-luxury-muted text-xs mt-0.5">{detail.sub}</p>
                </div>
              </motion.a>
            ))}

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="rounded-xl overflow-hidden border border-luxury-border"
            >
              <iframe
                title="Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3906.6417493127724!2d78.09098437505597!3d11.71976658849224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDQzJzExLjIiTiA3OMKwMDUnMzYuOCJF!5e0!3m2!1sen!2sin!4v1785051618573!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </motion.div>
          </motion.div>

          {/* Right: Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 md:p-8 border border-luxury-border">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white mb-1">Enquiry & Booking</h3>
                  <p className="text-luxury-muted text-sm">We reply within 24 hours.</p>
                </div>
                <a
                  href="https://wa.me/919514362836"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12 }}
                      className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={36} className="text-green-400" />
                    </motion.div>
                    <h4 className="font-display font-bold text-2xl text-white mb-3">Enquiry Received!</h4>
                    <p className="text-luxury-muted leading-relaxed mb-8">
                      Thank you for reaching out. We've received your enquiry and will respond within 24 hours. Can't wait to hear more about your project!
                    </p>
                    <button 
                      onClick={() => {
                        setStatus('idle');
                        setFormData({
                          name: '', email: '', phone: '', eventType: '',
                          eventDate: '', location: '', budget: '', message: ''
                        });
                        setErrors({});
                      }} 
                      className="btn-gold"
                    >
                      Submit Another Enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field name="name" label="Full Name *" error={errors.name}>
                        <input
                          type="text"
                          placeholder="Priya Sharma"
                          value={formData.name}
                          onChange={e => update('name', e.target.value)}
                          className={`custom-input ${errors.name ? 'border-red-500/60' : ''}`}
                        />
                      </Field>
                      <Field name="email" label="Email Address *" error={errors.email}>
                        <input
                          type="email"
                          placeholder="priya@example.com"
                          value={formData.email}
                          onChange={e => update('email', e.target.value)}
                          className={`custom-input ${errors.email ? 'border-red-500/60' : ''}`}
                        />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field name="phone" label="Phone Number *" error={errors.phone}>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '');
                            update('phone', val);
                          }}
                          className={`custom-input ${errors.phone ? 'border-red-500/60' : ''}`}
                        />
                      </Field>
                      <Field name="eventDate" label="Event Date *" error={errors.eventDate}>
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.eventDate}
                          onChange={e => update('eventDate', e.target.value)}
                          className={`custom-input ${errors.eventDate ? 'border-red-500/60' : ''}`}
                          style={{ colorScheme: 'dark' }}
                        />
                      </Field>
                    </div>

                    <Field name="eventType" label="Event Type *" error={errors.eventType}>
                      <select
                        value={formData.eventType}
                        onChange={e => update('eventType', e.target.value)}
                        className={`custom-input ${errors.eventType ? 'border-red-500/60' : ''}`}
                      >
                        <option value="">Select type...</option>
                        {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field name="location" label="Event Location *" error={errors.location}>
                        <input
                          type="text"
                          placeholder="Udaipur, Rajasthan / Mumbai..."
                          value={formData.location}
                          onChange={e => update('location', e.target.value)}
                          className={`custom-input ${errors.location ? 'border-red-500/60' : ''}`}
                        />
                      </Field>
                      
                      <Field name="budget" label="Estimated Budget (Optional)" error={errors.budget}>
                        <select
                          value={formData.budget}
                          onChange={e => update('budget', e.target.value)}
                          className={`custom-input ${errors.budget ? 'border-red-500/60' : ''}`}
                        >
                          <option value="">Select range...</option>
                          <option value="Under ₹50,000">Under ₹50,000</option>
                          <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                          <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                          <option value="₹2,50,000+">₹2,50,000+</option>
                        </select>
                      </Field>
                    </div>

                    <Field name="message" label="Tell Us About Your Vision *" error={errors.message}>
                      <textarea
                        rows={4}
                        placeholder="Share your ideas, inspirations, must-have shots, or anything that helps us understand your dream..."
                        value={formData.message}
                        onChange={e => update('message', e.target.value)}
                        className={`custom-input resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                      />
                    </Field>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                      {status === 'error' ? (
                        <p className="text-red-400 text-sm flex items-center gap-2">
                          <AlertCircle size={14} /> Failed to send message. Please try again.
                        </p>
                      ) : (
                        <div />
                      )}
                      <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-gold justify-center text-sm px-8 py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {status === 'sending' ? (
                          <>
                            <div className="w-4 h-4 rounded-full border-2 border-luxury-dark border-t-transparent animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Enquiry
                          </>
                        )}
                      </motion.button>
                    </div>

                    <p className="text-luxury-muted text-xs text-center">
                      🔒 Your information is private and never shared. We'll only use it to respond to your enquiry.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
