import { getCustomRepository, Repository } from "typeorm";
import { InvoiceDto } from "../dto/InvoiceDto";
import { Invoice } from "../entities/Invoice";
import { Tag } from "../entities/Tag";
import { CreateInvoiceIFC, UpdateInvoiceIFC } from "../interfaces/InvoicesInterface";
import { InvoiceRepository } from "../repositories/InvoiceRepository";
import { TagRepository } from "../repositories/TagRepository";

type InvoiceId = {
  id: string;
}

export class InvoiceService {

  private invoice_service: Repository<Invoice>
  private tag_service: Repository<Tag>

  constructor() {
    this.invoice_service = getCustomRepository(InvoiceRepository)
    this.tag_service = getCustomRepository(TagRepository)
  }

  async index(): Promise<InvoiceDto[]> {

    const invoices = await this.invoice_service.find({ relations: ['tag'] });

    const all_invoices = [];

    invoices.forEach(item => all_invoices.push(new InvoiceDto(item)))

    return all_invoices;

  }

  async show({ id }: InvoiceId): Promise<InvoiceDto | Error> {

    const exist_invoice = await this.invoice_service.findOne(id, { relations: ["tag"] });

    if (!exist_invoice)
      return new Error('Invoice does not exists')

    const object = new InvoiceDto(exist_invoice)

    return object

  }

  async create({ description, due_date, value, paid = false, tag_id }: CreateInvoiceIFC): Promise<InvoiceDto | Error> {

    const exist_tag = await this.tag_service.findOne(tag_id);

    if (!exist_tag)
      return new Error('Tag does not exists');

    const invoice = this.invoice_service.create({ description, due_date, value, paid, tag: exist_tag });

    await this.invoice_service.save(invoice)

    const object = new InvoiceDto(invoice)

    return object;

  }

  async update(id: string, invoice: UpdateInvoiceIFC) {

    const exist_invoice = await this.invoice_service.findOne(id, { relations: ["tag"] });

    if (!exist_invoice)
      return new Error('Invoice does not exists');


    exist_invoice.tag = invoice.tag_id 
    ? await this.tag_service.findOne({ where: { id: invoice.tag_id } }) 
    : exist_invoice.tag

    for (let property in exist_invoice) {
      if (invoice[property] !== undefined) {
        if (exist_invoice[property] !== invoice[property]) {
          exist_invoice[property] = invoice[property]
        }
      }
    }

    await this.invoice_service.save(exist_invoice);

    const object = new InvoiceDto(exist_invoice)

    return object;

  }

  async delete({ id }: InvoiceId): Promise<InvoiceDto | Error> {

    const exist_invoice = await this.invoice_service.findOne(id, { relations: ['tag'] });

    if (!exist_invoice)
      return new Error('Invoice does not exists');

    await this.invoice_service.remove(exist_invoice);

    const object = new InvoiceDto(exist_invoice)

    return object;

  }
}