#!/usr/bin/python
#encoding=utf-8
print "Content-Type: application/json"
print 'Status: 200 OK'
print ("Access-Control-Allow-Origin: *");
print ('Access-Control-Allow-Headers: X-Requested-With');
print

import sys 
reload(sys) 
#print sys.getdefaultencoding()
sys.setdefaultencoding('gb18030')

import cgi
import cgitb
cgitb.enable(display=1)

import os
#print os.environ['REQUEST_METHOD']

form = cgi.FieldStorage()
pro = form.getvalue("pro","")
match = form.getvalue("match","0")

import datetime
from pymongo import MongoClient
import json
import re
import pymongo
from bson import BSON
from bson import json_util

groups = [ "|AH|AA|AE|EH|EY|ER|IH|IY|AY|AO|OW|OY|AW|AY|UH|UW|", "|J|Z|S|CH|SH|TH|DH|", "|M|N|NG|", "|T|D|JH|Z|ZH|", "|V|W|" ]


if match!="1":
	pro = re.sub(r'(AH|AA|AE|EH|EY|ER|IH|IY|AY|AO|OW|OY|AW|AY|UH|UW)(\s+|$)', r'\1 R\2', pro)
	pro = re.sub(r' R R', r' R', pro)

	part = pro.split(" ")

	pro2 = []
	i=0
	for w in part:
		if not w : continue
		i+=1
		w2="|"+w+"|"
		matching = [s for s in groups if w2 in s]
		if i==1 and (w=="T" or w=="D" or w=="JH"): matching=False
		if matching:
			pro2.append( "({0})".format( '|'.join([e.strip('|') for e in matching]) ) )
		else:
			pro2.append( w )

	pro = " ".join(pro2)

	#pro = re.sub(r'(AH|AA|AE|EH|EY|ER|IH|IY|AY|AO|OW|OY|AW|AY|UH|UW\)) R', r'\1( [RL])?', pro)

	pro = re.sub(r' ', r'\d? ', pro)
	pro = re.sub(r' R', r'( [RL])?', pro)
	pro = re.sub(r' L', r' (EY|AH)\d? L', pro)


	regx = re.compile(r"^\s*"+ pro +r"\d?\s*$", re.IGNORECASE)
	#print regx.pattern

else:

	pro = re.sub(r' ', r'\d? ', pro)
	regx = re.compile(r"^\s*"+ pro +r"\d?\s*$", re.IGNORECASE)



client = MongoClient('mongodb://localhost:27017/')
db = client.dict

result = []
#print regx.pattern, db.cmudict.find({"pro": {"$regex": regx} } ).count()
for cmu in db.cmudict.find({"pro": {"$regex": regx} } ):
	w = cmu.get("word")
	#print "-%s-" % w, len(w)
	if w :result.append( re.escape(w) )

if result:
	regx2 = re.compile("^(?:"+ "|".join(result) + ")\d*$", re.IGNORECASE)
	result2 = db.oxfordgb.find({"word": regx2})
	print  json_util.dumps(result2)
else:
	print "[]"

#	print json.dumps(a, ensure_ascii=True)
#	sys.stdout.write( "  ".join(seg_list).encode("utf-8") )
