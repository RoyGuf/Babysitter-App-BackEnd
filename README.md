
# Babysitter-Service-App - Back End

The server side of the **Babaysitter-Service-App**, runs on port 8080 by default.

## Installation
When the ```./dist``` folder exists, the server side will also serve the client side on the same PORT.
#### Environment Variables

To run this project, you will need to add the following environment variables to your ```.env``` file.

| Keys | Description |
| ------ | ------ |
| `STAGING_MONGO_PASSWORD` | MongoDB user password |
| `STAGING_MONGO_USERNAME` | MongoDB user name |
| `STAGING_MONGO_DB_NAME` | MongoDB database name |
| `STAGING_MONGO_CLUSTER_HOSTNAME` | MongoDB cluster hostname |
| `JWT_SECRET` | Personal secret string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_SECRET` | Cloudinary api secret |
| `CLOUDINARY_API_KEY` | Cloudinary api key |

#### Run Locally

Clone the project

```bash
  git clone https://github.com/RoyGuf/Babaysitter-App-BackEnd.git
```

Go to the project directory

```bash
  cd Babaysitter-App-BackEnd
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/roy-mizrahi-aa5450156//)

## License

[MIT](https://choosealicense.com/licenses/mit/)


[Vite]: <https://vitejs.dev/>
[JsonWebToken]: <https://www.npmjs.com/package/jsonwebtoken>
[Cloudinary]: <https://cloudinary.com/>
[node.js]: <http://nodejs.org>
[TailwindCSS]: <https://tailwindcss.com/>
[MongoDB]: <https://www.mongodb.com/atlas/>
[@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
[express]: <http://expressjs.com>
[VueJS]: <https://vuejs.org/>
[Back-end]: <https://github.com/RoyGuf/Babaysitter-App-BackEnd>
[Front-end]: <https://github.com/RoyGuf/Baby-Sitter-App/tree/main/vuejs-babysitter-app-FrontEnd>