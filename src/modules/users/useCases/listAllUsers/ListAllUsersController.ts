import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    try {
      if(typeof(user_id) === "string"){ 
        const users = this.listAllUsersUseCase.execute({user_id});

        return response.send(users);
      }

    } catch(e) {
      if (e == "Error: usuário inexistente") {
        return response.status(400).json({ error: "usuário inexistente" });

      } else if (e == "Error: usuário não autorizado") {
        return response.status(400).json({ error: "Error: usuário não autorizado"});
      }
    }
    
  }
}

export { ListAllUsersController };
