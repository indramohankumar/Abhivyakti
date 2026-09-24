from PIL import Image

def remove_white_perfect(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.load()
    width, height = img.size
    
    for y in range(height):
        for x in range(width):
            r, g, b, orig_a = data[x, y]
            
            # min_o is the minimum channel value.
            min_o = min(r, g, b)
            
            # Calculate Alpha. 255 means fully opaque, 0 means fully transparent white.
            # We scale it slightly to ensure off-white backgrounds become fully transparent.
            # Let's say if min_o >= 245, it's pure white.
            if min_o >= 245:
                a = 0
            else:
                a = 255 - min_o
                
            if a == 0:
                data[x, y] = (255, 255, 255, 0)
            else:
                # Recover the original foreground color
                new_r = max(0, min(255, int((r - min_o) * 255 / a)))
                new_g = max(0, min(255, int((g - min_o) * 255 / a)))
                new_b = max(0, min(255, int((b - min_o) * 255 / a)))
                
                # If we scaled a threshold, a might be slightly off. Just cap a to 255.
                # Actually, let's boost a slightly to keep the image solid.
                a = min(255, int(a * 255 / (255 - 10))) # stretch alpha back to 255
                
                data[x, y] = (new_r, new_g, new_b, a)

    img.save(output_path, "PNG")
    print("Perfect mathematical background removal complete!")

# Use the original high-res image the user uploaded
remove_white_perfect(r'C:\Users\devia\.gemini\antigravity\brain\d814fb6c-1711-4820-960a-433f864ecb21\.user_uploaded\media_1790189858565.png', r'public/logo.png')
