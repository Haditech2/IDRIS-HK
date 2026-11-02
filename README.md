# G-ONE 2027 — Official Campaign Poster Generator Studio (Flask)

An official digital grassroots mobilization platform for **Prince Gowon Enenche (G-ONE)**, candidate for the Federal House of Representatives representing **Ankpa, Omala, and Olamaboro Federal Constituency**, Kogi State, under the **Social Democratic Party (SDP)**.

---

## 🌟 Candidate & Campaign Profile

- **Candidate:** Prince Gowon Enenche (G-ONE / G1)
- **Office:** Member, House of Representatives
- **Federal Constituency:** Ankpa, Omala, and Olamaboro Federal Constituency, Kogi State
- **Party:** Social Democratic Party (SDP)
- **Slogan:** Progress · In God We Trust · I Reserved For Him My Vote
- **Movement:** The G-1 Movement
- **Official Portal:** [https://g-one-chi.vercel.app](https://g-one-chi.vercel.app)
- **Origin:** Imane, Olamaboro Local Government Area, Kogi State
- **Education:** B.Sc. Political Science, Kogi State University
- **Enterprise:** Chairman & CEO, G1 Group of Companies & G-One Luxury Homes

### Legislative Blueprint & 4 Core Pillars:
1. **Economic Empowerment & Tech Hubs:** SME micro-grants, artisan tool distribution, youth digital bootcamps.
2. **Agrarian Revolution & Rural Roads:** Rural feeder road repairs to curb post-harvest losses and connect farms to commercial hubs.
3. **Quality Education & Youth Capital:** Scholarships, school renovations, vocational hubs.
4. **Accessible Healthcare & Social Safety Nets:** Community health outreach, primary center upgrades, welfare support for vulnerable families.

---

## 🚀 Key Features

- **Interactive Poster Studio (`/generate`)**:
  - Upload photo (JPG, PNG, WEBP).
  - High-precision cropping with zoom & pan using `Cropper.js`.
  - Live preview matching the exact 1024×1024 official G-ONE SDP campaign frame.
  - LGA selector for Ankpa, Omala, and Olamaboro with dynamic electoral ward attribution.
  - Server-side and client-side high-resolution Pillow compositing with instant automated download.
  - Confetti celebration upon poster creation.

- **Success & Social Mobilization (`/generate/success`)**:
  - Poster preview with re-download button.
  - One-click share to WhatsApp, Facebook, X (Twitter), and link copying.

- **Constituency Supporters Wall (`/supporters`)**:
  - Public gallery of generated supporter posters filterable by Ankpa, Omala, and Olamaboro.
  - Real-time search by supporter name.

- **Campaign Analytics (`/statistics`)**:
  - Live counts, percentages, and ward breakdown across the Federal Constituency.

---

## 💻 Tech Stack & Architecture

- **Backend:** Python 3.12+, Flask 3.1+
- **Image Processing Engine:** Pillow (PIL)
- **Database:** SQLite3 (`gone.db`)
- **Frontend / Styling:** Jinja2 templates, Tailwind CSS, Lucide Icons, Canvas Confetti, Cropper.js
- **WSGI / Production:** Gunicorn, Vercel Python Runtime (`@vercel/python`)

### Running Locally

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run Flask application
python app.py
```
Open [http://localhost:5000](http://localhost:5000) in your browser.
