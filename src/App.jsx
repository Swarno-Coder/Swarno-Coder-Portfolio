import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import * as BABYLON from "babylonjs";
import "./styles.css";

const projects = [
  {
    title: "VibeForge – Multi-Agent Autonomous AI System",
    description:
      "Enterprise-grade multi-agent orchestration with planner/executor/validator roles, parallel workflows, and tool-calling pipelines for controlled autonomous execution.",
    repo: "https://github.com/Swarno-Coder/VibeForge/tree/feature/project-restructure",
  },
  {
    title: "Speckle2Void – Self-Supervised SAR Denoising",
    description:
      "Noise2Void-inspired blind-spot U-Net for SAR denoising with ONNX + INT8 optimization, tuned for CPU edge inference and real-time demo workflows.",
    repo: "https://github.com/Swarno-Coder/speckle2void",
  },
  {
    title: "PMEMS – Predictive Medical Equipment Maintenance",
    description:
      "Healthcare-focused predictive maintenance platform using boosted time-series risk modeling, synthetic data simulation, and maintenance scheduling pipelines.",
    repo: "https://github.com/Swarno-Coder/Predictive-Medical-Equipment-Maintenance-System",
  },
];

const highlights = [
  "⚡ Resource-efficient AI with quantized and CPU-optimized deployment",
  "🧠 Advanced techniques: self-supervised learning, attention, boosting",
  "🤖 Autonomous agentic systems and modular orchestration design",
  "🏥 Real-world impact across healthcare, surveillance, and automation",
];

