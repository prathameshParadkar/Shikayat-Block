from flask import Flask, request, jsonify
import pickle
import pandas as pd
import requests
import mapi_key

model = pickle.load(open("model.pkl", "rb"))



app = Flask(__name__)

@app.route('/get_data', methods=['GET'])
def get_data():
    # Get the 'id' parameter from the query string
    id_param = request.args.get('id')
    
    # Check if 'id' parameter is provided
    if id_param is None:
        return jsonify({'error': 'Missing "id" parameter'}), 400
    
    # Make a request to the external API
    api_key = mapi_key.key 
    api_url = f'https://services.tokenview.io/vipapi/eth/address/{id_param.lower()}?apikey={api_key}'
    
    try:
        response = requests.get(api_url)
        response_data = response.json()
        print(response_data["data"])
        data =  response_data["data"]
        data = {'Sent tnx': [data["normalSpendTxCount"]],
                'Received Tnx': [data["normalReceiveTxCount"]],
                'total transactions (including tnx to create contract': [data["normalTxCount"]],
                'total Ether sent': [float(data["spend"])*-1],
                'total ether received': [data["receive"]],
                'total ether balance': [data["balance"]]}

        test_df = pd.DataFrame(data)
        ans = model.predict(test_df)
        result = ans.tolist()
        return jsonify({"prediction": result[0]}), 200
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch data from the external API'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
