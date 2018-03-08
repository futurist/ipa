#!/bin/sh

### Setup, need mongodb running at 27017 first

# install python dep
python -m pip install pymongo

# make it executable
chmod +x convert.py

# start mongodb
mongoimport --drop -d dict -c oxfordgb ./oxford-gb.json
mongoimport --drop -d dict -c cmudict --jsonArray ./CMU_DIC.js

# start cgi
node cgi


