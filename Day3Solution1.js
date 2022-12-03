function day3Solution1(data) {
    let items = data.split('\r\n');
    if (items.length < 2) items = data.split('\n'); // acts as a check for UNIX like endings (on my Mac)

    const priorityMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    let totalScore = 0;
    for (let item of items) {
        let compartmentA = item.substring(0, (item.length / 2));
        let compartmentB = item.substring(item.length / 2, item.length);
        let matchingItem;
        for (let itemA of compartmentA) {
            if (compartmentB.indexOf(itemA) >= 0) {
                matchingItem = itemA;
                break;
            }
        }
        totalScore += priorityMap.indexOf(matchingItem) + 1;
    }
    return totalScore;
}