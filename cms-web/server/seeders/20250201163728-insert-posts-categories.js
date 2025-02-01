"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    const timestamp = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Olahraga",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const postTitle1 =
      "Ragnar Oratmangoen Main, 9 Pemain Dender Dibantai Charleroi 0-5";
    const postTitle2 =
      "Susul Pastoor, Kluivert Tiba di Jakarta Bareng Vanenburg dan Landzaat";

    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          title: postTitle1,
          content: `Jakarta, CNN Indonesia -- FC Dender menelan kekalahan telak dari Charleroi dalam pertandingan lanjutan Liga Belgia, Sabtu (1/2) malam WIB. Dalam pertandingan ini pemain Timnas Indonesia Ragnar Oratmangoen diturunkan di menit ke-34.
Dender kalah 0-5 dari Charleroi dalam laga yang berlangsung di Stadion Stade du Pays de Charleroi.

Charleroi berhasil memimpin 1-0 pada menit kedelapan melalui gol yang dicetak Adem Zorgane usai meneruskan umpan Parfait Guiagon.

Hingga pertandingan berakhir tak ada gol tambahan yang tercipta. Dender kalah 0-5 dari Charleori.

Hasil ini membuat Charleroi tetap berada di peringkat kedelapan dengan mengemas 29 poin dari 24 pertandingan yang dijalani.

Sedangkan, Dender tetap di posisi ke-10 klasemen Liga Belgia dengan mengoleksi 28 poin dari 24 laga yang dilakoni.
`,
          imgUrl:
            "https://akcdn.detik.net.id/visual/2024/11/15/timnas-indonesia-lawan-jepang-3_169.jpeg?w=650&q=90",
          categoryId: 1,
          slug: `${postTitle1.toLowerCase().replace(/\s+/g, "-")}-${timestamp}`,
          authorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: postTitle2,
          content: `Jakarta, CNN Indonesia -- Pelatih Timnas Indonesia Patrick Kluivert dilaporkan telah tiba di Jakarta pada Sabtu (1/2) malam. Kluivert tampak hadir bersama dua asistennya yaitu Gerald Vanenburg dan Denny Landzaat.
Ketiganya menyusul asisten pelatih Timnas Indonesia lainnya yakni Alex Pastoor yang sudah berada di Jakarta pada Sabtu (1/2) siang.

Kabar Kluivert bersama Vavenburg dan Landzaat tiba di Jakarta terungkap dari sejumlah video yang viral di media sosial.

Saat itu Kluivert hanya didampingi Denny Landzaat dalam sesi konferensi pers di Jakarta pada 12 Januari lalu.

Kini, Kluivert dan tiga asistennya asal Belanda telah berada di Jakarta untuk mempersiapkan Timnas Indonesia untuk melakoni laga lanjutan Kualifikasi Piala Dunia 2026.

Timnas Indonesia akan menghadapi Australia pada 20 Maret dan Bahrain (25 Maret). PSSI berharap Kluivert bisa mendulang poin maksimal di dua laga terdekat.
`,
          imgUrl:
            "https://akcdn.detik.net.id/visual/2025/01/12/patrick-kluivert_169.jpeg?w=650&q=90",
          categoryId: 1,
          slug: `${postTitle2.toLowerCase().replace(/\s+/g, "-")}-${timestamp}`,
          authorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: postTitle1,
          content: `Jakarta, CNN Indonesia -- FC Dender menelan kekalahan telak dari Charleroi dalam pertandingan lanjutan Liga Belgia, Sabtu (1/2) malam WIB. Dalam pertandingan ini pemain Timnas Indonesia Ragnar Oratmangoen diturunkan di menit ke-34.
Dender kalah 0-5 dari Charleroi dalam laga yang berlangsung di Stadion Stade du Pays de Charleroi.

Charleroi berhasil memimpin 1-0 pada menit kedelapan melalui gol yang dicetak Adem Zorgane usai meneruskan umpan Parfait Guiagon.

Hingga pertandingan berakhir tak ada gol tambahan yang tercipta. Dender kalah 0-5 dari Charleori.

Hasil ini membuat Charleroi tetap berada di peringkat kedelapan dengan mengemas 29 poin dari 24 pertandingan yang dijalani.

Sedangkan, Dender tetap di posisi ke-10 klasemen Liga Belgia dengan mengoleksi 28 poin dari 24 laga yang dilakoni.
`,
          imgUrl:
            "https://akcdn.detik.net.id/visual/2024/11/15/timnas-indonesia-lawan-jepang-3_169.jpeg?w=650&q=90",
          categoryId: 1,
          slug: `${postTitle1.toLowerCase().replace(/\s+/g, "-")}-${timestamp}`,
          authorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: postTitle2,
          content: `Jakarta, CNN Indonesia -- Pelatih Timnas Indonesia Patrick Kluivert dilaporkan telah tiba di Jakarta pada Sabtu (1/2) malam. Kluivert tampak hadir bersama dua asistennya yaitu Gerald Vanenburg dan Denny Landzaat.
Ketiganya menyusul asisten pelatih Timnas Indonesia lainnya yakni Alex Pastoor yang sudah berada di Jakarta pada Sabtu (1/2) siang.

Kabar Kluivert bersama Vavenburg dan Landzaat tiba di Jakarta terungkap dari sejumlah video yang viral di media sosial.

Saat itu Kluivert hanya didampingi Denny Landzaat dalam sesi konferensi pers di Jakarta pada 12 Januari lalu.

Kini, Kluivert dan tiga asistennya asal Belanda telah berada di Jakarta untuk mempersiapkan Timnas Indonesia untuk melakoni laga lanjutan Kualifikasi Piala Dunia 2026.

Timnas Indonesia akan menghadapi Australia pada 20 Maret dan Bahrain (25 Maret). PSSI berharap Kluivert bisa mendulang poin maksimal di dua laga terdekat.
`,
          imgUrl:
            "https://akcdn.detik.net.id/visual/2025/01/12/patrick-kluivert_169.jpeg?w=650&q=90",
          categoryId: 1,
          slug: `${postTitle2.toLowerCase().replace(/\s+/g, "-")}-${timestamp}`,
          authorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tags",
      [
        {
          postId: 1,
          name: "Sepakbola",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          name: "Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 2,
          name: "Sepakbola",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 2,
          name: "Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
