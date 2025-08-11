// 标签功能
document.addEventListener('DOMContentLoaded', () => {
    initializeTags();
});

// 初始化标签
function initializeTags() {
    const tagsContainer = document.querySelector('.tags-container');
    if (!tagsContainer) return;

    // 获取所有标签
    const tags = getAllTags();
    
    // 渲染标签
    renderTags(tags, tagsContainer);
}

// 获取所有标签
function getAllTags() {
    // 这里应该是从后端获取标签数据
    // 这里使用模拟数据
    return [
        { name: '技术', count: 12 },
        { name: '生活', count: 8 },
        { name: '旅行', count: 5 },
        { name: '美食', count: 3 },
        { name: '摄影', count: 7 }
    ];
}

// 渲染标签
function renderTags(tags, container) {
    let html = '<div class="tags-list">';

    tags.sort((a, b) => b.count - a.count).forEach(tag => {
        html += `
            <a href="/tags/${tag.name}" class="tag">
                ${tag.name} (${tag.count})
            </a>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// 标签云动画
function animateTags() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
    });
}
