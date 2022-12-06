function day6Solution2(data) {
    let window = "";
    for (let char of data) {
        window += char;
        if (window.length > 14) {
            window = window.substring(1);
        }
        if (window.length === 14) {
            let charMap = {};
            for (let tempChar of window) {
                charMap[tempChar] = 0;
            }
            if (Object.keys(charMap).length == 14) {
                return data.indexOf(window) + 14;
            }
        }
    }
}