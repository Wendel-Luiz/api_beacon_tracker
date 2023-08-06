import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1690116051460 implements MigrationInterface {
  name = 'Init1690116051460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Permission" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying(256) NOT NULL, "title" character varying(256) NOT NULL, "description" character varying(256) NOT NULL, "createdBy" integer, "updatedBy" integer, "deletedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_a5da19c6eb1743084f5a834f4c6" UNIQUE ("slug"), CONSTRAINT "PK_96c82eedac1e126a1aa90eb0285" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "DeviceCategory" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying(256) NOT NULL, "title" character varying(256) NOT NULL, "createdBy" integer, "updatedBy" integer, "deletedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_46689c0b40d5104e7c08a7371b0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "DeviceModel" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying(256) NOT NULL, "title" character varying(256) NOT NULL, "createdBy" integer, "updatedBy" integer, "deletedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "deviceCategoryId" integer, CONSTRAINT "PK_c1b6858146fab1df68c7f97407b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "DeviceReading" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "latitude" character varying(256), "longitude" character varying(256), "datetime" TIMESTAMP, "createdBy" integer, "updatedBy" integer, "deletedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_eaff0fd39700055b8eb2a4c4b2a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Device" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(256) NOT NULL, "code" character varying NOT NULL, "createdBy" integer, "updatedBy" integer, "deletedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "deviceModelId" integer, CONSTRAINT "PK_f0a3247774bd4eaad2177055336" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "UserDevice" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "surname" character varying(256) NOT NULL, "thumbnail" character varying(256) NOT NULL, "color" character varying(256) NOT NULL, "createdBy" integer, "updatedBy" integer, "deletedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, "deviceId" integer, CONSTRAINT "PK_00fb9ce2465cdc6c5f47e1ef5df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "User" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "email" character varying(256) NOT NULL, "phone" character varying(256) NOT NULL, "password" character varying(256) NOT NULL, "thumbnail" character varying(256) NOT NULL, "createdBy" integer, "updatedBy" integer, "deletedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "roleId" integer, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Role" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying(256) NOT NULL, "title" character varying(256) NOT NULL, "description" character varying(256) NOT NULL, "createdBy" integer, "updatedBy" integer, "deletedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "RolePermissions" ("roleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_271a57f902aeccb204316efe82d" PRIMARY KEY ("roleId", "permissionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5bc4baf52e29432973ac9ebf90" ON "RolePermissions" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2c2887cb39b3141958851e6fbd" ON "RolePermissions" ("permissionId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "DeviceModel" ADD CONSTRAINT "FK_1454d6681c22fc3b1940aa1b770" FOREIGN KEY ("deviceCategoryId") REFERENCES "DeviceCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Device" ADD CONSTRAINT "FK_47bd5bc0f9a964a819c070237bf" FOREIGN KEY ("deviceModelId") REFERENCES "DeviceModel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserDevice" ADD CONSTRAINT "FK_e69f82cf0fc44f121ee38e6810c" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserDevice" ADD CONSTRAINT "FK_0f08f5aa48e1f2c270babe7a886" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "User" ADD CONSTRAINT "FK_0b8c60cc29663fa5b9fb108edd7" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "RolePermissions" ADD CONSTRAINT "FK_5bc4baf52e29432973ac9ebf90a" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "RolePermissions" ADD CONSTRAINT "FK_2c2887cb39b3141958851e6fbdc" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "RolePermissions" DROP CONSTRAINT "FK_2c2887cb39b3141958851e6fbdc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "RolePermissions" DROP CONSTRAINT "FK_5bc4baf52e29432973ac9ebf90a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "User" DROP CONSTRAINT "FK_0b8c60cc29663fa5b9fb108edd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserDevice" DROP CONSTRAINT "FK_0f08f5aa48e1f2c270babe7a886"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserDevice" DROP CONSTRAINT "FK_e69f82cf0fc44f121ee38e6810c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Device" DROP CONSTRAINT "FK_47bd5bc0f9a964a819c070237bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "DeviceModel" DROP CONSTRAINT "FK_1454d6681c22fc3b1940aa1b770"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2c2887cb39b3141958851e6fbd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5bc4baf52e29432973ac9ebf90"`,
    );
    await queryRunner.query(`DROP TABLE "RolePermissions"`);
    await queryRunner.query(`DROP TABLE "Role"`);
    await queryRunner.query(`DROP TABLE "User"`);
    await queryRunner.query(`DROP TABLE "UserDevice"`);
    await queryRunner.query(`DROP TABLE "Device"`);
    await queryRunner.query(`DROP TABLE "DeviceReading"`);
    await queryRunner.query(`DROP TABLE "DeviceModel"`);
    await queryRunner.query(`DROP TABLE "DeviceCategory"`);
    await queryRunner.query(`DROP TABLE "Permission"`);
  }
}
