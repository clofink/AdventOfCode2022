function day1Solution2(data) {
    let items = data.split('\r\n');
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
    console.log(totals)
    return totals[0] + totals[1] + totals[2];
}