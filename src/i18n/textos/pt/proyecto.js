/**
 * Página "O projeto". Mesma estrutura do arquivo em espanhol, cujo plano vem de src/datos/planTrabajo.js:
 * fases por id; atividades, indicadores e riscos pela posição na lista.
 */
export default {
  titulo: 'O projeto',
  intro: '{lema}. Protótipo de inovação feito com React, sem banco de dados.',
  lema: 'Calculadora de orçamentos para recém-formados em {sistemas} e {multimedia}',
  problema: {
    titulo: 'O problema',
    texto:
      'Ao se formar, a maioria dos engenheiros de Sistemas e de Multimídia recebe os primeiros trabalhos sem saber quanto cobrar. Eles escolhem um preço ao acaso, copiam o de um amigo ou cobram tão pouco que perdem dinheiro sem perceber: esquecem as contribuições para a previdência, a retenção, as horas que não são cobradas e o desgaste do equipamento.',
  },
  propuesta: {
    titulo: 'A proposta',
    texto:
      'Uma calculadora de orçamentos que parte da realidade de cada pessoa: suas despesas, suas horas e o quanto domina o assunto. Ela transforma esses dados em um preço sugerido, um piso para não ter prejuízo e uma comparação com o mercado, e explica de onde vem cada valor.',
  },
  cifras: {
    titulo: 'Em números',
    productos: 'Produtos no catálogo',
    deCarrera: 'De {carrera}',
    horasPlan: 'Horas do plano de trabalho',
  },
  plan: {
    titulo: 'Plano de trabalho',
    intro: 'Design Thinking por fases, com o protótipo construído em três sprints de uma semana.',
    semanas: ({ n, lista }) => `${n === 1 ? 'Semana' : 'Semanas'} ${lista}`,
    entregable: 'Entregável: {texto}',
    cronograma: {
      alt: 'Cronograma de 8 semanas do projeto',
      pie: 'Cronograma de referência de oito semanas.',
    },
    fases: {
      empatizar: {
        nombre: 'Empatizar e pesquisar',
        actividades: {
          0: 'Questionário com estudantes e formados sobre como definem o preço do seu trabalho',
          1: 'Pesquisa de salários, tarifas e normas de 2026 (salário mínimo, UVT, contribuições, retenção)',
        },
        entregable: 'Relatório de descobertas e lista de produtos a orçar',
      },
      definir: {
        nombre: 'Definir',
        actividades: {
          0: 'Definição do problema e do usuário (recém-formado em Sistemas ou Multimídia)',
          1: 'Catálogo de 80 produtos com unidade de medida e horas de referência',
          2: 'Desenho da lógica de negócio e das fórmulas',
        },
        entregable: 'Documento de lógica de negócio e catálogo de produtos',
      },
      idear: {
        nombre: 'Idear e projetar',
        actividades: {
          0: 'Fluxogramas do usuário e do cálculo',
          1: 'Esboços, wireframes e protótipo navegável no Figma',
          2: 'Sistema visual: cor, tipografia e componentes',
        },
        entregable: 'Protótipo navegável e fluxogramas',
      },
      prototipar: {
        nombre: 'Prototipar em React',
        actividades: {
          0: 'Sprint 1: projeto com Vite, estado com useReducer e Context, motor de cálculo e testes',
          1: 'Sprint 2: assistente de 4 passos, resumo ao vivo e catálogo',
          2: 'Sprint 3: resultado com gráficos, histórico, orçamento para imprimir e metodologia',
        },
        entregable: 'Aplicação funcionando localmente',
      },
      probar: {
        nombre: 'Testar com estudantes',
        actividades: {
          0: 'Testes unitários do cálculo e revisão no celular e no computador',
          1: 'Publicação com ngrok e sessão de teste com 15 a 30 estudantes',
          2: 'Questionário de usabilidade (SUS) e registro das descobertas',
        },
        entregable: 'Relatório de validação com estudantes',
      },
      iterar: {
        nombre: 'Iterar e entregar',
        actividades: {
          0: 'Ajustes conforme o feedback',
          1: 'Documentação final e apresentação',
        },
        entregable: 'Versão 1.0, documentação e apresentação',
      },
    },
    indicadores: {
      0: 'Pelo menos 20 estudantes testam o app pelo link do ngrok.',
      1: 'Pontuação de usabilidade SUS de 68 ou mais.',
      2: 'Um estudante novo obtém o primeiro orçamento em menos de 5 minutos.',
      3: 'Pelo menos 8 em cada 10 participantes entendem de onde vem o preço.',
      4: 'Todos os testes automáticos do cálculo passam.',
    },
    riesgos: {
      0: {
        riesgo: 'O link do ngrok para de funcionar se o PC for desligado ou se a janela for fechada.',
        mitigacion: 'Deixar o PC ligado durante o teste e ter à mão o COMPARTIR_CON_NGROK.bat.',
      },
      1: {
        riesgo: 'O plano gratuito do ngrok tem limites mensais de requisições e de dados.',
        mitigacion: 'Usar a versão compilada (mais leve) e fazer os testes em sessões curtas.',
      },
      2: {
        riesgo: 'Os números de referência (salário mínimo, dólar, tarifas) mudam com o tempo.',
        mitigacion: 'Parâmetros editáveis no app e fontes citadas na metodologia.',
      },
      3: {
        riesgo: 'Alguém tomar o resultado como orientação tributária.',
        mitigacion: 'Aviso visível: são valores de referência; os impostos devem ser confirmados com um contador.',
      },
      4: {
        riesgo: 'Sem banco de dados, os dados se perdem ao recarregar.',
        mitigacion: 'Exportar e importar o histórico em JSON ou CSV e imprimir o orçamento em PDF.',
      },
    },
  },
  exito: 'Como saberemos que funciona',
  riesgos: 'Riscos',
  arquitectura: {
    titulo: 'Arquitetura',
    texto:
      'O React guarda tudo em um único estado (useReducer dentro de um Context). Cada mudança recalcula o orçamento com funções puras que não dependem da interface e, por isso, podem ser testadas sozinhas.',
    alt: 'Diagrama da arquitetura de componentes, estado e lógica',
    pie: 'Fluxo de dados: da interface ao reducer, do estado ao motor de cálculo e de volta à tela.',
    estructura: 'Estrutura de pastas',
    /** Comentários da árvore de pastas. */
    arbol: {
      docs: 'Plano de trabalho, lógica, diagramas e guia do ngrok',
      public: 'Ícone e diagramas que o app mostra',
      scripts: 'compartir.mjs (ngrok) e geradores de documentação',
      datos: 'Catálogo ({n} produtos), parâmetros 2026, plano e explicações "!"',
      logica: 'Motor de cálculo: funções puras e testes',
      estado: 'useReducer + Context: o único estado do app',
      hooks: 'useRuta (navegação), useTema (claro ou escuro) e useAnchoElemento',
      componentes: 'Assistente, resultado, gráficos, estrutura e UI',
      paginas: 'Início, Orçar, Resultado, Catálogo, Metodologia...',
      estilos: 'Tokens, base, componentes, páginas e impressão',
      verificar: 'Verifica Node, npm e ngrok',
      instalar: 'npm install + testes + compilação',
      iniciar: 'Modo de desenvolvimento em http://localhost:5173',
      configurarNgrok: 'Instala o ngrok e salva o authtoken',
      compartirNgrok: 'Compila, serve e abre o túnel do ngrok',
    },
  },
  ngrok: {
    titulo: 'Compartilhar com ngrok',
    pasos: [
      'Crie uma conta grátis em ngrok.com e copie o seu authtoken do painel.',
      'Instale o ngrok pela Microsoft Store ou com o comando winget install ngrok -s msstore.',
      'Salve o token uma única vez com ngrok config add-authtoken SEU_TOKEN.',
      'Execute COMPARTIR_CON_NGROK.bat: ele compila o app, serve na porta 4173 e mostra o link público com o QR code.',
      'Compartilhe o link. Enquanto a janela continuar aberta, os estudantes podem entrar de qualquer lugar.',
    ],
  },
  creditos: {
    titulo: 'Créditos',
    autoria: '{autores}. {programa}, {universidad}, {ciudad}, {anio}. Versão {version}.',
    tecnologia: 'Feito com React 19, Vite 8, JavaScript e CSS. Testes com Vitest. Sem banco de dados.',
  },
};
