import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type Mood = 'happy' | 'worried' | 'shocked' | 'curious' | 'confident' | 'waving';

const SECTION_MOODS: { id: string; mood: Mood }[] = [
  { id: 'header-navbar',   mood: 'happy'     },
  { id: 'nature',          mood: 'worried'   },
  { id: 'manipulation',    mood: 'shocked'   },
  { id: 'harm',            mood: 'worried'   },
  { id: 'mechanism',       mood: 'curious'   },
  { id: 'consequence',     mood: 'shocked'   },
  { id: 'solution',        mood: 'confident' },
];

const MOOD_CONFIG: Record<Mood, { bobSpeed: number; bobAmp: number; tiltZ: number; jumpAmp: number }> = {
  happy:     { bobSpeed: 1.4, bobAmp: 0.06, tiltZ: 0.06, jumpAmp: 0    },
  worried:   { bobSpeed: 2.8, bobAmp: 0.04, tiltZ: 0.12, jumpAmp: 0    },
  shocked:   { bobSpeed: 5.0, bobAmp: 0.02, tiltZ: 0.04, jumpAmp: 0.14 },
  curious:   { bobSpeed: 1.2, bobAmp: 0.05, tiltZ: 0.18, jumpAmp: 0    },
  confident: { bobSpeed: 2.2, bobAmp: 0.08, tiltZ: 0.03, jumpAmp: 0.10 },
  waving:    { bobSpeed: 1.6, bobAmp: 0.07, tiltZ: 0.05, jumpAmp: 0    },
};

function ShibaModel({ mood }: { mood: Mood }) {
  const { scene } = useGLTF('/assets/shiba.glb');
  const groupRef = useRef<THREE.Group>(null);
  const t = useRef(0);
  const currentMood = useRef(mood);
  const targetY = useRef(0);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    currentMood.current = mood;
  }, [mood]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    t.current += delta;
    const cfg = MOOD_CONFIG[currentMood.current];

    const bob = Math.sin(t.current * cfg.bobSpeed) * cfg.bobAmp;
    const jump = currentMood.current === 'shocked' || currentMood.current === 'confident'
      ? Math.abs(Math.sin(t.current * cfg.bobSpeed)) * cfg.jumpAmp
      : 0;

    targetY.current = bob + jump;
    groupRef.current.position.y += (targetY.current - groupRef.current.position.y) * 0.1;
    groupRef.current.rotation.z = Math.sin(t.current * cfg.bobSpeed * 0.5) * cfg.tiltZ;

    if (currentMood.current === 'waving') {
      groupRef.current.rotation.y = Math.sin(t.current * 2) * 0.15;
    } else {
      groupRef.current.rotation.y += (0 - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={[1.8, 1.8, 1.8]} position={[0, -0.8, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function MoodIndicator({ mood }: { mood: Mood }) {
  const icons: Record<Mood, string> = {
    happy:     '😊',
    worried:   '😟',
    shocked:   '😱',
    curious:   '🤔',
    confident: '💪',
    waving:    '👋',
  };
  return (
    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-sm select-none pointer-events-none">
      {icons[mood]}
    </div>
  );
}

export default function ShibaMascot() {
  const [mood, setMood] = useState<Mood>('happy');
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);

      const scrollMid = window.scrollY + window.innerHeight * 0.5;
      let activeMood: Mood = 'happy';

      for (const { id, mood: m } of [...SECTION_MOODS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMid) {
          activeMood = m;
          break;
        }
      }

      // Waving near register section
      const registerEl = document.querySelector('[data-section="register"]') as HTMLElement | null;
      if (registerEl && registerEl.offsetTop <= scrollMid) {
        activeMood = 'waving';
      }

      setMood(activeMood);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.18))' }}
    >
      {!minimized && (
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-b from-[#1a1a2e] to-[#16213e] border-2 border-white/10 cursor-pointer"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
          title="Cuộn xuống"
        >
          <Canvas
            camera={{ position: [0, 0.5, 3.5], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
            style={{ borderRadius: '50%' }}
            shadows
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 3]} intensity={1.2} castShadow />
            <directionalLight position={[-2, 2, -1]} intensity={0.3} color="#aad4ff" />
            <ShibaModel mood={mood} />
          </Canvas>
          <MoodIndicator mood={mood} />
        </div>
      )}

      <button
        onClick={() => setMinimized(v => !v)}
        className="w-7 h-7 rounded-full bg-black/60 text-white text-xs flex items-center justify-center hover:bg-black/80 transition-all"
        title={minimized ? 'Mở mascot' : 'Thu nhỏ'}
      >
        {minimized ? '🐕' : '×'}
      </button>
    </div>
  );
}

useGLTF.preload('/assets/shiba.glb');
