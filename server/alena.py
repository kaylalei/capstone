import requests
response = requests.get('http://localhost:8080/api/alena-test')
print(response.json())
