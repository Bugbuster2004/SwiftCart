import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function ThreeDViewer({ modelUrl }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const animate = function () {
      requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (modelUrl) {
      const loader = new GLTFLoader();
      loader.load(
        modelUrl,
        (gltf) => {
          const model = gltf.scene;
          if (modelRef.current) {
            sceneRef.current.remove(modelRef.current);
          }
          modelRef.current = model;
          sceneRef.current.add(model);
          model.position.set(0, 0, 0);
          model.scale.set(1, 1, 1);
        },
        undefined,
        (error) => {
          console.error("Error loading 3D model:", error);
        }
      );
    }
  }, [modelUrl]);

  return <div ref={mountRef}></div>;
}

export default ThreeDViewer;
