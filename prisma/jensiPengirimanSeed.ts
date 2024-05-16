import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
const jenisPengiriman = [
    { jenisPengiriman: 'JAGOPACK', keterangan: 'Layanan JAGOPACK memiliki estimasi pengiriman antara 2 sampai 7 hari' },
    { jenisPengiriman: 'REGPACK', keterangan: 'Layanan REGPACK adalah jenis opsi jasa pengiriman barang murah dengan tarif reguler' },
    { jenisPengiriman: 'ONEPACK', keterangan: 'Layanan pengiriman barang kilat dan paket harus sampai di alamat tujuan keesokan harinya' },
    { jenisPengiriman: 'INTERPACK', keterangan: 'Layanan pengiriman barang ke luar negeri' },
    { jenisPengiriman: 'BIGPACK', keterangan: 'layanan pengiriman BIGPACK, yang bisa kamu pilih untuk pengiriman paket dalam volume besar' },
];

    for (const jenis of jenisPengiriman) {
        await prisma.jenisPengiriman.create({
            data: jenis,
        });
    }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })