document.addEventListener("DOMContentLoaded", function () {
    const generoRadios = document.querySelectorAll("input[name='genero']");
    const buttonContainer = document.querySelector(".button-container");
    const tablaBody = document.querySelector("#tablaProduccion tbody");
    const tablaConsumoGramosBody = document.querySelector("#tablaConsumoGramos tbody");
    const tablaConsumoFinalBody = document.querySelector("#tablaConsumoFinal tbody");
    const cantidadPollosInput = document.getElementById("cantidadMachos");
    const dosisNucleoInput = document.getElementById("dosisNucleo");
    const dosisVitaminasInput = document.getElementById("dosisVitaminas");
    const volverBtn = document.getElementById("btnVolver");
    const nuevoBtn = document.getElementById("btnNuevo");
    const exportarPDFBtn = document.getElementById("btnExportarPDF");
    const exportarJPGBtn = document.getElementById("btnExportarJPG");

    // Función para seleccionar el animal
    window.seleccionarAnimal = function (animal) {
        if (animal === "pollo") {
            let menuPrincipal = document.getElementById("menuPrincipal");
            let simulacion = document.getElementById("simulacionPollo");

            menuPrincipal.classList.add("hidden");
            menuPrincipal.classList.remove("show");

            setTimeout(() => {
                simulacion.style.display = "flex";
                simulacion.classList.remove("hidden");
                simulacion.classList.add("show");
            }, 500);
        } else {
            alert("🚧 Esta funcionalidad está en desarrollo. ¡Próximamente disponible! 🚀");
        }
    };

    // Función para volver al menú principal
    window.volverMenu = function () {
        let simulacion = document.getElementById("simulacionPollo");
        let menuPrincipal = document.getElementById("menuPrincipal");

        simulacion.classList.remove("show");
        simulacion.classList.add("hidden");

        setTimeout(() => {
            simulacion.style.display = "none";
            menuPrincipal.classList.remove("hidden");
            menuPrincipal.classList.add("show");
            menuPrincipal.style.display = "flex";
        }, 500);
    };

    // Verifica si los elementos existen antes de agregar eventos
    if (generoRadios.length > 0) {
        generoRadios.forEach(radio => {
            radio.addEventListener("change", function () {
                actualizarTablas();
                buttonContainer.style.display = "flex";
            });
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

    if (volverBtn) {
        volverBtn.addEventListener("click", volverMenu);
    }

    if (nuevoBtn) {
        nuevoBtn.addEventListener("click", function () {
            limpiarFormulario();
        });
    }

    if (exportarPDFBtn) {
        exportarPDFBtn.addEventListener("click", function () {
            generarPDF();
        });
    }

    if (exportarJPGBtn) {
        exportarJPGBtn.addEventListener("click", function () {
            exportarJPG();
        });
    }

    function actualizarTablas() {
        const genero = document.querySelector("input[name='genero']:checked")?.value || "Macho";
        actualizarTabla(genero);
        actualizarTablaConsumoGramos(genero);
        actualizarTablaConsumoFinal(genero);
    }

    function actualizarTabla(genero) {
        tablaBody.innerHTML = "";

        let semanas = (genero === "Macho") ? 5 : 7;
        let fases = ["Inicio", "Crecimiento", "Engorde", "Finalización", "Finalización"];
        let diasPorSemanaMacho = [10, 10, 10, 7, 5];
        let diasPorSemanaHembra = [10, 10, 10, 7, 7, 7, 5];

        let consumoAcumuladoMacho = [0.299, 0.81, 1.449, 1.389, 1.126];
        let consumoAcumuladoHembra = [0.295, 0.757, 1.306, 1.179, 1.368, 1.483, 1.125];

        let cantidadPollos = parseInt(cantidadPollosInput.value) || 0;
        let dosisNucleo = parseFloat(dosisNucleoInput.value) || 1;
        let dosisVitaminas = parseFloat(dosisVitaminasInput.value) || 1;

        for (let i = 1; i <= semanas; i++) {
            let fase = fases[Math.min(i - 1, fases.length - 1)];
            let dias = (genero === "Macho") ? diasPorSemanaMacho[i - 1] : diasPorSemanaHembra[i - 1];
            let consumoAcumulado = (genero === "Macho") ? consumoAcumuladoMacho[i - 1] : consumoAcumuladoHembra[i - 1];
            let consumoLote = (cantidadPollos * consumoAcumulado).toFixed(2);
            let kgNucleoDISAGRO = ((consumoLote * dosisNucleo) / 1000).toFixed(2);
            let bolsasNucleoDISAGRO = (kgNucleoDISAGRO / dosisNucleo).toFixed(2);
            let kgPremezclaVitaminas = ((consumoLote * dosisVitaminas) / 1000).toFixed(2);
            let bolsasPremezclaVitaminas = (kgPremezclaVitaminas / dosisVitaminas).toFixed(2);

            let fila = `
                <tr>
                    <td>${i}</td>
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
        tablaConsumoGramosBody.innerHTML = "";

        const consumoMachos = [
            [13, 17, 21, 23, 27, 31, 35],
            [39, 44, 49, 54, 59, 64, 70],
            [77, 83, 90, 97, 104, 112, 119]
        ];

        const consumoHembras = [
            [13, 17, 21, 23, 27, 31, 35],
            [37, 44, 47, 54, 57, 63, 68],
            [73, 79, 84, 89, 92, 98, 103]
        ];

        const consumoDatos = genero === "Macho" ? consumoMachos : consumoHembras;
        const semanas = consumoDatos.length;

        for (let i = 0; i < semanas; i++) {
            let fila = `<tr><td>${i + 1}</td>`;
            consumoDatos[i].forEach(valor => {
                fila += `<td>${valor}</td>`;
            });
            fila += `</tr>`;
            tablaConsumoGramosBody.innerHTML += fila;
        }
    }

    function limpiarFormulario() {
        cantidadPollosInput.value = "";
        dosisNucleoInput.value = "";
        dosisVitaminasInput.value = "";
        tablaBody.innerHTML = "";
    }
});

