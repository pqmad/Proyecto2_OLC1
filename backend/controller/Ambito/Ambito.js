class Ambito{
    constructor(_anterior){
        this.anterior = _anterior
        
        this.tablaSimbolos = new Map();
        this.tablaMetodos = new Map();
    }
// variables y de todos los simbolos
    addSimbolo(_s, _simbolo){
        this.tablaSimbolos.set(_s.toLowerCase(), _simbolo)
    }

    getSimbolo(_s){ 
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase()) 
            /*console.log("***********************************")
            console.log(_s)
            console.log(encontrado)
            console.log("***********************************")*/
            if(encontrado!=null){
                return encontrado
            }
        }
        return null
    }
    
    existeSimbolo(_s){
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase())
            if(encontrado!=null){
                return true
            }
        }
        return false
    }
    existeSimbolodecla(_s){
            var encontrado = this.tablaSimbolos.get(_s.toLowerCase())
            if(encontrado!=null){
                return true
            }
        return false
    }
    actualizar(_s, _simbolo){
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase());
            if(encontrado!=null){
                e.tablaSimbolos.set(_s, _simbolo)
                return true;
            }
        }
        return false
    }
// metodos
    addMetodo(_s, _metodo){
        this.tablaMetodos.set(_s.toLowerCase(), _metodo)
    }

    getMetodo(_s){ //(hola, clase simbolo)
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaMetodos.get(_s.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return encontrado
            }
        }
        return null
    }

    existeMetodo(_s){
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaMetodos.get(_s.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return true
            }
        }
        return false
    }

    actualizarMetodo(_s, _metodo){
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaMetodos.get(_s.toLowerCase());
            if(encontrado!=null){
                e.tablaMetodos.set(_s, _metodo)
                return true;
            }
        }
        return false
    }
}

module.exports = Ambito