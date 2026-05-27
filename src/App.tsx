import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logo from './assets/logo.png';
import CountdownTimer from './components/CountdownTimer';
import ShibaMascot from './components/ShibaMascot';
import { 
  Clock, 
  MapPin, 
  Gift, 
  ShieldCheck, 
  Link2, 
  Flame, 
  ArrowRight, 
  Menu, 
  X, 
  Info, 
  Brain, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Zap, 
  ChevronRight,
  ChevronDown,
  TrendingUp,
  AlertTriangle,
  ArrowUp
} from 'lucide-react';
import contentData from './data/contentData.json';
import LiveDopamineStat from './components/LiveDopamineStat';
import RollingButton from './components/RollingButton';
import LiveClock from './components/LiveClock';
import ShaderBackground from './components/ShaderBackground';
import MobileMenu from './components/MobileMenu';
import HedonicScaleCard from './components/HedonicScaleCard';
import PopupQuiz from './components/PopupQuiz';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedStruggle, setSelectedStruggle] = useState<string>('');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  
  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const revealProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  // Refs for smooth scroll target sections
  const natureRef = useRef<HTMLDivElement>(null);
  const mechanismRef = useRef<HTMLDivElement>(null);
  const manipulationRef = useRef<HTMLDivElement>(null);
  const harmRef = useRef<HTMLDivElement>(null);
  const consequenceRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for sticky pill navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Initial run to calculate accurate progress if page has initial scroll
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom function to smooth scroll to targets
  const handleScrollTo = (sectionId: string) => {
    let targetRef: React.RefObject<HTMLDivElement | null> | null = null;
    
    if (sectionId === 'nature' || sectionId === 'problem') targetRef = natureRef;
    else if (sectionId === 'mechanism') targetRef = mechanismRef;
    else if (sectionId === 'manipulation') targetRef = manipulationRef;
    else if (sectionId === 'harm') targetRef = harmRef;
    else if (sectionId === 'consequence') targetRef = consequenceRef;
    else if (sectionId === 'solution') targetRef = solutionRef;
    else if (sectionId === 'register-section' || sectionId === 'register' || sectionId === 'map-section') targetRef = registerRef;
    else if (sectionId === 'faq') targetRef = faqRef;

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Struggle button options definition
  const struggleOptions = [
    "Nghiện TikTok / Reels / Shorts",
    "Sốc thông tin / Mất tập trung",
    "Nghịch lý trì hoãn kéo dài",
    "Trống rỗng, uể oải cuối ngày"
  ];

  // Submit Handler
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setFormError('Vui lòng nhập đầy đủ thông tin liên hệ của bạn.');
      return;
    }
    if (!selectedStruggle) {
      setFormError('Vui lòng chọn 1 vấn đề bạn đang đối mặt nhiều nhất.');
      return;
    }
    
    // Success scenario simulations
    setFormError('');
    setIsSubmitted(true);
  };

  return (
    <div id="fast-dopamine-workshop" className="min-h-screen bg-[#EFEFEF] text-[#0A0A0A] font-sans selection:bg-[#FF5722] selection:text-white p-2 sm:p-4 border-2 sm:border-4 border-white box-border relative">
      
      {/* Scroll indicator progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#FF5722] z-[100] transition-all duration-75 ease"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Hero Section - Full viewport in cinematic storytelling style (Craft.do style) */}
      <div className="relative w-full h-[100vh] min-h-[700px] flex flex-col justify-center items-center text-center overflow-hidden bg-[#EFEFEF]">
        
        {/* Shader background */}
        <ShaderBackground />

        {/* 1. Pill Navigation Bar - structural navbar */}
        <header id="header-navbar" className="absolute top-0 left-0 right-0 z-30 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-white/80 backdrop-blur-md rounded-full px-3 py-2 sm:py-2.5 border border-gray-100 shadow-xl shadow-gray-200/20 flex justify-between items-center">
            
            {/* Left: Round Logo & Nav Links */}
            <div className="flex items-center space-x-6 sm:space-x-8">
              <a href="#" className="flex items-center space-x-2.5 cursor-pointer group">
                <img src={logo} alt="logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform group-hover:scale-105" />
                <div className="leading-none">
                  <span className="text-[10px] font-mono font-bold text-[#FF5722] tracking-widest block">2026</span>
                  <span className="text-sm font-bold text-black tracking-tight">FAST DOPAMINE</span>
                </div>
              </a>

              {/* Desktop Nav links with new names */}
              <nav className="hidden md:flex items-center space-x-6">
                <button onClick={() => handleScrollTo('problem')} className="text-sm font-semibold text-gray-600 hover:text-[#FF5722] transition-colors cursor-pointer">Vấn đề</button>
                <button onClick={() => handleScrollTo('mechanism')} className="text-sm font-semibold text-gray-600 hover:text-[#FF5722] transition-colors cursor-pointer">Cơ chế</button>
                <button onClick={() => handleScrollTo('solution')} className="text-sm font-semibold text-gray-600 hover:text-[#FF5722] transition-colors cursor-pointer">Giải pháp</button>
                <button onClick={() => handleScrollTo('map-section')} className="text-sm font-semibold text-gray-600 hover:text-[#FF5722] transition-colors cursor-pointer">Địa điểm</button>
              </nav>
            </div>

            {/* Right Side Info & Action */}
            <div className="hidden md:flex items-center space-x-6">
              <LiveClock />
              <RollingButton 
                text="Địa điểm" 
                color="dark" 
                onClick={() => handleScrollTo('map-section')} 
              />
            </div>

            {/* Mobile Menu Action button */}
            <div className="md:hidden">
              <button
                id="menu-toggle"
                onClick={() => setMobileMenuOpen(true)}
                className="bg-black hover:bg-[#FF5722] text-white rounded-full p-2.5 transition-all cursor-pointer"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>

          </div>
        </header>

        {/* Floating/Sticky Navbar appearing when scrolled */}
        <div id="sticky-navbar-overlay" className={`fixed top-4 left-0 right-0 z-40 max-w-[1440px] mx-auto px-4 transition-all duration-500 ${
          scrolled ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
        }`}>
          <div className="bg-black/90 backdrop-blur-lg rounded-full px-4 py-2 border border-neutral-800 shadow-2xl flex justify-between items-center text-white">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center space-x-2 text-left cursor-pointer group">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
              <div>
                <span className="text-[10px] font-mono font-medium text-[#FF5722] block tracking-widest uppercase">FAST DOPAMINE</span>
                <span className="text-xs font-bold text-gray-200">Não bộ bị đánh cắp</span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium text-gray-300">
              <button onClick={() => handleScrollTo('problem')} className="hover:text-white transition-colors cursor-pointer">01 / Vấn đề</button>
              <button onClick={() => handleScrollTo('mechanism')} className="hover:text-white transition-colors cursor-pointer">04 / Cơ chế cân bằng</button>
              <button onClick={() => handleScrollTo('manipulation')} className="hover:text-white transition-colors cursor-pointer">02 / Thao túng</button>
              <button onClick={() => handleScrollTo('harm')} className="hover:text-white transition-colors cursor-pointer">03 / Tác hại</button>
              <button onClick={() => handleScrollTo('solution')} className="hover:text-white transition-colors cursor-pointer">06 / Giải pháp</button>
            </nav>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="hidden sm:block">
                <LiveClock />
              </div>
              <RollingButton 
                text="Địa điểm" 
                color="orange" 
                onClick={() => handleScrollTo('map-section')} 
              />
            </div>
          </div>
        </div>

        {/* Hero Content - centered narrative storytelling (Craft.do style) */}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-[11px] font-mono tracking-widest uppercase mb-4 text-[#FF5722] font-semibold">
            {contentData.hero.eyebrow} • 2026
          </div>
          <h1 className="text-5xl sm:text-8xl lg:text-8xl font-black tracking-tight leading-[1.1] text-black">
            Bạn có thật sự<br />làm chủ bản thân?
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto mt-6 leading-relaxed">
            Trung bình mỗi người mở điện thoại 150 lần/ngày. Và không nhớ mình đã làm gì.
          </p>
          <CountdownTimer />
        </div>

      </div>

      {/* Interactive Micro Event Info Banner */}
      <section id="event-highlights" className="bg-black text-white relative z-20 py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
            {contentData.eventInfo.map((info) => {
              // Custom icons mapper
              const renderIcon = (iconName: string) => {
                if (iconName === 'clock') return <Clock className="w-5 h-5 text-[#FF5722]" />;
                if (iconName === 'map-pin') return <MapPin className="w-5 h-5 text-[#FF5722]" />;
                return <Gift className="w-5 h-5 text-[#FF5722]" />;
              };

              return (
                <motion.div 
                  key={info.id} 
                  whileHover={{ 
                    y: -6, 
                    scale: 1.03,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(255, 87, 34, 0.05)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                  className="flex items-start space-x-4 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/60 hover:border-[#FF5722]/40 hover:bg-neutral-900/90 transition-colors duration-300 shadow-lg cursor-default select-none group"
                >
                  <div className="bg-neutral-800/80 p-3 rounded-full mt-0.5 group-hover:bg-[#FF5722]/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {renderIcon(info.icon)}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1 group-hover:text-neutral-300 transition-colors">
                      {info.label}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-0.5">
                      {info.value}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium group-hover:text-neutral-400 transition-colors">
                      {info.sub}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: 02 / BẢN CHẤT (About-style Layout) */}
      <section 
        ref={natureRef} 
        id="nature-section" 
        className="py-16 sm:py-28 bg-white overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Marker */}
          <motion.div {...revealProps} className="flex items-center space-x-2.5 mb-6">
            <span className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center text-xs font-mono font-bold">1</span>
            <span className="text-sm font-mono font-bold uppercase tracking-widest text-gray-900">
              {contentData.nature.sectionId}
            </span>
          </motion.div>

          {/* Heading dual-tone */}
          <motion.h2 {...revealProps} className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-gray-900 max-w-4xl mb-12 lg:mb-16 leading-tight">
            Cơ chế dopamine – <span className="text-gray-400 font-light italic">"mũi tiêm số"</span> đang định hình lại bộ não bạn.
          </motion.h2>

          {/* Desktop/Laptop Layout Grid */}
          <motion.div {...revealProps} className="hidden lg:grid grid-cols-[1fr_40%] items-start gap-12">
            
  

            {/* Middle Column: Text and callout button */}
            <div className="pb-2">
              <p className="text-base text-gray-700 leading-relaxed font-light mb-8">
                {contentData.nature.leftText}
              </p>
              
              {/* Stat Card callout inline */}
              <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg shadow-black/5 p-5 rounded-2xl mb-8">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-display font-black text-[#FF5722]">{contentData.nature.callout.stat}</span>
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wide font-mono bg-rose-100 px-2.5 py-0.5 rounded-full">Dopamine Spike</span>
                </div>
                <p className="text-xs text-rose-900 leading-relaxed">
                  {contentData.nature.callout.text}
                </p>
                <span className="text-[10px] font-mono text-rose-500 mt-2 block font-medium">
                  Nguồn: {contentData.nature.callout.source}
                </span>
              </div>
              
            </div>

            {/* Right Column: Live Dopamine Stat */}
            <LiveDopamineStat />
          </motion.div>

          {/* Mobile and Tablet layout fallback: Stack layout */}
          <motion.div {...revealProps} className="lg:hidden flex flex-col space-y-8">
            <p className="text-base text-gray-700 leading-relaxed">
              {contentData.nature.leftText}
            </p>

            <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg shadow-black/5 p-5 rounded-2xl">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl font-display font-black text-[#FF5722]">{contentData.nature.callout.stat}</span>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wide font-mono bg-rose-100 px-2.5 py-0.5 rounded-full">Dopamine Spike</span>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                {contentData.nature.callout.text}
              </p>
            </div>

            <LiveDopamineStat />

            <div className="pt-3">
             
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section 3: 03 / CƠ CHẾ (Case Studies Grid to Interactive Scale) */}
      <section 
        ref={mechanismRef} 
        id="mechanism-section" 
        className="py-16 sm:py-28 bg-[#F5F5F5]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Marker */}
          <motion.div {...revealProps} className="flex items-center space-x-2.5 mb-6">
            <span className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center text-xs font-mono font-bold">2</span>
            <span className="text-sm font-mono font-bold uppercase tracking-widest text-gray-900">
              {contentData.mechanism.sectionId}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div {...revealProps} className="max-w-4xl mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-gray-900 leading-tight">
              Cán cân khoái cảm và nỗi đau — <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400 italic font-light inline-block pb-1">Tâm trí bạn đang ở đâu</span><span className="text-gray-400 italic font-light">?</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mt-4">
              {contentData.mechanism.description}
            </p>
          </motion.div>

          {/* Interactive Scale Columns (Fast Dopamine vs Slow Dopamine scale simulation) */}
          <motion.div {...revealProps} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <HedonicScaleCard 
              mode="fast"
              title="Fast Dopamine (Kích thích nhân tạo)"
              description="Lướt TikTok, Reels, Shorts — giải trí tức thì không cần nỗ lực, nhưng để lại cảm giác mệt mỏi và trống rỗng."
            />

            <HedonicScaleCard 
              mode="slow"
              title="Slow Dopamine (Kỷ luật & Thể thao)"
              description="Tập luyện, chạy bộ, đọc sách — khó chịu ban đầu nhưng mang lại bình yên sâu sắc và tự hào thực sự."
            />

          </motion.div>

          {/* Scientific Quote Badge block */}
          <motion.div {...revealProps} className="mt-10 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-neutral-100 p-3 rounded-2xl flex-shrink-0 text-[#FF5722]">
                <Brain className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-wider text-[#FF5722] font-bold block uppercase">Theo Tiến Sĩ Anna Lembke</span>
                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed italic mt-1">
                  "Sự lạm dụng khoái cảm dễ dàng lâu ngày sẽ tước đoạt khả năng thích ứng tự nhiên của con người. Ta mất dần sự kiên nhẫn để đón nhận những giá trị thực tế."
                </p>
              </div>
            </div>
          
          </motion.div>

        </div>
      </section>

      {/* Section 4: 04 / THAO TÚNG */}
      <section 
        ref={manipulationRef} 
        id="manipulation-section" 
        className="py-16 sm:py-28 bg-white"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Marker */}
          <motion.div {...revealProps} className="flex items-center space-x-2.5 mb-6">
            <span className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center text-xs font-mono font-bold">3</span>
            <span className="text-sm font-mono font-bold uppercase tracking-widest text-gray-900">
              {contentData.manipulation.sectionId}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2 {...revealProps} className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-gray-900 mb-12 lg:mb-16 max-w-4xl leading-tight">
            Thuật toán đang <span className="text-red-500 underline decoration-wavy decoration-1 underline-offset-8">chiếm đoạt từng giây tự do</span> của bạn như thế nào?
          </motion.h2>

          {/* Grid 4 Cards holding manipulative techniques */}
          <motion.div {...revealProps} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentData.manipulation.cards.map((card, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50/70 border border-gray-100 hover:border-gray-200 hover:bg-gray-100/40 hover:scale-[1.02] p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between h-[210px] group cursor-default"
              >
                <div>
                  <div className="text-[10px] bg-white w-10 h-10 shadow-sm border border-gray-100 group-hover:scale-110 flex items-center justify-center font-bold rounded-2xl mb-4 transition-transform text-lg">
                    {card.emoji}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 font-display">
                    {card.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Section 5: 03 / TÁC HẠI (TikTok Brain Warning) */}
      <section 
        ref={harmRef} 
        id="harm-section" 
        className="py-16 sm:py-28 bg-[#111] text-white"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Marker */}
          <motion.div {...revealProps} className="flex items-center space-x-2.5 mb-6">
            <span className="w-7 h-7 rounded-md bg-[#FF5722] text-white flex items-center justify-center text-xs font-mono font-bold">4</span>
            <span className="text-sm font-mono font-bold uppercase tracking-widest text-[#FF5722]">
              {contentData.harm.sectionId}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 {...revealProps} className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white mb-12 lg:mb-20 max-w-4xl leading-tight">
            TikTok Brain & <span className="text-[#FF5722]">Hậu quả suy tàn</span> khả năng tập trung sâu.
          </motion.h2>

          {/* Stats columns */}
          <motion.div {...revealProps} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {contentData.harm.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-neutral-800 pl-6 lg:pl-10 relative overflow-hidden"
              >
                {/* Big Orange counter visual overlay */}
                <div className="md:order-1">
                  <span className="text-6xl sm:text-7xl font-display font-black text-[#FF5722] tracking-tighter block mb-2 leading-none">
                    {stat.number}
                  </span>
                </div>
                
                <div className="md:order-2 flex-1 pt-1.5 align-top">
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {stat.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Fast dopamine warning banner */}
          <motion.div {...revealProps} className="mt-16 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <p className="text-xs sm:text-sm text-neutral-300">
                Ý chí tự chủ của bạn đang bị bào mòn bởi hàng ngàn kích thích siêu ngắn kích hoạt tự động.
              </p>
            </div>
            
            <RollingButton 
              text="Kiểm tra mức độ ảnh hưởng" 
              color="white" 
              onClick={() => setIsQuizOpen(true)} 
            />
          </motion.div>

        </div>
      </section>

      {/* Section 6: 05 / HỆ QUẢ */}
      <section 
        ref={consequenceRef} 
        id="consequence-section" 
        className="py-16 sm:py-28 bg-white"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Marker */}
          <motion.div {...revealProps} className="flex items-center space-x-2.5 mb-6">
            <span className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center text-xs font-mono font-bold">5</span>
            <span className="text-sm font-mono font-bold uppercase tracking-widest text-gray-900">
              {contentData.consequence.sectionId}
            </span>
          </motion.div>

          <motion.h2 {...revealProps} className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-gray-900 mb-12 lg:mb-16 max-w-4xl leading-tight">
            Nghịch lý Doomer Culture — Khi đời thực <span className="text-gray-400 font-light italic">...trở nên nhạt nhẽo.</span>
          </motion.h2>

          <motion.div {...revealProps} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
              <p className="mb-6">
                Thế giới ảo quá hấp dẫn khiến đời thực nhạt nhẽo. Học tập trì hoãn, thể chất bỏ bê, bạn bè xa dần — tất cả vì một chiếc điện thoại.
              </p>
              
              <div className="mt-8 flex items-center space-x-2 bg-gray-50 border border-gray-100 py-3 px-4 rounded-full w-fit">
                <span className="w-2 h-2 rounded-full bg-orange-600 inline-block" />
                <span className="text-xs font-mono font-bold text-gray-500">MẤT ĐI SỨC HẤP DẪN ĐỜI THỰC</span>
              </div>
            </div>

            <div className="text-sm sm:text-base text-gray-600 border-l-4 border-[#FF5722] pl-6 sm:pl-10 py-2 leading-relaxed font-light">
              <p>
                Đây không phải lỗi của bạn. Bạn đang đối đầu với những cỗ máy tính mạnh nhất hành tinh, được thiết kế để giữ chân bạn.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section 7: 06 / GIẢI PHÁP + FORM ĐĂNG KÝ */}
      <section 
        ref={solutionRef} 
        id="solution-section" 
        className="py-16 sm:py-28 bg-gray-50/60 border-t border-gray-100"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Content list of solution highlights */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Section Marker */}
              <motion.div {...revealProps} className="flex items-center space-x-2.5 mb-6">
                <span className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center text-xs font-mono font-bold">6</span>
                <span className="text-sm font-mono font-bold uppercase tracking-widest text-gray-900">
                  {contentData.solution.sectionId}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2 {...revealProps} className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-gray-900 mb-8 leading-tight">
                Lộ trình thiết kế lại bộ lọc <span className="text-[#FF5722]">Dopamine</span> trong tâm trí.
              </motion.h2>

              <motion.p {...revealProps} className="text-sm text-gray-500 font-medium mb-10">
                Bạn không thể loại bỏ thuật toán, nhưng bạn có thể thiết lập hàng rào phòng ngự thông minh hơn chúng. Tại hội thảo, chúng tôi cam kết chuyển giao cho bạn:
              </motion.p>

              {/* Lists */}
              <motion.div {...revealProps} className="space-y-6 sm:space-y-8">
                {contentData.solution.items.map((item, idx) => {
                  const getIcon = (i: string) => {
                    if (i === 'shield-check') return <ShieldCheck className="w-6 h-6 text-[#FF5722]" />;
                    if (i === 'link-2') return <Link2 className="w-6 h-6 text-[#FF5722]" />;
                    return <Flame className="w-6 h-6 text-[#FF5722]" />;
                  };

                  return (
                    <div key={idx} className="flex items-start space-x-5 group p-2 hover:bg-white rounded-2xl transition duration-300">
                      <div className="bg-[#FF5722]/10 p-3 rounded-2xl flex-shrink-0 group-hover:bg-[#FF5722]/25 group-hover:scale-105 transition-all">
                        {getIcon(item.icon)}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

            </div>

            {/* Right: Google Maps */}
            <div ref={registerRef} id="map-section" className="lg:col-span-5 relative self-start">
              <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.5580123522136!2d105.7772156468355!3d21.034226037783316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7de0494ad7%3A0x5609dc970927c834!2sSOL%20CAFE%20%26%20CO-WORKING!5e1!3m2!1svi!2s!4v1779781889609!5m2!1svi!2s"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-1">
                <div>
                  <p className="text-sm font-bold text-gray-900">SOL Cafe & Co-working</p>
                  <p className="text-xs text-gray-500 mt-0.5">181 Trần Quốc Vượng, Cầu Giấy, Hà Nội</p>
                </div>
                <RollingButton
                  text="XEM ĐƯỜNG ĐI"
                  color="orange"
                  onClick={() => window.open('https://maps.app.goo.gl/gTtuL2r4HUro2a9a9', '_blank')}
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Section 8: 07 / THẮC MẮC - Accordion FAQ */}
      <section 
        ref={faqRef} 
        id="faq-section" 
        className="py-16 sm:py-28 bg-white border-t border-gray-100"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left side: Header info */}
            <div className="lg:col-span-4">
              {/* Section Marker */}
              <motion.div {...revealProps} className="flex items-center space-x-2.5 mb-6">
                <span className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center text-xs font-mono font-bold">7</span>
                <span className="text-sm font-mono font-bold uppercase tracking-widest text-gray-900">
                  {contentData.faq.sectionId}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2 {...revealProps} className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-gray-900 mb-6 leading-tight">
                {contentData.faq.title}
              </motion.h2>

              <motion.p {...revealProps} className="text-sm text-gray-500 leading-relaxed font-light mb-8 max-w-sm">
                Đừng ngần ngại trang bị cho mình mọi câu trả lời cần thiết trước khi bước vào hành trình lấy lại sự tập trung và làm chủ cuộc sống số.
              </motion.p>
              
              <motion.div {...revealProps} className="hidden lg:block">
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400 block mb-2">HỖ TRỢ THÊM</span>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    Bạn có câu hỏi chuyên sâu khác? Hãy phản hồi trực tiếp với chúng tôi tại hội thảo.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right side: Accordion list */}
            <div className="lg:col-span-8">
              <motion.div {...revealProps} className="divide-y divide-gray-100">
                {contentData.faq.questions.map((item, idx) => {
                  const isOpen = activeFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`py-4 transition-colors duration-300 ${isOpen ? 'bg-transparent' : 'hover:bg-gray-50/30'}`}
                    >
                      <button
                        onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between text-left py-2 font-bold focus:outline-none group cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className={`text-sm sm:text-base pr-4 transition-colors duration-300 ${isOpen ? 'text-[#FF5722]' : 'text-gray-900 group-hover:text-black'}`}>
                          {item.q}
                        </span>
                        <motion.div 
                          animate={{ rotate: isOpen ? 180 : 0 }} 
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className={`flex-shrink-0 p-2 rounded-full transition-colors duration-300 ${isOpen ? 'bg-[#FF5722]/10 text-[#FF5722]' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'}`}
                        >
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.div>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ 
                          height: isOpen ? 'auto' : 0, 
                          opacity: isOpen ? 1 : 0 
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-4 pr-8 text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                          {item.a}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* Elegant Axion-Style Footer */}
      <footer id="app-footer" className="bg-[#000000] text-gray-400 border-t border-neutral-900 py-16 sm:py-20 relative overflow-hidden">
        
        {/* Abstract design elements matching Axion Studio layout */}
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FF5722]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-neutral-900">
            
            {/* Branding segment */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 bg-white text-black font-display font-black text-sm rounded-full flex items-center justify-center">
                  <img src={logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <div className="leading-none text-white">
                  <span className="text-[10px] font-mono text-[#FF5722] block tracking-widest font-bold uppercase">WORKSHOP</span>
                  <span className="text-sm font-bold tracking-tight">FAST DOPAMINE 2026</span>
                </div>
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mt-3">
                Hành trình tìm hiểu và quản lý bản thân trong kỷ nguyên lướt vô tận.
              </p>
            </div>

            {/* Quick Links segment */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-white text-xs font-mono font-bold tracking-widest uppercase">Phân Phối Chương Trình</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => handleScrollTo('nature')} className="hover:text-white transition cursor-pointer">01 / Khái niệm "Mũi tiêm số"</button></li>
                <li><button onClick={() => handleScrollTo('mechanism')} className="hover:text-white transition cursor-pointer">02 / Cân bằng nội môi Stanford</button></li>
                <li><button onClick={() => handleScrollTo('manipulation')} className="hover:text-white transition cursor-pointer">03 / Thuật toán gây nghiện</button></li>
                <li><button onClick={() => handleScrollTo('harm')} className="hover:text-white transition cursor-pointer">04 / Triệu chứng TikTok Brain</button></li>
              </ul>
            </div>

            {/* Event detail logistics block */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-white text-xs font-mono font-bold tracking-widest uppercase text-left">ĐƠN VỊ TỔ CHỨC & BẢO TRỢ</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Được tổ chức bởi YDC - Câu lạc bộ Thanh niên Phát triển Toàn diện
              </p>
              
              <div className="pt-2">
                <span className="inline-flex items-center space-x-1 text-[11px] text-gray-500 font-mono bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Dự án Dopamine 2026</span>
                </span>
              </div>
            </div>

          </div>

          {/* Copyright row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-600">
            <div>
              <p>{contentData.footer.eventName} — {contentData.footer.time}</p>
              <p className="mt-1">{contentData.footer.location}</p>
            </div>
            
            <div>
              <p>{contentData.footer.copyright}</p>
            </div>
          </div>

        </div>
      </footer>

      {/* Popup Quiz component */}
      <PopupQuiz 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        onComplete={() => setIsQuizOpen(false)} 
      />

      {/* Mobile Sliding Bottom Sheet Menu overlay */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onScrollTo={handleScrollTo}
      />

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-[#FF5722] text-white shadow-xl hover:bg-[#e04e1e] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20 select-none ${
          scrolled 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
   <ShibaMascot />
    </div>
  );
}
