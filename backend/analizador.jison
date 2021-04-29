/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%{
        var cadena="";
%}
%lex

%options case-insensitive
%x string


%%

\s+                   /* skip whitespace */
"//".*							// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]                     // comentario multiple líneas
// TIPO DE DATOS
"new"                   return 'nnew'
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
"++"                   return 'masmas'
"--"                   return 'menosmenos'
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


["]                          {cadena="";this.begin("string");}
<string>[^"\\]+                 {cadena+=yytext;}
<string>"\\\""                  {cadena+="\"";}
<string>"\\n"                  {cadena+="\n";}
<string>\s                  {cadena+=" ";}
<string>"\\t"                  {cadena+="\t";}
<string>"\\\\"                  {cadena+="\\";}
<string>"\\\'"                  {cadena+="\'";}
<string>["]                  {yytext=cadena; this.popState(); return 'cadenatexto';}
["\'"]([^"\'"])?["\'"]          return 'caracter'
<<EOF>>               return 'EOF'
.                     {var nuevo=new ERRORES(TIPO_ERROR.LEXICO,"Caracter invalido: "+yytext,yylloc.first_line,yylloc.first_column+1);lista_Errores.push(nuevo);}

/lex
%{
        var lista_Errores=[];
	const TIPO_OPERACION	= require('./controller/Enums/TipoOperacion'); 
	const TIPO_VALOR 	= require('./controller/Enums/TipoValor');
	const TIPO_DATO		= require('./controller/Enums/TipoDato');
        const TIPO_ERROR        = require('./controller/Enums/Tipo_Error');
        const ERRORES            = require("./controller/Ambito/S_Error")
	const INSTRUCCION	= require('./controller/Instruccion/Instruccion');
%}

/* PRECEDENCIA DE OPERACIONES */
%left 'interrogacion'
%left 'or'
%left 'and'
%right 'not'
%left 'igualacion' 'diferenciacion' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'suma' 'resta' 'masmas' 'menosmenos'
%left 'multi' 'division' 'modulo'
%left 'exponente'
%left 'parenA' 'parenC'
%left umenos


%start INICIO

%% /* GRAMATICA */
//CLASE 
INICIO: OPINICIO  EOF{var a={'errores':lista_Errores,'arbol':$1}; lista_Errores=[]; return a;}
;

//---------------------------------GLOBAL
OPINICIO: OPINICIO CUERPO {$1.push($2); $$ = $1;} 
        | CUERPO {$$ = [$1];}
;
CUERPO: DEC_VAR                                                         {$$ = $1;}
        |METFUNC                                                        {$$ = $1;}
        | CAMBIARVALOR_VAR                                              {$$ = $1;}
        | exec identificador parenA parenC ptcoma                       {$$ = INSTRUCCION.Exec($2, null,this._$.first_line, (this._$.first_column+1));}
        | exec identificador parenA LISTA_VALORES parenC ptcoma         {$$ = INSTRUCCION.Exec($2, $4,this._$.first_line, (this._$.first_column+1));}
        | error ptcoma {$$ = ""; var nuevo=new ERRORES(TIPO_ERROR.SINTACTICO,"Falto un \";\",Error recuperado: "+yytext,this._$.first_line, (this._$.first_column+1));lista_Errores.push(nuevo);}
;

//---------------------------------METODOS Y FUNCIONES
METFUNC:TIPO identificador parenA parenC llaveA OPCIONESCUERPO llaveC {$$ = INSTRUCCION.nuevaFUNCION($1,$2, null, $6, this._$.first_line, (this._$.first_column+1));}
        |TIPO identificador parenA LISTAPARAMETROS parenC llaveA OPCIONESCUERPO llaveC {$$ = INSTRUCCION.nuevaFUNCION($1,$2, $4, $7, this._$.first_line, (this._$.first_column+1));}
        |void identificador parenA parenC llaveA OPCIONESCUERPO llaveC {$$ = INSTRUCCION.nuevaMETODO($2, null, $6 , this._$.first_line,(this._$.first_column+1));}
        |void identificador parenA LISTAPARAMETROS parenC llaveA OPCIONESCUERPO llaveC {$$ = INSTRUCCION.nuevaMETODO($2, $4, $7, this._$.first_line, (this._$.first_column+1));}
        |TIPO identificador parenA parenC llaveA  llaveC {$$ = INSTRUCCION.nuevaFUNCION($1,$2, null, [], this._$.first_line, (this._$.first_column+1));}
        |TIPO identificador parenA LISTAPARAMETROS parenC llaveA  llaveC {$$ = INSTRUCCION.nuevaFUNCION($1,$2, $4, [], this._$.first_line, (this._$.first_column+1));}
        |void identificador parenA parenC llaveA  llaveC {$$ = INSTRUCCION.nuevaMETODO($2, null, [], this._$.first_line,(this._$.first_column+1));}
        |void identificador parenA LISTAPARAMETROS parenC llaveA llaveC {$$ = INSTRUCCION.nuevaMETODO($2, $4, [], this._$.first_line, (this._$.first_column+1));}
;

LLAMADA: identificador parenA LISTA_VALORES parenC {$$ = INSTRUCCION.Llamadas($1, $3,this._$.first_line, (this._$.first_column+1));}
        |identificador parenA parenC {$$ = INSTRUCCION.Llamadas($1, null,this._$.first_line, (this._$.first_column+1));}
;
LISTA_VALORES: LISTA_VALORES coma  VALORES {$1.push($3); $$ = $1;} 
                | VALORES {$$ = [$1];}
;
VALORES:EXPRESION {$$=$1}
;
LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS {$1.push($3); $$ = $1;} 
                | PARAMETROS {$$ = [$1];}
;
PARAMETROS: TIPO identificador {$$ = INSTRUCCION.nuevaPARAMETRO($2,$1, this._$.first_line, (this._$.first_column+1));}
;

//---------------------------------CUERPO DE LOS METODOS Y FUNCIONES
OPCIONESCUERPO: OPCIONESCUERPO CUERPOMETFUNC {$1.push($2); $$ = $1;} 
                | CUERPOMETFUNC {$$ = [$1];}
                | error ptcoma {$$ = [];var nuevo=new ERRORES(TIPO_ERROR.SINTACTICO,"Falto un \";\",Error recuperado: "+yytext,this._$.first_line, (this._$.first_column+1));lista_Errores.push(nuevo);}
;
CUERPOMETFUNC: DEC_VAR          {$$ = $1;}
        | CICLOS                {$$ = $1;}
        | CAMBIARVALOR_VAR      {$$ = $1;}
        | VECTOR                {$$ = $1;}
        | LLAMADA ptcoma        {$$ = $1;}
        | INCRE_DECRE ptcoma    {$$ = INSTRUCCION.nuevaASIGNACION_InDe($1, this._$.first_line, (this._$.first_column+1));}
        | SENTENCIATRANS        {$$ = $1;}
        | IMPRIMIR              {$$ = $1;}
;

FUNCIONES: CASTEOS                              {$$ = $1;}
        | length parenA SACAR_LONG parenC       {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.LENGTH, this._$.first_line, (this._$.first_column+1));}
        | toLower parenA EXPRESION parenC       {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.LOWER, this._$.first_line, (this._$.first_column+1));}
        | toUpper parenA EXPRESION parenC       {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.UPPER, this._$.first_line, (this._$.first_column+1));}
        | truncate parenA EXPRESION parenC      {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.TRUNCATE, this._$.first_line, (this._$.first_column+1));}
        | round parenA EXPRESION parenC         {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.ROUND, this._$.first_line, (this._$.first_column+1));}
        | typeof parenA EXPRESION parenC        {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.TYPEOF, this._$.first_line, (this._$.first_column+1));}
