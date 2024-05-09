import { prismaClient } from "../database/prismaClient.js";

export async function receberDados(req, res) {
   const hoje = new Date();
   const primeiroDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
   const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth()+ 1, 0);

   const dadosDosUltimosSeisMeses = [];
   const solicitacoesDosUltimosSeisMeses = []

   for (let i = 5; i >= 0; i--) {
      const primeiroDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() - i + 1, 0);

      const dadosDoMes = await prismaClient.solicitacao.findMany({
         where: {
            criado_em: {
               gte: primeiroDiaDoMes,
               lte: ultimoDiaDoMes,
            },
         },
         include: {
            tipo_pedido: {
               select: {
                  tipo: true
               }
            }
         }
      });

      dadosDosUltimosSeisMeses.push({
         name: primeiroDiaDoMes.toLocaleString('default', { month: 'long' }),
         quantidade: dadosDoMes.length
      });

      solicitacoesDosUltimosSeisMeses.push({
         dados: dadosDoMes,
      })
   }

   try {
      const [solicitacoesDoMesAtual, solicitacoesFinalizadasDoMesAtual, alunos] = await Promise.all([
         prismaClient.solicitacao.findMany({
            where: {
               criado_em: {
                  gte: primeiroDiaDoMes,
                  lte: ultimoDiaDoMes,
               },
            },
         }),
         prismaClient.solicitacao.findMany({
            where: {
               encerrado_em: {
                  gte: primeiroDiaDoMes,
                  lte: ultimoDiaDoMes,
               },
            },
         }),
         prismaClient.aluno.findMany()
      ]);

      const tiposMaisRepetidos = solicitacoesDosUltimosSeisMeses
         .flatMap(mes => mes.dados)
         .reduce((acc, curr) => {
            acc[curr.tipo_pedido.tipo] = (acc[curr.tipo_pedido.tipo] || 0) + 1;
            return acc;
         }, {});

      const tiposOrderandos = Object.entries(tiposMaisRepetidos)
         .sort((a, b) => b[1] - a[1])
         .slice(0, 5)
         .map(([tipo, quantidade]) => ({ name: tipo, quantidade }));

      const dados = {
         solicitacoesMes: solicitacoesDoMesAtual.length,
         solicitacoesFinalizadas: solicitacoesFinalizadasDoMesAtual.length,
         alunos: alunos.length,
         solicitacoesDosSeisMeses: dadosDosUltimosSeisMeses,
         tiposMaisRepetidos: tiposOrderandos
      }

      return res.status(200).send(dados);
   } catch (error) {
      return res.status(400).send({msg: "Algo deu errado, tente novamente", error})
   }
}