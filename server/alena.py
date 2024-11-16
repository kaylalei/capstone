import requests
ingredients = {"category": "breakfast", "ingredients": ["apple", 'flour']}
response = requests.post('http://localhost:8080/api/alena-test', json=ingredients)
# ingredients = {"category": "breakfast", "ingredients": ["apple", 'flour']}
print(response.json())


# url = 'ow tohttps://www.w3schools.com/python/demopage.php'
# myobj = {'somekey': 'somevalue'}

# x = requests.post(url, json = myobj)

# print(x.text)