;

CICLOS: WHILEC                  {$$ = $1;}
        |IFC                    {$$ = $1;}
        |ELSEIFC                {$$ = $1;}
        |FORC                   {$$ = $1;}
        |SWITCHC                {$$ = $1;}
        |DOWHILEC               {$$ = $1;}
        |TERNARIOC ptcoma       {$$ = $1;}
;

SENTENCIATRANS: break ptcoma      {$$ = $1;}
        |continue ptcoma          {$$ = $1;}
        |return ptcoma            {$$ = $1;}
;
VECTOR: DEC_VECTOR              {$$ = $1;}
        | ACCESO_VECTOR         {$$ = $1;}
        | CAMBIARVALOR_VECTOR   {$$ = $1;}
;
//---------------------------------VECTORES
DEC_VECTOR: TIPO corcheteA corcheteC identificador signoigual nnew TIPO corcheteA EXPRESION corcheteC ptcoma
        |  TIPO corcheteA corcheteC identificador signoigual llaveA LISTA_VALORES llaveC ptcoma
;
//---------------------------------FUNCIONES
IMPRIMIR: print parenA EXPRESION parenC ptcoma          { $$ = new INSTRUCCION.nuevoPRINT($3, this._$.first_line, (this._$.first_column+1));}
        |print parenA parenC ptcoma                     { $$ = new INSTRUCCION.nuevoPRINT("", this._$.first_line, (this._$.first_column+1));}
