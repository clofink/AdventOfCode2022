function day10Solution2(data) {
    let lines = data.split("\r\n");
    if (lines.length < 2) lines = data.split("\n");

    let xRegister = 1;
    let cycleCount = 1;
    let totalString = "";
    function getCrtRow() {
        return '........................................'.split();
    }

    for (let instruction of lines) {
        let parts = instruction.split(' ');
        let valueToAdd;
        switch (parts[0]) {
            case "addx":
                // two cycles
                for (let i = 0; i < 2; i++) {
                    if (i == 0) {
                        // first cycle
                        // console.log(cycleCount, xRegister);
                        updateCRT(cycleCount, xRegister)
                        cycleCount++;
                    }
                    if (i == 1) {
                        // second cycle
                        // console.log(cycleCount, xRegister);
                        updateCRT(cycleCount, xRegister)
                        cycleCount++;
                        valueToAdd = parseInt(parts[1]);
                    } 
                }
                break;
            case "noop":
                // only one cycle
                // console.log(cycleCount, xRegister);
                updateCRT(cycleCount, xRegister)
                cycleCount++;
                break;
            default:
                console.log(`unknown instruction ${parts[0]}`);
        }
        if (valueToAdd) {
            xRegister += valueToAdd;
        }
    }

    function updateCRT(cycleNum, xRegister) {
        // console.log(cycleNum, xRegister);
        let currentPos = (cycleNum % 40) - 1;
        if (currentPos === xRegister || currentPos === xRegister - 1 || currentPos === xRegister + 1) {
            totalString += "#";
        }
        else {
            totalString += "."
        }
    }
    // console.log(totalString)
    console.log(
        `${totalString.substring(0,40)}
${totalString.substring(40,80)}
${totalString.substring(80,120)}
${totalString.substring(120,160)}
${totalString.substring(160,200)}
${totalString.substring(200,240)}`
    )
    return "check console"
}