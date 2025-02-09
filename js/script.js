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
    function actualizarTodo() {
        let generoSeleccionado = document.querySelector("input[name='genero']:checked")?.value || "Macho";
        actualizarTabla(generoSeleccionado);
        actualizarTablaConsumoGramos(generoSeleccionado);
        actualizarTablaConsumoFinal(generoSeleccionado);
    }

    if (generoRadios.length > 0) {
        generoRadios.forEach(radio => {
            radio.addEventListener("change", actualizarTodo);
        });
    }

    if (cantidadPollosInput) cantidadPollosInput.addEventListener("input", actualizarTodo);
    if (dosisNucleoInput) dosisNucleoInput.addEventListener("input", actualizarTodo);
    if (dosisVitaminasInput) dosisVitaminasInput.addEventListener("input", actualizarTodo);

    if (volverBtn) volverBtn.addEventListener("click", volverMenu);
    if (nuevoBtn) nuevoBtn.addEventListener("click", () => limpiarFormulario());
    if (exportarPDFBtn) exportarPDFBtn.addEventListener("click", () => generarPDF());
    if (exportarJPGBtn) exportarJPGBtn.addEventListener("click", () => exportarJPG());

    function actualizarTablaConsumoFinal(genero) {
        const tablaBody = document.querySelector("#tablaConsumoFinal tbody");
        tablaBody.innerHTML = "";

        let cantidadPollos = parseInt(cantidadPollosInput.value) || 0;
        const consumoDatos = genero === "Macho" ? consumoMachos : consumoHembras;
        const semanas = consumoDatos.length;

        let consumoAcumuladoGramos = 0;

        for (let i = 0; i < semanas; i++) {
            let fila = `<tr><td>${i + 1}</td>`;
            let totalSemana = 0;

            consumoDatos[i].forEach(valor => {
                let consumoTotal = valor * cantidadPollos;
                totalSemana += consumoTotal;
                fila += `<td>${consumoTotal}</td>`;
            });

            consumoAcumuladoGramos += totalSemana;
            let consumoAcumuladoKg = (consumoAcumuladoGramos / 1000).toFixed(3);

            fila += `<td><b>${totalSemana} g</b></td>`;
            fila += `<td><b>${consumoAcumuladoGramos} g</b></td>`;
            fila += `<td><b style="color: #00796B;">${consumoAcumuladoKg} kg</b></td>`;
            fila += `</tr>`;

            tablaBody.innerHTML += fila;
        }
    }

    function actualizarTablaConsumoGramos(genero) {
        const tablaBody = document.querySelector("#tablaConsumoGramos tbody");
        tablaBody.innerHTML = "";

        const consumoDatos = genero === "Macho" ? consumoMachos : consumoHembras;
        const semanas = consumoDatos.length;

        let consumoAcumulado = 0;

        for (let i = 0; i < semanas; i++) {
            let fila = `<tr><td>${i + 1}</td>`;
            let totalSemana = 0;

            consumoDatos[i].forEach(valor => {
                totalSemana += valor;
                fila += `<td>${valor}</td>`;
            });

            consumoAcumulado += totalSemana;
            let consumoAcumuladoKg = (consumoAcumulado / 1000).toFixed(3);

            fila += `<td><b>${totalSemana} g</b></td>`;
            fila += `<td><b>${consumoAcumulado} g</b></td>`;
            fila += `<td><b style="color: #00796B;">${consumoAcumuladoKg} kg</b></td>`;
            fila += `</tr>`;

            tablaBody.innerHTML += fila;
        }
    }

    function limpiarFormulario() {
        cantidadPollosInput.value = "";
        dosisNucleoInput.value = "";
        dosisVitaminasInput.value = "";
        tablaBody.innerHTML = "";
    }

    // Datos base de consumo en gramos
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
});
