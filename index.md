---
layout: default
---
# My Knowledge Base

This is a collection of my thoughts and learnings.

## Latest Posts
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}
    </li>
  {% endfor %}
</ul>
