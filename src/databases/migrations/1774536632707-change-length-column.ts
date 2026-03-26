import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLengthColumn1774536632707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(50)`)
    }

}
