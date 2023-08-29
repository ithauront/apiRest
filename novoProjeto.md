vamos trabalhar com fastify
o proposto dela é trazer para a gente a parte tradicional na construção de api como rotas, parametros, requisições e etc, podemos construir isso na mão, mas não é tão necessario e o fastify ja traz isso pra a gente.
fastify é um microframework

# fastify
vantagens
ele é mais bem mantido do que o fastify -muitos updates e etc
uma das opções mais populares no node, e com api semeplhante com o express então sabendo um vc acaba aprendendo o outro
mais performatico
pronto para lidar com novas funcionalidades do js
em especial o assync await é muito bem integrado.

# typescript
o typescript é um superset um adicional ao javascript
usamos ele para trabalhar com tipagem ou seja falar o tipo das coisas (se é um number, string, etc) deixa o codigo mais inteligente, porque evita que erros sejam perpetuados. 
como os parametros são tipados, a gente percebe instantaneamente se enviamos por exemplo um parametro errado para a função. ele ajuda a escrita do codigo porque ja te sugere o que devemos usar como tipos. 
o tipescript é uma linguagem de programação fortemente tipada que converte o codigo final para javascript (segundo sua propria documentação)
sobre ser uma linguagem de programação, nos temos atualmente compiladores que entendem o typescript sem precisar de conversão para o js e por isso podemos dizer que ele é sim uma linguagem de programação.
a sintaxe é muito parecida com o js a unica diferençã é a tipagem:
sobre os erros que o tipescript evita. pensa em uma fiunção para calcular a idade do usuario. ela recebe um usuario e vai calcular com base na data de nascimento dele
function calculateUserAge (user) {
return new Date().getFullYear() - user.birthYear
}
isso seria como a gente faria a função de uma maneira bem simplificada e no js. porem o problema com isso que que nos podemos chamar quamquer paramentro nessa função para rodar ela. pore exemplo quando a gente for chamar a função para rodar ela ao invez de colocar o user no parametro a gentepode colocar uma string como um nome assim
calculateUserAge ('iuri') 

se a gente fizer isso no js ele não vai apontar erro. mas quando a gente rodar ela vai dar um erro porque iuri é uma string e não o objeto user enão ele nunca vai achar o user.birthYear

a gente tem que instalar o typescript usando o npm i -d typescript
e depois conigurar ele usando o npx tsc --init
vamos la no tsconfig.json e mudamos o target que vai estar em 2016 para 2020.

e ara converter o codigo é so a gente usar o tsc e dar o caminho do codigoq eu queremos converter, ele vai criar um novo arquivo em js .
e assim podemos rodar ele no node.

# instalar fastify
npm i fastify
vamos importar ele e chamar uma const app sendo igual a função fastify
isso vai criar a base da aplicação e agora com a app eu posso usar para fazer todas as funçoes simples que um server tem. principalmente a parte de rotas.
então se a gnete escrever app.get ou qualquer outro metodo ele ja esta disponivel.
então se a gente quiser chamar juma rota tipo http://localhost:3333/hello
a gente vai dar um 
app.get('/hello', () =>{
    return 'hello world'
})
a gente faz o get, e o primeiro parametro a gente passa a url, o endereço depois da / e o segundo parametro é uma função com o que isso vai devolver, a gente coloclou um hello world pra exempmlificar.

