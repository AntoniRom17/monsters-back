$body = '{"email":"test@test.com","password":"password123"}'
Invoke-RestMethod -Uri "http://localhost:3000/auth/register" -Method POST -ContentType "application/json" -Body $body
