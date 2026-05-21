import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Mail, MapPin, Phone, Leaf } from "lucide-react";

const SOCIALS = [
  { label: "Instagram", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.18A4.66 4.66 0 1 0 12 16.66 4.66 4.66 0 0 0 12 7.34Zm0 7.7a3.04 3.04 0 1 1 0-6.08 3.04 3.04 0 0 1 0 6.08Zm5.93-7.88a1.09 1.09 0 1 1-2.18 0 1.09 1.09 0 0 1 2.18 0Z" },
  { label: "Facebook",  path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" },
  { label: "X / Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.16 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 mt-24">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo height="h-14 md:h-16" />
            <p className="mt-5 text-sm leading-relaxed text-neutral-500 max-w-[260px]">
              Born in the soil of Nimar, Khandwa. Fresh, organic and authentic
              Nimari flavours — handcrafted with love.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5 mt-6">
              {SOCIALS.map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400
                    hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 transition-all duration-200"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Snacks",   to: "/shop?cat=Snacks"   },
                { label: "Organics", to: "/shop?cat=Organics" },
                { label: "Sweets",   to: "/shop?cat=Sweets"   },
                { label: "Spices",   to: "/shop?cat=Spices"   },
                { label: "Gifting",  to: "/shop?cat=Gifting"  },
              ].map(l => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-neutral-500 hover:text-emerald-600 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "My Account",    to: "/dashboard"   },
                { label: "Cart",          to: "/cart"        },
                { label: "About Nimar",   to: "/about"       },
                { label: "Sustainability",to: "#"            },
                { label: "Admin Panel",   to: "/admin"       },
              ].map(l => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-neutral-500 hover:text-emerald-600 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest mb-5">
              Reach Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-neutral-500 leading-snug">
                  Padava Rd, Khandwa,<br />Madhya Pradesh 450001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-emerald-500 shrink-0" />
                <span className="text-sm text-neutral-500">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-emerald-500 shrink-0" />
                <span className="text-sm text-neutral-500">hello@ramangreens-knw.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-400">
            © 2026 Raman Greens KNW · The Heart of Nimar, Delivered Fresh.
          </p>
          <p className="text-xs text-neutral-400 flex items-center gap-1.5">
            <Leaf size={11} className="text-emerald-500" />
            Crafted with ♥ in Khandwa, Madhya Pradesh
          </p>
        </div>
      </div>

    </footer>
  );
}
