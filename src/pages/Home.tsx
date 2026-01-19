import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, List, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      {/* Header */}
      <header className="p-6 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
            <span className="text-primary">Plates</span> Runner
          </h1>
          <p className="text-muted-foreground text-lg">Queue and display license plates with style</p>
        </motion.div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full max-w-md space-y-6">
          {/* Decorative car */}
          <div className="relative h-80 mb-8">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                <Car className="h-60 w-60 text-primary" strokeWidth={1.5} />
              </div>
            </motion.div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <Button onClick={() => navigate('/lists')} className="w-full h-16 text-lg font-display bg-primary text-primary-foreground hover:bg-primary/90 btn-traffic glow-primary">
              <List className="h-6 w-6 mr-3" />
              My Plate Lists
            </Button>

            <Button
              onClick={() => navigate('/playback?random=true')}
              variant="outline"
              className="w-full h-16 text-lg font-display border-accent text-accent hover:bg-accent/10 btn-traffic"
            >
              <Shuffle className="h-6 w-6 mr-3" />
              Run Random Plates
            </Button>
          </div>

          {/* Features hint */}
          <div className="mt-12 text-center text-sm text-muted-foreground space-y-2">
            <p>• Create custom plate lists with colors</p>
            <p>• Set intervals between cars</p>
            <p>• Watch animated cars pass by</p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-muted-foreground">Plates Runner</footer>
    </div>
  );
};

export default Home;