e vamos tambem passar um app.listen({
    port: 3333
})
assim ele vai estar ouvindo a essa porta.esse listen retorna uma promisse, então depois dele eu dou um .then( ()=> {
    console.log('http server running)
})
e quando essa porta for escutada a gente vai dar um console.log para dizer que ela foi ouvida.
a pagina fica assim:
import fastify from 'fastify'

const app = fastify()

app.get('/hello', ()=>{
    return 'hello world!'
})

app.listen({
    port: 3333,
}).then(() =>{
    console.log('http server running!')
})

agora para exceutar ela com o node a gente precisa converter.
mas antes de converter precisamos instalar o pacote node para que ele não de erro então vamos dar um npm i -D @types/node
agora nos podemos converter e para isso vamos usar o npx tsc src/server.ts
porem esse processo de ficar convertendo é horrivel porque a cada alteraçéao vamos precisar converter.
para automatizar isso vamos instalar a ferramenta tsx em dependencia de desenvolvimento
npm i tsx -D
e o tsx ele converte e executa em node o arquivo convertido sem sujar a pasta ou seja sem criar um clone do arquivo na pasta com final .js.
para usar o tsx agora vai ser com o comando
npx tsx src/server.ts
ou seja npx tsx mais o endereço do arquivo.
o caminho é usar o tsx apenas em desenvolvimento. em produção a gente vai converter para js uma vez que o produto esteja pronto e a gente vai rodar esse.
vamos la no pacjage.json e criar um script para rodar pelo tsx la não precisamos colocar o npx o script fica assim:
 "dev": "tsx src/server.ts",
 e podemos colocar o watch tambem para ele observar as mudanças fica assim
  "dev": "tsx watch src/server.ts",

 # esLint
vamos colocar o lint nesse projeto.
com isso o codigo vai ficar padronizado e essa padronização automatizado.
vamos instalar o eslint ja com o pacote da rocketseat
npm i eslint @rocketseat/eslint-config -D

apos isso estar instalado vamos criar um arquivo na raiz chamado .eslintrc.json
nele a gente cria um objeto e coloca uma opàção chamada extends: passamos um array e colocamos dentro dele @rocketseat/eslint-config/node
fica assim:

salvamos isso e para que o vscode fucnione com o eslint a gente precisa instalar a extenção eslint
agora para automatizar vamos dar um cntrl shift p e procurar por open users settings json

ele abre uma aba com varias configurações
a gente vai procura  a edite passar a opçõas
sorce.fixall.exlint: true

nos vamos ambem no package json e criamos um comando chamado lint para dar com npm run
o lint vai ser algo que vai verificar todos os erros de todos os arquivos e dar um fix neles de uma vez.
nesse script vai ter eslint a pasta onde estão os codigos por exemplo src --ext para sinalizar a estensão e as extençoes dos arquivos.ts.js etc e um --fix para ele corrigir tudo que for possivel de corrigir.


# sqlite
nos vamos usar o banco de dados sqlite primeiro porque ele usa o sql relacional. 
banco relacional é muito perforlatico e usa 99% das fucnionalidades de outros bancos e é mais simples.
alem disso não precisamos instalar nada na maquina porque os dados são salvos la mesmo.
é muito facil tambem de migrar para outro banco n futuro.
    * conexão com o banco
    cada tecnologia tem formas diferentes de se conectar com o banco de dados.
    as mais comuns são
    1 drivers nativos - ferramentas bibliotecas de baixo nivel que permite que a gente se comunique com o banco de maneira pouco abstrata. por exemplo o mysql2
    a gente tem que escrever a query de forma bem crua exatamente epecificando cada coisa 

    2 query builders - formas de evitar ter que aprender muito sql e focar na linguagel que estamos trabalhando. no caso do node o mais famoso é o knex.js
    ele vai construir querys para nos. facilita a escrita dos comandos sql com codigo js. em outras palavras usa mais ou menos uma sintaxe de js para os comandos sql
    
    3 orn - é um nivel de abstração mais alto. praticamente não nos procuramos com o sql. a sintaxe vem da linguagem


    nos vamos usar o knex

# configurando o knex
temos o comando para instalar o knex npm i knex --save
porem não vamos instalar so o knex mas tambem o driver do banco de dados ja junto. ou seja colocamos o npm install knex sqlite3
uma vez que isso esteja instalado vamos criar dentro da pasta src um arquivo chamado database.ts
esse qrauivo vai fazer uma conexção com o banco de dados. então nele vamos importar do knex uma funcção chamada kenx, porem vamos renomear ela como setupKnex para não dar o mesmo nome no nosso uso dela vai ficar assim
import { knex as setupKnex } from 'knex'

agora podemos fazer uma const chamada knex e igualar ela a essa fjunção e exportar ela
fica assim
export const kenx = setupKnex()

agora dentro do setupKnex nos vamos colocar alguns argumentos.

import { knex as setupKnex } from 'knex'

export const config = {
  client: 'sqlite',
  connection: {
    filename: './temp/app.db',
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)

acho que perdi parte de minhas anotação mas fazrmos um arquivo knexfile.
nos tambem  com esse qrquivo a gente roda o script lembrando que tem que estar no node versão 18 rodamos o script do kenx colocando como arquivo binario do kenx no executavel.
assim podemos rodar ele com o tsx.

o kenx vai criar um banco de dados com a data precisa como nome.
para podermos migrar para outras plataformas de banco de dados mais tarde é bom lembrar que temos que manter a sintaxe do banco de dados padrão.
dentro desse arquivo de migration que a gentefez vão ter dois metodos o up e down o up é o que ela vai favai fazer.
e o down é que se caso tenha dado errado o down vai fazer o contrario do que o up fez para poder voltar no tempo. se o up criou uma tabela, o down vai apagar ela. e assim por diante.

vamos escrever agora as funções para isso
o arquivo orginal criado automaticamente pelo kenx é assim:
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {}

export async function down(knex: Knex): Promise<void> {}


nos vamos pegar o up e dar um await usar o kenx que é o parametro que a função recebe. dar um .schema. ( e aqui abre uma serie de metodos para fazermos criações.)
vamos usar o createTable vamos passar um nome para essa tabela. e o segundo parametro vai ser uma função. essa função vai receber um parametro chamado table
e dentro dela vamos dar um table. e aqui temos acesso a todos os tipos de possibilidades. vamos usar a primeira coluna como sendo a primaryKey. vai ser um id. podemos fazer ele como um increments() e assim iria de 1 2 3 etc. mas a maioria das aplicações não recomenda que usemos chaves primaria por inteiro. eles preferem que a gente use um valor mais aleatorio e dificil de ser descobrto. vamos usar então o uuid que é um gerador randomico. universal unique id
dentro del passamos o nome do campo da tabela. id e para simboliza que é primaria vamos dar um .primary()
fica assim
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
  })
}

