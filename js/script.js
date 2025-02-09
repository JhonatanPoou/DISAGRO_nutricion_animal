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

    // Función para seleccionar el animal
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

    // Función para volver al menú principal
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

    // Verifica si los elementos existen antes de agregar eventos
    if (generoRadios.length > 0) {
        generoRadios.forEach(radio => {
            radio.addEventListener("change", function () {
                actualizarTablas(this.value);
                if (document.querySelector("input[name='genero']:checked")) {
                    buttonContainer.style.display = "flex";
                }
            });
        });
    } else {
        console.error("⚠️ No se encontraron los radio buttons de género.");
    }

    if (cantidadPollosInput) {
        cantidadPollosInput.addEventListener("input", function () {
            actualizarTablas(document.querySelector("input[name='genero']:checked")?.value || "Macho");
        });
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

    function actualizarTablas(genero) {
        actualizarTablaProduccion(genero);
        actualizarTablaConsumoGramos(genero);
        actualizarTablaConsumoFinal(genero);
    }

    function actualizarTablaProduccion(genero) {
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
        console.log("Actualizar tabla de consumo en gramos para:", genero);
        // Aquí asegúrate de que los cálculos sean correctos
    }

    function actualizarTablaConsumoFinal(genero) {
        console.log("Actualizar tabla de consumo final para:", genero);
        // Aquí asegúrate de que los cálculos sean correctos
    }

    function limpiarFormulario() {
        cantidadPollosInput.value = "";
        dosisNucleoInput.value = "";
        dosisVitaminasInput.value = "";
        tablaBody.innerHTML = "";
    }
});

