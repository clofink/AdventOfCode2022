function day14Solution1(data) {
    let lines = data.split("\r\n");
    if (lines.length < 2) lines = data.split("\n");

    // make a list of all the coordinates where there is a rock
    let rockCoords = [];
    let maxY = 0;
    for (let line of lines) {
        let coordinates = line.split(' -> ');
        for (let i = 1; i < coordinates.length; i++) {
            let coordinateFrom = coordinates[i - 1].split(',');
            let coordinateTo = coordinates[i].split(',')
            let fromX = parseInt(coordinateFrom[0]);
            let fromY = parseInt(coordinateFrom[1]);
            let toX = parseInt(coordinateTo[0]);
            let toY = parseInt(coordinateTo[1]);
            if (rockCoords.indexOf(`${fromX},${fromY}`) < 0) rockCoords.push(`${fromX},${fromY}`);
            while ((fromX != toX) || (fromY != toY)) {
                if (fromX < toX) fromX++;
                if (fromX > toX) fromX--;
                if (fromY < toY) fromY++;
                if (fromY > toY) fromY--;
                if (fromY > maxY) maxY = fromY;
                if (rockCoords.indexOf(`${fromX},${fromY}`) < 0) rockCoords.push(`${fromX},${fromY}`);
            }
        }
    }

    // drop sand and check if it's ever below the minY for a rock
    // if it is, it has fallen into the void
    let fallenIntoAbyss = false;
    let sandCount = 0;
    while (!fallenIntoAbyss) {
        let sandX = 500;
        let sandY = 0;

        let isBlocked = false;

        while (!isBlocked) {
            let desiredPos = `${sandX},${sandY + 1}`;
            // A unit of sand always falls down one step if possible. 
            if (rockCoords.indexOf(desiredPos) < 0) {
                sandY++;
            }
            // If the tile immediately below is blocked (by rock or sand), 
            else {
                // the unit of sand attempts to instead move diagonally one step down and to the left. 
                desiredPos = `${sandX - 1},${sandY + 1}`;
                if (rockCoords.indexOf(desiredPos) < 0) {
                    sandY++;
                    sandX--;
                }
                else {
                    // If that tile is blocked, the unit of sand attempts to instead move diagonally one step down and to the right. 
                    desiredPos = `${sandX + 1},${sandY + 1}`;
                    if (rockCoords.indexOf(desiredPos) < 0) {
                        sandY++;
                        sandX++;
                    }
                    else {
                        // If all three possible destinations are blocked, 
                        // the unit of sand comes to rest and no longer moves, 
                        
                        // also need to add the sand to the list of blockers
                        rockCoords.push(`${sandX},${sandY}`);
                        isBlocked = true;
                    }
                }
            }
            if (sandY > maxY) {
                fallenIntoAbyss = true;
                break;
            }
        }
        if (!fallenIntoAbyss) sandCount++;
    }
    return sandCount;
}