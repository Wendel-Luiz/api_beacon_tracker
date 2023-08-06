import { config } from 'src/config/env.config';
import { Permission } from 'src/modules/auth/enums/permissions.enum';
import { Role } from 'src/modules/auth/enums/roles.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

const permissions = [
  {
    title: 'Create Admin User',
    slug: Permission.CreateAdminUser,
    description: 'Permission to create a admin user.',
  },
  {
    title: 'Create Device',
    slug: Permission.CreateDevice,
    description: 'Permission to create a new device.',
  },
  {
    title: 'Create Device Category',
    slug: Permission.CreateDeviceCategory,
    description: 'Permission to create a new device category.',
  },
  {
    title: 'Create Device Model',
    slug: Permission.CreateDeviceModel,
    description: 'Permission to create a new device model.',
  },
  {
    title: 'Create Device Reading',
    slug: Permission.CreateReading,
    description: 'Permission to create a new device reading.',
  },
  {
    title: 'Get Device Categories',
    slug: Permission.GetCategories,
    description: 'Permission to read device categories.',
  },
  {
    title: 'Get Device By Id',
    slug: Permission.GetDeviceById,
    description: 'Permission to read a device by its id.',
  },
  {
    title: 'Get Models By Category',
    slug: Permission.GetModelsByCategory,
    description: 'Permission to read all models for a single category.',
  },
  {
    title: 'User Add Device',
    slug: Permission.AddDevice,
    description: 'Permission for a user to add a new device.',
  },
  {
    title: 'Get User',
    slug: Permission.GetUser,
    description: 'Permission to read user data.',
  },
  {
    title: 'Delete User',
    slug: Permission.DeleteUser,
    description: 'Permission for a user delete its account.',
  },
  {
    title: 'Update User',
    slug: Permission.UpdateUser,
    description: 'Permission for a user to update its profile.',
  },
  {
    title: 'Get All User Devices',
    slug: Permission.GetAllUserDevices,
    description: 'Permission for a user find all its devices.',
  },
  {
    title: 'Remove User Device',
    slug: Permission.RemoveUserDevice,
    description: 'Permission for a user to remove one of its devices.',
  },
  {
    title: 'Update User Device',
    slug: Permission.UpdateUserDevice,
    description: 'Permission for a user to update one of its devices.',
  },
  {
    title: 'Upload File',
    slug: Permission.UploadFile,
    description: 'Permission to upload a single file.',
  },
];

const roles = [
  {
    title: 'Super Admin',
    slug: Role.SuperAdmin,
    description: 'A super admin role have access to all functionalities.',
    permissions: permissions.map((permission) => permission.slug),
  },
  {
    title: 'Admin',
    slug: Role.Admin,
    description:
      'A admin role have access to all funcionalities, except create other admin users.',
    permissions: permissions
      .filter((permission) => permission.slug !== Permission.CreateAdminUser)
      .map((permission) => permission.slug),
  },
  {
    title: 'Customer',
    slug: Role.Customer,
    description:
      'A customer role have access to all user that is the owner of a device funcionalities',
    permissions: [
      Permission.AddDevice,
      Permission.CreateDevice,
      Permission.GetDeviceById,
      Permission.GetUser,
      Permission.DeleteUser,
      Permission.UpdateUser,
      Permission.GetAllUserDevices,
      Permission.RemoveUserDevice,
      Permission.UpdateUserDevice,
      Permission.UploadFile,
    ],
  },
];

const users = [
  {
    name: 'Super Admin',
    email: 'super_admin@admin.com',
    password: config.super_admin_pswd,
    role: Role.SuperAdmin,
    phone: '5542999082016',
    thumbnail: 'url',
  },
];

export class InitSeed1690249807456 implements MigrationInterface {
  name = 'InitSeed1690249807456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const permission of permissions) {
      await queryRunner.query(
        'INSERT INTO "Permission" ("title", "slug", "description") VALUES ($1, $2, $3)',
        [permission.title, permission.slug, permission.description],
      );
    }

    for (const role of roles) {
      await queryRunner.query(
        'INSERT INTO "Role" ("title", "slug", "description") VALUES ($1, $2, $3)',
        [role.title, role.slug, role.description],
      );
    }

    for (const role of roles) {
      const roleId = (
        await queryRunner.query(
          'SELECT "id" FROM "Role" WHERE "Role"."slug" = $1',
          [role.slug],
        )
      )[0].id;

      for (const permission of permissions) {
        const permissionId = (
          await queryRunner.query(
            'SELECT "id" FROM "Permission" WHERE "Permission"."slug" = $1',
            [permission.slug],
          )
        )[0].id;

        await queryRunner.query(
          'INSERT INTO "RolePermissions" ("permissionId", "roleId") VALUES ($1, $2)',
          [permissionId, roleId],
        );
      }
    }

    for (const user of users) {
      const roleId = (
        await queryRunner.query(
          'SELECT "id" FROM "Role" WHERE "Role"."slug" = $1',
          [user.role],
        )
      )[0].id;

      await queryRunner.query(
        'INSERT INTO "User" ("name", "email", "password", "roleId", "phone", "thumbnail") VALUES ($1, $2, $3, $4, $5, $6)',
        [
          user.name,
          user.email,
          user.password,
          roleId,
          user.phone,
          user.thumbnail,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
