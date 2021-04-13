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
"="                    return 'signoigual'
"=="                    return 'igualacion'
"!="                    return 'diferenciacion'
"<"                     return 'menor'
"<="                    return 'menorigual'
">"                     return 'mayor'
">="                    return 'mayorigual'
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
        | exec identificador parenA parenC ptcoma {$$ = $1;}
        | exec identificador parenA LISTAPARAMETROS parenC ptcoma {$$ = $1;}
;

//METODOS Y FUNCIONES
METFUNC:TIPO identificador parenA parenC llaveA OPCIONESCUERPO llaveC {$$ = $6;}
        |TIPO identificador parenA LISTAPARAMETROS parenC llaveA OPCIONESCUERPO llaveC {$$ = $7;}
        |void identificador parenA parenC llaveA OPCIONESCUERPO llaveC {$$ = $6;}
        |void identificador parenA LISTAPARAMETROS parenC llaveA OPCIONESCUERPO llaveC {$$ = $7;}
;

LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS
                | PARAMETROS
;
PARAMETROS: TIPO identificador
;

OPCIONESCUERPO: OPCIONESCUERPO CUERPOMETFUNC
                | CUERPOMETFUNC 
;

CUERPOMETFUNC: DEC_VAR 
        | CICLOS
        | SENTENCIATRANS
        | FUNCIONES
        | CAMBIARVALOR_VAR
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


DEC_VAR: TIPO identificador ptcoma 
        | TIPO identificador signoigual EXPRESION ptcoma 
;
CAMBIARVALOR_VAR: identificador signoigual EXPRESION ptcoma
;

TIPO: Double {$$ = TIPO_DATO.DECIMAL}
        | String {$$ = TIPO_DATO.CADENA}
        | Boolean {$$ = TIPO_DATO.BANDERA}
        | int {$$ = TIPO_DATO.ENTERO}
        | Char {$$ = TIPO_DATO.CADENA}
;

IMPRIMIR: print parenA EXPRESION parenC ptcoma { $$ = new INSTRUCCION.nuevoPRINT($3, this._$.first_line, (this._$.first_column+1))}
;

WHILEC: while parenA EXPRESION parenC llaveA OPCIONESCUERPO llaveC
;


EXPRESION: EXPRESION suma EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.SUMA, this._$.first_line, (this._$.first_column+1))}
        | EXPRESION resta EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.RESTA, this._$.first_line, (this._$.first_column+1))}
        | EXPRESION multi EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.MULTIPLICACION, this._$.first_line, (this._$.first_column+1))}
        | EXPRESION division EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.DIVISION, this._$.first_line, (this._$.first_column+1))}
        | EXPRESION exponente EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.POTENCIA, this._$.first_line, (this._$.first_column+1))}
        | EXPRESION modulo EXPRESION
        | resta EXPRESION %prec umenos
        | parenA EXPRESION parenC
        | EXPRESION igualacion EXPRESION
        | EXPRESION diferenciacion EXPRESION
        | EXPRESION menor EXPRESION
        | EXPRESION menorigual EXPRESION
        | EXPRESION mayor EXPRESION
        | EXPRESION mayorigual EXPRESION
        | EXPRESION or EXPRESION
        | EXPRESION and EXPRESION
        | not EXPRESION
        | entero {$$ = INSTRUCCION.nuevoVALOR( Number($1), TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1))}
        | true {$$ = INSTRUCCION.nuevoVALOR( Boolean($1), TIPO_VALOR.BANDERA, this._$.first_line, (this._$.first_column+1))}
        | false {$$ = INSTRUCCION.nuevoVALOR( Boolean($1), TIPO_VALOR.BANDERA,this._$.first_line, (this._$.first_column+1))}
        | cadenatexto {$$ = INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.CADENA, this._$.first_line, (this._$.first_column+1))}
        | identificador {$$ = INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1))}
        | decimal {$$ = INSTRUCCION.nuevoVALOR(Number($1), TIPO_VALOR.DECIMAL,this._$.first_line, (this._$.first_column+1))}
;
