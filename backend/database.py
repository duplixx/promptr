from pymongo import MongoClient

def get_database():
    client = MongoClient("mongodb+srv://shreyansh487:TjQS6d66CR9nP8Zd@cluster0.rfuhq.mongodb.net/promptr?retryWrites=true&w=majority&appName=Cluster0")
    return client["promptr"]