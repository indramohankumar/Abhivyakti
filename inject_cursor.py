import codecs

def update_app(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Import CursorSpotlight
    if 'CursorSpotlight' not in content:
        content = content.replace(
            "import SecurityGuard from './components/SecurityGuard';",
            "import SecurityGuard from './components/SecurityGuard';\nimport { CursorSpotlight } from './components/ui/CursorSpotlight';"
        )

        # Inject into JSX
        content = content.replace(
            "<SecurityGuard />",
            "<SecurityGuard />\n      <CursorSpotlight />"
        )
        
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Injected CursorSpotlight into App.jsx!")
    else:
        print("Already injected.")

update_app('src/App.jsx')
