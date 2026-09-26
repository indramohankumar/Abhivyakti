def update_home(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The fashion event string we want to replace
    start = content.find("name: 'Fashion'")
    if start == -1:
        print("Could not find Fashion event")
        return
        
    start_brace = content.rfind('{', 0, start)
    end_brace = content.find('},', start)
    
    if start_brace != -1 and end_brace != -1:
        prefix = content[:start_brace]
        suffix = content[end_brace:]
        
        # Keep the rulesLink just in case they want the old doc too, or we can just keep it but the UI will prefer `rules`
        new_event = """{ 
      name: 'Fashion', 
      desc: 'Fashion Show - Indian Ethnic Wear', 
      icon: Shirt, color: 'from-quantum-purple to-fuchsia-600', 
      image: 'https://media.gettyimages.com/id/2287626362/photo/delhi-india-models-walk-the-runway-during-the-house-of-masaba-show-at-india-couture-week-2026.jpg?s=612x612&w=0&k=20&c=WxbMRhqopDZfljOvv5AAaR1O7KEZwvSboR-zXerDA7E=', 
      rulesLink: 'https://docs.google.com/document/d/1Up1NfeKEmbHRGvk1ebK3Y3b9DgSlfKCl/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true',
      subEvents: ['Fashion Show - Indian Ethnic Wear'],
      rules: [
        "The competition is strictly an Individual Inter-University Indian Ethnic Fashion Show.",
        "Each participant must officially represent their respective University/Institution/College (Multiple participants from the same university can participate, but a participant cannot represent more than one institution).",
        "Participants must carry a valid University/Institution ID Card for verification.",
        "Theme: Indian Ethnic Wear. The presentation must prominently showcase Indian Ethnic Wear.",
        "Registration Fee: ₹100 per participant.",
        "The maximum performance time will be 2 minutes, including entry, presentation, and exit. Exceeding the prescribed time may result in deduction of marks.",
        "Costumes must be decent, dignified, culturally appropriate, and suitable for a University-level event.",
        "Vulgar, obscene, offensive, or inappropriate costumes, gestures, choreography, or lyrics are strictly prohibited.",
        "Fire, explosives, weapons, sharp objects, hazardous substances, and dangerous stage effects are strictly prohibited.",
        "All participants must report to the University by 9:00 AM sharp. No delay will be permitted.",
        "The decision of the judging panel shall be final and binding."
      ]"""
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(prefix + new_event + suffix)
        print("Updated Fashion event with rules array!")
    else:
        print("Could not find start or end braces.")

update_home('src/pages/Home.jsx')
