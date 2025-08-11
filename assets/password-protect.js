window.onload = function() {
  var password = prompt("请输入访问密码:");
  if(password !== "20050509") {
    document.body.innerHTML = "<h1>访问被拒绝</h1>";
  }
};
