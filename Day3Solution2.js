function day3Solution2(data) {
    let items = data.split('\r\n');
    if (items.length < 2) items = data.split('\n'); // acts as a check for UNIX like endings (on my Mac)

    const priorityMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    let totalScore = 0;
    let currentGroupBags = [];
    for (let item of items) {
        currentGroupBags.push(item);
        let matchingItem;
        if (currentGroupBags.length === 3) {
            // find the common item between all 3
            for (let itemA of currentGroupBags[0]) {
                if (currentGroupBags[1].indexOf(itemA) >= 0 && currentGroupBags[2].indexOf(itemA) >= 0) {
                    matchingItem = itemA;
                    break;
                }
            }
            currentGroupBags = []; // clear the group so a new one starts
        }

        totalScore += priorityMap.indexOf(matchingItem) + 1;
    }
    return totalScore;
}