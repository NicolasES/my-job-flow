# 🚀 MyJobFlow

**MyJobFlow** é uma aplicação completa (Full-stack) desenhada para ajudar profissionais a organizarem e gerenciarem suas candidaturas de emprego. Substitua as planilhas complexas por um Kanban intuitivo e tenha controle total sobre em qual etapa cada processo seletivo se encontra.

---

## 🎯 Principais Funcionalidades

- 📋 **Quadro Kanban Interativo**: Visualize e mova suas candidaturas entre diferentes fases (Ex: Aberto, Entrevista, Proposta, Rejeitado).
- ⚙️ **Status Personalizados**: Crie, exclua e reordene as colunas do Kanban conforme o seu próprio fluxo de entrevistas.
- 🗄️ **Arquivamento Inteligente**: Oculte vagas antigas do quadro principal sem perder o histórico, com uma tela dedicada e busca em tempo real.
- 📝 **Detalhes Ricos da Vaga**: Para cada candidatura, você pode gerenciar:
  - Contatos (Recrutadores, Gestores).
  - Links Úteis (Teste técnico, Vaga original).
  - Competências e Skills (Obrigatórias e Desejáveis).
  - Comentários e anotações cronológicas.

---

## 🛠️ Tecnologias Utilizadas

A aplicação adota uma arquitetura moderna e rigorosa (baseada em **Clean Architecture**), garantindo um código escalável, testável e de fácil manutenção.

### 💻 Front-end
- **React** (com Vite)
- **TypeScript**
- **Tailwind CSS** (para um design elegante, moderno e responsivo)
- **React Router DOM** (gerenciamento de rotas)
- **Context API** (para gerenciamento de estado global como Modais e Toasts)

### ⚙️ Back-end (API)
- **Node.js**
- **Fastify** (Micro-framework web de altíssima performance)
- **TypeScript**
- **Prisma ORM** (Acesso seguro e tipado ao banco de dados)
- **SQLite** (Banco de dados relacional embarcado, ideal para uso local e fácil setup)
- **Zod** (Validação rigorosa de dados de entrada)
- **Tsyringe** (Injeção de Dependências - SOLID)
- **Jest** (Para a suíte completa de Testes Automatizados)

---

## 📦 Como Instalar e Rodar (Via Docker)

A maneira mais fácil e recomendada de executar o **MyJobFlow** é utilizando o Docker. Você não precisa instalar o Node.js nem configurar bancos de dados na sua máquina. O ambiente já está totalmente conteinerizado!

### Pré-requisitos
- Ter o **Docker** e o **Docker Compose** instalados na sua máquina.
- Git (opcional, para clonar o repositório).

### Passo a Passo (Linux e Mac)

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/myjobflow.git
   cd myjobflow
   ```

2. Execute o script automatizado de inicialização:
   ```bash
   ./start.sh
   ```

> **Nota:** Na primeira vez que você executar o comando, o Docker fará o download das imagens do Node.js, instalará todas as dependências do Front-end e da API, criará o banco de dados (SQLite) e inserirá as colunas iniciais padrão (Seed). Nas próximas vezes, a inicialização levará apenas alguns segundos!

3. Acesse a aplicação:
   - 🌐 **Front-end (Interface):** [http://localhost:5173](http://localhost:5173)
   - ⚙️ **API (Back-end):** [http://localhost:3333](http://localhost:3333)

### Encerrando a aplicação
Como o `start.sh` mantém o terminal travado mostrando os logs ao vivo, basta pressionar **`Ctrl + C`** no terminal para encerrar os servidores em segurança.

---

## 🏗️ Arquitetura do Back-end

A API do projeto foi desenvolvida seguindo princípios rígidos de **SOLID** e **Clean Architecture**:
- **Entities:** Modelos de domínio puros sem dependências de frameworks.
- **UseCases (Interactors):** Contêm a regra de negócio da aplicação.
- **Controllers:** Responsáveis apenas por receber a requisição HTTP e devolver a resposta.
- **Repositories (Data Access):** Camada de infraestrutura que abstrai o Prisma ORM, permitindo que o banco de dados possa ser substituído no futuro sem afetar o domínio.

---

Desenvolvido com ❤️ para transformar a busca por emprego em um processo organizado.
