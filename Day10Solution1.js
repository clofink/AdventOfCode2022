function day10Solution1(data) {
    let lines = data.split("\r\n");
    if (lines.length < 2) lines = data.split("\n");

    let xRegister = 1;
    let cycleCount = 1;
    let total = 0;

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
                        checkSignalStrength(cycleCount, xRegister)
                        cycleCount++;
                    }
                    if (i == 1) {
                        // second cycle
                        // console.log(cycleCount, xRegister);
                        checkSignalStrength(cycleCount, xRegister)
                        cycleCount++;
                        valueToAdd = parseInt(parts[1]);
                    } 
                }
                break;
            case "noop":
                // only one cycle
                // console.log(cycleCount, xRegister);
                checkSignalStrength(cycleCount, xRegister)
                cycleCount++;
                break;
            default:
                console.log(`unknown instruction ${parts[0]}`);
        }
        if (valueToAdd) {
            xRegister += valueToAdd;
        }
    }

    function checkSignalStrength(cycleNum, xRegister) {
        if ([20, 60, 100, 140, 180, 220].indexOf(cycleNum) >= 0) {
            total += (cycleNum * xRegister);
        }
        // if ((cycleNum == 20) || (cycleNum - 20) % 40 === 0) {
        //     console.log(cycleCount);
        //     console.log(cycleNum * xRegister);
        // }
    }
    return total;
}