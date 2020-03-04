import Error from './CandidatesCtrl.Erro';
import Action from './CandidatesCtrl.Act';
import {
  Controller,
  Get,
  UseAuth,
  MergeParams,
  Required,
  PathParams,
  Post,
  BodyParams,
  Patch,
  Delete,
  Req
} from '@tsed/common';
import { AuthCheck } from '../../middlewares/Guards';
import { Candidates, ICandidateModel } from '../../models/candidates';
import { Histories } from '../../models/history';
import { Processes } from '../../models/process';
import { Statuses } from '../../models/status';
import { Roles } from '../../models/role';
import { Types } from '../../models/type';
import { Sources } from '../../models/source';
import { Users } from '../../models/user';

/**
 * TODO: Need actions history for each action affects on candidate
 */

async function toDetailAction(act: any): Promise<any> {
  let action = { ...act.toObject() };
  action.actor = await Users.findUserById(action.actorId);
  return action;
}

async function toDetailCandidate(cand: any): Promise<any> {
  let candidate = { ...cand.toObject() };
  if (!!candidate.processId) candidate.process = await Processes.findProcessById(candidate.processId);
  if (!!candidate.statusId) candidate.status = await Statuses.findStatusById(candidate.statusId);
  if (!!candidate.roleId) candidate.role = await Roles.findRoleById(candidate.roleId);
  if (!!candidate.typeId) candidate.type = await Types.findTypeById(candidate.typeId);
  if (!!candidate.sourceId) candidate.source = await Sources.findSourceById(candidate.sourceId);

  /**
   *
   */
  candidate.history = await Histories.findHistoryByCandidateId(candidate._id);
  candidate.history = await Promise.all(candidate.history.map(toDetailAction));
  return candidate;
}

@Controller('/candidates')
@UseAuth(AuthCheck)
@MergeParams(true)
export class CandidatesCtrl {
  /**
   * Get all candidates
   */
  @Get('/')
  async getAllCandidates() {
    return await Candidates.getAllCandidates()
      .then(candidates => Promise.all(candidates.map(toDetailCandidate)))
      .then(candidates => ({ data: candidates }))
      .catch(error => ({ error }));
  }
}

@Controller('/candidate')
@UseAuth(AuthCheck)
@MergeParams(true)
export class CandidateCtrl {
  /**
   * Find candidate by Id
   * @param id :id of candidate
   */
  @Get('/:id')
  async findCandidateById(@Required() @PathParams('id') id: string) {
    return await Candidates.findCandidateById(id)
      .then((candidate: ICandidateModel | null) => (!!candidate ? toDetailCandidate(candidate) : candidate))
      .then((candidate: ICandidateModel | null) =>
        !!candidate ? { data: candidate } : { error: Error.CANDIDATE_NOT_FOUND }
      )
      .catch(error => ({ error }));
  }

  /**
   * Create new candidate
   * @param name :name of candidate
   * @param email :email of candidate
   */
  @Post('/new')
  async createNewCandidate(
    @Required() @BodyParams('name') name: string,
    @Required() @BodyParams('email') email: string
  ) {
    return await Candidates.create(name, email)
      .then(candidate => ({ data: candidate }))
      .catch(error => ({ error }));
  }

  /**
   * Update new candidate name
   * @param id :id of candidate
   * @param name :new name of candidate
   */
  @Patch('/:id/name')
  async updateCandidateName(
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('name') name: string
  ) {
    return await Candidates.updateNameById(id, name)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Update new candidate email
   * @param id :id of candidate
   * @param email :new email of candidate
   */
  @Patch('/:id/email')
  async updateCandidateEmail(
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('email') email: string
  ) {
    return await Candidates.updateEmailById(id, email)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Update new candidate process
   * @param id :id of candidate
   * @param processId :id of process
   */
  @Patch('/:id/process')
  async updateCandidateProcess(
    @Req() request: any,
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('processId') processId: string,
    @Required() @BodyParams('comment') comment: string
  ) {
    return await Candidates.updateProcessById(id, processId)
      .then(() => Histories.create(id, Action.UPDATE_PROCESS, request.user._id, comment))
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Update new candidate process
   * @param id :id of candidate
   * @param processId :id of process
   */
  @Patch('/:id/status')
  async updateCandidateStatus(
    @Req() request: any,
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('statusId') statusId: string,
    @Required() @BodyParams('comment') comment: string
  ) {
    return await Candidates.updateStatusById(id, statusId)
      .then(() => Histories.create(id, Action.UPDATE_STATUS, request.user._id, comment))
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Update new candidate role
   * @param id :id of candidate
   * @param roleId :id of role
   */
  @Patch('/:id/role')
  async updateCandidateRole(
    @Req() request: any,
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('roleId') roleId: string,
    @Required() @BodyParams('comment') comment: string
  ) {
    return await Candidates.updateRoleById(id, roleId)
      .then(() => Histories.create(id, Action.UPDATE_ROLE, request.user._id, comment))
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Update new candidate type
   * @param id :id of candidate
   * @param typeId :id of type
   */
  @Patch('/:id/type')
  async updateCandidateType(
    @Req() request: any,
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('typeId') typeId: string,
    @Required() @BodyParams('comment') comment: string
  ) {
    return await Candidates.updateTypeById(id, typeId)
      .then(() => Histories.create(id, Action.UPDATE_TYPE, request.user._id, comment))
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Update new candidate source
   * @param id :id of candidate
   * @param sourceId :id of source
   */
  @Patch('/:id/source')
  async updateCandidateSource(
    @Req() request: any,
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('sourceId') sourceId: string,
    @Required() @BodyParams('comment') comment: string
  ) {
    return await Candidates.updateSourceById(id, sourceId)
      .then(() => Histories.create(id, Action.UPDATE_SOURCE, request.user._id, comment))
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Update new candidate BTSId
   * @param id :id of candidate
   * @param BTSId :id of BTS
   */
  @Patch('/:id/bts')
  async updateBTSSource(
    @Req() request: any,
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('BTSId') BTSId: string,
    @Required() @BodyParams('comment') comment: string
  ) {
    return await Candidates.updateBTSIdById(id, BTSId)
      .then(() => Histories.create(id, Action.UPDATE_BTSID, request.user._id, comment))
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Update new candidate schedule
   * @param id :id of candidate
   * @param scheduledTime :new schedule
   */
  @Patch('/:id/schedule')
  async updateCandidateSchedule(
    @Req() request: any,
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('scheduledTime') scheduledTime: number,
    @Required() @BodyParams('comment') comment: string
  ) {
    return await Candidates.updatescheduledTimeById(id, scheduledTime)
      .then(() => Histories.create(id, Action.UPDATE_SCHEDULE, request.user._id, comment))
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Delete candidate by id
   * @param id :id of candidate
   */
  @Delete('/:id')
  async deleteCandidateById(@Required() @PathParams('id') id: string) {
    return await Candidates.deleteById(id)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }
}
