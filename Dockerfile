# 1. Base Image
FROM node:20-alpine

# 2. Workspace
WORKDIR /app

# 3. Copy package.json AND yarn.lock
# Copying yarn.lock ensures you get the EXACT same versions as your machine
COPY package.json yarn.lock ./

# 4. Install dependencies using Yarn
# --frozen-lockfile is the yarn equivalent of 'npm ci'. It prevents accidental updates.
RUN yarn install --frozen-lockfile

# 5. Copy source code
COPY . .

# 6. Expose Port
EXPOSE 5173

# 7. Start command
CMD ["yarn", "dev"]