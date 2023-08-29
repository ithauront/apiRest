# planejamentos do banco de dados
precisamos pensar nessas tres coisas antes de sair criando nossas rotas.
ou seja quais são as funcionalidades da aplicação o que o usuario pode ou n ão pode fazer no app

## requisitos funcionais

[v] o usuario pode criar uma nova transação
[v] o usuario deve poder obter um resumo de sua conta (rota que vai retornar o valor total)
[v] o usuario deve poder listar todas as transações queja ocorreram
[v] o usuario deve poder visualizar uma transação unica

## regras de negocios (condicionais coisas que podem acontecer e o usuario vai validar)

[v] a transação pode ser debito ou credito ou seja dinheiro entrando ou saindo do valor total
[]deve ser possivel identificarmos o usuario entre as requisições (ou seja se dois usuarios usarem a aplicação não vamos impactar as transaçoes um do outro)
[]o usuario so pode vizualizar transaçoes que ele criou.



## requisitos não funcionais (vamos adicionar depois )