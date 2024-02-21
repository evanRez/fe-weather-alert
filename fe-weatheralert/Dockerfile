FROM node:20.10.0 as build

ENV VITE_OPEN_WEATHER_API_KEY=81df09742bb3445937c58d2869759c40

WORKDIR /app

COPY package.json .
RUN npm install
RUN apt-get update
RUN apt install xdg-utils -y

COPY . .

RUN npm cache clean --force 
RUN rm package-lock.json
RUN rm -r node_modules
RUN npm install




RUN npm run build
# CMD ["npm", "run", "build"]


FROM nginx:stable-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]