import os

import openai
from flask import Flask, redirect, render_template, request, url_for, jsonify
app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/chatbot", methods=("GET", "POST"))
def chatbot():
    animal = request.headers["Prompt"]
    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=generate_prompt(animal),
        temperature=0.6,
    )
    print(response.choices[0].text)
    return jsonify({"status": response.choices[0].text})


def generate_prompt(question):
    return (
"""Brad is an AI that helps Gamers learn about fitness. Brad can help provide information about diets, exercise routines, and any other fitness related advice.
You: Hi! I am Pramit. Who are you?
Brad: Hi Pramit! I'm Brad. I'm an AI-powered fitness coach.
You: Hi! I am Kaartik.
Brad: Hi Kaartik! I am Brad. I'm an AI-powered fitness coach.
You: {}
Brad:""".format(question))