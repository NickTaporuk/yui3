YUI.add("event-mouseenter",function(D){D.Event._fireMouseEnter=function(H,F){var E=H.relatedTarget,G=H.currentTarget;if(!G.compareTo(E)&&!G.contains(E)){D.publish(F,{contextFn:function(){return G;}});D.fire(F,H);}};var C=D.Env.evt.plugins,A=D.Lang.isString,B={on:function(I,H,G){var E=(I==="mouseenter")?"mouseover":"mouseout",J=I+":"+(A(G)?G:D.stamp(G))+E,F=D.Array(arguments,0,true);if(!D.getEvent(J)){D.on(E,D.rbind(D.Event._fireMouseEnter,D,J),G);}F[0]=J;F.splice(2,1);return D.on.apply(D,F);}};C.mouseenter=B;C.mouseleave=B;},"@VERSION@",{requires:["event-base"]});