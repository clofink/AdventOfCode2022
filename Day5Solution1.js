function day5Solution1(data) {
    let groups = data.split("\r\n\r\n");
    if (groups.length < 2) groups = data.split("\n\n");

    let startingState = groups[0].split('\r\n');
    if (startingState.length < 2) startingState = groups[0].split('\n');
    let boxLetters = startingState.slice(0, -1);
    let boxNumbers = startingState[startingState.length - 1].match(/(\d)/g);

    let groupContents = {};

    for (line of boxLetters) {
        let regex = /(?:(?:\[([A-Z])\])+|(    ))/g
        let matches = line.match(regex);
        for (let i = 0; i < matches.length; i++) {
            if (matches[i] !== "    ") {
                let matchLetter = matches[i].substring(1,2);
                if (groupContents[boxNumbers[i]]) {
                    groupContents[boxNumbers[i]].push(matchLetter);
                }
                else {
                    groupContents[boxNumbers[i]] = [matchLetter];
                }
            }
        }
    }

    for (let box in groupContents) {
        groupContents[box].reverse();
    }

    let instructions = groups[1].split('\r\n');
    if (instructions.length < 2) instructions = groups[1].split('\n');
    for (let instruction of instructions) {
        let steps = instruction.match(/(\d+)/g);
        let moveCount = steps[0];
        let moveFrom = steps[1];
        let moveTo = steps[2];
        for (let i = 0; i < moveCount; i++) {
            let movingBox = groupContents[moveFrom].pop();
            groupContents[moveTo].push(movingBox);
        }
    }

    let returnString = "";
    for (let box in groupContents) {
        returnString += groupContents[box][groupContents[box].length - 1];
    } 
    return returnString;
}