#!/bin/bash
rm ./src/combined.js
cat ./src/widgets.js ./src/helpers.js ./src/compound-widgets.js > ./src/combined.js