agora passamos para nosso proximo campo na tabela.
table.text('title').notNullable() vai ser um campo de texto o nome dele vai ser titulo e ele não pode ficar vazio (not nullabler.)
por enquanto vamos deixar so esses dois campos e a funcção fica assim antes de passarmos para a down
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
  })
}

agora a down onde vamos desfazer a criação da tabela
damos um drop table e passamos o nome da tabela.
a pagina toda fica assim
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}

apos salvar vamos executar essa criação da tabela com um npm run knex -- migrate:latest
e ele vai automaticamente ler todas as migrations e executar. 
e com isso criar a tabela transactions para a gente verificar isso a gente pode usar a rota hello onde a gente estava listando nossas tabelas.
ao dar o get ele vai trazer a nossa tabelam trasnactions mas tambem outras tabelas que ele fez de forma totalmente automatizada poqruq o sqlite 
é isso que ele devolve:
[
	{
		"type": "table",
		"name": "knex_migrations",
		"tbl_name": "knex_migrations",
		"rootpage": 2,
		"sql": "CREATE TABLE `knex_migrations` (`id` integer not null primary key autoincrement, `name` varchar(255), `batch` integer, `migration_time` datetime)"
	},
	{
		"type": "table",
		"name": "sqlite_sequence",
		"tbl_name": "sqlite_sequence",
		"rootpage": 3,
		"sql": "CREATE TABLE sqlite_sequence(name,seq)"
	},
	{
		"type": "table",
		"name": "knex_migrations_lock",
		"tbl_name": "knex_migrations_lock",
		"rootpage": 4,
		"sql": "CREATE TABLE `knex_migrations_lock` (`index` integer not null primary key autoincrement, `is_locked` integer)"
	},
	{
		"type": "table",
		"name": "transactions",
		"tbl_name": "transactions",
		"rootpage": 5,
		"sql": "CREATE TABLE `transactions` (`id` char(36), `title` text not null, primary key (`id`))"
	},
	{
		"type": "index",
		"name": "sqlite_autoindex_transactions_1",
		"tbl_name": "transactions",
		"rootpage": 6,
		"sql": null
	}
]
o sqlite sequence é uma tabela criada pelo sqllite para lidar com colunas deincrement. ele tambem cria a knex migration para listar as tabelas criaas e a knex migration lock. essas duas tabelas são responsaveis por anotar no banco de dados quais migrations ja foram executadas.
a partir do momento que uma migration foi enviada para a produção ou para o nosso time ela nunca mais pode ser editada.
se voce criou uma migration e errou algo vc vai ter que fazer outra para modificar.
porque a partir do momento que outra pessoa executou a migration se vc editar ela nunca vai receber essa edição porque no banco de dados dessa pessoa ja esta anotado como migration executada.se voce ainda não enviou essa migration pra a produção ou para o seu time ainda da para editar. para fazer isso temos que
# editar migration
para o server
e dar um npm run kenx -- migration:rollback

ai ela desfaz a migration e com essa migration desfeita a gente pode alterar o que quiser.
nosvamos la adicionar um novo campo.
campo tipo decimal nome dele vai ser amount e ele vai ter 10, 2 ou seja o dez é o tamanho do numero que queremos armazenar e o 2 é o numero de casas deciamais.
e tambem não vai ser nulo. fica assim:
  table.decimal('amount', 10, 2).notNullable()
  vamos tambem fazer um timestamp com o nome de created_at que é um campo que geralmente colocamos em todas as tabelas para anotar a data que o registro foi criado. para fazer isso a depender das tabelas usamos sintaxe diferente, now ou curenttimestamp etc. mas nosso knex é para poder usar ele em qualquer banco de dados enão temos que fazer algo que todos peguem;
  então dentro do nosso defaultTo() vamos passar knex.fn.now que é algo que o nex tem para fazer a data. fica assim
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()

    a pagina fica assim:
    import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}

