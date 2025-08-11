// 搜索功能
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
});

// 初始化搜索
function initializeSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}

// 处理搜索
function handleSearch(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    const searchResults = document.querySelector('#search-results');

    if (!searchTerm) {
        searchResults.innerHTML = '';
        return;
    }

    // 获取所有文章
    const allPosts = getAllPosts();

    // 执行搜索
    const results = searchPosts(searchTerm, allPosts);

    // 显示结果
    displaySearchResults(results, searchResults);
}

// 获取所有文章
function getAllPosts() {
    // 这里应该是从后端获取文章数据
    // 这里使用模拟数据
    return [
        { title: '示例文章1', date: '2023-01-15', url: '/posts/example1' },
        { title: '示例文章2', date: '2023-02-20', url: '/posts/example2' },
        { title: '示例文章3', date: '2022-12-10', url: '/posts/example3' }
    ];
}

// 搜索文章
function searchPosts(term, posts) {
    return posts.filter(post => 
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term)
    );
}

// 显示搜索结果
function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<p>没有找到相关内容</p>';
        return;
    }

    let html = '<ul>';
    results.forEach(result => {
        html += `
            <li>
                <a href="${result.url}">
                    <h3>${result.title}</h3>
                    <p>${result.excerpt}</p>
                </a>
            </li>
        `;
    });
    html += '</ul>';

    container.innerHTML = html;
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
