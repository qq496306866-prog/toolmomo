# Toolmomo VPS 部署说明

本目录放服务器部署相关参考文件，适用于 Hostinger VPS、Ubuntu 24.04、Nginx、PM2。

## 文件说明

- `deploy-ubuntu.sh`：首次部署或更新项目时可参考执行的脚本
- `nginx-toolmomo.conf`：Nginx 反向代理配置

## 推荐部署目录

```text
/var/www/toolmomo
```

## 首次部署步骤

### 1. 安装服务器环境

```bash
sudo apt update
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### 2. 上传项目

把本地项目上传到：

```text
/var/www/toolmomo
```

不要上传这些目录：

```text
node_modules
.next
.next-broken-*
```

### 3. 构建并启动

```bash
cd /var/www/toolmomo
npm install
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

### 4. 配置 Nginx

```bash
sudo cp deploy/nginx-toolmomo.conf /etc/nginx/sites-available/toolmomo
sudo ln -s /etc/nginx/sites-available/toolmomo /etc/nginx/sites-enabled/toolmomo
sudo nginx -t
sudo systemctl reload nginx
```

### 5. 配置 HTTPS

域名解析生效后执行：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d toolmomo.com -d www.toolmomo.com
```

## 更新网站

上传新代码后执行：

```bash
cd /var/www/toolmomo
npm install
npm run build
pm2 restart toolmomo
```

## 改用 GitHub 更新

项目已推送到 GitHub 后，推荐把服务器目录改成 Git 仓库，以后不再手动上传 zip。

仓库地址：

```text
https://github.com/qq496306866-prog/toolmomo.git
```

### 首次切换

先备份当前线上目录：

```bash
cd /var/www
mv toolmomo toolmomo-backup-$(date +%Y%m%d%H%M%S)
git clone https://github.com/qq496306866-prog/toolmomo.git toolmomo
cd /var/www/toolmomo
npm install
npm run build
pm2 restart toolmomo
```

如果 `pm2 restart toolmomo` 提示进程不存在，执行：

```bash
pm2 start ecosystem.config.cjs
pm2 save
```

### 后续更新

以后本地推送到 GitHub 后，服务器只需要执行：

```bash
cd /var/www/toolmomo
git pull
npm install
npm run build
pm2 restart toolmomo
```

## 常用排查命令

```bash
pm2 status
pm2 logs toolmomo
sudo nginx -t
sudo systemctl status nginx
curl -I http://127.0.0.1:3000
curl -I http://toolmomo.com
```
