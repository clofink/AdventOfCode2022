function day8Solution1(data) {
    let lines = data.split("\r\n");
    if (lines.length < 2) lines = data.split("\n");

    let visibleCount = 0;

    for (let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines[row].length; col++) {
            // check if it is visible in any of the four directions
            // first one where it is visible, count it and continue

            // this is what we will be comparing against
            let currentItem = parseInt(lines[row][col]);
            let visible = false;
            let rayCol = col;
            while(rayCol >= 0 && visible == false) {
                if (rayCol != col && parseInt(lines[row][rayCol]) >= currentItem) {
                    // found a taller tree
                    break;
                }
                if (rayCol === 0) {
                    // we've reached an edge and no taller tree
                    visibleCount++;
                    visible = true;
                    break;
                }
                rayCol--;
            }
            rayCol = col;
            while (rayCol < lines.length && visible == false) {
                if (rayCol != col && parseInt(lines[row][rayCol]) >= currentItem) {
                    // found a taller tree
                    break;
                }
                if (rayCol === lines.length -1) {
                    // we've reached an edge?
                    visibleCount++;
                    visible = true;
                    break;
                }
                rayCol++;
            }
            let rayRow = row;
            while (rayRow >= 0 && visible == false) {
                if (rayRow != row && parseInt(lines[rayRow][col]) >= currentItem) {
                    // found a taller tree
                    break;
                }
                if (rayRow === 0) {
                    // we've reached an edge
                    visibleCount++;
                    visible = true;
                    break;
                }
                rayRow--;
            }
            rayRow = row;
            while (rayRow < lines[row].length && visible == false) {
                if (rayRow != row && parseInt(lines[rayRow][col]) >= currentItem) {
                    // found a taller tree
                    break;
                }
                if (rayRow === lines[row].length - 1) {
                    // we've reached an edge
                    visibleCount++;
                    visible = true;
                    break;
                }
                rayRow++;
            }
        }
    }
    return visibleCount;
}