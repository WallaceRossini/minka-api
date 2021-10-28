import { getCustomRepository, Repository } from "typeorm"
import { InvoiceDto } from "../dto/InvoiceDto"
import { Invoice } from "../entities/Invoice"
import { Tag } from "../entities/Tag"
import { InvoiceRepository } from "../repositories/InvoiceRepository"
import { TagRepository } from "../repositories/TagRepository"


export class DetailService {

  private invoice_service: Repository<Invoice>
  private tag_service: Repository<Tag>

  constructor() {
    this.invoice_service = getCustomRepository(InvoiceRepository)
    this.tag_service = getCustomRepository(TagRepository)
  }

  async index() {

    const invoices = await this.invoice_service.find({ where: { paid: false } })

    const arr_objects = [];

    invoices.forEach(item => arr_objects.push(new InvoiceDto(item)))

    return arr_objects;

  }

}