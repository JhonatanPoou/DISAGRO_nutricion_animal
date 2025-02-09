document.addEventListener("DOMContentLoaded", function () {
    const generoRadios = document.querySelectorAll("input[name='genero']");
    const buttonContainer = document.querySelector(".button-container");
    const tablaBody = document.querySelector("#tablaProduccion tbody");
    const cantidadPollosInput = document.getElementById("cantidadMachos");
    const dosisNucleoInput = document.getElementById("dosisNucleo");
    const dosisVitaminasInput = document.getElementById("dosisVitaminas");
    const volverBtn = document.getElementById("btnVolver");
    const nuevoBtn = document.getElementById("btnNuevo");
    const tablaBodyConsumoGramos = document.querySelector("#tablaConsumoGramos tbody");
     const tablaBodyConsumoFinal = document.querySelector("#tablaConsumoFinal tbody");

    // 🔥 FUNCIONES PARA EFECTO DE BARRIDO 🔥
    window.seleccionarAnimal = function (animal) {
        if (animal === "pollo") {
            let menuPrincipal = document.getElementById("menuPrincipal");
            let simulacion = document.getElementById("simulacionPollo");

            console.log("Ocultando menú principal...");
            menuPrincipal.classList.add("hidden");
            menuPrincipal.classList.remove("show");

            setTimeout(() => {
                console.log("Mostrando simulación...");
                simulacion.style.display = "flex";
                simulacion.classList.remove("hidden");
                simulacion.classList.add("show");
            }, 500);
        } else {
            alert("🚧 Esta funcionalidad está en desarrollo. ¡Próximamente disponible! 🚀");
        }
    };

    window.volverMenu = function () {
        let simulacion = document.getElementById("simulacionPollo");
        let menuPrincipal = document.getElementById("menuPrincipal");

        console.log("Ocultando simulación...");
        simulacion.classList.remove("show");
        simulacion.classList.add("hidden");

        setTimeout(() => {
            console.log("Mostrando menú principal...");
            simulacion.style.display = "none";
            menuPrincipal.classList.remove("hidden");
            menuPrincipal.classList.add("show");
            menuPrincipal.style.display = "flex";
            menuPrincipal.style.justifyContent = "center";
            menuPrincipal.style.alignItems = "center";
        }, 500);
    };

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

    if (nuevoBtn) {
        nuevoBtn.addEventListener("click", limpiarFormulario);
    }

    function actualizarTabla(genero) {
        tablaBody.innerHTML = "";

        let semanas = (genero === "Macho") ? 6 : 8;
        let fases = ["Inicio", "Crecimiento", "Engorde", "Finalización", "Finalización"];
        let diasPorSemanaMacho = [10, 10, 10, 7, 5, 5];
        let diasPorSemanaHembra = [10, 10, 10, 7, 7, 7, 5, 5];

        let consumoAcumuladoMacho = [0.299, 0.81, 1.449, 1.389, 1.126, 1.126];
        let consumoAcumuladoHembra = [0.295, 0.757, 1.306, 1.179, 1.368, 1.483, 1.125, 1.125];

        let cantidadPollos = parseInt(cantidadPollosInput.value) || 0;
        let dosisNucleo = parseFloat(dosisNucleoInput.value) || 1;
        let dosisVitaminas = parseFloat(dosisVitaminasInput.value) || 1;

        for (let i = 0; i < semanas; i++) {
            let fase = fases[Math.min(i, fases.length - 1)];
            let dias = (genero === "Macho") ? diasPorSemanaMacho[i] : diasPorSemanaHembra[i];
            let consumoAcumulado = (genero === "Macho") ? consumoAcumuladoMacho[i] : consumoAcumuladoHembra[i];
            let consumoLote = (cantidadPollos * consumoAcumulado).toFixed(2);
            let kgNucleoDISAGRO = ((consumoLote * dosisNucleo) / 1000).toFixed(2);
            let bolsasNucleoDISAGRO = (kgNucleoDISAGRO / dosisNucleo).toFixed(2);
            let kgPremezclaVitaminas = ((consumoLote * dosisVitaminas) / 1000).toFixed(2);
            let bolsasPremezclaVitaminas = (kgPremezclaVitaminas / dosisVitaminas).toFixed(2);

            let fila = `
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



    function actualizarTablaConsumoGramos() {
        const genero = obtenerGeneroSeleccionado();
        tablaBodyConsumoGramos.innerHTML = ""; // Limpia la tabla antes de llenarla

        // 🔥 Datos base de consumo en gramos
        const consumoMachos = [
            [13, 17, 21, 23, 27, 31, 35],
            [39, 44, 49, 54, 59, 64, 70],
            [77, 83, 90, 97, 104, 112, 119],
            [124, 130, 136, 142, 148, 154, 160],
            [165, 171, 177, 184, 192, 200, 209],
            [212, 215, 218, 221, 225, 229, 233]
        ];

        const consumoHembras = [
            [13, 17, 21, 23, 27, 31, 35],
            [37, 44, 47, 54, 57, 63, 68],
            [73, 79, 84, 89, 92, 98, 103],
            [111, 116, 124, 126, 134, 142, 144],
            [151, 155, 161, 163, 165, 167, 169],
            [175, 179, 184, 189, 193, 197, 199],
            [203, 203, 205, 204, 207, 208, 209],
            [212, 215, 218, 221, 225, 229, 233]
        ];

        const datos = genero === "Macho" ? consumoMachos : consumoHembras;
        let consumoAcumuladoGramos = 0; // 🔥 Variable acumulativa de consumo

        datos.forEach((fila, semanaIndex) => {
            let filaHTML = `<tr><td>${semanaIndex + 1}</td>`;
            let totalSemana = fila.reduce((acc, val) => acc + val, 0); // 🔥 Suma de la semana

            consumoAcumuladoGramos += totalSemana; // 🔥 Acumulación progresiva
            let consumoAcumuladoKg = (consumoAcumuladoGramos / 1000).toFixed(3); // 🔥 Conversión a kg con 3 decimales

            fila.forEach(valor => {
                filaHTML += `<td>${valor}</td>`;
            });

            filaHTML += `<td><b>${totalSemana} g</b></td>`; // 🔥 Total semanal en gramos
            filaHTML += `<td><b>${consumoAcumuladoGramos} g</b></td>`; // 🔥 Consumo acumulado en gramos
            filaHTML += `<td><b style="color: #00796B;">${consumoAcumuladoKg} kg</b></td>`; // 🔥 Consumo acumulado en kg
            filaHTML += `</tr>`;

            tablaBodyConsumoGramos.innerHTML += filaHTML;
        });
    }


    //Tabla consumo final
    function actualizarTablaConsumoFinal() {
        const genero = obtenerGeneroSeleccionado();
        tablaBodyConsumoFinal.innerHTML = ""; // Limpia la tabla antes de llenarla

        let cantidadPollos = parseInt(cantidadPollosInput.value) || 0;

        // 🔥 Datos base de consumo en gramos
        const consumoMachos = [
            [13, 17, 21, 23, 27, 31, 35],
            [39, 44, 49, 54, 59, 64, 70],
            [77, 83, 90, 97, 104, 112, 119],
            [124, 130, 136, 142, 148, 154, 160],
            [165, 171, 177, 184, 192, 200, 209],
            [212, 215, 218, 221, 225, 229, 233]
        ];

        const consumoHembras = [
            [13, 17, 21, 23, 27, 31, 35],
            [37, 44, 47, 54, 57, 63, 68],
            [73, 79, 84, 89, 92, 98, 103],
            [111, 116, 124, 126, 134, 142, 144],
            [151, 155, 161, 163, 165, 167, 169],
            [175, 179, 184, 189, 193, 197, 199],
            [203, 203, 205, 204, 207, 208, 209],
            [212, 215, 218, 221, 225, 229, 233]
        ];

        const datos = genero === "Macho" ? consumoMachos : consumoHembras;
        let consumoAcumuladoGramos = 0; // 🔥 Variable acumulativa de consumo

        datos.forEach((fila, semanaIndex) => {
            let filaHTML = `<tr><td>${semanaIndex + 1}</td>`;
            let totalSemana = 0;

            fila.forEach(valor => {
                let consumoTotal = valor * cantidadPollos;
                totalSemana += consumoTotal;
                filaHTML += `<td>${consumoTotal}</td>`;
            });

            consumoAcumuladoGramos += totalSemana; // 🔥 Acumulación progresiva
            let consumoAcumuladoKg = (consumoAcumuladoGramos / 1000).toFixed(3); // 🔥 Conversión a kg con 3 decimales

            filaHTML += `<td><b>${totalSemana} g</b></td>`; // 🔥 Total semanal en gramos
            filaHTML += `<td><b>${consumoAcumuladoGramos} g</b></td>`; // 🔥 Consumo acumulado en gramos
            filaHTML += `<td><b style="color: #00796B;">${consumoAcumuladoKg} kg</b></td>`; // 🔥 Consumo acumulado en kg
            filaHTML += `</tr>`;

            tablaBodyConsumoFinal.innerHTML += filaHTML;
        });
    }

    if (cantidadPollosInput) {
        cantidadPollosInput.addEventListener("input", function () {
            actualizarTablaConsumoGramos();
            actualizarTablaConsumoFinal();
        });
    }

    if (generoRadios.length > 0) {
        generoRadios.forEach(radio => {
            radio.addEventListener("change", function () {
                actualizarTablaConsumoGramos();
                actualizarTablaConsumoFinal();
            });
        });
    }
});
