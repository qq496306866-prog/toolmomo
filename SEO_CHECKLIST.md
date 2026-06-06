# Toolmomo SEO 收录清单

网站上线后，建议先完成搜索引擎收录基础配置。

## 已完成

- `robots.txt`
- `sitemap.xml`
- 首页基础 `metadata`
- 工具页路由
- 分类聚合页已加入 Sitemap
- 使用场景聚合页已加入 Sitemap
- 关于我们、联系我们、隐私政策、免责声明
- 网站图标 `icon.svg`
- Web App manifest

## 需要手动提交

### Google Search Console

入口：

```text
https://search.google.com/search-console
```

建议操作：

1. 添加资源：`https://toolmomo.com`
2. 按提示验证域名所有权
3. 提交 Sitemap：

```text
https://toolmomo.com/sitemap.xml
```

### 百度搜索资源平台

入口：

```text
https://ziyuan.baidu.com/
```

建议操作：

1. 添加网站：`https://toolmomo.com`
2. 验证网站所有权
3. 提交 Sitemap：

```text
https://toolmomo.com/sitemap.xml
```

### Bing Webmaster Tools

入口：

```text
https://www.bing.com/webmasters
```

建议操作：

1. 添加网站：`https://toolmomo.com`
2. 可从 Google Search Console 导入站点
3. 提交 Sitemap：

```text
https://toolmomo.com/sitemap.xml
```

## 上线后检查

每次更新网站后，建议检查这些地址：

```text
https://toolmomo.com
https://toolmomo.com/tools
https://toolmomo.com/robots.txt
https://toolmomo.com/sitemap.xml
https://toolmomo.com/icon.svg
https://toolmomo.com/manifest.webmanifest
https://toolmomo.com/tools/json-format
```

## 第三方可用性检测

可以用这些工具从不同地区检查网站是否能打开：

```text
https://www.itdog.cn/http/
https://www.17ce.com/
```

## 内容优化建议

- 每个正式工具页都应该有清晰标题和一句话说明。
- 首页保留热门工具、最新工具、全部工具矩阵，方便搜索引擎发现入口。
- 后续新增工具后，需要加入 `data/tools.ts` 和 `data/readyTools.ts`，这样 Sitemap 才会包含已上线工具。
- 工具页说明尽量写真实使用场景，避免只有按钮和输入框。
- 如果网站部署在中国大陆服务器，需按要求完成 ICP 备案；海外服务器则根据业务所在地判断。
