from rembg import remove
from PIL import Image

def process_logo(input_path, output_path):
    print("Processing with rembg...")
    with open(input_path, 'rb') as i:
        input_data = i.read()
    
    # rembg uses ONNX and U2Net to flawlessly extract the foreground
    output_data = remove(input_data)
    
    with open(output_path, 'wb') as o:
        o.write(output_data)
        
    print("Done! Flawless background removal.")

process_logo(r'C:\Users\devia\.gemini\antigravity\brain\d814fb6c-1711-4820-960a-433f864ecb21\.user_uploaded\media_1790189858565.png', r'public/logo.png')
