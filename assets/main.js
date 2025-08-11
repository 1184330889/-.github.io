// 网站初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    setupSearch();
    setupDarkModeToggle();
});

// 导航初始化
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// 搜索功能
function setupSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            if (searchTerm.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            // 模拟搜索结果
            const results = searchPosts(searchTerm);
            displaySearchResults(results);
        });
    }
}

// 搜索文章
function searchPosts(term) {
    // 这里应该是从后端获取搜索结果
    // 这里使用模拟数据
    const posts = [
        { title: '示例文章1', url: '/posts/example1' },
        { title: '示例文章2', url: '/posts/example2' },
        { title: '示例文章3', url: '/posts/example3' }
    ];

    return posts.filter(post => post.title.toLowerCase().includes(term));
}

// 显示搜索结果
function displaySearchResults(results) {
    const searchResults = document.querySelector('#search-results');
    if (!searchResults) return;

    if (results.length === 0) {
        searchResults.innerHTML = '<p>没有找到相关内容</p>';
        return;
    }

    let html = '<ul>';
    results.forEach(result => {
        html += `<li><a href="${result.url}">${result.title}</a></li>`;
    });
    html += '</ul>';

    searchResults.innerHTML = html;
}

// 深色模式切换
function setupDarkModeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // 检查本地存储
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }

        // 监听系统主题变化
        prefersDark.addEventListener('change', e => {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    }
}
