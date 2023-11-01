import { Tweet as TweetPrisma } from "@prisma/client";
import repository from "../database/prisma.connection";
import { CriarTweetDTO, ResponseDTO, TipoTweetDTO } from "../dtos";
import { Tweet } from "../models";

export class TweetService {
  public async criarTweet(dados: CriarTweetDTO): Promise<ResponseDTO> {
    const usuarioExiste = await repository.tweet.findUnique({
      where: { idUsuario: dados.idUsuario },
    });

    if (!usuarioExiste) {
      return {
        code: 400,
        ok: false,
        mensagem: "ID de usuário inválido!",
      };
    }

    const tweetDB = await repository.tweet.create({
      data: {
        conteudo: dados.conteudo,
        tipo: dados.tipo,
        idUsuario: dados.idUsuario,
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Tuitado com sucesso!",
      dados: this.mapToModel(tweetDB),
    };
  }

  public async listarTodos(user: string | undefined): Promise<ResponseDTO> {
    const tweets = await repository.tweet.findMany({
      where: { idUsuario: user },
    });

    if (!tweets.length) {
      return {
        code: 404,
        ok: false,
        mensagem: "Não foram encontrados tweets",
      };
    }
    const tweetsComLikes = [];
    for (const tweet of tweets) {
      const totalLikes = await repository.like.count({
        where: { idTweet: tweet.id },
      });
      const tweetComCount = { ...tweet, totalLikes };
      tweetsComLikes.push(tweetComCount);
    }

    return {
      code: 200,
      ok: true,
      mensagem: "Tweets listados com sucesso",
      dados: tweetsComLikes,
    };
  }

  public async listarPorId(id: string): Promise<ResponseDTO> {
    const tweetEcontrado = await repository.tweet.findFirst({
      where: { id },
    });

    if (!tweetEcontrado) {
      return {
        code: 404,
        ok: false,
        mensagem: "Nenhum tweet encontrado",
      };
    }

    return {
      code: 200,
      ok: true,
      mensagem: "Tweet encontrado com sucesso",
      dados: this.mapToModel(tweetEcontrado),
    };
  }

  private mapToModel(tweet: TweetPrisma): Tweet {
    return new Tweet(
      tweet.id,
      tweet.conteudo,
      tweet.tipo as TipoTweetDTO,
      tweet.idUsuario
    );
  }
}
