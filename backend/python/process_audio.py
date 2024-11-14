# /backend/python/process_audio.py

import sys
import librosa
import requests

def process_audio(file_path):
    y, sr = librosa.load(file_path)
    duration = librosa.get_duration(y=y, sr=sr)
    url = f"https://musicbrainz.org/ws/2/recording/?query=dur:{int(duration)}"
    headers = { "User-Agent": "MixID/1.0 (your-email@example.com)" }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        recordings = response.json().get("recordings", [])
        track_data = [{"title": rec["title"], "artist": rec["artist-credit"][0]["name"], "duration": rec["length"]} for rec in recordings]
        print(track_data)
    else:
        print("Error connecting to MusicBrainz API")

if __name__ == "__main__":
    file_path = sys.argv[1]
    process_audio(file_path)
