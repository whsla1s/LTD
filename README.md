# Projeto LTD 25.1: Conscientização e Ação para a Coleta Seletiva #

# Sobre o Projeto
O **Projeto LTD (Laboratório de Transformação Digital)** é uma iniciativa acadêmica desenvolvida por estudantes de tecnologia da Faculdade Faci Wyden, em Belém/PA.
Nossa missão é aplicar o conhecimento tecnológico para gerar impacto social positivo, e este projeto é o nosso primeiro grande passo.

Incomodados com a dificuldade de encontrar pontos de descarte correto de resíduos em nossa cidade, decidimos criar uma plataforma completa e interativa para incentivar
e facilitar a **coleta seletiva**. O site não apenas ajuda a localizar ecopontos, mas também busca educar, engajar e conscientizar a população sobre a importância de práticas
sustentáveis, especialmente em um momento estratégico para Belém, que se prepara para sediar a COP30 em 2025.

Acreditamos que ações locais, apoiadas pela tecnologia, são fundamentais para construir um futuro mais sustentável e posicionar nossa cidade como um exemplo para o mundo.

# Funcionalidades Principais
Nossa plataforma foi desenhada para ser uma ferramenta central no incentivo à reciclagem em Belém, oferecendo:
- **Mapa Interativo:** Localize facilmente os pontos de coleta seletiva disponíveis na cidade. O sistema também permite que os usuários sugiram novos locais para
a instalação de lixeiras.
- **Área Educacional:** Conteúdo completo sobre sustentabilidade, biodiversidade, energias renováveis, e guias práticos sobre como fazer a coleta seletiva e a compostagem
corretamente.
- **Games Educativos:** Aprender pode ser divertido! Desenvolvemos jogos como o Snake Game temático e um Quiz para testar e expandir seus conhecimentos sobre reciclagem de
forma interativa.
- **Cadastro e Engajamento:** Um sistema de cadastro permite que os usuários salvem suas pontuações nos jogos, participem de rankings e recebam novidades sobre o projeto
e eventos.
- **Página de Eventos:** Fique por dentro de palestras, workshops e outras atividades relacionadas à sustentabilidade e ao meio ambiente.

# Tecnologias Utilizadas
Este projeto foi construído com uma combinação de tecnologias web modernas, visando uma experiência de usuário fluida e funcional.
* **Front-End:**
  - HTML5
  - CSS3 (com variáveis, layout responsivo via Media Queries)
  - JavaScript (para interatividade, manipulação do DOM, e lógica dos jogos)
  - Leaflet.js: Biblioteca utilizada para a criação do mapa interativo.
* **Back-End:**
  - PHP (para processar cadastros de usuários, salvar pontuações e servir dados para o mapa)
  - MySQL: Banco de dados para armazenar informações de usuários, locais e rankings.
 
# Como Executar o Projeto Localmente
Para rodar este projeto em sua máquina local, você precisará de um ambiente de servidor web com suporte a PHP e MySQL (como XAMPP, WAMP ou MAMP).

**1. Clone o repositório:**

      git clone [https://github.com/whsla1s/LTD.git]

**2. Configure o Banco de Dados:**
  * Inicie seu servidor Apache e MySQL.
  * Crie um banco de dados chamado ltd_db.
  * Importe a estrutura das tabelas (usuarios, ranking, locais) para o banco de dados. Você pode usar os arquivos .php do backend como referência para criar as tabelas.
  * Verifique as credenciais de conexão no arquivo backend/conn.php e ajuste se necessário (servidor, usuário, senha).

**3. Inicie o Projeto:**
  * Mova a pasta do projeto para o diretório htdocs (ou similar) do seu servidor local.
  * Abra o navegador e acesse http://localhost/LTD-main/.

# Equipe
* **Alexandre Abreu** - Orientador
* **Laís Rocha** - Front-End
* **Felipe Fayal** - Front-End
* **Matheus Carvalho** - Front-End
* **Davi Assaf** - Full Stack
* **Beatriz Cardozo** - Back-End
* **Thiago Maues** - Design
* **Gustavo Henrique** - Design

(Conforme a seção "Conheça a equipe!" na página sobre/index.html)

