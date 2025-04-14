import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("coa").del();

    // Inserts seed entries
    await knex("coa").insert([
        { id: 1, account_id: 1, code: '1010', description: 'Kas UPK' },
        { id: 2, account_id: 1, code: '1020', description: 'Rekening Bank UPK' },
        { id: 3, account_id: 1, code: '1030', description: 'Piutang KSM' },
        { id: 4, account_id: 1, code: '1100', description: 'Cadangan Resiko Kredit' },
        { id: 5, account_id: 2, code: '2010', description: 'Inventaris' },
        { id: 6, account_id: 2, code: '2011', description: 'Akumulasi Penyusutan Inventaris' },
        { id: 7, account_id: 2, code: '2020', description: 'Bangunan' },
        { id: 8, account_id: 2, code: '2021', description: 'Akumulasi Penyusutan Bangunan' },
        { id: 9, account_id: 3, code: '3010', description: 'Titipan BOP KSM' },
        { id: 10, account_id: 3, code: '3030', description: 'Anggaran UPL' },
        { id: 11, account_id: 3, code: '3040', description: 'Anggaran UPS' },
        { id: 12, account_id: 4, code: '4010', description: 'Hibah P2KP, PNPM dan P.DAPM' },
        { id: 13, account_id: 4, code: '4020', description: 'Modal dari Laba Tahunan' },
        { id: 14, account_id: 5, code: '5010', description: 'Bunga Piutang KSM' },
        { id: 15, account_id: 5, code: '5020', description: 'Bunga Bank UPK' },
        { id: 16, account_id: 5, code: '5030', description: 'Pemasukan Lain' },
        { id: 17, account_id: 5, code: '6010', description: 'Biaya Operasional BKM' },
      ]
    );
};
