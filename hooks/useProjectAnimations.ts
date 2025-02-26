import { useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion';

const useProjectAnimations = (containerRef: React.RefObject<HTMLElement>, contentRef: React.RefObject<HTMLElement>, projectCount: number) => {
  const [scrollRange, setScrollRange] = useState(0);
  const currentIndex = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Beregn dimensioner
  useEffect(() => {
    if (!contentRef.current) return;
    
    const calculateScrollRange = () => {
      const windowWidth = window.innerWidth;
      const totalWidth = windowWidth * projectCount;
      setScrollRange(totalWidth);
    };

    calculateScrollRange();
    window.addEventListener('resize', calculateScrollRange);
    return () => window.removeEventListener('resize', calculateScrollRange);
  }, [contentRef, projectCount]);

  // Scroll til specifikt projekt
  const scrollToProject = (index: number) => {
    const targetX = (-scrollRange / projectCount) * index;
    animate(dragX, targetX, {
      type: "spring",
      stiffness: 260,
      damping: 25
    });
    currentIndex.set(index);
  };

  // Håndter keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const index = currentIndex.get();
      if (e.key === "ArrowRight" && index < projectCount - 1) {
        scrollToProject(index + 1);
      } else if (e.key === "ArrowLeft" && index > 0) {
        scrollToProject(index - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projectCount]);

  // Håndter wheel events for horisontal scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      
      const index = currentIndex.get();
      if (e.deltaY > 50 && index < projectCount - 1) {
        scrollToProject(index + 1);
      } else if (e.deltaY < -50 && index > 0) {
        scrollToProject(index - 1);
      }
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
      return () => element.removeEventListener('wheel', handleWheel);
    }
  }, [projectCount]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  
  const snapPoints = Array.from({ length: projectCount }, (_, i) => 
    (-scrollRange / projectCount) * i
  );

  const snappedX = useTransform(dragX, (latest) => {
    if (isDragging) return latest;
    const distances = snapPoints.map(point => Math.abs(point - latest));
    const closestIndex = distances.indexOf(Math.min(...distances));
    currentIndex.set(closestIndex);
    return snapPoints[closestIndex];
  });

  const smoothX = useSpring(snappedX, {
    damping: 20,
    stiffness: 100,
    mass: 0.5
  });

  return { 
    smoothX,
    currentIndex: currentIndex.get(),
    progress: scrollYProgress,
    scrollToProject,
    isDragging,
    setIsDragging,
    dragX
  };
};

export default useProjectAnimations; 