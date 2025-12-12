inlets = 4;      // 0 = bang generate, 1 = size, 2 = mode, 3 = seed
outlets = 1;     // output list

var seed = 1;
var size = 16;
var mode = 0;    // 0 = subtract/add, 1 = add/subtract, 2= add/add, 3=subtract/subtract

// handle ints
function msg_int(v) {
    if (inlet === 3) {
        seed = v;
    } else if (inlet === 1) {
        size = v;
    } else if (inlet === 2) {
        mode = v;
    } 
}

function bang() {
    if (size <= 0) {
        outlet(0, []);
        return;
    }

    var sequence = [0, seed];
    var germinalIndex = 0;

    while (sequence.length < size) {
        var a = sequence[germinalIndex];
        var b = sequence[germinalIndex + 1];

        // avoid undefined pair when approaching end
        if (b === undefined) break;

        var dist = b - a;

        var secondLast = sequence[sequence.length - 2];
        var last = sequence[sequence.length - 1];

        // push new values based on mode
        if (mode === 0) {
            sequence.push(secondLast - dist);
            sequence.push(last + dist);
        } else if (mode === 1) {
            sequence.push(secondLast + dist);
            sequence.push(last - dist);
        } else if (mode === 2) {
            sequence.push(secondLast + dist);
            sequence.push(last + dist);
        } else if (mode === 3) {
            sequence.push(secondLast - dist);
            sequence.push(last - dist);
        }

        germinalIndex++;
    }

    // ensure exact length
    var out = sequence.slice(0, size);

    outlet(0, out);
}

//originalimplementation från "SM" på https://tablesandwaves.github.io/infinity-series/ & https://github.com/tablesandwaves
//används under MIT-licens