// 密码保护配置
const passwordConfig = {
    password: 'your_password', // 设置访问密码
    maxAttempts: 3, // 最大尝试次数
    lockoutTime: 60, // 锁定时间（秒）
    remember: true, // 是否记住密码
    rememberDuration: 24 * 60 * 60 // 记住密码的时间（秒）
};

// 密码保护功能
class PasswordProtect {
    constructor(config) {
        this.config = config;
        this.attempts = 0;
        this.locked = false;
        this.lockoutTimer = null;
        this.init();
    }

    init() {
        // 检查是否记住密码
        if (this.config.remember) {
            const stored = localStorage.getItem('site_password_protected');
            if (stored) {
                try {
                    const { timestamp, password } = JSON.parse(stored);
                    const now = Math.floor(Date.now() / 1000);
                    if (now - timestamp < this.config.rememberDuration) {
                        if (password === this.config.password) {
                            return; // 已记住密码，无需验证
                        }
                    }
                } catch (e) {
                    console.error('Error parsing stored password data', e);
                }
            }
        }

        // 显示密码输入框
        this.showPasswordPrompt();
    }

    showPasswordPrompt() {
        const overlay = document.createElement('div');
        overlay.id = 'password-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;

        const form = document.createElement('form');
        form.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 5px;
            min-width: 300px;
        `;

        const title = document.createElement('h2');
        title.textContent = '请输入密码访问网站';
        title.style.cssText = 'margin-bottom: 20px; text-align: center;';

        const input = document.createElement('input');
        input.type = 'password';
        input.placeholder = '输入密码';
        input.style.cssText = 'width: 100%; padding: 10px; margin-bottom: 10px;';

        const submit = document.createElement('button');
        submit.type = 'submit';
        submit.textContent = '访问';
        submit.style.cssText = `
            width: 100%;
            padding: 10px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;

        const error = document.createElement('div');
        error.id = 'password-error';
        error.style.cssText = 'color: red; text-align: center; margin-top: 10px; display: none;';

        form.appendChild(title);
        form.appendChild(input);
        form.appendChild(submit);
        form.appendChild(error);
        overlay.appendChild(form);
        document.body.appendChild(overlay);

        form.onsubmit = (e) => {
            e.preventDefault();
            if (this.locked) {
                error.textContent = `请等待${this.lockoutTimer}s后再试`;
                error.style.display = 'block';
                return;
            }

            const password = input.value;
            if (password === this.config.password) {
                this.handleSuccess(password);
                overlay.remove();
            } else {
                this.handleFailure();
            }
        };
    }

    handleSuccess(password) {
        if (this.config.remember) {
            const data = {
                timestamp: Math.floor(Date.now() / 1000),
                password: password
            };
            localStorage.setItem('site_password_protected', JSON.stringify(data));
        }
        console.log('Password correct. Access granted.');
    }

    handleFailure() {
        this.attempts++;
        const error = document.getElementById('password-error');
        if (this.attempts >= this.config.maxAttempts) {
            this.locked = true;
            error.textContent = `错误次数过多，请等待${this.config.lockoutTime}秒后再试`;
            error.style.display = 'block';
            this.lockoutTimer = this.config.lockoutTime;
            const timer = setInterval(() => {
                this.lockoutTimer--;
                if (this.lockoutTimer <= 0) {
                    this.locked = false;
                    clearInterval(timer);
                    error.style.display = 'none';
                }
            }, 1000);
        } else {
            error.textContent = `密码错误，请重试（${this.config.maxAttempts - this.attempts}次机会）`;
            error.style.display = 'block';
        }
    }
}

// 初始化密码保护
document.addEventListener('DOMContentLoaded', () => {
    new PasswordProtect(passwordConfig);
});

