import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronDown, MessageSquare } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Do you deliver products outside of Madhya Pradesh?",
    answer: "Yes, we ship our authentic Nimari snacks and organic spices across India. Standard delivery takes 3-5 business days, and we offer free shipping on orders above ₹499."
  },
  {
    question: "How can I query about corporate gifting or bulk ordering?",
    answer: "We offer customized gifting boxes and bulk pricing for weddings, festivals, and corporate events. Please fill out our contact form with details or write to us directly at hello@ramangreens-knw.in, and our gifting specialist will assist you within 24 hours."
  },
  {
    question: "Are Raman Greens snacks completely preservative-free?",
    answer: "Absolutely! We pride ourselves on preserving flavor through traditional sundrying, stone-grinding, and hygienic dehydration without adding artificial colors, chemical preservatives, or MSGs."
  },
  {
    question: "Where are Raman Greens products manufactured?",
    answer: "All our products are crafted, processed, and packed in our facility located in Khandwa, in the heart of the Nimar region of Madhya Pradesh, ensuring absolute authenticity."
  }
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!form.name.trim()) tempErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) tempErrors.subject = "Subject is required.";
    if (!form.message.trim()) {
      tempErrors.message = "Message cannot be empty.";
    } else if (form.message.trim().length < 10) {
      tempErrors.message = "Message should be at least 10 characters long.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    }, 1800);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-nimar-gradient">
      {/* Hero Section */}
      <section className="bg-emerald-brand text-white py-12 sm:py-16 md:py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-beige-soft font-semibold tracking-widest text-xs uppercase mb-3 block"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-5"
          >
            We'd Love to Hear From You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto opacity-90 leading-relaxed font-sans font-light"
          >
            Have questions about our authentic Nimari snacks, organic seeds, spices or custom gifting packages? Our team in Khandwa is here to help!
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Contact Information</h2>
              <p className="text-neutral-500 text-sm mb-6">
                Reach out to us directly or visit our production office.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                {
                  icon: MapPin,
                  title: "Our Address",
                  content: "Padava Rd, Khandwa, Madhya Pradesh 450001",
                  link: "https://maps.google.com/?q=Padava+Rd,+Khandwa,+Madhya+Pradesh+450001",
                  linkText: "Get directions on map"
                },
                {
                  icon: Phone,
                  title: "Call or WhatsApp Us",
                  content: "+91 98765 43210",
                  link: "tel:+919876543210",
                  linkText: "Call now"
                },
                {
                  icon: Mail,
                  title: "Email Support",
                  content: "hello@ramangreens-knw.in",
                  link: "mailto:hello@ramangreens-knw.in",
                  linkText: "Send email"
                },
                {
                  icon: Clock,
                  title: "Office Hours",
                  content: "Monday – Saturday: 9:00 AM – 7:00 PM",
                  subtext: "Sundays: Closed for farm visits"
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="bg-white p-6 rounded-2xl border border-beige-soft hover:shadow-md transition-shadow flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 text-sm">{item.title}</h3>
                      <p className="text-neutral-600 text-xs mt-1.5 leading-relaxed">{item.content}</p>
                      {item.subtext && <p className="text-neutral-400 text-[10px] mt-0.5">{item.subtext}</p>}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-emerald-brand hover:text-emerald-brand-dark transition-colors inline-block mt-2"
                        >
                          {item.linkText} →
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 lg:pt-[5.25rem] flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl border border-beige-soft p-6 md:p-8 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-between"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="flex flex-col h-full">
                        <label htmlFor="name" className="text-xs font-semibold text-neutral-600 mb-1.5 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="e.g., Priya Sharma"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={`w-full h-full bg-white p-6 rounded-2xl border text-sm outline-none transition-shadow duration-300 shadow-sm hover:shadow-md focus:shadow-md focus:ring-1 focus:ring-emerald-brand
                            ${errors.name ? "border-red-400 focus:border-red-400" : "border-beige-soft focus:border-emerald-brand"}`}
                        />
                        {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div className="flex flex-col h-full">
                        <label htmlFor="email" className="text-xs font-semibold text-neutral-600 mb-1.5 block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="e.g., priya@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={`w-full h-full bg-white p-6 rounded-2xl border text-sm outline-none transition-shadow duration-300 shadow-sm hover:shadow-md focus:shadow-md focus:ring-1 focus:ring-emerald-brand
                            ${errors.email ? "border-red-400 focus:border-red-400" : "border-beige-soft focus:border-emerald-brand"}`}
                        />
                        {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="text-xs font-semibold text-neutral-600 mb-1.5 block">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        placeholder="e.g., Bulk Gifting Enquiry"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={`w-full px-6 py-3.5 rounded-2xl border text-sm outline-none transition-shadow duration-300 shadow-sm hover:shadow-md focus:shadow-md focus:ring-1 focus:ring-emerald-brand
                          ${errors.subject ? "border-red-400 focus:border-red-400" : "border-beige-soft focus:border-emerald-brand"}`}
                      />
                      {errors.subject && <p className="text-red-500 text-[10px] mt-1">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="text-xs font-semibold text-neutral-600 mb-1.5 block">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        placeholder="How can we help you? Write your details here..."
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`w-full px-6 py-3.5 rounded-2xl border text-sm outline-none resize-none transition-shadow duration-300 shadow-sm hover:shadow-md focus:shadow-md focus:ring-1 focus:ring-emerald-brand
                          ${errors.message ? "border-red-400 focus:border-red-400" : "border-beige-soft focus:border-emerald-brand"}`}
                      />
                      {errors.message && <p className="text-red-500 text-[10px] mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 mb-4 bg-emerald-brand hover:bg-emerald-brand-dark disabled:bg-emerald-brand/70 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 bg-emerald-brand/10 text-emerald-brand rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={36} className="animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-800 mb-2">Thank You!</h3>
                    <p className="text-neutral-600 text-sm max-w-sm mx-auto mb-6">
                      Your message has been received successfully. Our team at Raman Greens will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl transition"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map & Location Section */}
      <section className="py-12 sm:py-16 md:py-20 border-t border-beige-soft">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center mx-auto mb-3">
              <MapPin size={20} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-800">Find Us on the Map</h2>
            <p className="text-neutral-500 text-sm mt-2">Visit our production office in the heart of Nimar, Khandwa.</p>
          </div>

          {/* Two-column: Map + Location Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl overflow-hidden border border-beige-soft shadow-sm hover:shadow-lg transition-shadow duration-300 min-h-[350px] lg:min-h-[420px]"
            >
              <iframe
                title="Raman Greens Location - Khandwa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.123456789!2d76.3523!3d21.8263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd89f6e0f000001%3A0x1234567890abcdef!2sPadava%20Rd%2C%20Khandwa%2C%20Madhya%20Pradesh%20450001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* Location Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl border border-beige-soft p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-neutral-800 mb-1">Our Location</h3>
                <p className="text-neutral-500 text-xs mb-6">Come visit us — we'd love to show you around!</p>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center shrink-0 group-hover:bg-emerald-brand group-hover:text-white transition-colors duration-300">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">Address</h4>
                      <p className="text-neutral-600 text-xs mt-1 leading-relaxed">Padava Rd, Khandwa,<br />Madhya Pradesh 450001, India</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center shrink-0 group-hover:bg-emerald-brand group-hover:text-white transition-colors duration-300">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">Phone</h4>
                      <p className="text-neutral-600 text-xs mt-1">+91 98765 43210</p>
                      <a href="tel:+919876543210" className="text-[11px] font-semibold text-emerald-brand hover:text-emerald-brand-dark transition-colors inline-block mt-1">
                        Call now →
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center shrink-0 group-hover:bg-emerald-brand group-hover:text-white transition-colors duration-300">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">Email</h4>
                      <p className="text-neutral-600 text-xs mt-1">hello@ramangreens-knw.in</p>
                      <a href="mailto:hello@ramangreens-knw.in" className="text-[11px] font-semibold text-emerald-brand hover:text-emerald-brand-dark transition-colors inline-block mt-1">
                        Send email →
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center shrink-0 group-hover:bg-emerald-brand group-hover:text-white transition-colors duration-300">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">Working Hours</h4>
                      <p className="text-neutral-600 text-xs mt-1 leading-relaxed">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                      <p className="text-neutral-400 text-[10px] mt-0.5">Sundays: Closed for farm visits</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <a
                href="https://maps.google.com/?q=Padava+Rd,+Khandwa,+Madhya+Pradesh+450001"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3 bg-emerald-brand hover:bg-emerald-brand-dark text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm flex items-center justify-center gap-2 active:scale-98"
              >
                <MapPin size={15} />
                <span>Get Directions</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-beige-warm/60 py-12 sm:py-16 md:py-20 border-t border-beige-soft">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center mx-auto mb-3">
              <MessageSquare size={20} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-800">Frequently Asked Questions</h2>
            <p className="text-neutral-500 text-sm mt-2">Find quick answers to common queries about our service.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-beige-soft overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-neutral-800 text-sm md:text-base hover:bg-neutral-50/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-neutral-400 shrink-0 ml-4"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-beige-soft/60 text-xs md:text-sm text-neutral-600 leading-relaxed bg-neutral-50/30">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
