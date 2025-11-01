window.onload = () => {
    let txtName = document.getElementById("nombre")
    let nombreCliente = document.getElementById("nombreCliente")
    let form = document.querySelector("#form")
    let arr = []

    let tablaPrecios = [
        { id: 1, material: "Acero inoxidable", precio: 2000.50 },
        { id: 2, material: "Plástico ABS", precio: 10.00 },
        { id: 3, material: "Aluminio", precio: 30.00 },
        { id: 4, material: "Cobre", precio: 3000.20 }
    ]

    txtName.addEventListener("keyup", () => {
        nombreCliente.innerHTML = "Nombre del Cliente: " + txtName.value
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault() //Evita que se recargue la página
        let material = document.getElementById("material")
        let cantidad = document.getElementById("cantidad")
        let fecha = document.getElementById("fecha")
        let observaciones = document.getElementById("observaciones")
        if (txtName.value === "") {
            alert("Por favor, complete el nombre del solicitante.")
            return
        }
        if (material.value === "") {
            alert("Por favor, complete el material.")
            return
        }
        if (cantidad.value === "" || cantidad.value <= 0) {
            alert("Por favor, ingrese una cantidad válida.")
            return
        }
        if (fecha.value === "") {
            alert("Por favor, seleccione una fecha.")
            return
        }

        let precio = tablaPrecios.find(item => item.material === material.value)

        arr.push({
            id: arr.length + 1,
            material: material.value,
            cantidad: cantidad.value,
            fecha: fecha.value,
            observaciones: observaciones.value,
            subtotal: (precio.precio * parseInt(cantidad.value))
        })
        imprimirTabla()
        localStorage.setItem("pedido", JSON.stringify(arr))
    })
    const imprimirTabla = () => {
        var trs = ''
        var total = 0

        arr.forEach(item => {
            total += item.subtotal
            trs += `<tr>
                        <td>${item.id}</td>
                        <td>${item.material}</td>
                        <td><input type="number" value="${item.cantidad}" /></td>
                        <td>${item.fecha}</td>
                        <td>${item.observaciones}</td>
                        <td>$${item.subtotal.toFixed(2)}</td>
                    </tr>`
        })
        document.querySelector("tbody").innerHTML = trs
        document.querySelector("#tdTotal").innerHTML = `<b>$${total.toFixed(2)}</b>`
    }
    if (localStorage.getItem("pedido")) {
        arr = JSON.parse(localStorage.getItem("pedido"))
        imprimirTabla()
    }
}