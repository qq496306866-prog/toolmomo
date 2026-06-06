# Toolmomo 免费中文在线工具箱

Toolmomo 是一个基于 Next.js App Router、TypeScript 和 Tailwind CSS 开发的中文在线工具网站。

当前已包含首页、工具列表页、多个可用工具页面、基础说明页面、`robots.txt` 和 `sitemap.xml`。

## 本地预览

```bash
npm install
npm run dev
```

打开：

```text
http://localhost:3000
```

如果本地开发缓存异常，可以关闭终端后运行：

```bat
start-preview.bat
```

## 常用命令

```bash
npm run dev
npm run build
npm run start
npx tsc --noEmit --pretty false
```

## 打包上传

在 Windows PowerShell 中执行：

```powershell
.\scripts\package-upload.ps1
```

脚本会生成 `toolmomo-upload.zip`，并自动排除 `node_modules`、`.next`、`.next-broken-*` 等本地生成目录。

上传细节见：

```text
UPLOAD_CHECKLIST.md
```

## SEO 收录

上线后建议提交 Sitemap 给搜索引擎：

```text
https://toolmomo.com/sitemap.xml
```

详细清单见：

```text
SEO_CHECKLIST.md
```

## 服务器部署思路

Hostinger VPS 推荐使用：

- Ubuntu 24.04
- Node.js LTS
- PM2 管理 Next.js 进程
- Nginx 做反向代理
- SSL 证书使用 Certbot

更完整的服务器操作说明见：

```text
deploy/README.md
```

项目 GitHub 仓库：

```text
https://github.com/qq496306866-prog/toolmomo.git
```

### 1. 安装基础环境

```bash
sudo apt update
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### 2. 上传或拉取项目

把项目放到服务器，例如：

```text
/var/www/toolmomo
```

不要上传 `node_modules`、`.next`、`.next-broken-*` 这类本地生成目录。

进入项目目录后执行：

```bash
npm install
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### 3. 配置 Nginx

参考文件：

```text
deploy/nginx-toolmomo.conf
```

复制到：

```bash
/etc/nginx/sites-available/toolmomo
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/toolmomo /etc/nginx/sites-enabled/toolmomo
sudo nginx -t
sudo systemctl reload nginx
```

### 4. 配置域名解析

在域名 DNS 里添加：

```text
A 记录：@ 指向 VPS IP
A 记录：www 指向 VPS IP
```

你的 VPS IP 以 Hostinger 后台显示为准。

### 5. 配置 HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d toolmomo.com -d www.toolmomo.com
```

## 目录说明

- `app/`：Next.js App Router 页面
- `components/home/`：首页与站点公共组件
- `components/tools/`：工具页面组件
- `components/site/`：站点说明页组件
- `data/tools.ts`：工具分类和工具列表配置
- `data/readyTools.ts`：已完成工具路径配置
- `deploy/`：服务器部署参考配置
