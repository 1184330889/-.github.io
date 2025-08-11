// 文章归档功能
document.addEventListener('DOMContentLoaded', () => {
    initializeArchive();
});

// 初始化归档
function initializeArchive() {
    const archiveContainer = document.querySelector('.archive-container');
    if (!archiveContainer) return;

    // 获取所有文章
    const posts = getAllPosts();
    
    // 按年份分组
    const groupedByYear = groupPostsByYear(posts);
    
    // 渲染归档
    renderArchive(groupedByYear, archiveContainer);
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

// 按年份分组
function groupPostsByYear(posts) {
    return posts.reduce((acc, post) => {
        const year = post.date.substring(0, 4);
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(post);
        return acc;
    }, {});
}

// 渲染归档
function renderArchive(groupedByYear, container) {
    let html = '<div class="archive-list">';

    Object.entries(groupedByYear).sort((a, b) => b[0] - a[0]).forEach(([year, posts]) => {
        html += `
            <div class="archive-year">
                <h2>${year}</h2>
                <ul>
        `;

        posts.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(post => {
            html += `
                <li>
                    <a href="${post.url}">
                        <span class="post-date">${formatDate(post.date)}</span>
                        <span class="post-title">${post.title}</span>
                    </a>
                </li>
            `;
        });

        html += `
                </ul>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric'
    });
}
