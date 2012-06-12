module('lively.ast.LivelyJSParser').requires('ometa.parser').toRun(function() {
LivelyJSParser=Object.delegated(Parser,{
"whereAreYou":function(){var $elf=this;return (function (){{var charsBefore=(120);var charsAfter=(120);var src=this["_originalInput"]["arr"];var startIndex=Math.max((0),(this.pos() - charsBefore));var stopIndex=Math.min(src["length"],(this.pos() + charsAfter));var msg=((src.substring(startIndex,this.pos()) + "<--I am here-->") + src.substring(this.pos(),stopIndex))};(msg+=("\nRules: " + this["_ruleStack"]));(msg+=("\nStack: " + this["stack"]));alert(msg);return true}).call(this)},
"fromTo":function(){var $elf=this,x,y;return (function(){x=this._apply("anything");y=this._apply("anything");this._applyWithArgs("seq",x);this._many((function(){return (function(){this._not((function(){return this._applyWithArgs("seq",y)}));return this._apply("char")}).call(this)}));return this._applyWithArgs("seq",y)}).call(this)},
"fromToWithout":function(){var $elf=this,x,y;return (function(){x=this._apply("anything");y=this._apply("anything");this._applyWithArgs("seq",x);return this._many((function(){return (function(){this._not((function(){return this._applyWithArgs("seq",y)}));return this._apply("char")}).call(this)}))}).call(this)},
"space":function(){var $elf=this;return this._or((function(){return Parser._superApplyWithArgs(this,'space')}),(function(){return this._applyWithArgs("fromToWithout","//","\n")}),(function(){return this._applyWithArgs("fromTo","//","end")}),(function(){return this._applyWithArgs("fromTo","/*","*/")}))},
"nameFirst":function(){var $elf=this;return this._or((function(){return this._apply("letter")}),(function(){return (function(){switch(this._apply('anything')){case "$":return "$";case "_":return "_";default: throw fail}}).call(this)}))},
"nameRest":function(){var $elf=this;return this._or((function(){return this._apply("nameFirst")}),(function(){return this._apply("digit")}))},
"iName":function(){var $elf=this,r;return (function(){r=this._applyWithArgs("firstAndRest","nameFirst","nameRest");return r.join("")}).call(this)},
"isKeyword":function(){var $elf=this,x;return (function(){x=this._apply("anything");return this._pred(LivelyJSParser._isKeyword(x))}).call(this)},
"name":function(){var $elf=this,p1,n,p2;return (function(){p1=this._apply("pos");n=this._apply("iName");this._not((function(){return this._applyWithArgs("isKeyword",n)}));p2=this._apply("pos");return ["name",[p1,p2],n]}).call(this)},
"keyword":function(){var $elf=this,p1,k,p2;return (function(){p1=this._apply("pos");k=this._apply("iName");this._applyWithArgs("isKeyword",k);p2=this._apply("pos");return [k,[p1,p2],k]}).call(this)},
"hexDigit":function(){var $elf=this,x,v;return (function(){x=this._apply("char");v=this["hexDigits"].indexOf(x.toLowerCase());this._pred((v >= (0)));return v}).call(this)},
"hexLit":function(){var $elf=this,n,d;return this._or((function(){return (function(){n=this._apply("hexLit");d=this._apply("hexDigit");return ((n * (16)) + d)}).call(this)}),(function(){return this._apply("hexDigit")}))},
"number":function(){var $elf=this,p1,n,p2,fs,p2,ws,fs,sig,exp,p2;return (function(){p1=this._apply("pos");return this._or((function(){return (function(){switch(this._apply('anything')){case "0":return (function(){this._applyWithArgs("exactly","x");"0x";n=this._apply("hexLit");p2=this._apply("pos");return ["number",[p1,p2],n]}).call(this);case ".":return (function(){fs=this._many1((function(){return this._apply("digit")}));p2=this._apply("pos");return ["number",[p1,p2],parseFloat(("." + fs.join("")))]}).call(this);default: throw fail}}).call(this)}),(function(){return (function(){ws=this._many1((function(){return this._apply("digit")}));fs=this._or((function(){return (function(){switch(this._apply('anything')){case ".":return this._many1((function(){return this._apply("digit")}));default: throw fail}}).call(this)}),(function(){return (function(){this._apply("empty");return []}).call(this)}));exp=this._or((function(){return (function(){switch(this._apply('anything')){case "e":return (function(){sig=this._or((function(){return (function(){switch(this._apply('anything')){case "+":return "+";case "-":return "-";default: throw fail}}).call(this)}),(function(){return (function(){this._apply("empty");return ""}).call(this)}));return this._many1((function(){return this._apply("digit")}))}).call(this);default: throw fail}}).call(this)}),(function(){return (function(){this._apply("empty");return []}).call(this)}));p2=this._apply("pos");return ["number",[p1,p2],parseFloat((((((ws.join("") + ".") + fs.join("")) + "e") + sig) + exp.join("")))]}).call(this)}))}).call(this)},
"escapeChar":function(){var $elf=this,c;return (function(){this._applyWithArgs("exactly","\\");c=this._apply("char");return unescape(("\\" + c))}).call(this)},
"str":function(){var $elf=this,p1,cs,p2,cs,p2,cs,p2,n,p2;return (function(){p1=this._apply("pos");return this._or((function(){return (function(){switch(this._apply('anything')){case "\"":return this._or((function(){return (function(){switch(this._apply('anything')){case "\"":return (function(){this._applyWithArgs("exactly","\"");"\"\"\"";cs=this._many((function(){return this._or((function(){return this._apply("escapeChar")}),(function(){return (function(){this._not((function(){return (function(){this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");return "\"\"\""}).call(this)}));return this._apply("char")}).call(this)}))}));this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");"\"\"\"";p2=this._apply("pos");return ["string",[p1,p2],cs.join("")]}).call(this);default: throw fail}}).call(this)}),(function(){return (function(){cs=this._many((function(){return this._or((function(){return this._apply("escapeChar")}),(function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","\"")}));return this._apply("char")}).call(this)}))}));this._applyWithArgs("exactly","\"");p2=this._apply("pos");return ["string",[p1,p2],cs.join("")]}).call(this)}));case "\'":return (function(){cs=this._many((function(){return this._or((function(){return this._apply("escapeChar")}),(function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","\'")}));return this._apply("char")}).call(this)}))}));this._applyWithArgs("exactly","\'");p2=this._apply("pos");return ["string",[p1,p2],cs.join("")]}).call(this);default: throw fail}}).call(this)}),(function(){return (function(){(function(){switch(this._apply('anything')){case "#":return "#";case "`":return "`";default: throw fail}}).call(this);n=this._apply("iName");p2=this._apply("pos");return ["string",[p1,p2],n]}).call(this)}))}).call(this)},
"special":function(){var $elf=this,p1,s,p2;return (function(){p1=this._apply("pos");s=(function(){switch(this._apply('anything')){case "(":return "(";case ")":return ")";case "{":return "{";case "}":return "}";case "[":return "[";case "]":return "]";case ",":return ",";case ";":return ";";case "?":return "?";case ":":return ":";case "!":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "!==";default: throw fail}}).call(this)}),(function(){return "!="}));default: throw fail}}).call(this)}),(function(){return "!"}));case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "===";default: throw fail}}).call(this)}),(function(){return "=="}));default: throw fail}}).call(this)}),(function(){return "="}));case ">":return this._or((function(){return (function(){switch(this._apply('anything')){case ">":return this._or((function(){return (function(){switch(this._apply('anything')){case ">":return ">>>";case "=":return ">>=";default: throw fail}}).call(this)}),(function(){return ">>"}));case "=":return ">=";default: throw fail}}).call(this)}),(function(){return ">"}));case "<":return this._or((function(){return (function(){switch(this._apply('anything')){case "<":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "<<=";default: throw fail}}).call(this)}),(function(){return "<<"}));case "=":return "<=";default: throw fail}}).call(this)}),(function(){return "<"}));case "+":return this._or((function(){return (function(){switch(this._apply('anything')){case "+":return "++";case "=":return "+=";default: throw fail}}).call(this)}),(function(){return "+"}));case "-":return this._or((function(){return (function(){switch(this._apply('anything')){case "-":return "--";case "=":return "-=";default: throw fail}}).call(this)}),(function(){return "-"}));case "*":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "*=";default: throw fail}}).call(this)}),(function(){return "*"}));case "/":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "/=";default: throw fail}}).call(this)}),(function(){return "/"}));case "%":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "%=";default: throw fail}}).call(this)}),(function(){return "%"}));case "&":return this._or((function(){return (function(){switch(this._apply('anything')){case "&":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "&&=";default: throw fail}}).call(this)}),(function(){return "&&"}));default: throw fail}}).call(this)}),(function(){return "&"}));case "|":return this._or((function(){return (function(){switch(this._apply('anything')){case "|":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "||=";default: throw fail}}).call(this)}),(function(){return "||"}));default: throw fail}}).call(this)}),(function(){return "|"}));case ".":return ".";case "^":return "^";default: throw fail}}).call(this);p2=this._apply("pos");return [s,[p1,p2],s]}).call(this)},
"tok":function(){var $elf=this;return (function(){this._apply("spaces");return this._or((function(){return this._apply("name")}),(function(){return this._apply("keyword")}),(function(){return this._apply("number")}),(function(){return this._apply("str")}),(function(){return this._apply("special")}))}).call(this)},
"toks":function(){var $elf=this,ts;return (function(){ts=this._many((function(){return this._apply("token")}));this._apply("spaces");this._apply("end");return ts}).call(this)},
"token":function(){var $elf=this,tt,t;return (function(){tt=this._apply("anything");t=this._apply("tok");this._pred((t[(0)] == tt));return t[(2)]}).call(this)},
"spacesNoNl":function(){var $elf=this;return this._many((function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","\n")}));return this._apply("space")}).call(this)}))},
"expr":function(){var $elf=this,p1,f,s,p2;return this._or((function(){return (function(){p1=this._apply("pos");f=this._apply("expr");this._applyWithArgs("exactly",",");s=this._apply("exprPart");p2=this._apply("pos");return ["begin",[p1,p2],f,s]}).call(this)}),(function(){return this._apply("exprPart")}))},
"exprPart":function(){var $elf=this,p1,e,t,f,p2,rhs,p2,rhs,p2,rhs,p2,rhs,p2,rhs,p2,rhs,p2,rhs,p2,rhs,p2,rhs,p2,rhs,p2,rhs,p2,rhs,p2,rhs,p2,rhs,p2;return (function(){p1=this._apply("pos");e=this._apply("ternayExpr");return this._or((function(){return (function(){this._applyWithArgs("token","?");t=this._apply("exprPart");this._applyWithArgs("token",":");f=this._apply("exprPart");p2=this._apply("pos");return ["condExpr",[p1,p2],e,t,f]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["set",[p1,p2],e,rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","+=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,"+",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","-=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,"-",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","*=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,"*",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","/=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,"/",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","%=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,"%",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","&=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,"&",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","&&=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,"&&",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","|=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,"|",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","||=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,"||",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","^=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,"^",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token",">>=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,">>",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","<<=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,"<<",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token",">>>=");rhs=this._apply("exprPart");p2=this._apply("pos");return ["mset",[p1,p2],e,">>>",rhs]}).call(this)}),(function(){return (function(){this._apply("empty");return e}).call(this)}))}).call(this)},
"ternaryExpr":function(){var $elf=this,p1,e,t,f,p2;return (function(){p1=this._apply("pos");e=this._apply("orExpr");return this._or((function(){return (function(){this._applyWithArgs("token","?");t=this._apply("exprPart");this._applyWithArgs("token",":");f=this._apply("exprPart");p2=this._apply("pos");return ["condExpr",[p1,p2],e,t,f]}).call(this)}),(function(){return (function(){this._apply("empty");return e}).call(this)}))}).call(this)},
"orExpr":function(){var $elf=this,p1,x,y,p2;return this._or((function(){return (function(){p1=this._apply("pos");x=this._apply("orExpr");this._applyWithArgs("token","||");y=this._apply("andExpr");p2=this._apply("pos");return ["binop",[p1,p2],"||",x,y]}).call(this)}),(function(){return this._apply("andExpr")}))},
"andExpr":function(){var $elf=this,p1,x,y,p2;return this._or((function(){return (function(){p1=this._apply("pos");x=this._apply("andExpr");this._applyWithArgs("token","&&");y=this._apply("bitOrExpr");p2=this._apply("pos");return ["binop",[p1,p2],"&&",x,y]}).call(this)}),(function(){return this._apply("bitOrExpr")}))},
"bitOrExpr":function(){var $elf=this,p1,x,y,p2;return this._or((function(){return (function(){p1=this._apply("pos");x=this._apply("bitXorExpr");this._applyWithArgs("token","|");y=this._apply("bitOrExpr");p2=this._apply("pos");return ["binop",[p1,p2],"|",x,y]}).call(this)}),(function(){return this._apply("bitXorExpr")}))},
"bitXorExpr":function(){var $elf=this,p1,x,y,p2;return this._or((function(){return (function(){p1=this._apply("pos");x=this._apply("bitAndExpr");this._applyWithArgs("token","^");y=this._apply("bitXorExpr");p2=this._apply("pos");return ["binop",[p1,p2],"^",x,y]}).call(this)}),(function(){return this._apply("bitAndExpr")}))},
"bitAndExpr":function(){var $elf=this,p1,x,y,p2;return this._or((function(){return (function(){p1=this._apply("pos");x=this._apply("eqExpr");this._applyWithArgs("token","&");y=this._apply("bitAndExpr");p2=this._apply("pos");return ["binop",[p1,p2],"&",x,y]}).call(this)}),(function(){return this._apply("eqExpr")}))},
"eqExpr":function(){var $elf=this,p1,x,op,y,p2;return this._or((function(){return (function(){p1=this._apply("pos");x=this._apply("eqExpr");op=this._or((function(){return this._applyWithArgs("token","==")}),(function(){return this._applyWithArgs("token","!=")}),(function(){return this._applyWithArgs("token","===")}),(function(){return this._applyWithArgs("token","!==")}));y=this._apply("relExpr");p2=this._apply("pos");return ["binop",[p1,p2],op,x,y]}).call(this)}),(function(){return this._apply("relExpr")}))},
"relExpr":function(){var $elf=this,p1,x,op,y,p2;return this._or((function(){return (function(){p1=this._apply("pos");x=this._apply("relExpr");op=this._or((function(){return this._applyWithArgs("token",">")}),(function(){return this._applyWithArgs("token",">=")}),(function(){return this._applyWithArgs("token","<")}),(function(){return this._applyWithArgs("token","<=")}),(function(){return this._applyWithArgs("token","instanceof")}),(function(){return this._applyWithArgs("token","in")}));y=this._apply("shiftExpr");p2=this._apply("pos");return ["binop",[p1,p2],op,x,y]}).call(this)}),(function(){return this._apply("shiftExpr")}))},
"shiftExpr":function(){var $elf=this,p1,x,op,y,p2;return this._or((function(){return (function(){p1=this._apply("pos");x=this._apply("shiftExpr");op=this._or((function(){return this._applyWithArgs("token",">>")}),(function(){return this._applyWithArgs("token","<<")}),(function(){return this._applyWithArgs("token",">>>")}));y=this._apply("addExpr");p2=this._apply("pos");return ["binop",[p1,p2],op,x,y]}).call(this)}),(function(){return this._apply("addExpr")}))},
"addExpr":function(){var $elf=this,p1,x,op,y,p2;return this._or((function(){return (function(){p1=this._apply("pos");x=this._apply("addExpr");op=this._or((function(){return this._applyWithArgs("token","+")}),(function(){return this._applyWithArgs("token","-")}));y=this._apply("mulExpr");p2=this._apply("pos");return ["binop",[p1,p2],op,x,y]}).call(this)}),(function(){return this._apply("mulExpr")}))},
"mulExpr":function(){var $elf=this,p1,x,op,y,p2;return this._or((function(){return (function(){p1=this._apply("pos");x=this._apply("mulExpr");op=this._or((function(){return this._applyWithArgs("token","*")}),(function(){return this._applyWithArgs("token","/")}),(function(){return this._applyWithArgs("token","%")}));y=this._apply("unary");p2=this._apply("pos");return ["binop",[p1,p2],op,x,y]}).call(this)}),(function(){return this._apply("unary")}))},
"unary":function(){var $elf=this,p1,p,p2,p,p2,p,p2,p,p2,p,p2,p,p2,p,p2,p,p2;return this._or((function(){return (function(){p1=this._apply("pos");return this._or((function(){return (function(){this._applyWithArgs("token","-");p=this._apply("postfix");p2=this._apply("pos");return ["unop",[p1,p2],"-",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","+");p=this._apply("postfix");p2=this._apply("pos");return ["unop",[p1,p2],"+",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","++");p=this._apply("postfix");p2=this._apply("pos");return ["preop",[p1,p2],"++",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","--");p=this._apply("postfix");p2=this._apply("pos");return ["preop",[p1,p2],"--",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","!");p=this._apply("unary");p2=this._apply("pos");return ["unop",[p1,p2],"!",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","void");p=this._apply("unary");p2=this._apply("pos");return ["unop",[p1,p2],"void",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","delete");p=this._apply("unary");p2=this._apply("pos");return ["unop",[p1,p2],"delete",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","typeof");p=this._apply("unary");p2=this._apply("pos");return ["unop",[p1,p2],"typeof",p]}).call(this)}))}).call(this)}),(function(){return this._apply("postfix")}))},
"postfix":function(){var $elf=this,p1,p,p2,p2;return (function(){p1=this._apply("pos");p=this._apply("callExpr");return this._or((function(){return (function(){this._apply("spacesNoNl");this._applyWithArgs("token","++");p2=this._apply("pos");return ["postop",[p1,p2],"++",p]}).call(this)}),(function(){return (function(){this._apply("spacesNoNl");this._applyWithArgs("token","--");p2=this._apply("pos");return ["postop",[p1,p2],"--",p]}).call(this)}),(function(){return (function(){this._apply("empty");return p}).call(this)}))}).call(this)},
"args":function(){var $elf=this,as;return (function(){this._applyWithArgs("token","(");as=this._applyWithArgs("listOf","exprPart",",");this._applyWithArgs("token",")");return as}).call(this)},
"callExpr":function(){var $elf=this,p1,p,as,p2,p3,m,p4,as,p2,i,as,p2,i,p2,p3,f,p2;return this._or((function(){return (function(){p1=this._apply("pos");p=this._apply("callExpr");return this._or((function(){return (function(){as=this._apply("args");p2=this._apply("pos");return ["call",[p1,p2],p].concat(as)}).call(this)}),(function(){return (function(){this._applyWithArgs("token",".");p3=this._apply("pos");m=this._applyWithArgs("token","name");p4=this._apply("pos");as=this._apply("args");p2=this._apply("pos");return ["send",[p1,p2],["string",[p3,p4],m],p].concat(as)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","[");i=this._apply("expr");this._applyWithArgs("token","]");as=this._apply("args");p2=this._apply("pos");return ["send",[p1,p2],i,p].concat(as)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","[");i=this._apply("expr");this._applyWithArgs("token","]");p2=this._apply("pos");return ["getp",[p1,p2],i,p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token",".");p3=this._apply("pos");f=this._applyWithArgs("token","name");p2=this._apply("pos");return ["getp",[p1,p2],["string",[p3,p2],f],p]}).call(this)}))}).call(this)}),(function(){return this._apply("primExpr")}))},
"memberExpr":function(){var $elf=this,p1,p,i,p2,p3,f,p2;return this._or((function(){return (function(){p1=this._apply("pos");p=this._apply("memberExpr");return this._or((function(){return (function(){this._applyWithArgs("token","[");i=this._apply("expr");this._applyWithArgs("token","]");p2=this._apply("pos");return ["getp",[p1,p2],i,p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token",".");p3=this._apply("pos");f=this._applyWithArgs("token","name");p2=this._apply("pos");return ["getp",[p1,p2],["string",[p3,p2],f],p]}).call(this)}))}).call(this)}),(function(){return this._apply("primExpr")}))},
"primExpr":function(){var $elf=this,e,p1,p2,p3,e,as,p2,n,p2,n,p2,s,p2,es,p2,e,f,p2;return this._or((function(){return (function(){this._applyWithArgs("token","(");e=this._apply("expr");this._applyWithArgs("token",")");return e}).call(this)}),(function(){return (function(){this._apply("spaces");p1=this._apply("pos");return this._or((function(){return (function(){this._applyWithArgs("token","this");p2=this._apply("pos");return ["this",[p1,p2]]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","new");p3=this._apply("pos");e=this._apply("memberExpr");as=this._or((function(){return this._apply("args")}),(function(){return (function(){this._apply("empty");return []}).call(this)}));p2=this._apply("pos");return ["new",[p1,p2],["call",[p3,p2],e].concat(as)]}).call(this)}),(function(){return (function(){n=this._applyWithArgs("token","name");p2=this._apply("pos");return ["get",[p1,p2],n]}).call(this)}),(function(){return (function(){n=this._applyWithArgs("token","number");p2=this._apply("pos");return ["number",[p1,p2],n]}).call(this)}),(function(){return (function(){s=this._applyWithArgs("token","string");p2=this._apply("pos");return ["string",[p1,p2],s]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","function");this._or((function(){return this._applyWithArgs("token","name")}),(function(){return this._apply("empty")}));return this._apply("funcRest")}).call(this)}),(function(){return (function(){this._applyWithArgs("token","[");es=this._applyWithArgs("listOf","exprPart",",");this._or((function(){return this._applyWithArgs("token",",")}),(function(){return this._apply("empty")}));this._applyWithArgs("token","]");p2=this._apply("pos");return ["arr",[p1,p2]].concat(es)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","/");e=this._many((function(){return this._or((function(){return this._apply("escapeChar")}),(function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","/")}));return this._apply("char")}).call(this)}))}));this._applyWithArgs("token","/");f=this._many((function(){return this._apply("letter")}));p2=this._apply("pos");return ["regex",[p1,p2],e.join(""),f.join("")]}).call(this)}))}).call(this)}),(function(){return this._apply("json")}))},
"json":function(){var $elf=this,p1,bs,p2;return (function(){p1=this._apply("pos");this._applyWithArgs("token","{");bs=this._applyWithArgs("listOf","jsonBinding",",");this._or((function(){return this._applyWithArgs("token",",")}),(function(){return this._apply("empty")}));this._applyWithArgs("token","}");p2=this._apply("pos");return ["json",[p1,p2]].concat(bs)}).call(this)},
"jsonBinding":function(){var $elf=this,p1,n,v,p2;return (function(){p1=this._apply("pos");n=this._apply("jsonPropName");this._applyWithArgs("token",":");v=this._apply("exprPart");p2=this._apply("pos");return ["binding",[p1,p2],n,v]}).call(this)},
"jsonPropName":function(){var $elf=this;return this._or((function(){return this._applyWithArgs("token","name")}),(function(){return this._applyWithArgs("token","number")}),(function(){return this._applyWithArgs("token","string")}))},
"memberFragment":function(){var $elf=this,jb;return (function(){this._apply("spaces");jb=this._apply("jsonBinding");this._or((function(){return (function(){switch(this._apply('anything')){case ",":return ",";default: throw fail}}).call(this)}),(function(){return this._apply("empty")}));this._apply("spaces");this._apply("end");return jb}).call(this)},
"categoryFragment":function(){var $elf=this,p1,es,p2;return (function(){this._apply("spaces");p1=this._apply("pos");es=this._applyWithArgs("listOf","exprPart",",");p2=this._apply("pos");this._or((function(){return this._applyWithArgs("token",",")}),(function(){return this._apply("empty")}));this._apply("spaces");this._apply("end");return ["arr",[p1,p2]].concat(es)}).call(this)},
"traitFragment":function(){var $elf=this,p1,es,p2;return (function(){this._apply("spaces");p1=this._apply("pos");this._applyWithArgs("token","name");this._applyWithArgs("token","(");this._apply("spaces");es=this._applyWithArgs("listOf","exprPart",",");this._apply("spaces");this._applyWithArgs("token",")");this._apply("spaces");this._apply("sc");p2=this._apply("pos");this._apply("spaces");this._apply("end");return ["arr",[p1,p2]].concat(es)}).call(this)},
"formal":function(){var $elf=this,p1,n,p2;return (function(){this._apply("spaces");p1=this._apply("pos");n=this._applyWithArgs("token","name");p2=this._apply("pos");return ["get",[p1,p2],n]}).call(this)},
"funcRest":function(){var $elf=this,p1,args,body,p2;return (function(){p1=this._apply("pos");this._applyWithArgs("token","(");args=this._applyWithArgs("listOf","formal",",");this._applyWithArgs("token",")");this._applyWithArgs("token","{");body=this._apply("srcElems");this._applyWithArgs("token","}");p2=this._apply("pos");return ["func",[p1,p2],body].concat(args)}).call(this)},
"sc":function(){var $elf=this;return this._or((function(){return (function(){this._apply("spacesNoNl");return this._or((function(){return (function(){switch(this._apply('anything')){case "\n":return "\n";default: throw fail}}).call(this)}),(function(){return this._lookahead((function(){return this._applyWithArgs("exactly","}")}))}),(function(){return this._apply("end")}))}).call(this)}),(function(){return this._applyWithArgs("token",";")}))},
"binding":function(){var $elf=this,p1,n,p,v,p2;return (function(){p1=this._apply("pos");n=this._applyWithArgs("token","name");v=this._or((function(){return (function(){this._applyWithArgs("token","=");return this._apply("exprPart")}).call(this)}),(function(){return (function(){this._apply("empty");p=this._apply("pos");return ["get",[p,p],"undefined"]}).call(this)}));p2=this._apply("pos");return ["var",[p1,p2],n,v]}).call(this)},
"bindingList":function(){var $elf=this,p1,bs,p2;return (function(){p1=this._apply("pos");bs=this._applyWithArgs("listOf","binding",",");p2=this._apply("pos");return ["begin",[p1,p2]].concat(bs)}).call(this)},
"block":function(){var $elf=this,ss;return (function(){this._applyWithArgs("token","{");ss=this._apply("srcElems");this._applyWithArgs("token","}");return ss}).call(this)},
"stmt":function(){var $elf=this,p1,bs,p2,c,t,p,f,p2,c,s,p2,s,c,p2,p,i,p,c,p,u,s,p2,p3,n,p4,n,p4,v,e,s,p2,e,p3,c,cs,p4,p3,cs,p4,cs,p2,p2,p2,p2,e,p2,t,e,p,e,c,p,f,p2,p,e,p2,x,s,p2,e,p2;return this._or((function(){return this._apply("block")}),(function(){return (function(){this._apply("spaces");p1=this._apply("pos");return this._or((function(){return (function(){this._applyWithArgs("token","var");bs=this._apply("bindingList");this._apply("sc");p2=this._apply("pos");return bs}).call(this)}),(function(){return (function(){this._applyWithArgs("token","if");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");t=this._apply("stmt");f=this._or((function(){return (function(){this._applyWithArgs("token","else");return this._apply("stmt")}).call(this)}),(function(){return (function(){this._apply("empty");p=this._apply("pos");return ["get",[p,p],"undefined"]}).call(this)}));this._or((function(){return this._apply("sc")}),(function(){return this._apply("empty")}));p2=this._apply("pos");return ["if",[p1,p2],c,t,f]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","while");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");s=this._apply("stmt");p2=this._apply("pos");return ["while",[p1,p2],c,s]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","do");s=this._apply("stmt");this._applyWithArgs("token","while");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");this._apply("sc");p2=this._apply("pos");return ["doWhile",[p1,p2],s,c]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","for");this._applyWithArgs("token","(");i=this._or((function(){return (function(){this._applyWithArgs("token","var");return this._apply("bindingList")}).call(this)}),(function(){return this._apply("expr")}),(function(){return (function(){this._apply("empty");p=this._apply("pos");return ["get",[p,p],"undefined"]}).call(this)}));this._applyWithArgs("token",";");c=this._or((function(){return this._apply("expr")}),(function(){return (function(){this._apply("empty");p=this._apply("pos");return ["get",[p,p],"true"]}).call(this)}));this._applyWithArgs("token",";");u=this._or((function(){return this._apply("expr")}),(function(){return (function(){this._apply("empty");p=this._apply("pos");return ["get",[p,p],"undefined"]}).call(this)}));this._applyWithArgs("token",")");s=this._apply("stmt");p2=this._apply("pos");return ["for",[p1,p2],i,c,s,u]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","for");this._applyWithArgs("token","(");v=this._or((function(){return (function(){p3=this._apply("pos");this._applyWithArgs("token","var");n=this._applyWithArgs("token","name");p4=this._apply("pos");return ["var",[p3,p4],n,["get",[p3,p3],"undefined"]]}).call(this)}),(function(){return (function(){n=this._applyWithArgs("token","name");p4=this._apply("pos");return ["get",[p3,p4],n]}).call(this)}));this._applyWithArgs("token","in");e=this._apply("expr");this._applyWithArgs("token",")");s=this._apply("stmt");p2=this._apply("pos");return ["forIn",[p1,p2],v,e,s]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","switch");this._applyWithArgs("token","(");e=this._apply("expr");this._applyWithArgs("token",")");this._applyWithArgs("token","{");cs=this._many((function(){return this._or((function(){return (function(){p3=this._apply("pos");this._applyWithArgs("token","case");c=this._apply("expr");this._applyWithArgs("token",":");cs=this._apply("srcElems");p4=this._apply("pos");return ["case",[p3,p4],c,cs]}).call(this)}),(function(){return (function(){p3=this._apply("pos");this._applyWithArgs("token","default");this._applyWithArgs("token",":");cs=this._apply("srcElems");p4=this._apply("pos");return ["default",[p3,p4],cs]}).call(this)}))}));this._applyWithArgs("token","}");p2=this._apply("pos");return ["switch",[p1,p2],e].concat(cs)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","break");this._apply("sc");p2=this._apply("pos");return ["break",[p1,p2]]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","debugger");this._apply("sc");p2=this._apply("pos");return ["debugger",[p1,p2]]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","continue");this._apply("sc");p2=this._apply("pos");return ["continue",[p1,p2]]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","throw");this._apply("spacesNoNl");e=this._apply("expr");this._apply("sc");p2=this._apply("pos");return ["throw",[p1,p2],e]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","try");t=this._apply("block");c=this._or((function(){return (function(){this._applyWithArgs("token","catch");this._applyWithArgs("token","(");e=this._apply("formal");this._applyWithArgs("token",")");return this._apply("block")}).call(this)}),(function(){return e=(function(){this._apply("empty");p=this._apply("pos");return ["get",[p,p],"undefined"]}).call(this)}));f=this._or((function(){return (function(){this._applyWithArgs("token","finally");return this._apply("block")}).call(this)}),(function(){return (function(){this._apply("empty");p=this._apply("pos");return ["get",[p,p],"undefined"]}).call(this)}));this._apply("sc");p2=this._apply("pos");return ["try",[p1,p2],t,e,c,f]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","return");e=this._or((function(){return this._apply("expr")}),(function(){return (function(){this._apply("empty");p=this._apply("pos");return ["get",[p,p],"undefined"]}).call(this)}));this._apply("sc");p2=this._apply("pos");return ["return",[p1,p2],e]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","with");this._applyWithArgs("token","(");x=this._apply("expr");this._applyWithArgs("token",")");s=this._apply("stmt");p2=this._apply("pos");return ["with",[p1,p2],x,s]}).call(this)}),(function(){return (function(){e=this._apply("expr");this._apply("sc");return e}).call(this)}),(function(){return (function(){this._applyWithArgs("token",";");p2=this._apply("pos");return ["get",[p1,p2],"undefined"]}).call(this)}))}).call(this)}))},
"srcElem":function(){var $elf=this,p1,n,f,p2;return this._or((function(){return (function(){p1=this._apply("pos");this._applyWithArgs("token","function");n=this._applyWithArgs("token","name");f=this._apply("funcRest");p2=this._apply("pos");return ["var",[p1,p2],n,f]}).call(this)}),(function(){return this._apply("stmt")}))},
"srcElems":function(){var $elf=this,p1,ss,p2;return (function(){p1=this._apply("pos");ss=this._many((function(){return this._apply("srcElem")}));p2=this._apply("pos");return ["begin",[p1,p2]].concat(ss)}).call(this)},
"topLevel":function(){var $elf=this,r;return (function(){r=this._apply("srcElems");this._apply("spaces");this._apply("end");return r}).call(this)}})
});