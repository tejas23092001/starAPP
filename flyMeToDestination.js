const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function minPlaneCount(arr) {
    if (arr.length === 0) {
        return -1;
    }

    if (arr.length === 1) {
        return 0;
    }

    let curr = 0;
    let count = 0;

    while (curr < arr.length - 1) {
        let maxRange = 0;
        let nextPos = -1;

        for (let i = curr + 1; i <= curr + arr[curr]; i++) {
            if (i >= arr.length - 1) {
                nextPos = arr.length - 1;
                break;
            }
            if (i + arr[i] >= maxRange) {
                maxRange = i + arr[i];
                nextPos = i;
            }
        }

        if (nextPos === -1 || nextPos === curr) {
            return -1;
        }

        curr = nextPos;
        count++;
    }

    return count;
}

rl.question('Enter the fuel units at each airport (separated by spaces): ', (input) => {
    const arr = input.split(' ').map(Number);
    const ans = minPlaneCount(arr);
    console.log(`Minimum number of planes required: ${ans}`);
    rl.close();
});
