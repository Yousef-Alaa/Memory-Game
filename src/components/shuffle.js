export default function shuffle(array) {

    // Settings Vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {

      // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];
    
        // [2] Current Element = Random Element
        array[current] = array[random];
    
        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    
    }
    
    return array;
    
}