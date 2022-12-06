function day6Solution1(data) {
    let window = "";
    for (let char of data) {
        window += char;
        if (window.length > 4) {
            window = window.substring(1);
        }
        if (window.length === 4) {
            let charMap = {};
            for (let tempChar of window) {
                charMap[tempChar] = 0;
            }
            if (Object.keys(charMap).length == 4) {
                return data.indexOf(window) + 4;
            }
        }
    }
}