function seleccionarAnimal(animal) {

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
    }, 500); //Efecto barrido

} else {
        alert("🚧 Esta funcionalidad está en desarrollo. ¡Próximamente disponible! 🚀");
    }

}


function volverMenu() {
    let simulacion = document.getElementById("simulacionPollo");
    let menuPrincipal = document.getElementById("menuPrincipal");

    console.log("Ocultando simulación...");
    simulacion.classList.remove("show");
    simulacion.classList.add("hidden");

    setTimeout(() => {
        console.log("Mostrando menú principal...");
        simulacion.style.display = "none"; //  Se oculta completamente
        menuPrincipal.classList.remove("hidden");
        menuPrincipal.classList.add("show");
        menuPrincipal.style.display = "flex";

        //  Se asegura que esté bien centrado
        menuPrincipal.style.justifyContent = "center";
        menuPrincipal.style.alignItems = "center";
    }, 500);
}





document.addEventListener("DOMContentLoaded", function () {
    const generoRadios = document.querySelectorAll("input[name='genero']");
    const buttonContainer = document.querySelector(".button-container");
    const tablaBody = document.querySelector("#tablaProduccion tbody");
    const tablaGramosBody = document.querySelector("#tablaGramos tbody");
    const tituloTabla = document.getElementById("tituloTablaGramos");
    const cantidadPollosInput = document.getElementById("cantidadMachos");
    const dosisNucleoInput = document.getElementById("dosisNucleo");
    const dosisVitaminasInput = document.getElementById("dosisVitaminas");

    //  Verifica si los elementos existen antes de agregar eventos
    if (generoRadios.length > 0) {
        generoRadios.forEach(radio => {
            radio.addEventListener("change", function () {
                actualizarTabla(this.value);
                actualizarTablaGramos(this.value); // 🔥 Actualizar tabla de gramos
                if (document.querySelector("input[name='genero']:checked")) {
                    buttonContainer.style.display = "flex"; // 🔥 Mostrar botones si hay selección
                }
            });
        });
    } else {
        console.error("⚠️ No se encontraron los radio buttons de género.");
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

    function actualizarTablaGramos(genero) {
        tablaGramosBody.innerHTML = ""; // Limpiar tabla
        let datos = genero === "Macho" ? consumoGramosMacho : consumoGramosHembra;
        tituloTabla.textContent = genero === "Macho" ? "Consumo Tabla Gramos Machos" : "Consumo Tabla Gramos Hembras";

        datos.forEach(fila => {
            let row = "<tr>";
            fila.forEach(valor => {
                row += `<td>${valor}</td>`;
            });
            row += "</tr>";
            tablaGramosBody.innerHTML += row;
        });
    }

    // Datos de consumo en gramos por semana
    const consumoGramosMacho = [
        [1, 13, 17, 21, 23, 27, 31, 35, 167, 167],
        [2, 39, 44, 49, 54, 59, 64, 70, 379, 546],
        [3, 77, 83, 90, 97, 104, 112, 119, 682, 1228],
        [4, 124, 130, 136, 142, 148, 154, 160, 994, 2222],
        [5, 165, 171, 177, 184, 192, 200, 209, 1298, 3520],
        [6, 212, 215, 218, 221, 225, 229, 233, 1553, 5073]
    ];

    const consumoGramosHembra = [
        [1, 13, 17, 21, 23, 27, 31, 35, 167, 167],
        [2, 37, 44, 47, 54, 57, 63, 68, 370, 537],
        [3, 73, 79, 84, 89, 92, 98, 103, 618, 1155],
        [4, 111, 116, 124, 126, 134, 142, 144, 897, 2052],
        [5, 151, 155, 161, 163, 165, 167, 169, 1131, 3183],
        [6, 175, 179, 184, 189, 193, 197, 199, 1316, 4499],
        [7, 203, 203, 205, 204, 207, 208, 209, 1439, 5938],
        [8, 225, 225, 225, 225, 225, 225, 225, 1575, 7513]
    ];
});


    function limpiarFormulario() {
        cantidadPollosInput.value = "";
        dosisNucleoInput.value = "";
        dosisVitaminasInput.value = "";
        tablaBody.innerHTML = "";
    }

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "landscape" }); //  Cambia la orientación a horizontal

 
    //  Configurar título centrado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Simulación de Consumo", doc.internal.pageSize.width / 2, 25, { align: "center" });

