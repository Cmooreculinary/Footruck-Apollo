#!/usr/bin/env python3
"""Generate trucks 4-6"""
import asyncio
import os
from dotenv import load_dotenv
load_dotenv()

from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

API_KEY = os.environ.get("EMERGENT_LLM_KEY")
OUTPUT_DIR = "/app/frontend/public/trucks"

TRUCKS = [
    {
        "name": "truck_04",
        "prompt": "Ultra-realistic premium compact Ford Transit food truck, pure black background, side profile view, white matte automotive paint body, cinematic dusk food-market lighting, compact service window with warm interior glow, professional compact commercial kitchen build, pristine panels, realistic wheels and modern trim, nimble urban food truck aesthetic, generated but nearly photorealistic, not cartoon, not toy-like, studio product photography, isolated vehicle on solid black"
    },
    {
        "name": "truck_05",
        "prompt": "Ultra-realistic premium vintage Airstream food trailer, pure black background, side profile view, polished silver aluminum body with white service area panels, cinematic warm lighting, rounded aerodynamic retro shape, large fold-down service counter with warm interior glow, classic riveted aluminum details, realistic wheels and trailer hitch, retro-modern food business aesthetic, generated but nearly photorealistic, not cartoon, not toy-like, studio product photography, isolated vehicle on solid black"
    },
    {
        "name": "truck_06",
        "prompt": "Ultra-realistic premium open-air food trailer with canopy, pure black background, side profile view, white matte painted frame and panels, cinematic dusk lighting, open serving area with warm string lights, professional mobile food station build, stainless steel counters visible, realistic wheels and trailer frame, festival and market food truck aesthetic, generated but nearly photorealistic, not cartoon, not toy-like, studio product photography, isolated vehicle on solid black"
    },
]

async def main():
    image_gen = OpenAIImageGeneration(api_key=API_KEY)
    for truck in TRUCKS:
        print(f"Generating {truck['name']}...")
        try:
            images = await image_gen.generate_images(
                prompt=truck["prompt"],
                model="gpt-image-1",
                number_of_images=1
            )
            if images and len(images) > 0:
                path = os.path.join(OUTPUT_DIR, f"{truck['name']}.png")
                with open(path, "wb") as f:
                    f.write(images[0])
                print(f"  Saved {truck['name']}.png ({len(images[0])} bytes)")
        except Exception as e:
            print(f"  ERROR: {e}")
    print("\nBatch 2 complete")

if __name__ == "__main__":
    asyncio.run(main())
