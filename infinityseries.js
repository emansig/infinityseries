inlets = 4;      // 0 = bang generate, 1 = size, 2 = mode, 3 = seed
outlets = 1;     // output list

var seed = 1;
var seed1 = 0;
var size = 16;
var mode = 0;    // two-note: 0 = -/+, 1 = +/-, 2 = +/+, 3 = -/-
                 // three-note: 0 = -/+/-, 1 = -/+/+, 2 = -/-/-, 3 = -/-/+, 4 = +/+/-, 5 = +/+/+, 6 = +/-/-, 7 = +/-/+
var seedListReceived = false;

// handle ints
function msg_int(v) {
    if (inlet === 3) {
        seed = v;
        seedListReceived = false;
    } else if (inlet === 1) {
        size = v;
    } else if (inlet === 2) {
        mode = v;
    } 
}

// handle lists
function list() {
    if (inlet === 3) {
        if (arguments.length > 0) seed = arguments[0];
        if (arguments.length > 1) seed1 = arguments[1];
        seedListReceived = true;
    }
}

function bang() {
    if (size <= 0) {
        outlet(0, []);
        return;
    }

    var sequence = [0, seed];
    var germinalIndex = 0;

    if (seedListReceived === false) {
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
    } else if (seedListReceived === true) {
        // when two seeds are provided
        sequence = [0, seed, seed1];
        while (sequence.length < size) {
            var a = sequence[germinalIndex];
            var b = sequence[germinalIndex + 1];

            // avoid undefined pair when approaching end
            if (b === undefined) break;

            var dist = b - a;

            var thirdLast = sequence[sequence.length - 3];
            var secondLast = sequence[sequence.length - 2];
            var last = sequence[sequence.length - 1];

            // push new values based on mode
            switch (mode) {
                case 0:
                    sequence.push(thirdLast - dist);
                    sequence.push(secondLast + dist);
                    sequence.push(last - dist);
                    break;
                case 1:
                    sequence.push(thirdLast - dist);
                    sequence.push(secondLast + dist);
                    sequence.push(last + dist);
                    break;
                case 2:
                    sequence.push(thirdLast - dist);
                    sequence.push(secondLast - dist);
                    sequence.push(last - dist);
                    break;
                case 3:
                    sequence.push(thirdLast - dist);
                    sequence.push(secondLast - dist);
                    sequence.push(last + dist);
                    break;
                case 4:
                    sequence.push(thirdLast + dist);
                    sequence.push(secondLast + dist);
                    sequence.push(last - dist);
                    break;
                case 5:
                    sequence.push(thirdLast + dist);
                    sequence.push(secondLast + dist);
                    sequence.push(last + dist);
                    break;
                case 6:
                    sequence.push(thirdLast + dist);
                    sequence.push(secondLast - dist);
                    sequence.push(last - dist);
                    break;
                case 7:
                    sequence.push(thirdLast + dist);
                    sequence.push(secondLast - dist);
                    sequence.push(last + dist);
                    break;
            }

        germinalIndex++;
        }
    }
    
    // ensure exact length
    var out = sequence.slice(0, size);

    outlet(0, out);
}

//originalimplementation från "SM" på https://tablesandwaves.github.io/infinity-series/ & https://github.com/tablesandwaves
//används under MIT-licens