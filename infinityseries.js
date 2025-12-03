inlets = 4;      // 0 = bang generate, 1 = seed, 2 = size, 3 = mode
outlets = 1;     // output list

var seed = 1;
var size = 16;
var mode = 0;    // 0 = subtract/add, 1 = add/subtract, 2= add/add, 3=subtract/subtract

// handle ints
function msg_int(v) {
    if (inlet === 1) {
        seed = v;
    } else if (inlet === 2) {
        size = v;
    } else if (inlet === 3) {
        mode = v;
    }
}

// handle list: allow "seed size" on inlet 1
function list() {
    if (inlet === 1) {
        if (arguments.length > 0) seed = arguments[0];
        if (arguments.length > 1) size = arguments[1];
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