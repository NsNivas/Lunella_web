import { useState } from 'react';
import { Mail, Phone, Instagram, Facebook, MapPin, ChevronDown, MessageCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ScrollReveal from '@/components/ScrollReveal';
import { useStore } from '@/store/StoreContext';

const faqs = [
  { q: 'How long does delivery take?', a: 'Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available in select cities.' },
  { q: 'What is your return policy?', a: 'We offer easy 7-day returns on all products. Items must be unused with original packaging. Refunds are processed within 5-7 business days.' },
  { q: 'How do I track my order?', a: 'Once your order is shipped, you will receive a tracking link via email and SMS. You can also track it from the Order Tracking page.' },
  { q: 'Are all products authentic?', a: 'Yes, 100%. We source all our products directly from brands or authorized distributors. Every product goes through quality checks.' },
  { q: 'Do you ship across India?', a: 'Yes, we ship to all serviceable pin codes across India. Free shipping is available on orders above ₹999.' },
  { q: 'How do I use a coupon code?', a: 'Add products to your cart, go to the cart page, enter your coupon code in the "Order Summary" section, and click Apply.' },
];

export default function Contact() {
  const { showToast } = useStore();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Message sent! We will get back to you within 24 hours.', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'support@lunelle.in', href: 'mailto:support@lunelle.in' },
    { icon: Phone, label: 'Phone', value: '1800-123-4567', href: 'tel:18001234567' },
    { icon: Instagram, label: 'Instagram', value: '@lunelle.in', href: '#' },
    { icon: MapPin, label: 'Address', value: '14 MG Road, Bengaluru, KA 560001', href: '#' },
  ];

  return (
    <div className="bg-ivory min-h-screen pb-16">
      <div className="bg-blush py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />
          <h1 className="font-display text-4xl font-bold text-plum mt-3">Get in Touch</h1>
          <p className="text-deep-mauve mt-2 text-lg">We are here to help. Reach out anytime.</p>
        </div>
      </div>

      {/* Contact cards */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactInfo.map((info, i) => (
            <ScrollReveal key={info.label} delay={i * 80}>
              <a href={info.href} className="block bg-white rounded-2xl p-6 card-shadow hover:card-shadow-lg transition-all text-center">
                <div className="w-12 h-12 rounded-xl bg-blush flex items-center justify-center mx-auto mb-3">
                  <info.icon size={22} className="text-plum" />
                </div>
                <p className="text-xs uppercase tracking-wide text-deep-mauve font-semibold mb-1">{info.label}</p>
                <p className="text-sm font-semibold text-charcoal">{info.value}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-6 lg:p-8 card-shadow">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle size={22} className="text-plum" />
                <h2 className="font-display text-2xl font-bold text-plum">Send Us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-charcoal block mb-1.5">Your Name</label>
                  <input type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                    placeholder="Enter your name" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-charcoal block mb-1.5">Email</label>
                  <input type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                    placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-charcoal block mb-1.5">Subject</label>
                  <input type="text" required value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                    placeholder="What is this about?" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-charcoal block mb-1.5">Message</label>
                  <textarea required rows={5} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none resize-none"
                    placeholder="Tell us how we can help..." />
                </div>
                <button type="submit" className="btn-primary rounded-lg w-full">Send Message</button>
              </form>
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal delay={150}>
            <div className="bg-white rounded-2xl p-6 lg:p-8 card-shadow">
              <h2 className="font-display text-2xl font-bold text-plum mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-blush last:border-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between py-3 text-left"
                    >
                      <span className="font-semibold text-charcoal text-sm">{faq.q}</span>
                      <ChevronDown size={18} className={`text-plum transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                      <p className="text-sm text-deep-mauve pb-3 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
