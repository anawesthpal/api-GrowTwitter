import { Router } from "express";
import { UsuarioController } from "../controllers";
import { CadastroUsuario, Login } from "../middlewares";


export function usuariosRoutes() {
    const router = Router()
    const cadastrarUsuario = new CadastroUsuario()
    const controller = new UsuarioController()
    const login = new Login()

    router.post('/', [cadastrarUsuario.validar], controller.criar) //criar usuários
    router.post('/login', [login.validar], controller.login) // login de usuários

    return router
}