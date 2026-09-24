import math
from PIL import Image

def remove_white_smooth(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.load()
    width, height = img.size
    
    # We want to make white (255, 255, 255) transparent.
    # low_dist: pixels closer to white than this will be fully transparent
    # high_dist: pixels further from white than this will be fully opaque
    low_dist = 15
    high_dist = 150
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = data[x, y]
            
            # Calculate distance from pure white (255, 255, 255)
            dist = math.sqrt((255 - r)**2 + (255 - g)**2 + (255 - b)**2)
            
            if dist <= low_dist:
                new_a = 0
            elif dist >= high_dist:
                new_a = 255
            else:
                # Smooth interpolation between low_dist and high_dist
                new_a = int(255 * (dist - low_dist) / (high_dist - low_dist))
            
            # If the pixel was anti-aliased with white, its RGB is artificially brightened.
            # We can try to recover the original color by assuming it was blended with white,
            # but for now, just setting the alpha creates a smooth anti-aliased cutout!
            # We enforce that the new alpha cannot exceed the original alpha.
            final_a = min(a, new_a)
            
            data[x, y] = (r, g, b, final_a)

    img.save(output_path, "PNG")
    print("Smooth background removed!")

remove_white_smooth(r'C:\Users\devia\.gemini\antigravity\brain\d814fb6c-1711-4820-960a-433f864ecb21\.user_uploaded\media_1790189858565.png', r'public/logo.png')
