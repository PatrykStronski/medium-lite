curl -X POST -H "Content-Type: application/json" --data '{ "query": "{ users { id name } }" }' http://localhost:3000/graphql

curl 'http://localhost:3000/graphql' \
  -X POST \
  -H 'content-type: application/json' \
  --data '{
    "query":"mutation { createUser(name: \"John Doe\", email:\"mail@mail.com\", password:\"1234\", role:\"user\") }"
  }'
