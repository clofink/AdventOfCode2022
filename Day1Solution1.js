function day1Solution1(data) {
    let items = data.split('\r\n');
    let totals = [];
    let tempTotal = 0;
    for (let item of items) {
        if (item == "") {
            totals.push(tempTotal);
            tempTotal = 0;
        }
        else {
            tempTotal += parseInt(item);
        }
    }
    totals.sort((a,b) => a < b ? 1 : -1);
    return totals[0];
}