import { Document, Model, FilterQuery, UpdateQuery, PopulateOptions } from 'mongoose';

export abstract class EntityRepository<T extends Document> {

  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this.entityModel.findOne(filterQuery, projection).exec();
  }

  async findById(
    id: string,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this.entityModel.findById(id, projection).exec();
  }

  async find(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T[] | null> {
    return this.entityModel.find(filterQuery, projection).exec();
  }

  async create(entityData: unknown): Promise<T> {
    return this.entityModel.create(entityData);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(filterQuery, updateQuery, { new: true }).exec();
  }

  async findByIdAndUpdate(
    id: string,
    updateQuery: UpdateQuery<T>
  ): Promise<T | null> {
    return this.entityModel.findByIdAndUpdate(id, updateQuery, { new: true }).exec();
  }

  async update(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>
  ): Promise<unknown> {
    return this.entityModel.update(filterQuery, updateQuery).exec();
  }

  async updateOne(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>
  ): Promise<unknown> {
    return this.entityModel.updateOne(filterQuery, updateQuery).exec();
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T | null> {
    return this.entityModel.findOneAndDelete(filterQuery).exec();
  }

  async findByIdAndDelete(id: string): Promise<T | null> {
    return this.entityModel.findByIdAndDelete(id).exec();
  }

  async deleteOne(filterQuery: FilterQuery<T>): Promise<unknown> {
    return this.entityModel.deleteOne(filterQuery).exec();
  }

  async populate(docs: T, populateOptions: PopulateOptions): Promise<T> {
    return this.entityModel.populate(docs, populateOptions);
  }

}
