import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plate, PlateList, CarColor } from '@/types';
import { getListById } from '@/lib/storage';
import { createPlate, generateRandomPlate, getCarColorByIndex, formatRemainingTime } from '@/lib/plateUtils';
import { CarSilhouette } from '@/components/car/CarSilhouette';
import { PlaybackControls } from '@/components/playback/PlaybackControls';
import { SpeedControl } from '@/components/playback/SpeedControl';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Repeat, Home } from 'lucide-react';

interface AnimatedCar {
  id: string;
  plate: Plate;
  color: CarColor;
  startTime: number;
}

const Playback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const listId = searchParams.get('listId');
  const isRandom = searchParams.get('random') === 'true';

  const [plates, setPlates] = useState<Plate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isInfinite, setIsInfinite] = useState(true);
  const [repeatCurrent, setRepeatCurrent] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(4);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [visibleCars, setVisibleCars] = useState<AnimatedCar[]>([]);
  const [remainingTime, setRemainingTime] = useState(0);

  // Refs to avoid dependency loops
  const carColorIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const [animationSpeed, setAnimationSpeed] = useState(8.5); // seconds for car to cross screen

  // Load plates
  useEffect(() => {
    if (listId) {
      const list = getListById(listId);
      if (list && list.plates.length > 0) {
        setPlates(list.plates);
        setIntervalSeconds(list.intervalSeconds);
      } else {
        navigate('/lists');
      }
    } else if (isRandom) {
      // Generate random plates for random mode
      const randomPlates = Array.from({ length: 10 }, () => createPlate(generateRandomPlate()));
      setPlates(randomPlates);
    } else {
      navigate('/');
    }
  }, [listId, isRandom, navigate]);

  // Show car animation
  const showCar = useCallback(
    (plate: Plate) => {
      const car: AnimatedCar = {
        id: `${plate.id}-${Date.now()}`,
        plate,
        color: getCarColorByIndex(carColorIndexRef.current),
        startTime: Date.now(),
      };

      carColorIndexRef.current += 1;

      setVisibleCars((prev) => [...prev, car]);

      // Remove car after animation
      setTimeout(() => {
        setVisibleCars((prev) => prev.filter((c) => c.id !== car.id));
      }, animationSpeed * 1000);
    },
    [animationSpeed],
  );

  // Move to next plate
  const nextPlate = useCallback(() => {
    if (plates.length === 0) return;

    if (repeatCurrent) {
      showCar(plates[currentIndex]);
      return;
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex >= plates.length) {
      if (isInfinite) {
        setCurrentIndex(0);
      } else {
        setIsPlaying(false);
        setShowEndDialog(true);
      }
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [plates, currentIndex, isInfinite, repeatCurrent, showCar]);

  // Start the playback cycle
  const startCycle = useCallback(() => {
    if (plates.length === 0) return;

    // Clear existing timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    // Show current car immediately
    showCar(plates[currentIndex]);

    // Calculate delay (considering paused time)
    const delay = pausedTimeRef.current > 0 ? pausedTimeRef.current : intervalSeconds * 1000;

    pausedTimeRef.current = 0;
    setRemainingTime(delay / 1000);

    // Start countdown
    countdownRef.current = setInterval(() => {
      setRemainingTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    // Schedule next plate
    timerRef.current = setTimeout(() => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      nextPlate();
    }, delay);
  }, [plates, currentIndex, intervalSeconds, showCar, nextPlate]);

  // Handle play state changes
  useEffect(() => {
    if (isPlaying && !isPaused && plates.length > 0) {
      startCycle();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [isPlaying, isPaused, currentIndex, startCycle]);

  // Handle next plate trigger
  useEffect(() => {
    // This handles the cycle continuation
  }, []);

  const handlePlayPause = () => {
    if (isPaused) {
      // Resume
      setIsPaused(false);
    } else {
      // Pause
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      pausedTimeRef.current = remainingTime * 1000;
      setIsPaused(true);
    }
  };

  const handleRestart = () => {
    pausedTimeRef.current = 0;
    setVisibleCars([]);
    setCurrentIndex(0);
    setIsPaused(false);
    setIsPlaying(true);
    carColorIndexRef.current = 0;
    setShowEndDialog(false);
  };

  const handleNext = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    pausedTimeRef.current = 0;
    nextPlate();
  };

  const handleToggleInfinite = () => {
    setIsInfinite((prev) => !prev);
  };

  const handleToggleRepeat = () => {
    setRepeatCurrent((prev) => !prev);
  };

  const handleExit = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    navigate('/');
  };

  const handleEndRepeat = () => {
    setShowEndDialog(false);
    handleRestart();
  };

  const handleEndExit = () => {
    setShowEndDialog(false);
    handleExit();
  };

  return (
    <div className="min-h-screen bg-background highway-bg overflow-hidden relative">
      {/* Highway road effect - more lines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Side solid lines */}
        <div className="absolute left-[5%] top-0 bottom-0 w-1 bg-highway-line/40" />
        <div className="absolute right-[5%] top-0 bottom-0 w-1 bg-highway-line/40" />
        {/* Dashed center lines */}

        {/* Inner lane markers */}
        <div className="absolute left-[15%] top-0 bottom-0 w-0.5 bg-highway-line/20" />
        <div className="absolute right-[15%] top-0 bottom-0 w-0.5 bg-highway-line/20" />
      </div>

      {/* Animated cars */}
      {/* Animated cars - Instant Pause via CSS */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {visibleCars.map((car) => (
          <div
            key={car.id}
            className="absolute left-1/2 -translate-x-1/2 w-[850px] animate-drive "
            onAnimationEnd={() => {
              setVisibleCars((prev) => prev.filter((c) => c.id !== car.id));
            }}
            style={{
              top: '50%', // Starting point before animation transform takes over
              animationDuration: `${animationSpeed}s`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            <CarSilhouette color={car.color} plateValue={car.plate.value} />
          </div>
        ))}
      </div>

      {/* Top info bar - Moved to Top Left */}
      <div className="absolute top-4 left-4 z-30 pointer-events-auto">
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-center gap-2">
            <div className="glass-card rounded-lg px-4 py-2">
              <span className="text-sm text-muted-foreground">Plate</span>
              <p className="font-display font-bold text-foreground">
                {currentIndex + 1} / {plates.length}
              </p>
            </div>

            <div className="glass-card rounded-lg px-4 py-2 text-center">
              <span className="text-sm text-muted-foreground">Next in</span>
              <p className="font-display font-bold text-primary text-xl">{isPaused ? '⏸' : formatRemainingTime(remainingTime)}</p>
            </div>
          </div>

          {/* Speed control */}
          <SpeedControl value={intervalSeconds} onChange={setIntervalSeconds} animationSpeed={animationSpeed} onAnimationSpeedChange={setAnimationSpeed} />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-4 right-4 z-30">
        <div className="max-w-lg mx-auto glass-card rounded-2xl p-4">
          <PlaybackControls
            isPlaying={isPlaying}
            isPaused={isPaused}
            isInfinite={isInfinite}
            repeatCurrent={repeatCurrent}
            onPlayPause={handlePlayPause}
            onRestart={handleRestart}
            onToggleInfinite={handleToggleInfinite}
            onNext={handleNext}
            onToggleRepeat={handleToggleRepeat}
            onExit={handleExit}
          />
        </div>
      </div>

      {/* End dialog */}
      <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display">All Plates Completed!</DialogTitle>
            <DialogDescription>You've gone through all {plates.length} plates. What would you like to do?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:gap-3">
            <Button variant="outline" onClick={handleEndExit} className="flex-1">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
            <Button onClick={handleEndRepeat} className="flex-1 bg-accent text-accent-foreground">
              <Repeat className="h-4 w-4 mr-2" />
              Repeat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Playback;
