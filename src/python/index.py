from flask import Flask, render_template
from bson.objectid import ObjectId
import pymongo
import json
import re

app = Flask(__name__)

conn = pymongo.MongoClient("localhost")
db = conn.news
collection = db['ifengnews2']

@app.route("/index")
def index():
  news_list = collection.find().limit(10)
  news_list = list(news_list)
  return render_template('index.html', news_list=news_list)

@app.route("/page/<id>")
def page(id):
  page = collection.find_one({"_id": ObjectId(id)})
  return render_template('page.html', page=page)

if __name__ == "__main__":
  app.run(debug=True)
