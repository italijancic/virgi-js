const mostrarMensaje = () => {
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Su compra fue exitosa',
        showConfirmButton: false,
        timer: 1500
      })
}

document.getElementById("checkout-btn").onclick =mostrarMensaje;