const App = () => {
  const threeCanvasRef = useRef(null);
  const babylonCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = threeCanvasRef.current;
    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const ambient = new THREE.AmbientLight("#8fb6ff", 1.1);
    const point = new THREE.PointLight("#ff75b5", 2.2, 30);
    point.position.set(3, 4, 6);
    scene.add(ambient, point);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.4, 0.45, 180, 24),
      new THREE.MeshStandardMaterial({ color: "#7c4dff", metalness: 0.4, roughness: 0.2 })
    );
    knot.position.x = -2.1;
    scene.add(knot);

    const crystal = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.1, 1),
      new THREE.MeshPhysicalMaterial({
        color: "#74f5ff",
        emissive: "#123d73",
        transparent: true,
        opacity: 0.72,
        roughness: 0.12,
        metalness: 0.6,
      })
    );
    crystal.position.x = 2.1;
    scene.add(crystal);

    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          Array.from({ length: 900 }, () => (Math.random() - 0.5) * 20),
          3
        )
      ),
      new THREE.PointsMaterial({ color: "#c5dbff", size: 0.03 })
    );
    scene.add(stars);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();

    let frameId = 0;
    const animate = () => {
      const scrollFactor = window.scrollY * 0.0006;
      knot.rotation.x += 0.006;
      knot.rotation.y += 0.009;
      crystal.rotation.y -= 0.007;
      crystal.rotation.z += 0.005;
      knot.position.y = Math.sin(scrollFactor * 8) * 0.5;
      crystal.position.y = Math.cos(scrollFactor * 8) * 0.5;
      stars.rotation.y = scrollFactor * 0.25;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
      renderer.dispose();
      knot.geometry.dispose();
      crystal.geometry.dispose();
      stars.geometry.dispose();
    };
  }, []);

  useEffect(() => {
    const canvas = babylonCanvasRef.current;
    if (!canvas) {
      return;
    }

    const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    const camera = new BABYLON.ArcRotateCamera("cam", Math.PI / 3, Math.PI / 2.4, 8.5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);
    camera.lowerRadiusLimit = 6.5;
    camera.upperRadiusLimit = 10;
    camera.wheelDeltaPercentage = 0;
    camera.pinchDeltaPercentage = 0;
    camera.inputs.clear();

    new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(0, 1, 0), scene).intensity = 0.75;
    const keyLight = new BABYLON.PointLight("point", new BABYLON.Vector3(6, 4, -4), scene);
    keyLight.intensity = 2;

    const orb = BABYLON.MeshBuilder.CreateSphere("orb", { diameter: 2.1, segments: 20 }, scene);
    orb.position = new BABYLON.Vector3(0, 0.2, 0);
    const ring = BABYLON.MeshBuilder.CreateTorus("ring", { diameter: 4.4, thickness: 0.16 }, scene);
    ring.rotation.x = Math.PI / 3;
    const shard = BABYLON.MeshBuilder.CreatePolyhedron("shard", { type: 2, size: 1.3 }, scene);
    shard.position = new BABYLON.Vector3(-2.8, 1.2, 0);

    const orbMaterial = new BABYLON.PBRMaterial("orbMaterial", scene);
    orbMaterial.albedoColor = BABYLON.Color3.FromHexString("#2b2968");
    orbMaterial.emissiveColor = BABYLON.Color3.FromHexString("#5f5dff");
    orbMaterial.metallic = 0.65;
    orbMaterial.roughness = 0.2;
    orb.material = orbMaterial;

    const ringMaterial = new BABYLON.StandardMaterial("ringMaterial", scene);
    ringMaterial.diffuseColor = BABYLON.Color3.FromHexString("#ff66c7");
    ringMaterial.specularColor = BABYLON.Color3.FromHexString("#ffc4e5");
    ring.material = ringMaterial;

    const shardMaterial = new BABYLON.StandardMaterial("shardMaterial", scene);
    shardMaterial.diffuseColor = BABYLON.Color3.FromHexString("#7ef9ff");
    shard.material = shardMaterial;

    scene.registerBeforeRender(() => {
      const scrollFactor = window.scrollY * 0.0008;
      orb.rotation.y += 0.015;
      ring.rotation.z += 0.01;
      shard.rotation.x += 0.012;
      shard.position.y = 1.2 + Math.sin(scrollFactor * 12) * 0.4;
      camera.alpha = Math.PI / 3 + Math.sin(scrollFactor * 3) * 0.18;
      camera.beta = Math.PI / 2.4 + Math.cos(scrollFactor * 3) * 0.06;
      keyLight.position.x = 6 + Math.sin(scrollFactor * 10) * 2;
    });

    engine.runRenderLoop(() => scene.render());

    const resize = () => engine.resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      engine.stopRenderLoop();
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return (
    <div id="main" className="app-shell">
      <div className="scene-stack">
        <canvas className="scene scene-three" ref={threeCanvasRef} aria-hidden="true" />
        <canvas className="scene scene-babylon" ref={babylonCanvasRef} aria-hidden="true" />
      </div>

      <section className="panel hero">
        <p className="eyebrow">AIML ENGINEER · SWARNODIP NAG</p>
        <h1>3D AI/ML Portfolio</h1>
        <p className="lead">
          Scroll through an immersive universe of autonomous agents, self-supervised learning, and real-world
          intelligent systems.
        </p>
      </section>

      <section className="panel">
        <h2>Top Projects</h2>
        <div className="cards-grid">
          {projects.map((project) => (
            <article className="frosted-card" key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.repo} target="_blank" rel="noreferrer">
                View Repository
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Research Spotlight</h2>
        <article className="frosted-card">
          <h3>EdgeRefineNet – Post-Processing Refinement for Medical Segmentation</h3>
          <p>
            A plug-and-play edge-aware refinement module that boosts boundary precision for models like U-Net and
            DeepLabV3, improving critical medical imaging outputs without retraining full segmentation stacks.
          </p>
        </article>
      </section>

      <section className="panel">
        <h2>Core Strengths</h2>
        <div className="chip-list">
          {highlights.map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="panel footer-panel">
        <h2>Vision</h2>
        <p>
          To build intelligent, autonomous, and resource-efficient AI systems that thrive in constrained real-world
          environments while delivering scalable performance.
        </p>
        <p className="contact">
          GitHub: <a href="https://github.com/Swarno-Coder">Swarno-Coder</a> · Email:{" "}
          <a href="mailto:official.swarnodipnag@gmail.com">official.swarnodipnag@gmail.com</a>
        </p>
      </section>
    </div>
  );
};

export default App;
