import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "gone.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    with conn:
        conn.execute("""
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
        """)
    conn.close()

def add_supporter(uid, name, lga, ward, custom_quote, poster_url):
    conn = get_db()
    now = datetime.utcnow().isoformat() + "Z"
    with conn:
        conn.execute("""
            INSERT INTO supporters (uid, name, lga, ward, custom_quote, poster_url, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (uid, name, lga, ward, custom_quote, poster_url, now))
    conn.close()

def get_all_supporters(lga=None, search=None):
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

def get_supporter_by_uid(uid):
    conn = get_db()
    row = conn.execute("SELECT * FROM supporters WHERE uid = ?", (uid,)).fetchone()
    conn.close()
    return dict(row) if row else None

def get_statistics():
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
