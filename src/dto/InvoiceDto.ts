import { TagDto } from "./TagDto";

export class InvoiceDto {

  public id: string;
  public description: string;
  public due_date: string;
  public value: number;
  public paid: boolean;
  public tag?: TagDto;

  constructor({ id, description, due_date, value, paid, tag }) {

    this.id = id
    this.description = description
    this.due_date = due_date
    this.value = value
    this.paid = paid
    this.tag = new TagDto(tag)

  }
}