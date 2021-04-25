class Errores{
        constructor(){
            this.tablaErrores = new Map();
        }
    // variables y de todos los simbolos
        addErrores(_s, _simbolo){
            this.tablaErrores.set(_s.toLowerCase(), _simbolo)
        }
    
        getErrores(_s){ 
                var encontrado = e.tablaErrores.get(_s.toLowerCase()) 
                if(encontrado!=null){
                    return encontrado
                }
            
            return null
        }
        
}

module.exports = Errores