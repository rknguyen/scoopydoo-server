import Error from './ProcessesCtrl.Erro';
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
import { Processes, IProcessModel } from '../../models/process';

@Controller('/processes')
@UseAuth(AuthCheck)
@MergeParams(true)
export class ProcessesCtrl {
  /**
   * Get all processes
   */
  @Get('/')
  async getAllProcesses() {
    return await Processes.getAllProcesses()
      .then(processes => ({ data: processes }))
      .catch(error => ({ error }));
  }
}

@Controller('/process')
@UseAuth(AuthCheck)
@MergeParams(true)
export class ProcessCtrl {
  /**
   * Find process by id
   * @param id :id of process
   */
  @Get('/:id')
  async findProcessById(@Required() @PathParams('id') id: string) {
    return await Processes.findProcessById(id)
      .then((process: IProcessModel | null) => (!!process ? process : { error: Error.PROCESS_NOT_FOUND }))
      .catch(error => ({ error }));
  }

  /**
   * Create new process
   * @param name :name of process
   * @param color :color of process
   */
  @Post('/new')
  async createNewProcess(
    @Required() @BodyParams('name') name: string,
    @Required() @BodyParams('color') color: string
  ) {
    return await Processes.create(name, color)
      .then(process => ({ data: process }))
      .catch(error => ({ error }));
  }

  /**
   * Update name of process
   * @param id :id of process
   * @param name :name of process
   */
  @Patch('/:id')
  async updateProcessName(
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('name') name: string
  ) {
    return await Processes.updateNameById(id, name)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Delete process by id
   * @param id :id of process
   */
  @Delete('/:id')
  async deleteProcessByid(@Required() @PathParams('id') id: string) {
    return await Processes.deleteById(id)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }
}
