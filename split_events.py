import os
from PIL import Image

def slice_image(input_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    img = Image.open(input_path)
    width, height = img.size
    
    # 3 columns, 2 rows
    w = width // 3
    h = height // 2
    
    names = [
        "dance.jpg", "music.jpg", "fashion.jpg",
        "theatre.jpg", "fine-arts.jpg", "cuisine.jpg"
    ]
    
    idx = 0
    for row in range(2):
        for col in range(3):
            left = col * w
            upper = row * h
            right = left + w
            lower = upper + h
            
            cropped = img.crop((left, upper, right, lower))
            cropped.save(os.path.join(output_dir, names[idx]))
            print(f"Saved {names[idx]}")
            idx += 1

slice_image(r'C:\Users\devia\.gemini\antigravity\brain\d814fb6c-1711-4820-960a-433f864ecb21\.user_uploaded\media_1790216127912.jpg', r'public/events')
