-- AlterTable
CREATE SEQUENCE inverter_id_seq;
ALTER TABLE "Inverter" ALTER COLUMN "id" SET DEFAULT nextval('inverter_id_seq');
ALTER SEQUENCE inverter_id_seq OWNED BY "Inverter"."id";
