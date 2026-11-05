# Group2-Final-Project
This is where all official documentation and code for the final project is kept
## L. Hickman TO-DO
 - Currently has no explicit responsibilities
 - Primarily will focus on story and JavaScript

## A. Negi TO-DO
 - Currently has no explicit responsibilities
 - Primarily will focus on HTML/CSS

## K. Solloway TO-DO
 - Currently has no explicit responsibilities

## Story Idea 1
General premise is a knight going to rescue a princess from a tower
Current ending ideas:
Good ending: the knight rescues the princess
Death ending: the knight dies
Tragic ending: the princess dies
Evil ending: the knight chooses to Slay the Princess
Tresure ending: the knight gets a key and unlocks a chest in the tower
Redemption ending: The evil wizard who has captured the princess gets redeemed (don't love this idea)

Probably construct a simple structure like this:
node
 |   \
node node
 |    |   \
node node node

rather than a complex structure like this:
node
 |   \
node<->node
 |   /  |  \
node<->node node

for ease of narative construction, though it's fine to change this because the code will work the same regardless

## Feature Ideas
 - [] Each story node should be an object with name, story text, and an array of node names that can follow (ask prof. if we can use a dicttionary to store story objects for clarity)
 - [] Once an ending has been reached, a button to restart from the beginning should appear
 - [] Each node should point to what other nodes can be chosen
 - [] Mouse over a node option makes it grow slightly(?)
 - [] Use cookies to track ending completion(?)
 - [] Have a display for completed ending in a corner(?)
 - [] Undo button(? this seems somewhat complicated)
 - [] NEED: flags to track choices for convergent endings (all get set to false on reset button click)
 - [] Visual display of collected items/triggered events (only if we have time)
 - [] Probably should have the node choices be the full node object, and onClick remove the other node objects and center the clicked object (with a flag to prevent clicking the already selected object from repeating)

### File Structure
obviously index.html should contain the HTML stuff. We don't need multiple pages for this

Probably should have one CSS for general doc stuff and another for the nodes

Probably should have one JS file for everything, since

