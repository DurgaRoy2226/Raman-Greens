import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Mail, MapPin, Phone, Leaf } from "lucide-react";

const SocialIcon = ({ d }: { d: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
);
const SOCIALS = [
  // instagram-ish
  "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.18A4.66 4.66 0 1 0 12 16.66 4.66 4.66 0 0 0 12 7.34Zm0 7.7a3.04 3.04 0 1 1 0-6.08 3.04 3.04 0 0 1 0 6.08Zm5.93-7.88a1.09 1.09 0 1 1-2.18 0 1.09 1.09 0 0 1 2.18 0Z",
  // facebook
  "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  // twitter/x
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.16 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z",
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="bg-white inline-block p-2 rounded-xl mb-4">
            <Logo />
          </div>
          <p className="text-sm leading-relaxed text-neutral-400">
            Born in the soil of Nimar, Khandwa. Raman Greens KNW brings you fresh, organic and authentic Nimari
            flavours — handcrafted with love.
          </p>
          <div className="flex gap-3 mt-5">
            {SOCIALS.map((d, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-emerald-brand transition flex items-center justify-center"
              >
                <SocialIcon d={d} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-emerald-brand-light" to="/shop?cat=Snacks">Snacks</Link></li>
            <li><Link className="hover:text-emerald-brand-light" to="/shop?cat=Organics">Organics</Link></li>
            <li><Link className="hover:text-emerald-brand-light" to="/shop?cat=Sweets">Sweets</Link></li>
            <li><Link className="hover:text-emerald-brand-light" to="/shop?cat=Spices">Spices</Link></li>
            <li><Link className="hover:text-emerald-brand-light" to="/shop?cat=Gifting">Gifting</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-emerald-brand-light" to="/dashboard">My Account</Link></li>
            <li><Link className="hover:text-emerald-brand-light" to="/cart">Cart</Link></li>
            <li><Link className="hover:text-emerald-brand-light" to="/admin">Admin</Link></li>
            <li><a className="hover:text-emerald-brand-light" href="#">About Nimar</a></li>
            <li><a className="hover:text-emerald-brand-light" href="#">Sustainability</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex gap-2"><MapPin size={16} className="shrink-0 mt-0.5 text-emerald-brand-light" /> Padava Rd, Khandwa, MP 450001</li>
            <li className="flex gap-2"><Phone size={16} className="shrink-0 mt-0.5 text-emerald-brand-light" /> +91 98765 43210</li>
            <li className="flex gap-2"><Mail size={16} className="shrink-0 mt-0.5 text-emerald-brand-light" /> hello@ramangreens-knw.in</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© 2026 Raman Greens KNW · The Heart of Nimar, Delivered Fresh.</p>
          <p className="flex items-center gap-1.5"><Leaf size={12} className="text-emerald-brand-light" /> Crafted in Khandwa, Madhya Pradesh</p>
        </div>
      </div>
    </footer>
  );
}
