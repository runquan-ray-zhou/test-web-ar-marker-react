import React, { useEffect, useRef } from 'react';
import 'aframe';
import '@ar-js-org/ar.js/aframe/build/aframe-ar.js';
import { Canvas, extend } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import Text from './Text.jsx'

extend({ TextGeometry })

function ARScene() {
  const sceneRef = useRef(null);

  return (
    <a-scene ref={sceneRef} embedded arjs="sourceType: webcam;">
      <a-marker preset="hiro">
        <Text position="0 0 0" scale="1 1 1" />
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
