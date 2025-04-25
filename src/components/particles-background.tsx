"use client";

import React, { useCallback, useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // Import the slim preset
import { useTheme } from 'next-themes';

const ParticlesBackground = () => {
  const [init, setInit] = React.useState(false);
  const { theme } = useTheme();

  // Initialize particles engine
  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // console.log("Particles loaded", container); // Optional: log when particles are loaded
  }, []);

  const options: ISourceOptions = useMemo(() => {
    const lineColor = theme === 'dark' ? "#ffffff" : "#334155"; // White for dark, slate-700 for light
    const particleColor = theme === 'dark' ? "#ffffff" : "#0f172a"; // White for dark, slate-900 for light

    return {
      background: {
        color: {
          value: "transparent", // Make background transparent
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab", // Change mode to grab for a different effect
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          grab: {
             distance: 140,
             links: {
               opacity: 0.7 // Make grab lines more visible
             }
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          color: lineColor,
          distance: 150,
          enable: true,
          opacity: 0.2, // Reduced opacity for subtlety
          width: 1,
        },
        collisions: {
           enable: false, // Disable collisions for smoother flow
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce", // Make particles bounce off edges
          },
          random: true, // More random movement
          speed: 0.5, // Slower speed
          straight: false,
        },
        number: {
          density: {
            enable: true,
             value_area: 800 // standard density
          },
          value: 80, // Number of particles
        },
        opacity: {
          value: 0.3, // Reduced opacity for subtlety
           animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
              sync: false,
           }
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 }, // Slightly larger particles
          animation: {
             enable: true,
             speed: 2,
             minimumValue: 1,
             sync: false
          }
        },
      },
      detectRetina: true,
    };
  }, [theme]); // Recompute options when theme changes

  if (!init) {
    return null; // Don't render anything until initialized
  }

  return (
     <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 z-0" // Ensure it stays in the background
     />
  );
};

export default ParticlesBackground;
