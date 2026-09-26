import codecs

def update_home(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix the huge SEE YOU IN OCTOBER text for small mobiles
    content = content.replace('text-[70px] sm:text-[100px]', 'text-[55px] sm:text-[100px]')
    content = content.replace('text-[70px] sm:text-[100px]', 'text-[55px] sm:text-[100px]')

    # Fix the events marquee text size if it's too big
    content = content.replace('text-4xl sm:text-5xl', 'text-3xl sm:text-5xl')

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed mobile sizes in Home.jsx!")

update_home('src/pages/Home.jsx')