;
CASTEOS: parenA TIPOCASTEO parenC EXPRESION     { $$ = new INSTRUCCION.nuevoCASTEO($2,$4, this._$.first_line, (this._$.first_column+1));}
        | tostring parenA EXPRESION parenC     { $$ = new INSTRUCCION.nuevoCASTEO(TIPO_DATO.CADENA,$3, this._$.first_line, (this._$.first_column+1));}
;

//---------------------------------SENTENCIA DE CONTROL
TERNARIOC: EXPRESION interrogacion EXPRESION dospuntos EXPRESION       {$$ = INSTRUCCION.nuevoOperacionTernario($1,$3,$5,this._$.first_line,this._$.first_column+1);}
;


SACAR_LONG:cadenatexto        {$$ = INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.CADENA, this._$.first_line, (this._$.first_column+1));}
        | identificador       {$$ = INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1));}
;


EXPRESION: EXPRESION suma EXPRESION              {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.SUMA, this._$.first_line, (this._$.first_column+1));}
        | EXPRESION resta EXPRESION             {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.RESTA, this._$.first_line, (this._$.first_column+1));}
        | EXPRESION multi EXPRESION             {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.MULTIPLICACION, this._$.first_line, (this._$.first_column+1));}
        | EXPRESION division EXPRESION          {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.DIVISION, this._$.first_line, (this._$.first_column+1));}
        | EXPRESION exponente EXPRESION         {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.POTENCIA, this._$.first_line, (this._$.first_column+1));}
        | EXPRESION modulo EXPRESION            {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.MODULO, this._$.first_line, (this._$.first_column+1));}
        | resta EXPRESION %prec umenos          {$$ = INSTRUCCION.nuevaOperacionBinaria($2,$2,TIPO_OPERACION.NEGACION, this._$.first_line, (this._$.first_column+1));}
        | parenA EXPRESION parenC               {$$ = $2}
        | EXPRESION igualacion EXPRESION        {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line,this._$.first_column+1);}
        | EXPRESION diferenciacion EXPRESION    {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line,this._$.first_column+1);}
        | EXPRESION menor EXPRESION             {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line,this._$.first_column+1);}
        | EXPRESION menorigual EXPRESION        {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line,this._$.first_column+1);}
        | EXPRESION mayor EXPRESION             {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line,this._$.first_column+1);}
        | EXPRESION mayorigual EXPRESION        {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line,this._$.first_column+1);}
        | EXPRESION or EXPRESION                {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line,this._$.first_column+1);}
        | EXPRESION and EXPRESION               {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line,this._$.first_column+1);}
        | not EXPRESION                         {$$ = INSTRUCCION.nuevaOperacionBinaria($2,$2, TIPO_OPERACION.NOT,this._$.first_line,this._$.first_column+1);}
        | TERNARIOC                                                             {$$=$1;}
        | INCRE_DECRE                                                           {$$=$1;}
        | identificador corcheteA EXPRESION corcheteC                           {$$=$1;}//cambiar
        | FUNCIONES                                                             {$$=$1;}
        | LLAMADA                                                               {$$=$1;}
        | entero                                                                {$$ = INSTRUCCION.nuevoVALOR( Number($1), TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1));}
        | true                                                                  {$$ = INSTRUCCION.nuevoVALOR( true, TIPO_VALOR.BANDERA, this._$.first_line, (this._$.first_column+1));}
        | false                                                                 {$$ = INSTRUCCION.nuevoVALOR( false, TIPO_VALOR.BANDERA,this._$.first_line, (this._$.first_column+1));}
        | cadenatexto                                                           {$$ = INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.CADENA, this._$.first_line, (this._$.first_column+1));}
        | identificador                                                         {$$ = INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1));}
        | decimal                                                               {$$ = INSTRUCCION.nuevoVALOR(Number($1), TIPO_VALOR.DECIMAL,this._$.first_line, (this._$.first_column+1));}
        | caracter                                                              {$$ = INSTRUCCION.nuevoVALOR($1, TIPO_VALOR.CARACTER,this._$.first_line, (this._$.first_column+1));}
;


//---------------------------------VARIABLES Y TIPOS
TIPO: Double            {$$ = TIPO_DATO.DECIMAL}
        | String        {$$ = TIPO_DATO.CADENA}
        | Boolean       {$$ = TIPO_DATO.BANDERA}
        | int           {$$ = TIPO_DATO.ENTERO}
        | Char          {$$ = TIPO_DATO.CARACTER}
;
TIPOCASTEO: Double      {$$ = TIPO_DATO.DECIMAL}
        | int           {$$ = TIPO_DATO.ENTERO}
        | Char          {$$ = TIPO_DATO.CARACTER}
