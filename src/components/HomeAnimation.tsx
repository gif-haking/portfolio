import { motion, useAnimationControls } from 'motion/react';
import { useEffect } from 'react';

export function AnimatedItem({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const controls = useAnimationControls();

  useEffect(() => {
    const handler = () => {
      controls.set({ opacity: 0, y: 8, filter: 'blur(4px)' });
      controls.start({ 
  opacity: 1, 
  y: 0, 
  filter: 'blur(0px)', 
  transition: { 
    type: 'tween',
    duration: 0.65,
    ease: 'easeOut',
    delay 
  } 
});
    };

    handler(); // run on mount
    document.addEventListener('astro:page-load', handler);
    return () => document.removeEventListener('astro:page-load', handler);
  }, []);

return (
  <motion.div
    animate={controls}
    style={{ 
      willChange: 'transform, opacity',
      opacity: 0,
      filter: 'blur(4px)',
      transform: 'translateY(8px)'
    }}
  >
    {children}
  </motion.div>
);
}