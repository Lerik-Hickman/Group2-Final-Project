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

// Item Module: manages each item
/*
Item Class: contains data of itmes
:Params:
name: String name of the item
image: String of location of the small icon for the item

Methods:
get_name() Returns name of the item
get_image() Returns the string of the location fo the image
add_to_inventory() Adds item to HMTL, sets is_equipped to true, and add
    to inventory
remove_from_inventory() Deletes self from HTML
*/
class item
{
    constructor(name, image)
    {
        this.name = name;
        this.image = image;
        this.is_equipped = false;
    }
}

// Achievement Module: Tracks achievements
/*
Item Class: contains data and methods of achievements
:Params:
name: String name of the achievement
image: String of location of the small icon for the achievement

Methods:
get_name() Returns name of the achievement
get_image() Returns the string of the location fo the achievement
complete() Adds achievement to HMTL, sets is_completed to true,
    and add to completed_achievements
*/
class achievements
{
    constructor(name, image)
    {
        this.name = name;
        this.image = image;
        this.is_equipped = false;
    }
}

// Log Module: Adds content to history log
function update_log(content)
{
    // Add content to log
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

main()