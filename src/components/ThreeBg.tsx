import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 28;

    // Resize Handler
    const handleResize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // ── STAR FIELD ──
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1800;
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const palette = [
      [0, 0.83, 1], // Cyan
      [0.61, 0.36, 0.9], // Purple
      [0.97, 0.15, 0.52], // Pink
      [0, 0.83, 1],
      [1, 1, 1], // White
    ];

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 120;

      const c = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = c[0];
      starColors[i * 3 + 1] = c[1];
      starColors[i * 3 + 2] = c[2];
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── FLOATING RINGS ──
    const ring1Geo = new THREE.TorusGeometry(14, 0.06, 8, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.12,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 4;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(10, 0.05, 8, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x9b5de5,
      transparent: true,
      opacity: 0.1,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 5;
    scene.add(ring2);

    // ── FLOATING NODES ──
    const nodeColors = [0x00d4ff, 0x9b5de5, 0xf72585];
    const nodes: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>[] = [];

    for (let i = 0; i < 24; i++) {
      const geo = new THREE.SphereGeometry(Math.random() * 0.08 + 0.04, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: nodeColors[i % 3],
        transparent: true,
        opacity: Math.random() * 0.5 + 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const r = Math.random() * 16 + 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      mesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      mesh.userData = {
        ox: mesh.position.x,
        oy: mesh.position.y,
        oz: mesh.position.z,
        speed: Math.random() * 0.4 + 0.2,
        amp: Math.random() * 1.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
      };

      scene.add(mesh);
      nodes.push(mesh);
    }

    // ── FAINT BACKGROUND GRID ──
    const makeLine = (p1: THREE.Vector3, p2: THREE.Vector3, color: number, opacity: number) => {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      return new THREE.Line(geo, mat);
    };

    for (let i = -5; i <= 5; i++) {
      scene.add(makeLine(new THREE.Vector3(i * 4, -20, -20), new THREE.Vector3(i * 4, 20, -20), 0x9b5de5, 0.04));
      scene.add(makeLine(new THREE.Vector3(-20, i * 4, -20), new THREE.Vector3(20, i * 4, -20), 0x00d4ff, 0.04));
    }

    // ── NEBULA PLANES ──
    const nebulas: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = [];
    const nebula = (x: number, y: number, z: number, color: number, opacity: number, size: number) => {
      const geo = new THREE.PlaneGeometry(size, size);
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.rotation.z = Math.random() * Math.PI;
      scene.add(m);
      nebulas.push(m);
    };

    nebula(-10, 4, -15, 0x00d4ff, 0.03, 18);
    nebula(10, -4, -18, 0x9b5de5, 0.04, 22);
    nebula(0, 0, -22, 0xf72585, 0.02, 28);

    // ── MOUSE PARALLAX ──
    let mx = 0;
    let my = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        mx = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        my = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // ── ANIMATION LOOP ──
    let t = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      t += 0.008;

      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.002;
      ring2.rotation.y += 0.001;

      nodes.forEach((n) => {
        const d = n.userData;
        n.position.x = d.ox + Math.sin(t * d.speed + d.phase) * d.amp;
        n.position.y = d.oy + Math.cos(t * d.speed * 0.7 + d.phase) * d.amp;
        n.material.opacity = 0.2 + Math.abs(Math.sin(t * d.speed + d.phase)) * 0.4;
      });

      // Drift stars slightly upwards
      const positions = starGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.006;
        if (positions[i] > 60) {
          positions[i] = -60;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      // Camera drift & parallax target
      camera.position.x += (mx * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (-my * 1.2 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);

      // Dispose Geometries/Materials
      starGeo.dispose();
      starMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nodes.forEach((n) => {
        n.geometry.dispose();
        n.material.dispose();
      });
      nebulas.forEach((neb) => {
        neb.geometry.dispose();
        neb.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-bg"
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
