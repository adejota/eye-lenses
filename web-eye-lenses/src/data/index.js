const getData = (language) => {
  if (language === "pt-BR") {
    return pt;
  } else if (language === "en-US") {
    return en;
  }
};

const pt = {
  languages: [
    { name: "Português", code: "pt-BR" },
    { name: "English", code: "en-US" },
  ],
  headerListItems: [
    {
      title: "email",
      content: "ademir.diamentejunior@gmail.com",
      icon: "Mail",
    },
    { title: "celular", content: "+5511983506490", icon: "DevicePhoneMobile" },
    { title: "localização", content: "São Paulo, Brazil", icon: "Location" },
    { title: "nascimento", content: "01/19/1994", icon: "Cake" },
  ],
  headerNavListItems: [
    {
      title: "linkedin",
      link: "https://www.linkedin.com/in/ademir-diamente-jr/",
      icon: "Linkedin",
    },
    {
      title: "instagram",
      link: "https://www.instagram.com/ade_jota/",
      icon: "Instagram",
    },
    {
      title: "twitter",
      link: "https://twitter.com/AdemirDiamente",
      icon: "Twitter",
    },
    { title: "github", link: "https://github.com/adejota", icon: "GitHub" },
  ],
  aboutListItems: [
    {
      title: "+2",
      content: "Anos de experiência com tecnologia",
      icon: "Briefcase",
      since: "03/01/2020",
    },
    { title: "+10", content: "Projetos", icon: "LightBulb" },
    // { title: '+10', content: 'Training & courses', icon: 'AcademicCap' },
  ],
  doingListItems: [
    {
      title: "Desenvolvimento Web",
      content:
        "Desenvolvimento de sites responsivos a nível profissional",
      icon: "CodeBracketSquare",
    },
    {
      title: "Git flow",
      content: "Controle de versão e deploy do sistema",
      icon: "GitHub",
    },
    {
      title: "Gestão de pessoas",
      content: "Code-review e gerenciamento de tarefas",
      icon: "UserGroup",
    },
  ],
  educationListItems: [
    {
      title: "Universidade de São Paulo",
      subtitle: "2013 — 2018",
      content: "Bacharelado, Ciências contábeis",
    },
    {
      title: "Université Paris Dauphine",
      subtitle: "2016 — 2016",
      content: "Intercâmbio, Negócios",
    },
  ],
  experienceListItems: [
    {
      title: "Desenvolvedor web",
      subtitle: "Znap Technologies | mar 2021 — atualmente",
      content:
        "Atuo com foco no front-end em um sistema Vue.js modularizado em diferentes SPAs. Sou responsável por desenvolver componentes genéricos que seguem o princípio de low-coding e são utilizados em todas as views do sistema. Contribuo com code-review dos meus pares, além de ser o responsável por controlar o versionamento do código e o deploy do sistema",
    },
    {
      title: "Product Owner",
      subtitle: "Lavapp | mar 2020 — mar 2021",
      content:
        "Atuei como PO em uma webview com front-end em Vue.js e API Laravel. Também fui responsável por elaborar relatórios gerenciais com objetivo de criar e analisar indicadores estratégicos para a área comercial e financeira",
    },
    {
      title: "Analista",
      subtitle: "Petroplus | fev 2018 — fev 2020",
      content:
        "Atuei auxiliando decisões de nível gerencial com foco na melhoria de processos e planejamento estratégico",
    },
    {
      title: "Estagiário comercial",
      subtitle: "Petroplus | mar 2017 — jan 2018",
      content: "",
    },
    {
      title: "Estagiário de contabilidade",
      subtitle: "Banco Safra | out 2015 — jul 2016",
      content: "",
    },
  ],
  skillsListItems: [
    { title: "Javascript", icon: "JsLogo", category: 'language' },
    { title: "Python", icon: "PythonLogo", category: 'language' },
    { title: "HTML", icon: "HtmlLogo", category: 'frontend' },
    { title: "CSS", icon: "CssLogo", category: 'frontend'  },
    { title: "Vue", icon: "VueLogo", category: 'frontend'  },
    { title: "Tailwind", icon: "TailwindLogo", category: 'frontend'  },
    { title: "Vuetify", icon: "VuetifyLogo", category: 'frontend'  },
    { title: "Figma", icon: "FigmaLogo", category: 'frontend'  },
    { title: "GitHub", icon: "GithubLogo", category: 'versioning'  },
    { title: "Jest", icon: "JestLogo", category: 'tests'  },
    { title: "Cypress", icon: "CypressLogo", category: 'tests'  },
    { title: "Node", icon: "NodeLogo", category: 'backend'  },
    { title: "Express", icon: "ExpressLogo", category: 'backend'  },
    { title: "MySQL", icon: "MysqlLogo", category: 'backend'  },
    { title: "PostgreSQL", icon: "PostgreLogo", category: 'backend'  },
  ],
  portfolioListItems: [
    {
      name: "crud-table",
      title: "Crud table",
      content: "Tabela responsiva que realiza operações CRUD.",
      link: "https://adejota-crud-table.netlify.app/",
      repo: "https://github.com/adejota/crud-table",
    },
    {
      name: "le-tip",
      title: "Le/Tip",
      content:
        "App para divisão e conversão de gorjeta em dólar ou euro para reais.",
      link: "https://adejota-le-tip.netlify.app/",
      repo: "https://github.com/adejota/le-tip",
    },
    {
      name: "memory-game",
      title: "Memory game",
      content:
        "Jogo de memória para mostrar para a minha sobrinha que o meu trabalho é legal!",
      link: "https://adejota-memory-game.netlify.app/",
      repo: "https://github.com/adejota/memory-game",
    },
    {
      name: "portfolio-1",
      title: "Portfólio",
      content: "Modelo de portfólio para desenvolvedor web.",
      link: "https://adejota-portfolio.herokuapp.com/",
      repo: "https://github.com/adejota/portfolio-heroku-app",
    },
  ],
  navBarItems: [
    { id: 1, title: "Sobre" },
    { id: 2, title: "Currículo" },
    { id: 3, title: "Portfolio" },
  ],
};

const en = {
  languages: [
    { name: "Português", code: "pt-BR" },
    { name: "English", code: "en-US" },
  ],
};

export default getData;
