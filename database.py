import sqlite3
import os
import tempfile
from datetime import datetime

# In serverless environments (like Vercel), the system temp dir is writable
if os.environ.get("VERCEL") or not os.access(os.path.dirname(__file__), os.W_OK):
    DB_PATH = os.path.join(tempfile.gettempdir(), "gone.db")
else:
    DB_PATH = os.path.join(os.path.dirname(__file__), "gone.db")

CREATE_TABLE_SQL = """
    CREATE TABLE IF NOT EXISTS supporters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uid TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        lga TEXT NOT NULL,
        ward TEXT,
        custom_quote TEXT,
        poster_url TEXT NOT NULL,
        created_at TEXT NOT NULL
    )
"""

# Clean, realistic constituency mock supporters across Ankpa, Omala, and Olamaboro
MOCK_SUPPORTERS = [
    # Ankpa LGA
    {
        "uid": "mock_ankpa_01",
        "name": "Hon. Ibrahim Alfa",
        "lga": "Ankpa",
        "ward": "Ankpa Township",
        "custom_quote": "Prince Gowon Enenche represents the youthful energy and visionary leadership Ankpa has long awaited.",
        "poster_url": "/static/uploads/posters/mock_poster_1.png",
        "created_at": "2026-11-01T08:15:00Z",
    },
    {
        "uid": "mock_ankpa_02",
        "name": "Hajia Halimat Usman",
        "lga": "Ankpa",
        "ward": "Enjema I",
        "custom_quote": "His commitment to women and rural enterprise empowerment is unmatched. All for G-ONE!",
        "poster_url": "/static/uploads/posters/mock_poster_2.png",
        "created_at": "2026-11-01T09:20:00Z",
    },
    {
        "uid": "mock_ankpa_03",
        "name": "Comrade Yusuf Sani",
        "lga": "Ankpa",
        "ward": "Ojoku I",
        "custom_quote": "A leader who listens and delivers. Progress for Ankpa/Omala/Olamaboro in 2027.",
        "poster_url": "/static/uploads/posters/mock_poster_3.png",
        "created_at": "2026-11-01T10:45:00Z",
    },
    {
        "uid": "mock_ankpa_04",
        "name": "Fatima Suleiman",
        "lga": "Ankpa",
        "ward": "Biraidu (Okaba)",
        "custom_quote": "The grassroots will vote competence and character. In God We Trust!",
        "poster_url": "/static/uploads/posters/mock_poster_4.png",
        "created_at": "2026-11-01T12:10:00Z",
    },
    {
        "uid": "mock_ankpa_05",
        "name": "Mallam Mohammed Abubakar",
        "lga": "Ankpa",
        "ward": "Ankpa Suburb I",
        "custom_quote": "Prince Gowon has shown immense love for our communities long before declaring his ambition.",
        "poster_url": "/static/uploads/posters/mock_poster_5.png",
        "created_at": "2026-11-01T13:30:00Z",
    },
    {
        "uid": "mock_ankpa_06",
        "name": "Zainab Idris",
        "lga": "Ankpa",
        "ward": "Enjema II",
        "custom_quote": "Proud to stand with Prince Gowon Enenche. SDP is the party of genuine progress.",
        "poster_url": "/static/uploads/posters/mock_poster_6.png",
        "created_at": "2026-11-01T14:50:00Z",
    },
    {
        "uid": "mock_ankpa_07",
        "name": "Usman Faruk",
        "lga": "Ankpa",
        "ward": "Ojoku II",
        "custom_quote": "Empowering our youth with tech and artisan tools will transform our constituency.",
        "poster_url": "/static/uploads/posters/mock_poster_7.png",
        "created_at": "2026-11-01T15:40:00Z",
    },
    {
        "uid": "mock_ankpa_08",
        "name": "Maryam Abdullahi",
        "lga": "Ankpa",
        "ward": "Biraidu (Awo)",
        "custom_quote": "Prince Gowon Enenche has my vote and my full community support.",
        "poster_url": "/static/uploads/posters/mock_poster_8.png",
        "created_at": "2026-11-01T16:25:00Z",
    },

    # Omala LGA
    {
        "uid": "mock_omala_01",
        "name": "Elder Joshua Idoko",
        "lga": "Omala",
        "ward": "Abejukolo I",
        "custom_quote": "Omala stands firmly behind G-ONE. We believe in his rural agrarian revitalization agenda.",
        "poster_url": "/static/uploads/posters/mock_poster_1.png",
        "created_at": "2026-11-01T17:10:00Z",
    },
    {
        "uid": "mock_omala_02",
        "name": "Comfort Ocholi",
        "lga": "Omala",
        "ward": "Bagana",
        "custom_quote": "Connecting our riverine farmers to viable markets is the change Omala truly needs.",
        "poster_url": "/static/uploads/posters/mock_poster_2.png",
        "created_at": "2026-11-01T18:05:00Z",
    },
    {
        "uid": "mock_omala_03",
        "name": "Engr. Daniel Akoh",
        "lga": "Omala",
        "ward": "Bagaji",
        "custom_quote": "G-ONE has the business acumen, network, and political willpower to deliver effective representation.",
        "poster_url": "/static/uploads/posters/mock_poster_3.png",
        "created_at": "2026-11-01T19:00:00Z",
    },
    {
        "uid": "mock_omala_04",
        "name": "Grace Ali",
        "lga": "Omala",
        "ward": "Akpacha",
        "custom_quote": "Our women farmers are ready to mobilize 100% for Prince Gowon Enenche.",
        "poster_url": "/static/uploads/posters/mock_poster_4.png",
        "created_at": "2026-11-01T19:45:00Z",
    },
    {
        "uid": "mock_omala_05",
        "name": "Gabriel Ekele",
        "lga": "Omala",
        "ward": "Ogodu",
        "custom_quote": "A new dawn of accountable representation for Omala LGA.",
        "poster_url": "/static/uploads/posters/mock_poster_5.png",
        "created_at": "2026-11-01T20:30:00Z",
    },
    {
        "uid": "mock_omala_06",
        "name": "Emmanuel Attah",
        "lga": "Omala",
        "ward": "Icheke",
        "custom_quote": "Prince Gowon is a unifier across all ethnic and political divides.",
        "poster_url": "/static/uploads/posters/mock_poster_6.png",
        "created_at": "2026-11-01T21:15:00Z",
    },
    {
        "uid": "mock_omala_07",
        "name": "Hassana Audu",
        "lga": "Omala",
        "ward": "Oji-Aji",
        "custom_quote": "Youth empowerment and accessible education are why we choose G-ONE.",
        "poster_url": "/static/uploads/posters/mock_poster_7.png",
        "created_at": "2026-11-01T22:00:00Z",
    },
    {
        "uid": "mock_omala_08",
        "name": "Sunday Oche",
        "lga": "Omala",
        "ward": "Ife",
        "custom_quote": "SDP Progress for Omala, Ankpa, and Olamaboro!",
        "poster_url": "/static/uploads/posters/mock_poster_8.png",
        "created_at": "2026-11-01T22:45:00Z",
    },

    # Olamaboro LGA
    {
        "uid": "mock_olamaboro_01",
        "name": "Prince David Ameh",
        "lga": "Olamaboro",
        "ward": "Imane I",
        "custom_quote": "Son of the soil, pride of Imane. Prince Gowon Enenche has the integrity and vision we trust.",
        "poster_url": "/static/uploads/posters/mock_poster_1.png",
        "created_at": "2026-11-02T06:30:00Z",
    },
    {
        "uid": "mock_olamaboro_02",
        "name": "Blessing Ogwu",
        "lga": "Olamaboro",
        "ward": "Okpo",
        "custom_quote": "Quality education and modern health centers for every ward in Olamaboro.",
        "poster_url": "/static/uploads/posters/mock_poster_2.png",
        "created_at": "2026-11-02T07:15:00Z",
    },
    {
        "uid": "mock_olamaboro_03",
        "name": "Dr. Samuel Onuche",
        "lga": "Olamaboro",
        "ward": "Ogugu I",
        "custom_quote": "The legislative vision of G-ONE will attract meaningful federal presence to Kogi East.",
        "poster_url": "/static/uploads/posters/mock_poster_3.png",
        "created_at": "2026-11-02T08:00:00Z",
    },
    {
        "uid": "mock_olamaboro_04",
        "name": "Rebecca Apeh",
        "lga": "Olamaboro",
        "ward": "Adeh",
        "custom_quote": "Standing strong for the leader of our dream. Gowon Enenche for House of Reps 2027!",
        "poster_url": "/static/uploads/posters/mock_poster_4.png",
        "created_at": "2026-11-02T08:45:00Z",
    },
    {
        "uid": "mock_olamaboro_05",
        "name": "Elijah Omale",
        "lga": "Olamaboro",
        "ward": "Inele",
        "custom_quote": "His philanthropy speaks volumes across communities in Olamaboro and beyond.",
        "poster_url": "/static/uploads/posters/mock_poster_5.png",
        "created_at": "2026-11-02T09:30:00Z",
    },
    {
        "uid": "mock_olamaboro_06",
        "name": "Joy Momoh",
        "lga": "Olamaboro",
        "ward": "Imane II",
        "custom_quote": "Integrity, compassion, and progress. I Reserved For Him My Vote!",
        "poster_url": "/static/uploads/posters/mock_poster_6.png",
        "created_at": "2026-11-02T10:15:00Z",
    },
    {
        "uid": "mock_olamaboro_07",
        "name": "Moses Onoja",
        "lga": "Olamaboro",
        "ward": "Ogugu II",
        "custom_quote": "A tested entrepreneur who understands wealth creation and constituency development.",
        "poster_url": "/static/uploads/posters/mock_poster_7.png",
        "created_at": "2026-11-02T11:00:00Z",
    },
    {
        "uid": "mock_olamaboro_08",
        "name": "Deborah Okpanachi",
        "lga": "Olamaboro",
        "ward": "Ochadamu",
        "custom_quote": "The future is bright with G-ONE representing us at the National Assembly.",
        "poster_url": "/static/uploads/posters/mock_poster_8.png",
        "created_at": "2026-11-02T11:45:00Z",
    },
]

