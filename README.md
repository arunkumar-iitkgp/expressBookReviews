# coding-project-template

1. register - curl.exe -i -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\`"username\`":\`"asfand\`",\`"password\`":\`"12345\`"}"
2. login - curl.exe -i -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\`"username\`":\`"asfand\`",\`"password\`":\`"12345\`"}"
3. All data - curl.exe -i -X GET http://localhost:5000 -H "Content-Type: application/json" -d "{\`"username\`":\`"asfand\`",\`"password\`":\`"12345\`"}"
4. logged in - curl.exe --% -i -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -c cookies.txt -d "{\"username\":\"asfand\",\"password\":\"12345\"}"
5. review written - curl.exe --% -i -X PUT http://localhost:5000/customer/auth/review/3 -H "Content-Type: application/json" -b cookies.txt -d "{\"review\":\"This is a fantastic book!\"}"
6. again seeing - curl.exe -i -X GET http://localhost:5000 -H "Content-Type: application/json" -d "{\`"username\`":\`"asfand\`",\`"password\`":\`"12345\`"}"                
7.  DELETE review - curl.exe --% -i -X DELETE http://localhost:5000/customer/auth/review/3 -b cookies.txt 
8. search by author - curl.exe --% -i -X GET http://localhost:5000/author/Jane_Austen
9. search by author - curl.exe --% -i -X GET http://localhost:5000/title/Pride_and_Prejudice
10. search by isbn - curl.exe --% -i -X GET http://localhost:5000/isbn/1
11. search by review - curl.exe --% -i -X GET http://localhost:5000/review/1
