# coding: utf-8
# the above line is necessary to tell python what kind of encoding we're working with
# see: http://www.python.org/dev/peps/pep-0263/
# after build JS file, import to mongodb with:
#    mongoimport --jsonArray -d test -c docs --file cmudict.json

import codecs
import json
from cgi import escape

def toUnicode(s):
	if isinstance(s, unicode):
		s= s.encode('UTF-8')
	else:
		s= s
	return s
	return unicode(s, encoding="ascii", errors="ignore")


def write_file(file_name, dic):
	#new_file = codecs.open(file_name,'w','utf-8')
	new_file = open(file_name, 'w')
	
	#new_file.write("\t_table = [")
	new_file.write("\n\n")
	#dic=dic[1:2]
	for item in dic:
		#item = json.loads( json.dumps(item, ensure_ascii=True) )
		try:
			new_file.write("\t\t{")
			new_file.write("\"word\":\"" + (item["word"]) + "\",")
			new_file.write(" \"pro\":\"" + (item["pro"]) + "\",")
			new_file.write(" \"definition\":\"" + (item["definition"]) + "\"")
			new_file.write('}\n')
		except:
			print "Something went wrong"
	
	new_file.write("\n")
	#new_file.write("\t]")
	new_file.write("\n\n")
	
	new_file.close()
	
def read_file(file_name):
	
	# EXAMPLE INPUT LINE:   㐖 㐖 [Ye4] /see
	# TRADITIONAL_HANZI SIMPLIFIED_HANZI [PINYIN] /TRANSLATION
	
	# Put each dictionary item into the array
	items = []

	with  codecs.open(file_name,'r','utf8') as content_file:
		content = content_file.read()
	#print unicode(content, "utf8")
	#print content.decode("utf8","ignore")

	content = json.loads( json.dumps({"ascii":content.replace("\"",r"\u0022")}, ensure_ascii=True).replace("\\",r"\\") )["ascii"]

	#exit()
	lines = content.split("------------------------------\\n")
		
	for line in lines:
		l = line
		
		#These are info lines at the beginning of the file
		#NOTE: Might be useful to store version #, date, etc for dictionary reference
		if l.startswith(("#", "#!", ";;")):
			continue
		else:
			#partition out definition text, replace slshes with semicolons, normalize quotations, get rid of any \n
			f = l.split('\\t',2)
			if len(f)<2:
				continue
			if f[1][0]!='/':
				f.insert(1,"")
			if len(f)==2:
				f.insert(2,"")

			word = f[0].strip().replace("\"","\\\"")
			pro = f[1].strip().replace("\"","\\\"").strip("\\n")
			definition = f[2].replace("\"","\\\"")

			#word = toUnicode(word)
			#pro = toUnicode(pro)
			#definition = toUnicode(definition)

			items.append({"word":word, "pro":pro, "definition":definition})
	
	write_file("oxford-gb.json", items)
		
read_file("oxford-gb.txt")