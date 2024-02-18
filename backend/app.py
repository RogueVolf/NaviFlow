from flask import Flask,request,make_response,jsonify
from flask_restful import Resource,Api
from flask_cors import CORS
#from flask_sqlalchemy import SQLAlchemy
import chromadb

app = Flask(__name__)

CORS(app)

api = Api(app)

db = chromadb.PersistentClient('./db')

main_collection = db.get_collection(name="Queries")

#adding queries
class AddQueries(Resource):
    def post(self):
        if request.is_json:
            params = request.json
            id = params['id']
            answer = params['answer']
            username = params['username']
            try:
                get_result = main_collection.get(
                    ids=[str(id)],
                    include=['metadatas']
                )
                previous_answers = get_result['metadatas'][0]['answers']
                new_answers = "**".join([answer, previous_answers])

                previous_usernames = get_result['metadatas'][0]['username']
                new_usernames = "**".join([username,previous_usernames])

                main_collection.update(
                    ids = str(id),
                    metadatas={'answers': new_answers,
                               'username': new_usernames}
                )

                return make_response(jsonify({"success":f"Added a new answer for the question id {id}"},201))
            except Exception as e:
                return make_response(jsonify({"error":f"Could not add the answer due to {e}"},500))
        else:
            return make_response(jsonify({"error":"The data is not json"},400))
        
#getting all answers to a specific question
class GettingQueries(Resource):
    def get(self,id):
        try:
            get_result = main_collection.get(
                ids=[str(id)],
            )
            qid = get_result['ids'][0][0]
            metadata = get_result['metadatas'][0]
            answers = metadata['answers'].split("**")
            writer = metadata['username'].split("**")
            question = get_result['documents'][0]
            print(qid)
            data = {
                'id' : qid,
                'question' : question,
                'answers' : answers,
                'writer' : writer
            }
            return make_response(jsonify({'data':data},200))
        except Exception as e:
            return make_response(jsonify({'error':f'Error fetching the data: {e}'},500))

#getting relevant questions to a query
class Retreival(Resource):
    def get(self):
        query = request.args.get('query','No query given')
        if query == "No query given":
            raise ValueError(query)
        try:
            results = main_collection.query(
                query_texts=query,
                n_results=3
            )
            ids = results['ids'][0]
            metadata = results['metadatas'][0]
            questions = results['documents'][0]
            data = []
            for id,question,md in zip(ids,questions,metadata):
                answers = md['answers'].split("**")[0:2]
                usernames = md['username'].split("**")[0:2]
                print(usernames)
                data.append({
                    'id': id,
                    'title': question,
                    'answers':answers,
                    'writers': usernames
                })

            return make_response(jsonify({'data':data},200))
        except Exception as e:
            return make_response(jsonify({"error":f"Oops there was an error in querying: {e}"},500))

api.add_resource(AddQueries,'/add')
api.add_resource(GettingQueries,'/query/<int:id>')
api.add_resource(Retreival,'/retreival')

if __name__=="__main__":
    app.run(debug=True)