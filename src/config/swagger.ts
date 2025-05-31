import swaggerJSDoc  from "swagger-jsdoc";
import router from "../router";
import { SwaggerUiOptions } from 'swagger-ui-express'

const options : swaggerJSDoc.Options ={
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info:{
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis:['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions ={
    customCss : `
        .topbar-wrapper .link {
            content: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMdXd7vIlg7sc7Iia0qTcjm0l1g0aw4IKU0A&s');
            height: 80px;
             width: auto;
        }
        .swagger-ui .topbar {
            background-color: #2b3b45
        }
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript'
}
export default swaggerSpec
export {
    swaggerUiOptions
}