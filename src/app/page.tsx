"use client";

import Image from "next/image";
import Spline from "@splinetool/react-spline/next";
import ScrollBackground from "@/components/ScrollBackground";
import Logo from "@/components/Logo";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    title: "V4 Services — Marketing",
    desc: "Digital marketing, SEO, social media management, paid ad campaigns, content strategy, and brand building to grow your online presence and drive revenue.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: "V4Stay — SaaS",
    desc: "A powerful SaaS management platform with three products: hotel automation, restaurant QR ordering, and PG management. Currently serving 7+ hotels and 10+ restaurants.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    title: "V4 Automations",
    desc: "Business process automation, workflow optimization, and intelligent automation solutions to streamline operations and reduce manual effort.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
];

const highlights = [
  { stat: "7+", label: "Hotels on V4Stay" },
  { stat: "10+", label: "Restaurants Live" },
  { stat: "3", label: "Product Lines" },
  { stat: "99.9%", label: "Uptime" },
];

const products = [
  {
    brand: "V4Stay",
    subtitle: "Hotel Automation",
    title: "V4Stay — Hotel Automation",
    url: "https://hotel.v4stay.com",
    tag: "Live",
    desc: "Register your hotel, manage rooms & occupancy, add your menu, and get a live dashboard with auto-generated QR cards for your guests. Go digital in under 15 minutes.",
    features: [
      "QR-based service ordering per room",
      "One-click room service & 5-star concierge",
      "Live manager dashboard with audio alerts",
      "Auto-generated QR portal per room",
    ],
  },
  {
    brand: "Taste",
    subtitle: "Restaurant QR Ordering",
    title: "Taste by V4Stay — Restaurant QR",
    url: "https://taste.v4stay.com",
    tag: "Live",
    desc: "Let guests scan a QR code and place orders from their phones. Upload your menu and manage tables in our portal. The system auto-generates QR codes per table.",
    features: [
      "Digital menu & table management",
      "Auto-generated QR codes per table",
      "Order from customer's own phone",
      "Weekly, monthly & yearly analytics",
    ],
  },
  {
    brand: "PGmate",
    subtitle: "PG & Property Management",
    title: "PGmate — PG & Property Management",
    url: "https://pg.v4stay.com",
    tag: "Live",
    desc: "Scale your PG business with automated rent tracking, digital receipts, a premium tenant portal, and complaint management. Ditch spreadsheets for a unified dashboard.",
    features: [
      "Multi-property management",
      "Tenant portal with magic link access",
      "Automated rent tracking & receipts",
      "Complaints, notices & analytics",
    ],
  },
];

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 3D Hero Animation
    gsap.fromTo(
      ".hero-content",
      { opacity: 0, y: 100, rotationX: -30, transformPerspective: 1000 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.5, ease: "power3.out" }
    );

    // 3D Services Fade In
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 50, rotationY: 20, transformPerspective: 1000 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#services",
          start: "top 75%",
        },
      }
    );

    // 3D Products Reveal
    gsap.fromTo(
      ".product-card",
      { opacity: 0, scale: 0.8, rotationX: 15, transformPerspective: 1000 },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#products",
          start: "top 75%",
        },
      }
    );
  }, { scope: container });

  return (
    <div ref={container}>
      <ScrollBackground />

      {/* Hero */}
      <section id="home" data-speed="0.8" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="bg-layer absolute inset-0 bg-gradient-to-br from-night-950 via-night-900 to-night-950" />
        <div className="bg-orb absolute -top-40 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="bg-orb absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 opacity-60">
          <Spline scene="https://prod.spline.design/hJKT5MWWSUrznfmM/scene.splinecode" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10 hero-content">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-sky-500/20">
              <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
              Trusted by hotels & restaurants nationwide
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 font-heading gradient-text">
              SaaS Management Platform for Hospitality & More.
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              V4 Virtual Services delivers powerful SaaS platforms — from{" "}
              <span className="font-semibold text-sky-400">hotel automation</span> and{" "}
              <span className="font-semibold text-sky-400">restaurant QR ordering</span> to{" "}
              <span className="font-semibold text-sky-400">PG property management</span>.
              Also offering marketing and automation services.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#services" className="bg-sky-500 text-night-950 font-semibold px-8 py-3 rounded-full hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/25 animate-glow">
                Explore Services
              </a>
              <a href="#products" className="border border-night-600 text-gray-300 font-semibold px-8 py-3 rounded-full hover:border-sky-500 hover:text-sky-400 transition-colors">
                View Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights bar */}
      <section className="border-y border-night-700/50 bg-night-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((h) => (
              <div key={h.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-400 to-amber-400 bg-clip-text text-transparent">
                  {h.stat}
                </div>
                <div className="text-sm text-gray-500 mt-1">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" data-speed="0.9" className="py-20 md:py-28 relative overflow-hidden">
        <div className="bg-layer absolute inset-0 bg-gradient-to-b from-night-950 via-night-900/50 to-night-950" />
        <div className="bg-orb absolute top-20 -right-32 w-72 h-72 bg-sky-400/5 rounded-full blur-3xl" />
        <div className="bg-orb absolute -bottom-20 left-1/3 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-sky-400 font-semibold text-sm tracking-widest uppercase mb-3">Three Branches</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading gradient-text">V4 Virtual Services</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              One platform company with three specialized branches serving diverse business needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="service-card group bg-night-800/50 border border-night-700/50 rounded-2xl p-8 hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300 backdrop-blur-sm hover:-translate-y-2">
                <div className="w-12 h-12 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center mb-5 group-hover:bg-sky-500 group-hover:text-night-950 transition-all duration-300 ring-1 ring-sky-500/20 group-hover:ring-sky-500/50">
                  {s.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 font-heading gradient-text">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" data-speed="0.9" className="py-20 md:py-28 relative overflow-hidden">
        <div className="bg-layer absolute inset-0 bg-night-800/30" />
        <div className="bg-orb absolute top-40 -left-32 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="bg-orb absolute -bottom-20 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-sky-400 font-semibold text-sm tracking-widest uppercase mb-3">Powered by V4Stay</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading gradient-text">Our SaaS Products</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Smart QR-based platforms for hotels, restaurants, and PG management — all under one SaaS.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p, i) => {
              const themes = [
                {
                  // hotel.v4stay.com — Purple/Violet
                  glow: "bg-violet-500/20",
                  ring: "ring-violet-500/40",
                  shadow: "shadow-violet-500/20",
                  title: "text-violet-300",
                  badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
                  dot: "bg-violet-400",
                  icon: "text-violet-400",
                  btn: "bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 shadow-violet-500/30",
                  border: "hover:border-violet-500/40",
                  visitLabel: "Visit hotel.v4stay.com →",
                },
                {
                  // taste.v4stay.com — Orange/Warm
                  glow: "bg-orange-500/20",
                  ring: "ring-orange-500/40",
                  shadow: "shadow-orange-500/20",
                  title: "text-orange-300",
                  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                  dot: "bg-orange-400",
                  icon: "text-orange-400",
                  btn: "bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-400 hover:to-amber-300 shadow-orange-500/30",
                  border: "hover:border-orange-500/40",
                  visitLabel: "Visit taste.v4stay.com →",
                },
                {
                  // pg.v4stay.com — Teal/Emerald (#00c49f)
                  glow: "bg-emerald-400/20",
                  ring: "ring-emerald-400/40",
                  shadow: "shadow-emerald-400/20",
                  title: "text-emerald-300",
                  badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                  dot: "bg-emerald-400",
                  icon: "text-emerald-400",
                  btn: "bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 shadow-emerald-500/30",
                  border: "hover:border-emerald-400/40",
                  visitLabel: "Visit pg.v4stay.com →",
                },
              ][i];
              return (
                <div key={p.title} className={`product-card bg-night-800/50 rounded-2xl border border-night-700/50 overflow-hidden shadow-lg backdrop-blur-sm flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${themes.border}`}>
                  <div className="bg-gradient-to-br from-night-700/50 to-night-600/30 p-8 flex items-center justify-center min-h-[200px] border-b border-night-700/50">
                    <div className="text-center">
                      <div className="relative inline-block mb-3">
                        <div className={`absolute inset-0 ${themes.glow} blur-2xl rounded-full animate-pulse-glow`} />
                        <div className={`relative ring-2 ${themes.ring} shadow-lg ${themes.shadow} rounded-2xl p-2 bg-night-900`}>
                          <Logo size={48} />
                        </div>
                      </div>
                      <p className={`${themes.title} text-2xl font-bold tracking-tight`}>{p.brand}</p>
                      <p className="text-gray-400 text-xs font-medium mt-1">{p.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className={`inline-flex items-center gap-2 ${themes.badge} text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit`}>
                      <span className={`w-1.5 h-1.5 ${themes.dot} rounded-full animate-pulse`} />
                      {p.tag}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {p.features.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                          <svg className={`w-4 h-4 ${themes.icon} shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${themes.btn} text-white font-semibold px-5 py-2.5 rounded-full transition-all text-sm text-center shadow-lg`}
                    >
                      {themes.visitLabel}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-speed="0.85" className="py-20 md:py-28 relative overflow-hidden">
        <div className="bg-layer absolute inset-0 bg-gradient-to-br from-sky-600/20 via-night-900 to-night-950" />
        <div className="bg-orb absolute top-1/2 -translate-y-1/2 -left-40 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="bg-orb absolute top-1/3 -right-32 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.1)_0%,_transparent_70%)]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Ready to Digitize Your Business?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
            Whether you need hotel automation, restaurant QR ordering, or PG management — let&apos;s talk.
          </p>
          <a
            href="mailto:v4services.in@gmail.com"
            className="inline-block bg-sky-500 text-night-950 font-semibold px-10 py-3.5 rounded-full hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/25 animate-glow"
          >
            Start a Conversation
          </a>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="border-t border-night-700/50 bg-night-950 text-gray-500 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="mb-4">
                <Logo size={40} />
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                V4 Virtual Services — a SaaS management platform company with three branches: Marketing (V4 Services), SaaS (V4Stay), and Automations (V4 Automations). Based in Ahmedabad.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sky-400 mb-4 text-sm uppercase tracking-wider">Branches</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-gray-300 transition-colors cursor-default">V4 Services — Marketing</li>
                <li className="hover:text-gray-300 transition-colors cursor-default">V4Stay — SaaS</li>
                <li className="hover:text-gray-300 transition-colors cursor-default">V4 Automations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sky-400 mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:v4services.in@gmail.com" className="text-gray-500 hover:text-sky-400 transition-colors">
                    v4services.in@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/919714056759" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-400 transition-colors">
                    WhatsApp: +91 97140 56759
                  </a>
                </li>
                <li className="text-gray-500">Ahmedabad, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-night-700/50 pt-8 text-sm text-center text-gray-600">
            &copy; {new Date().getFullYear()} V4 Virtual Services. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