salvamos isso. e rodamos de novo a migration latest
com isso a tabela ja esta fucnionando e nos podemos trabalhar com ela.

mas tambem podemos adicionar migrations so para alterar um campo.
no caso de uma tabela ja ter sido enviada;
a gente pode fazer algo como npm run knex -- migrate:make add-session-id-to-transactions

com isso a gente vai criar uma migration não mais de criar uma tabela ma sim de adicionar uma sessão a uma tabela transactions.
ele vai criar um novo arquivo com o mesmo formato para a gente fazer o up e o down e ai no up vamos fazer await knex schema e passar um alter table e nele passamos o nome da tabela que queremos alterar e recebemos essa tabela como um parametro na segunta função
agora podemos por exemplo adicionar um novo campo usando
table.tipo do campo nesse caso uuid. passamos o nome session id e podemos falar onde queremos que ese campo seja posicionado. vamos colocar o after(id) para falar que queremos ele logo apos o id (mas nem todos os bancos de dados suportam isso)
vamos tambem botar um .index() para ele criar automaicamente um index
o index é uma forma de falar para o banco de dados que vamos fazer muitas buscas dentro em transaçoes especificas de um idsession ou seja vai ser muito usad no where assim ele faz um cache para isso e faz as buscas serem mais rapidas.
ficou assim:
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.uuid('session_id').after('id').index()
  })
}

export async function down(knex: Knex): Promise<void> {}


agora vamos fazer o down
vamos desfazer isso
table.dropcolumn
tudo fica assim:
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.uuid('session_id').after('id').index()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('session_id')
  })
}

# inserrir transaçoes nas rotas
vamos la no server. na rota get que tem o hello e vamos começar a fazer a logica para inserir as rotas
vamos retirar o que tem na rota e fazer uma const transaction e vai ser igual await knex na tabela transaction e vamos usar o metodo insert para inserir uma nova transação.
e ai temos que abrir um objeto com os tipos de campo que vamos ter na tabela. o id que vai ser um uuid que ja colocamos la na nossa tabela. ai a gente importa o modo crypto do node e usa o metodo random crypto.ramdomuuid()
vamos mandar o titulo 
o amount
não vamos colocar um session id porque ele não é obrigatorio nao tem o notnullable.
e no fim a gente retorna a transaction

  fica assm:
  app.get('/hello', async () => {
  const transaction = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Transação de teste',
    amount: 1000,
  })
  return transaction
  
})
 * estou achando estranho a rota ser com get. talvez ele ainda mude isso.
 se a gente rodar a rota hello assim ele vai nos dar um retorno 1
 porque o knex por padrão não traz retorno muitos especificos.
 para dar os elementos especificos a gente pode botar no fim da função insert um .returnin(*) o asterisco significa que vai retornar tudo que esta ali
 ficaria assim insert().returning(*)

alem da insercão nos podemos fazer uma busca com o knex('transactions).select(*) que era o codigo que tinhamos antes.
eu fiz duas rotas uma de post e uma de get para ficar mais claro porque na aula ele esta apagano e fazendo outra. todas na de get
ficou assim:
app.get('/hello', async () => {
  const transactions = await knex('transactions').select('*')
  return transactions
})

app.post('/hello', async () => {
  const transaction = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Transação de teste',
    amount: 1000,
  })
  return transaction
})


