import { Like as LikePrisma } from "@prisma/client";
import repository from "../database/prisma.connection";
import { DarLikeDTO, ResponseDTO } from "../dtos";
import { DeletarLikeDTO } from "../dtos/deletar-like.dto";
import { Like } from "../models";

export class LikeService {
  public async darLike(dados: DarLikeDTO): Promise<ResponseDTO> {
    const valido = await repository.like.findFirst({
      where: {
        AND: [{ usernameUsuario: dados.username }, { idTweet: dados.idTweet }],
      },
    });

    if (!valido) {
      return {
        code: 400,
        ok: false,
        mensagem: "Username e/ou ID de tweet inválido",
      };
    }

    const likeExiste = await repository.like.findFirst({
      where: {
        usernameUsuario: dados.username,
        idTweet: dados.idTweet,
      },
    });

    if (likeExiste) {
        return {
        code: 400,
        ok: false,
        mensagem: "Registro de Like Já Existe",
        };
    }

    const likeDB = await repository.like.create({
      data: {
        usernameUsuario: dados.username,
        idTweet: dados.idTweet,
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Like dado com sucesso!",
      dados: this.mapToModel(likeDB),
    };
  }

  public async deletar(dados: DeletarLikeDTO): Promise<ResponseDTO> {
    const likeExcluido = await repository.like.delete({
      where: {
        usernameUsuario: dados.username,
        idTweet: dados.idTweet,
      },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "Like excluído com sucesso",
      dados: this.mapToModel(likeExcluido),
    };
  }

  private mapToModel(like: LikePrisma): Like {
    return new Like(like.id, like.usernameUsuario, like.idTweet);
  }
}
