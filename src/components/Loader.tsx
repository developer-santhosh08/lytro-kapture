import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 1. Enforce a minimum 2-second display time for the loader animation
    const minWait = new Promise(resolve => setTimeout(resolve, 2000));
    
    // 2. Actually wait for all images, videos, and assets to finish downloading
    const assetsLoaded = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve(true);
      } else {
        window.addEventListener('load', () => resolve(true));
      }
    });

    // Only finish when BOTH conditions are met
    Promise.all([minWait, assetsLoaded]).then(() => {
      setDone(true);
      setTimeout(onComplete, 600); // Wait for the exit fade animation
    });
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="bouncing-loader" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
