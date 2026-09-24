import codecs
import re

def update_events(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the block starting from 'const eventDetails = [' up to the matching '];'
    # Since regex can be tricky with nested arrays and objects, we'll use a strong regex.
    regex = r'const eventDetails = \[\s*\{[\s\S]*?\}\s*\];'
    
    new_event_details = r"""const eventDetails = [
  {
    id: "declamation",
    title: "Declamation",
    theme: "Bharat – The Voice of a Civilisation",
    icon: Mic,
    colorName: "gold",
    colorClass: "bg-gold",
    textColor: "text-gold",
    borderColor: "border-gold/20",
    gradientVia: "via-gold",
    shortDetails: [
      "Team: Individual",
      "Language: Hindi or English",
      "Duration: 3–5 minutes"
    ],
    topics: [
      "Indian cultural heritage and traditions",
      "Vasudhaiva Kutumbakam – the world as one family",
      "India's unity in diversity",
      "Indian knowledge traditions",
      "Unsung heroes of Indian history",
      "India's contribution to science, literature and philosophy",
      "Role of youth in preserving Indian culture",
      "Traditional values in modern India",
      "Indian festivals and their significance",
      "Heritage conservation"
    ],
    rules: [
      "Individual participation only.",
      "Speech may be delivered in Hindi or English.",
      "Maximum time: 3–5 minutes.",
      "The speech should be relevant to the given theme/topic.",
      "Participants should deliver the speech without reading a complete script.",
      "Limited cue cards may be used.",
      "Facts and references, wherever used, should be authentic.",
      "The content should promote cultural understanding and respect for India's diversity.",
      "Offensive, derogatory or inappropriate content is not permitted."
    ]
  },
  {
    id: "fine-arts",
    title: "Fine Arts",
    theme: "Rang-e-Bharat – Colours of Our Heritage",
    icon: Palette,
    colorName: "quantum-pink",
    colorClass: "bg-quantum-pink",
    textColor: "text-quantum-pink",
    borderColor: "border-quantum-pink/20",
    gradientVia: "via-quantum-pink",
    shortDetails: [
      "Team: Individual",
      "Duration: 90 minutes",
      "Art supplies: Bring your own"
    ],
    topics: [
      "Indian festivals and celebrations",
      "Folk and tribal art",
      "Indian monuments and heritage",
      "Traditional costumes",
      "Indian villages and rural life",
      "Classical and folk dance forms",
      "Indian handicrafts",
      "Nature and Indian landscapes",
      "Unity in diversity",
      "Indian traditions meeting modern India",
      "“My Vision of Bharat”"
    ],
    rules: [
      "Individual participation only.",
      "Artwork will be created at the venue.",
      "Maximum time: 90 minutes.",
      "Participants must bring their own art materials.",
      "Artwork must be based on the theme announced by the organisers.",
      "Traditional Indian art forms such as Madhubani, Warli, Gond, Mandala, Kalamkari-inspired patterns, etc., may be used creatively.",
      "Pre-drawn or partially completed artwork is not permitted.",
      "Tracing, printed images and stencils are not allowed.",
      "The artwork must be the participant's original creation.",
      "Completed artwork must be submitted before leaving the venue."
    ]
  },
  {
    id: "story-telling",
    title: "Story Telling",
    theme: "Kahaniyan Bharat Ki – Stories of Our Roots",
    icon: BookOpen,
    colorName: "blue-400",
    colorClass: "bg-blue-400",
    textColor: "text-blue-400",
    borderColor: "border-blue-400/20",
    gradientVia: "via-blue-400",
    shortDetails: [
      "Team: Individual",
      "Duration: 5–7 minutes"
    ],
    topics: [
      "Panchatantra & Jataka tales",
      "Indian mythology and folklore",
      "Stories of Indian freedom fighters",
      "Folk tales from different regions of India",
      "Stories of Indian saints, thinkers and reformers",
      "Stories highlighting Indian values",
      "Stories of grandparents and oral traditions",
      "Regional legends and traditional narratives",
      "Stories showcasing unity in diversity",
      "Contemporary stories inspired by Indian culture"
    ],
    rules: [
      "Individual participation only.",
      "Maximum time: 5–7 minutes.",
      "The story may be original, traditional or adapted.",
      "The source should be acknowledged where applicable.",
      "The story should reflect an aspect of Indian culture, heritage, values or traditions.",
      "Participants may use appropriate expressions, gestures and simple props.",
      "Narration must be performed live.",
      "Pre-recorded narration or voice-over is not permitted.",
      "The story should be suitable for a school audience.",
      "Vulgar, offensive or culturally disrespectful content is prohibited."
    ]
  },
  {
    id: "skit",
    title: "Skit",
    theme: "Bharat – Parampara Se Pragati Tak",
    icon: Drama,
    colorName: "green-400",
    colorClass: "bg-green-400",
    textColor: "text-green-400",
    borderColor: "border-green-400/20",
    gradientVia: "via-green-400",
    shortDetails: [
      "Team: 4–10 participants",
      "Duration: 8–10 minutes",
      "Language: Hindi, English or both"
    ],
    topics: [
      "Indian traditions in modern society",
      "Unity in Diversity",
      "Saving India's cultural heritage",
      "Generation gap and changing traditions",
      "Traditional values in contemporary life",
      "Indian festivals and their social significance",
      "Rural India and changing lifestyles",
      "Folk traditions and their preservation",
      "Indian family values",
      "Atmanirbhar Bharat",
      "Youth and the preservation of heritage",
      "Traditional knowledge and modern innovation"
    ],
    rules: [
      "Team event with 4–10 participants.",
      "Maximum performance time: 8–10 minutes.",
      "Performance may be in Hindi, English or a combination of both.",
      "The skit should have a clear connection with Indian culture, heritage, values or contemporary India.",
      "Costumes and props may be used.",
      "Teams must arrange their own costumes and props.",
      "Background music and sound effects are permitted.",
      "Dialogues and acting must be performed live.",
      "Fire, weapons, hazardous substances and dangerous props are strictly prohibited.",
      "Vulgar, offensive or disrespectful portrayal of any religion, community, culture or tradition is not permitted.",
      "Teams must complete stage setup and clearance within the allotted time.",
      "Exceeding the prescribed performance time may result in penalty/disqualification."
    ]
  }
];"""
        
    if re.search(regex, content):
        content = re.sub(regex, new_event_details, content, count=1)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully updated eventDetails in InterSchool.jsx")
    else:
        print("Regex failed to match eventDetails in InterSchool.jsx")

update_events('src/pages/InterSchool.jsx')
