document.addEventListener("DOMContentLoaded", function () {
    const generoRadios = document.querySelectorAll("input[name='genero']");
    const buttonContainer = document.querySelector(".button-container");
    const tablaBody = document.querySelector("#tablaProduccion tbody");
    const cantidadPollosInput = document.getElementById("cantidadMachos");
    const dosisNucleoInput = document.getElementById("dosisNucleo");
    const dosisVitaminasInput = document.getElementById("dosisVitaminas");
    const volverBtn = document.getElementById("btnVolver");
    const nuevoBtn = document.getElementById("btnNuevo");
    const exportarPDFBtn = document.getElementById("btnExportarPDF");
    const exportarJPGBtn = document.getElementById("btnExportarJPG");

    function obtenerGeneroSeleccionado() {
        return document.querySelector("input[name='genero']:checked")?.value || "Macho";
    }

    function actualizarTablas() {
        const genero = obtenerGeneroSeleccionado();
        actualizarTabla(genero);
        actualizarTablaConsumoGramos(genero);
        actualizarTablaConsumoFinal(genero);
    }

    if (generoRadios.length > 0) {
        generoRadios.forEach(radio => {
            radio.addEventListener("change", actualizarTablas);
        });
    }

    if (cantidadPollosInput) {
        cantidadPollosInput.addEventListener("input", actualizarTablas);
    }

    if (dosisNucleoInput) {
        dosisNucleoInput.addEventListener("input", actualizarTablas);
    }

    if (dosisVitaminasInput) {
        dosisVitaminasInput.addEventListener("input", actualizarTablas);
    }

    function actualizarTabla(genero) {
        tablaBody.innerHTML = "";

        const semanas = (genero === "Macho") ? 6 : 8;
        const fases = ["Inicio", "Crecimiento", "Engorde", "Finalización", "Finalización", "Finalización"];
        const diasPorSemana = (genero === "Macho") ? [10, 10, 10, 7, 5, 7] : [10, 10, 10, 7, 7, 7, 7, 7];

        const consumoAcumuladoMacho = [0.299, 0.81, 1.449, 1.389, 1.126, 1.200];
        const consumoAcumuladoHembra = [0.295, 0.757, 1.306, 1.179, 1.368, 1.483, 1.125, 1.200];

        const cantidadPollos = parseInt(cantidadPollosInput.value) || 0;
        const dosisNucleo = parseFloat(dosisNucleoInput.value) || 1;
        const dosisVitaminas = parseFloat(dosisVitaminasInput.value) || 1;

        for (let i = 0; i < semanas; i++) {
            const fase = fases[Math.min(i, fases.length - 1)];
            const dias = diasPorSemana[i];
            const consumoAcumulado = (genero === "Macho") ? consumoAcumuladoMacho[i] : consumoAcumuladoHembra[i];
            const consumoLote = (cantidadPollos * consumoAcumulado).toFixed(2);
            const kgNucleoDISAGRO = ((consumoLote * dosisNucleo) / 1000).toFixed(2);
            const bolsasNucleoDISAGRO = (kgNucleoDISAGRO / dosisNucleo).toFixed(2);
            const kgPremezclaVitaminas = ((consumoLote * dosisVitaminas) / 1000).toFixed(2);
            const bolsasPremezclaVitaminas = (kgPremezclaVitaminas / dosisVitaminas).toFixed(2);

            const fila = `
                <tr>
                    <td>${i + 1}</td>
                    <td>${fase}</td>
                    <td>${dias}</td>
                    <td>${consumoAcumulado}</td>
                    <td>${consumoLote}</td>
                    <td>${kgNucleoDISAGRO}</td>
                    <td>${bolsasNucleoDISAGRO}</td>
                    <td>${kgPremezclaVitaminas}</td>
                    <td>${bolsasPremezclaVitaminas}</td>
                </tr>
            `;
            tablaBody.innerHTML += fila;
        }
    }

    function actualizarTablaConsumoGramos(genero) {
        const tablaBody = document.querySelector("#tablaConsumoGramos tbody");
        tablaBody.innerHTML = "";

        const consumoMachos = [
            [13, 17, 21, 23, 27, 31, 35], [39, 44, 49, 54, 59, 64, 70], 
            [77, 83, 90, 97, 104, 112, 119], [124, 130, 136, 142, 148, 154, 160], 
            [165, 171, 177, 184, 192, 200, 209], [212, 215, 218, 221, 225, 229, 233]
        ];

        const consumoHembras = [
            [13, 17, 21, 23, 27, 31, 35], [37, 44, 47, 54, 57, 63, 68], 
            [73, 79, 84, 89, 92, 98, 103], [111, 116, 124, 126, 134, 142, 144], 
            [151, 155, 161, 163, 165, 167, 169], [175, 179, 184, 189, 193, 197, 199], 
            [203, 203, 205, 204, 207, 208, 209], [212, 215, 218, 221, 225, 229, 233]
        ];

        const consumoDatos = (genero === "Macho") ? consumoMachos : consumoHembras;
        const semanas = consumoDatos.length;
        let consumoAcumuladoGramos = 0;

        for (let i = 0; i < semanas; i++) {
            let fila = `<tr><td>${i + 1}</td>`;
            let totalSemana = 0;

            consumoDatos[i].forEach(valor => {
                totalSemana += valor;
                fila += `<td>${valor}</td>`;
            });

            consumoAcumuladoGramos += totalSemana;
            const consumoAcumuladoKg = (consumoAcumuladoGramos / 1000).toFixed(3);

            fila += `<td><b>${totalSemana} g</b></td>`;
            fila += `<td><b>${consumoAcumuladoGramos} g</b></td>`;
            fila += `<td><b>${consumoAcumuladoKg} kg</b></td>`;
            fila += `</tr>`;

            tablaBody.innerHTML += fila;
        }
    }

    function actualizarTablaConsumoFinal(genero) {
        const tablaBody = document.querySelector("#tablaConsumoFinal tbody");
        tablaBody.innerHTML = "";

        let cantidadPollos = parseInt(document.getElementById("cantidadMachos").value) || 0;

        document.querySelectorAll("#tablaConsumoGramos tbody tr").forEach(tr => {
            let fila = "<tr>";
            tr.querySelectorAll("td").forEach((td, index) => {
                if (index === 0) {
                    fila += `<td>${td.innerText}</td>`;
                } else {
                    const valor = parseInt(td.innerText) || 0;
                    fila += `<td>${valor * cantidadPollos}</td>`;
                }
            });
            fila += "</tr>";
            tablaBody.innerHTML += fila;
        });
    }
});