voltando na rota de get. nos podemos tambem fazer querys
se apos o knex('transactions) a gente colocar um .where o where da varias opções  mas a gente vai abrir um ('amount', 1000) ou sejapegamos a tabela transactions e onde o amount seja 1000 vamos selecionar tudo.
fica assim
app.get('/hello', async () => {
  const transactions = await knex('transactions')
  .where('amount', 1000)
  .select('*')
  return transactions
})

# variaveis de ambiente
variaveis de ambiente são informações que podem variar a cada ambiente que a nossa aplicação esta executando
ambiente são os momentos de nossa aplicação como de desenvolvimento; de produção, de teste, staging(preview da produção)
existem configura_ções que vao ser diferentes para cada um desses ambientes o banco de dados é um deles. a gente usa um banco de dados enquanto estamos em desenvolvimento porem na produção vamos usar outro.
por isso precisamos das variaveis de ambiente
a gente cria um arquivo .env que vai armazenar as nossas variaveis de ambiente esse arquivo fica na raiz do progeto
para trabalhar com esse arquivo no vs code precisamos instalar a extenção chamada dotEnv
dentro do arquivo.env todas as configurações vao ser chave e valor.
o valor a gente pode colocar entre aspas ou não mas é indicado colocar entre aspas duplas. ai por exemplo vamos dizer que o databe url vai ser o endereço dele por exemplo fica assim:
DATABASE_URL="./db/app.db"

agora para ler esse arquivo .env dentro do node precisamos instalar uma extenão chamada dotenv
npm i dotenv
agora la no nosso arquivo databes.ts nos vamos importar no topo de tudo dotenv/config
para informação a pagina de database.ts fica assim:
import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './temp/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)


deve ter algo na aula que eu perdi porque a minha estava um pouco diferente.

esse dotenv/config que a gente importou vai ler o database e vai export todos os valores que temos no nosso .env dentro de uma variavel glgal chamada process.env essa process.env vai trazer varias variaveis automaticas e tambem a nossa database_URL que a gente programou no .env.
com isso no lugar de filename que a gente passa o endereco que colocamos para a nosso app.db nos podemos colocar process.env.DATABASE_URL e ele vai ler ovalor que nos passamos la. é uma forma de modular o codigo.
export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL,
  },

  porem temos um pequeno erro porque o typescript percebe que o database_url pode estar preenchido ou vazio la no .env e o typescript reclama dessa possibilidade dele estar vazio. no futuro vamos resolver isso de uma forma melhor mas por enquanto vamos abrir uma condicional antes do export para faar que se nos nõa tivermos informado o process.nv.database_urlnos vamos disparar um erro e ai nenhum codigo que esta abaixo vai executar
  a pagina fica assim por enquanto:
  import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE URL NOT FOUND')
}

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)

as variaveis de ambiente nos colocamos geralmente dados sensiveis, chaves de api que vamos integrar com serviços terceiros e etc. então o .env vai estar no gitignore.
e como esse arquivo não vai entrer no controle de versão ou seja no github um outro desenvolvedor que for pegar seu codigo não vai saber o que informar nas variaveis. então a gente vai criar um arquivo chamado .env.example na raiz do projeto. e dentro desse arquivo colocamos quais são as variaveis que temos mas não colocamos os valores para elas. principalmente de conteudos sensiveis. poderia ficar assim:
DATABASE_URL="./db/app.db"

API_KEY=
por exempl o url da database não é algo realmente sensivel então podemos até deixar. porem a chave de api a gente não coloca nada depois do igual. porque seria algo sensivel.
e o example pode subir no git sem problema.

# eliminar esses if para tratar as env
podemos usar uma biblioteca expecifica para validação de dados, que vai validar se esse dado é um numero, string etc. a gente precisa validar alem da presença dos dados temos que validar tambem se ela foi passada da forma correta.
vamos criar uma pasta env dentro da pasta src e vamos criar um arquivo index.ts
vamos tambem instalar a biblioteca zod para a validação de dados
npm i zod
nos vamos tirar a importação da dot env config do database e passar ela para o env/index.ts
agora essa importação vai ler o nosso arquivo de variaveis e vai passar todas elas para o process.env então podemos acessar ela usando o process.env.DATABASE_url
vamos imortar de dentro do zod o z que serve para a gente criar um schema ou seja um formato de daos que vamos receber das nossas variaveis ambientes e nos vamos fazer de uma vez para todos as nossas variaves de ambiente não vai ser uma por vez.
então vamos definir que o nosso process.env é um objeto usando o z.object
por enauqnto fica assim
const envSchema = z.object({
  e qaui dentro vamos passar qausi variaveis vamos ter dentro de nossa aplicação

})

vamos colocar   database_URL  e ela vai ser uma string então vamos colocar : z.string() se ela podesse ser nula tambem a gente colocaria um .nullable depois do string() 
e ai dentro desse objeto nos vamos passando uma por uma cada tipo de variavbeis ambientes que a gente colocar no nosso app como por enquanto so temos essa fica so ela.
apos isso  colocamos apos fechar esse objet uma nova cons
const env = envSchela.parse(process.env) 
ou seja a const env vai pegar esse objeto e vai aplicar a nosso process.env
caso alguma informação de erro esse metodo de parce vai dar um throw new Error automaticamente e pararia a aplicação. se tudo der certo o restante do codigo vai funcinar automaticamente enão se a gente escreve env. ele ja acha o databaseurl la dentro então podemos usar com o codigo sabendo que é uma string.
so para encher um pouco vamos colocar tambem a variavel port dizendo que precisa ser um numero e se não tiver definida o valor default dela vai ser 3333
apos isso vamos exportar a nossa const env para usar ela em outros lugares. a pagina fica assim:
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

