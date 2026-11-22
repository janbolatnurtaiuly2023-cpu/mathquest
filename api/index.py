from fastapi import FastAPI
from mangum import Mangum
from datetime import datetime
import sqlite3
import os

app = FastAPI()

# Дерекқор файлының жолы (Vercel-де /tmp қалтасын қолданамыз)
DB_PATH = "/tmp/mathquest.db" if os.environ.get("VERCEL") else "mathquest.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS players
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT UNIQUE,
                  xp INTEGER DEFAULT 0,
                  coins INTEGER DEFAULT 0,
                  level INTEGER DEFAULT 1,
                  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

init_db()

@app.get("/api/hello")
def read_root():
    return {"message": "Сәлем, бұл Python-нан келген жауап!"}

@app.post("/api/check_answer")
def check_answer(data: dict):
    answer = data.get("answer", "")
    correct = data.get("correct", "")
    if answer.strip().lower() == correct.strip().lower():
        return {"correct": True, "message": "Дұрыс жауап!"}
    return {"correct": False, "message": "Қате жауап!"}

# Ойыншының деректерін сақтау (XP, монета)
@app.post("/api/update_player")
def update_player(data: dict):
    name = data.get("name")
    xp = data.get("xp", 0)
    coins = data.get("coins", 0)
    level = data.get("level", 1)
    
    if not name:
        return {"error": "Атыңызды енгізіңіз"}
    
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    try:
        c.execute('''INSERT INTO players (name, xp, coins, level, updated_at)
                     VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
                     ON CONFLICT(name) DO UPDATE SET
                     xp = excluded.xp,
                     coins = excluded.coins,
                     level = excluded.level,
                     updated_at = CURRENT_TIMESTAMP''',
                  (name, xp, coins, level))
        conn.commit()
        return {"success": True, "message": "Деректер сақталды"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        conn.close()

# Рейтингті алу (XP бойынша сұрыпталған)
@app.get("/api/leaderboard")
def get_leaderboard():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''SELECT name, xp, coins, level FROM players 
                 ORDER BY xp DESC LIMIT 20''')
    players = c.fetchall()
    conn.close()
    
    result = []
    for i, p in enumerate(players):
        result.append({
            "rank": i + 1,
            "name": p[0],
            "xp": p[1],
            "coins": p[2],
            "level": p[3]
        })
    return result
# Мұғалімге арналған: Барлық оқушылардың тізімі
@app.get("/api/teacher/students")
def get_all_students():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''SELECT name, xp, coins, level, updated_at FROM players 
                 ORDER BY xp DESC''')
    students = c.fetchall()
    conn.close()
    
    result = []
    for s in students:
        result.append({
            "name": s[0],
            "xp": s[1],
            "coins": s[2],
            "level": s[3],
            "last_active": s[4]
        })
    return result

handler = Mangum(app)