import { Request, Response, NextFunction } from "express";

export const validateSerializerMiddleware =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      // bloco try/catch para capturar erros específicos do yup
      try {
        // chamando o método validate
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          // exclui as chaves que não estão no schema
          stripUnknown: true,
        });

        const values = Object.values(validatedData);
        if (values.length <= 1) {
          return res.status(401).json({ message: "Body vazio" });
        }

        // adicionamos uma nova chave a requisição, com os dados validados do usuario
        // precisamos adicionar ao Request, o tipo da chave que estamos adicionando aqui no middleware.
        // Na pasta @types/express, no arquivo index.d.ts, vamos adicionar a chave a tipagem do express:
        req.validatedBody = validatedData;

        next();
      } catch (err: any) {
        // caso algum erro do yup aconteca,
        // ele vai ser tratado e enviado ao usuario
        return res.status(400).json({
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
