/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%options case-insensitive

%%

\s+                   /* skip whitespace */
"//".*							// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]                     // comentario multiple líneas
// TIPO DE DATOS
"int"                   return 'int'
"Double"                return 'Double'
"Boolean"               return 'Boolean'
"Char"                  return 'Char'
"String"                return 'String'
"true"                  return 'true'
"false"                return 'false'
//CICLOS
"if"                        return 'if'
"else"                      return 'else'
"switch"                    return 'switch'
"case"                      return 'case'
"default"                   return 'default'
"break"                     return 'break'
"while"                     return 'while'
"for"                       return 'for'
"do"                        return 'do'
"continue"                  return 'continue'
"return"                    return 'return'
//METODOS Y FUNCIONES
"void"                     return 'void'
"print"                    return 'print'
"toLower"                  return 'toLower'
"toUpper"                  return 'toUpper'
"length"                   return 'length'
"truncate"                 return 'truncate'
"round"                    return 'round'
"typeof"                   return 'typeof'
"toString"                 return 'tostring'
"toCharArray"              return 'tochararray'
"exec"                     return 'exec'
// OPERADORES RELACIONALES
"=="                    return 'igualacion'
"="                    return 'signoigual'
"!="                    return 'diferenciacion'
"<="                    return 'menorigual'
"<"                     return 'menor'
">="                    return 'mayorigual'
">"                     return 'mayor'
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
"^"                   return 'exponente'
"-"                   return 'resta'
"+"                   return 'suma'
"*"                   return 'multi'
"/"                   return 'division'
"%"                   return 'modulo'
//CARACTERES DE FINALIZACION O ENCAPSULAMIENTO
";"                   return 'ptcoma'
"{"                   return 'llaveA'
"}"                   return 'llaveC'
// VECTOR
"["                   return 'corcheteA'
"]"                   return 'corcheteC'
","                   return 'coma'
//identificadores
[0-9]+("."[0-9]+)\b  	        return 'decimal';
[0-9]+\b			return 'entero';
([a-zA-Z])([a-zA-Z0-9_])*       return 'identificador'
["\""]([^"\""])*["\""]          return 'cadenatexto'
["\'"]([^"\'"])*["\'"]          return 'caracter'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex
%{
	const TIPO_OPERACION	= require('./controller/Enums/TipoOperacion');
	const TIPO_VALOR 	= require('./controller/Enums/TipoValor');
	const TIPO_DATO		= require('./controller/Enums/TipoDato'); 
	const INSTRUCCION	= require('./controller/Instruccion/Instruccion');
%}

/* PRECEDENCIA DE OPERACIONES */
%left 'or'
%left 'and'
%right 'not'
%left 'igualacion' 'diferenciacion' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'suma' 'resta'
%left 'multi' 'division' 'modulo'
%left 'exponente'
%left 'parenA' 'parenC'
%left umenos

%start INICIO

%% /* GRAMATICA */
//CLASE 
INICIO: OPCUERPO  EOF{return $1;}
;

OPCUERPO: OPCUERPO CUERPO {$1.push($2); $$ = $1;} 
        | CUERPO {$$ = [$1];}
;

CUERPO: DEC_VAR {$$ = $1;}
        |METFUNC {$$ = $1;}
        | exec identificador parenA parenC ptcoma {$$ = INSTRUCCION.Exec($2, null,this._$.first_line, (this._$.first_column+1));}
        | exec identificador parenA EXPRESION parenC ptcoma {$$ = INSTRUCCION.Exec($2, $4,this._$.first_line, (this._$.first_column+1));}
;

//METODOS Y FUNCIONES
METFUNC:TIPO identificador parenA parenC llaveA OPCIONESCUERPO llaveC {$$ = INSTRUCCION.nuevaFUNCION($2, null, $6, this._$.first_line, (this._$.first_column+1));}
        |TIPO identificador parenA LISTAPARAMETROS parenC llaveA OPCIONESCUERPO llaveC {$$ = INSTRUCCION.nuevaFUNCION($2, $4, $7, this._$.first_line, (this._$.first_column+1));}
        |void identificador parenA parenC llaveA OPCIONESCUERPO llaveC {$$ = INSTRUCCION.nuevaMETODO($2, null, $6 , this._$.first_line,(this._$.first_column+1));}
        |void identificador parenA LISTAPARAMETROS parenC llaveA OPCIONESCUERPO llaveC {$$ = INSTRUCCION.nuevaMETODO($2, $4, $7, this._$.first_line, (this._$.first_column+1));}
;


LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS {$1.push($2); $$ = $1;} 
                | PARAMETROS {$$ = [$1];}
;
PARAMETROS: TIPO identificador {$$ = INSTRUCCION.nuevaPARAMETRO($2,$1, this._$.first_line, (this._$.first_column+1));}
;
LISTAEXPRESION:LISTAEXPRESION coma EXPRESION {$1.push($2); $$ = $1;} 
                | EXPRESION {$$ = [$1];}
;
OPCIONESCUERPO: OPCIONESCUERPO CUERPOMETFUNC {$1.push($2); $$ = $1;} 
                | CUERPOMETFUNC {$$ = [$1];}
;

