# coding=utf-8
# the above line is necessary to tell python what kind of encoding we're working with
# see: http://www.python.org/dev/peps/pep-0263/
# after build JS file, import to mongodb with:
#    mongoimport --jsonArray -d test -c docs --file cmudict.json

import codecs

def write_file(file_name, dic):
	#new_file = codecs.open(file_name,'w','utf-8')
	new_file = open(file_name, 'w')
	
	#new_file.write("\t_table = [")
	new_file.write("\n\n")
	
	for item in dic:
		try:
			new_file.write("\t\t{")
			new_file.write("\"word\":\"" + (item["word"]) + "\",")
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

	f = open(file_name, "r")
	lines = f.readlines()
	
	for line in lines:
		l = line
		
		#These are info lines at the beginning of the file
		#NOTE: Might be useful to store version #, date, etc for dictionary reference
		if l.startswith(("#", "#!", ";;")):
			continue
		else:
			#partition out definition text, replace slshes with semicolons, normalize quotations, get rid of any \n
			f = l.split('  ')
			if len(f)<2:
				continue
			word = f[0].strip().replace("\"","\\\"")
			definition = f[1].strip().replace("\"","\\\"")
						
			items.append({"word":word, "definition":definition})
	
	write_file("oxford-en.json", items)
		
read_file("oxford-en.txt")