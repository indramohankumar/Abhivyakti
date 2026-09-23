import codecs
import re

with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("Menu, X, Sun, Moon, Star, Trophy, Clock, ChevronUp", "Menu, X, Sun, Moon, Star, Trophy, Clock, ChevronUp, Twitter, Instagram, Linkedin, Mail, Phone")

with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
