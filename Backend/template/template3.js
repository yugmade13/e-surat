import moment from "moment";

export default ({nik, name, place_of_birth, date_of_birth, gender, address, citizen, religion, profession}) => {
    moment.locale("id");

    const date = new Date();
    const dateNow = moment(date).format("LL");
    const month = moment(date).format("M");
    const year = moment(date).format("Y");

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
        
                body {
                    font-family: "Palatino Linotype",serif;
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
            <p style="margin-bottom: 1rem; font-size: 14px">Jalan Mawar No. 1 Kadilangu, Telepon 0271 - 622317 Kode Pos 57556</p>
            <hr>
        </header>
        <section>
            <div style="text-align: center; margin-bottom: 2rem">
                <h2>Surat Keterangan Tidak Mampu</h2>
                <p>Nomor : 09/PD-KDL/${month}/${year}</p>
            </div>
            <div style="margin-bottom: 2rem">
                <p style="margin-bottom: 1rem">Yang bertanda tangan dibawah ini :</p>
                <table style="margin-left: 4rem">
                    <tbody>
                    <tr>
                        <td>Nama</td>
                        <td>: Yugma Dewangga</td>
                    </tr>
                    <tr>
                        <td>Jabatan</td>
                        <td>: Kepala Desa Kadilangu</td>
                    </tr>
                    <tr>
                        <td>Alamat</td>
                        <td>: Kadilangu RT 02 RW 03 Baki Sukoharjo</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style="margin-bottom: 2rem">
                <p style="margin-bottom: 1rem">Menerangkan bahwa :</p>
                <table style="margin-left: 4rem">
                    <tbody>
                    <tr>
                        <td>NIK</td>
                        <td>: ${nik}</td>
                    </tr>
                    <tr>
                        <td>Nama</td>
                        <td>: ${name}</td>
                    </tr>
                    <tr>
                        <td>Jenis Kelamin</td>
                        <td>: ${gender}</td>
                    </tr>
                    <tr>
                        <td>Tempat, Tanggal Lahir</td>
                        <td>: ${place_of_birth}, ${date_of_birth}</td>
                    </tr>
                    <tr>
                         <td>Tempat, Tanggal Lahir</td>
                         <td>: ${address}</td>
                    </tr>
                    <tr>
                        <td>Bangsa / Agama</td>
                        <td>: ${citizen} / ${religion}</td>
                    </tr>
                    <tr>
                        <td>Pekerjaan</td>
                        <td>: ${profession}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style="margin-bottom: 2rem">
                <p style="margin: 1rem 0">Dengan ini menerangkan bahwa yang bersangkutan benar-benar berasal dari Keluarga Tidak Mampu.</p>
                <p style="margin: 1rem 0">Demikian, Surat Keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya mohon kepada yang berkepentingan untuk mengetahuinya dan maklum adanya.</p>
            </div>
            <footer style="height: 10rem">
                <p style="text-align: end">Sukoharjo, ${dateNow}</p>
                <div style="position: relative;">
                    <div style="text-align: center; position: absolute; top: 2rem; left: 0">
        
                    </div>
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
        
        </section>
        </body>
        </html>
    `
}