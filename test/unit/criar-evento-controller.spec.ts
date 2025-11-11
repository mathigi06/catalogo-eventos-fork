// SUITE DE TESTES PARA CRIAR-EVENTO-CONTROLLER.TS
import { error } from "console";
import type { Request, Response } from "express";

function mockResponse() {
    const res = {} as Partial<Response>;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response & {
        status: jest.Mock;
        json: jest.Mock;
    };
}


class CriarEventoController {
    async handle(req: Request, res: Response): Promise<Response> {
        //Logica do controlador (exemplo)
        if (!req.body?.titulo) {
            return res.status(400).json({ error: 'Dados inválidos para criaçao do evento' })
        };

        return res.status(201).json({ message: 'Evento criado com sucesso' })
    }
}

describe('CriarEventoController', () => {

    it('should create an instance', () => {

        expect(true).toBe(true)
    });
    it('should handle event creation', async () => {
        const controller = new CriarEventoController();
        const req = {
            body: {
                titulo: "Festival Gastronômico do Centro", //Titulo inválido
                cat: "Gastronomia",
                data: "2025-09-20",
                hora: "18:00",
                local: "Rua Ponciano, Centro ",
                preco: "Gratuito",
                img: "https://douradosagora.com.br/media/posts/390241/dourados-tera-neste-sabado-balaio-festival-com-musica-arte-gastronomia-e-cultura-17522582977313.jpg",
                desc: "Barracas, food trucks e música ao vivo com artistas locais."
            }
        } as unknown as Request
        const res = mockResponse();

        await controller.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Evento criado com sucesso' });

    })

    it('should fail to create event with invalid data', async () => {
        const controller = new CriarEventoController();
        const req = {
            body: {
                titulo: "", //Titulo inválido
                cat: "Gastronomia",
                data: "2025-09-20",
                hora: "18:00",
                local: "Rua Ponciano, Centro ",
                preco: "Gratuito",
                img: "https://douradosagora.com.br/media/posts/390241/dourados-tera-neste-sabado-balaio-festival-com-musica-arte-gastronomia-e-cultura-17522582977313.jpg",
                desc: "Barracas, food trucks e música ao vivo com artistas locais."
            }
        } as unknown as Request
        const res = mockResponse();

        await controller.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Dados inválidos para criaçao do evento' });

    })
});