def seed_mock_supporters(conn):
    try:
        conn.executemany("""
            INSERT OR IGNORE INTO supporters (uid, name, lga, ward, custom_quote, poster_url, created_at)
            VALUES (:uid, :name, :lga, :ward, :custom_quote, :poster_url, :created_at)
        """, MOCK_SUPPORTERS)
    except Exception as e:
        print("Warning: seed_mock_supporters failed:", e)

def get_db():
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        with conn:
            conn.execute(CREATE_TABLE_SQL)
            # Ensure all clean mock supporters exist via INSERT OR IGNORE
            seed_mock_supporters(conn)
        return conn
    except Exception:
        conn = sqlite3.connect(":memory:")
        conn.row_factory = sqlite3.Row
        with conn:
            conn.execute(CREATE_TABLE_SQL)
            seed_mock_supporters(conn)
        return conn

def init_db():
    try:
        conn = get_db()
        conn.close()
    except Exception as e:
        print("Warning: init_db fallback:", e)

def add_supporter(uid, name, lga, ward, custom_quote, poster_url):
    try:
        conn = get_db()
        now = datetime.utcnow().isoformat() + "Z"
        with conn:
            conn.execute("""
                INSERT INTO supporters (uid, name, lga, ward, custom_quote, poster_url, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (uid, name, lga, ward, custom_quote, poster_url, now))
        conn.close()
    except Exception as e:
        print("Warning: add_supporter failed:", e)

def get_all_supporters(lga=None, search=None):
    try:
        conn = get_db()
        query = "SELECT * FROM supporters WHERE 1=1"
        params = []
        if lga and lga.lower() != "all":
            query += " AND lga = ?"
            params.append(lga)
        if search:
            query += " AND name LIKE ?"
            params.append(f"%{search}%")
        query += " ORDER BY id DESC"
        
        rows = conn.execute(query, params).fetchall()
        conn.close()
        return [dict(r) for r in rows]
    except Exception as e:
        print("Warning: get_all_supporters failed:", e)
        return []

def get_supporter_by_uid(uid):
    try:
        conn = get_db()
        row = conn.execute("SELECT * FROM supporters WHERE uid = ?", (uid,)).fetchone()
        conn.close()
        return dict(row) if row else None
    except Exception:
        return None

def get_statistics():
    try:
        conn = get_db()
        total_posters = conn.execute("SELECT COUNT(*) as c FROM supporters").fetchone()["c"]
        
        lga_counts = {}
        rows = conn.execute("SELECT lga, COUNT(*) as c FROM supporters GROUP BY lga").fetchall()
        for r in rows:
            lga_counts[r["lga"]] = r["c"]
            
        ward_rows = conn.execute("SELECT lga, ward, COUNT(*) as c FROM supporters GROUP BY lga, ward").fetchall()
        ward_counts = {}
        for r in ward_rows:
            key = f"{r['lga']}__{r['ward']}"
            ward_counts[key] = r["c"]
            
        conn.close()
        return {
            "total_posters": total_posters,
            "lga_counts": lga_counts,
            "ward_counts": ward_counts,
        }
    except Exception as e:
        print("Warning: get_statistics fallback:", e)
        return {
            "total_posters": 0,
            "lga_counts": {},
            "ward_counts": {},
        }

