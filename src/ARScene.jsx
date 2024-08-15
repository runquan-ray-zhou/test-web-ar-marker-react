import React, { useEffect, useRef } from 'react';
import 'aframe';
import '@ar-js-org/ar.js/aframe/build/aframe-ar.js';

function ARScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      // Force A-Frame to register custom elements
      if (window.AFRAME.scenes.length === 0) {
        window.AFRAME.registerAFrame();
      }
    }
  }, []);

  return (
    <a-scene ref={sceneRef} embedded arjs="sourceType: webcam;">
      <a-marker preset="hiro">
        <a-entity
          position="0 0 0"
          scale="0.05 0.05 0.05"
          gltf-model="/assets/shiba/scene.gltf"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
}

export default ARScene;