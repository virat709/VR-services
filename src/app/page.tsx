"use client";

import Image from "next/image";
import Link from "next/link";
import Spline from "@splinetool/react-spline/next";
import ScrollBackground from "@/components/ScrollBackground";
import Logo from "@/components/Logo";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    title: "V4 Services — Marketing",
    desc: "Digital marketing, SEO, social media management, paid ad campaigns, content strategy, and brand building to grow your online presence and drive revenue.",
    image: "/images/service_marketing.png",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: "V4Stay — SaaS",
    desc: "A powerful SaaS management platform with three products: hotel automation, restaurant QR ordering, and PG management. Currently serving 7+ hotels and 10+ restaurants.",
    image: "/images/service_saas.png",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    title: "V4 Automations",
    desc: "Business process automation, workflow optimization, and intelligent automation solutions to streamline operations and reduce manual effort.",
    image: "/images/service_automation.png",
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
    image: "/images/product_hotel.png",
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
    image: "/images/product_restaurant.png",
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
    image: "/images/product_pg.png",
    features: [
      "Multi-property management",
      "Tenant portal with magic link access",
      "Automated rent tracking & receipts",
      "Complaints, notices & analytics",
    ],
  },
];

const faqs = [
  {
    q: "Do you offer all three services together?",
    a: "Absolutely. Many of our clients use our SaaS products and also hire us for marketing and custom automations to scale their business.",
  },
  {
    q: "How long does a typical automation project take?",
    a: "It depends on the complexity, but most standard integrations and workflows are deployed within 2 to 4 weeks.",
  },
  {
    q: "Are there long-term contracts for marketing?",
    a: "We offer flexible month-to-month retainers as well as discounted quarterly and annual contracts.",
  },
  {
    q: "Can I upgrade my SaaS plan later?",
    a: "Yes, our SaaS platforms scale with your business. You can add more rooms, tables, or properties at any time.",
  },
];

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  // SaaS Simulator States
  const [simTab, setSimTab] = useState<"hotel" | "restaurant" | "pg">("restaurant");
  
  // Custom Web Audio API synthesizer for premium chime alerts
  const triggerAudioAlert = (freq = 600) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
      console.log(e);
    }
  };

  // Hotel Mode States
  const [hotelRequest, setHotelRequest] = useState<"none" | "pending" | "resolved">("none");
  const [hotelLogs, setHotelLogs] = useState([
    { room: "302", task: "Extra pillows", status: "Resolved", time: "18:22" },
    { room: "105", task: "Iron request", status: "Resolved", time: "18:15" },
  ]);

  // Restaurant Mode States
  const [restaurantMenu, setRestaurantMenu] = useState([
    { id: "item-1", name: "Chef's Special Pizza", price: 349, qty: 1 },
    { id: "item-2", name: "Cold Lemon Iced Tea", price: 119, qty: 1 },
    { id: "item-3", name: "Classic Gourmet Pasta", price: 299, qty: 0 }
  ]);
  const [orders, setOrders] = useState([
    { id: "TX-94", table: "T-5", items: "Classic Gourmet Pasta x1", total: 299, status: "Served", time: "18:31" },
  ]);
  const [guestOrderStatus, setGuestOrderStatus] = useState<"idle" | "sending" | "sent" | "served">("idle");

  // PGmate States
  const [pgPaid, setPgPaid] = useState(false);
  const [pgRevenue, setPgRevenue] = useState(72000);
  const [pgLogs, setPgLogs] = useState([
    { date: "11 July", tenant: "Aman (Rm 201)", amount: 8000, status: "Paid" },
    { date: "10 July", tenant: "Dev (Rm 104)", amount: 8000, status: "Paid" },
  ]);

  // Actions
  const handleHotelRequest = (type: string) => {
    triggerAudioAlert(580);
    setHotelRequest("pending");
    setHotelLogs(prev => [
      { room: "304", task: `Request: ${type}`, status: "Pending", time: "18:45" },
      ...prev
    ]);
  };

  const resolveHotelRequest = () => {
    triggerAudioAlert(880);
    setHotelRequest("resolved");
    setHotelLogs(prev => 
      prev.map(l => l.room === "304" ? { ...l, status: "Resolved" } : l)
    );
  };

  const updateMenuQty = (id: string, delta: number) => {
    setRestaurantMenu(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
      )
    );
  };

  const handlePlaceOrder = () => {
    const activeItems = restaurantMenu.filter(i => i.qty > 0);
    if (activeItems.length === 0) return;
    
    setGuestOrderStatus("sending");
    triggerAudioAlert(440);
    
    setTimeout(() => {
      triggerAudioAlert(880);
      setGuestOrderStatus("sent");
      const orderTotal = activeItems.reduce((acc, i) => acc + i.price * i.qty, 0);
      const itemsString = activeItems.map(i => `${i.name} x${i.qty}`).join(", ");
      
      setOrders(prev => [
        { id: `TX-${Math.floor(100 + Math.random() * 900)}`, table: "T-4", items: itemsString, total: orderTotal, status: "Kitchen (Preparing)", time: "18:45" },
        ...prev
      ]);
      
      // Clear quantities
      setRestaurantMenu(prev => prev.map(i => ({ ...i, qty: 0 })));
    }, 1200);
  };

  const handleServeOrder = (id: string) => {
    triggerAudioAlert(920);
    setOrders(prev =>
      prev.map(o => o.id === id ? { ...o, status: "Served" } : o)
    );
    setGuestOrderStatus("served");
  };

  const handlePayRent = () => {
    if (pgPaid) return;
    triggerAudioAlert(600);
    setTimeout(() => {
      triggerAudioAlert(980);
      setPgPaid(true);
      setPgRevenue(prev => prev + 8000);
      setPgLogs(prev => [
        { date: "Today", tenant: "Rohit (Rm 102)", amount: 8000, status: "Paid" },
        ...prev
      ]);
    }, 1000);
  };

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10 hero-content w-full">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-sky-500/20 animate-glow">
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
                Trusted by hotels & restaurants nationwide
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 font-heading gradient-text">
                One SaaS Platform for Hotels, Restaurants &amp; PGs — Plus Marketing &amp; Automation.
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed">
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
                <a href="#simulator" className="border border-night-600 text-gray-300 font-semibold px-8 py-3 rounded-full hover:border-sky-500 hover:text-sky-400 transition-colors">
                  Try Interactive Demo
                </a>
              </div>
            </div>
            <div className="md:col-span-5 relative w-full h-[320px] sm:h-[420px] md:h-[460px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-amber-500/20 blur-3xl rounded-3xl opacity-30" />
              
              {/* Main Laptop & Phone Mockup Card */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-night-700/50 shadow-2xl backdrop-blur-md animate-float">
                <Image
                  src="/images/hero_mockup.png"
                  alt="V4 SaaS Hospitality Platform Dashboard and Mobile QR Ordering Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Floating Widget 1: Live occupancy stats (Top-Left) */}
              <div className="absolute -top-6 -left-6 z-20 glass-panel px-4 py-3 rounded-2xl border border-sky-500/20 animate-float-delay-1 flex items-center gap-3 shadow-lg shadow-sky-500/5">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase leading-none">V4Stay Hotel</p>
                  <p className="text-xs text-white font-bold mt-1">Occupancy: 96%</p>
                </div>
              </div>

              {/* Floating Widget 2: Restaurant Order Alert (Bottom-Right) */}
              <div className="absolute -bottom-4 -right-4 z-20 glass-panel px-4 py-3 border border-amber-500/20 rounded-2xl animate-float-delay-2 flex items-center gap-3 shadow-lg shadow-amber-500/5">
                <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase leading-none">Taste QR ordering</p>
                  <p className="text-xs text-white font-bold mt-1">Table 8: +₹1,480</p>
                </div>
              </div>

              {/* Floating Widget 3: Automated Actions (Bottom-Left) */}
              <div className="absolute bottom-12 -left-12 z-20 glass-panel px-4 py-3 border border-purple-500/20 rounded-2xl animate-float-delay-3 flex items-center gap-3 shadow-lg shadow-purple-500/5">
                <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase leading-none">Automations</p>
                  <p className="text-xs text-white font-bold mt-1">1,482 tasks run</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer — direct answer + definition + audience for AEO/GEO extraction */}
      <section aria-label="Quick answer" className="border-b border-night-700/50 bg-night-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="glass-panel rounded-2xl p-6 md:p-8 border border-sky-500/10">
            <p className="text-sky-400 font-semibold text-sm tracking-widest uppercase mb-3">Quick Answer</p>
            <p className="text-gray-300 leading-relaxed text-lg">
              <strong className="text-white">V4 Virtual Services</strong> is a SaaS management platform for
              hotels, restaurants, and paying-guest (PG) properties. In plain terms, it is cloud software that
              runs your service operations — guest orders, room requests, rent collection, and staff dashboards —
              from one place, with no hardware to install. It also offers{" "}
              <Link href="/#services" className="text-sky-400 hover:text-sky-300 font-semibold">marketing services</Link>{" "}
              and{" "}
              <Link href="/#pricing" className="text-sky-400 hover:text-sky-300 font-semibold">custom automation</Link>{" "}
              for businesses that want to grow faster.
            </p>
            <p className="text-gray-400 mt-4 leading-relaxed">
              <strong className="text-white">Who it&apos;s for:</strong> hotel owners, restaurant and café operators,
              PG/co-living managers, and growing businesses in India that want to replace manual front-desk work
              and spreadsheets. Most properties go from signup to a live QR portal in under 15 minutes.
            </p>
            <p className="text-gray-500 mt-4 text-sm">
              Last updated: <time dateTime="2026-10-29">October 2026</time> · Based in Ahmedabad, serving customers across India · Try the{" "}
              <Link href="/#simulator" className="text-sky-400 hover:text-sky-300">live platform demo below</Link>
            </p>
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
              One platform company with three specialized branches, built for hotel owners, restaurant
              operators, PG managers, and businesses that need digital marketing or workflow automation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="service-card group glass-panel gradient-border-glow glass-card-hover rounded-2xl overflow-hidden flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-900 to-transparent opacity-80" />
                </div>
                <div className="p-8 pt-6 flex-1 flex flex-col relative">
                  {/* Floating Icon */}
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-night-900 text-sky-400 rounded-xl flex items-center justify-center group-hover:bg-sky-500 group-hover:text-night-950 transition-all duration-300 ring-1 ring-sky-500/20 group-hover:ring-sky-500/50 shadow-lg">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 mt-4 font-heading gradient-text">{s.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm flex-1">{s.desc}</p>
                </div>
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
                <div key={p.title} className={`product-card glass-panel gradient-border-glow glass-card-hover rounded-2xl overflow-hidden flex flex-col group`}>
                  <div className="relative h-56 w-full overflow-hidden border-b border-night-700/50 flex items-end p-6">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-900/40 to-transparent opacity-90" />
                    
                    {/* Glassmorphic Brand Badge */}
                    <div className="relative z-10 flex items-center gap-3 bg-night-950/70 backdrop-blur-md px-4 py-2 rounded-xl border border-night-700/50">
                      <div className="relative shrink-0">
                        <div className={`absolute inset-0 ${themes.glow} blur-md rounded-full`} />
                        <div className="relative rounded-lg p-1 bg-night-900 border border-night-700/30">
                          <Logo size={24} />
                        </div>
                      </div>
                      <div>
                        <p className={`${themes.title} text-lg font-bold tracking-tight leading-tight`}>{p.brand}</p>
                        <p className="text-gray-400 text-[10px] font-medium leading-none mt-0.5">{p.subtitle}</p>
                      </div>
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
                      className={`${themes.btn} text-white font-semibold px-5 py-2.5 rounded-full transition-all text-sm text-center shadow-lg cursor-pointer`}
                    >
                      {themes.visitLabel}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          {/* In practice — original experience signal */}
          <div className="mt-12 glass-panel rounded-2xl p-6 md:p-8 border border-emerald-500/10">
            <p className="text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">In Practice</p>
            <p className="text-gray-300 leading-relaxed">
              Today, <strong className="text-white">7+ hotels and 10+ restaurants run live on V4Stay</strong>.
              A new property goes from signup to a working QR portal — with menus loaded and dashboards
              syncing — in under 15 minutes, with no installation visit or hardware purchase. Managers get
              audio alerts on new orders and room requests, and owners can check occupancy and revenue from
              their phone. You can try the exact manager and guest flows in the{" "}
              <Link href="/#simulator" className="text-sky-400 hover:text-sky-300 font-semibold">interactive demo below</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* SaaS Live Simulator Section */}
      <section id="simulator" className="py-20 md:py-28 relative overflow-hidden border-t border-night-700/50 bg-night-950/20">
        <div className="bg-layer absolute inset-0 bg-gradient-to-b from-night-950 via-night-900/30 to-night-950" />
        <div className="bg-orb absolute top-40 left-1/3 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="text-sky-400 font-semibold text-sm tracking-widest uppercase mb-3">Live Experience</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading gradient-text">Interactive Platform Playground</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Simulate how our Guest Portal and Manager Dashboard communicate in real-time. Choose a product and interact with the phone mockup to watch the dashboard sync live!
            </p>
          </div>

          {/* Simulator Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => { setSimTab("hotel"); triggerAudioAlert(520); }}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all border text-sm flex items-center gap-2 cursor-pointer ${
                simTab === "hotel"
                  ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/25"
                  : "border-night-700/50 bg-night-800/40 text-gray-400 hover:text-gray-200 hover:border-night-600"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              V4Stay Hotel Automation
            </button>
            <button
              onClick={() => { setSimTab("restaurant"); triggerAudioAlert(600); }}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all border text-sm flex items-center gap-2 cursor-pointer ${
                simTab === "restaurant"
                  ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/25"
                  : "border-night-700/50 bg-night-800/40 text-gray-400 hover:text-gray-200 hover:border-night-600"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Taste Restaurant QR Menu
            </button>
            <button
              onClick={() => { setSimTab("pg"); triggerAudioAlert(680); }}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all border text-sm flex items-center gap-2 cursor-pointer ${
                simTab === "pg"
                  ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/25"
                  : "border-night-700/50 bg-night-800/40 text-gray-400 hover:text-gray-200 hover:border-night-600"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              PGmate Tenant Portal
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Screen: Manager Portal (Desktop Mockup) - occupies 7 cols */}
            <div className="lg:col-span-7 flex flex-col glass-panel gradient-border-glow rounded-3xl overflow-hidden shadow-2xl relative min-h-[520px]">
              {/* Laptop Screen Top Header / Window controls */}
              <div className="bg-night-950/60 border-b border-night-700/50 px-6 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="bg-night-900/60 text-[10px] text-gray-500 px-4 py-1 rounded-md border border-night-700/30 font-mono select-none">
                  {simTab === "restaurant" ? "taste.v4stay.com/dashboard" : simTab === "hotel" ? "hotel.v4stay.com/dashboard" : "pg.v4stay.com/dashboard"}
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping shrink-0" />
                  LIVE
                </div>
              </div>

              {/* Main Laptop Body (Sidebar + Content Panel) */}
              <div className="flex-1 flex overflow-hidden">
                {/* Simulated Sidebar */}
                <div className="w-48 bg-night-950/80 border-r border-night-700/50 p-4 hidden sm:flex flex-col justify-between shrink-0 select-none">
                  {simTab === "pg" ? (
                    // PGmate Sidebar
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">ACTIVE PROPERTY</div>
                        <div className="flex items-center justify-between border border-night-700/50 bg-night-900/60 px-3 py-1.5 rounded-lg text-[10px] text-white mt-1">
                          <span className="font-semibold text-gray-200">Srinivas PG</span>
                          <span className="text-gray-500 text-[8px]">▼</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-b border-night-700/50 pb-3">
                        <div className="flex items-center gap-1.5">
                          <Logo size={18} />
                          <span className="text-white font-black text-xs">PGmate</span>
                        </div>
                        <div className="flex gap-2 text-[10px] text-gray-400">
                          <span className="cursor-pointer hover:text-white">☀️</span>
                          <span className="cursor-pointer hover:text-white">🔔</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-night-700/60 text-sky-400 flex items-center gap-2 cursor-pointer">
                          Overview
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2 cursor-pointer">
                          Rooms & Beds
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2 cursor-pointer">
                          Tenants
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2 cursor-pointer">
                          Payments
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2 cursor-pointer">
                          Complaints
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2 cursor-pointer">
                          Notice Board
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2 cursor-pointer">
                          Menu
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2 cursor-pointer">
                          Settings
                        </button>
                      </div>
                    </div>
                  ) : simTab === "hotel" ? (
                    // V4Stay Sidebar
                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-2 px-2">
                          <div className="rounded-lg p-1 bg-night-900 border border-night-700/30">
                            <Logo size={24} />
                          </div>
                          <span className="text-white font-bold text-sm tracking-tight">V4Stay</span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[9px] text-gray-600 font-semibold px-2 uppercase tracking-wider mb-2">
                            hotel grand
                          </div>
                          <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-violet-950/40 text-violet-300 border border-violet-500/20 flex items-center gap-2 cursor-pointer">
                            📊 Overview
                          </button>
                          <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                            📈 Analytics
                          </button>
                          <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center justify-between cursor-pointer">
                            <span className="flex items-center gap-2">📋 Orders</span>
                            <span className="w-4 h-4 bg-red-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                              {hotelRequest === "pending" ? 6 : 5}
                            </span>
                          </button>
                          <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                            🔑 Rooms
                          </button>
                          <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                            🍽️ Menu
                          </button>
                          <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                            📱 QR Code
                          </button>
                          <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                            👥 Team
                          </button>
                          <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                            ⚙️ Settings
                          </button>
                        </div>
                      </div>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-2 cursor-pointer mt-4">
                        🚪 Sign Out
                      </button>
                    </div>
                  ) : (
                    // Taste Sidebar
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-2 px-2">
                        <div className="rounded-lg p-1 bg-night-900 border border-night-700/30">
                          <Logo size={24} />
                        </div>
                        <span className="text-white font-bold text-sm tracking-tight">Taste</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[9px] text-gray-600 font-semibold px-2 uppercase tracking-wider mb-2">
                          My Restaurant
                        </div>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-2 cursor-pointer">
                          <span>📊</span> Dashboard
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                          <span>🍔</span> Menu Manager
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                          <span>🔑</span> Tables & QR
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                          <span>📈</span> Analytics
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                          <span>💬</span> Feedback
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                          <span>⚙️</span> Settings
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-y-auto bg-night-900/10 p-5 gap-5 select-none">
                  {simTab === "restaurant" && (
                    <div className="flex flex-col gap-5 flex-1 animate-fade-in">
                      {/* Real Taste Upgrade Banner */}
                      <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                        <div className="flex items-center gap-2 text-xs text-red-400 font-semibold">
                          <span>⚠️</span>
                          <span>Trial Expired — Free Plan</span>
                        </div>
                        <button className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-lg transition-colors shadow-lg shadow-red-600/15 cursor-pointer">
                          Upgrade to Premium — ₹14,999/yr
                        </button>
                      </div>

                      {/* Header greetings */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 leading-none">
                            Good evening, My Restaurant 👋
                          </h3>
                          <p className="text-gray-500 text-[11px] mt-1.5 leading-none">Here&apos;s a snapshot of today&apos;s activity.</p>
                        </div>
                        <button className="border border-night-700 hover:border-night-600 text-gray-300 hover:text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1">
                          <span>🔗</span> Preview Menu
                        </button>
                      </div>

                      {/* Three Accent Cards */}
                      <div className="grid grid-cols-3 gap-4">
                        {/* Today's Orders */}
                        <div className="bg-night-950/40 border-l-[3px] border-l-red-500 border border-night-700/30 p-3.5 rounded-r-xl rounded-l-sm">
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">TODAY&apos;S ORDERS</p>
                          <p className="text-xl font-black text-white mt-2 leading-none">
                            {orders.filter(o => o.status === "Kitchen (Preparing)").length}
                          </p>
                          <span className="inline-block text-[8px] bg-red-500/10 text-red-400 font-bold px-2 py-0.5 rounded-full mt-2 border border-red-500/20 leading-none">
                            {orders.filter(o => o.status === "Kitchen (Preparing)").length} pending
                          </span>
                        </div>

                        {/* Today's Revenue */}
                        <div className="bg-night-950/40 border-l-[3px] border-l-emerald-500 border border-night-700/30 p-3.5 rounded-r-xl rounded-l-sm">
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">TODAY&apos;S REVENUE</p>
                          <p className="text-xl font-black text-white mt-2 leading-none">
                            ₹{orders.reduce((acc, o) => acc + o.total, 0).toFixed(2)}
                          </p>
                          <span className="inline-block text-[8px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full mt-2 border border-emerald-500/20 leading-none">
                            Today total
                          </span>
                        </div>

                        {/* Total Orders */}
                        <div className="bg-night-950/40 border-l-[3px] border-l-sky-500 border border-night-700/30 p-3.5 rounded-r-xl rounded-l-sm">
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">TOTAL ORDERS</p>
                          <p className="text-xl font-black text-white mt-2 leading-none">
                            {9 + orders.length}
                          </p>
                          <span className="inline-block text-[8px] bg-sky-500/10 text-sky-400 font-bold px-2 py-0.5 rounded-full mt-2 border border-sky-500/20 leading-none">
                            All time
                          </span>
                        </div>
                      </div>

                      {/* Live Orders Section */}
                      <div className="flex-1 bg-night-950/60 border border-night-700/35 rounded-2xl p-5 flex flex-col min-h-[220px]">
                        <div className="flex items-center justify-between border-b border-night-800 pb-3 mb-4 shrink-0">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Live Orders</span>
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping shrink-0" />
                            Real-time
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                          {orders.map((o) => (
                            <div key={o.id} className="p-3.5 bg-night-900/40 border border-night-800 rounded-xl flex flex-col gap-2">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-black text-white">Table {o.table.replace("T-", "")}</span>
                                <span className="text-[10px] text-gray-500 font-medium">{o.time}</span>
                              </div>
                              <div className="text-xs text-gray-400 leading-relaxed">
                                {o.items}
                              </div>
                              <div className="flex justify-between items-center border-t border-night-800/40 pt-2 mt-1">
                                <span className="text-xs font-bold text-white">₹{o.total.toFixed(2)}</span>
                                <div className="flex items-center gap-2">
                                  {o.status === "Kitchen (Preparing)" ? (
                                    <>
                                      <button
                                        onClick={() => handleServeOrder(o.id)}
                                        className="bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-night-950 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-sky-500/20 hover:border-sky-500 transition-all cursor-pointer"
                                      >
                                        DONE
                                      </button>
                                      <button
                                        onClick={() => triggerAudioAlert(650)}
                                        className="bg-night-900 hover:bg-night-800 text-gray-400 hover:text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-night-800 hover:border-night-700 transition-all cursor-pointer flex items-center gap-1"
                                      >
                                        🖨️ Print
                                      </button>
                                    </>
                                  ) : (
                                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                      ✓ SERVED
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {simTab === "hotel" && (
                    <div className="flex flex-col gap-5 flex-1 animate-fade-in text-gray-300">
                      {/* Header with Title and action links */}
                      <div className="flex items-center justify-between pb-1">
                        <h3 className="text-lg font-bold text-white tracking-tight leading-none">
                          Dashboard Overview
                        </h3>
                        <div className="flex items-center gap-3">
                          <button className="text-[10px] border border-night-700/60 bg-night-900/60 hover:text-white text-gray-300 font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5">
                            <span>🔔</span> Enable Notifications
                          </button>
                          <button className="text-[10px] border border-night-700/60 bg-night-900/60 hover:text-white text-gray-300 font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5">
                            <span>🔗</span> View Live Portal
                          </button>
                          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-lg border border-emerald-500/25">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping shrink-0" />
                            Live
                          </div>
                        </div>
                      </div>

                      {/* Four Stats Cards */}
                      <div className="grid grid-cols-4 gap-4">
                        {/* Total Orders */}
                        <div className="bg-night-950/40 border border-night-700/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                          <span className="text-xl">📋</span>
                          <p className="text-xl font-black text-white mt-2 leading-none">15</p>
                          <p className="text-[9px] text-gray-500 mt-2 font-bold uppercase tracking-wider leading-none">Total Orders</p>
                        </div>

                        {/* Pending */}
                        <div className="bg-night-950/40 border border-night-700/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                          <span className="text-xl">⌛</span>
                          <p className="text-xl font-black text-violet-400 mt-2 leading-none">
                            {hotelRequest === "pending" ? 6 : 5}
                          </p>
                          <p className="text-[9px] text-gray-500 mt-2 font-bold uppercase tracking-wider leading-none">Pending</p>
                        </div>

                        {/* In Progress */}
                        <div className="bg-night-950/40 border border-night-700/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                          <span className="text-xl">🔄</span>
                          <p className="text-xl font-black text-violet-400 mt-2 leading-none">2</p>
                          <p className="text-[9px] text-gray-500 mt-2 font-bold uppercase tracking-wider leading-none">In Progress</p>
                        </div>

                        {/* Completed */}
                        <div className="bg-night-950/40 border border-night-700/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                          <span className="text-xl">✅</span>
                          <p className="text-xl font-black text-violet-400 mt-2 leading-none">
                            {hotelRequest === "resolved" ? 9 : 8}
                          </p>
                          <p className="text-[9px] text-gray-500 mt-2 font-bold uppercase tracking-wider leading-none">Completed</p>
                        </div>
                      </div>

                      {/* Recent Orders Section */}
                      <div className="flex-1 bg-night-950/60 border border-night-700/35 rounded-2xl p-5 flex flex-col min-h-[240px]">
                        <div className="flex items-center justify-between border-b border-night-800 pb-3 mb-4 shrink-0">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Recent Orders</span>
                        </div>

                        {/* Orders List Container */}
                        <div className="flex-1 overflow-y-auto space-y-3">
                          {/* Room 304 (Dynamic Scan Action Row) */}
                          {hotelRequest !== "none" && (
                            <div className="p-3.5 bg-night-900/40 border border-night-800 rounded-xl flex flex-col gap-2 transition-all">
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="text-xs font-black text-white">Room 304</span>
                                  <p className="text-[10px] text-gray-500 mt-0.5">Guest Request</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {hotelRequest === "pending" ? (
                                    <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                      ● Pending
                                    </span>
                                  ) : (
                                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                      ● Done
                                    </span>
                                  )}
                                  <span className="text-[10px] text-gray-500 font-medium">Just now</span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-400 font-semibold">
                                {hotelLogs[0]?.task || "Fresh Towels Request"}
                              </div>
                              {hotelRequest === "pending" ? (
                                <div className="flex items-center justify-between border-t border-night-800/40 pt-2 mt-1">
                                  <button
                                    onClick={resolveHotelRequest}
                                    className="border border-night-700 bg-night-900/60 hover:border-violet-500 hover:text-violet-400 text-gray-400 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                                  >
                                    Resolve Request
                                  </button>
                                </div>
                              ) : (
                                <p className="text-[9px] text-emerald-500 font-bold mt-1">✓ Completed</p>
                              )}
                            </div>
                          )}

                          {/* Room 102 (Virat) */}
                          <div className="p-3.5 bg-night-900/40 border border-night-800 rounded-xl flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-xs font-black text-white">Room 102</span>
                                <p className="text-[10px] text-gray-500 mt-0.5">Virat</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                  ● Pending
                                </span>
                                <span className="text-[10px] text-gray-500 font-medium">02:43 pm</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-night-800/40 pt-2 mt-1">
                              <button
                                onClick={() => triggerAudioAlert(600)}
                                className="border border-night-700 bg-night-900/60 hover:border-violet-500 hover:text-violet-400 text-gray-400 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                              >
                                Mark In Progress
                              </button>
                            </div>
                          </div>

                          {/* Room 104 (Shodhan 1) */}
                          <div className="p-3.5 bg-night-900/40 border border-night-800 rounded-xl flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-xs font-black text-white">Room 104</span>
                                <p className="text-[10px] text-gray-500 mt-0.5">Shodhan</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                  ● Done
                                </span>
                                <span className="text-[10px] text-gray-500 font-medium">04:06 pm</span>
                              </div>
                            </div>
                            <p className="text-[9px] text-emerald-500 font-bold mt-1">✓ Completed</p>
                          </div>

                          {/* Room 104 (Shodhan 2) */}
                          <div className="p-3.5 bg-night-900/40 border border-night-800 rounded-xl flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-xs font-black text-white">Room 104</span>
                                <p className="text-[10px] text-gray-500 mt-0.5">Shodhan</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                  ● Done
                                </span>
                                <span className="text-[10px] text-gray-500 font-medium">04:05 pm</span>
                              </div>
                            </div>
                            <p className="text-[9px] text-emerald-500 font-bold mt-1">✓ Completed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {simTab === "pg" && (
                    <div className="flex flex-col gap-5 flex-1 animate-fade-in">
                      {/* Header with Title dashboard overview */}
                      <div className="flex items-center justify-between pb-1">
                        <h3 className="text-lg font-bold text-white tracking-tight leading-none">
                          Dashboard Overview
                        </h3>
                      </div>

                      {/* Four Accent Cards exactly like screenshot */}
                      <div className="grid grid-cols-4 gap-4">
                        {/* OCCUPANCY */}
                        <div className="bg-night-950/40 border border-night-700/30 p-3.5 rounded-xl">
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">OCCUPANCY</p>
                          <p className="text-xl font-black text-white mt-2 leading-none">
                            {pgPaid ? "22%" : "17%"}
                          </p>
                          <p className="text-[9px] text-gray-500 mt-2 font-medium leading-none">
                            {pgPaid ? "4" : "3"} of 18 beds occupied
                          </p>
                        </div>

                        {/* AVAILABLE BEDS */}
                        <div className="bg-night-950/40 border border-night-700/30 p-3.5 rounded-xl">
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">AVAILABLE BEDS</p>
                          <p className="text-xl font-black text-white mt-2 leading-none">
                            {pgPaid ? 14 : 15}
                          </p>
                          <p className="text-[9px] text-gray-500 mt-2 font-medium leading-none">
                            Beds ready for new tenants
                          </p>
                        </div>

                        {/* MONTHLY COLLECTION */}
                        <div className="bg-night-950/40 border border-night-700/30 p-3.5 rounded-xl">
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">MONTHLY COLLECTION</p>
                          <p className="text-xl font-black text-emerald-400 mt-2 leading-none">
                            ₹{pgRevenue.toLocaleString()}
                          </p>
                          <p className="text-[9px] text-gray-500 mt-2 font-medium leading-none">
                            Expected this month
                          </p>
                        </div>

                        {/* OVERDUE PAYMENTS */}
                        <div className="bg-night-950/40 border-l-[3px] border-l-red-500 border border-night-700/30 p-3.5 rounded-r-xl rounded-l-sm">
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">OVERDUE PAYMENTS</p>
                          <p className="text-xl font-black text-red-400 mt-2 leading-none">
                            {pgPaid ? 1 : 2}
                          </p>
                          <div className="flex items-center justify-between mt-2 leading-none">
                            <span className="text-[9px] text-gray-500 font-medium">Tenants behind</span>
                            <span className="text-[9px] text-sky-400 font-semibold cursor-pointer">View list →</span>
                          </div>
                        </div>
                      </div>

                      {/* Revenue Chart Section */}
                      <div className="bg-night-950/60 border border-night-700/35 rounded-2xl p-5 flex flex-col min-h-[220px] justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white tracking-tight">Revenue — Last 6 Months</h4>
                          <p className="text-[9px] text-gray-500 mt-1">Monthly rent collection overview</p>
                        </div>

                        {/* Dynamic custom css bar graph */}
                        <div className="flex-1 flex items-end gap-6 pt-6 border-b border-night-800 pb-2">
                          <div className="flex-1 flex justify-between items-end h-[100px]">
                            {/* Feb 26 */}
                            <div className="flex flex-col items-center gap-1.5 flex-1">
                              <div className="w-4 bg-night-900 border border-night-800/40 rounded-t-sm h-[10%]" />
                              <span className="text-[8px] text-gray-600">Feb 26</span>
                            </div>
                            {/* Mar 26 */}
                            <div className="flex flex-col items-center gap-1.5 flex-1">
                              <div className="w-4 bg-night-900 border border-night-800/40 rounded-t-sm h-[15%]" />
                              <span className="text-[8px] text-gray-600">Mar 26</span>
                            </div>
                            {/* Apr 26 */}
                            <div className="flex flex-col items-center gap-1.5 flex-1">
                              <div className="w-4 bg-night-900 border border-night-800/40 rounded-t-sm h-[20%]" />
                              <span className="text-[8px] text-gray-600">Apr 26</span>
                            </div>
                            {/* May 26 */}
                            <div className="flex flex-col items-center gap-1.5 flex-1">
                              <div className="w-4 bg-night-900 border border-night-800/40 rounded-t-sm h-[25%]" />
                              <span className="text-[8px] text-gray-600">May 26</span>
                            </div>
                            {/* Jun 26 */}
                            <div className="flex flex-col items-center gap-1.5 flex-1">
                              <div className="w-4 bg-night-900 border border-night-800/40 rounded-t-sm h-[22%]" />
                              <span className="text-[8px] text-gray-600">Jun 26</span>
                            </div>
                            {/* Jul 26 */}
                            <div className="flex flex-col items-center gap-1.5 flex-1">
                              {/* Glowing height scales dynamically */}
                              <div
                                className="w-4 bg-gradient-to-t from-teal-500 to-emerald-400 shadow-md shadow-emerald-500/20 rounded-t-sm transition-all duration-1000"
                                style={{ height: pgPaid ? "85%" : "68%" }}
                              />
                              <span className="text-[8px] text-sky-400 font-bold">Jul 26</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
              <div className="relative w-full max-w-[320px] h-[540px] bg-night-950 border-[6px] border-night-700 rounded-[38px] shadow-2xl overflow-hidden flex flex-col">
                {/* Phone Speaker & Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 bg-night-700 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-10 h-1 bg-night-950 rounded-full mb-1" />
                </div>
                
                {/* Mobile Screen Header */}
                <div className="bg-night-900 border-b border-night-800 pt-6 px-4 pb-3 flex items-center justify-between shrink-0">
                  <div className="text-[10px] font-bold text-gray-400">18:45</div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.778 8.222c-3.8-3.8-10-3.8-13.8 0L5.3 9.6a8 8 0 0111.3 0l1.178-1.378zM15 11a6 6 0 00-8.5 0L7.7 12.2a4.3 4.3 0 016.1 0L15 11zm-2.2 2.8a2 2 0 00-2.8 0l1.4 1.4 1.4-1.4z" clipRule="evenodd" />
                    </svg>
                    <div className="w-5 h-2 bg-gray-500 rounded-sm" />
                  </div>
                </div>

                {/* Mobile Client App Screen */}
                <div className="flex-1 overflow-y-auto p-4 bg-[#090916] flex flex-col justify-between">
                  {simTab === "hotel" && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-center mb-6">
                          <p className="text-[10px] text-violet-400 font-semibold tracking-wider uppercase">Room 304 Butler</p>
                          <h4 className="text-sm font-bold text-white mt-1">Concierge Portal</h4>
                        </div>

                        <div className="space-y-3">
                          <button
                            onClick={() => handleHotelRequest("Towels")}
                            disabled={hotelRequest === "pending"}
                            className="w-full text-left p-3.5 rounded-xl border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/15 transition-all flex items-center gap-3 text-xs font-semibold text-white group cursor-pointer disabled:opacity-50"
                          >
                            <span className="text-lg">🧻</span>
                            <div className="flex-1">
                              <p>Request Fresh Towels</p>
                              <p className="text-[9px] text-gray-500 font-medium">Deliver 2 clean bath towels</p>
                            </div>
                            <span className="text-violet-400 group-hover:translate-x-1 transition-transform">→</span>
                          </button>

                          <button
                            onClick={() => handleHotelRequest("Cleaning")}
                            disabled={hotelRequest === "pending"}
                            className="w-full text-left p-3.5 rounded-xl border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/15 transition-all flex items-center gap-3 text-xs font-semibold text-white group cursor-pointer disabled:opacity-50"
                          >
                            <span className="text-lg">🧹</span>
                            <div className="flex-1">
                              <p>Clean My Room</p>
                              <p className="text-[9px] text-gray-500 font-medium">Housekeeper service requested</p>
                            </div>
                            <span className="text-violet-400 group-hover:translate-x-1 transition-transform">→</span>
                          </button>

                          <button
                            onClick={() => handleHotelRequest("Late Checkout")}
                            disabled={hotelRequest === "pending"}
                            className="w-full text-left p-3.5 rounded-xl border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/15 transition-all flex items-center gap-3 text-xs font-semibold text-white group cursor-pointer disabled:opacity-50"
                          >
                            <span className="text-lg">⏰</span>
                            <div className="flex-1">
                              <p>Late Checkout Request</p>
                              <p className="text-[9px] text-gray-500 font-medium">Extend checkout time by 2 hours</p>
                            </div>
                            <span className="text-violet-400 group-hover:translate-x-1 transition-transform">→</span>
                          </button>
                        </div>
                      </div>

                      {/* Request status */}
                      <div className="mt-6">
                        {hotelRequest === "none" && (
                          <div className="text-center text-[10px] text-gray-500 bg-night-950 p-3 rounded-lg border border-night-800">
                            Scan the room QR card to interact with the concierge
                          </div>
                        )}
                        {hotelRequest === "pending" && (
                          <div className="text-center text-[10px] text-violet-400 bg-violet-950/20 p-3 rounded-lg border border-violet-500/30 animate-pulse">
                            ⌛ Request sent. Awaiting hotel response...
                          </div>
                        )}
                        {hotelRequest === "resolved" && (
                          <div className="text-center text-[10px] text-emerald-400 bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/30">
                            ✓ Housekeeper resolved request!
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {simTab === "restaurant" && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-center mb-4">
                            <p className="text-[10px] text-orange-400 font-semibold tracking-wider uppercase">Table 4 Digital Menu</p>
                            <h4 className="text-sm font-bold text-white mt-1">Taste Restaurant QR</h4>
                          </div>

                          <div className="space-y-2">
                            {restaurantMenu.map((item) => (
                              <div key={item.id} className="p-2.5 rounded-xl border border-night-800 bg-night-950/50 flex items-center justify-between text-xs">
                                <div>
                                  <p className="text-white font-bold">{item.name}</p>
                                  <p className="text-[10px] text-gray-500">₹{item.price}</p>
                                </div>
                                <div className="flex items-center gap-2 border border-night-700 rounded-lg p-0.5 bg-night-900">
                                  <button
                                    onClick={() => updateMenuQty(item.id, -1)}
                                    className="w-5 h-5 rounded hover:bg-night-800 text-gray-400 font-bold flex items-center justify-center cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span className="text-white font-bold w-4 text-center">{item.qty}</span>
                                  <button
                                    onClick={() => updateMenuQty(item.id, 1)}
                                    className="w-5 h-5 rounded hover:bg-night-800 text-gray-400 font-bold flex items-center justify-center cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Summary & Button */}
                        <div className="mt-4 pt-3 border-t border-night-800">
                          {guestOrderStatus === "idle" && (
                            <div>
                              <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                                <span>Subtotal</span>
                                <span className="font-bold text-white">
                                  ₹{restaurantMenu.reduce((a,c) => a + c.price * c.qty, 0)}
                                </span>
                              </div>
                              <button
                                onClick={handlePlaceOrder}
                                disabled={restaurantMenu.reduce((a,c) => a + c.qty, 0) === 0}
                                className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs transition-all shadow-lg shadow-orange-500/25 disabled:opacity-40 disabled:shadow-none cursor-pointer"
                              >
                                Send Order to Kitchen
                              </button>
                            </div>
                          )}

                          {guestOrderStatus === "sending" && (
                            <div className="text-center text-xs text-orange-400 bg-orange-950/15 py-3 rounded-xl border border-orange-500/20 animate-pulse">
                              ⌛ Routing order to kitchen...
                            </div>
                          )}

                          {guestOrderStatus === "sent" && (
                            <div className="text-center text-xs text-amber-400 bg-amber-950/20 py-3 rounded-xl border border-amber-500/30">
                              <p className="font-bold">✓ Order Received!</p>
                              <p className="text-[10px] text-gray-500 mt-1">Kitchen staff is preparing your meal.</p>
                            </div>
                          )}

                          {guestOrderStatus === "served" && (
                            <div className="text-center text-xs text-emerald-400 bg-emerald-950/20 py-3 rounded-xl border border-emerald-500/30">
                              <p className="font-bold">✓ Served! Bon Appétit!</p>
                              <p className="text-[10px] text-gray-400 mt-1">Enjoy your hot meal.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {simTab === "pg" && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-center mb-6">
                          <p className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">PGmate Portal</p>
                          <h4 className="text-sm font-bold text-white mt-1">Room 102 Tenant Link</h4>
                        </div>

                        <div className="bg-night-950/80 border border-night-800 p-4 rounded-2xl">
                          <div className="flex justify-between items-center text-xs pb-3 border-b border-night-800">
                            <span className="text-gray-500">Tenant Name</span>
                            <span className="text-white font-semibold">Rohit Kumar</span>
                          </div>
                          <div className="flex justify-between items-center text-xs py-3 border-b border-night-800">
                            <span className="text-gray-500">Rent Period</span>
                            <span className="text-white font-semibold">July 2026</span>
                          </div>
                          <div className="flex justify-between items-center text-xs pt-3">
                            <span className="text-gray-500">Rent Due</span>
                            <span className={`font-bold ${pgPaid ? "text-emerald-400" : "text-amber-400"}`}>
                              {pgPaid ? "₹0 (Paid)" : "₹8,000"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Trigger */}
                      <div className="mt-6">
                        {!pgPaid ? (
                          <button
                            onClick={handlePayRent}
                            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                          >
                            Pay Rent via UPI
                          </button>
                        ) : (
                          <div className="text-center text-xs text-emerald-400 bg-emerald-950/20 py-3 rounded-xl border border-emerald-500/30">
                            <p className="font-bold">✓ Payment Successful!</p>
                            <p className="text-[10px] text-gray-500 mt-1">Receipt has been sent to WhatsApp.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work (Agency Process) */}
      <section id="process" className="py-20 md:py-28 relative overflow-hidden">
        <div className="bg-layer absolute inset-0 bg-night-900/50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-sky-400 font-semibold text-sm tracking-widest uppercase mb-3">Our Approach</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading gradient-text">How We Work</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              A streamlined process designed to understand your business and deliver measurable results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-sky-500/0 via-sky-500/50 to-sky-500/0 -translate-y-1/2 z-0" />
            {[
              { step: "01", title: "Discovery & Strategy", desc: "We analyze your business needs, target audience, and current processes to craft a tailored action plan." },
              { step: "02", title: "Development & Execution", desc: "Whether it's launching a marketing campaign, setting up SaaS, or building automations, we build it." },
              { step: "03", title: "Optimization & Growth", desc: "We continuously monitor data, optimize performance, and scale the solutions as your business grows." },
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 glass-panel p-8 rounded-2xl text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-night-950 border border-sky-500/30 rounded-full flex items-center justify-center text-xl font-bold text-sky-400 mb-6 shadow-[0_0_15px_rgba(14,165,233,0.3)] group-hover:bg-sky-500 group-hover:text-night-950 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28 relative overflow-hidden bg-night-950">
        <div className="bg-orb absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="bg-orb absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">Investment</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading gradient-text">Flexible Pricing Models</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Transparent pricing for our core services. No hidden fees.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                plan: "Marketing", 
                price: "Custom", 
                desc: "Data-driven campaigns to grow your brand.", 
                features: ["SEO & Content Strategy", "Social Media Management", "Paid Ad Campaigns (PPC)", "Monthly Performance Reports"],
                color: "text-sky-400", bg: "bg-sky-500", border: "border-sky-500/30"
              },
              { 
                plan: "SaaS Products", 
                price: "Subscription", 
                desc: "V4Stay, Taste, and PGmate licenses.", 
                features: ["Cloud-based Dashboard", "Unlimited QR Scans", "Free Setup & Onboarding", "24/7 Technical Support"],
                color: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500/30",
                popular: true
              },
              { 
                plan: "Automations", 
                price: "Project-Based", 
                desc: "Custom workflows and process automation.", 
                features: ["API Integrations", "Chatbot Development", "Workflow Optimization", "Codebase Audits"],
                color: "text-amber-400", bg: "bg-amber-500", border: "border-amber-500/30"
              },
            ].map((p, idx) => (
              <div key={idx} className={`glass-panel p-8 rounded-2xl border ${p.border} relative flex flex-col`}>
                {p.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-night-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-bold ${p.color} mb-2`}>{p.plan}</h3>
                <div className="text-3xl font-bold text-white mb-4">{p.price}</div>
                <p className="text-sm text-gray-400 mb-6 flex-1">{p.desc}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className={`${p.color}`}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`w-full py-2.5 rounded-full ${p.bg} text-night-950 font-bold text-sm transition-all shadow-lg hover:brightness-110 text-center`}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog — internal links to supporting posts */}
      <section id="blog" className="py-20 md:py-28 relative overflow-hidden">
        <div className="bg-layer absolute inset-0 bg-night-950" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="text-sky-400 font-semibold text-sm tracking-widest uppercase mb-3">Learn More</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading gradient-text">
              What is a SaaS Management Platform Doing for Hotels &amp; PGs?
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Short answer: it replaces the front-desk phone, the printed menu, and the rent spreadsheet with
              one cloud dashboard. Read the guides below to see how each use case works in detail.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                href: "/blog/hotel-automation-2026",
                title: "How Hotel Automation is Changing the Hospitality Industry in 2026",
                desc: "Cloud-based property management systems and QR concierge services, explained.",
              },
              {
                href: "/blog/restaurant-qr-ordering",
                title: "Why Every Restaurant Needs a Cloud-Based QR Code Ordering System",
                desc: "Faster table turns, higher order value, zero menu printing costs.",
              },
              {
                href: "/blog/pg-property-management",
                title: "The Ultimate Guide to Streamlining PG and Property Management",
                desc: "Stop tracking rent in spreadsheets — automate rent, receipts and complaints.",
              },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="glass-panel rounded-2xl p-6 border border-night-700/50 hover:border-sky-500/30 transition-colors flex flex-col group"
              >
                <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-sky-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{post.desc}</p>
                <span className="text-sky-400 text-sm font-semibold">
                  Read the guide
                  <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="text-sky-400 hover:text-sky-300 font-semibold text-sm">
              View all articles on the V4 blog →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 relative overflow-hidden bg-night-900/30 border-y border-night-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight font-heading gradient-text">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel p-6 rounded-xl text-left border border-night-700/50">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a,
                  },
                })),
              }),
            }}
          />
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
              <h3 className="font-semibold text-sky-400 mb-4 text-sm uppercase tracking-wider">Branches</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-gray-300 transition-colors cursor-default">V4 Services — Marketing</li>
                <li className="hover:text-gray-300 transition-colors cursor-default">V4Stay — SaaS</li>
                <li className="hover:text-gray-300 transition-colors cursor-default">V4 Automations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sky-400 mb-4 text-sm uppercase tracking-wider">Contact</h3>
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
                <li>
                  <Link href="/blog" className="text-gray-500 hover:text-sky-400 transition-colors">
                    V4 Blog &amp; Guides
                  </Link>
                </li>
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
