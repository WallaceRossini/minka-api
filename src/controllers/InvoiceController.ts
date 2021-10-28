import { Request, Response } from "express";
import { CreateInvoiceIFC, UpdateInvoiceIFC } from "../interfaces/InvoicesInterface";
import { InvoiceService } from "../services/InvoiceService";

export class InvoiceController {

  async index(request: Request, response: Response) {

    const invoice_service = new InvoiceService();

    const result = await invoice_service.index();

    if (result instanceof Error)
      throw new Error(result.message);

    return response.status(200).json(result);

  }

  async show(request: Request, response: Response) {

    const { id } = request.params;

    const invoice_service = new InvoiceService();

    const result = await invoice_service.show({ id });

    if (result instanceof Error)
      throw new Error(result.message);

    return response.status(200).json(result);
  }

  async create(request: Request, response: Response) {

    const { description, due_date, value, paid, tag_id }: CreateInvoiceIFC = request.body;

    const invoice_service = new InvoiceService();

    const result = await invoice_service.create({ description, due_date, value, paid, tag_id });

    if (result instanceof Error)
      throw new Error(result.message);

    return response.status(201).json(result);
  }

  async update(request: Request, response: Response) {

    const { id } = request.params;
    const invoice: UpdateInvoiceIFC = request.body;

    const invoice_service = new InvoiceService();

    const result = await invoice_service.update(id, invoice);

    if (result instanceof Error)
      throw new Error(result.message);

    return response.status(200).json(result);
  }

  async delete(request: Request, response: Response) {

    const { id } = request.params;

    const invoice_service = new InvoiceService();

    const result = await invoice_service.delete({ id });

    if (result instanceof Error)
      throw new Error(result.message);

    return response.status(200).json(result);
  }
}