
/*
Ashika Negi, Kristina Solloway, Lerik Hickman
Purpose: Handle all logic to facilitate a visual novel
    and associated features
Last updated by: Lerik Hickman
Date: 11/16/2026
*/

// Global constants
const TOTAL_ACHIEVEMENTS = 5;

// Global variables (mostly for getting HTML elements)
var inventory = [];
var completed_acheivements = [];

// User Input Module - Kristina
let characterName = "";


// This function is called once the file loads. Anything that needs
//     to run before the user interacts with the site gets put here
function main()
{
    get_nodes();
}

/*
Story Module: Holds classes. functions, and event handlers for
    main story content and website functionality.
*/
/*
Story class: Manages story object data
Params:
name: Short string to identify the node. Lead with N# for readability
content: Array of strings for story content. Array in case too much
    to fit on one page
pointers: Array of StoryNodes that this object leads to
special: String corresponding to type of special action. Null if none
image: !!!Not yet implemented!!! String location of image


GET DATA USING METHODS NOT VARIABLE ACCESSES

Methods:
get_name() Returns the name of the object
get_content() Returns array of strings of story content
get_special() Rturns name of special event this node requires
get_image() !!!NOT YET IMPLEMENTED!!! Returns location of image as string
expand_node() Moves node from a small lower section to the main section
clear() Deletes self from HTML
*/
class StoryNode
{
    // Initializes/constructs the instance's variables
    constructor(name, content, pointers, special)
    {
        // Sets object variables equal to the arguments
        this.name = name; // Name of the node
        this.content = content; // Story text content
        this.pointers = pointers; // Array of StoryNodes this node leads to
        this.special = special; // String name of special action
        //this.image = image; placeholder for when we add images
    }

    // Gets the name of the object
}


// Updates main node to clicked node
function switch_nodes()
{
    // gets current active node
    // compares clicked node with pointers
    // delete main and non-clicked node
    // expand clicked node
    // checks for special events. check null first since most nodes don't have a special event
}


// Creates StoryNodes from JSON
function get_nodes()
{

}

// Remember delayed event and play a sound here

/* ===================================
   ITEM MODULE - ASHIKA
   =================================== */

class item {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.is_equipped = false;
        this.element = null;
    }

    get_name() {
        return this.name;
    }

    get_image() {
        return this.image;
    }

    add_to_inventory() {
        if (inventory.some(existing => existing.name === this.name)) {
            return false;
        }

        const list = document.getElementById("inventory-list");

        if (!list) {
            console.error("Inventory list not found.");
            return false;
        }

        const entry = document.createElement("div");
        entry.className = "inventory-item";

        if (this.image) {
            const icon = document.createElement("img");
            icon.src = this.image;
            icon.alt = "";
            icon.width = 40;
            icon.height = 40;
            entry.appendChild(icon);
        }

        const label = document.createElement("span");
        label.textContent = this.name;
        entry.appendChild(label);

        list.appendChild(entry);
        inventory.push(this);

        this.element = entry;
        this.is_equipped = true;

        show_game_alert("Collected: " + this.name);
        return true;
    }

    remove_from_inventory() {
        const index = inventory.indexOf(this);

        if (index === -1) {
            return false;
        }

        inventory.splice(index, 1);

        if (this.element) {
            this.element.remove();
            this.element = null;
        }

        this.is_equipped = false;
        return true;
    }
}


/* ===================================
   ACHIEVEMENT MODULE - ASHIKA
   =================================== */

class achievements {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.is_completed = false;
        this.element = null;
    }

    get_name() {
        return this.name;
    }

    get_image() {
        return this.image;
    }

    complete() {
        if (this.is_completed) {
            return false;
        }

        if (completed_acheivements.some(
            existing => existing.name === this.name
        )) {
            return false;
        }

        const list = document.getElementById("achievement-list");

        if (!list) {
            console.error("Achievement list not found.");
            return false;
        }

        const entry = document.createElement("div");
        entry.className = "achievement-item";

        if (this.image) {
            const icon = document.createElement("img");
            icon.src = this.image;
            icon.alt = "";
            icon.width = 40;
            icon.height = 40;
            entry.appendChild(icon);
        }

        const label = document.createElement("span");
        label.textContent = this.name;
        entry.appendChild(label);

        list.appendChild(entry);
        completed_acheivements.push(this);

        this.element = entry;
        this.is_completed = true;

        show_game_alert("Achievement unlocked: " + this.name);
        return true;
    }
}


// Log Module: Adds content to history log
function update_log(content)
{
    // Add content to log
}


/* ===================================
   ALERTS MODULE - ASHIKA
   =================================== */

function show_game_alert(message) {
    const list = document.getElementById("alerts-list");

    if (!list) {
        console.error("Alerts list not found.");
        return;
    }

    const alert = document.createElement("p");
    alert.className = "game-alert";
    alert.textContent = message;

    list.appendChild(alert);

    // Keep only the five newest alerts.
    while (list.children.length > 5) {
        list.firstElementChild.remove();
    }
}


/* ===================================
   HISTORY DISPLAY - ASHIKA
   =================================== */