export const env = envSchema.parse(process.env)

e agora sempre que a gente precisar usar uma variavel ambiente ao inves de acessar por process. env a gente acessa diretamente do env que vai ser importado desse arquivo index. assim podemos nos livrar do if que fizemos no database o arquivo database fica assim:
import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
 podemos no server tambem ao invez de usar a port 3333 definida a gente simplismente importar do env a port.
 outra variavel ambiente muito comum é a que especifica justamente em qual ambiente estamos a chamada node_env ele geralmente é implicito pelas ferramentes que estamos usando na aplicação mas vamos declarar ele tambem a variavel node env vai ser geralmente development test ou production então vamos usar para ela a caracteristica z.enum() enum significa que ela vai ser uma entre algumas opções no caso essas tres. colocamos isso dentro de um array e para o default o z ja sugere uma dessas tres vamos colocar production ou seja se a gente não especificar vai ser essa. e vamos la no nosso .env e vamos informar como developmen,t. e vamos passar logo isso tambem para nosso example.
 entéao se a gente executar a aplicação sem uma variavel obrigatoria vai dar erro. porem o erro não explica bem o que aconteceu. para o erro ficar mais claro a gente vai  no index e mudar o tipo de parse para o safeParse que é igual o parse mas não dispara o erro caso de um problema. então ao oinvez de dar o export direto nos vamos chamar essa variavel de _env como variavel provisoria
 e vamos fazer se _env for igual a false que significa que ele falhou porque algo não foi passado a gente vai dar nosso proprio erro com o que acontece e dar um env.error.format para entender qual variavel esta com erro. e caso ele passe por esse erro a gente exporta o env como sendo o data do _env a pagina fica assim
 import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

export const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('error: inalid enviroment variables:', _env.error.format())
  throw new Error('invalid variables')
}

export const env = _env.data

# planejamentos do banco de dados
precisamos pensar nessas tres coisas antes de sair criando nossas rotas.
ou seja quais são as funcionalidades da aplicação o que o usuario pode ou n ão pode fazer no app

## requisitos funcionais

[] o usuario pode criar uma nova transação
[] o usuario deve poder obter um resumo de sua conta (rota que vai retornar o valor total)
[] o usuario deve poder listar todas as transações queja ocorreram
[] o usuario deve poder visualizar uma transação unica

## regras de negocios (condicionais coisas que podem acontecer e o usuario vai validar)

[] a transação pode ser debito ou credito ou seja dinheiro entrando ou saindo do valor total
[]deve ser possivel identificarmos o usuario entre as requisições (ou seja se dois usuarios usarem a aplicação não vamos impactar as transaçoes um do outro)
[]o usuario so pode vizualizar transaçoes que ele criou.


## requisitos não funcionais (vamos adicionar depois )

vamos colocar esse checklist como um readme na raiz do projeto e quando formos fazendo as funcionalidades vamos dando ok.


# plugins do fastify
uma das funcionalidades mais importantes do fastify é a de plugins
que é a possibilidade de separar pedaços de nossa aplicaão em mais arquivos.
por exemplo abrir uma pasta routes para colocar as rotas do transactions
se nesse arquivo transactions dentro da pasta rotas a gente colar a nossa rota que fizemos fcaria assim:

app.get('/hello', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')
  return transactions
})
app.post('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')
  return transaction
})


porem isso daria errado porque o app não existe nesse contexto então essa rota não saberia o que fazer.
a gente poderia exportar a variavel app do server mas não faz muito senido porque o app que vai importar as rotas, assim o app faria um vai e vem de exportar a app e trazer de volta as rotas.
então vamos usar essa funcionalidade de dentro do fastify que é a plugin. como vamos usar
na pagina de transactions vamos exportar uma funcção chamada transactionRoutes.
que vai ser o nome do nosso plugin 
e essa função vai receber como parametro o nosso app
e ela vai ter dentro dela as rotas
importamos o knex do nosso database
agora dentro do osso server vamos retirar a nossas rotas que estavam la e vamos chamar o pluging
fazemos isso ssim
app.register(transactionsRoutes) ou seja passamos para o register o nome do nosso plugin
todo plugin do fastify precisa obrigatoriamente ser uma função assincrona enão quando estivermos criando a função transactionRoutes temos que declarar como async
o transaction fica assim:
import { knex } from '../database'
import crypto from 'node:crypto'

