function day2Solution1(data) {
    // A Rock
    // B Paper
    // C Scissors

    // X Rock
    // Y Paper
    // Z Scissors
    const myChoiceBeats = {
        "X": "C",
        "Y": "A",
        "Z": "B"
    }
    const matchCheck = {
        "X": "A",
        "Y": "B",
        "Z": "C"
    }
    const pointMatch = {
        "X": 1,
        "Y": 2,
        "Z": 3
    }
    let items = data.split('\r\n');
    if (items.length < 2) items = data.split('\n'); // acts as a check for UNIX like endings (on my Mac)
    let totalPoints = 0;
    for (let item of items) {
        let parts = item.split(' ');
        let oppChoice = parts[0];
        let myChoice = parts[1];
        let scoredPoints = pointMatch[myChoice];
        if (oppChoice === matchCheck[myChoice]) {
            scoredPoints += 3;
        }
        else if (oppChoice === myChoiceBeats[myChoice]) {
            scoredPoints += 6;
        }
        totalPoints += scoredPoints;
    }
    return totalPoints;
}