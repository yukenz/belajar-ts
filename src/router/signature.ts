import {IRouter, Request, Response} from "express-serve-static-core";
import {Router} from "express";
import axios, {AxiosHeaders, AxiosResponse} from "axios";
import {KEYUTIL, RSAKey} from "jsrsasign";


const router: Router = Router();
const urlForAccess: string = "https://jsonplaceholder.typicode.com/users?_limit=2";


router.get('/', function (_request, res: Response,) {


    const headers: AxiosHeaders = new AxiosHeaders({
            ["Authorization"]: `Bearer ${process.env.JWT_TOKEN}`,
            ["Accept"]: "application/json",
            ["Content-Type"]: "application/json"
        }
    )


    const keypair = KEYUTIL.generateKeypair("RSA", 2048);
    const privateKey: RSAKey = keypair.prvKeyObj;
    const publicKey: RSAKey = keypair.pubKeyObj;


    //
    // axios.create({headers})
    //     .get(urlForAccess)
    //     .then((response: AxiosResponse) => {
    //
    //         const status: number = response.status;
    //         const statusText: string = response.statusText;
    //         const data: {} = response.data;
    //
    //         res.status(status).json(data);
    //
    //     }, null);


    // const privateKeyPem = KEYUTIL.getPEM(privateKey, "PKCS8PRV");


    const priv = KEYUTIL.getPEM(privateKey, "PKCS8PRV")
    const pub = KEYUTIL.getPEM(publicKey)

    res.json({priv, pub})

})
;

async function tryAsync(): Promise<string> {

    await new Promise(resolve => setTimeout(resolve, 10000));
    return "Hello"
}

export default router;
