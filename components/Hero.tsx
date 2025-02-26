"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useTranslation } from "@/components/LanguageSwitch";
// Tilføj en custom hook for viewport størrelse og device detection
const useViewportSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setSize({
        width: width,
        height: window.innerHeight,
      });
      setIsMobile(width < 768); // 768px er standard tablet breakpoint
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return { ...size, isMobile };
};

// Tilføj en type for AnimatedText
interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  className = "",
}) => {
  return (
    <span className="relative inline-block overflow-hidden">
      <motion.span
        className={`relative inline-block ${className}`}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {text}
      </motion.span>
    </span>
  );
};

// Forbedret loading animation
const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        <div className="relative">
          {/* Ydre ring */}
          <motion.div
            className="absolute inset-0 w-32 h-32 rounded-full border-2 border-primary/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Roterende ring */}
          <motion.div
            className="w-32 h-32 rounded-full border-b-2 border-primary"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Indre pulserende cirkel */}
          <motion.div
            className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-primary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Loading tekst */}
        <motion.div className="space-y-2">
          <motion.span
            className="block text-2xl font-light text-white/90"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Indlæser
          </motion.span>
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-2 h-2 rounded-full bg-primary"
                animate={{
                  y: ["0%", "-50%", "0%"],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const HeroTitle = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex items-center justify-center ">
        <AnimatedText
          text={t("hero.greeting")}
          className="text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-700"
        />
      </div>
      <div className="flex items-center justify-center relative">
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-primary/40 via-primary/30 to-transparent blur-xl"
          animate={{
            opacity: [0.6, 0.9, 0.6],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <AnimatedText
          text="Lucas"
          className="text-6xl sm:text-7xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-primary/90 to-gray-300 drop-shadow-[0_0_35px_rgba(0,0,0,0.7)]"
          delay={0.1}
        />
      </div>
      <div className="flex items-center justify-center">
        <AnimatedText
          text={t("hero.role")}
          className="text-xl sm:text-2xl font-medium tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-primary/80 to-gray-500"
          delay={0.2}
        />
      </div>
      <motion.div
        className="flex items-center justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      ></motion.div>
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height, isMobile } = useViewportSize();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    controls.start("visible");

    if (!canvasRef.current || isMobile) return;

    // Scene opsætning
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 1000);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });

    // Opdater renderer størrelse funktion
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Initial størrelse
    handleResize();

    // Lyt efter resize events
    window.addEventListener("resize", handleResize);

    renderer.setClearColor(0x000000, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Forbedret farvegengivelse
    renderer.toneMappingExposure = 1.2; // Lysere og mere levende farver

    // Tekstur loader med fejlhåndtering
    const textureLoader = new THREE.TextureLoader();

    // Opret jorden med teksturer
    const radius = 5;
    const sphereGeometry = new THREE.SphereGeometry(radius, 64, 64);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 25,
      specular: 0x4477aa,
      emissive: 0x112244,
      transparent: true,
      opacity: 0.99,
    });

    const earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(earthMesh);

    // Forbedret atmosfære effekt
    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.12, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Tilføj en ydre glød
    const glowGeometry = new THREE.SphereGeometry(radius * 1.2, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        coefficient: { value: 0.5 },
        power: { value: 2.5 },
        glowColor: { value: new THREE.Color(0x0044ff) },
        viewVector: { value: camera.position },
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormalized = normalize(viewVector);
          intensity = pow(1.0 - abs(dot(vNormal, vNormalized)), 2.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float coefficient;
        uniform float power;
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * pow(intensity, power);
          gl_FragColor = vec4(glow, smoothstep(0.0, 1.0, intensity));
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Forbedret tekstur loading med type sikkerhed
    Promise.all([
      new Promise<THREE.Texture>((resolve) =>
        textureLoader.load(
          "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_atmos_2048.jpg",
          resolve,
          undefined,
          (error) => {
            console.error("Fejl ved indlæsning af tekstur:", error);
            // Fallback tekstur
            const fallbackTexture = new THREE.TextureLoader().load(
              "/earth-fallback.jpg" // Tilføj en lokal fallback tekstur i din public mappe
            );
            resolve(fallbackTexture);
          }
        )
      ),
      new Promise<THREE.Texture>((resolve) =>
        textureLoader.load(
          "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_normal_2048.jpg",
          resolve,
          undefined,
          (error) => {
            console.error("Fejl ved indlæsning af normal map:", error);
            resolve(new THREE.Texture()); // Tom tekstur som fallback
          }
        )
      ),
      new Promise<THREE.Texture>((resolve) =>
        textureLoader.load(
          "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg",
          resolve,
          undefined,
          (error) => {
            console.error("Fejl ved indlæsning af specular map:", error);
            resolve(new THREE.Texture());
          }
        )
      ),
      new Promise<THREE.Texture>((resolve) =>
        textureLoader.load(
          "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_clouds_1024.png",
          resolve,
          undefined,
          (error) => {
            console.error("Fejl ved indlæsning af cloud tekstur:", error);
            resolve(new THREE.Texture());
          }
        )
      ),
    ]).then(([colorMap, normalMap, specularMap, cloudsMap]) => {
      // Tilføj null checks før vi anvender teksturerne
      if (colorMap) sphereMaterial.map = colorMap;
      if (normalMap) {
        sphereMaterial.normalMap = normalMap;
        sphereMaterial.normalScale.set(2, 2);
      }
      if (specularMap) sphereMaterial.specularMap = specularMap;
      sphereMaterial.needsUpdate = true;

      // Kun tilføj skyer hvis cloud teksturen er indlæst
      if (cloudsMap.image) {
        const cloudsGeometry = new THREE.SphereGeometry(radius * 1.01, 96, 96);
        const cloudsMaterial = new THREE.MeshPhongMaterial({
          map: cloudsMap,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
        earthMesh.add(clouds);

        const animateClouds = () => {
          clouds.rotation.y += 0.0002;
          requestAnimationFrame(animateClouds);
        };
        animateClouds();
      }
      setIsLoading(false);
    });

    // Opdater belysning for mere realistisk udseende
    const ambientLight = new THREE.AmbientLight(0x557799, 0.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 3, 5);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x0055ff, 1);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    // Tilføj stjerner i baggrunden
    const createStars = () => {
      const starCount = 1500;
      const starField = new THREE.Group();
      const size = isMobile ? 0.01 : 0.015;

      for (let i = 0; i < starCount; i++) {
        const starMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(
            0.8 + Math.random() * 0.2,
            0.8 + Math.random() * 0.2,
            0.8 + Math.random() * 0.2
          ),
          transparent: true,
          opacity: 0.4 + Math.random() * 0.6,
        });

        const star = new THREE.Mesh(
          new THREE.SphereGeometry(size, 8, 8),
          starMaterial
        );
        const radius = 20 + Math.random() * 80;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        star.position.x = radius * Math.sin(phi) * Math.cos(theta);
        star.position.y = radius * Math.sin(phi) * Math.sin(theta);
        star.position.z = radius * Math.cos(phi);

        star.userData = {
          initialOpacity: starMaterial.opacity,
          blinkSpeed: 0.001 + Math.random() * 0.003,
          blinkOffset: Math.random() * Math.PI * 2,
        };

        starField.add(star);
      }
      return starField;
    };

    const stars = createStars();
    scene.add(stars);

    // Juster disse værdier for bedre zoom og timing
    const cameraSettings = {
      startDistance: 18, // Længere start distance
      endDistance: 11, // Længere slut distance for at se mere af jorden
      initialFov: isMobile ? 60 : 45,
      zoomFov: isMobile ? 50 : 40,
    };

    const timings = {
      rotation: isMobile ? 8000 : 10000,
      zoom: isMobile ? 7000 : 9000, // Længere zoom duration for blødere overgang
      delay: isMobile ? 3000 : 4000,
    };

    // Flyt OrbitControls setup før animate funktionen
    const controlsOrbit = new OrbitControls(camera, renderer.domElement);
    controlsOrbit.enableDamping = true;
    controlsOrbit.dampingFactor = 0.05;
    controlsOrbit.rotateSpeed = 0.4;
    controlsOrbit.enableZoom = false;
    controlsOrbit.autoRotate = true;
    controlsOrbit.autoRotateSpeed = 0.15;
    controlsOrbit.enablePan = false;
    controlsOrbit.minPolarAngle = Math.PI * 0.3;
    controlsOrbit.maxPolarAngle = Math.PI * 0.7;

    // Opdater initial kamera position
    camera.position.z = cameraSettings.startDistance;

    // Animation states
    let phase = "rotating";
    let startTime = Date.now();

    // Forbedret easing funktion
    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const animateStars = (stars: THREE.Group) => {
      stars.children.forEach((object) => {
        if (object instanceof THREE.Mesh) {
          const material = object.material as THREE.MeshBasicMaterial;
          const userData = object.userData as {
            initialOpacity: number;
            blinkSpeed: number;
            blinkOffset: number;
          };
          material.opacity =
            userData.initialOpacity *
            (0.7 +
              0.3 *
                Math.sin(
                  Date.now() * userData.blinkSpeed + userData.blinkOffset
                ));
        }
      });
    };

    // Tilføj markør ved Kalundborg først (før animate funktionen)
    const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const markerMaterial = new THREE.MeshPhongMaterial({
      color: 0xff3333,
      emissive: 0xff0000,
      emissiveIntensity: 0.5,
    });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);

    // Pulse animation for markøren
    const pulseGeometry = new THREE.SphereGeometry(0.03, 16, 16);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3333,
      transparent: true,
      opacity: 0.3,
    });
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);

    // Kalundborg koordinater og konvertering til 3D position
    const lat = 55.676162;
    const lon = 11.099626;

    // Konverter til radianer
    const latRad = (90 - lat) * (Math.PI / 180);
    const lonRad = (lon + 180) * (Math.PI / 180);

    // Beregn target position
    const targetPosition = new THREE.Vector3(
      -radius * Math.sin(latRad) * Math.cos(lonRad),
      radius * Math.cos(latRad),
      radius * Math.sin(latRad) * Math.sin(lonRad)
    );

    // Placer markør og pulse ved Kalundborg
    const markerPosition = targetPosition.clone().multiplyScalar(1.01);
    marker.position.copy(markerPosition);
    pulse.position.copy(markerPosition);
    earthMesh.add(marker);
    earthMesh.add(pulse);

    // Dag/nat cycle setup
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Derefter animate funktionen
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (phase === "rotating") {
        earthMesh.rotation.y += 0.0003; // Langsommere rotation

        if (elapsed > timings.rotation) {
          phase = "zooming";
          controlsOrbit.autoRotate = false;
        }
      }

      if (phase === "zooming") {
        const progress = Math.min(
          (elapsed - timings.rotation) / timings.zoom,
          1
        );
        const smoothProgress = easeOutQuart(progress);

        // Blødere kamera bevægelse
        const zoomDistance =
          cameraSettings.endDistance +
          (cameraSettings.startDistance - cameraSettings.endDistance) *
            (1 - smoothProgress);

        const targetZoomPosition = targetPosition
          .clone()
          .normalize()
          .multiplyScalar(zoomDistance);

        // Endnu blødere lerp
        camera.position.lerp(targetZoomPosition, 0.008);

        // Dynamisk FOV under zoom
        camera.fov =
          cameraSettings.initialFov +
          (cameraSettings.zoomFov - cameraSettings.initialFov) * smoothProgress;
        camera.updateProjectionMatrix();

        const lookAtPos = targetPosition.clone();
        camera.lookAt(lookAtPos);
        controlsOrbit.target.lerp(lookAtPos, 0.008);
      }

      // Blødere pulse animation
      const pulseScale = 1 + 0.03 * Math.sin(currentTime * 0.0006);
      pulse.scale.setScalar(pulseScale);
      pulseMaterial.opacity = 0.08 + 0.04 * Math.sin(currentTime * 0.0006);

      // Blødere dag/nat cycle
      const dayTime = (currentTime * 0.00015) % (Math.PI * 2);
      sunLight.position.x = Math.cos(dayTime) * 5;
      sunLight.position.z = Math.sin(dayTime) * 5;

      const dayIntensity = (Math.sin(dayTime) + 1) * 0.5;
      ambientLight.intensity = 0.2 + dayIntensity * 0.15;

      animateStars(stars);

      controlsOrbit.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup - fjernet ubrugte scroll handlers
    return () => {
      window.removeEventListener("resize", handleResize);
      controlsOrbit.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, [isMobile]);

  // Forbedret loading håndtering
  useEffect(() => {
    const minLoadingTime = 2000; // Øget til 2 sekunder for en mere poleret oplevelse
    const startTime = Date.now();

    const loadTextures = async () => {
      try {
        // Load teksturer i baggrunden
        await Promise.all([
          // ... dine texture loading promises
        ]);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

        // Smooth fade out af loading screen
        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      } catch (error) {
        console.error("Fejl ved indlæsning:", error);
        setIsLoading(false);
      }
    };

    loadTextures();
  }, []);

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      <motion.section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black via-primary/5 to-black"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />

        {/* Main Content Container */}
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl w-full mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 1 }}
              className="space-y-8 sm:space-y-12 flex flex-col items-center"
            >
              <HeroTitle />

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="pt-4 sm:pt-8 flex flex-col items-center"
              >
                <motion.a
                  href="#about"
                  className="inline-flex flex-col items-center gap-2 sm:gap-3"
                  whileHover="hover"
                >
                  <motion.span
                    className="text-base sm:text-lg text-gray-400"
                    variants={{
                      hover: {
                        color: "#fff",
                        y: -2,
                        transition: { duration: 0.2 },
                      },
                    }}
                  >
                    {t("hero.learnMore")}
                  </motion.span>
                  <motion.div
                    className="relative w-6 h-6 sm:w-8 sm:h-8"
                    animate={{
                      y: [0, 5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.span
                      className="absolute inset-0 text-primary text-xl sm:text-2xl"
                      variants={{
                        hover: {
                          scale: 1.2,
                          transition: { duration: 0.2 },
                        },
                      }}
                    >
                      ↓
                    </motion.span>
                  </motion.div>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Canvas Container */}
        {!isMobile && (
          <div className="absolute inset-0 -z-10">
            <canvas
              ref={canvasRef}
              className={`w-full h-full transition-opacity duration-1500 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        )}

        {/* Mobile Background */}
        {isMobile && (
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-50" />
          </motion.div>
        )}
      </motion.section>
    </>
  );
}
