import moment from "moment";

export default (letters) => {
    moment.locale("id");

    const date = new Date();
    const dateNow = moment(date).format("LL");

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Report</title>
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
        
                body {
                    font-family: "Palatino Linotype", serif;
                    padding: 4rem 6rem;
                }
        
                h1 {
                    font-size: 22px;
                }
        
                h2, p, td {
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <header style="text-align: center; margin-bottom: 1rem">
                <img
                        style="width: 75px; position: absolute; top: 4.5rem; left: 6rem"
                        src="https://user-images.githubusercontent.com/82141956/209539409-d3ad01c3-2dc7-4140-bd71-45e05da07389.png"
                        alt="logo kabupaten">
                <h1 style="margin-bottom: 0.2rem">
                    Pemerintah Kabupaten Sukoharjo<br>
                    Kecamatan Baki<br>
                    Desa Kadilangu
                </h1>
                <p style="margin-bottom: 1rem; font-size: 14px">Jalan Mawar No. 1 Kadilangu, Telepon 0271 - 622317 Kode Pos
                    57556</p>
                <hr>
                <div style="text-align: center; margin-bottom: 1rem">
                    <h2>Laporan Permohonan Surat Online</h2>
                    <h2>Desa Kadilangu</h2>
                </div>
            </header>
        
            <main>
                <table border="1" style="width: 100%">
                    <thead>
                        <tr>
                            <th style="padding: 2px;">No</th>
                            <th style="padding: 2px;">Nama</th>
                            <th style="padding: 2px;">Nama Surat</th>
                            <th style="padding: 2px;">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${letters.map((data, index) => {
                        return `
                            <tr>
                                <td style="padding: 2px">${index + 1}</td>
                                <td style="padding: 4px">${data.user.user_profile.name}</td>
                                <td style="padding: 4px">${data.letter.name}</td>
                                <td style="padding: 4px">${new Date(data.dataValues.created_at).toLocaleString()}</td>
                            </tr>
                        `
                    })}
                     </tbody>
                </table>
            </main>
            <footer style="height: 10rem">
                <p style="text-align: end">Sukoharjo, ${dateNow}</p>
                <div style="position: relative;">
                    <div style="text-align: center; position: absolute; top: 2rem; right: 0">
                        <img
                                style="width: 125px; position: absolute; top: 1rem; right: 0.5rem"
                                src="https://user-images.githubusercontent.com/82141956/209539487-ab0a5159-80d3-47ae-9311-bd693e9a3302.png"
                                alt="tanda tangan"/>
                        <p style="margin-bottom: 4rem">Kepala Desa</p>
                        <p>Yugma Dewangga</p>
                    </div>
                </div>
            </footer>
        </body>
        </html>
    `
}