export async function transactionsRoutes(app) {
  app.get('/hello', async () => {
    const transactions = await knex('transactions')
      .where('amount', 1000)
      .select('*')
    return transactions
  })
  app.post('/hello', async () => {
    const transaction = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Transação de teste',
        amount: 1000,
      })
      .returning('*')
    return transaction
  })
}

(ta dando um erro no app sobre implicito qualqeur tipo mas vemos isso depois)
e o server fica assim:

import fastify from 'fastify'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionsRoutes)
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('http server running!')
  })
(tambem tem um erro apontando na importação do transaction routes mas ele esta fucnionando normalmenta)
  vamos dar o type colocamos : fastifyInstance
  export async function transactionsRoutes(app: FastifyInstance) mandamos importar o instace automaticamente.
  para resolver o poblema da importação no server é so salvar o transactions como .ts

  podemos fazer diversos plugins e colocar eles el nossa aplicação. quantos quisermos porem é importante ter uma ordem neles. a rodem de leitura caso ul precise modificar algo do outro. mas em breve vamos aprender mais sobre isso.
  
  # rotas
  como nossas rotas todas vão ter o endereço /transactions nos podemos tirar esse endereço usando a importação do plugin no register passando um segundo parametro com informações u seja la no server na register a gente passa o prefix como uma informação no objeto do segundo arguemento da função. fica assim:
  app.register(transactionsRoutes, {
  prefix: 'transactions',
})

agora todas nossas rotas podem estar com somente / e ele vai interpretar como /transactions.

vamos agora atualizar a rota post usando o body da transação ao invez de fazer aquele post estatico como estava.
estava assim:
 app.post('/', async () => {
    const transaction = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Transação de teste',
        amount: 1000,
      })
      .returning('*')
    return transaction
  })

  vamos retirar a const transaction e colocar uma desestruturação para pegar da requisião as informações que vao vir de la.
  nos podemos receber dentro dessa async a nossa request
   e agora dando request. nos temos varias possibilidades nos vamos pegar o body. de onde vem as informações enviadas pelo usuario.
   porem esse request.body tem o tipo como desconhecido. e queremos evitar isso.
   dentro do request body nos queremos receber tres coisas o tittle o amount e o type (credito ou debito) 
   então nos vamos usar novamente o zod para validar essas coisas
   dentro da rota de app post nos vamos fazer uma const para validar esse schema usando o Z.object fica assim:
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    e agora vamos criar uma const body para dar um parce no nosso request body por esse schema. vai ficar assim.
      const body = createTransactionBodySchema.parse(request.body)

      ou seja nos validamos se o que vem do nosso request body bate com o esquema de validação que criamos. caso de erro o parseda um throw e ai não le o resto do codigo.
      agora dentro do body nos ja temos o tipo dessa validaçéao. nos podemos entãosubstituir o body por uma desestruturação. a gente coloca um objeto do lado esquerdo para pegar o title o amount e o tyope. fica assim:
      const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    agora vamos criar a nova transação
    poderia ser assim:
    const transaction = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title,
        amount,
        type,
      })

      porem no nosso banco de dados nos não criamos a coluna para o typo. então o que vamos fazer com isso.
      a gente vai retirar o type do insert e no amount nos vamos fazer uma condicional.
      se for do tipo credito vamos usar o amount como ele esta. se for debito vamos usar ele como negativo assim:
        amount: type === 'credit' ? amount : amount * -1,

        nas api a gente geralmete não faz retorno enão vamos tirar essa parte do .returning(*)
        nos vamos tambem tirar o const transaction = para não precisar retornar nada ou seja não precisar usar essa const. vai iniciar ja com o await
        porem nos sabemos que precisamos retornar um http code
        vamos entao passar para a funçao a response que o knex chama de reply
        assim podemos retornar essa resposta e vamos usar ele assim
        return reply.status(201).send()
        o status vai ser o codigo que ele vai mandar e o send épara enviar. nesse caso esta vazio então ele envia essa resposta so com o codigo. mas no send a gente pode colocar algo dentro se quiser como um texto.
        a pagina fica assim com o post alterado:
        import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import crypto from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions')
      .where('amount', 1000)
      .select('*')
    return transactions
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })
    return reply.status(201).send()
  })
}

# tipagem tabela knex
o knex não consegue identificar de maneira automatica quais campos e quais tabelas no nosso banco de dados
ou seja se a gente for inserir algo na tabela ele não vai te sugerir o que exite na tabela para que a gente possa fazer de forma correta
porem podemos dizer manualmente para o knex quais as tabelas e quais campos tem.
vamos criar a pasta @types
ela vai servir para a gente sobrescrever tipagens de outras bibliotecas.
vamos criar um arquivo chamado knex (porem o nome tanto faz) mas a extenção é .d.ts
o d vem de definição de tipos. é um arquivo sem javascript nele. somente codigos typescript ou seja somente o typescript entende ele.
quando a gente for trabalhar um arquivo de types a primeira coisa a fazer nele é importar a biblioteca.
então importamos o Knex from knex
como nos não vamos usar a variavel Knex a gente passa um comentario para o eslint para ele ignorar a proxima linha e não ficar disparando esse erro fica assim:
// eslint-disable-next-line
import { Knex } from 'knex'

