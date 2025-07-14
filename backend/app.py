from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os
import random

app = Flask(__name__)
CORS(app)

ai_images_path = r'L:\datatest\ai-generated-images-vs-real-images\AiArtData\AiArtData' #these are the paths for me. Data from https://www.kaggle.com/datasets/birdy654/cifake-real-and-ai-generated-synthetic-images
real_images_path = r'L:\datatest\ai-generated-images-vs-real-images\RealArt\RealArt'

def get_random_image():
    is_ai = random.choice([True, False])
    folder = ai_images_path if is_ai else real_images_path
    images = os.listdir(folder)
    image = random.choice(images)
    return {
        'image_path': image,
        'label': 'AI' if is_ai else 'Real',
    }

@app.route('/random-image', methods=['GET'])
def random_image():
    image = get_random_image()
    return jsonify(image)

@app.route('/images/<path:filename>', methods=['GET'])
def get_image(filename):
    if filename in os.listdir(ai_images_path):
        return send_from_directory(ai_images_path, filename)
    elif filename in os.listdir(real_images_path):
        return send_from_directory(real_images_path, filename)
    return "Image not found", 404

if __name__ == '__main__':
    app.run(debug=True)