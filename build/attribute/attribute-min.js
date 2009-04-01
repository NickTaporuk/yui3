YUI.add("attribute",function(B){B.State=function(){this.data={};};B.State.prototype={add:function(O,Q){B.each(Q,function(S,R){if(!this.data[R]){this.data[R]={};}this.data[R][O]=S;},this);},remove:function(Q,S){var R=this.data,O=function(T){if(R[T]&&(Q in R[T])){delete R[T][Q];}};if(B.Lang.isString(S)){O(S);}else{B.each(S||R,function(U,T){if(B.Lang.isString(T)){O(T);}else{O(U);}},this);}},get:function(O,Q){var S=this.data,R;if(Q){return(S[Q]&&O in S[Q])?S[Q][O]:undefined;}else{B.each(S,function(U,T){if(O in S[T]){R=R||{};R[T]=U[O];}},this);return R;}}};var J=B.Object,K=".",G="Change",M="get",F="set",E="getter",C="setter",I="value",L="initValue",N="readOnly",H="writeOnce",D="validator",P=B.EventTarget;function A(){P.call(this,{emitFacade:true});this._conf=new B.State();}A.prototype={addAttr:function(Q,O){O=O||{};var S,R=(I in O);if(R){S=O.value;delete O.value;}O._init=true;this._conf.add(Q,O);if(R){this.set(Q,S);}return this;},removeAttr:function(O){this._conf.remove(O);},get:function(R){var Q=this._conf,S,O,T;if(R.indexOf(K)!==-1){S=R.split(K);R=S.shift();}T=Q.get(R,I);O=Q.get(R,E)||Q.get(R,M);T=(O)?O.call(this,T):T;T=(S)?this._getSubAttrVal(S,T):T;return T;},set:function(O,R,Q){return this._setAttr(O,R,Q);},reset:function(Q){if(Q){this._set(Q,this._conf.get(Q,L));}else{var O=this._conf.data.initValue;B.each(O,function(R,S){this._set(S,R);},this);}return this;},_set:function(O,R,Q){return this._setAttr(O,R,Q,true);},_setAttr:function(Q,T,O,R){var Y=this._conf,W=Y.data,V=true,U=(!W.value||!(Q in W.value)),X,Z,S;if(Q.indexOf(K)!==-1){X=Q;Z=Q.split(K);Q=Z.shift();}if(!U&&!R){if(Y.get(Q,H)){V=false;}if(Y.get(Q,N)){V=false;}}if(!Y.get(Q)){V=false;}S=this.get(Q);if(Z){T=this._setSubAttrVal(Z,B.clone(S),T);if(T===undefined){V=false;}}if(V){this._fireAttrChange(Q,S,T,Q,X,O);}return this;},_fireAttrChange:function(S,U,O,Q,V,T){S=S+G;this.publish(S,{queuable:false,defaultFn:this._defAttrChangeFn,silent:true});var R={type:S,prevVal:U,newVal:O,attrName:Q,subAttrName:V};if(T){B.mix(R,T);}this.fire(R);},_defAttrChangeFn:function(V){var R=this._conf,Q=V.attrName,W=V.newVal,O=R.get(Q,D),T=R.get(Q,C)||R.get(Q,F),S,U;if(!O||O.call(this,W)){if(T){U=T.call(this,W);if(U!==undefined){W=U;}}S={value:W};if(R.get(Q,L)===undefined){S[L]=W;}R.add(Q,S);V.newVal=R.get(Q,I);}else{V.stopImmediatePropagation();}},_getSubAttrVal:function(R,S){var Q=R.length,O;if(Q>0){for(O=0;S!==undefined&&O<Q;++O){S=S[R[O]];}}return S;},_setSubAttrVal:function(S,U,R){var Q=S.length-1,O,T;if(Q>=0){T=U;for(O=0;T!==undefined&&O<Q;++O){T=T[S[O]];}if(T!==undefined){T[S[O]]=R;}else{U=undefined;}}return U;},setAttrs:function(Q){for(var O in Q){if(Q.hasOwnProperty(O)){this.set(O,Q[O]);}}return this;},getAttrs:function(S){var V={},T,Q,O,U,R=(S===true);S=(S&&!R)?S:J.keys(this._conf.data[I]);for(T=0,Q=S.length;T<Q;T++){O=S[T];U=this.get(O);if(!R||this._conf.get(O,I)!=this._conf.get(O,L)){V[O]=this.get(O);}}return V;},_initAttrs:function(Q,R){if(Q){var O,S,T;R=this._splitAttrVals(R);for(O in Q){if(Q.hasOwnProperty(O)){S=Q[O];T=this._getAttrInitVal(O,S,R);if(T!==undefined){S.value=T;}this.addAttr(O,S);}}}return this;},_splitAttrVals:function(S){var U={},T={},V,O,R,Q;for(Q in S){if(S.hasOwnProperty(Q)){if(Q.indexOf(K)!==-1){V=Q.split(K);O=V.shift();R=T[O]=T[O]||[];R[R.length]={path:V,value:S[Q]};}else{U[Q]=S[Q];}}}return{simple:U,complex:T};},_getAttrInitVal:function(W,U,Y){var Q=(U.valueFn)?U.valueFn.call(this):U.value,O,R,T,S,Z,X,V;if(!U[N]&&Y){O=Y.simple;if(O&&O.hasOwnProperty(W)){Q=O[W];}R=Y.complex;if(R&&R.hasOwnProperty(W)){V=R[W];for(T=0,S=V.length;T<S;++T){Z=V[T].path;X=V[T].value;this._setSubAttrVal(Z,Q,X);}}}return Q;}};B.mix(A,P,false,null,1);B.Attribute=A;},"@VERSION@",{requires:["event-custom"]});