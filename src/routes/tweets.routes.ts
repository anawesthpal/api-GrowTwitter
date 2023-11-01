import { Router } from "express"
import { TweetController } from "../controllers"
import { Auth, CriarTweet } from "../middlewares"

export function tweetsRoutes() {
    const router = Router()
    const auth = new Auth()
    const criarTweet = new CriarTweet()
    const controller = new TweetController()

    router.post('/', [auth.validar, criarTweet.validar], controller.criar) 
    
    router.get('/', [auth.validar], controller.criar)
    
    return router
}