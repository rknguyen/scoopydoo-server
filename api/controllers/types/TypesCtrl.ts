import {
  Controller,
  UseAuth,
  MergeParams,
  Get,
  Required,
  Patch,
  PathParams,
  Post,
  BodyParams,
  Delete
} from '@tsed/common';
import { AuthCheck } from '../../middlewares/Guards';
import { Types, ITypeModel } from '../../models/type';
import Error from './TypesCtrl.Erro';

@Controller('/types')
@UseAuth(AuthCheck)
@MergeParams(true)
export class TypesCtrl {
  /**
   * Get all types
   */
  @Get('/')
  async getAllTypes() {
    return await Types.getAllTypes()
      .then(types => ({ data: types }))
      .catch(error => ({ error }));
  }
}

@Controller('/type')
@UseAuth(AuthCheck)
@MergeParams(true)
export class TypeCtrl {
  /**
   * Get type information by id
   * @param id :id of type
   */
  @Get('/:id')
  async findTypeById(@Required() @PathParams('id') id: string) {
    return await Types.findTypeById(id)
      .then((type: ITypeModel | null) => (!!type ? { data: type } : { error: Error.TYPE_NOT_FOUND }))
      .catch(error => ({ error }));
  }

  /**
   * Create new type
   * @param name :name of type
   * @param color :color of type
   */
  @Post('/new')
  async createNewType(
    @Required() @BodyParams('name') name: string,
    @Required() @BodyParams('color') color: string
  ) {
    return await Types.create(name, color)
      .then(type => ({ data: type }))
      .catch(error => ({ error }));
  }

  /**
   * Update name of type
   * @param id :id of type
   * @param name :new name of type
   */
  @Patch('/:id')
  async updateTypeName(
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('name') name: string
  ) {
    return await Types.updateNameById(id, name)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Delete type by id
   * @param id :id of type
   */
  @Delete('/:id')
  async deleteTypeById(@Required() @PathParams('id') id: string) {
    return await Types.deleteById(id)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }
}
