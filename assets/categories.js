// 分类功能
document.addEventListener('DOMContentLoaded', () => {
    initializeCategories();
});

// 初始化分类
function initializeCategories() {
    const categoriesContainer = document.querySelector('.categories-container');
    if (!categoriesContainer) return;

    // 获取所有分类
    const categories = getAllCategories();
    
    // 渲染分类
    renderCategories(categories, categoriesContainer);
}

// 获取所有分类
function getAllCategories() {
    // 这里应该是从后端获取分类数据
    // 这里使用模拟数据
    return [
        { name: '前端开发', count: 15 },
        { name: '后端开发', count: 10 },
        { name: '数据库', count: 5 },
        { name: '算法', count: 8 },
        { name: '设计模式', count: 6 }
    ];
}

// 渲染分类
function renderCategories(categories, container) {
    let html = '<div class="categories-list">';

    categories.sort((a, b) => b.count - a.count).forEach(category => {
        html += `
            <a href="/categories/${category.name}" class="category">
                ${category.name} (${category.count})
            </a>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// 分类列表动画
function animateCategories() {
    const categories = document.querySelectorAll('.category');
    categories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.1}s`;
    });
}
