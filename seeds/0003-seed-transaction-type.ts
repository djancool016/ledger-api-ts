import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("transaction_type").del();

    // Inserts seed entries
    await knex("transaction_type").insert([
        { id: 1, code: "DEPO", description: "Setoran Kas ke Bank" },
        { id: 2, code: "WDWL", description: "Tarik Tunai Bank ke Kas" },
        { id: 3, code: "RPKS", description: "Realisasi Piutang KSM" },
        { id: 4, code: "APKS", description: "Angsuran Pokok KSM" },
        { id: 5, code: "ABKS", description: "Angsuran Bunga KSM" },
        { id: 6, code: "TBKS", description: "Titipan BOP KSM" },
        { id: 7, code: "ASIV", description: "Aset Inventaris" },
        { id: 8, code: "PSIV", description: "Penyusutan Inventaris" },
        { id: 9, code: "PRIV", description: "Perawatan Inventaris" },
        { id: 10, code: "ASBG", description: "Aset Bangunan" },
        { id: 11, code: "PRBG", description: "Perawatan Bangunan" },
        { id: 12, code: "AGUP", description: "Anggaran UPL" },
        { id: 13, code: "AGUS", description: "Anggaran UPS" },
        { id: 14, code: "MDLT", description: "Modal dari Laba Tahunan" },
        { id: 15, code: "INTS", description: "Bunga Bank" },
        { id: 16, code: "HNRU", description: "Honor Sekretaris, UPK dan Kebersihan Kantor" },
        { id: 17, code: "LMBR", description: "Lembur Petugas Pembukuan UPK" },
        { id: 18, code: "BABB", description: "Biaya Administrasi Bank" },
        { id: 19, code: "INPP", description: "Insentif Pengurus dan Pengawas" },
        { id: 20, code: "BLKT", description: "Belanja Kantor" },
        { id: 21, code: "BLRT", description: "Belanja Rumah Tangga" },
        { id: 22, code: "PJDN", description: "Perjalanan Dinas" },
        { id: 23, code: "BIPM", description: "Biaya Pemeriksaan" },
        { id: 24, code: "BIRT", description: "Biaya Rapat" },
        { id: 25, code: "BIRW", description: "Biaya RWT" },
        { id: 26, code: "THRA", description: "Tunjangan Hari Raya" },
        { id: 27, code: "PBLS", description: "Pembelian Seragam" },
        { id: 28, code: "BKTH", description: "Bantuan Kesehatan Tenaga Harian" },
        { id: 29, code: "BPTB", description: "Biaya Purna Tugas / Bhakti" },
        { id: 30, code: "PSKO", description: "Pendampingan Sistem Komputer" },
        { id: 31, code: "BKLG", description: "Bantuan Kegiatan Lingkungan" },
        { id: 32, code: "BKSO", description: "Bantuan Kegiatan Sosial" },
        { id: 33, code: "PSBG", description: "Penyusutan Bangunan" },
        { id: 34, code: "PDSK", description: "Pendapatan dari Sewa Kios" },
        { id: 35, code: "PTBK", description: "Penarikan Titipan BOP KSM" },
        { id: 36, code: "BPJB", description: "Biaya Pajak Bank" },
        { id: 37, code: "RSKR", description: "Resiko Kredit" },
        { id: 38, code: "BBKS", description: "Biaya BOP KSM" },
        { id: 39, code: "HPPP", description: "Hibah P2KP, PNPM dan P.DAPM" },
        { id: 40, code: "CRKR", description: "Cadangan Resiko Kredit" },
    ]);
};
