import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const COLORS = {
  bg: '#1c121e',
  grid: '#a3cc46',
  topo: '#ff6622',
  frame: '#ff2244',
  text: '#ffea44',
};

function createTextPlane(text: string, colorHex: string, fontSize = 64): THREE.Mesh {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = `bold ${fontSize}px "Courier New", monospace`;
  const metrics = ctx.measureText(text);

  canvas.width = THREE.MathUtils.ceilPowerOfTwo(metrics.width + 20);
  canvas.height = THREE.MathUtils.ceilPowerOfTwo(fontSize + 20);

  ctx.font = `bold ${fontSize}px "Courier New", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = fontSize * 0.04;
  ctx.strokeText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const planeGeo = new THREE.PlaneGeometry(canvas.width / 40, canvas.height / 40);
  const planeMat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(planeGeo, planeMat);
}

export const AbyssalTelemetry: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.bg);
    scene.fog = new THREE.FogExp2(COLORS.bg, 0.02);

    // Camera
    const aspect = width / height;
    const d = 16;
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Post-processing
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.15;
    bloomPass.strength = 1.8;
    bloomPass.radius = 0.6;
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // Materials
    const matRed = new THREE.LineBasicMaterial({ color: COLORS.frame, transparent: true, opacity: 0.9 });
    const matOrange = new THREE.LineBasicMaterial({ color: COLORS.topo, transparent: true, opacity: 0.8 });
    const matGreen = new THREE.LineBasicMaterial({ color: COLORS.grid, transparent: true, opacity: 0.5 });
    const matYellow = new THREE.LineBasicMaterial({ color: COLORS.text, transparent: true, opacity: 0.9 });

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Grid
    const gridHelper = new THREE.GridHelper(40, 40, COLORS.grid, COLORS.grid);
    gridHelper.position.y = -3;
    gridHelper.material.transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.2;
    mainGroup.add(gridHelper);

    // Terrain / Trench
    const planeGeo = new THREE.PlaneGeometry(24, 24, 50, 50);
    const planePos = planeGeo.attributes.position;
    for (let i = 0; i < planePos.count; i++) {
      const x = planePos.getX(i);
      const y = planePos.getY(i);
      let z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.8;
      const distFromAxis = Math.abs(x + y * 0.2);
      if (distFromAxis < 6) {
        z += Math.pow(Math.cos((distFromAxis * Math.PI) / 12), 2) * -5;
        z += (Math.random() - 0.5) * 0.5;
      }
      planePos.setZ(i, z);
    }
    planeGeo.computeVertexNormals();
    const trenchMesh = new THREE.LineSegments(new THREE.WireframeGeometry(planeGeo), matOrange);
    trenchMesh.rotation.x = -Math.PI / 2;
    trenchMesh.position.y = -1;
    mainGroup.add(trenchMesh);

    // Bio particles
    const bioCount = 120;
    const bioGeo = new THREE.BufferGeometry();
    const bioPositions = new Float32Array(bioCount * 3);
    const bioOffsets = new Float32Array(bioCount);
    for (let i = 0; i < bioCount; i++) {
      bioPositions[i * 3] = (Math.random() - 0.5) * 20;
      bioPositions[i * 3 + 1] = 0;
      bioPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      bioOffsets[i] = Math.random() * 100;
    }
    bioGeo.setAttribute('position', new THREE.BufferAttribute(bioPositions, 3));
    const bioMat = new THREE.PointsMaterial({
      color: COLORS.grid,
      size: 0.15,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const bioPoints = new THREE.Points(bioGeo, bioMat);
    mainGroup.add(bioPoints);

    // Containment unit
    const containGroup = new THREE.Group();
    containGroup.position.set(-9, 4, -9);
    const boxGeo = new THREE.BoxGeometry(5, 5, 5);
    const boxMesh = new THREE.LineSegments(new THREE.EdgesGeometry(boxGeo), matYellow);
    containGroup.add(boxMesh);
    const sphereGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const sphereMesh = new THREE.LineSegments(new THREE.WireframeGeometry(sphereGeo), matRed);
    containGroup.add(sphereMesh);
    const lblContain = createTextPlane('CNTMNT_V2', COLORS.text, 40);
    lblContain.position.set(0, 3.5, 0);
    containGroup.add(lblContain);
    mainGroup.add(containGroup);

    // Pressure graph
    const pressureGroup = new THREE.Group();
    pressureGroup.position.set(10, 5, -8);
    const pGridGeo = new THREE.PlaneGeometry(10, 6, 10, 6);
    const pGridMesh = new THREE.LineSegments(new THREE.WireframeGeometry(pGridGeo), matGreen);
    pressureGroup.add(pGridMesh);
    const pLineCount = 150;
    const pLinePoints: THREE.Vector3[] = [];
    for (let i = 0; i < pLineCount; i++) pLinePoints.push(new THREE.Vector3(0, 0, 0));
    const pLineGeo = new THREE.BufferGeometry().setFromPoints(pLinePoints);
    const pLineMesh = new THREE.Line(pLineGeo, matOrange);
    pressureGroup.add(pLineMesh);
    const lblPressure = createTextPlane('EXT_PRESSURE_KPA', COLORS.topo, 40);
    lblPressure.position.set(0, 4, 0);
    pressureGroup.add(lblPressure);
    mainGroup.add(pressureGroup);

    // Title frame
    const titleFrame = new THREE.Group();
    titleFrame.position.set(-14, 0, 12);
    titleFrame.rotation.x = -Math.PI / 2;
    const frameLine = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(12, 0, 0),
      new THREE.Vector3(12, -2, 0),
    ]);
    titleFrame.add(new THREE.Line(frameLine, matRed));
    const titleText = createTextPlane('ZONE: MARIANA_SEC_4', COLORS.frame, 48);
    titleText.position.set(6, 1.5, 0);
    titleFrame.add(titleText);
    mainGroup.add(titleFrame);

    // Scale bar
    const scaleGroup = new THREE.Group();
    scaleGroup.position.set(4, -1, 12);
    const scaleBase = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(10, 0, 0),
    ]);
    scaleGroup.add(new THREE.Line(scaleBase, matRed));
    for (let i = 0; i <= 10; i += 0.5) {
      const h = i % 2 === 0 ? 1.5 : 0.8;
      const tick = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, 0, 0),
        new THREE.Vector3(i, 0, -h),
      ]);
      scaleGroup.add(new THREE.Line(tick, matRed));
    }
    mainGroup.add(scaleGroup);

    // Annotation
    const ann1 = createTextPlane('DEPTH_SIG: VALID', COLORS.grid, 32);
    ann1.position.set(-10, -1, 0);
    ann1.rotation.x = -Math.PI / 2;
    mainGroup.add(ann1);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Containment animation
      sphereMesh.rotation.y = time * 0.4;
      sphereMesh.rotation.z = time * 0.2;
      const pulse = 1 + Math.sin(time * 3) * 0.05;
      boxMesh.scale.set(pulse, pulse, pulse);

      // Bio particles
      const bPos = bioPoints.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < bioCount; i++) {
        let x = bPos[i * 3];
        let z = bPos[i * 3 + 2];
        const offset = bioOffsets[i];

        x += Math.sin(time * 0.2 + offset) * 0.02;
        z += Math.cos(time * 0.2 + offset) * 0.02;

        if (x > 12) x = -12;
        if (x < -12) x = 12;
        if (z > 12) z = -12;
        if (z < -12) z = 12;

        let y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 0.8;
        const distFromAxis = Math.abs(x + z * 0.2);
        if (distFromAxis < 6) {
          y += Math.pow(Math.cos((distFromAxis * Math.PI) / 12), 2) * -5;
        }

        bPos[i * 3] = x;
        bPos[i * 3 + 1] = y - 0.8 + Math.sin(time * 4 + offset) * 0.2;
        bPos[i * 3 + 2] = z;
      }
      bioPoints.geometry.attributes.position.needsUpdate = true;

      // Pressure waveform
      const pPos = pLineGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < pLineCount; i++) {
        const px = (i / pLineCount) * 10 - 5;
        const py =
          Math.sin(px * 3 - time * 8) * 1.5 +
          Math.sin(px * 12 - time * 3) * 0.8 +
          Math.cos(px * 25 + time) * 0.2;
        pPos[i * 3] = px;
        pPos[i * 3 + 1] = py;
        pPos[i * 3 + 2] = 0.5;
      }
      pLineGeo.attributes.position.needsUpdate = true;

      // Gentle bob
      mainGroup.position.y = Math.sin(time * 0.5) * 0.2;

      composer.render();
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const a = w / h;
      camera.left = -d * a;
      camera.right = d * a;
      camera.top = d;
      camera.bottom = -d;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      renderer.dispose();
      composer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-sm overflow-hidden"
      style={{ minHeight: '550px' }}
    />
  );
};
