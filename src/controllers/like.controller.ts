import { Request, Response } from "express";
import { LikeService } from "../services";

export class LikeController {
  public async darLike(req: Request, res: Response) {
    const { username, idTweet } = req.body;

    try {
      const service = new LikeService();
      const response = await service.darLike({
        idTweet: idTweet,
        username: username,
      });

      return res.status(response.code).json(response);
    } catch (error:any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString(),
      });
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const { idTweet } = req.params;

      const service = new LikeService();
      const response = await service.deletar({ username, idTweet });

      return res.status(response.code).json(response);
    } catch (error:any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString(),
      });
    }
  }
}
