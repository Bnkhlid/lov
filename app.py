from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

photos = []
music  = []
notes  = []

# ---- CSP Header ---- #
@app.after_request
def add_csp(resp):
    resp.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com;"
    )
    return resp

# ---- Photos ---- #
@app.route('/api/photos', methods=['GET'])
def get_photos():
    return jsonify(photos)

@app.route('/api/photos', methods=['POST'])
def add_photo():
    data = request.get_json()
    photos.append(data['image'])
    return jsonify({'success': True})

@app.route('/api/photos/delete', methods=['POST'])
def delete_photo():
    idx = request.json.get('index')
    if isinstance(idx, int) and 0 <= idx < len(photos):
        photos.pop(idx)
        return jsonify({'success': True})
    return jsonify({'success': False, 'error': 'Bad index'}), 400

# ---- Music ---- #
@app.route('/api/music', methods=['GET'])
def get_music():
    return jsonify(music)

@app.route('/api/music', methods=['POST'])
def add_music():
    data = request.get_json()
    music.append({'name': data['name'], 'src': data['src']})
    return jsonify({'success': True})

@app.route('/api/music/delete', methods=['POST'])
def delete_music():
    idx = request.json.get('index')
    if isinstance(idx, int) and 0 <= idx < len(music):
        music.pop(idx)
        return jsonify({'success': True})
    return jsonify({'success': False, 'error': 'Bad index'}), 400

# ---- Notes ---- #
@app.route('/api/notes', methods=['GET'])
def get_notes():
    return jsonify(notes)

@app.route('/api/notes', methods=['POST'])
def add_note():
    data = request.get_json()
    notes.append(data['note'])
    return jsonify({'success': True})

@app.route('/api/notes/delete', methods=['POST'])
def delete_note():
    idx = request.json.get('index')
    if isinstance(idx, int) and 0 <= idx < len(notes):
        notes.pop(idx)
        return jsonify({'success': True})
    return jsonify({'success': False, 'error': 'Bad index'}), 400

# Export for Vercel
if __name__ == '__main__':
    app.run(debug=True)