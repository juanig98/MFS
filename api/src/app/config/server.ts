import * as dotenv from "dotenv"; 
dotenv.config();
 
export const server = {
    port: process.env.PORT,
    secretKey: process.env.SECRET_KEY
}