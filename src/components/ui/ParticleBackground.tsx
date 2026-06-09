"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { useScrollSection } from "@/hooks/useScrollSection";
import { SHAPE_GENERATORS } from "./particleShapes";

const SHAPE_COUNT = 4;
const PARTICLE_COUNT = 4000;
const MORPH_SPEED = 0.025;
const PALETTE = [
  new THREE.Color("#8052ff"),
  new THREE.Color("#ffb829"),
  new THREE.Color("#15846e"),
  new THREE.Color("#ffffff")
];

const SECTION_IDS = [
  "#home", "#about", "#story", "#skills",
  "#projects", "#github", "#blog", "#contact"
];

const SECTION_TINTS = [
  new THREE.Color("#8052ff"),
  new THREE.Color("#ffb829"),
  new THREE.Color("#15846e"),
  new THREE.Color("#8052ff"),
  new THREE.Color("#9173e4"),
  new THREE.Color("#15846e"),
  new THREE.Color("#ffb829"),
  new THREE.Color("#8052ff")
];

function createSpriteSheet(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";

  const shapes: Array<(x: number, y: number, s: number) => void> = [
    (x, y, s) => {
      ctx.beginPath();
      ctx.moveTo(x + s / 2, y);
      ctx.lineTo(x + s, y + s);
      ctx.lineTo(x, y + s);
      ctx.closePath();
      ctx.fill();
    },
    (x, y, s) => {
      ctx.beginPath();
      ctx.arc(x + s / 2, y + s / 2, s / 2, 0, Math.PI * 2);
      ctx.fill();
    },
    (x, y, s) => {
      ctx.beginPath();
      ctx.moveTo(x + s / 2, y);
      ctx.lineTo(x + s, y + s / 2);
      ctx.lineTo(x + s / 2, y + s);
      ctx.lineTo(x, y + s / 2);
      ctx.closePath();
      ctx.fill();
    },
    (x, y, s) => {
      ctx.fillRect(x, y, s, s);
    }
  ];

  shapes.forEach((draw, i) => draw(i * 32 + 4, 4, 24));

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

const VERTEX_SHADER = `
  attribute float aShapeIndex;
  attribute vec3 aColor;
  uniform vec3 uTint;
  varying float vShapeIndex;
  varying vec3 vColor;

  void main() {
    vShapeIndex = aShapeIndex;
    vColor = mix(aColor, uTint, 0.25);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = (0.05 + 0.03 * aShapeIndex) * (380.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uSprite;
  varying float vShapeIndex;
  varying vec3 vColor;

  void main() {
    float u = gl_PointCoord.x * 0.25 + vShapeIndex * 0.25;
    float v = gl_PointCoord.y;
    vec4 texel = texture2D(uSprite, vec2(u, v));
    gl_FragColor = vec4(vColor, texel.a * 0.85);
  }
`;

function generateShapePositions(): Float32Array[] {
  return SHAPE_GENERATORS.map((gen) => gen(PARTICLE_COUNT));
}

function generateParticleData() {
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const shapeIndices = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    shapeIndices[i] = Math.floor(Math.random() * SHAPE_COUNT);
  }

  return { colors, shapeIndices };
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const sectionInfo = useScrollSection(SECTION_IDS);
  const currentTargetRef = useRef(0);
  const lerpFactorRef = useRef(MORPH_SPEED);
  const tintRef = useRef(new THREE.Color("#8052ff"));

  const allShapes = useMemo(() => generateShapePositions(), []);

  const geometry = useMemo(() => {
    const { colors, shapeIndices } = generateParticleData();
    const startPos = allShapes[0].slice();
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(startPos, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aShapeIndex", new THREE.BufferAttribute(shapeIndices, 1));
    return geo;
  }, [allShapes]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uSprite: { value: createSpriteSheet() },
        uTint: { value: new THREE.Color("#8052ff") }
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const t = state.clock.elapsedTime;

    const targetTint = SECTION_TINTS[sectionInfo.index];
    tintRef.current.lerp(targetTint, 0.03);
    material.uniforms.uTint.value.copy(tintRef.current);

    const posAttr = pointsRef.current.geometry.getAttribute("position");
    const currentPos = posAttr.array as Float32Array;
    const targetShapeIdx = sectionInfo.index;

    if (targetShapeIdx !== currentTargetRef.current) {
      currentTargetRef.current = targetShapeIdx;
      lerpFactorRef.current = MORPH_SPEED;
    }

    const targetPos = allShapes[targetShapeIdx];
    let maxDiff = 0;
    for (let i = 0; i < currentPos.length; i++) {
      const diff = targetPos[i] - currentPos[i];
      currentPos[i] += diff * lerpFactorRef.current;
      const absDiff = Math.abs(diff);
      if (absDiff > maxDiff) maxDiff = absDiff;
    }

    if (maxDiff < 0.15 && lerpFactorRef.current < 0.08) {
      lerpFactorRef.current = Math.min(0.08, lerpFactorRef.current + 0.002);
    }

    posAttr.needsUpdate = true;

    const group = pointsRef.current;
    group.rotation.y = t * 0.03 + mouse.x * 0.4;
    group.rotation.x = mouse.y * 0.2 + Math.sin(t * 0.02) * 0.04;
    group.rotation.z = Math.sin(t * 0.012) * 0.03;

    const breathe = 1 + Math.sin(t * 0.1) * 0.03;
    group.scale.setScalar(breathe);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

export const ParticleBackground = memo(function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-void">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 65 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
});
