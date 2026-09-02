# Teste de Consciência Pessoal — Guia de Publicação

Este projeto já está pronto. Você só precisa seguir os passos abaixo, na ordem.
Nenhum deles exige saber programar.

---

## Passo 1 — Criar o formulário que recebe os leads (Formspree)

É para onde vão o nome, e-mail e WhatsApp de quem responder o teste.

1. Acesse https://formspree.io e crie uma conta gratuita (com seu e-mail).
2. Clique em "New Form", dê um nome (ex: "Teste Consciência") e confirme.
3. Copie o link que aparece, algo como `https://formspree.io/f/abcdwxyz`.
4. Abra o arquivo `src/App.jsx` deste projeto e troque a linha:
   ```js
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/SEU_ID_AQUI";
   ```
   pelo link que você copiou.
5. Salve o arquivo.

A partir daí, toda resposta do teste chega no seu e-mail cadastrado no Formspree,
e também fica salva no painel do site (você pode exportar em planilha depois).
O plano gratuito permite 50 envios por mês — se seu Instagram bombar mais que
isso, dá para migrar para um plano pago do Formspree, sem precisar mexer em
mais nada no código.

---

## Passo 2 — Colocar o código no GitHub

O GitHub é onde o código "mora" para poder ser publicado.

1. Crie uma conta gratuita em https://github.com (se ainda não tiver).
2. Clique em "New repository", dê um nome (ex: `teste-consciencia`) e crie.
3. Na página do repositório vazio, clique em "uploading an existing file".
4. Arraste TODOS os arquivos e pastas deste projeto para lá (mantendo a
   pasta `src` como pasta).
5. Clique em "Commit changes" para salvar.

---

## Passo 3 — Publicar no Vercel (fica no ar, com link)

1. Acesse https://vercel.com e crie uma conta gratuita — escolha
   "Continue with GitHub" para já conectar as duas contas.
2. Clique em "Add New Project".
3. Selecione o repositório que você criou no Passo 2.
4. O Vercel já reconhece automaticamente que é um projeto Vite/React —
   não precisa mudar nenhuma configuração. Clique em "Deploy".
5. Em cerca de 1 minuto, você recebe um link do tipo:
   `https://teste-consciencia.vercel.app`

Esse já é o link que você pode colocar na bio do Instagram.

### Domínio próprio (opcional)
Se quiser um link com sua marca (ex: `teste.fabriciamaia.com.br`), no painel
do Vercel vá em Settings > Domains e siga as instruções — você vai precisar
ter (ou comprar) esse domínio antes, em um site como Registro.br ou GoDaddy.

---

## Passo 4 — Divulgar no Instagram

- Coloque o link do Vercel (ou seu domínio) na bio do perfil.
- Nos stories, use o adesivo de link (ou "arraste pra cima", se seu perfil
  já tiver essa opção liberada).
- Sempre que fizer um post sobre autoconhecimento, convide para o teste
  com uma chamada no estilo: "Quer saber em que momento da sua jornada
  você está? Link na bio."

---

## Atualizando o conteúdo depois

Sempre que quiser mudar um texto, uma pergunta ou os dados de contato,
edite o arquivo `src/App.jsx` diretamente pelo GitHub (clique no arquivo,
depois no ícone de lápis para editar, e "Commit changes" para salvar).
O Vercel detecta a mudança automaticamter e atualiza o site sozinho,
em cerca de 1 minuto.

---

## Rodando no seu computador antes de publicar (opcional)

Se quiser ver o site rodando no seu computador antes de publicar:

```bash
npm install
npm run dev
```

Isso abre um endereço local (algo como `http://localhost:5173`) onde você
pode testar todas as telas antes de subir para o ar.
