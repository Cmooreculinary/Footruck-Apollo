#!/usr/bin/env python3
"""Generate ultra-realistic food truck images using OpenAI GPT Image 1"""
import asyncio
import os
import sys
from dotenv import load_dotenv
load_dotenv()

from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

API_KEY = os.environ.get("EMERGENT_LLM_KEY")
OUTPUT_DIR = "/app/frontend/public/trucks"

TRUCKS = [
    {
        "name": "truck_01",
        "prompt": "Ultra-realistic premium modern step van food truck, pure black background, side profile view, white matte automotive paint body, cinematic dusk food-market lighting, warm glowing service window revealing professional stainless steel kitchen interior, pristine body panels, realistic black rubber wheels with detailed treads, chrome bumper and trim accents, tasteful menu board area on side panel, high-end street-food startup aesthetic, urban atmosphere, generated but nearly photorealistic, not cartoon, not toy-like, not cheap clipart, studio product photography quality, isolated vehicle on solid black"
    },
    {
        "name": "truck_02", 
        "prompt": "Ultra-realistic premium modern Sprinter van food truck, pure black background, side profile view, white matte automotive paint body, cinematic warm dusk lighting, large sliding service window with warm interior glow showing professional kitchen, sleek streamlined body panels, realistic alloy wheels, modern clean design, professional commercial mobile kitchen build, high-end street-food startup aesthetic, generated but nearly photorealistic, not cartoon, not toy-like, studio product photography, isolated vehicle on solid black"
    },
    {
        "name": "truck_03",
        "prompt": "Ultra-realistic premium large box truck food truck, pure black background, side profile view, white matte automotive paint body, cinematic dusk lighting, extra-wide fold-out service window with warm kitchen glow, heavy duty commercial build, clean flat body panels perfect for branding, realistic dual rear wheels, chrome trim details, professional mobile restaurant aesthetic, generated but nearly photorealistic, not cartoon, not toy-like, studio product photography, isolated vehicle on solid black"
    },
]

async def generate_truck(image_gen, truck):
    print(f"Generating {truck['name']}...")
    try:
        images = await image_gen.generate_images(
            prompt=truck["prompt"],
            model="gpt-image-1",
            number_of_images=1
        )
        if images and len(images) > 0:
            output_path = os.path.join(OUTPUT_DIR, f"{truck['name']}.png")
            with open(output_path, "wb") as f:
                f.write(images[0])
            print(f"  Saved {truck['name']}.png ({len(images[0])} bytes)")
            return True
        else:
            print(f"  No image returned for {truck['name']}")
            return False
    except Exception as e:
        print(f"  ERROR {truck['name']}: {e}")
        return False

async def main():
    image_gen = OpenAIImageGeneration(api_key=API_KEY)
    
    # Generate first 3 trucks
    for truck in TRUCKS:
        success = await generate_truck(image_gen, truck)
        if not success:
            print(f"Failed to generate {truck['name']}, stopping")
            sys.exit(1)
    
    print("\nBatch 1 complete (3 trucks)")

if __name__ == "__main__":
    asyncio.run(main())