CUERPOMETFUNC: DEC_VAR {$$ = $1;}
        | CICLOS {$$ = $1;}
        | SENTENCIATRANS {$$ = $1;}
        | FUNCIONES {$$ = $1;}
        | CAMBIARVALOR_VAR {$$ = $1;}
        | LLAMADA  {$$=$1;}
        | INCRE_DECRE {$$=$1;}
;

INCRE_DECRE: identificador suma suma ptcoma {$$ = INSTRUCCION.nuevaASIGNACION($1, INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1)),INSTRUCCION.nuevoVALOR( 1, TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1)),TIPO_OPERACION.SUMA, this._$.first_line, (this._$.first_column+1)), this._$.first_line, (this._$.first_column+1));}
        | identificador resta resta ptcoma {$$ = INSTRUCCION.nuevaASIGNACION($1, INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1)),INSTRUCCION.nuevoVALOR( 1, TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1)),TIPO_OPERACION.RESTA, this._$.first_line, (this._$.first_column+1)), this._$.first_line, (this._$.first_column+1));}
;

LLAMADA: identificador parenA EXPRESION parenC ptcoma{$$ = INSTRUCCION.Llamadas($1, $3,this._$.first_line, (this._$.first_column+1));}
        |identificador parenA parenC ptcoma{$$ = INSTRUCCION.Llamadas($1, null,this._$.first_line, (this._$.first_column+1));}
;

FUNCIONES: IMPRIMIR {$$ = $1;}
        | toLower parenA cadenatexto parenC ptcoma
        | toUpper parenA cadenatexto parenC ptcoma
;

CICLOS: WHILEC
        |IFC
        |FORC
        |SWITCHC
        |DOC
;

SENTENCIATRANS: break
        |continue
        |return
;


DEC_VAR: TIPO identificador ptcoma {$$ = INSTRUCCION.nuevaDECLARACION($2, null, $1, this._$.first_line, (this._$.first_column+1));}
        | TIPO identificador signoigual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaDECLARACION($2, $4, $1, this._$.first_line, (this._$.first_column+1));}
;

CAMBIARVALOR_VAR: identificador signoigual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaASIGNACION($1, $3, this._$.first_line, (this._$.first_column+1));}
;

TIPO: Double {$$ = TIPO_DATO.DECIMAL}
        | String {$$ = TIPO_DATO.CADENA}
        | Boolean {$$ = TIPO_DATO.BANDERA}
        | int {$$ = TIPO_DATO.ENTERO}
        | Char {$$ = TIPO_DATO.CARACTER}
;

IMPRIMIR: print parenA EXPRESION parenC ptcoma { $$ = new INSTRUCCION.nuevoPRINT($3, this._$.first_line, (this._$.first_column+1));}
;

WHILEC: while parenA EXPRESION parenC llaveA OPCIONESCUERPO llaveC {$$ = new INSTRUCCION.nuevoWhile($3, $6 , this._$.first_line,(this._$.first_column+1));}
;


EXPRESION: EXPRESION suma EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.SUMA, this._$.first_line, (this._$.first_column+1));}
        | EXPRESION resta EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.RESTA, this._$.first_line, (this._$.first_column+1));}
        | EXPRESION multi EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.MULTIPLICACION, this._$.first_line, (this._$.first_column+1));}
        | EXPRESION division EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.DIVISION, this._$.first_line, (this._$.first_column+1));}
        | EXPRESION exponente EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.POTENCIA, this._$.first_line, (this._$.first_column+1));}
        | EXPRESION modulo EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.MODULO, this._$.first_line, (this._$.first_column+1));}
        | resta EXPRESION %prec umenos {$$ = INSTRUCCION.nuevaOperacionBinaria($2,$2,TIPO_OPERACION.NEGACION, this._$.first_line, (this._$.first_column+1));}
        | parenA EXPRESION parenC {$$=$2}
        | EXPRESION igualacion EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line,this._$.first_column+1);}
        | EXPRESION diferenciacion EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line,this._$.first_column+1);}
        | EXPRESION menor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line,this._$.first_column+1);}
        | EXPRESION menorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line,this._$.first_column+1);}
        | EXPRESION mayor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line,this._$.first_column+1);}
        | EXPRESION mayorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line,this._$.first_column+1);}
        | EXPRESION or EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line,this._$.first_column+1);}
        | EXPRESION and EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line,this._$.first_column+1);}
        | not EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($2,$2, TIPO_OPERACION.NOT,this._$.first_line,this._$.first_column+1);}
        | entero {$$ = INSTRUCCION.nuevoVALOR( Number($1), TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1));}
        | true {$$ = INSTRUCCION.nuevoVALOR( Boolean($1), TIPO_VALOR.BANDERA, this._$.first_line, (this._$.first_column+1));}
        | false {$$ = INSTRUCCION.nuevoVALOR( Boolean($1), TIPO_VALOR.BANDERA,this._$.first_line, (this._$.first_column+1));}
        | cadenatexto {$$ = INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.CADENA, this._$.first_line, (this._$.first_column+1));}
        | identificador {$$ = INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1));}
        | decimal {$$ = INSTRUCCION.nuevoVALOR(Number($1), TIPO_VALOR.DECIMAL,this._$.first_line, (this._$.first_column+1));}
        |caracter {$$ = INSTRUCCION.nuevoVALOR(Number($1), TIPO_VALOR.CARACTER,this._$.first_line, (this._$.first_column+1));}
;
