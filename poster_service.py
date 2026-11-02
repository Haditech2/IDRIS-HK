import os
import io
import base64
import uuid
from PIL import Image, ImageDraw
from data import FRAME_CONFIG

STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
FRAME_PATH = os.path.join(STATIC_DIR, "gone_frame.png")
UPLOAD_DIR = os.path.join(STATIC_DIR, "uploads", "posters")

os.makedirs(UPLOAD_DIR, exist_ok=True)

def generate_poster_image(image_input, crop_box=None):
    """
    Takes an image (PIL Image, bytes, file stream, or base64 dataUrl),
    crops it if crop_box is provided, clips it with rounded corners,
    places it behind the official gone_frame.png cutout, overlays the frame,
    and returns (poster_filename, poster_relative_url).
    """
    # 1. Parse image input
    if isinstance(image_input, str):
        if image_input.startswith("data:"):
            # Strip base64 header
            header, encoded = image_input.split(",", 1)
            image_bytes = base64.b64decode(encoded)
            user_img = Image.open(io.BytesIO(image_bytes)).convert("RGBA")
        elif os.path.exists(image_input):
            user_img = Image.open(image_input).convert("RGBA")
        else:
            raise ValueError("Invalid image input path or data URL")
    elif isinstance(image_input, bytes):
        user_img = Image.open(io.BytesIO(image_input)).convert("RGBA")
    elif hasattr(image_input, "read"):
        user_img = Image.open(image_input).convert("RGBA")
    elif isinstance(image_input, Image.Image):
        user_img = image_input.convert("RGBA")
    else:
        raise ValueError("Unsupported image input type")

    # 2. Crop if crop_box specified: (x, y, width, height)
    if crop_box and len(crop_box) == 4:
        cx, cy, cw, ch = [int(v) for v in crop_box]
        if cw > 0 and ch > 0:
            user_img = user_img.crop((cx, cy, cx + cw, cy + ch))

    # 3. Load official campaign frame
    frame = Image.open(FRAME_PATH).convert("RGBA")
    fw, fh = frame.size

    # 4. Target cutout specs from config
    cutout = FRAME_CONFIG["cutout"]
    left = cutout["left"]
    top = cutout["top"]
    draw_w = cutout["width"]
    draw_h = cutout["height"]
    radius = cutout.get("borderRadius", 28)

    # 5. Resize user photo to fit cutout precisely
    user_resized = user_img.resize((draw_w, draw_h), Image.Resampling.LANCZOS)

    # 6. Create rounded rectangle mask for the user photo
    mask = Image.new("L", (draw_w, draw_h), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.rounded_rectangle([(0, 0), (draw_w, draw_h)], radius=radius, fill=255)

    # 7. Composite: blank canvas -> user photo clipped by mask -> overlay frame
    canvas = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
    canvas.paste(user_resized, (left, top), mask)
    canvas.alpha_composite(frame)

    # 8. Save output
    filename = f"poster_{uuid.uuid4().hex[:12]}.png"
    output_path = os.path.join(UPLOAD_DIR, filename)
    canvas.save(output_path, format="PNG", optimize=True)

    relative_url = f"/static/uploads/posters/{filename}"
    return filename, relative_url

