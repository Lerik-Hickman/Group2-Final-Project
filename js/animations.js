/* ========================================
   ANIMATION REGISTRY
   ======================================== */

const animations = {
    "scene-2": animateScene2
};


/* ========================================
   ANIMATION CONTROLLER
   ======================================== */

function playAnimation(sceneId) {

    clearAnimation();

    if (animations.hasOwnProperty(sceneId)) {
        animations[sceneId]();
    }
}

function clearAnimation() {

    const container = document.getElementById("image-container");

    container.classList.remove("scene-2");

    const layers = document.getElementsByClassName("animation-layer");

    while (layers.length > 0) {
        layers[0].parentNode.removeChild(layers[0]);
    }
}


/* ========================================
   SCENE 2 - BOBLIN'S HUT
   ======================================== */

function animateScene2() {

    const container = document.getElementById("image-container");
    const storyImage = document.getElementById("story-image");
    const assetPath = "images/animations/scene-2/";

    // Background layer
    storyImage.src = assetPath + "hut-background.png";
    storyImage.alt = "Interior of Boblin's hut";

    // Character layer
    const boblin = document.createElement("img");
    boblin.id = "boblin";
    boblin.src = assetPath + "boblin.png";
    boblin.alt = "Boblin welcoming the adventurer";
    boblin.className = "animation-layer";

    // Door layer
    const door = document.createElement("img");
    door.id = "hut-door";
    door.src = assetPath + "door.png";
    door.alt = "";
    door.className = "animation-layer";

    // Add layers to the container
    container.appendChild(boblin);
    container.appendChild(door);

    // Start the animation
    container.classList.add("scene-2");
}