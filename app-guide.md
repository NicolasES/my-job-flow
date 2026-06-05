# Guia do Projeto: Personal Job Application Tracker

Este documento serve como guia de especificação técnica, modelagem de dados e escopo para o desenvolvimento de um sistema simples e direto de controle de processos seletivos. O objetivo é criar uma ferramenta utilitária local focada em portfólio.

---

## 🚀 Stack Tecnológico Recomendado
* **Front-end:** React (SPA, sem necessidade de Next.js para manter simples) + Tailwind CSS para estilização rápida.
* **Back-end:** Node.js (Express ou Fastify) com TypeScript.
* **Banco de Dados:** SQLite (excelente para rodar localmente sem setup de infraestrutura) ou PostgreSQL, gerenciado via um ORM/Query Builder como Prisma ou Knex.

---

## 📊 Modelagem de Dados (Entidades e Relacionamentos)

O sistema funcionará sem autenticação de usuários (focado em uso local direto). A deleção de registros será real (Hard Delete), e o histórico será controlado através de status específicos (ex: "Encerrado", "Rejeitado").

### 1. Vaga (`jobs`)
Entidade principal que centraliza o processo seletivo.
* `id` (UUID / Integer)
* `title` (String) - Título da vaga.
* `description` (Text) - Descrição da vaga, requisitos ou corpo do anúncio.
* `work_model` (String) - Remoto, Híbrido ou Presencial.
* `salary` (Decimal/Float, opcional) - Pretensão ou salário oferecido.
* `applied_at` (Date) - Data de candidatura.
* `followup_date` (Date, opcional) - Próxima data de contato/retorno esperada.
* `company_id` (FK) - Vínculo obrigatório com uma empresa.
* `status_id` (FK) - Status atual no fluxo de contratação.

### 2. Empresa (`companies`)
* `id` (UUID / Integer)
* `name` (String) - Nome da empresa.
* `website` (String, opcional) - Link do site da empresa.

### 3. Competência (`skills`)
Dicionário global de tecnologias/competências para evitar repetição.
* `id` (UUID / Integer)
* `name` (String) - Ex: "React", "Node.js", "Clean Architecture".

### 4. Vaga x Competência (`job_skills`)
Tabela pivô (Many-to-Many) para vincular competências a uma vaga específica.
* `job_id` (FK)
* `skill_id` (FK)
* `is_mandatory` (Boolean) - `true` se for obrigatória, `false` se for opcional/recomendada.

### 5. Contato (`contacts`)
Pessoas associadas à vaga (recrutadores, tech leads, etc.).
* `id` (UUID / Integer)
* `job_id` (FK)
* `name` (String) - Nome do contato.
* `phone` (String, opcional) - Telefone/WhatsApp.
* `linkedin_url` (String, opcional) - Link para o perfil no LinkedIn.
* `notes` (Text, opcional) - Anotações gerais sobre o contato.

### 6. Link Relevante (`job_links`)
URLs úteis sobre a vaga.
* `id` (UUID / Integer)
* `job_id` (FK)
* `url` (String) - O link em si (ex: link do teste técnico, post original da vaga).
* `description` (String) - Descrição curta (ex: "Repositório do Desafio", "Link do Notion").

### 7. Status do Fluxo (`pipeline_statuses`)
Configuração dinâmica das etapas do processo.
* `id` (UUID / Integer)
* `name` (String) - Ex: "Candidatura Enviada", "Entrevista Inicial", "Teste Técnico", "Proposta", "Encerrado".
* `order_index` (Integer) - Define a ordem de exibição das colunas no painel Kanban (ex: 0, 1, 2, 3).

### 8. Comentário (`comments`)
Histórico temporal de anotações da vaga.
* `id` (UUID / Integer)
* `job_id` (FK)
* `body` (Text) - Texto do comentário.
* `created_at` (Timestamp) - Data e hora do registro.

---

## 💻 Escopo das Telas (Front-end)

### Tela 1: Configurações do Fluxo e Competências
* **Gerenciador de Status:** Uma interface simples para listar, criar, editar e ordenar os status da vaga.
* **Gerenciador de Competências:** Lista global de competências cadastradas com opção de adicionar novas habilidades ou remover as que não estão em uso.

### Tela 2: Dashboard Principal (Kanban Board)
* Visualização em colunas baseadas nos status ativos definidos no painel de configurações.
* Cada vaga é exibida como um card contendo: Nome do cargo, Empresa, Modelo de trabalho e a Data da candidatura.
* Opção rápida para arrastar ou mover o card de coluna alterando seu status.

### Tela 3: Formulário de Cadastro/Edição de Vaga
* Campos básicos da vaga (Título, Descrição, Modelo, Salário, Datas).
* **Vínculo de Empresa Inteligente:** Um campo de seleção (Select) com as empresas existentes. Caso a empresa não exista, um botão rápido ou input integrado permite digitar o nome e criar a nova empresa dinamicamente no mesmo fluxo.
* **Seleção de Competências:** Listagem de competências do sistema onde o usuário seleciona quais se aplicam a essa vaga e marca um checkbox/toggle definindo se ela é "Obrigatória" ou "Opcional".

### Tela 4: Detalhes da Vaga
* Visão completa dos dados da vaga e da empresa.
* **Seção de Contatos:** Listagem e formulário rápido para adicionar novas pessoas com nome, telefone e link.
* **Seção de Links:** Espaço para gerenciar links úteis.
* **Linha do Tempo de Comentários:** Campo de texto para digitar novas atualizações (ex: "Fiz a entrevista técnica hoje, achei que fui bem") que são listadas em ordem cronológica inversa (mais recentes primeiro).

---

## 🛠️ Sugestões de Endpoints da API (Back-end)
* `GET /api/statuses` | `POST /api/statuses` | `PUT /api/statuses/:id` | `DELETE /api/statuses/:id`
* `GET /api/skills` | `POST /api/skills` | `DELETE /api/skills/:id`
* `GET /api/companies` | `POST /api/companies`
* `GET /api/jobs` (retorna todas as vagas organizadas para o Kanban)
* `POST /api/jobs` (salva vaga e permite criar empresa/skills associadas no payload)
* `GET /api/jobs/:id` (retorna todos os detalhes incluindo contatos, links e comentários)
* `DELETE /api/jobs/:id` (deleta fisicamente a vaga e seus registros vinculados em cascata)
* `POST /api/jobs/:id/comments` | `POST /api/jobs/:id/contacts` | `POST /api/jobs/:id/links`