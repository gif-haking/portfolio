import { motion, useAnimationControls } from 'motion/react';
import { useEffect, useState } from 'react';

export function AnimatedItem({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const controls = useAnimationControls();
  const [shouldAnimate] = useState(() => !sessionStorage.getItem('visited'));

  useEffect(() => {
    if (!shouldAnimate) {
      controls.set({ opacity: 1, y: 0, filter: 'blur(0px)' });
      return;
    }

    const handler = () => {
      controls.set({ opacity: 0, y: 10, filter: 'blur(3px)' });
      controls.start({ 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        transition: { type: 'tween', duration: 0.5, ease: 'easeOut', delay } 
      });
    };

    handler();
    document.addEventListener('astro:page-load', handler);
    return () => document.removeEventListener('astro:page-load', handler);
  }, []);

  return (
    <motion.div
      animate={controls}
      style={{ opacity: shouldAnimate ? 0 : 1, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

export default function HomeAnimation({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    sessionStorage.setItem('visited', 'true');
  }, []);

  return <>{children}</>;
}