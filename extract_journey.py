import codecs
import re

with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract journeyEvents array
journey_events_match = re.search(r'(const journeyEvents = \[.*?\];)', content, re.DOTALL)
journey_events_code = journey_events_match.group(1) if journey_events_match else ""

# Extract the journey section
journey_section_match = re.search(r'(<section id="journey".*?</section>)', content, re.DOTALL)
journey_section_code = journey_section_match.group(1) if journey_section_match else ""

# Remove the journey section from Home.jsx
if journey_section_code:
    content = content.replace(journey_section_code, '')
    
    with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Journey removed from Home.jsx")
else:
    print("Could not find journey section")

# Now inject it into Journey.jsx
with codecs.open('src/pages/Journey.jsx', 'r', encoding='utf-8') as f:
    journey_content = f.read()

# Replace cities array with journeyEvents
journey_content = re.sub(r'const cities = \[.*?\];', journey_events_code, journey_content, flags=re.DOTALL)

# Remove the <section className="relative z-10 py-16 px-4 max-w-5xl mx-auto"> ... </section> in Journey.jsx
journey_timeline_match = re.search(r'(<section className="relative z-10 py-16 px-4 max-w-5xl mx-auto">.*?</section>)', journey_content, re.DOTALL)
if journey_timeline_match:
    # Replace the timeline with the one from Home.jsx
    journey_content = journey_content.replace(journey_timeline_match.group(1), journey_section_code)
    
    # Also add the necessary imports if they are missing
    if 'useScroll' not in journey_content:
        journey_content = journey_content.replace("import { motion } from 'framer-motion';", "import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';\nimport { useRef } from 'react';")
    
    # Add journeyRef and useScroll hook inside the component
    hook_code = '''  const journeyRef = useRef(null);
  const { scrollYProgress: journeyScroll } = useScroll({
    target: journeyRef,
    offset: ["start center", "end center"]
  });'''
    journey_content = journey_content.replace("export default function Journey() {", "export default function Journey() {\n" + hook_code)
    
    with codecs.open('src/pages/Journey.jsx', 'w', encoding='utf-8') as f:
        f.write(journey_content)
    print("Journey section injected into Journey.jsx")
else:
    print("Could not find timeline in Journey.jsx")
