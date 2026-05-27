import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TARGET = new Date('2026-05-31T08:30:00+07:00');

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function FlipDigit({ digit }: { digit: string }) {
  return (
    <div
      style={{ perspective: '200px' }}
      className="relative w-8 sm:w-10 h-12 sm:h-14 bg-black rounded-lg overflow-hidden flex items-center justify-center"
    >
      <span className="text-2xl sm:text-3xl font-black text-white tabular-nums font-display select-none z-0">
        {digit}
      </span>

      <AnimatePresence>
        <motion.div
          key={digit}
          initial={{ rotateX: -90, opacity: 1 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={
            {
          ...