let yPos = 30; //  Empezamos en 30 para que no haya un salto innecesario

    //  Agregar información debajo del título
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Cantidad de pollos: ${cantidadPollosInput.value} (${document.querySelector("input[name='genero']:checked")?.value})`, 10, yPos);
yPos += 4;    
doc.text(`Dosis Núcleo: ${dosisNucleoInput.value} kg/t`, 10, yPos);
yPos += 4;
    doc.text(`Dosis Premezcla Vitaminas: ${dosisVitaminasInput.value} kg/t`, 10, yPos);
yPos += 4;

    //  Aplicar color de encabezado (verde similar al de la tabla)
    doc.setFillColor(0, 77, 0); // Verde oscuro
    doc.rect(10, 65, doc.internal.pageSize.width - 20, 10, "F"); //  Barra verde como encabezado

    //  Crear tabla con jsPDF-AutoTable
   doc.autoTable({
    html: "#tablaProduccion",
    startY: yPos + 15,
    styles: { 
        font: "helvetica", 
        fontSize: 10,
        cellPadding: 3
    }, 
    headStyles: { 
        fillColor: [0, 77, 0], //  Fondo verde para encabezado
        textColor: 255, 
        fontStyle: "bold", 
        halign: "center"
    }, 
    columnStyles: { 
        0: { cellWidth: 15, halign: "center" },  // Semana
        1: { cellWidth: 25, halign: "center" },  // Fase
        2: { cellWidth: 15, halign: "center" },  // Días
        3: { cellWidth: "auto", halign: "center" }, //  Consumo Acumulado
        4: { cellWidth: "auto", halign: "center" }, //  Consumo/Lote
        5: { cellWidth: "auto", halign: "center" }, //  Kg de Núcleo DISAGRO
        6: { cellWidth: "auto", halign: "center" }, //  Bolsas de 20Kg Núcleo DISAGRO
        7: { cellWidth: "auto", halign: "center" }, //  Kg de Premezcla Vitaminas DISAGRO
        8: { cellWidth: "auto", halign: "center" }  //  Bolsas de 20Kg Premezcla Vitaminas DISAGRO
    }, 


    margin: { left: 10, right: 10 }
});


    //  Agregar "DISAGRO, Guatemala" al final
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Equipo de Nutrición Animal, DISAGRO.", 10, doc.internal.pageSize.height - 10);

    //  Guardar el PDF
    doc.save("Simulacion_Consumo.pdf");
}

function exportarJPG() {
    let contenedor = document.getElementById("contenedorJPG");

    // Verificar si el contenedor existe
    if (!contenedor) {
        console.error("⚠️ Error: No se encontró el contenedor JPG en el HTML.");
        return;
    }

    //  Rellenar la información con los datos del usuario
    document.getElementById("jpgCantidadPollos").textContent = document.getElementById("cantidadMachos").value || "0";
    document.getElementById("jpgGenero").textContent = document.querySelector("input[name='genero']:checked")?.value || "Macho";
    document.getElementById("jpgDosisNucleo").textContent = document.getElementById("dosisNucleo").value || "0";
    document.getElementById("jpgDosisVitaminas").textContent = document.getElementById("dosisVitaminas").value || "0";

    //  Copiar la tabla dentro del contenedorJPG
    let tablaOriginal = document.getElementById("tablaProduccion").cloneNode(true);
    tablaOriginal.removeAttribute("id"); // Evita conflictos de ID duplicados
    tablaOriginal.style.width = "100%"; // Ajustamos el tamaño para que encaje bien
    tablaOriginal.style.borderCollapse = "collapse";
    tablaOriginal.style.fontSize = "14px";

    let tablaJPG = document.getElementById("tablaJPG");
    tablaJPG.innerHTML = ""; // Limpiar antes de agregar la tabla
    tablaJPG.appendChild(tablaOriginal);

    //  Mostrar temporalmente el contenedor para la captura
    contenedor.style.display = "block";

    html2canvas(contenedor, {
        scale: 3, //  Mejora la calidad
        backgroundColor: "white",
        useCORS: true
    }).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg", 1.0);
        link.download = "Simulacion_Consumo.jpg";
        link.click();

        //  Ocultar el contenedor nuevamente después de generar la imagen
        contenedor.style.display = "none";
    }).catch(error => {
        console.error("⚠️ Error al generar la imagen:", error);
    });
}

});
