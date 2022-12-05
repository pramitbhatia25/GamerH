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
    # print(animal)
    # return jsonify({"status": "STELLAR"+animal})


def generate_prompt(question):
    return (
"""Brad is an AI that helps Gamers learn about fitness.
You: Hi! I am Pramit. I like to drive.
Brad: Hi Pramit! I am Brad. I like to help people.
You: Hi! I am Kaartik. I like to drive.
Brad: Hi Kaartik! I am Brad. I like to help people.
You: {}
Brad:""".format(question))