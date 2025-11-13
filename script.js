// Sistema de idiomas
const translations = {
    'pt-BR': {
        'logo': 'Meu Portfólio',
        'about': 'Sobre',
        'projects': 'Projetos',
        'contact': 'Contato',
        'hero_title': 'Olá, eu sou <span class="highlight">Wellyson Lopes Carneiro</span>',
        'hero_subtitle': 'Desenvolvedor Full Stack Python criando experiências web incríveis',
        'view_projects': 'Ver Projetos',
        'get_in_touch': 'Entrar em Contato',
        'my_projects': 'Meus Projetos',
        'about_me': 'Sobre Mim',
        'about_text_1': 'Sou um desenvolvedor Full Stack Python apaixonado por criar interfaces modernas e responsivas. Atualmente focando em HTML, CSS, JavaScript e Bootstrap.',
        'about_text_2': 'Meus projetos demonstram minha evolução constante no desenvolvimento web, desde aplicações simples até sites completos com funcionalidades complexas.',
        'skills': 'Habilidades',
        'contact_me': 'Vamos trabalhar juntos! Conecte-se comigo através das redes abaixo.',
        'contact_text': 'Vamos trabalhar juntos! Entre em contato através dos links abaixo.',
        'footer_text': '&copy; 2024 Meu Portfólio. Todos os direitos reservados.',
        'view_site': 'Ver Site',
        'view_code': 'Ver Código'
    },
    'en': {
        'logo': 'My Portfolio',
        'about': 'About',
        'projects': 'Projects',
        'contact': 'Contact',
        'hero_title': 'Hello, I\'m <span class="highlight">Wellyson Lopes Carneiro</span>',
        'hero_subtitle': 'Full Stack Python Developer creating amazing web experiences',
        'view_projects': 'View Projects',
        'get_in_touch': 'Get In Touch',
        'my_projects': 'My Projects',
        'about_me': 'About Me',
        'about_text_1': 'I\'m a Full Stack Python developer passionate about creating modern and responsive interfaces. Currently focusing on HTML, CSS, JavaScript and Bootstrap.',
        'about_text_2': 'My projects demonstrate my constant evolution in web development, from simple applications to complete websites with complex functionalities.',
        'skills': 'Skills',
        'contact_me': 'Get In Touch',
        'contact_text': 'Let\'s work together! Connect with me through the links below.',
        'footer_text': '&copy; 2024 My Portfolio. All rights reserved.',
        'view_site': 'View Site',
        'view_code': 'View Code'
    }
};

// Variáveis globais
let currentLanguage = 'pt-BR';
let projectsData = {};

// Função para carregar projetos do JSON
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        projectsData = await response.json();
        renderProjects();
        console.log('✅ Projetos carregados do JSON:', projectsData.projects.length);
    } catch (error) {
        console.error('❌ Erro ao carregar projetos:', error);
        // Fallback - mostra mensagem de erro
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = `
            <div class="error-message">
                <p>Erro ao carregar projetos. Verifique o arquivo projects.json</p>
            </div>
        `;
    }
}

// Função para mudar idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Atualiza todos os elementos com data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    // Atualiza botões de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(lang === 'pt-BR' ? 'pt-br' : 'en').classList.add('active');
    
    // Recarrega projetos com novo idioma
    if (projectsData.projects) {
        renderProjects();
    }
    
    // Salva preferência
    localStorage.setItem('preferred-language', lang);
}

// Função para renderizar projetos
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const lang = currentLanguage;
    
    if (!projectsData.projects || projectsData.projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-projects">
                <p>Nenhum projeto encontrado.</p>
            </div>
        `;
        return;
    }
    
    projectsGrid.innerHTML = projectsData.projects.map(project => `
        <div class="project-card">
            <img src="assets/images/${project.imagem}" alt="${project[`nome_${lang}`] || project.nome}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project[`nome_${lang}`] || project.nome}</h3>
                <p class="project-description">${project[`descricao_${lang}`] || project.descricao_pt}</p>
                <div class="tech-tags">
                    ${project.tecnologias.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.link_site}" target="_blank" class="project-link">
                        ${translations[lang].view_site}
                    </a>
                    <a href="${project.link_github}" target="_blank" class="project-link secondary">
                        ${translations[lang].view_code}
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Smooth scroll para links internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efeito de scroll no header
function initHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Carrega idioma salvo ou padrão
    const savedLang = localStorage.getItem('preferred-language') || 'pt-BR';
    changeLanguage(savedLang);
    
    // Carrega projetos do JSON
    loadProjects();
    
    // Inicializa smooth scroll
    initSmoothScroll();
    
    // Inicializa efeito de scroll no header
    initHeaderScroll();
    
    // Event listeners para botões de idioma
    document.getElementById('pt-br').addEventListener('click', () => changeLanguage('pt-BR'));
    document.getElementById('en').addEventListener('click', () => changeLanguage('en'));
});

// Debug helper - verifica se tudo carregou
console.log('🚀 script.js carregado com sucesso!');