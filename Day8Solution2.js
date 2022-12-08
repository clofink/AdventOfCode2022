function day8Solution2(data) {
    let lines = data.split("\r\n");
    if (lines.length < 2) lines = data.split("\n");

    let currentHighScore = 0;

    for (let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines[row].length; col++) {
            // check if it is visible in any of the four directions
            // first one where it is visible, count it and continue
            let treesUp = 0;
            let treesDown = 0;
            let treesLeft = 0;
            let treesRight = 0;

            // this is what we will be comparing against
            let currentItem = parseInt(lines[row][col]);

            let rayCol = col;
            while(rayCol >= 0) {
                if (rayCol === col) {rayCol--; continue;}
                if (parseInt(lines[row][rayCol]) >= currentItem) {
                    // found a taller tree
                    treesLeft++;
                    break;
                }
                treesLeft++;
                rayCol--;
            }
            rayCol = col;
            while (rayCol < lines.length) {
                if (rayCol === col) {rayCol++; continue;}
                if (parseInt(lines[row][rayCol]) >= currentItem) {
                    // found a taller tree
                    treesRight++;
                    break;
                }
                treesRight++;
                rayCol++;
            }
            let rayRow = row;
            while (rayRow >= 0) {
                if (rayRow === row) {rayRow--; continue;}
                if (parseInt(lines[rayRow][col]) >= currentItem) {
                    // found a taller tree
                    treesUp++;
                    break;
                }
                treesUp++;
                rayRow--;
            }
            rayRow = row;
            while (rayRow < lines[row].length) {
                if (rayRow === row) {rayRow++; continue;}
                if (parseInt(lines[rayRow][col]) >= currentItem) {
                    // found a taller tree
                    treesDown++;
                    break;
                }
                treesDown++
                rayRow++;
            }

            if ((treesDown * treesLeft * treesRight * treesUp) > currentHighScore) {
                currentHighScore = treesDown * treesLeft * treesRight * treesUp;
            }
        }
    }
    return currentHighScore;
}