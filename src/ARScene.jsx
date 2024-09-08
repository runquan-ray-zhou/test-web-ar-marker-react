import React, { useEffect, useRef } from "react";
import "aframe";
import "@ar-js-org/ar.js/aframe/build/aframe-ar.js";

AFRAME.registerComponent("close-button", {
  init: function () {
    this.el.addEventListener("click", function () {
      const modal = document.querySelector("#modal");
      modal.setAttribute("visible", false);
    });
  },
});

AFRAME.registerComponent("markerhandler", {
  init: function () {
    const animatedMarker = document.querySelector("#animated-marker");
    const aEntity = document.querySelector("#animated-model");
    const modal = document.querySelector("#modal");
    const modalText = document.querySelector("#modal-text");
    const closeButton = document.querySelector("#close-button");
    const overlayModal = document.querySelector("#overlay-modal");
    const closeOverlay = document.querySelector("#close-overlay");

    const showModal = () => {
      overlayModal.style.display = "block";
    };

    const hideModal = () => {
      overlayModal.style.display = "none";
    };

    // animatedMarker.addEventListener("click", showModal);

    closeOverlay.addEventListener("click", hideModal);

    const modalValue = modalText.value;

    // Function to show modal
    // const showModal = () => {
    //   modalText.setAttribute("value", modalValue);
    //   modal.setAttribute("visible", true);
    // };

    // Function to hide modal
    // const hideModal = () => {
    //   modal.setAttribute("visible", false);
    // };

    // Show modal on click
    animatedMarker.addEventListener("click", function (ev, target) {
      const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
      if (aEntity && intersectedElement === aEntity) {
        // Replace with your actual content
        showModal();
      }
    });

    // Hide modal when close button is clicked
    // closeButton.addEventListener('click', hideModal);

    // closeButton.addEventListener("click", function (ev) {
    //   ev.stopPropagation();
    //   hideModal();
    // });
  },
});

AFRAME.registerComponent("gesture-detector", {
  schema: {
    element: { default: "" },
  },

  init: function () {
    this.targetElement =
      this.data.element && document.querySelector(this.data.element);

    if (!this.targetElement) {
      this.targetElement = this.el;
    }

    this.internalState = {
      previousState: null,
    };

    this.emitGestureEvent = this.emitGestureEvent.bind(this);

    this.targetElement.addEventListener("touchstart", this.emitGestureEvent);

    this.targetElement.addEventListener("touchend", this.emitGestureEvent);

    this.targetElement.addEventListener("touchmove", this.emitGestureEvent);
  },

  remove: function () {
    this.targetElement.removeEventListener("touchstart", this.emitGestureEvent);

    this.targetElement.removeEventListener("touchend", this.emitGestureEvent);

    this.targetElement.removeEventListener("touchmove", this.emitGestureEvent);
  },

  emitGestureEvent(event) {
    const currentState = this.getTouchState(event);

    const previousState = this.internalState.previousState;

    const gestureContinues =
      previousState &&
      currentState &&
      currentState.touchCount == previousState.touchCount;

    const gestureEnded = previousState && !gestureContinues;

    const gestureStarted = currentState && !gestureContinues;

    if (gestureEnded) {
      const eventName =
        this.getEventPrefix(previousState.touchCount) + "fingerend";

      this.el.emit(eventName, previousState);

      this.internalState.previousState = null;
    }

    if (gestureStarted) {
      currentState.startTime = performance.now();

      currentState.startPosition = currentState.position;

      currentState.startSpread = currentState.spread;

      const eventName =
        this.getEventPrefix(currentState.touchCount) + "fingerstart";

      this.el.emit(eventName, currentState);

      this.internalState.previousState = currentState;
    }

    if (gestureContinues) {
      const eventDetail = {
        positionChange: {
          x: currentState.position.x - previousState.position.x,

          y: currentState.position.y - previousState.position.y,
        },
      };

      if (currentState.spread) {
        eventDetail.spreadChange = currentState.spread - previousState.spread;
      }

      // Update state with new data

      Object.assign(previousState, currentState);

      // Add state data to event detail

      Object.assign(eventDetail, previousState);

      const eventName =
        this.getEventPrefix(currentState.touchCount) + "fingermove";

      this.el.emit(eventName, eventDetail);
    }
  },

  getTouchState: function (event) {
    if (event.touches.length === 0) {
      return null;
    }

    // Convert event.touches to an array so we can use reduce

    const touchList = [];

    for (let i = 0; i < event.touches.length; i++) {
      touchList.push(event.touches[i]);
    }

    const touchState = {
      touchCount: touchList.length,
    };

    // Calculate center of all current touches

    const centerPositionRawX =
      touchList.reduce((sum, touch) => sum + touch.clientX, 0) /
      touchList.length;

    const centerPositionRawY =
      touchList.reduce((sum, touch) => sum + touch.clientY, 0) /
      touchList.length;

    touchState.positionRaw = { x: centerPositionRawX, y: centerPositionRawY };

    // Scale touch position and spread by average of window dimensions

    const screenScale = 2 / (window.innerWidth + window.innerHeight);

    touchState.position = {
      x: centerPositionRawX * screenScale,
      y: centerPositionRawY * screenScale,
    };

    // Calculate average spread of touches from the center point

    if (touchList.length >= 2) {
      const spread =
        touchList.reduce((sum, touch) => {
          return (
            sum +
            Math.sqrt(
              Math.pow(centerPositionRawX - touch.clientX, 2) +
                Math.pow(centerPositionRawY - touch.clientY, 2)
            )
          );
        }, 0) / touchList.length;

      touchState.spread = spread * screenScale;
    }

    return touchState;
  },

  getEventPrefix(touchCount) {
    const numberNames = ["one", "two", "three", "many"];

    return numberNames[Math.min(touchCount, 4) - 1];
  },
});

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

    this.isVisible = false;
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      this.isVisible = false;
    });
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
  },

  handleRotation: function (event) {
    if (this.isVisible) {
      this.el.object3D.rotation.y +=
        event.detail.positionChange.x * this.data.rotationFactor;
      this.el.object3D.rotation.x +=
        event.detail.positionChange.y * this.data.rotationFactor;
    }
  },

  handleScale: function (event) {
    if (this.isVisible) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
    }
  },
});

