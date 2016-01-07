from flask import Flask, render_template
from bson.objectid import ObjectId
import pymongo
import json
import re

app = Flask(__name__)

conn = pymongo.MongoClient("localhost")
db = conn.news
collection = db['ifengnews3']

@app.route("/")
def index():
  news_list = collection.find().sort('date', pymongo.DESCENDING).limit(10)
  news_list = list(news_list)
  return render_template('index.html', news_list=news_list, page_index = 1)

@app.route("/<page_index>")
def pager(page_index):
  page_index=int(page_index)
  news_list = collection.find().sort('date', pymongo.DESCENDING).skip((page_index - 1) * 10).limit(10)
  news_list = list(news_list)
  return render_template('index.html', news_list=news_list, page_index = page_index)

@app.route("/page/<id>")
def page(id):
  page = collection.find_one({"_id": ObjectId(id)})
  return render_template('page.html', page=page)

if __name__ == "__main__":
  app.run(debug=True)
