import urllib.request
from bs4 import BeautifulSoup

page = 'จีเอ็มเอ็ม_ไท_หับ'
quoted_page = urllib.parse.quote(page)
response = urllib.request.urlopen('https://th.wikipedia.org/wiki/' 
                                  + quoted_page)

raw_html = response.read()
html = raw_html.decode('utf-8')
soup = BeautifulSoup(html, 'html.parser')

nadal_list=soup.find('dt',string='นาดาวบางกอก').find_next('ul')

for li in nadal_list('li'):
    print(li.a.get_text())