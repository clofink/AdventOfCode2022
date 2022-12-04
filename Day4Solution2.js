function day4Solution2(data) {
    let lines = data.split('\r\n');
    if (lines.length < 2) lines = data.split('\n'); // acts as a check for UNIX like endings (on my Mac)

    let containsCount = 0;
    for (let line of lines) {
        let parts = line.split(',');
        let pairA = parts[0].split('-');
        let pairB = parts[1].split('-');
        if (parseInt(pairA[0]) >= parseInt(pairB[0]) && parseInt(pairA[0]) <= parseInt(pairB[1])) {
            containsCount++;
        }
        else if (parseInt(pairB[0]) >= parseInt(pairA[0]) && parseInt(pairB[0]) <= parseInt(pairA[1])) {
            containsCount++
        }
        else if (parseInt(pairA[1]) >= parseInt(pairB[0]) && parseInt(pairA[1]) <= parseInt(pairB[1])) {
            containsCount++
        }
        else if (parseInt(pairB[1]) >= parseInt(pairA[0]) && parseInt(pairB[1]) <= parseInt(pairA[1])) {
            containsCount++
        }
    }
    return containsCount;
}