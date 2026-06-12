#!/bin/bash

echo "==========================================="
echo "🚀 Iniciando a instalação do MyJobFlow..."
echo "==========================================="
echo ""
echo "Isso pode levar alguns minutos na primeira vez, pois o Docker"
echo "irá baixar as dependências. Nas próximas vezes será bem mais rápido!"
echo ""
echo "🌐 Frontend disponível em: http://localhost:5173"
echo "⚙️  API disponível em: http://localhost:3333"
echo ""
echo "Pressione [Ctrl + C] a qualquer momento para desligar os servidores."
echo "==========================================="
echo ""

# Inicia os containers e prende o terminal (para poder parar com Ctrl+C)
docker compose -f docker-compose.run.yaml up
