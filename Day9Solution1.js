function day9Solution1(data) {
    let lines = data.split("\r\n");
    if (lines.length < 2) lines = data.split("\n");
    
    let headX = 0;
    let headY = 0;
    
    let tailX = 0;
    let tailY = 0;

    let tailPositions = ["0:0"]; // this will hold a list of strings (in the format x:y)

    for (let line of lines) {
        let parts = line.split(' ');
        let direction = parts[0];
        let count = parseInt(parts[1]);

        for (let i = 0; i < count; i++) {
            switch (direction) {
                case "U":
                    headY--;
                    if (!isTailOrthogonal()) {
                        updateTail()
                    }
                    break;
                case "D":
                    headY++;
                    if (!isTailOrthogonal()) {
                        updateTail()
                    }
                    break;
                case "R":
                    headX++;
                    if (!isTailOrthogonal()) {
                        updateTail()
                    }
                    break;
                case "L":
                    headX--;
                    if (!isTailOrthogonal()) {
                        updateTail()
                    }
                    break;
                default:
                    console.log('unknown direction ' + direction);
                    break;
            }
        }
    }

    function addUniquePosition(x, y) {
        if (tailPositions.indexOf(`${x}:${y}`) >= 0) return;
        tailPositions.push(`${x}:${y}`);
    }

    function isTailOrthogonal() {
        if (Math.abs(headX - tailX) > 1) {
            return false;
        }
        if (Math.abs(headY - tailY) > 1) {
            return false;
        }
        return true;
    }

    function updateTail() {
        // not in the same row or col
        if (headX > tailX) {
            tailX++;
        }
        else if (headX < tailX) {
            tailX--;
        }
        if (headY > tailY) {
            tailY++;
        }
        else if (headY < tailY) {
            tailY--;
        }
        addUniquePosition(tailX, tailY);
    }
    return tailPositions.length;
}