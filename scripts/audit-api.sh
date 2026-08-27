#!/bin/bash
API_URL="http://localhost:3000"

echo "--- Auditoría de API ---"
response=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/health)
if [ "$response" == "200" ]; then
  echo "✅ Salud API: OK"
else
  echo "❌ Salud API: FALLÓ (Código $response)"
fi
