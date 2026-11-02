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

def get_db():
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        with conn:
            conn.execute(CREATE_TABLE_SQL)
        return conn
    except Exception:
        conn = sqlite3.connect(":memory:")
        conn.row_factory = sqlite3.Row
        with conn:
            conn.execute(CREATE_TABLE_SQL)
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
