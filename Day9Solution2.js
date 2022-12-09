function day9Solution2(data) {
    let lines = data.split("\r\n");
    if (lines.length < 2) lines = data.split("\n");
    
    let ropeSections = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]

    let tailPositions = ["0:0"]; // this will hold a list of strings (in the format x:y)

    for (let line of lines) {
        let parts = line.split(' ');
        let direction = parts[0];
        let count = parseInt(parts[1]);

        for (let i = 0; i < count; i++) {
            switch (direction) {
                case "U":
                    ropeSections[0][1]--;
                    break;
                case "D":
                    ropeSections[0][1]++;
                    break;
                case "R":
                    ropeSections[0][0]++;
                    break;
                case "L":
                    ropeSections[0][0]--;
                    break;
                default:
                    console.log('unknown direction ' + direction);
                    break;
            }
            for (let index = 1; index < ropeSections.length; index++) {
                if (!isSectionOrthogonal(ropeSections[index - 1], ropeSections[index])) {
                    updateSection(index - 1, index);
                }
            }
        }
    }

    function addUniquePosition(x, y) {
        if (tailPositions.indexOf(`${x}:${y}`) >= 0) return;
        tailPositions.push(`${x}:${y}`);
    }

    function isSectionOrthogonal(leadingSection, section) {
        if (Math.abs(leadingSection[0] - section[0]) > 1) {
            return false;
        }
        if (Math.abs(leadingSection[1] - section[1]) > 1) {
            return false;
        }
        return true;
    }

    function updateSection(leadingIndex, index) {
        // not in the same row or col
        if (ropeSections[leadingIndex][0] > ropeSections[index][0]) {
            ropeSections[index][0]++;
        }
        else if (ropeSections[leadingIndex][0] < ropeSections[index][0]) {
            ropeSections[index][0]--;
        }
        if (ropeSections[leadingIndex][1] > ropeSections[index][1]) {
            ropeSections[index][1]++;
        }
        else if (ropeSections[leadingIndex][1] < ropeSections[index][1]) {
            ropeSections[index][1]--;
        }
        if (index === ropeSections.length - 1) {
            addUniquePosition(ropeSections[index][0], ropeSections[index][1]);
        }
    }
    return tailPositions.length;
}