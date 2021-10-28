import { getCustomRepository, Repository } from "typeorm";
import { Tag } from "../entities/Tag";
import { TagRepository } from "../repositories/TagRepository";

type TagCreate = {
  name: string;
}

type TagUpdate = {
  id: string;
  name: string;
}

type TagId = {
  id: string;
}

export class TagService {

  private tag_repository: Repository<Tag>

  constructor() {
    this.tag_repository = getCustomRepository(TagRepository)
  }

  async index(): Promise<Tag[]> {

    const tags = await this.tag_repository.find();

    return tags;
  }

  async show({ id }: TagId): Promise<Tag | Error> {

    const exist_tag = await this.tag_repository.findOne({ id });

    if (!exist_tag)
      return new Error('Tag does not exists')

    return exist_tag;
  }

  async create({ name }: TagCreate): Promise<Tag | Error> {

    name = name.toUpperCase();

    const exist_tag = await this.tag_repository.findOne({ name });

    if (exist_tag)
      return new Error('Tag already exists');

    const tag = this.tag_repository.create({ name });

    await this.tag_repository.save(tag)

    return tag;

  }

  async update({ id, name }: TagUpdate): Promise<Tag | Error> {

    name = name.toUpperCase();

    const tag = await this.tag_repository.findOne({ id });

    if (!tag)
      return new Error('Tag does not exists')

    tag.name = name

    await this.tag_repository.save(tag)

    return tag;

  }

  async delete({ id }: TagId): Promise<Tag | Error> {

    const exist_tag = await this.tag_repository.findOne({ id });

    if (!exist_tag)
      return new Error('Tag does not exists')

    await this.tag_repository.remove(exist_tag)

    return exist_tag;

  }

}