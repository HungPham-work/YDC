import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logo from './assets/logo.png';
import CountdownTimer from './components/CountdownTimer';
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
  const [scrollProgress, setScrollProgres...