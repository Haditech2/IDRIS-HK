import os
import uuid
from flask import Flask, render_template, request, jsonify, redirect, url_for, send_from_directory
from data import G_ONE_CANDIDATE, CONSTITUENCY_LGAS, CANDIDATE_GALLERY, FRAME_CONFIG
from database import init_db, add_supporter, get_all_supporters, get_supporter_by_uid, get_statistics
from poster_service import generate_poster_image

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "g-one-campaign-secret-2027")
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16 MB max upload

# Initialize SQLite database on startup
init_db()

@app.context_processor
def inject_global_data():
    return {
        "candidate": G_ONE_CANDIDATE,
        "lgas": CONSTITUENCY_LGAS,
        "gallery": CANDIDATE_GALLERY,
        "frame_config": FRAME_CONFIG,
    }

@app.route("/")
def index():
    stats = get_statistics()
    recent_supporters = get_all_supporters()[:6]
    return render_template(
        "index.html",
        active_page="home",
        stats=stats,
        recent_supporters=recent_supporters,
    )

@app.route("/generate")
def generate():
    return render_template("generate.html", active_page="generate")

@app.route("/generate/success")
def success():
    uid = request.args.get("uid")
    poster_url = request.args.get("poster")
    supporter = None
    if uid:
        supporter = get_supporter_by_uid(uid)
        if supporter and not poster_url:
            poster_url = supporter["poster_url"]
            
    if not poster_url:
        poster_url = "/static/poster_sample_gone.png"
        
    return render_template(
        "success.html",
        active_page="generate",
        poster_url=poster_url,
        supporter=supporter,
    )

@app.route("/supporters")
def supporters():
    selected_lga = request.args.get("lga", "All")
    search_query = request.args.get("q", "")
    all_supporters = get_all_supporters(lga=selected_lga, search=search_query)
    stats = get_statistics()
    return render_template(
        "supporters.html",
        active_page="supporters",
        supporters=all_supporters,
        selected_lga=selected_lga,
        search_query=search_query,
        stats=stats,
    )

@app.route("/statistics")
def statistics():
    stats = get_statistics()
    all_supporters = get_all_supporters()
    return render_template(
        "statistics.html",
        active_page="statistics",
        stats=stats,
        supporters=all_supporters,
    )

# API ENDPOINTS
@app.route("/api/generate", methods=["POST"])
def api_generate():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "error": "No JSON payload provided"}), 400

        name = data.get("name", "").strip() or "Constituent Supporter"
        lga = data.get("lga", "").strip() or "Ankpa"
        ward = data.get("ward", "").strip() or "Township"
        custom_quote = data.get("custom_quote", "").strip()
        image_data = data.get("image_data")

        if not image_data:
            return jsonify({"success": False, "error": "No image data provided"}), 400

        # Generate official campaign poster
        filename, poster_url = generate_poster_image(image_data)

        # Save to database
        uid = uuid.uuid4().hex[:10]
        add_supporter(uid, name, lga, ward, custom_quote, poster_url)

        return jsonify({
            "success": True,
            "uid": uid,
            "poster_url": poster_url,
            "name": name,
            "lga": lga,
            "ward": ward,
        })
    except Exception as e:
        app.logger.error(f"Error in api_generate: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/supporters")
def api_supporters():
    lga = request.args.get("lga")
    search = request.args.get("q")
    supporters_list = get_all_supporters(lga=lga, search=search)
    return jsonify({"success": True, "supporters": supporters_list})

@app.route("/api/statistics")
def api_statistics():
    stats = get_statistics()
    return jsonify({"success": True, "statistics": stats})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

