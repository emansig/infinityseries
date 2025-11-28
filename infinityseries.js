////////////////////////////////////////////////////////////////////////////////
/////      Emanuels Per Nørgård-type infinite series generator v0.0.01    //////
////////////////////////////////////////////////////////////////////////////////

// kan just nu bara göra serier baserade på två toner med uppåt-intervall
// icke testad med riktigt långa serier
// gjord för legacy max js engine

//  framtida förändringar:
//  - fler noter som start
//	- annan ordning av inversion/icke-inversion

inlets = 3;      // 0 = bang generate, 1 = seed, 2 = size
outlets = 1;     // output list

var seed = 1;
var size = 16;

// handle ints
function msg_int(v) {
    if (inlet === 1) {
        seed = v;
    } else if (inlet === 2) {
        size = v;
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

        // push new values
        sequence.push(secondLast - dist);
        sequence.push(last + dist);

        germinalIndex++;
    }

    // ensure exact length
    var out = sequence.slice(0, size);

    outlet(0, out);
}

//originalimplementation från "SM" på https://tablesandwaves.github.io/infinity-series/ & https://github.com/tablesandwaves
