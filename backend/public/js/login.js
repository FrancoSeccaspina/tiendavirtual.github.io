window.addEventListener('load', function() {

    const createError = function(idElemento, msj) {
        if(document.getElementById(idElemento) == null) {
            let listaErrores = document.querySelector('#erroresLogin')
            let mensaje = document.createElement("li")
            mensaje.id = idElemento
            mensaje.innerHTML = msj
            listaErrores.appendChild(mensaje)
            if(listaErrores.childElementCount == 1) {
                listaErrores.classList.remove("errorOculto")
                listaErrores.classList.add("mensajeError")
            }
        }
    }
        
    const deleteSpan = function(idElemento) {
        if(document.getElementById(idElemento) != null) {
            document.getElementById(idElemento).remove();
            let listaErrores = document.querySelector("#erroresLogin")
            if(listaErrores.childElementCount == 0) {
                listaErrores.classList.add("errorOculto")
                listaErrores.classList.remove("mensajeError")
            }
        }
    }    

    const validarLogin = (login) => {
        console.log('Estoy validando el Login')
        let valor = validator.trim(login.value)
        if(validator.isEmpty(valor) || !validator.isEmail(valor)) {
            login.style.background = 'var(--msjError)'
            createError("errorUsuario", 'El correo electronico es requerido y debe ser valido')
            return false
        }else{
            login.style.background = 'var(--sinError)'
            deleteSpan("errorUsuario")
            return true
        }
    } 
    
    const validarPassword = (psw) => {
        let valor = validator.trim(psw.value)
        if(validator.isEmpty(valor)) {
            psw.style.background = 'var(--msjError)'
            createError("errorClave", 'La clave es obligatoria')
            return false
        }else{
            psw.style.background = 'var(--sinError)'
            deleteSpan("errorClave")
            return true
        }
    }

    document.querySelector("#usuario").addEventListener('change', e => { validarLogin(e.target) })

    document.querySelector("#password").addEventListener('change', e => { console.log('Estoy haciendo cambios en la psw') 
        validarPassword(e.target) 
    })

    let formulario = document.querySelector('form')

    formulario.addEventListener("submit", function(e) {

        console.log('Estoy en el evento del submit')
        e.preventDefault();  
        let errores = 0
        
        console.log('empecè')
        erroresLogin
        if(!validarLogin(document.querySelector("#usuario"))) {
            console.log('ingreso')
            errores++
        }
        
        let password = document.querySelector("#password")
        
        if(!validarPassword(password)) {
            console.log('passw')
            errores++
        }
        
        if(errores == 0){
            e.target.submit()
        }
    })
})