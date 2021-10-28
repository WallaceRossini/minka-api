import { Request, Response } from "express";
import { TagService } from "../services/TagService";


export class TagController {

  async index(request: Request, response: Response) {

    const tag_service = new TagService();

    const result = await tag_service.index()

    if (result instanceof Error)
      throw new Error(result.message)

    return response.status(200).json(result)
  }

  async show(request: Request, response: Response) {

    const { id } = request.params;

    const tag_service = new TagService();

    const result = await tag_service.show({ id })

    if (result instanceof Error)
      throw new Error(result.message)

    return response.status(200).json(result)
  }

  async create(request: Request, response: Response) {

    const { name } = request.body;

    const tag_service = new TagService();

    const result = await tag_service.create({ name })

    if (result instanceof Error)
      throw new Error(result.message)

    return response.status(201).json(result)
  }

  async update(request: Request, response: Response) {

    const { name } = request.body;
    const { id } = request.params;

    const tag_service = new TagService();

    const result = await tag_service.update({ id, name })

    if (result instanceof Error)
      throw new Error(result.message)

    return response.status(200).json(result)
  }

  async delete(request: Request, response: Response) {

    const { id } = request.params;

    const tag_service = new TagService();

    const result = await tag_service.delete({ id })

    if (result instanceof Error)
      throw new Error(result.message)

    return response.status(200).json(result)
  }

}