import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Maximize2,
  X,
  Youtube,
  Twitter,
  Instagram,
  Video,
  Globe,
  CheckCircle2
} from 'lucide-react';

interface ProductsSectionProps {
  onPreBookSelect?: (model: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<'purrfectbackup' | 'coming-soon'>('purrfectbackup');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // 100% Official Information from purrfectbackup.com & Official Channels
  const productViews = [
    {
      id: 'overview',
      label: 'Both Editions',
      title: 'PurrfectBackup Standard & PRO',
      src: '/Productpage.webp',
      caption: 'PurrfectBackup Standard and PRO editions.',
      summary:
        'A dedicated portable backup device for photographers, videographers, travelers, and content creators. Offload SD cards, microSD, CFexpress, and CFast cards directly to storage without a laptop, computer, or phone.',
      bulletPoints: [
        '100% offline backup — no laptop, computer, app, or internet connection required',
        'Direct connection: plug in your card reader and external drive (or internal NVMe in PRO) to back up',
        'Fast transfer speeds demonstrated copying ~14GB in approximately one minute',
        '1.3" OLED screen with tactile 5-way joystick for intuitive, standalone operation',
        'Strict read-only mounting ensures your memory cards are never modified or corrupted',
        'Supports "Just Copy" and "Dated Copy" organizational modes',
      ],
      specHighlights: [
        { label: 'Card Ingestion', value: 'SD, microSD, CFexpress, CFast (via USB reader)' },
        { label: 'Target Storage', value: 'External SSD/HDD (Standard) or Internal NVMe (PRO)' },
        { label: 'Interface', value: '1.3" OLED Display & 5-Way Joystick' },
        { label: 'Power Input', value: 'Standard USB-C (Power banks or USB-C chargers)' },
      ],
    },
    {
      id: 'standard',
      label: 'Standard Model',
      title: 'PurrfectBackup Standard',
      src: '/assets/PB-STD-IL-CLEAR.webp',
      caption: 'PurrfectBackup Standard with dual USB 3.2 ports and OLED interface.',
      summary:
        'The Standard model connects your USB card reader into one high-speed port and your external SSD or hard drive into the other. A simple click of the joystick initiates the backup.',
      bulletPoints: [
        'Direct 1-to-1 card offload to external USB SSDs, hard drives, and flash storage',
        'Pocket-sized, lightweight form factor designed for field kits and travel bags',
        'Built-in Real-Time Clock (RTC) ensures accurate offline folder and file timestamps',
        'No phone, app, or laptop required to initiate or complete backups',
      ],
      specHighlights: [
        { label: 'Target Storage', value: 'External USB-C SSD / HDD' },
        { label: 'Ports', value: 'Dual USB 3.2 Gen 1 ports' },
        { label: 'Weight', value: '145 grams' },
        { label: 'Clock Backup', value: 'CR2032 Real-Time Clock coin cell' },
      ],
    },
    {
      id: 'pro',
      label: 'PRO Edition (NVMe)',
      title: 'PurrfectBackup PRO',
      src: '/assets/PB-PRO-IL-CLEAR.webp',
      caption: 'PurrfectBackup PRO with built-in internal M.2 NVMe SSD bay.',
      summary:
        'The PRO edition includes a built-in tool-less M.2 NVMe SSD slot, creating a self-contained backup unit. Insert your card reader directly into the device to back up without needing loose external drives or cables.',
      bulletPoints: [
        'Built-in tool-less M.2 2280 NVMe SSD bay supporting internal storage up to 4TB',
        'All-in-one cable-free operation — card reader connects directly to the device',
        'Precision thermal venting for sustained transfer performance',
        'External USB port also available for simultaneous secondary backups',
      ],
      specHighlights: [
        { label: 'Internal Storage', value: 'M.2 2280 NVMe SSD slot (up to 4TB)' },
        { label: 'External Port', value: 'High-speed USB 3.2 port' },
        { label: 'Weight', value: '168 grams (chassis)' },
        { label: 'Display & Control', value: '1.3" OLED & 5-Way Joystick' },
      ],
    },
    {
      id: 'webui',
      label: 'WebUI Companion',
      title: 'Optional Local WebUI Companion',
      src: '/assets/PB-WEBUI-PHONE-IL-CLEAR.webp',
      caption: 'Optional browser-based local inspection on phone or computer.',
      summary:
        'PurrfectBackup functions 100% autonomously without any app. For users who wish to inspect files, the device can host an optional local Wi-Fi network to preview photos, explore folders, and verify backup logs directly in a browser.',
      bulletPoints: [
        'Completely optional — device operates 100% standalone without it',
        'Runs directly in any standard mobile or desktop web browser (Safari, Chrome, Firefox)',
        'Zero internet or cellular network required — operates strictly offline and peer-to-peer',
        'Browse backed-up files, preview photos, and inspect transfer verification logs',
      ],
      specHighlights: [
        { label: 'Connection', value: 'Local 5.0 GHz Wi-Fi (offline peer-to-peer)' },
        { label: 'Software Requirement', value: 'None (Runs in standard web browser)' },
        { label: 'Features', value: 'File browser, image previews, backup logs' },
        { label: 'Security', value: '100% offline, zero cloud connection' },
      ],
    },
  ];

  const purrfectBackupSocials = [
    {
      name: 'Official Website',
      href: 'https://purrfectbackup.com/',
      icon: Globe,
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@PurrfectBackup',
      icon: Youtube,
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/purrfectbackup',
      icon: Twitter,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/purrfectbackup',
      icon: Instagram,
    },
    {
      name: 'Field Demos',
      href: 'https://purrfectbackup.com/purrfectbackup-videos/',
      icon: Video,
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productViews.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + productViews.length) % productViews.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImg) {
        if (e.key === 'Escape') setLightboxImg(null);
        if (e.key === 'ArrowRight') handleNextSlide();
        if (e.key === 'ArrowLeft') handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg, currentSlide]);

