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

# Clean, realistic constituency mock supporters across all 9 LGAs of Kogi East Senatorial District
MOCK_SUPPORTERS = [
    # Ankpa LGA
    {
        "uid": "idrisima_ankpa_01",
        "name": "Hon. Ibrahim Alfa",
        "lga": "Ankpa",
        "ward": "Ankpa Township",
        "custom_quote": "Idris HK Idrisima represents true legislative courage. Kogi East will speak with one voice in the Senate.",
        "poster_url": "/static/uploads/posters/idrisima_mock_1.png",
        "created_at": "2026-11-01T08:15:00Z",
    },
    {
        "uid": "idrisima_ankpa_02",
        "name": "Hajia Halimat Usman",
        "lga": "Ankpa",
        "ward": "Enjema I",
        "custom_quote": "Standing For The People! Idrisima has always championed grassroots economic empowerment.",
        "poster_url": "/static/uploads/posters/idrisima_mock_2.png",
        "created_at": "2026-11-01T09:20:00Z",
    },
    {
        "uid": "idrisima_ankpa_03",
        "name": "Comrade Yusuf Sani",
        "lga": "Ankpa",
        "ward": "Ojoku I",
        "custom_quote": "Ankpa is 100% SDP. Progress and purposeful representation at the Red Chamber.",
        "poster_url": "/static/uploads/posters/idrisima_mock_3.png",
        "created_at": "2026-11-01T10:45:00Z",
    },

    # Bassa LGA
    {
        "uid": "idrisima_bassa_01",
        "name": "Elder Daniel Kpata",
        "lga": "Bassa",
        "ward": "Oguma",
        "custom_quote": "Bassa land is solidly behind Idris HK Idrisima. He is a tested unifier.",
        "poster_url": "/static/uploads/posters/idrisima_mock_4.png",
        "created_at": "2026-11-01T11:10:00Z",
    },
    {
        "uid": "idrisima_bassa_02",
        "name": "Grace Akuba",
        "lga": "Bassa",
        "ward": "Akuba I",
        "custom_quote": "Your Voice, Your Representation. I reserved for him my vote!",
        "poster_url": "/static/uploads/posters/idrisima_mock_5.png",
        "created_at": "2026-11-01T12:00:00Z",
    },
    {
        "uid": "idrisima_bassa_03",
        "name": "Mohammed Gboloko",
        "lga": "Bassa",
        "ward": "Gboloko",
        "custom_quote": "The agricultural potential of Bassa will flourish with Idrisima in the Senate.",
        "poster_url": "/static/uploads/posters/idrisima_mock_6.png",
        "created_at": "2026-11-01T12:50:00Z",
    },

    # Dekina LGA
    {
        "uid": "idrisima_dekina_01",
        "name": "Dr. Usman Anyigba",
        "lga": "Dekina",
        "ward": "Anyigba",
        "custom_quote": "A leader with intellect, pedigree, and genuine grassroots empathy.",
        "poster_url": "/static/uploads/posters/idrisima_mock_7.png",
        "created_at": "2026-11-01T13:30:00Z",
    },
    {
        "uid": "idrisima_dekina_02",
        "name": "Fatima Egume",
        "lga": "Dekina",
        "ward": "Egume",
        "custom_quote": "Dekina will vote for progress. Idris HK Idrisima is the pride of Kogi East.",
        "poster_url": "/static/uploads/posters/idrisima_mock_8.png",
        "created_at": "2026-11-01T14:15:00Z",
    },
    {
        "uid": "idrisima_dekina_03",
        "name": "Engr. Salifu Abocho",
        "lga": "Dekina",
        "ward": "Abocho",
        "custom_quote": "His vision for youth tech hubs and rural infrastructure will transform our land.",
        "poster_url": "/static/uploads/posters/idrisima_mock_9.png",
        "created_at": "2026-11-01T15:00:00Z",
    },

    # Ibaji LGA
    {
        "uid": "idrisima_ibaji_01",
        "name": "Comrade Sunday Odeke",
        "lga": "Ibaji",
        "ward": "Odeke",
        "custom_quote": "Ibaji needs federal flood defenses and agro-corridors. Idrisima is the voice we trust.",
        "poster_url": "/static/uploads/posters/idrisima_mock_1.png",
        "created_at": "2026-11-01T15:45:00Z",
    },
    {
        "uid": "idrisima_ibaji_02",
        "name": "Blessing Onyedega",
        "lga": "Ibaji",
        "ward": "Onyedega",
        "custom_quote": "Standing For The People. In God We Trust, progress is here.",
        "poster_url": "/static/uploads/posters/idrisima_mock_2.png",
        "created_at": "2026-11-01T16:20:00Z",
    },
    {
        "uid": "idrisima_ibaji_03",
        "name": "Gabriel Analo",
        "lga": "Ibaji",
        "ward": "Analo",
        "custom_quote": "Ibaji will deliver bulk votes for Idris HK Idrisima and the SDP.",
        "poster_url": "/static/uploads/posters/idrisima_mock_3.png",
        "created_at": "2026-11-01T17:00:00Z",
    },

    # Idah LGA
    {
        "uid": "idrisima_idah_01",
        "name": "Prince Yakubu Ede",
        "lga": "Idah",
        "ward": "Idah Township",
        "custom_quote": "From the ancient throne of Idah to the Senate, Idrisima has our blessings.",
        "poster_url": "/static/uploads/posters/idrisima_mock_4.png",
        "created_at": "2026-11-01T17:40:00Z",
    },
    {
        "uid": "idrisima_idah_02",
        "name": "Hadiza Sabon-Gari",
        "lga": "Idah",
        "ward": "Sabon Gari",
        "custom_quote": "True representation means being there for the everyday citizens. Vote Idrisima!",
        "poster_url": "/static/uploads/posters/idrisima_mock_5.png",
        "created_at": "2026-11-01T18:15:00Z",
    },
    {
        "uid": "idrisima_idah_03",
        "name": "Mallam Suleiman Igalaogba",
        "lga": "Idah",
        "ward": "Igalaogba",
        "custom_quote": "SDP Progress! Together we will restore the glory of Kogi East.",
        "poster_url": "/static/uploads/posters/idrisima_mock_6.png",
        "created_at": "2026-11-01T18:50:00Z",
    },

    # Igalamela-Odolu LGA
    {
        "uid": "idrisima_igalamela_01",
        "name": "Hon. Moses Ajaka",
        "lga": "Igalamela-Odolu",
        "ward": "Ajaka I",
        "custom_quote": "Idris HK Idrisima has the character and experience to champion Kogi East's interests.",
        "poster_url": "/static/uploads/posters/idrisima_mock_7.png",
        "created_at": "2026-11-01T19:25:00Z",
    },
    {
        "uid": "idrisima_igalamela_02",
        "name": "Rebecca Odolu",
        "lga": "Igalamela-Odolu",
        "ward": "Odolu",
        "custom_quote": "Our communities are energized. Idrisima stands for every family.",
        "poster_url": "/static/uploads/posters/idrisima_mock_8.png",
        "created_at": "2026-11-01T20:00:00Z",
    },
    {
        "uid": "idrisima_igalamela_03",
        "name": "Joshua Akpanya",
        "lga": "Igalamela-Odolu",
        "ward": "Akpanya",
        "custom_quote": "I Reserved For Him My Vote. Victory for SDP in 2027!",
        "poster_url": "/static/uploads/posters/idrisima_mock_9.png",
        "created_at": "2026-11-01T20:40:00Z",
    },

    # Ofu LGA
    {
        "uid": "idrisima_ofu_01",
        "name": "Elder Michael Ugwolawo",
        "lga": "Ofu",
        "ward": "Ugwolawo I",
        "custom_quote": "Ofu is fully aligned with the IDRISIMA mandate. A true servant-leader.",
        "poster_url": "/static/uploads/posters/idrisima_mock_1.png",
        "created_at": "2026-11-01T21:15:00Z",
    },
    {
        "uid": "idrisima_ofu_02",
        "name": "Comfort Itobe",
        "lga": "Ofu",
        "ward": "Itobe",
        "custom_quote": "A fearless voice for Kogi East in the Senate. All for Idrisima!",
        "poster_url": "/static/uploads/posters/idrisima_mock_2.png",
        "created_at": "2026-11-01T21:50:00Z",
    },
    {
        "uid": "idrisima_ofu_03",
        "name": "David Ejule",
        "lga": "Ofu",
        "ward": "Ejule",
        "custom_quote": "Progress, empowerment, and honest governance. We stand with Idrisima.",
        "poster_url": "/static/uploads/posters/idrisima_mock_3.png",
        "created_at": "2026-11-01T22:20:00Z",
    },

    # Olamaboro LGA
    {
        "uid": "idrisima_olamaboro_01",
        "name": "Prince David Ameh",
        "lga": "Olamaboro",
        "ward": "Imane I",
        "custom_quote": "A principled leader who never wavers in standing for the ordinary people.",
        "poster_url": "/static/uploads/posters/idrisima_mock_4.png",
        "created_at": "2026-11-02T06:30:00Z",
    },
    {
        "uid": "idrisima_olamaboro_02",
        "name": "Blessing Ogwu",
        "lga": "Olamaboro",
        "ward": "Okpo",
        "custom_quote": "Quality education and modern health centers for every ward in Kogi East.",
        "poster_url": "/static/uploads/posters/idrisima_mock_5.png",
        "created_at": "2026-11-02T07:15:00Z",
    },
    {
        "uid": "idrisima_olamaboro_03",
        "name": "Dr. Samuel Onuche",
        "lga": "Olamaboro",
        "ward": "Ogugu I",
        "custom_quote": "The legislative vision of Idrisima will attract meaningful federal presence.",
        "poster_url": "/static/uploads/posters/idrisima_mock_6.png",
        "created_at": "2026-11-02T08:00:00Z",
    },

    # Omala LGA
    {
        "uid": "idrisima_omala_01",
        "name": "Elder Joshua Idoko",
        "lga": "Omala",
        "ward": "Abejukolo I",
        "custom_quote": "Omala stands firmly behind Idris HK Idrisima. He believes in agrarian prosperity.",
        "poster_url": "/static/uploads/posters/idrisima_mock_7.png",
        "created_at": "2026-11-02T08:45:00Z",
    },
    {
        "uid": "idrisima_omala_02",
        "name": "Comfort Ocholi",
        "lga": "Omala",
        "ward": "Bagana",
        "custom_quote": "Connecting riverine farmers to viable markets is the change we need.",
        "poster_url": "/static/uploads/posters/idrisima_mock_8.png",
        "created_at": "2026-11-02T09:30:00Z",
    },
    {
        "uid": "idrisima_omala_03",
        "name": "Engr. Daniel Akoh",
        "lga": "Omala",
        "ward": "Bagaji",
        "custom_quote": "Idrisima has the willpower and vision to deliver effective senatorial representation.",
        "poster_url": "/static/uploads/posters/idrisima_mock_9.png",
        "created_at": "2026-11-02T10:15:00Z",
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

