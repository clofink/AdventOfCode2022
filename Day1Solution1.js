function day1Solution1(data) {
    let items = data.split('\r\n');
    if (items.length < 1) items.split('\n'); // acts as a check for UNIX like endings (on my Mac)
    items.push(""); // bit of a hack since there's no empty line after the last item so it never gets added to the total
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