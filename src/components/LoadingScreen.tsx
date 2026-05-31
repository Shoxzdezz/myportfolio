import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const letters = ['S', 'h', 'o', 'x', 'j', 'a', 'x', 'o', 'n'];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleLetters, setVisibleLetters] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Animate letters appearing one by one
    letters.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLetters((prev) => [...prev, index]);
      }, 150 * (index + 1));
    });

    // Mark as complete after all letters appear
    setTimeout(() => {
      setIsComplete(true);
    }, 150 * letters.length + 500);

    // Hide loading screen
    setTimeout(() => {
      setIsLoading(false);
    }, 150 * letters.length + 1200);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
            />
          </div>

          {/* Name Assembly Animation */}
          <motion.div
            className="relative z-10 flex items-center justify-center"
            animate={isComplete ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    y: -50,
                    rotateX: -90,
                    scale: 0.5
                  }}
                  animate={
                    visibleLetters.includes(index)
                      ? { 
                          opacity: 1, 
                          y: 0,
                          rotateX: 0,
                          scale: 1
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.4,
                    ease: 'backOut',
                  }}
                  className={`text-5xl md:text-7xl lg:text-8xl font-display font-bold ${
                    isComplete ? 'text-gradient' : 'text-foreground'
                  }`}
                  style={{
                    display: 'inline-block',
                    textShadow: isComplete ? '0 0 30px hsl(var(--primary) / 0.5)' : 'none',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Subtitle that appears after name is complete */}
          <AnimatePresence>
            {isComplete && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 mt-6 text-muted-foreground text-lg md:text-xl font-display"
              >
                Frontend Developer
              </motion.p>
            )}
          </AnimatePresence>

          {/* Loading indicator */}
          <motion.div 
            className="relative z-10 flex gap-1 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isComplete ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
                className="w-2 h-2 bg-primary rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
