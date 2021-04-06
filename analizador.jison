

/* GRMATICA LEXICA */
%lex
%%

\s+                   /* skip whitespace */
// TIPO DE DATOS
"int"                   return 'int'
"Double"                return 'Double'
"Boolean"               return 'Boolean'
"Char"                  return 'Char'
"String"                return 'String'
// OPERADORES RELACIONALES
"=="                   return 'igualacion'
"!="                   return 'diferenciacion'
"<"                   return 'menor'
"<="                   return 'menorigual'
">"                   return 'mayor'
">="                   return 'mayorigual'
// OPERADOR TERNARIO
"?"                   return 'interrogacion'
":"                   return 'dospuntos'
// OPERADORES LOGICOS
"||"                   return 'or'
"&&"                   return 'and'
"!"                   return 'not'
// SIGNOS DE AGRUPACION
"("                   return 'parenA'
")"                   return 'parenC'
//OPERADORES ARITMETICOS
"-"                   return 'resta'
"+"                   return 'suma'
"*"                   return 'multi'
"/"                   return 'division'
"^"                   return 'potencia'
"%"                   return 'modulo'

","                   return 'coma'
";"                   return 'ptcoma'
"{"                   return 'llaveA'
"}"                   return 'llaveC'

//identificadores
[0-9]+("."[0-9]+)?\b            return 'numero'
([a-zA-Z])([a-zA-Z0-9_])*       return 'identificador'
["\""]([^"\""])*["\""]          return 'string'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* PRECEDENCIA DE OPERACIONES */

%left 'or'
%left 'and'
%right 'not'
%left 'igualacion' 'diferenciacion' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'suma' 'resta'
%left 'multi' 'division' 'modulo'
%left 'potencia'
%right resta

%start INICIO

%% /* GRAMATICA */

INICIO: clase identificador llaveA OPCIONESCUERPO llaveC EOF
;

OPCIONESCUERPO: CUERPO OPCIONESCUERPO
              | CUERPO
;

CUERPO: DEC_VAR
      | DEC_MET
;

DEC_VAR: TIPO identificador ptcoma
       | TIPO identificador menor menos EXPRESION ptcoma
;

TIPO: decimal
    | cadena
    | bandera
;


EXPRESION: EXPRESION suma EXPRESION
         | EXPRESION menos EXPRESION
         | EXPRESION multi EXPRESION
         | EXPRESION div EXPRESION
         | EXPRESION exponente EXPRESION
         | EXPRESION modulo EXPRESION
         | menos EXPRESION %prec umenos
         | parA EXPRESION parC
         | EXPRESION igualigual EXPRESION
         | NUMBER
         | true
         | false
         | string
         | identificador
;

DEC_MET : identificador parA parC llaveA OPCIONESMETODO llaveC
        | identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC
;

LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS
               | PARAMETROS
;

PARAMETROS: TIPO identificador
;

OPCIONESMETODO: CUERPOMETODO OPCIONESMETODO
              | CUERPOMETODO
;

CUERPOMETODO: DEC_VAR
            | IMPRIMIR
            | WHILE
;

IMPRIMIR: cout menor menor EXPRESION ptcoma
;

WHILE: while parA EXPRESION parC llaveA CUERPOMETODO llaveC
;