const TIPO_INSTRUCCION = {
    PRINT: 'INST_PRINT',
    DECLARACION: 'INST_DECLARACION',
    ASIGNACION: 'INST_ASIGNACION',
    EJECUTAR : 'INST_EJECUTAR',//PARA EXEC
    DECLARACION_M: "INST_DECLARACION_METODO",
    DECLARACION_F: "INST_DECLARACION_FUNCION",
    EXEC: "INST_EXEC",
    LLAMADA: "INST_LLAMADA",
    WHILE: "INST_WHILE",
    FOR: "INST_FOR",
    IF: "INST_IF",
    ELSE: "INST_ELSE",
    ELSEIF: "INST_ELSE-IF"
}

module.exports = TIPO_INSTRUCCION