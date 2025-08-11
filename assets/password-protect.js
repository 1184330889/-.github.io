document.addEventListener('DOMContentLoaded', function() {
  // 设置您的访问密码，请将"123456"改成您自己的密码
  const correctPassword = 'admin';
  
  // 提示用户输入密码
  const userPassword = prompt('请输入访问密码:');
  
  // 如果密码不正确，显示访问被拒绝信息
  if (userPassword !== correctPassword) {
    document.body.innerHTML = '<div style="text-align: center; margin-top: 50px;"><h1>访问被拒绝</h1><p>您没有权限访问此内容</p></div>';
  }
});