;
DEC_VAR: TIPO identificador ptcoma {$$ = INSTRUCCION.nuevaDECLARACION($2, null, $1, this._$.first_line, (this._$.first_column+1));}
        | TIPO identificador signoigual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaDECLARACION($2, $4, $1, this._$.first_line, (this._$.first_column+1));}
;
CAMBIARVALOR_VAR: identificador signoigual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaASIGNACION($1, $3, this._$.first_line, (this._$.first_column+1));}
;

INCRE_DECRE: identificador masmas {$$ = INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1)),INSTRUCCION.nuevoVALOR( 1, TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1)),TIPO_OPERACION.SUMA, this._$.first_line, (this._$.first_column+1));}
        | identificador menosmenos {$$ = INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1)),INSTRUCCION.nuevoVALOR( 1, TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1)),TIPO_OPERACION.RESTA, this._$.first_line, (this._$.first_column+1));}
;

//---------------------------------SENTENCIA CICLICAS
FORC: for parenA FOR_DECAS EXPRESION ptcoma FOR_ACT parenC llaveA OPCIONESCUERPO llaveC {$$ = new INSTRUCCION.nuevoFOR($3,$4, $6,$9 , this._$.first_line,(this._$.first_column+1));}
;
FOR_DECAS: DEC_VAR              {$$ = $1;}
        |CAMBIARVALOR_VAR       {$$ = $1;}
;
FOR_ACT: identificador signoigual EXPRESION     {$$ = INSTRUCCION.nuevaASIGNACION($1, $3, this._$.first_line, (this._$.first_column+1));}
        |identificador masmas                   {$$ = INSTRUCCION.nuevaASIGNACION($1, INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1)),INSTRUCCION.nuevoVALOR( 1, TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1)),TIPO_OPERACION.SUMA, this._$.first_line, (this._$.first_column+1)), this._$.first_line, (this._$.first_column+1));}
        | identificador menosmenos              {$$ = INSTRUCCION.nuevaASIGNACION($1, INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoVALOR( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1)),INSTRUCCION.nuevoVALOR( 1, TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1)),TIPO_OPERACION.RESTA, this._$.first_line, (this._$.first_column+1)), this._$.first_line, (this._$.first_column+1));}
;
WHILEC: while parenA EXPRESION parenC llaveA OPCIONESCUERPO llaveC {$$ = new INSTRUCCION.nuevoWhile($3, $6 , this._$.first_line,(this._$.first_column+1));}
;
DOWHILEC: do llaveA OPCIONESCUERPO llaveC while parenA EXPRESION parenC ptcoma {$$ = new INSTRUCCION.nuevoDOWhile($7, $3 , this._$.first_line,(this._$.first_column+1));}
;

SWITCHC: switch parenA EXPRESION parenC llaveA LISTA_CASOS llaveC { $$ = INSTRUCCION.nuevoSwitch($3,$6, this._$.first_line,(this._$.first_column+1));}
;
LISTA_CASOS: LISTA_CASOS CASOS          {$1.push($2); $$ = $1;} 
        |CASOS                          { $$ = INSTRUCCION.nuevoListaCasos($1);}
;
CASOS: case EXPRESION dospuntos OPCIONESCUERPO          { $$ = INSTRUCCION.nuevoCaso($2,$4, this._$.first_line,(this._$.first_column+1)); }
        |default dospuntos OPCIONESCUERPO               { $$ = INSTRUCCION.nuevoCasoDef($3, this._$.first_line,(this._$.first_column+1)); }
;

ELSEIFC:if parenA EXPRESION parenC llaveA OPCIONESCUERPO llaveC LISTA_ELSEIF { $$ = INSTRUCCION.nuevoELSEIF($3,$6,$8, this._$.first_line,(this._$.first_column+1));}
;
LISTA_ELSEIF: LISTA_ELSEIF UNELSEIF     {$1.push($2); $$ = $1;}
        |UNELSEIF                       { $$ = INSTRUCCION.nuevoListaELSEIF($1);}
;
UNELSEIF:else if parenA EXPRESION parenC llaveA OPCIONESCUERPO llaveC { $$ = INSTRUCCION.nuevoOP_ELSEIF($4,$7, this._$.first_line,(this._$.first_column+1)); }
        |else llaveA OPCIONESCUERPO llaveC { $$ = INSTRUCCION.nuevoELSEIF_Def($3, this._$.first_line,(this._$.first_column+1)); }
;

IFC: if parenA EXPRESION parenC llaveA OPCIONESCUERPO llaveC            {$$ = new INSTRUCCION.nuevoIf($3, $6 , this._$.first_line,(this._$.first_column+1));}
;