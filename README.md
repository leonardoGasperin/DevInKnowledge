# README #

### What is this repository for? ###
	este repositorio é puramente dedicado ao projeto-1 do modulo-1 da turma EDP do curso DevInHouse.
	que deve coletar dados de um formulario contendo

* Deve-se coletar de um formulario informações para montar um card de dicas de desenvolvimento de software

* Conteudo da pagina
	* Painel esquerdo:
		* header
			* Logo.
			* Titulo do site.
			* Local da pagina.
		* Formulario
			* span para avisar o que é obrigatorio.
			+ Contem 5 label e 5 input correspondentes e dois botões:
				1. Título
					* Input do tipo string de no minimo 8 caracteres e no maximo 16.
				2. Linguagem/Skill
					* Input do tipo string de no minimo 2 caracteres e no maximo 16.
				3. Categoria
					* Input do tipo select com 5 opções, sendo que a opção default não é aceita.
				4. Descrição
					* Input do tipo textarea de no minimo 16 caracteres e no maximo 1024.
				5. URL
					* Input do tipo url, recebe somente url e aceita somente links de videos do youtube.
						* Não aceita play list.
				6. Botões
					* Limpar -> do tipo reset para limpar formulario.
					* Salvar -> do tipo submit, envia formulario e salva cartão no sistema.
	* painel direito:
		* Cartões de estatisticas
			1. Quatro cartões cada um mostrando a quantia de cartões criado da sua categoria.
			2. Um cartão mostrando o total de cartões feito.
		* Barra de pesquisa com dois botões
			1. Botão que limpa conteudo da barra de pesquisa.
			2. Botão que faz a pesquisa.
		* Quadro(aside) de cartoes
			1. Espaço onde cartões criados são estanciados.
			- Cartões:
				1. Contem uma div que define seu tamanho e posição a pagina.
				2. h4 para titulo com dois span.
					1. Linguagem/skill.
					2. Categoria.
				3. aside com um p para delimitar o espaço do conteudo em descrição
				4. Três botões
					1. Deletar
						* Deleta um cartão.
					2. Editar
						* Abre o editor do cartão.
					3. Video
						* Abre um link de video caso tenha um link adicionado ao cartão.
				5. Overlay
					* Um overlay sobre o cartão para usuario clicar acima do cartão e expandilo(abri).
	* Funcionalidades
		* Ha algumas funcionalidades na pagina
			1. Abrir cartão
				* Ao usuario clicar no overlay do cartão o cartão ira expandir, mostrando seu conteudo
				* Catão aberto:
					1. Faz um overlay a tela para não ter acesso a tela anterior
					2. No cartão alem de haver toda a informação do mesmo fechado, o video esta presente no cartao com um iframe
					3. Dois botoes
						1. Deletar
							* Deleta o cartão.
						2. Editar
							* Abre o editor do cartão.
					* __Caso o usuario clique fora do cartão, o mesmo ira fechar e o usuario voltara a pagina normal__
			2. Editar
				* Ao usuario clicar no botão editar, tanto com o cartão fechado como aberto ira abrir o edit mode do cartão.
				* Edit mode:
					* No edit mode é adicionado 5 label referente ao item a ser editado (titulo, skill, categoria, etc),
					  alem de adicionar uma input (as mesma para a coleta de dados do mesmo) onde é checado as mesmas contições,
					  e ja preenchido com os valores a serem editado.
					 * Dois botões
					 	1. Editar
					 		* Confirma edição e substitui os valores anteriores pelo atual de cada input.
					 	2. Cancelar
					 		* Cancela edição salvando os dados originais do cartão antes de ser modificado.
					* __Assim como o cartão aberto, caso o usuario clicar no espaço fora do cartão do editor, o editor ira fechar,
					    desconsiderando o que foi modificado.__
			3. Save/Load:
				* Sempre que algo é feito (salvar cartão, deletar cartão, abrir cartão, editar cartão) a pagina fara um laod atualizando
				  as informações da pagina e caso algo foi alterado, antes ele ira salvar.
					1. Save
						* Qualquer alteração a lista de cartões (salvar(criar cartão), deletar ou editar)
						  o JS ira salvar no localstorage todos os objetos cartões existentes e logo apos
						  ira dar um laod.
					2. Load
						* Qualquer funçionalidade a ser ativa ou finalizada ira apos termino de seus processos logicos, fazer um laod.
			4. UpdateScreem
				* sempre que chamada ira recaregar os cartões com o load.

* conteudos do repositorio
	- Pastas
		1. src
			* todo o conteudo do projeto.
		2. css
			* arquivos de estilos cascata CSS
				1. style.css
					* estilo geral da pagina
				2. cardsStyle.css
					* estilo dos catões do painel direito
				3. openedCardsStyle.css
					* estilo do cartão quando aberto *tambem usado para o editMode*
		3. img
			* repositorios para imagens do site
				1. favicon
					* repositorio onde tem o favicon do site
		4. js
			* repositorio com scripts do sistema
				1. module.js
					* toda a logica de funcionamento da pagina principal e seus elementos HTML
				2. meta.js
					* toda logica por traz da pagina
				3. cards.js
					* cria, abre e edita cartões.
	- index.html
		* pagina principal

* Versão: 1.0.1_B

### How do I get set up? ###

* Este projeto foi feito com script type="module" e será necessario usar um simulador de servidor (live server de preferencia)
é recomentado que a pasta "src" esteja dentro da pasta root que não tenha nenhuma pasta anterior a src (src dentro do root fora de outras pastas);

### Who do I talk to? ###

* Leonardo Vinicius de Gasperin
* [LinkedIn](https://www.linkedin.com/in/leonardo-gasperin-205ab8240/)