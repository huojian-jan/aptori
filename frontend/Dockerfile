# 使用 Amazon ECR 镜像源
FROM public.ecr.aws/docker/library/node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json（暂时不复制lock文件以免鉴权问题）
COPY package.json ./

# 安装依赖，使用淘宝/阿里云 npm 镜像
RUN npm config set registry https://registry.npmmirror.com
# 强制重新生成lock文件以规避旧lockfile中的鉴权问题
RUN npm install

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动开发服务器
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
