# ✂️ BarberOS

**Uma plataforma completa para gestão de barbearias.**

O BarberOS é uma plataforma SaaS multi-tenant desenvolvida para simplificar a gestão de barbearias, centralizando agendamentos, profissionais, clientes, serviços e operações comerciais em um único sistema.

O projeto está sendo desenvolvido com foco em segurança, manutenibilidade, escalabilidade e boas práticas de engenharia de software.

> **Status do projeto:** Em desenvolvimento.

---

## 📑 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Objetivos](#-objetivos)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Modelagem do banco de dados](#-modelagem-do-banco-de-dados)
- [Segurança](#-segurança)
- [Como executar o projeto](#-como-executar-o-projeto)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Documentação da API](#-documentação-da-api)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Roteiro de desenvolvimento](#-roteiro-de-desenvolvimento)
- [Conventional Commits](#-conventional-commits)
- [Referências](#-referências)
- [Licença](#-licença)

---

## 📌 Sobre o projeto

O BarberOS é um sistema SaaS que permite que diversas barbearias gerenciem suas operações diárias de maneira independente dentro da mesma plataforma.

Cada barbearia possui seus próprios usuários, profissionais, clientes, serviços, horários e agendamentos.

A aplicação utiliza uma arquitetura multi-tenant, na qual os dados de cada estabelecimento são isolados logicamente e acessíveis somente de acordo com as permissões de cada usuário.

A primeira versão tem como prioridade a construção de um backend seguro e confiável, com integração de uma interface gráfica planejada para uma etapa posterior.

---

## 🎯 Objetivos

- Desenvolver uma plataforma completa para gestão de barbearias.
- Implementar autenticação e autorização seguras.
- Garantir o isolamento dos dados entre os estabelecimentos.
- Aplicar princípios SOLID e separação de responsabilidades quando apropriado.
- Desenvolver uma API REST organizada e documentada.
- Implementar testes automatizados.
- Preparar a aplicação para execução em contêineres e implantação em produção.

---

## 🚀 Funcionalidades

### Autenticação e autorização

- Cadastro de usuários.
- Login e autenticação.
- Hash de senhas utilizando bcrypt.
- Autenticação baseada em JWT.
- Gerenciamento de tokens de acesso e atualização.
- Controle de acesso baseado em papéis.
- Proteção de rotas e recursos.

### Gestão de barbearias

- Cadastro e configuração de estabelecimentos.
- Cadastro e gerenciamento de serviços.
- Cadastro de profissionais.
- Associação de profissionais aos serviços.
- Configuração de horários de funcionamento.
- Gerenciamento de bloqueios de agenda.

### Gestão de clientes

- Cadastro de clientes durante o agendamento.
- Gerenciamento de informações dos clientes.
- Histórico de agendamentos.
- Restrições de clientes específicas para cada barbearia.

### Gerenciamento de agendamentos

- Criação de agendamentos.
- Consulta e gerenciamento de horários.
- Controle de status dos agendamentos.
- Cancelamento de agendamentos.
- Registro de não comparecimento.
- Preservação do preço e da duração do serviço no momento da reserva.
- Prevenção de conflitos de horários.

### Administração da plataforma

- Permissões específicas para administradores da plataforma.
- Gerenciamento de estabelecimentos cadastrados.
- Administração centralizada do SaaS.

> As funcionalidades descritas representam o escopo planejado do projeto. Cada funcionalidade deverá ser implementada e testada antes de ser considerada concluída.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| Node.js | Ambiente de execução JavaScript |
| TypeScript | Tipagem estática |
| Express | Servidor HTTP e API REST |
| PostgreSQL | Banco de dados relacional |
| Prisma ORM | Comunicação com o banco de dados e gerenciamento do esquema |
| Zod | Validação de dados |
| bcrypt | Hash de senhas |
| JSON Web Tokens (JWT) | Autenticação baseada em tokens |
| Jest | Testes automatizados |
| Supertest | Testes de integração HTTP |
| Winston | Registro de logs da aplicação |
| Helmet | Configuração de cabeçalhos HTTP de segurança |
| express-rate-limit | Limitação de requisições |
| CORS | Controle de requisições entre origens |
| Swagger / OpenAPI | Documentação da API |
| Docker | Contêineres da aplicação |
| Docker Compose | Gerenciamento do ambiente local |

---

## 🏗️ Arquitetura

O BarberOS utiliza uma arquitetura de **monólito modular (Modular Monolith)**.

A aplicação é organizada em módulos com responsabilidades definidas, mantendo as regras de negócio separadas do tratamento de requisições HTTP e do acesso ao banco de dados.

### Fluxo da aplicação

```text
Cliente
   |
   v
API Express
   |
   v
Middlewares
   |
   v
Rotas
   |
   v
Controllers
   |
   v
Services
   |
   v
Prisma ORM
   |
   v
PostgreSQL
```

### Responsabilidades das camadas

- **Middlewares:** autenticação, autorização, validação transversal e tratamento de requisições.
- **Rotas:** definição dos endpoints da API.
- **Controllers:** recebimento das requisições e construção das respostas HTTP.
- **Services:** execução das regras de negócio.
- **Prisma ORM:** acesso e persistência dos dados.
- **PostgreSQL:** armazenamento relacional das informações.

### Princípios de engenharia

- Separação de responsabilidades.
- Princípio da Responsabilidade Única (SRP).
- Limites claros entre os módulos.
- Validação de dados nas fronteiras do sistema.
- Tratamento centralizado de erros.
- Acesso aos dados considerando o contexto do estabelecimento.
- Testes automatizados das regras de negócio críticas.

---

## 🗄️ Modelagem do banco de dados

O projeto utiliza PostgreSQL com uma estratégia multi-tenant baseada em um esquema compartilhado.

Os registros pertencentes a estabelecimentos devem ser associados ao respectivo contexto de negócio e acessados somente dentro desse contexto.

### Principais entidades

| Entidade | Responsabilidade |
|---|---|
| `User` | Autenticação, papéis e informações dos usuários |
| `Barbershop` | Informações e identificação de cada barbearia |
| `Service` | Serviços oferecidos por cada estabelecimento |
| `ProfessionalService` | Associação entre profissionais e serviços |
| `Client` | Informações dos clientes |
| `Appointment` | Agendamentos, horários e status |
| `WorkingHours` | Horários regulares de funcionamento |
| `ScheduleBlock` | Períodos indisponíveis na agenda |
| `ClientBlock` | Restrições de clientes específicas de uma barbearia |
| `RefreshToken` | Ciclo de vida e revogação de tokens de atualização |

### Considerações sobre o banco de dados

- Utilizar tipos decimais para valores monetários.
- Armazenar datas e horários com tratamento adequado de fuso horário.
- Preservar o preço e a duração do serviço no momento do agendamento.
- Garantir o isolamento dos dados por estabelecimento.
- Impedir conflitos de horários.
- Utilizar transações nas operações que exigem consistência.
- Criar restrições no banco para regras de negócio críticas.
- Garantir que os relacionamentos entre registros respeitem o estabelecimento correspondente.

---

## 🔐 Segurança

A segurança é um requisito central do BarberOS.

A implementação deverá contemplar:

- Hash de senhas com bcrypt.
- Tokens de acesso com curta duração.
- Rotação e revogação de refresh tokens.
- Armazenamento seguro dos hashes dos refresh tokens.
- Autorização baseada em papéis no backend.
- Validação de requisições com Zod.
- Cabeçalhos HTTP de segurança com Helmet.
- Limitação de requisições em endpoints sensíveis.
- Configuração controlada de CORS.
- Segredos e configurações por variáveis de ambiente.
- Isolamento dos dados de cada estabelecimento.
- Proteção contra acessos não autorizados a dados de outras barbearias.

**Importante:** a identificação do estabelecimento não deve ser aceita cegamente a partir de dados enviados pelo cliente. O backend precisa validar o contexto do estabelecimento e as permissões do usuário autenticado em cada operação protegida.

---

## ⚙️ Como executar o projeto

### Pré-requisitos

Antes de iniciar o desenvolvimento, instale:

- Node.js em uma versão LTS.
- npm.
- Git.
- Docker e Docker Compose.
- Um editor de código, como o Visual Studio Code.

### 1. Clonar o repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd barber-os
```

Substitua `<URL_DO_SEU_REPOSITORIO>` pela URL real do repositório.

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias, conforme a seção abaixo.

### 4. Iniciar o banco de dados

Quando o arquivo `docker-compose.yml` estiver configurado:

```bash
docker compose up -d
```

### 5. Gerar o Prisma Client

```bash
npx prisma generate
```

### 6. Executar as migrações

Depois que o esquema inicial e as migrações forem revisados:

```bash
npx prisma migrate dev
```

### 7. Iniciar o servidor de desenvolvimento

Quando o script correspondente estiver configurado no `package.json`:

```bash
npm run dev
```

> **Observação:** os comandos acima representam o fluxo de execução planejado. Eles dependem da implementação dos arquivos de configuração, do esquema do banco, das migrações, do Docker Compose e dos scripts npm. Portanto, ainda não devem ser considerados um procedimento validado para a versão atual do projeto.

---

## 🔑 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

Exemplo de configuração:

```env
NODE_ENV=development
PORT=3000

DATABASE_URL="postgresql://postgres:password@localhost:5432/barberos?schema=public"

JWT_ACCESS_SECRET="substitua-por-um-segredo-aleatorio-seguro"
JWT_REFRESH_SECRET="use-outro-segredo-aleatorio-diferente"

JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
```

Utilize segredos fortes, aleatórios e independentes em ambientes reais.

**Nunca envie o arquivo `.env` para o repositório.** Ele deve ser incluído no `.gitignore`.

O projeto deverá manter um arquivo `.env.example` com nomes de variáveis e valores ilustrativos, sem credenciais reais.

---

## 📚 Documentação da API

A API seguirá as convenções REST e utilizará JSON nos corpos das requisições e respostas.

Os endpoints abaixo são propostas para a implementação inicial. Eles não representam rotas necessariamente disponíveis na versão atual.

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Cadastrar o proprietário e sua barbearia |
| `POST` | `/api/v1/auth/login` | Autenticar um usuário |
| `POST` | `/api/v1/auth/refresh` | Atualizar os tokens de autenticação |
| `POST` | `/api/v1/auth/logout` | Revogar um refresh token |

### Barbearias

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/v1/barbershops/me` | Consultar a barbearia do usuário autenticado |
| `PATCH` | `/api/v1/barbershops/me` | Atualizar informações da barbearia |

### Serviços

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/v1/services` | Listar serviços |
| `POST` | `/api/v1/services` | Cadastrar um serviço |
| `GET` | `/api/v1/services/:id` | Consultar um serviço |
| `PATCH` | `/api/v1/services/:id` | Atualizar um serviço |
| `DELETE` | `/api/v1/services/:id` | Remover um serviço |

### Profissionais

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/v1/professionals` | Listar profissionais |
| `POST` | `/api/v1/professionals` | Cadastrar um profissional |
| `GET` | `/api/v1/professionals/:id` | Consultar um profissional |
| `PATCH` | `/api/v1/professionals/:id` | Atualizar um profissional |

### Agendamentos

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/v1/appointments` | Listar agendamentos |
| `POST` | `/api/v1/appointments` | Criar um agendamento |
| `GET` | `/api/v1/appointments/:id` | Consultar um agendamento |
| `PATCH` | `/api/v1/appointments/:id` | Atualizar informações de um agendamento |
| `POST` | `/api/v1/appointments/:id/cancel` | Cancelar um agendamento |
| `POST` | `/api/v1/appointments/:id/complete` | Marcar um agendamento como concluído |
| `POST` | `/api/v1/appointments/:id/no-show` | Registrar um não comparecimento |

Os endpoints definitivos, as permissões de cada operação e os esquemas de requisição deverão ser definidos durante a implementação.

### Documentação interativa

A documentação interativa com Swagger UI e OpenAPI está prevista para uma etapa posterior do desenvolvimento.

---

## 📂 Estrutura do projeto

A estrutura abaixo representa a organização planejada para o backend.

```text
barber-os/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── config/
│   ├── middlewares/
│   ├── modules/
│   │   ├── auth/
│   │   ├── barbershops/
│   │   ├── services/
│   │   ├── professionals/
│   │   ├── clients/
│   │   └── appointments/
│   ├── shared/
│   │   ├── errors/
│   │   ├── utils/
│   │   └── validators/
│   ├── app.ts
│   └── server.ts
├── tests/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

Os diretórios e arquivos serão criados conforme as etapas de desenvolvimento avançarem.

---

## 🗺️ Roteiro de desenvolvimento

### Fase 1 — Planejamento e arquitetura

- [x] Definir o escopo inicial do projeto.
- [x] Escolher a stack tecnológica inicial.
- [x] Definir a abordagem multi-tenant.
- [x] Definir os papéis iniciais dos usuários.
- [x] Finalizar as restrições do banco e as regras de negócio.

### Fase 2 — Estrutura do backend

- [x] Configurar Node.js e TypeScript.
- [x] Configurar Express.
- [x] Integrar Prisma e PostgreSQL.
- [x] Implementar tratamento centralizado de erros.
- [x] Configurar variáveis de ambiente e logs.

### Fase 3 — Autenticação e segurança

- [ ] Implementar cadastro e login.
- [ ] Implementar hash de senhas.
- [ ] Implementar access tokens e refresh tokens.
- [ ] Implementar middlewares de autorização.
- [ ] Testar o isolamento entre estabelecimentos.

### Fase 4 — Gestão de barbearias

- [ ] Implementar cadastro de barbearias.
- [ ] Implementar gerenciamento de serviços.
- [ ] Implementar gerenciamento de profissionais.
- [ ] Implementar associações entre profissionais e serviços.
- [ ] Implementar horários de funcionamento e bloqueios de agenda.

### Fase 5 — Clientes e agendamentos

- [ ] Implementar cadastro de clientes.
- [ ] Implementar criação de agendamentos.
- [ ] Impedir conflitos de horários.
- [ ] Implementar transições de status dos agendamentos.
- [ ] Implementar restrições específicas de clientes.

### Fase 6 — Qualidade e documentação

- [ ] Criar testes unitários com Jest.
- [ ] Criar testes de integração com Supertest.
- [ ] Documentar a API com Swagger/OpenAPI.
- [ ] Revisar tratamento de erros e validações.
- [ ] Testar os limites de autorização entre usuários e estabelecimentos.

### Fase 7 — Infraestrutura e integração contínua

- [ ] Configurar Docker.
- [ ] Configurar Docker Compose.
- [ ] Adicionar verificações automatizadas no CI.
- [ ] Preparar a configuração de implantação.

### Fase 8 — Frontend

- [ ] Definir a stack tecnológica do frontend.
- [ ] Implementar telas de autenticação.
- [ ] Implementar o painel administrativo.
- [ ] Implementar a gestão de agenda e agendamentos.
- [ ] Integrar o frontend à API REST.

### Fase 9 — Preparação para produção

- [ ] Configurar variáveis de ambiente de produção.
- [ ] Revisar segurança e migrações do banco.
- [ ] Configurar monitoramento e backups.
- [ ] Implantar a aplicação.
- [ ] Realizar testes de ponta a ponta.

---

## 📝 Conventional Commits

O BarberOS adotará a especificação Conventional Commits para manter o histórico de alterações consistente, organizado e fácil de compreender.

### Formato

```text
<tipo>(<escopo>): <descrição>
```

### Exemplos

```bash
git commit -m "feat(auth): implementar login de usuarios"
git commit -m "feat(appointments): criar endpoint de agendamento"
git commit -m "fix(auth): rejeitar refresh tokens expirados"
git commit -m "test(appointments): testar conflitos de horarios"
git commit -m "docs(readme): atualizar instrucoes de instalacao"
git commit -m "refactor(users): simplificar validacao de usuarios"
git commit -m "chore(deps): atualizar dependencias"
```

### Tipos mais utilizados

| Tipo | Utilização |
|---|---|
| `feat` | Adição de funcionalidade |
| `fix` | Correção de erro |
| `docs` | Alterações na documentação |
| `test` | Criação ou alteração de testes |
| `refactor` | Reestruturação do código sem alteração intencional do comportamento |
| `perf` | Melhoria de desempenho |
| `chore` | Tarefas de manutenção |
| `build` | Alterações no sistema de build ou nas dependências |
| `ci` | Alterações na integração contínua |

Os tipos e os escopos permanecem em inglês por convenção, mesmo quando a descrição do commit está em português.

---

## 👤 Autor

**José Lucas**

Desenvolvedor Full-Stack