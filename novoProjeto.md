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