  const activeView = productViews[currentSlide];

  return (
    <section id="products" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Products
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Physical hardware and intelligent computing systems from ReachVector Intelligence LLP.
            </p>
          </div>

          {/* Segmented Tab Control */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('purrfectbackup')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'purrfectbackup'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              PurrfectBackup
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('coming-soon')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'coming-soon'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Coming Soon
            </button>
          </div>
        </div>

        {/* ================= TAB 1: PURRFECTBACKUP ================= */}
        {activeTab === 'purrfectbackup' && (
          <div className="bg-[#fafbfc] border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs animate-in fade-in duration-300">
            
            {/* Top Product Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  <span>Dedicated Field Hardware</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-emerald-700 font-semibold">Official Product</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  PurrfectBackup
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  Pocket-sized, laptop-free autonomous backup for photographers, videographers, and travelers.
                </p>
              </div>

              {/* Official Store & Website Links */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://purrfectbackup.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs active:scale-95"
                >
                  <span>Visit purrfectbackup.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://us.purrfectbackup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3.5 py-2.5 text-xs font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors active:scale-95"
                >
                  <span>International Store</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href="https://india.purrfectbackup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3.5 py-2.5 text-xs font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors active:scale-95"
                >
                  <span>India Store</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Clean, Full-Width View Selector Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-5 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                {productViews.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer select-none active:scale-95 ${
                      currentSlide === idx
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Slide Counter & Next/Prev */}
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2 py-1 text-slate-600 text-xs font-mono shrink-0">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="p-1 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors cursor-pointer"
                  aria-label="Previous view"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 font-medium">
                  {currentSlide + 1} of {productViews.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="p-1 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors cursor-pointer"
                  aria-label="Next view"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2-Column Product Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 items-start">
              
              {/* Left Column: Visual Stage & Thumbnails */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Hero Hardware Viewport */}
                <div className="relative bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs overflow-hidden group">
                  <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-slate-50/70 rounded-xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeView.id}
                        src={activeView.src}
                        alt={activeView.title}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="w-full h-full object-contain p-2 cursor-pointer transition-transform duration-300 group-hover:scale-102"
                        onClick={() => setLightboxImg(activeView.src)}
                        loading="lazy"
                      />
                    </AnimatePresence>

                    {/* Enlarge Button */}
                    <button
                      type="button"
                      onClick={() => setLightboxImg(activeView.src)}
                      className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/95 hover:bg-white text-slate-700 border border-slate-200 shadow-xs text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      aria-label="Enlarge image"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-medium">Click to Enlarge</span>
                    </button>
                  </div>

                  <p className="mt-2.5 text-xs text-slate-500 font-mono text-center">
                    {activeView.caption}
                  </p>
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-4 gap-2.5">
                  {productViews.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`aspect-[4/3] p-1.5 rounded-xl border bg-white overflow-hidden transition-all flex items-center justify-center cursor-pointer ${
                        currentSlide === idx 
                          ? 'border-slate-900 ring-2 ring-slate-900/20 shadow-xs' 
                          : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300'
                      }`}
                      title={item.title}
                    >
                      <img src={item.src} alt={item.label} className="max-h-full max-w-full object-contain" />
                    </button>
                  ))}
                </div>

              </div>

              {/* Right Column: Verified Official Features & Specs */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Active Headline & Description */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5"
                  >
                    <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                      {activeView.label} — Official Overview
                    </span>
                    <h4 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                      {activeView.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {activeView.summary}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Key Official Features */}
                <div className="space-y-2.5 pt-4 border-t border-slate-200">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 block">
                    Key Features
                  </span>
                  <div className="space-y-2">
                    {activeView.bulletPoints.map((point) => (
                      <div key={point} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="pt-4 border-t border-slate-200">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 block mb-2.5">
                    Specifications
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeView.specHighlights.map((spec) => (
                      <div key={spec.label} className="p-3 bg-white border border-slate-200 rounded-xl">
                        <span className="text-[11px] font-mono text-slate-400 block mb-0.5">
                          {spec.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Card Footer: Social & Media Channels */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-mono">
                Official Channels &amp; Community:
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {purrfectBackupSocials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 text-xs transition-colors active:scale-95"
                      title={`Follow PurrfectBackup on ${social.name}`}
                    >
                      <Icon className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-medium">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: COMING SOON ================= */}
        {activeTab === 'coming-soon' && (
          <div className="bg-[#fafbfc] border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>

            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 block mb-2">
              ReachVector Hardware Pipeline
            </span>

            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
              Coming Soon
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
              More products will be announced as our engineering roadmap progresses. For partnership inquiries or product announcements, reach out to our team at{' '}
              <a href="mailto:contact@reachvector.com" className="text-slate-900 font-semibold underline hover:text-cyan-700">
                contact@reachvector.com
              </a>.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors active:scale-95"
            >
              Contact Us
            </a>
          </div>
        )}

      </div>

      {/* Lightbox Modal with Full Keyboard & Navigation Support */}
      {lightboxImg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxImg(null)}
        >
          {/* Top Bar with Title and Close Button */}
          <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-10">
            <div className="text-white">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Hardware Inspection
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {activeView.title}
              </h4>
            </div>

            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Controls in Lightbox */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevSlide();
            }}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextSlide();
            }}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Centered Image */}
          <div className="max-w-4xl max-h-[80vh] p-2 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={activeView.src} 
              alt={activeView.title} 
              className="max-w-full max-h-[75vh] object-contain rounded-2xl drop-shadow-2xl select-none" 
            />
          </div>

          {/* Bottom Caption */}
          <div className="absolute bottom-4 sm:bottom-6 text-center text-xs text-slate-400 font-mono">
            {currentSlide + 1} of {productViews.length} — Press Esc to exit or Arrow keys to navigate
          </div>
        </div>
      )}
    </section>
  );
};
