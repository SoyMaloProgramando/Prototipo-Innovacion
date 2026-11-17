/** Brazilian Portuguese translation of the product catalog. Keys are the ids used in src/datos/catalogo*.js. */
export default {
  carreras: {
    sistemas: { nombre: 'Engenharia de Sistemas', corto: 'Sistemas' },
    multimedia: { nombre: 'Engenharia Multimídia', corto: 'Multimídia' },
  },
  categorias: {
    web: 'Desenvolvimento web',
    movil: 'Desenvolvimento móvel',
    escritorio: 'Desktop e automação',
    datos: 'Bancos de dados e análise',
    infra: 'Infraestrutura, redes e suporte',
    consultoria: 'Qualidade, segurança e consultoria',
    grafico: 'Design gráfico e identidade visual',
    editorial: 'Design editorial',
    uxui: 'UX/UI e web',
    animacion: 'Animação e motion graphics',
    tresd: 'Personagens, 3D e renderização',
    audiovisual: 'Audiovisual e fotografia',
    audio: 'Áudio',
    interactivos: 'Interativos e imersivos',
  },
  productos: {
    // web
    'sis-landing': {
      nombre: 'Landing page',
      descripcion: 'Página única para apresentar um produto, serviço ou evento e captar contatos.',
      unidad: { singular: 'seção', plural: 'seções' },
      entregables: ['Página responsiva publicada', 'Formulário de contato ou link para o WhatsApp', 'Otimização básica de velocidade e SEO'],
      costos: ['Domínio (1 ano)', 'Hospedagem (1 ano)'],
    },
    'sis-sitio-corporativo': {
      nombre: 'Site corporativo ou institucional',
      descripcion: 'Site de várias páginas para uma empresa ou instituição: quem somos, serviços, contato e mais.',
      unidad: { singular: 'página', plural: 'páginas' },
      entregables: ['Site responsivo com menu e páginas internas', 'Formulário de contato e mapa', 'Manual curto para atualizar os conteúdos'],
      costos: ['Domínio (1 ano)', 'Hospedagem (1 ano)'],
    },
    'sis-ecommerce': {
      nombre: 'Loja online (e-commerce)',
      descripcion: 'Loja com catálogo, carrinho, pagamentos online e painel para a gestão de pedidos.',
      unidad: { singular: 'módulo', plural: 'módulos' },
      entregables: ['Catálogo com categorias e busca', 'Carrinho e pagamento online', 'Painel de pedidos e estoque'],
      costos: ['Domínio (1 ano)', 'Hospedagem de alto desempenho (1 ano)'],
    },
    'sis-app-web': {
      nombre: 'Aplicação web personalizada',
      descripcion: 'Sistema web com usuários e perfis de acesso: estoque, agendamentos, reservas, gestão acadêmica e similares.',
      unidad: { singular: 'módulo', plural: 'módulos' },
      entregables: ['Aplicação com login e perfis de acesso', 'Módulos com validações e relatórios', 'Implantação e manual do usuário'],
      costos: ['Servidor na nuvem (1 ano)'],
    },
    'sis-wordpress': {
      nombre: 'Site com gestor de conteúdo (WordPress)',
      descripcion: 'Site que o próprio cliente administra para publicar notícias, artigos ou produtos.',
      unidad: { singular: 'página', plural: 'páginas' },
      entregables: ['Site WordPress com tema configurado', 'Plugins de segurança, SEO e formulários', 'Capacitação para publicar conteúdo'],
      costos: ['Domínio (1 ano)', 'Hospedagem (1 ano)', 'Tema premium'],
    },
    'sis-api': {
      nombre: 'API REST / backend',
      descripcion: 'Serviços que conectam um app ou site ao banco de dados e a outros sistemas.',
      unidad: { singular: 'endpoint', plural: 'endpoints' },
      entregables: ['Endpoints documentados com OpenAPI', 'Autenticação e validações', 'Testes básicos e implantação'],
    },
    'sis-pasarela': {
      nombre: 'Integração de gateway de pagamento',
      descripcion: 'Conectar um site ou app existente ao PayU, ao Mercado Pago ou a um gateway semelhante.',
      unidad: { singular: 'integração', plural: 'integrações' },
      entregables: ['Pagamentos online em modo de teste e de produção', 'Confirmação automática de pagamentos (webhooks)', 'Guia para conciliar pagamentos'],
    },
    'sis-pwa': {
      nombre: 'Aplicação web progressiva (PWA)',
      descripcion: 'Site que pode ser instalado no celular, funciona offline e envia notificações.',
      unidad: { singular: 'tela', plural: 'telas' },
      entregables: ['App instalável pelo navegador', 'Modo offline e notificações', 'Publicação com HTTPS'],
    },

    // movil
    'sis-android': {
      nombre: 'App Android nativo',
      descripcion: 'Aplicativo nativo para Android, escrito em Kotlin ou Java.',
      unidad: { singular: 'tela', plural: 'telas' },
      entregables: ['APK ou AAB assinado', 'Código-fonte documentado', 'Conexão com API ou banco de dados'],
    },
    'sis-ios': {
      nombre: 'App iOS nativo',
      descripcion: 'Aplicativo nativo para iPhone, escrito em Swift.',
      unidad: { singular: 'tela', plural: 'telas' },
      entregables: ['App pronto para o TestFlight', 'Código-fonte documentado', 'Conexão com API ou banco de dados'],
      costos: ['Apple Developer Program (1 ano)'],
    },
    'sis-multiplataforma': {
      nombre: 'App multiplataforma (Flutter ou React Native)',
      descripcion: 'Uma única base de código para Android e iOS.',
      unidad: { singular: 'tela', plural: 'telas' },
      entregables: ['App para Android e iOS', 'Código-fonte com Expo ou Flutter', 'Conexão com API ou Firebase'],
    },
    'sis-publicacion-tiendas': {
      nombre: 'Publicação no Google Play ou na App Store',
      descripcion: 'Preparar a página da loja, as capturas de tela e as políticas, e enviar o app para a loja.',
      unidad: { singular: 'loja', plural: 'lojas' },
      entregables: ['Página da loja com capturas de tela e textos', 'Política de privacidade publicada', 'App enviado para revisão'],
      costos: ['Conta de desenvolvedor do Google Play (pagamento único)'],
    },

    // escritorio
    'sis-escritorio': {
      nombre: 'Aplicação desktop local',
      descripcion: 'Programa instalado no computador, feito em Java, C# ou Python.',
      unidad: { singular: 'módulo', plural: 'módulos' },
      entregables: ['Instalador ou executável (.exe ou .jar)', 'Banco de dados local (SQLite ou MySQL)', 'Manual do usuário'],
    },
    'sis-inventario': {
      nombre: 'Sistema local de estoque ou faturamento',
      descripcion: 'Controle de produtos, entradas, saídas, vendas e relatórios para um negócio.',
      unidad: { singular: 'módulo', plural: 'módulos' },
      entregables: ['Módulos de produtos, vendas e estoque', 'Relatórios em PDF ou Excel', 'Backups do banco de dados'],
      nota: 'A emissão de faturas eletrônicas junto à autoridade fiscal pode exigir um fornecedor de tecnologia autorizado.',
    },
    'sis-automatizacion': {
      nombre: 'Automação de processos',
      descripcion: 'Scripts ou macros que fazem sozinhos as tarefas repetitivas: relatórios, e-mails e arquivos.',
      unidad: { singular: 'processo', plural: 'processos' },
      entregables: ['Scripts ou macros em funcionamento', 'Instruções de uso', 'Registro de erros'],
    },
    'sis-chatbot': {
      nombre: 'Chatbot com inteligência artificial',
      descripcion: 'Assistente para site ou WhatsApp que responde a perguntas frequentes e coleta dados.',
      unidad: { singular: 'fluxo de conversa', plural: 'fluxos de conversa' },
      entregables: ['Chatbot conectado ao canal', 'Base de conhecimento configurada', 'Relatório de conversas'],
      costos: ['Créditos de API de IA (primeiro mês)'],
    },

    // datos
    'sis-base-datos': {
      nombre: 'Projeto e criação de banco de dados',
      descripcion: 'Modelo entidade-relacionamento, normalização e script SQL pronto para usar.',
      unidad: { singular: 'tabela', plural: 'tabelas' },
      entregables: ['Modelo entidade-relacionamento e dicionário de dados', 'Script SQL com tabelas, chaves e restrições', 'Dados de teste e consultas principais'],
    },
    'sis-migracion': {
      nombre: 'Migração de dados',
      descripcion: 'Passar informações do Excel ou de um sistema antigo para um novo banco de dados.',
      unidad: { singular: 'tabela', plural: 'tabelas' },
      entregables: ['Scripts de migração', 'Validação dos dados migrados', 'Relatório de qualidade dos dados'],
    },
    'sis-tablero-bi': {
      nombre: 'Painel de indicadores (Power BI ou Looker Studio)',
      descripcion: 'Dashboard para acompanhar os números do negócio com filtros e gráficos.',
      unidad: { singular: 'indicador', plural: 'indicadores' },
      entregables: ['Painel interativo com filtros', 'Conexão com a fonte de dados', 'Guia para ler os indicadores'],
      costos: ['Licença do Power BI Pro (1 mês)'],
    },
    'sis-analisis-datos': {
      nombre: 'Análise de dados com relatório',
      descripcion: 'Limpar, analisar e explicar dados para responder a perguntas concretas do cliente.',
      unidad: { singular: 'pergunta de análise', plural: 'perguntas de análise' },
      entregables: ['Dados limpos', 'Relatório com gráficos e conclusões', 'Notebook de análise reproduzível'],
    },
    'sis-scraping': {
      nombre: 'Web scraping e limpeza de dados (ETL)',
      descripcion: 'Extrair, limpar e carregar dados de sites ou arquivos de forma automática.',
      unidad: { singular: 'fonte', plural: 'fontes' },
      entregables: ['Extrator agendado', 'Dados limpos em CSV ou banco de dados', 'Documentação do processo'],
      nota: 'Verifique os termos de uso de cada site antes de extrair dados.',
    },

    // infra
    'sis-despliegue': {
      nombre: 'Implantação na nuvem',
      descripcion: 'Configurar servidor, domínio, certificado SSL e a publicação de uma aplicação.',
      unidad: { singular: 'serviço', plural: 'serviços' },
      entregables: ['Aplicação publicada com HTTPS', 'Domínio e DNS configurados', 'Guia de implantação e backup'],
      costos: ['Servidor VPS (1 mês)', 'Domínio (1 ano)'],
    },
    'sis-red': {
      nombre: 'Instalação e configuração de rede',
      descripcion: 'Cabeamento estruturado ou Wi-Fi para um escritório ou pequeno negócio.',
      unidad: { singular: 'ponto de rede', plural: 'pontos de rede' },
      entregables: ['Pontos de rede instalados e testados', 'Roteador ou Wi-Fi configurado com segurança', 'Diagrama e etiquetagem da rede'],
      costos: ['Materiais: cabos, conectores e canaletas'],
    },
    'sis-mantenimiento-pc': {
      nombre: 'Manutenção preventiva e corretiva de computadores',
      descripcion: 'Limpeza, revisão de hardware, formatação, drivers e otimização.',
      unidad: { singular: 'computador', plural: 'computadores' },
      entregables: ['Computadores limpos e otimizados', 'Relatório do estado de cada computador', 'Recomendações de melhoria'],
      costos: ['Materiais: pasta térmica e produtos de limpeza'],
    },
    'sis-soporte': {
      nombre: 'Suporte técnico (pacote mensal)',
      descripcion: 'Pacote de horas por mês para resolver problemas de software, hardware e usuários.',
      unidad: { singular: 'hora de suporte', plural: 'horas de suporte' },
      entregables: ['Atendimento remoto ou presencial', 'Registro dos casos atendidos', 'Relatório mensal'],
    },
    'sis-backups': {
      nombre: 'Plano de backup',
      descripcion: 'Backup automático de arquivos e bancos de dados, com testes de restauração.',
      unidad: { singular: 'computador ou servidor', plural: 'computadores ou servidores' },
      entregables: ['Backups automáticos agendados', 'Teste de restauração', 'Política de backup documentada'],
      costos: ['Armazenamento na nuvem (1 ano)'],
    },

    // consultoria
    'sis-qa': {
      nombre: 'Testes de software (QA)',
      descripcion: 'Criar e executar casos de teste e relatar os erros encontrados.',
      unidad: { singular: 'caso de teste', plural: 'casos de teste' },
      entregables: ['Plano e matriz de casos de teste', 'Relatório de erros com evidências', 'Relatório final de qualidade'],
    },
    'sis-seguridad': {
      nombre: 'Diagnóstico básico de segurança da informação',
      descripcion: 'Revisar configurações, senhas, backups e riscos de um negócio, com um plano de melhoria.',
      unidad: { singular: 'sistema avaliado', plural: 'sistemas avaliados' },
      entregables: ['Inventário de ativos e riscos', 'Relatório de achados priorizados', 'Plano de melhorias'],
      nota: 'Apenas em sistemas do cliente e com autorização por escrito.',
    },
    'sis-requerimientos': {
      nombre: 'Levantamento de requisitos e documentação',
      descripcion: 'Entrevistas, histórias de usuário, casos de uso e diagramas UML.',
      unidad: { singular: 'caso de uso', plural: 'casos de uso' },
      entregables: ['Documento de requisitos', 'Casos de uso e diagramas UML', 'Mapa de navegação ou protótipo'],
    },
    'sis-mantenimiento-software': {
      nombre: 'Manutenção evolutiva de software',
      descripcion: 'Corrigir erros e adicionar pequenas melhorias a um sistema que já existe.',
      unidad: { singular: 'correção ou melhoria', plural: 'correções ou melhorias' },
      entregables: ['Correções implantadas', 'Registro de alterações', 'Testes de regressão básicos'],
    },
    'sis-capacitacion': {
      nombre: 'Capacitação ou tutoria técnica',
      descripcion: 'Aulas de programação, informática ou ferramentas para pessoas ou equipes.',
      unidad: { singular: 'hora de aula', plural: 'horas de aula' },
      entregables: ['Sessões ministradas', 'Material de apoio', 'Exercícios ou avaliação'],
    },
    'sis-iot': {
      nombre: 'Protótipo IoT (Arduino ou ESP32)',
      descripcion: 'Dispositivo que mede, controla ou envia dados para a internet.',
      unidad: { singular: 'sensor ou atuador', plural: 'sensores ou atuadores' },
      entregables: ['Protótipo montado e testado', 'Código do microcontrolador', 'Painel web ou app para ver os dados'],
      costos: ['Componentes eletrônicos'],
    },

    // grafico
    'mul-logo': {
      nombre: 'Logotipo',
      descripcion: 'Criação de logotipo com propostas iniciais, ajustes e arquivos finais.',
      unidad: { singular: 'proposta inicial', plural: 'propostas iniciais' },
      entregables: ['Logotipo nas versões colorida, negativa e monocromática', 'Arquivos vetoriais (AI, SVG, PDF) e PNG', 'Guia rápido de uso'],
    },
    'mul-identidad': {
      nombre: 'Identidade visual ou manual de marca',
      descripcion: 'Sistema visual completo: logo, cores, tipografias e aplicações da marca.',
      unidad: { singular: 'aplicação da marca', plural: 'aplicações da marca' },
      entregables: ['Manual da marca em PDF', 'Paleta, tipografias e padrões', 'Aplicações: papelaria, redes sociais e sinalização'],
    },
    'mul-redes': {
      nombre: 'Peças para redes sociais',
      descripcion: 'Posts, stories e carrosséis para Instagram, Facebook ou TikTok.',
      unidad: { singular: 'peça', plural: 'peças' },
      entregables: ['Peças nos formatos de cada rede', 'Modelos editáveis', 'Sugestões de textos curtos'],
      costos: ['Fotos ou recursos de stock'],
    },
    'mul-afiche': {
      nombre: 'Cartaz, flyer ou panfleto',
      descripcion: 'Peça gráfica impressa ou digital para um evento ou uma promoção.',
      unidad: { singular: 'peça', plural: 'peças' },
      entregables: ['Arquivo para impressão (PDF com sangria)', 'Versão para redes sociais', 'Arquivo-fonte editável'],
    },
    'mul-papeleria': {
      nombre: 'Papelaria corporativa',
      descripcion: 'Cartões de visita, papel timbrado, envelopes e assinatura de e-mail.',
      unidad: { singular: 'peça', plural: 'peças' },
      entregables: ['Arquivos prontos para impressão', 'Assinatura de e-mail', 'Modelos editáveis'],
      costos: ['Impressão de 500 cartões de visita'],
    },
    'mul-ilustracion': {
      nombre: 'Ilustração digital',
      descripcion: 'Ilustração original para web, livro, embalagem ou redes sociais.',
      unidad: { singular: 'ilustração', plural: 'ilustrações' },
      entregables: ['Ilustração em alta resolução', 'Esboço aprovado e versão final', 'Arquivo-fonte em camadas'],
    },
    'mul-infografia': {
      nombre: 'Infográfico',
      descripcion: 'Informação complexa transformada em um gráfico claro e atraente.',
      unidad: { singular: 'infográfico', plural: 'infográficos' },
      entregables: ['Infográfico para impressão e digital', 'Ícones e ilustrações próprios', 'Arquivo editável'],
    },
    'mul-packaging': {
      nombre: 'Embalagens e rótulos',
      descripcion: 'Design de embalagem ou rótulo pronto para produção.',
      unidad: { singular: 'referência de produto', plural: 'referências de produto' },
      entregables: ['Arte-final sobre a faca de corte', 'Mockup 3D da embalagem', 'Arquivos para impressão'],
      costos: ['Prova de impressão'],
    },

    // editorial
    'mul-diagramacion': {
      nombre: 'Diagramação de livro ou revista',
      descripcion: 'Diagramar textos e imagens de uma publicação com estilos profissionais.',
      unidad: { singular: 'página', plural: 'páginas' },
      entregables: ['PDF para impressão e PDF digital', 'Estilos de parágrafo e grid', 'Arquivo do InDesign empacotado'],
    },
    'mul-portada': {
      nombre: 'Capa de livro',
      descripcion: 'Capa, contracapa e lombada para livro impresso ou e-book.',
      unidad: { singular: 'capa', plural: 'capas' },
      entregables: ['Capa completa com lombada calculada', 'Versão para e-book e redes sociais', 'Arquivo editável'],
      costos: ['Imagem de stock'],
    },
    'mul-catalogo': {
      nombre: 'Catálogo, folheto ou portfólio',
      descripcion: 'Publicação comercial para mostrar produtos ou serviços.',
      unidad: { singular: 'página', plural: 'páginas' },
      entregables: ['Catálogo em PDF interativo', 'Versão para impressão', 'Modelo para atualizá-lo'],
    },
    'mul-ebook': {
      nombre: 'E-book ou PDF interativo',
      descripcion: 'Livro digital com índice navegável, links, vídeo ou áudio.',
      unidad: { singular: 'página', plural: 'páginas' },
      entregables: ['E-book em EPUB ou PDF interativo', 'Índice e links funcionais', 'Testes em vários leitores de e-book'],
    },

    // uxui
    'mul-uxui': {
      nombre: 'Design UX/UI com protótipo',
      descripcion: 'Pesquisa rápida, wireframes e protótipo navegável de um app ou site.',
      unidad: { singular: 'tela', plural: 'telas' },
      entregables: ['Wireframes e fluxo do usuário', 'Protótipo navegável no Figma', 'Guia de estilos e componentes'],
    },
    'mul-maquetacion': {
      nombre: 'Codificação front-end',
      descripcion: 'Transformar um design do Figma em HTML, CSS e JavaScript responsivos.',
      unidad: { singular: 'tela', plural: 'telas' },
      entregables: ['Telas responsivas', 'Componentes reutilizáveis', 'Código em um repositório Git'],
    },
    'mul-sitio-multimedia': {
      nombre: 'Site multimídia ou landing page animada',
      descripcion: 'Site com animações, vídeo, scroll interativo ou 3D leve.',
      unidad: { singular: 'seção', plural: 'seções' },
      entregables: ['Site publicado e otimizado', 'Animações e interações', 'Recursos multimídia comprimidos'],
      costos: ['Domínio (1 ano)', 'Hospedagem (1 ano)'],
    },
    'mul-usabilidad': {
      nombre: 'Testes de usabilidade',
      descripcion: 'Testar um produto com usuários reais e propor melhorias.',
      unidad: { singular: 'participante', plural: 'participantes' },
      entregables: ['Roteiro de teste', 'Gravações e achados', 'Relatório com melhorias priorizadas'],
      costos: ['Incentivos para participantes'],
    },

    // animacion
    'mul-animacion-2d': {
      nombre: 'Animação 2D vetorial ou cut-out',
      descripcion: 'Animação com personagens e cenários vetoriais montados por partes.',
      unidad: { singular: 'segundo', plural: 'segundos' },
      entregables: ['Vídeo MP4 na resolução acordada', 'Animatic aprovado', 'Arquivos do projeto'],
      costos: ['Música licenciada'],
    },
    'mul-animacion-fxf': {
      nombre: 'Animação 2D quadro a quadro',
      descripcion: 'Animação tradicional desenhada quadro a quadro.',
      unidad: { singular: 'segundo', plural: 'segundos' },
      entregables: ['Vídeo MP4', 'Animatic e testes de linha', 'Sequências PNG'],
    },
    'mul-motion': {
      nombre: 'Motion graphics ou vídeo explicativo',
      descripcion: 'Vídeo com textos, ícones e gráficos animados para explicar uma ideia.',
      unidad: { singular: 'segundo', plural: 'segundos' },
      entregables: ['Vídeo final com música e efeitos', 'Roteiro e storyboard', 'Versões para redes sociais'],
      costos: ['Locução profissional', 'Música licenciada'],
    },
    'mul-logo-animado': {
      nombre: 'Logo animado ou intro',
      descripcion: 'Animação curta do logotipo para vídeos, redes sociais ou apresentações.',
      unidad: { singular: 'segundo', plural: 'segundos' },
      entregables: ['Vídeo MP4 e versão com transparência', 'Som da marca, se acordado', 'Arquivo do projeto'],
    },
    'mul-animacion-3d': {
      nombre: 'Animação 3D',
      descripcion: 'Animação de personagens, produtos ou cenas em 3D, sem incluir a modelagem.',
      unidad: { singular: 'segundo', plural: 'segundos' },
      entregables: ['Render final em vídeo', 'Animatic 3D', 'Arquivos do projeto'],
      costos: ['Render farm'],
    },
    'mul-storyboard': {
      nombre: 'Storyboard ou animatic',
      descripcion: 'Quadros que planejam a história e os planos de um vídeo ou de uma animação.',
      unidad: { singular: 'quadro', plural: 'quadros' },
      entregables: ['Storyboard em PDF', 'Animatic com tempos e áudio de referência', 'Notas de câmera'],
    },
    'mul-stickers': {
      nombre: 'Stickers e GIFs animados',
      descripcion: 'Pacote de stickers para WhatsApp ou GIFs para redes sociais.',
      unidad: { singular: 'sticker ou GIF', plural: 'stickers ou GIFs' },
      entregables: ['Stickers em WebP ou GIF', 'Pacote pronto para o WhatsApp', 'Arquivos editáveis'],
    },

    // tresd
    'mul-model-sheet': {
      nombre: 'Model sheet de personagem',
      descripcion: 'Folha de modelo com vistas de frente, perfil e costas, poses e expressões.',
      unidad: { singular: 'vista ou pose', plural: 'vistas ou poses' },
      entregables: ['Turnaround do personagem', 'Folha de expressões e poses', 'Paleta de cores e proporções'],
    },
    'mul-concept-art': {
      nombre: 'Concept art',
      descripcion: 'Exploração visual de personagens, cenários ou objetos.',
      unidad: { singular: 'conceito', plural: 'conceitos' },
      entregables: ['Esboços de exploração', 'Conceitos finais coloridos', 'Notas de design'],
    },
    'mul-personaje': {
      nombre: 'Design de personagem ou mascote de marca',
      descripcion: 'Criar um personagem original com personalidade, poses e usos.',
      unidad: { singular: 'personagem', plural: 'personagens' },
      entregables: ['Personagem final colorido', 'Variações de poses e expressões', 'Guia de uso do personagem'],
    },
    'mul-modelado-personaje': {
      nombre: 'Modelagem 3D de personagem',
      descripcion: 'Personagem 3D pronto para renderização, animação ou jogos.',
      unidad: { singular: 'personagem', plural: 'personagens' },
      entregables: ['Modelo 3D com topologia limpa', 'UV e texturas básicas', 'Arquivos FBX, OBJ ou BLEND'],
    },
    'mul-modelado-props': {
      nombre: 'Modelagem 3D de objetos, props ou produtos',
      descripcion: 'Objetos, props ou produtos em 3D para renderização, jogos ou impressão.',
      unidad: { singular: 'objeto', plural: 'objetos' },
      entregables: ['Modelos 3D otimizados', 'Materiais básicos', 'Arquivos no formato acordado'],
    },
    'mul-rigging': {
      nombre: 'Rigging de personagem',
      descripcion: 'Esqueleto e controles para que um personagem 3D possa ser animado.',
      unidad: { singular: 'personagem', plural: 'personagens' },
      entregables: ['Rig com controles e pesos', 'Controles faciais conforme o nível', 'Testes de deformação'],
    },
    'mul-texturizado': {
      nombre: 'Texturização e materiais PBR',
      descripcion: 'Texturas realistas ou estilizadas para modelos 3D.',
      unidad: { singular: 'asset', plural: 'assets' },
      entregables: ['Mapas PBR: cor, rugosidade e normais', 'Materiais configurados', 'Pré-visualizações'],
    },
    'mul-render-arquitectonico': {
      nombre: 'Render arquitetônico',
      descripcion: 'Imagens fotorrealistas de ambientes internos ou externos.',
      unidad: { singular: 'imagem', plural: 'imagens' },
      entregables: ['Renders em alta resolução', 'Modelo 3D do ambiente', 'Ajustes de pós-produção'],
    },
    'mul-recorrido-virtual': {
      nombre: 'Tour virtual 3D ou 360°',
      descripcion: 'Passeio interativo ou em vídeo por um espaço em 3D ou em fotografia 360°.',
      unidad: { singular: 'espaço', plural: 'espaços' },
      entregables: ['Tour navegável ou em vídeo', 'Pontos de informação', 'Versão web ou para óculos VR'],
    },
    'mul-impresion-3d': {
      nombre: 'Modelagem para impressão 3D',
      descripcion: 'Modelos preparados para impressão: peças, figuras ou protótipos.',
      unidad: { singular: 'peça', plural: 'peças' },
      entregables: ['Arquivos STL ou 3MF revisados', 'Parâmetros de impressão sugeridos', 'Peça impressa, se acordado'],
      costos: ['Filamento e impressão'],
    },

    // audiovisual
    'mul-produccion-video': {
      nombre: 'Produção de vídeo comercial ou institucional',
      descripcion: 'Pré-produção, filmagem e edição de um vídeo para uma marca ou instituição.',
      unidad: { singular: 'minuto de vídeo final', plural: 'minutos de vídeo final' },
      entregables: ['Roteiro e plano de filmagem', 'Vídeo final editado e com correção de cor', 'Versões para redes sociais'],
      costos: ['Aluguel de equipamentos (1 dia)', 'Transporte e logística'],
    },
    'mul-edicion-video': {
      nombre: 'Edição de vídeo',
      descripcion: 'Montagem, cortes, títulos, música e exportação de material já gravado.',
      unidad: { singular: 'minuto de vídeo final', plural: 'minutos de vídeo final' },
      entregables: ['Vídeo editado', 'Legendas, se necessário', 'Exportações para cada plataforma'],
    },
    'mul-vfx': {
      nombre: 'Pós-produção, VFX e composição',
      descripcion: 'Efeitos visuais, limpeza de planos, chroma key e composição.',
      unidad: { singular: 'plano', plural: 'planos' },
      entregables: ['Planos compostos', 'Renders com canal alfa, se necessário', 'Arquivos do projeto'],
    },
    'mul-color': {
      nombre: 'Correção de cor',
      descripcion: 'Equilíbrio, correção e look de cor para vídeo.',
      unidad: { singular: 'minuto', plural: 'minutos' },
      entregables: ['Vídeo corrigido', 'LUT do look', 'Exportação final'],
    },
    'mul-reels': {
      nombre: 'Vídeos para redes sociais (Reels e TikTok)',
      descripcion: 'Vídeos verticais curtos com edição dinâmica, textos e tendências.',
      unidad: { singular: 'vídeo', plural: 'vídeos' },
      entregables: ['Vídeos verticais 9:16', 'Legendas e textos', 'Capas'],
    },
    'mul-fotografia-producto': {
      nombre: 'Fotografia de produto com retoque',
      descripcion: 'Sessão de fotos de produto com fundo, iluminação e retoque profissional.',
      unidad: { singular: 'foto final', plural: 'fotos finais' },
      entregables: ['Fotos retocadas em alta resolução', 'Versões para web e redes sociais', 'Fundo branco ou ambientado'],
      costos: ['Objetos de cena e fundos'],
    },
    'mul-cobertura-evento': {
      nombre: 'Cobertura de evento (foto ou vídeo)',
      descripcion: 'Registro fotográfico ou em vídeo de um evento, com entrega editada.',
      unidad: { singular: 'hora de cobertura', plural: 'horas de cobertura' },
      entregables: ['Fotos editadas ou vídeo-resumo', 'Galeria online', 'Material bruto, se acordado'],
      costos: ['Transporte'],
    },

    // audio
    'mul-audio': {
      nombre: 'Edição e mixagem de áudio ou podcast',
      descripcion: 'Limpeza, edição, mixagem e masterização de voz ou música.',
      unidad: { singular: 'minuto', plural: 'minutos' },
      entregables: ['Áudio final masterizado', 'Abertura e encerramento', 'Arquivos em MP3 e WAV'],
    },
    'mul-jingle': {
      nombre: 'Jingle, música original ou design de som',
      descripcion: 'Música ou sons originais para marcas, vídeos ou jogos.',
      unidad: { singular: 'segundo', plural: 'segundos' },
      entregables: ['Faixa final masterizada', 'Versões curtas', 'Faixas separadas (stems), se acordado'],
      costos: ['Locutor ou cantor'],
    },

    // interactivos
    'mul-videojuego-2d': {
      nombre: 'Jogo digital 2D',
      descripcion: 'Jogo 2D para PC, web ou celular com mecânicas, níveis e menus.',
      unidad: { singular: 'nível', plural: 'níveis' },
      entregables: ['Executável ou versão web', 'Código-fonte e assets', 'Documento de design do jogo (GDD)'],
      costos: ['Assets ou música de terceiros'],
    },
    'mul-videojuego-3d': {
      nombre: 'Jogo digital 3D',
      descripcion: 'Jogo 3D com cenários, personagens e mecânicas jogáveis.',
      unidad: { singular: 'nível', plural: 'níveis' },
      entregables: ['Versão jogável', 'Código-fonte e assets', 'Documento de design do jogo (GDD)'],
      costos: ['Assets ou música de terceiros'],
    },
    'mul-ar': {
      nombre: 'Filtro ou experiência de realidade aumentada',
      descripcion: 'Filtros para redes sociais ou experiências de realidade aumentada na web ou no celular.',
      unidad: { singular: 'efeito', plural: 'efeitos' },
      entregables: ['Filtro publicado ou app de realidade aumentada', 'Testes em dispositivos', 'Arquivos do projeto'],
    },
    'mul-vr': {
      nombre: 'Experiência de realidade virtual',
      descripcion: 'Cenas imersivas para óculos de realidade virtual ou para o navegador.',
      unidad: { singular: 'cena', plural: 'cenas' },
      entregables: ['Versão para óculos VR ou WebXR', 'Interações e som espacial', 'Guia de instalação'],
    },
    'mul-ova': {
      nombre: 'Objeto virtual de aprendizagem (OVA)',
      descripcion: 'Material educativo interativo com atividades, avaliação e multimídia.',
      unidad: { singular: 'tela ou atividade', plural: 'telas ou atividades' },
      entregables: ['OVA em HTML5 ou SCORM', 'Atividades e avaliação', 'Guia para o professor'],
    },
    'mul-mapping': {
      nombre: 'Instalação interativa ou video mapping',
      descripcion: 'Projeção sobre superfícies ou instalação que reage ao público.',
      unidad: { singular: 'minuto de conteúdo', plural: 'minutos de conteúdo' },
      entregables: ['Conteúdo ajustado à superfície', 'Programação da interação', 'Montagem e teste no local'],
      costos: ['Aluguel de projetor (1 dia)'],
    },
  },
};
