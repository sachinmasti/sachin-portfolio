"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { useScroll } from "framer-motion";

function StarField({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 50 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = 0.05 + Math.random() * 0.2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.002;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.12} color="#ffffff" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function MilkyWay() {
  const ref = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const particleData = useMemo(() => {
    const count = 12000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const armCount = 2;
    for (let i = 0; i < count; i++) {
      const isArm = Math.random() < 0.65;
      const isDust = !isArm && Math.random() < 0.5;

      let r: number, angle: number, y: number;
      const coreBias = Math.pow(Math.random(), 2);
      const radius = coreBias * 16;

      if (isArm) {
        const armOffset = Math.floor(Math.random() * armCount) * Math.PI;
        const scatter = 0.08 + radius * 0.04;
        angle = radius * 0.6 + armOffset + (Math.random() - 0.5) * scatter * 2;
        y = (Math.random() - 0.5) * (0.1 + radius * 0.02);
      } else if (isDust) {
        angle = Math.random() * Math.PI * 2;
        y = (Math.random() - 0.5) * 0.8;
      } else {
        angle = Math.random() * Math.PI * 2;
        y = (Math.random() - 0.5) * (0.2 + radius * 0.04);
      }

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      if (radius < 1.5) {
        const bright = 0.7 + Math.random() * 0.3;
        colors[i * 3] = bright; colors[i * 3 + 1] = bright * 0.85; colors[i * 3 + 2] = bright * 0.7;
      } else if (radius < 3) {
        const t2 = (radius - 1.5) / 1.5;
        colors[i * 3] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.2 - t2 * 0.2;
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.1 - t2 * 0.3;
      } else {
        const starType = Math.random();
        if (starType < 0.5) {
          colors[i * 3] = 0.7 + Math.random() * 0.3;
          colors[i * 3 + 1] = 0.5 + Math.random() * 0.3;
          colors[i * 3 + 2] = 0.3 + Math.random() * 0.2;
        } else if (starType < 0.8) {
          colors[i * 3] = 0.6 + Math.random() * 0.3;
          colors[i * 3 + 1] = 0.6 + Math.random() * 0.3;
          colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
        } else {
          colors[i * 3] = 1;
          colors[i * 3 + 1] = 1;
          colors[i * 3 + 2] = 1;
        }
      }
    }
    return { positions, colors };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(particleData.positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(particleData.colors, 3));
    return g;
  }, [particleData]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
  });

  return (
    <group>
      <points ref={ref} geometry={geo}>
        <pointsMaterial size={0.08} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#ffddaa" />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#ffcc88" transparent opacity={0.15} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial color="#ffaa66" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.1; });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.8, 32, 32]} />
      <meshBasicMaterial color="#ffb829" />
      <pointLight intensity={2} distance={20} color="#ffb829" />
    </mesh>
  );
}

function Planet({ radius, distance, speed, color, tilt = 0 }: { radius: number; distance: number; speed: number; color: string; tilt?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += delta * speed;
    if (ref.current) ref.current.rotation.y += delta * (speed * 1.5);
  });
  return (
    <group ref={orbitRef}>
      <mesh ref={ref} position={[distance, 0, 0]} rotation={[tilt, 0, 0]}>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
}

