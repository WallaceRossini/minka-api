export class TagDto {

  public id: string;
  public name: string;

  constructor({ id, name }) {

    this.id = id
    this.name = name
    
  }
}