function add_history_entry(content) {
    const log = document.getElementById("history-log");

    if (!log) {
        console.error("History log not found.");
        return;
    }

    const entry = document.createElement("p");
    entry.textContent = content;

    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

function toggle_history() {
    const panel = document.getElementById("history-panel");
    const button = document.getElementById("toggle-history");

    if (!panel) {
        return;
    }

    panel.classList.toggle("is-collapsed");

    if (button) {
        const expanded = !panel.classList.contains("is-collapsed");
        button.setAttribute("aria-expanded", String(expanded));
    }
}

function set_history_overlay(isOpen) {
    const panel = document.getElementById("history-panel");

    if (panel) {
        panel.classList.toggle("is-overlay", Boolean(isOpen));
    }
}


/* ===================================
   QTE TIMER MODULE - ASHIKA
   =================================== */

let qteInterval = null;
let qteActive = false;
let qteTimeLeft = 0;
let qteTimeoutAction = null;
let qteChoiceAction = null;

// Starts a timed choice event.
function start_qte(seconds, onTimeout, onChoice) {
    stop_qte();

    const container = document.getElementById("qte-container");
    const timer = document.getElementById("qte-timer");

    if (!container || !timer) {
        console.error("QTE elements not found.");
        return false;
    }

    qteTimeLeft = Number.isFinite(Number(seconds))
        && Number(seconds) > 0
        ? Math.ceil(Number(seconds))
        : 10;

    qteTimeoutAction = onTimeout;
    qteChoiceAction = onChoice;
    qteActive = true;

    timer.textContent = qteTimeLeft;
    container.hidden = false;

    qteInterval = setInterval(function() {
        qteTimeLeft--;

        timer.textContent = qteTimeLeft;

        if (qteTimeLeft <= 0) {
            const timeoutAction = qteTimeoutAction;

            stop_qte();

            show_game_alert("Time is up!");
            add_history_entry("The timed choice expired.");

            // Lerik's story logic can provide the consequence.
            if (typeof timeoutAction === "function") {
                timeoutAction();
            }
        }
    }, 1000);

    return true;
}

// Stops the timer and hides the popup.
function stop_qte() {
    if (qteInterval !== null) {
        clearInterval(qteInterval);
        qteInterval = null;
    }

    qteActive = false;
    qteTimeoutAction = null;
    qteChoiceAction = null;

    const container = document.getElementById("qte-container");

    if (container) {
        container.hidden = true;
    }
}

// Handles a choice made before time runs out.
function choose_qte(choiceNumber) {
    if (!qteActive) {
        return false;
    }

    const choiceAction = qteChoiceAction;

    stop_qte();

    if (typeof choiceAction === "function") {
        choiceAction(choiceNumber);
    }

    return true;
}


/* ===================================
   EVENT LISTENERS - ASHIKA
   =================================== */

function initialize_ashika_modules() {
    const historyButton = document.getElementById("toggle-history");
    const historyPanel = document.getElementById("history-panel");

    if (historyButton && historyPanel) {
        historyButton.setAttribute("aria-expanded", "true");
        historyButton.addEventListener("click", toggle_history);
    }

    const choiceOne = document.getElementById("choice-one");
    const choiceTwo = document.getElementById("choice-two");

    if (choiceOne) {
        choiceOne.addEventListener("click", function() {
            choose_qte(1);
        });
    }

    if (choiceTwo) {
        choiceTwo.addEventListener("click", function() {
            choose_qte(2);
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initialize_ashika_modules
    );
} else {
    initialize_ashika_modules();
}


// ===================================
// USER INPUT MODULE - KRISTINA
// ===================================

// Get references to the HTML elements
const nameInput = document.getElementById("character-name");
const beginButton = document.getElementById("begin-adventure");
const welcomeOverlay = document.getElementById("welcome-overlay");
const nameError = document.getElementById("name-error");

// Listen for the player to click Begin Adventure
beginButton.addEventListener("click", function() {
    // Get the name entered by the player
    characterName = nameInput.value.trim();
    // Require at least one letter or number in the character name
    const namePattern = /[a-zA-Z0-9]/;

    // Check whether the name is empty
    if (characterName === "") {
        nameError.textContent = "Please enter a character name.";
        return;
    }

    // Check that the name contains at least one letter or number
    if (!namePattern.test(characterName)) {
        nameError.textContent = "Your name must contain at least one letter or number.";
        return;
    }

    // Clear any previous error message
    nameError.textContent = "";

    console.log("Welcome, " + characterName + "!");

    // Hide the welcome overlay after successful validation
    welcomeOverlay.style.display = "none";
});

// Allow the player to press Enter to begin
nameInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        beginButton.click();
    }
});

// ===================================
// PROGRESS BAR MODULE - KRISTINA
// ===================================

// Get references to the HTML elements
const progressBar = document.getElementById("story-progress");
const progressPercentage = document.getElementById("progress-percentage");

// Track the player's progress
let storyProgress = 0;

// Update the progress bar and percentage
function updateProgress() {
    progressBar.value = storyProgress;
    progressPercentage.textContent = storyProgress + "%";
}

// Advance the player's progress by one stage
function advanceProgress() {
    storyProgress = Math.min(storyProgress + 25, 100);
    updateProgress();
}



main();
