function day7Solution2(data) {
    let lines = data.split("\r\n");
    if (lines.length < 2) lines = data.split("\n");

    let root = newDirectory(null, "/");

    let currentDirectory;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let parts = line.split(' ');
        if (parts[0] === "$") {
            // this is a command, either cd or ls
            if (parts[1] === 'cd') {
                changeDirectory(parts[2]);
            }
            else if (parts[1] === 'ls') {
                listFiles();
            }
        }
        else {
            if (parts[0] === "dir") {
                currentDirectory.children.push(newDirectory(currentDirectory, parts[1]));
            }
            else {
                // file with size
                currentDirectory.children.push(newFile(currentDirectory, parts[1], parts[0]));
            }
        }
    }

    function changeDirectory(path) {
        if (path === "/") {
            currentDirectory = root;
        }
        else if (path === "..") {
            currentDirectory = currentDirectory.parent;
        }
        else {
            for (let file of currentDirectory.children) {
                if (file.type === "dir" && file.name === path) {
                    currentDirectory = file;
                    break;
                }
            }
        }
    }

    function listFiles() {
        return;
    }

    function newDirectory(parent, name) {
        return {name: name, type: "dir", parent: parent, children: [], size: 0};
    }

    function newFile(parent, name, size) {
        let tempParent = parent
        while (tempParent.parent != null || tempParent.name == "/") {
            tempParent.size += parseInt(size);
            tempParent = tempParent.parent ? tempParent.parent : "";
        }
        return {name: name, type: "file", parent: parent, size: parseInt(size)};
    }

    let queue = [root];
    let candidateSize;
    while (queue.length > 0) {
        let item = queue.shift();
        if ((root.size - item.size) < 40000000) {
            if (!candidateSize) {
                candidateSize = item.size;
            }
            else if (item.size < candidateSize) {
                candidateSize = item.size;
            }
        }
        for (let child of item.children) {
            if (child.type == "dir") {
                queue.push(child);
            }
        }
    }
    return candidateSize;
}