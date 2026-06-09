export function generateBrain(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const side = Math.random() > 0.5 ? 1 : -1;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.5 + Math.sin(t * 30) * 0.6;
    const lobeX = Math.abs(Math.cos(theta)) * side * 2.5;
    const x = lobeX + Math.sin(phi) * r * 0.6;
    const y = Math.sin(phi) * Math.cos(theta) * r * 0.8 + Math.sin(t * 15) * 0.5;
    const z = Math.cos(phi) * r * 0.7 + Math.sin(t * 20) * 0.4 - 3;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
  }
  return pos;
}

export function generateFlower(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const petals = 7;
    const angle = t * Math.PI * 2 * petals;
    const r = 1 + Math.abs(Math.cos(angle * 0.5)) * 4;
    const spread = 0.5 + t * 2;
    const x = Math.cos(angle * 0.5) * r * spread * 0.5;
    const y = Math.sin(angle * 0.5) * r * spread * 0.5;
    const z = (Math.random() - 0.5) * 2 + Math.sin(t * 10) * 0.5 - 3;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
  }
  return pos;
}

export function generateGalaxy(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const arms = 3;
    const armAngle = t * Math.PI * 2 * arms;
    const radius = t * 8;
    const spread = 0.3 + t * 0.6;
    const x = Math.cos(armAngle) * radius + (Math.random() - 0.5) * spread;
    const y = (Math.random() - 0.5) * spread * 0.4;
    const z = Math.sin(armAngle) * radius * 0.7 + (Math.random() - 0.5) * spread - 3;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
  }
  return pos;
}

export function generateWave(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const x = (Math.random() - 0.5) * 12;
    const z = (Math.random() - 0.5) * 12;
    const dist = Math.sqrt(x * x + z * z);
    const y = Math.sin(dist * 0.8 + t * 4) * 1.5 - 1;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y * 0.6;
    pos[i * 3 + 2] = z - 3;
  }
  return pos;
}

export function generateSphere(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.5 + Math.random() * 2.5;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    const z = r * Math.cos(phi) - 3;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
  }
  return pos;
}

export function generateScatter(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 4 + Math.random() * 12;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.5;
    const z = r * Math.cos(phi) - 3;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
  }
  return pos;
}

export function generateColumn(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const radius = 0.5 + Math.random() * 1.5;
    const angle = Math.random() * Math.PI * 2;
    const height = (t - 0.5) * 8;
    const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
    const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3;
    const y = height * 0.6;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z - 3;
  }
  return pos;
}

export function generateRing(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 2;
    const ringR = 5;
    const tubeR = 1 + Math.random() * 0.5;
    const x = (ringR + tubeR * Math.cos(t * 20)) * Math.cos(angle);
    const y = (ringR + tubeR * Math.cos(t * 20)) * Math.sin(angle) * 0.5;
    const z = tubeR * Math.sin(t * 20) + Math.sin(angle) * 0.5 - 3;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
  }
  return pos;
}

export type ShapeGenerator = (count: number) => Float32Array;

export const SHAPE_GENERATORS: ShapeGenerator[] = [
  generateBrain,
  generateFlower,
  generateGalaxy,
  generateWave,
  generateSphere,
  generateScatter,
  generateColumn,
  generateRing
];

export const SHAPE_NAMES = [
  "brain",
  "flower",
  "galaxy",
  "wave",
  "sphere",
  "scatter",
  "column",
  "ring"
];
