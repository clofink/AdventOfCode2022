function day2Solution2(data) {
    // A Rock
    // B Paper
    // C Scissors

    // X lose
    // Y tie
    // Z win
    const needWin = {
        "A": "Y",
        "B": "Z",
        "C": "X"
    }
    const needLoss = {
        "A": "Z",
        "B": "X",
        "C": "Y"
    }
    const needTie = {
        "A": "X",
        "B": "Y",
        "C": "Z"
    }
    const pointMatch = {
        "X": 1,
        "Y": 2,
        "Z": 3
    }
    const gamePoints = {
        "X": 0,
        "Y": 3,
        "Z": 6
    }
    let items = data.split('\r\n');
    if (items.length < 2) items = data.split('\n'); // acts as a check for UNIX like endings (on my Mac)
    let totalPoints = 0;
    for (let item of items) {
        let parts = item.split(' ');
        let oppChoice = parts[0];
        let winTieLose = parts[1];
        let scoredPoints = gamePoints[winTieLose];
        switch (winTieLose) {
            case "X":
                scoredPoints += pointMatch[needLoss[oppChoice]];
                break;
            case "Y":
                scoredPoints += pointMatch[needTie[oppChoice]];
                break;
            case "Z":
                scoredPoints += pointMatch[needWin[oppChoice]];
                break;
            default:
                console.log('How did I get here?');
                break;
        }
        totalPoints += scoredPoints;
    }
    return totalPoints;
}