function day11Solution1(data) {
    let monkeys = data.split("\r\n\r\n");
    if (monkeys.length < 2) monkeys = data.split("\n\n");

    let parsedMonkeys = [];
    for (let monkey of monkeys) {
        parsedMonkeys.push(parseMonkey(monkey));
    }

    const numberOfRounds = 20;
    let monkeyInspectCounts = []

    for (t = 0; t < numberOfRounds; t++) {
        for (let n = 0; n < parsedMonkeys.length; n++) {
            let monkey = parsedMonkeys[n];
            // console.log("Monkey " + n);
            // this is the list I can remove items from as they're thrown without messing up the current list
            let copyItems = [...monkey.items];
            for (let i = 0; i < monkey.items.length; i++) {
                if (!monkeyInspectCounts[n]) {
                    monkeyInspectCounts[n] = 0;
                }
                monkeyInspectCounts[n]++;
                monkey.items[i] = monkey.operation(monkey.items[i]);
                monkey.items[i] = Math.floor(monkey.items[i] / 3);
                let itemToThrow = Math.floor(monkey.operation(copyItems.shift()) / 3);
                if (isDivisibleBy(monkey.items[i], monkey.divisibleBy)) {
                    parsedMonkeys[monkey.ifTrue].items.push(itemToThrow);
                }
                else {
                    parsedMonkeys[monkey.ifFalse].items.push(itemToThrow);
                }
            }
            monkey.items = copyItems;
        }
    }
    monkeyInspectCounts.sort(function(a,b) {if (a > b) {return -1;} return 1})
    return monkeyInspectCounts[0] * monkeyInspectCounts[1];

    function parseMonkey(monkey) {
        let newMonkey = {};
        let lines = monkey.split('\r\n');
        if (lines.length < 2) lines = monkey.split("\n");

        for (let line of lines) {
            if (line.indexOf("Starting items:") >= 0) {
                let parts = line.split(': ');
                newMonkey.items = [];
                for (let startingItem of parts[1].split(', ')) {
                    newMonkey.items.push(parseInt(startingItem));
                }
            }
            if (line.indexOf("Operation:") >= 0) {
                let parts = line.split(': ');
                // will need to figure out how to parse this
                newMonkey.operation = parseExpression(parts[1].split('= ')[1]);
            }
            if (line.indexOf("Test:") >= 0) {
                let parts = line.split(' ');
                // all divisible by tests, so really just need the number
                newMonkey.divisibleBy = parseInt(parts[parts.length - 1]);
            }
            if (line.indexOf("If true:") >= 0) {
                let parts = line.split(' ');
                // throwing to another monkey, just need the monkey index
                newMonkey.ifTrue = parseInt(parts[parts.length - 1]);

            }
            if (line.indexOf("If false:") >= 0) {
                let parts = line.split(' ');
                newMonkey.ifFalse = parseInt(parts[parts.length - 1]);
            }
        }
        return newMonkey;
    }

    function parseExpression(expression) {
        let parts = expression.split(' ');
        // always doing something with the original value and assigning it to new

        return function(old) {
            let value = parts[2] === "old" ? old : parseInt(parts[2]); 
            if (parts[1] === "+") {
                return old + value;
            }
            else if (parts[1] === "*") {
                return old * value;
            }
        }
    }

    function isDivisibleBy(number, divisor) {
        return number % divisor === 0;
    }
}