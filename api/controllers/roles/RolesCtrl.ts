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
import { Roles, IRoleModel } from '../../models/role';
import Error from './RolesCtrl.Erro';

@Controller('/roles')
@UseAuth(AuthCheck)
@MergeParams(true)
export class RolesCtrl {
  /**
   * Get all roles
   */
  @Get('/')
  async getAllRoles() {
    return await Roles.getAllRoles()
      .then(roles => ({ data: roles }))
      .catch(error => ({ error }));
  }
}

@Controller('/role')
@UseAuth(AuthCheck)
@MergeParams(true)
export class RoleCtrl {
  /**
   * Get role information
   */
  @Get('/:id')
  async findRoleById(@Required() @PathParams('id') id: string) {
    return await Roles.findRoleById(id)
      .then((role: IRoleModel | null) => (!!role ? { data: role } : { error: Error.ROLE_NOT_FOUND }))
      .catch(error => ({ error }));
  }

  /**
   * Create new role
   */
  @Post('/new')
  async createNewRole(@Required() @BodyParams('name') name: string) {
    return await Roles.create(name)
      .then(role => ({ data: role }))
      .catch(error => ({ error }));
  }

  /**
   * Update role information
   * @param id :id of role
   */
  @Patch('/:id')
  async updateRoleName(
    @Required() @PathParams('id') id: string,
    @Required() @BodyParams('name') name: string
  ) {
    return await Roles.updateNameById(id, name)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }

  /**
   * Delete role
   * @param id :id of role
   */
  @Delete('/:id')
  async deleteRole(@Required() @PathParams('id') id: string) {
    return await Roles.deleteById(id)
      .then(() => ({ success: true }))
      .catch(error => ({ error }));
  }
}
