import Error from './StatusesCtrl.Erro';
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
import { Statuses, IStatusModel } from '../../models/status';

@Controller('/statuses')
@UseAuth(AuthCheck)
@MergeParams(true)
export class StatusesCtrl {
  /**
   * Get all statuses
   */
  @Get('/')
  async getAllStatuses() {
    return await Statuses.getAllStatuses()
      .then(statuses => ({ data: statuses }))
      .catch(error => error);
  }
}

@Controller('/status')
@UseAuth(AuthCheck)
@MergeParams(true)
export class StatusCtrl {
  /**
   * Find status by Id
   * @param id :id of status
   */
  @Get('/:id')
  async findStatusById(@Required() @PathParams('id') id: string) {
    return await Statuses.findStatusById(id)
      .then((status: IStatusModel | null) => (!!status ? status : { error: Error.STATUS_NOT_FOUND }))
      .catch(error => ({ error }));
  }

  /**
   * Create new status
   * @param name :name of status
   * @param color :color of status
   */
  @Post('/new')
  async createNewStatus(
    @Required() @BodyParams('name') name: string,
    @Required() @BodyParams('color') color: string
  ) {
    return await Statuses.create(name, color)
      .then(status => ({ data: status }))
      .catch(error => ({ error }));
  }

  /**
   * Update new status name
   * @param id :id of status
   * @param name :new name of status
   */
  @Patch('/:id')
  async updateStatusName(
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('name') name: string
  ) {
    return Statuses.updateNameById(id, name)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Delete status by id
   * @param id :id of status
   */
  @Delete('/:id')
  async deleteStatusById(@Required() @PathParams('id') id: string) {
    return Statuses.deleteById(id)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }
}
