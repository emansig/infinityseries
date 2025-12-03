# infinityseries.js

infinityseries.js is a script for max that automatically generates infinite integer sequences using the same method that Per Nørgård first developed in 1959 and began integrating into his compositions in the 1960s. 

## inlets
	inlet 0 -- bang to output series as a standard max list
	inlet 1 -- select seed interval _(only positive integers work as of now)_
	inlet 2 -- select series length
	inlet 3 -- select inversion mode

### modes:
	0 = -/+
	1 = +/-
	2 = +/+
	3 = -/-x
