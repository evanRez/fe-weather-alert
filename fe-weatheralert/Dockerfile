FROM node:20.10.0

ENV VITE_OPEN_WEATHER_API_KEY=81df09742bb3445937c58d2869759c40
ENV VITE_API_NINJA_CITY_KEY=Lfs2kGC0lXnLUd2n9xHylBlnF1GrbtBjWEVGXEqL

WORKDIR /app

COPY package.json .
RUN npm install
RUN apt-get update
RUN apt install xdg-utils -y

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--debug"]