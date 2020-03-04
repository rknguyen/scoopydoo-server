import {
  Controller,
  UseAuth,
  MergeParams,
  Get,
  Required,
  PathParams,
  Post,
  BodyParams,
  Patch,
  Delete
} from '@tsed/common';
import { AuthCheck } from '../../middlewares/Guards';
import { Sources, ISourceModel } from '../../models/source';
import Error from './SourcesCtrl.Erro';

@Controller('/sources')
@UseAuth(AuthCheck)
@MergeParams(true)
export class SourcesCtrl {
  /**
   * Get all sources
   */
  @Get('/')
  async getAllSources() {
    return await Sources.getAllSources()
      .then(sources => ({ data: sources }))
      .catch(error => ({ error }));
  }
}

@Controller('/source')
@UseAuth(AuthCheck)
@MergeParams(true)
export class SourceCtrl {
  /**
   * Get source infomation by source id
   * @param id :id of source
   */
  @Get('/:id')
  async findSourceById(@Required() @PathParams('id') id: string) {
    return Sources.findSourceById(id)
      .then((source: ISourceModel | null) =>
        !!source ? { data: source } : { error: Error.SOURCE_NOT_FOUND }
      )
      .catch(error => ({ error }));
  }

  /**
   * Create new source
   * @param name :name of source
   * @param color :color of source tag
   */
  @Post('/new')
  async createNewSource(
    @Required() @BodyParams('name') name: string,
    @Required() @BodyParams('color') color: string
  ) {
    return Sources.create(name, color)
      .then(source => ({ data: source }))
      .catch(error => ({ error }));
  }

  /**
   * Update name of source
   * @param id :id of source
   * @param name :new source name
   */
  @Patch('/:id')
  async updateSourceName(
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('name') name: string
  ) {
    return Sources.updateNameById(id, name)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Delete source by id
   * @param id :if of source
   */
  @Delete('/:id')
  async deleteSourceById(@Required() @PathParams('id') id: string) {
    return Sources.deleteById(id)
      .then(() => ({ sucess: true }))
      .catch(error => ({ error }));
  }
}
