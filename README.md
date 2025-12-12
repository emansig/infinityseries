# infinityseries.js

infinityseries.js is a script for max that automatically generates infinite integer sequences using the same method that Per Nørgård first developed in 1959 and began integrating into his compositions in the 1960s. 

## inlets
	inlet 0 -- bang to output series as a standard max list
	inlet 1 -- select series length
	inlet 2 -- select inversion mode
	inlet 3 -- seed interval (int for two-note seed, list for three-note seed)

### modes:
#### two note operation
	0 = -/+
	1 = +/-
	2 = +/+
	3 = -/-x

#### three note operation
	0 = -/+/-
	1 = -/+/+
	2 = -/-/-
	3 = -/-/+
	4 = +/+/-
	5 = +/+/+
	6 = +/-/-
	7 = +/-/+
