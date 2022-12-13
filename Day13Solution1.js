function day13Solution1(data) {
    let packetPairs = data.split("\r\n\r\n");
    if (packetPairs.length < 2) packetPairs = data.split("\n\n");

    let correctOrderIndex = 0;

    for (let i = 0; i < packetPairs.length; i++) {
        let packetPair = packetPairs[i];
        let parts = packetPair.split("\r\n");
        if (parts.length < 2) parts = packetPair.split("\n");
        // one of my more terrible ideas
        let leftSide = eval(parts[0]);
        let rightSide = eval(parts[1]);
        let result = comparePackets(leftSide, rightSide);
        if (result) {
            correctOrderIndex += (i + 1);
        }
    }
    return correctOrderIndex;

    function comparePackets(leftSide, rightSide) {
        // console.log(leftSide, rightSide);
        // If both values are lists
        if (Array.isArray(leftSide) && Array.isArray(rightSide)) {
            // compare the first value of each list, then the second value, and so on
            for (let i = 0; i < Math.max(leftSide.length, rightSide.length); i++) {
                // If the right list runs out of items first, the inputs are not in the right order
                if (rightSide[i] === undefined) {
                    // console.log('false because the right side array ran out before the left side')
                    return false;
                }
                // If the left list runs out of items first, the inputs are in the right order
                if (leftSide[i] === undefined) {
                    // console.log('true because the left side array ran out before the right side')
                    return true;
                }
                let result = comparePackets(leftSide[i], rightSide[i]);
                if (typeof result == "boolean") {
                    return result;
                }
            }
        } 
        else if (typeof leftSide == "number" && typeof rightSide == "number") {
            if (leftSide > rightSide) {
                // console.log("false because the left side was larger than the right side")
                return false;
            }
            else if (rightSide > leftSide) {
                // console.log("true because the right side was larger than the left side")
                return true;
            }
        }
        else if (Array.isArray(leftSide) && typeof rightSide == "number") {
            let result = comparePackets(leftSide, [rightSide]);
            if (typeof result == "boolean") {
                return result;
            }
        }
        else if (Array.isArray(rightSide) && typeof leftSide == "number") {
            let result = comparePackets([leftSide], rightSide);
            if (typeof result == "boolean") {
                return result;
            }
        }
    }
}