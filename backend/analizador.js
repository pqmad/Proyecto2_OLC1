/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var analizador = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,8],$V2=[1,9],$V3=[1,10],$V4=[1,11],$V5=[1,12],$V6=[1,13],$V7=[5,9,19,41,42,43,44,45],$V8=[1,20],$V9=[1,21],$Va=[5,9,10,18,19,28,30,32,33,34,35,36,37,38,41,42,43,44,45,46,47],$Vb=[1,36],$Vc=[1,30],$Vd=[1,35],$Ve=[1,29],$Vf=[1,31],$Vg=[1,32],$Vh=[1,33],$Vi=[1,34],$Vj=[1,37],$Vk=[1,44],$Vl=[12,20],$Vm=[1,47],$Vn=[1,48],$Vo=[1,49],$Vp=[1,50],$Vq=[1,51],$Vr=[1,52],$Vs=[1,53],$Vt=[1,54],$Vu=[1,55],$Vv=[1,56],$Vw=[1,57],$Vx=[1,58],$Vy=[1,59],$Vz=[1,60],$VA=[12,13,48,49,50,51,52,53,54,55,56,57,58,59,60,61],$VB=[12,13,60,61],$VC=[1,104],$VD=[1,102],$VE=[1,103],$VF=[1,94],$VG=[1,95],$VH=[1,96],$VI=[1,97],$VJ=[1,98],$VK=[1,99],$VL=[1,100],$VM=[1,106],$VN=[1,105],$VO=[12,13,48,49,54,55,56,57,58,59,60,61],$VP=[12,13,48,49,50,51,53,54,55,56,57,58,59,60,61],$VQ=[12,13,54,55,56,57,58,59,60,61],$VR=[10,18,28,30,32,33,34,35,36,37,38,41,42,43,44,45,46,47];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIO":3,"OPCUERPO":4,"EOF":5,"CUERPO":6,"DEC_VAR":7,"METFUNC":8,"exec":9,"identificador":10,"parenA":11,"parenC":12,"ptcoma":13,"LISTAPARAMETROS":14,"TIPO":15,"llaveA":16,"OPCIONESCUERPO":17,"llaveC":18,"void":19,"coma":20,"PARAMETROS":21,"CUERPOMETFUNC":22,"CICLOS":23,"SENTENCIATRANS":24,"FUNCIONES":25,"CAMBIARVALOR_VAR":26,"IMPRIMIR":27,"toLower":28,"cadenatexto":29,"toUpper":30,"WHILEC":31,"IFC":32,"FORC":33,"SWITCHC":34,"DOC":35,"break":36,"continue":37,"return":38,"signoigual":39,"EXPRESION":40,"Double":41,"String":42,"Boolean":43,"int":44,"Char":45,"print":46,"while":47,"suma":48,"resta":49,"multi":50,"division":51,"exponente":52,"modulo":53,"igualacion":54,"diferenciacion":55,"menor":56,"menorigual":57,"mayor":58,"mayorigual":59,"or":60,"and":61,"not":62,"entero":63,"true":64,"false":65,"decimal":66,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",9:"exec",10:"identificador",11:"parenA",12:"parenC",13:"ptcoma",16:"llaveA",18:"llaveC",19:"void",20:"coma",28:"toLower",29:"cadenatexto",30:"toUpper",32:"IFC",33:"FORC",34:"SWITCHC",35:"DOC",36:"break",37:"continue",38:"return",39:"signoigual",41:"Double",42:"String",43:"Boolean",44:"int",45:"Char",46:"print",47:"while",48:"suma",49:"resta",50:"multi",51:"division",52:"exponente",53:"modulo",54:"igualacion",55:"diferenciacion",56:"menor",57:"menorigual",58:"mayor",59:"mayorigual",60:"or",61:"and",62:"not",63:"entero",64:"true",65:"false",66:"decimal"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,5],[6,6],[8,7],[8,8],[8,7],[8,8],[14,3],[14,1],[21,2],[17,2],[17,1],[22,1],[22,1],[22,1],[22,1],[22,1],[25,1],[25,5],[25,5],[23,1],[23,1],[23,1],[23,1],[23,1],[24,1],[24,1],[24,1],[7,3],[7,5],[26,4],[15,1],[15,1],[15,1],[15,1],[15,1],[27,5],[31,7],[40,3],[40,3],[40,3],[40,3],[40,3],[40,3],[40,2],[40,3],[40,3],[40,3],[40,3],[40,3],[40,3],[40,3],[40,3],[40,3],[40,2],[40,1],[40,1],[40,1],[40,1],[40,1],[40,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2:
$$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 3:
this.$ = [$$[$0]];
break;
case 4: case 5: case 22:
this.$ = $$[$0];
break;
case 6:
this.$ = $$[$0-4];
break;
case 7:
this.$ = $$[$0-5];
break;
case 8: case 9: case 10: case 11:
this.$ = $$[$0-1];
break;
case 36:
this.$ = TIPO_DATO.DECIMAL
break;
case 37: case 40:
this.$ = TIPO_DATO.CADENA
break;
case 38:
this.$ = TIPO_DATO.BANDERA
break;
case 39:
this.$ = TIPO_DATO.ENTERO
break;
case 41:
 this.$ = new INSTRUCCION.nuevoPRINT($$[$0-2], this._$.first_line, (this._$.first_column+1))
break;
case 43:
this.$ = INSTRUCCION.nuevaOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.SUMA, this._$.first_line, (this._$.first_column+1))
break;
case 44:
this.$ = INSTRUCCION.nuevaOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.RESTA, this._$.first_line, (this._$.first_column+1))
break;
case 45:
this.$ = INSTRUCCION.nuevaOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.MULTIPLICACION, this._$.first_line, (this._$.first_column+1))
break;
case 46:
this.$ = INSTRUCCION.nuevaOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.DIVISION, this._$.first_line, (this._$.first_column+1))
break;
case 47:
this.$ = INSTRUCCION.nuevaOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.POTENCIA, this._$.first_line, (this._$.first_column+1))
break;
case 60:
this.$ = INSTRUCCION.nuevoVALOR( Number($$[$0]), TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1))
break;
case 61:
this.$ = INSTRUCCION.nuevoVALOR( Boolean($$[$0]), TIPO_VALOR.BANDERA, this._$.first_line, (this._$.first_column+1))
break;
case 62:
this.$ = INSTRUCCION.nuevoVALOR( Boolean($$[$0]), TIPO_VALOR.BANDERA,this._$.first_line, (this._$.first_column+1))
break;
case 63:
this.$ = INSTRUCCION.nuevoVALOR( $$[$0], TIPO_VALOR.CADENA, this._$.first_line, (this._$.first_column+1))
break;
case 64:
this.$ = INSTRUCCION.nuevoVALOR( $$[$0], TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1))
break;
case 65:
this.$ = INSTRUCCION.nuevoVALOR(Number($$[$0]), TIPO_VALOR.DECIMAL,this._$.first_line, (this._$.first_column+1))
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:$V0,15:7,19:$V1,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6},{1:[3]},{5:[1,14],6:15,7:4,8:5,9:$V0,15:7,19:$V1,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6},o($V7,[2,3]),o($V7,[2,4]),o($V7,[2,5]),{10:[1,16]},{10:[1,17]},{10:[1,18]},{10:[2,36]},{10:[2,37]},{10:[2,38]},{10:[2,39]},{10:[2,40]},{1:[2,1]},o($V7,[2,2]),{11:[1,19]},{11:[1,22],13:$V8,39:$V9},{11:[1,23]},{12:[1,24],14:25,15:27,21:26,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6},o($Va,[2,33]),{10:$Vb,11:$Vc,29:$Vd,40:28,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{12:[1,38],14:39,15:27,21:26,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6},{12:[1,40],14:41,15:27,21:26,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6},{13:[1,42]},{12:[1,43],20:$Vk},o($Vl,[2,13]),{10:[1,45]},{13:[1,46],48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz},{10:$Vb,11:$Vc,29:$Vd,40:61,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:62,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:63,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},o($VA,[2,60]),o($VA,[2,61]),o($VA,[2,62]),o($VA,[2,63]),o($VA,[2,64]),o($VA,[2,65]),{16:[1,64]},{12:[1,65],20:$Vk},{16:[1,66]},{12:[1,67],20:$Vk},o($V7,[2,6]),{13:[1,68]},{15:27,21:69,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6},o($Vl,[2,14]),o($Va,[2,34]),{10:$Vb,11:$Vc,29:$Vd,40:70,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:71,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:72,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:73,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:74,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:75,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:76,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:77,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:78,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:79,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:80,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:81,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:82,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:83,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},o($VA,[2,49]),{12:[1,84],48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz},o($VB,[2,59],{48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx}),{7:87,10:$VC,15:92,17:85,22:86,23:88,24:89,25:90,26:91,27:101,28:$VD,30:$VE,31:93,32:$VF,33:$VG,34:$VH,35:$VI,36:$VJ,37:$VK,38:$VL,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6,46:$VM,47:$VN},{16:[1,107]},{7:87,10:$VC,15:92,17:108,22:86,23:88,24:89,25:90,26:91,27:101,28:$VD,30:$VE,31:93,32:$VF,33:$VG,34:$VH,35:$VI,36:$VJ,37:$VK,38:$VL,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6,46:$VM,47:$VN},{16:[1,109]},o($V7,[2,7]),o($Vl,[2,12]),o($VO,[2,43],{50:$Vo,51:$Vp,52:$Vq,53:$Vr}),o($VO,[2,44],{50:$Vo,51:$Vp,52:$Vq,53:$Vr}),o($VP,[2,45],{52:$Vq}),o($VP,[2,46],{52:$Vq}),o($VA,[2,47]),o($VP,[2,48],{52:$Vq}),o($VQ,[2,51],{48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr}),o($VQ,[2,52],{48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr}),o($VQ,[2,53],{48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr}),o($VQ,[2,54],{48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr}),o($VQ,[2,55],{48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr}),o($VQ,[2,56],{48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr}),o([12,13,60],[2,57],{48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,61:$Vz}),o($VB,[2,58],{48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx}),o($VA,[2,50]),{7:87,10:$VC,15:92,18:[1,110],22:111,23:88,24:89,25:90,26:91,27:101,28:$VD,30:$VE,31:93,32:$VF,33:$VG,34:$VH,35:$VI,36:$VJ,37:$VK,38:$VL,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6,46:$VM,47:$VN},o($VR,[2,16]),o($VR,[2,17]),o($VR,[2,18]),o($VR,[2,19]),o($VR,[2,20]),o($VR,[2,21]),{10:[1,112]},o($VR,[2,25]),o($VR,[2,26]),o($VR,[2,27]),o($VR,[2,28]),o($VR,[2,29]),o($VR,[2,30]),o($VR,[2,31]),o($VR,[2,32]),o($VR,[2,22]),{11:[1,113]},{11:[1,114]},{39:[1,115]},{11:[1,116]},{11:[1,117]},{7:87,10:$VC,15:92,17:118,22:86,23:88,24:89,25:90,26:91,27:101,28:$VD,30:$VE,31:93,32:$VF,33:$VG,34:$VH,35:$VI,36:$VJ,37:$VK,38:$VL,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6,46:$VM,47:$VN},{7:87,10:$VC,15:92,18:[1,119],22:111,23:88,24:89,25:90,26:91,27:101,28:$VD,30:$VE,31:93,32:$VF,33:$VG,34:$VH,35:$VI,36:$VJ,37:$VK,38:$VL,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6,46:$VM,47:$VN},{7:87,10:$VC,15:92,17:120,22:86,23:88,24:89,25:90,26:91,27:101,28:$VD,30:$VE,31:93,32:$VF,33:$VG,34:$VH,35:$VI,36:$VJ,37:$VK,38:$VL,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6,46:$VM,47:$VN},o($V7,[2,8]),o($VR,[2,15]),{13:$V8,39:$V9},{29:[1,121]},{29:[1,122]},{10:$Vb,11:$Vc,29:$Vd,40:123,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:124,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{10:$Vb,11:$Vc,29:$Vd,40:125,49:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi,66:$Vj},{7:87,10:$VC,15:92,18:[1,126],22:111,23:88,24:89,25:90,26:91,27:101,28:$VD,30:$VE,31:93,32:$VF,33:$VG,34:$VH,35:$VI,36:$VJ,37:$VK,38:$VL,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6,46:$VM,47:$VN},o($V7,[2,10]),{7:87,10:$VC,15:92,18:[1,127],22:111,23:88,24:89,25:90,26:91,27:101,28:$VD,30:$VE,31:93,32:$VF,33:$VG,34:$VH,35:$VI,36:$VJ,37:$VK,38:$VL,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6,46:$VM,47:$VN},{12:[1,128]},{12:[1,129]},{13:[1,130],48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz},{12:[1,131],48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz},{12:[1,132],48:$Vm,49:$Vn,50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz},o($V7,[2,9]),o($V7,[2,11]),{13:[1,133]},{13:[1,134]},o($VR,[2,35]),{16:[1,135]},{13:[1,136]},o($VR,[2,23]),o($VR,[2,24]),{7:87,10:$VC,15:92,17:137,22:86,23:88,24:89,25:90,26:91,27:101,28:$VD,30:$VE,31:93,32:$VF,33:$VG,34:$VH,35:$VI,36:$VJ,37:$VK,38:$VL,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6,46:$VM,47:$VN},o($VR,[2,41]),{7:87,10:$VC,15:92,18:[1,138],22:111,23:88,24:89,25:90,26:91,27:101,28:$VD,30:$VE,31:93,32:$VF,33:$VG,34:$VH,35:$VI,36:$VJ,37:$VK,38:$VL,41:$V2,42:$V3,43:$V4,44:$V5,45:$V6,46:$VM,47:$VN},o($VR,[2,42])],
defaultActions: {9:[2,36],10:[2,37],11:[2,38],12:[2,39],13:[2,40],14:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

	const TIPO_OPERACION	= require('./controller/Enums/TipoOperacion');
	const TIPO_VALOR 	= require('./controller/Enums/TipoValor');
	const TIPO_DATO		= require('./controller/Enums/TipoDato'); 
	const INSTRUCCION	= require('./controller/Instruccion/Instruccion');
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:// comentario simple línea
break;
case 2:// comentario multiple líneas
break;
case 3:return 44
break;
case 4:return 41
break;
case 5:return 43
break;
case 6:return 45
break;
case 7:return 42
break;
case 8:return 64
break;
case 9:return 65
break;
case 10:return 'if'
break;
case 11:return 'else'
break;
case 12:return 'switch'
break;
case 13:return 'case'
break;
case 14:return 'default'
break;
case 15:return 36
break;
case 16:return 47
break;
case 17:return 'for'
break;
case 18:return 'do'
break;
case 19:return 37
break;
case 20:return 38
break;
case 21:return 19
break;
case 22:return 46
break;
case 23:return 28
break;
case 24:return 30
break;
case 25:return 'length'
break;
case 26:return 'truncate'
break;
case 27:return 'round'
break;
case 28:return 'typeof'
break;
case 29:return 'tostring'
break;
case 30:return 'tochararray'
break;
case 31:return 9
break;
case 32:return 39
break;
case 33:return 54
break;
case 34:return 55
break;
case 35:return 56
break;
case 36:return 57
break;
case 37:return 58
break;
case 38:return 59
break;
case 39:return 'interrogacion'
break;
case 40:return 'dospuntos'
break;
case 41:return 60
break;
case 42:return 61
break;
case 43:return 62
break;
case 44:return 11
break;
case 45:return 12
break;
case 46:return 52
break;
case 47:return 49
break;
case 48:return 48
break;
case 49:return 50
break;
case 50:return 51
break;
case 51:return 53
break;
case 52:return 13
break;
case 53:return 16
break;
case 54:return 18
break;
case 55:return 'corcheteA'
break;
case 56:return 'corcheteC'
break;
case 57:return 20
break;
case 58:return 66;
break;
case 59:return 63;
break;
case 60:return 10
break;
case 61:return 29
break;
case 62:return 5
break;
case 63:return 'INVALID'
break;
}
},
rules: [/^(?:\s+)/i,/^(?:\/\/.*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:int\b)/i,/^(?:Double\b)/i,/^(?:Boolean\b)/i,/^(?:Char\b)/i,/^(?:String\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:switch\b)/i,/^(?:case\b)/i,/^(?:default\b)/i,/^(?:break\b)/i,/^(?:while\b)/i,/^(?:for\b)/i,/^(?:do\b)/i,/^(?:continue\b)/i,/^(?:return\b)/i,/^(?:void\b)/i,/^(?:print\b)/i,/^(?:toLower\b)/i,/^(?:toUpper\b)/i,/^(?:length\b)/i,/^(?:truncate\b)/i,/^(?:round\b)/i,/^(?:typeof\b)/i,/^(?:toString\b)/i,/^(?:toCharArray\b)/i,/^(?:exec\b)/i,/^(?:=)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:<=)/i,/^(?:>)/i,/^(?:>=)/i,/^(?:\?)/i,/^(?::)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:!)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\^)/i,/^(?:-)/i,/^(?:\+)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:;)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\[)/i,/^(?:\])/i,/^(?:,)/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:[0-9]+\b)/i,/^(?:([a-zA-Z])([a-zA-Z0-9_])*)/i,/^(?:["\""]([^"\""])*["\""])/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = analizador;
exports.Parser = analizador.Parser;
exports.parse = function () { return analizador.parse.apply(analizador, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}