FROM node:21

WORKDIR /evildev-project-front/

COPY public/ /evildev-project-front/public
COPY src/ /evildev-project-front/src
COPY package.json /evildev-project-front/

RUN npm install
CMD ["npm", "start"]
