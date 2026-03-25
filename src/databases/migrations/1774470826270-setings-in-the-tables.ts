import { MigrationInterface, QueryRunner } from "typeorm";

export class SetingsInTheTables1774470826270 implements MigrationInterface {
    name = 'SetingsInTheTables1774470826270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "cover_image" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "cover_image" character varying(800)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "cover_image" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "cover_image"`);
    }

}