function OrbitRing({ distance }: { distance: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const ring = new THREE.RingGeometry(distance - 0.02, distance + 0.02, 64);
    const pos = ring.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      pos.setY(i, 0);
    }
    pos.needsUpdate = true;
    ring.computeVertexNormals();
    return ring;
  }, [distance]);

  return (
    <mesh ref={ref} geometry={geo} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial color="white" transparent opacity={0.08} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function SolarSystem() {
  const planets = useMemo(() => [
    { radius: 0.15, distance: 2.8, speed: 0.5, color: "#9a9a9a" },
    { radius: 0.22, distance: 4.0, speed: 0.35, color: "#e8c97a" },
    { radius: 0.25, distance: 5.5, speed: 0.25, color: "#4fc3f7" },
    { radius: 0.18, distance: 7.0, speed: 0.2, color: "#d32f2f" },
    { radius: 0.45, distance: 9.0, speed: 0.15, color: "#e0c9a6" },
    { radius: 0.4, distance: 11.0, speed: 0.1, color: "#e8d5a3" },
  ], []);

  const distances = planets.map(p => p.distance);

  return (
    <group>
      <Sun />
      {distances.map((d) => <OrbitRing key={d} distance={d} />)}
      {planets.map((p, i) => <Planet key={i} {...p} />)}
    </group>
  );
}

function Earth() {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const textureRef = useRef<THREE.Texture | null>(null);

  const geo = useMemo(() => new THREE.SphereGeometry(1.5, 64, 64), []);

  const material = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({ color: "#4fc3f7" });
    const loader = new THREE.TextureLoader();
    loader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
      (tex) => {
        mat.map = tex;
        mat.color.set("#ffffff");
        mat.needsUpdate = true;
        textureRef.current = tex;
      },
      undefined,
      () => {
        mat.color.set("#4fc3f7");
        mat.needsUpdate = true;
      }
    );
    return mat;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
    if (glowRef.current) {
      glowRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.65, 32, 32]} />
        <meshBasicMaterial color="#4fc3f7" transparent opacity={0.08} />
      </mesh>
      <mesh ref={ref} geometry={geo} material={material} />
      <pointLight distance={8} intensity={1.5} color="#4fc3f7" />
    </group>
  );
}

const STAGES = [
  { label: "galaxy", camPos: [0, 3, 22], camTarget: [0, 0, 0] },
  { label: "solar", camPos: [0, 8, 18], camTarget: [0, 0, 0] },
  { label: "approach", camPos: [0, 0, 7], camTarget: [0, 0, 0] },
  { label: "earth", camPos: [2.5, 0.5, 3.5], camTarget: [0, 0, 0] },
];

function JourneyScene() {
  const { camera } = useThree();
  const { scrollYProgress } = useScroll();
  const galaxyRef = useRef<THREE.Group>(null);
  const solarRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const rawProgress = scrollYProgress.get();
    const totalStages = STAGES.length;
    const currentStage = Math.min(totalStages - 1, Math.floor(rawProgress * totalStages));
    const stageProgress = (rawProgress * totalStages) % 1;

    const current = STAGES[currentStage];
    const next = STAGES[Math.min(totalStages - 1, currentStage + 1)];

    const ease = stageProgress < 0.5
      ? 2 * stageProgress * stageProgress
      : 1 - Math.pow(-2 * stageProgress + 2, 2) / 2;

    camera.position.lerpVectors(
      new THREE.Vector3(current.camPos[0], current.camPos[1], current.camPos[2]),
      new THREE.Vector3(next.camPos[0], next.camPos[1], next.camPos[2]),
      ease
    );
    camera.lookAt(
      current.camTarget[0] + (next.camTarget[0] - current.camTarget[0]) * ease,
      current.camTarget[1] + (next.camTarget[1] - current.camTarget[1]) * ease,
      current.camTarget[2] + (next.camTarget[2] - current.camTarget[2]) * ease
    );

    if (galaxyRef.current) galaxyRef.current.visible = currentStage <= 0;
    if (solarRef.current) solarRef.current.visible = currentStage >= 1 && currentStage <= 1;
    if (earthRef.current) earthRef.current.visible = currentStage >= 2;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <group scale={0.8}>
        <group ref={galaxyRef}><MilkyWay /></group>
        <group ref={solarRef}><SolarSystem /></group>
        <group ref={earthRef}><Earth /></group>
      </group>
      <StarField />
    </>
  );
}

export const CosmicJourney = memo(function CosmicJourney() {
  return (
    <div className="fixed inset-0 z-0 bg-void">
      <Canvas
        camera={{ position: [0, 3, 22], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <JourneyScene />
      </Canvas>
    </div>
  );
});
