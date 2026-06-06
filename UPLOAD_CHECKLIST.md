# Toolmomo 上传清单

把本地项目上传到 Hostinger VPS 时，建议只上传源码和配置，不上传本地生成目录。

## 推荐方式

在 Windows PowerShell 里执行：

```powershell
.\scripts\package-upload.ps1
```

执行后会在项目根目录生成：

```text
toolmomo-upload.zip
```

把这个 zip 上传到 VPS 的 `/var/www`，然后解压为：

```text
/var/www/toolmomo
```

## 不要上传

这些目录或文件不需要上传：

```text
node_modules
.next
.next-broken-*
tsconfig.tsbuildinfo
*.zip
```

服务器会重新执行：

```bash
npm install
npm run build
```

## VPS 解压示例

```bash
sudo mkdir -p /var/www/toolmomo
sudo unzip toolmomo-upload.zip -d /var/www/toolmomo
cd /var/www/toolmomo
npm install
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

如果是更新已有网站：

```bash
cd /var/www/toolmomo
npm install
npm run build
pm2 restart toolmomo
```
