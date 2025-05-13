# 🌞 API de Monitoramento de Usinas Fotovoltaicas

API para monitoramento e análise de dados operacionais de usinas de energia solar fotovoltaica.

[![TypeScript](https://img.shields.io/badge/TypeScript-4.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.7.0-2D3748?logo=prisma)](https://www.prisma.io/)

## 🛠️ Tecnologias

- **Backend**: Node.js + TypeScript
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **Validação**: Zod
- **Testes**: Jest (a implementar)

## 📋 Endpoints

Confira a documentação da API com todos os endpoints no Postman através do link abaixo:

[https://www.postman.com/interstellar-comet-295736/workspace/erick-barros/collection/27180690-5490fe20-23d2-4396-a328-32e2644afba3?action=share&creator=27180690](https://www.postman.com/interstellar-comet-295736/erick-barros/documentation/n0tti14/tecsci)

## 🚀 Instalação

**ATENÇÃO** ☢️ Tenha um banco de dados SQL configurado em sua máquina, de preferência PostgreSQL.

### Pré-requisitos

- Node.js 18+
- PostgreSQL 15+
- PNPM

```bash
# 1. Clone o repositório
git clone https://github.com/erickbarrosr/tecsci-backend-technical-challenge

# 2. Instale dependências
pnpm install

# 3. Configure ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# 4. Execute migrações
npx prisma migrate dev

# 5. Popule o banco (opcional)
pnpm seed

# 6. Inicie o servidor
pnpm dev
```

## ✅ Melhores Práticas

- Validação de Dados: Schemas Zod em todas entradas;

- Tipagem Forte: TypeScript em todo o código;

- Transações: Operações críticas usam transactions do Prisma;

- Segurança: (CORS configurado, Sanitização de inputs, Environment variables).

## 🤝 Contribuição

1. Faça um fork do projeto

2. Crie uma branch: git checkout -b feat/nova-feature

3. Commit suas mudanças: git commit -m 'Adiciona nova feature'

4. Push para a branch: git push origin feat/nova-feature

5. Abra um Pull Request

## 💪 Contato

Caso tenha algum problema ao rodar a API ou não consiga configurar alguma etapa, sinta-se a vontade para entrar em contato direto comigo através dos canais abaixo:

📞 +55 (32) 99963-2070
📧 erickbarrosrezende@gmail.com