nos não usamos o Knex porem essa declaração é uma forma de declarar que queremos usar os types que ja existem na bilbioteca knex
agora nos vamos declarar coisas suplementares a isso.
vamos declarar o modulo knex/types/table
esse modulo é porque o knex tem o tables dentro dele como interface se a gente for procurar la dentro do knex indo a fundo. porem essa interface esta vazia.
esse é um arquivo que ajuda a mapear as tables do banco de dados. e usando o modulo que a gente vai declarar nos podemos atualizar ele e deixar o knex mais esperto para nosso programa
dentro da nossa declaração a gente vai exportar uma interface Tables {}
e dentro dela vamos falar quais tabelas existem em nosso banco de dados
ao declarar uma tabela. nas nossas rotas quando a gente escrever o knex() ele ja vai identificar a tabela.
a pagina fica assim:
// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      session_id?: string
    }
  }
}

e agora ao dar um insert ele tras pra a gente todos os campos, e se a gente tentar inserir um campo, que não existe ele da erro.
fazendo essas coisas é bom para nosso codigo ficar mais simples e facil de receber manutenção

# atualização na lsitagem
vamos fazer a rota usando o get e a / e vamos tirar o where. vai ficar dessa forma:
  app.get('/', async () => {
    const transactions = await knex('transactions').select()
    return transactions
  })

  retornando o transactios simples
  porem se um dia a gente quiser fazer um retorno com ações extra como ter a contagem do total de transações. fica ruim de fazer. então a gente vai retornar um objeto e dentro dele a gente coloca a transactioons
  assim:
    app.get('/', async () => {
    const transactions = await knex('transactions').select()
    return {aqui podemos adicionar coisas e depois termos a transactions}
  })

vamos aproveitar e criar uma outra rota que busca detalhes de uma transação unica.
vamos pegar o /:id para pegar um parametro da rota que vem com id
depois disso vamos fazer a async
e de dentro da request vamos acessar os params so que essesparams vao estar como desconhecidos então vamos fazer o mesmo esquemado zod
vamos dar uma const de getTransactionSchema = z.objetc{
  id: z.string().uuid()
}
o zod ja permite que nossa validação pegue que não apenas seja uma string como que seja um uuid
depois a gente pega o id dela passando o nosso request.params pelos parse do schema.
fica assim
 app.get('/:id', async (request) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionsParamsSchema.parse(request.params)
  })

  agora vamos fazer a const transaction dentro dessa rota que vai ser um await knex('transactions).where('id', id).first()
  temos que botar o first no final porque nos vamos ter uma unica transação com esse id. e se a gente não colocar o metodo first ele vai retornar isso como um array.
  e nos queremos apenas a entrada, então o first vai gtrazer um resultado que vai ignorar a possibilidade de ter mais de um e por isso ele não vai fazer um array.
  e depois disso damos um return {transaction}
  fica assim:
   app.get('/:id', async (request) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionsParamsSchema.parse(request.params)
    const transaction = await knex('transactions').where('id', id).first()
    return { transaction }
  })

e agora podemos pegar algo pelo id no insomnia.

# resumo
o usuario deve poder ver o resumpo de sua conta.
vamos criar uma rota chamada sumary com um app.get('/sumary, async
)

essa rota vai fazer uma query para o banco de dados.
ou seja const transactions = await kenx('transactions)
e agora vamos usar um metodo de agregação chamado sum() esse metodo vai somar tudo que tem dentro de uma coluna então passamos amount para ele fica assim
  app.get('/summary', async () => {
    const summary = await knex('transactions').sum('amount')
  })

  e ai como ele soma todos os valores o resultado vai ser um resultado so então se a gente retorna return {summary} ele vai retornar como array então vamos colocar um first no final para ele entender que o retorno é um so
  tambem o nome que vai aparecer la vai ser sum amount: o valor da soma
  para mudar isso a gente pode no segundo parametro da sum() passar algumas configurações em um objeto. uma dessas configurações é o as : '' e ai podemos colocar o nome que a gente quer que apareça vamos colocar o nome da coluna que vai ser amount
  fica assim: 
   app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })
  