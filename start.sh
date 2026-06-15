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

# Cria o .env da API se não existir
if [ ! -f "api/.env" ]; then
    echo "⚙️  Criando api/.env a partir do .env.example..."
    cp api/.env.example api/.env
fi

# Cria o .env do Front-end se não existir
if [ ! -f "my-job-flow/.env" ]; then
    echo "🌐 Criando my-job-flow/.env a partir do .env.example..."
    cp my-job-flow/.env.example my-job-flow/.env
fi

# Inicia os containers e prende o terminal (para poder parar com Ctrl+C)
docker compose -f docker-compose.run.yaml up
