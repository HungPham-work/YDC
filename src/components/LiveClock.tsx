import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Ho_Chi_Minh',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        const formatted = formatter.format(new Date());
        
        // Extract HH:MM or HH:MM:SS, prompt specified "Hiển thị HH:MM"
        const [hh, mm] = formatted.split(':');
        setTimeStr(`${hh}:${mm}`);
      } catch (e) {
        // Fallback
        const d = new Date();
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        setTimeStr(`${hh}:${mm}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="live-clock" className="flex items-center space-x-1.5 font-mono text-xs text-gray-500 tracking-wider">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
      <span>HANOI {timeStr}</span>
    </div>
  );
}