function ARScene() {
  const sceneRef = useRef(null);

  return (
    // <a-scene ref={sceneRef} embedded arjs="sourceType: webcam;">
    <a-scene
      arjs="sourceType: webcam;"
      embedded
      renderer="logarithmicDepthBuffer: true;"
      vr-mode-ui="enabled: false"
      gesture-detector
      id="scene"
    >
      {/* <a-marker preset="hiro"> */}
      <a-marker
        markerhandler
        preset="hiro"
        raycaster="objects: .clickable"
        emitevents="true"
        cursor="fuse: false; rayOrigin: mouse;"
        id="animated-marker"
      >
        <a-entity
          id="animated-model"
          position="0 0 0"
          scale="1 1 1"
          gltf-model="/shiba/scene.gltf"
          class="clickable"
          visible="true"
          gesture-handler
          look-at="[camera]"
        ></a-entity>

        <a-entity
          position="0 1 0"
          scale="3 3 3"
          text="value: Pinch Me! Rub Me! Pat Me!; color: orange; width: 3; align: center; "
          class="clickable"
          visible="true"
          gesture-handler
          look-at="[camera]"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
      {/* <a-entity camera look-controls>
        <a-cursor></a-cursor>
      </a-entity> */}
      <a-entity
        id="modal"
        visible="false"
        position="0 0 -1"
        scale="0.12 0.12 0.12"
      >
        <a-plane width="4" height="3" color="#CCC">
          <a-text
            id="modal-text"
            value="HTML content goes here"
            align="center"
            width="3.5"
            position="0 0.8 0.01"
          ></a-text>
          <a-plane
            id="close-button"
            class="clickable"
            color="red"
            width="0.4"
            height="0.4"
            position="1.7 1.2 0.02"
            close-button
          >
            <a-text
              value="X"
              align="center"
              width="2"
              position="0 0 0.01"
            ></a-text>
          </a-plane>
        </a-plane>
      </a-entity>
      <div
        id="overlay-modal"
        style="display: none; position: absolute; top: 20%; left: 50%; transform: translate(-50%, -50%); width: 400px; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.5); z-index: 100;"
      >
        <h2>HTML Modal Content</h2>
        <p>You can place HTML content here, like forms, images, or videos.</p>
        <button id="close-overlay">Close</button>
      </div>
    </a-scene>
  );
}

export default ARScene;
