import React, { useEffect, useRef } from 'react';
import 'aframe';
import '@ar-js-org/ar.js/aframe/build/aframe-ar.js';

function ARScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Any additional initialization logic can go here
  }, []);

  return (
    <a-scene ref={sceneRef} embedded arjs="sourceType: webcam;">
      <a-marker preset="hiro">
        <a-entity
          position="0 0 0"
          scale="0.55 0.55 0.55"
          gltf-model="/shiba/scene.gltf"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
}

export default ARScene;
