(function(Global)
{
 "use strict";
 var WebSharper,Forms,Bootstrap,Controls,Simple,SC$1,List,Doc,UI,Doc$1,Seq,IntelliFactory,Runtime,View,View$1,AttrModule;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Forms=WebSharper.Forms=WebSharper.Forms||{};
 Bootstrap=Forms.Bootstrap=Forms.Bootstrap||{};
 Controls=Bootstrap.Controls=Bootstrap.Controls||{};
 Simple=Controls.Simple=Controls.Simple||{};
 SC$1=Global.StartupCode$WebSharper_Forms_Bootstrap$Main=Global.StartupCode$WebSharper_Forms_Bootstrap$Main||{};
 List=WebSharper&&WebSharper.List;
 Doc=Forms&&Forms.Doc;
 UI=WebSharper&&WebSharper.UI;
 Doc$1=UI&&UI.Doc;
 Seq=WebSharper&&WebSharper.Seq;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 View=UI&&UI.View;
 View$1=Forms&&Forms.View;
 AttrModule=UI&&UI.AttrModule;
 Simple.ShowErrors=function(submit)
 {
  return Controls.ShowErrors([],submit);
 };
 Simple.Button=function(label,f)
 {
  return((function(a)
  {
   return(Controls.Button())(a);
  }(label))(List.ofArray([(Controls.cls())("button btn-primary")])))(f);
 };
 Simple.Checkbox=function(lbl,target)
 {
  return Controls.Checkbox(lbl,List.T.Empty,target,[],[]);
 };
 Simple.TextAreaWithError=function(lbl,target,submit)
 {
  var c;
  return(((c=Controls.TextAreaWithError(lbl),function(a)
  {
   var c$1;
   c$1=c(a);
   return function(t)
   {
    return c$1([t[0],t[1],t[2]]);
   };
  })(List.T.Empty))([target,List.T.Empty,List.T.Empty]))(submit);
 };
 Simple.TextArea=function(lbl,target)
 {
  return Controls.TextArea(lbl,List.T.Empty,target,[],List.T.Empty);
 };
 Simple.InputPasswordWithError=function(lbl,target,submit)
 {
  var c;
  return(((c=Controls.InputPasswordWithError(lbl),function(a)
  {
   var c$1;
   c$1=c(a);
   return function(t)
   {
    return c$1([t[0],t[1],t[2]]);
   };
  })(List.T.Empty))([target,List.T.Empty,List.T.Empty]))(submit);
 };
 Simple.InputPassword=function(lbl,target)
 {
  return Controls.InputPassword(lbl,List.T.Empty,target,[],List.T.Empty);
 };
 Simple.InputWithError=function(lbl,target,submit)
 {
  var c;
  return(((c=Controls.InputWithError(lbl),function(a)
  {
   var c$1;
   c$1=c(a);
   return function(t)
   {
    return c$1([t[0],t[1],t[2]]);
   };
  })(List.T.Empty))([target,List.T.Empty,List.T.Empty]))(submit);
 };
 Simple.Input=function(lbl,target)
 {
  return Controls.Input(lbl,List.T.Empty,target,[],List.T.Empty);
 };
 Controls.ShowErrors=function(extras,submit)
 {
  return Doc.ShowErrors(submit,function(a)
  {
   return a.$==0?Doc$1.get_Empty():Doc$1.Element("div",extras,[Doc$1.Element("div",List.ofArray([(Controls.cls())("alert alert-danger")]),Seq.map(function(m)
   {
    return Doc$1.Element("p",[],[Doc$1.TextNode(m.message)]);
   },a))]);
  });
 };
 Controls.Button=function()
 {
  SC$1.$cctor();
  return SC$1.Button;
 };
 Controls.TextAreaWithError=Runtime.Curried3(function(lbl,e,t)
 {
  var t$1,l,t$2;
  t$1=t[0];
  l=t[1];
  t$2=t[2];
  return function(s)
  {
   return Controls.__InputWithError(Doc$1.InputArea,lbl,e,t$1,l,t$2,s);
  };
 });
 Controls.InputPasswordWithError=Runtime.Curried3(function(lbl,e,t)
 {
  var t$1,l,t$2;
  t$1=t[0];
  l=t[1];
  t$2=t[2];
  return function(s)
  {
   return Controls.__InputWithError(Doc$1.PasswordBox,lbl,e,t$1,l,t$2,s);
  };
 });
 Controls.InputWithError=Runtime.Curried3(function(lbl,e,t)
 {
  var t$1,l,t$2;
  t$1=t[0];
  l=t[1];
  t$2=t[2];
  return function(s)
  {
   return Controls.__InputWithError(Doc$1.Input,lbl,e,t$1,l,t$2,s);
  };
 });
 Controls.__InputWithError=function(inputFun,lbl,extras,target,labelExtras,targetExtras,submitView)
 {
  var p,view,errorOpt,errorClassOpt;
  p=(view=View.Map(function(res)
  {
   var $1;
   return(res.$==1?res.$0.$==0||($1=res.$0,false):true)?[null,null]:[{
    $:1,
    $0:List.reduce(function(a,b)
    {
     return a+"; "+b;
    },List.map(function(e)
    {
     return e.message;
    },$1))
   },{
    $:1,
    $0:"has-error"
   }];
  },View$1.Through$1(submitView,target)),[View.Map(function(t)
  {
   return t[0];
  },view),View.Map(function(t)
  {
   return t[1];
  },view)]);
  errorOpt=p[0];
  errorClassOpt=p[1];
  return Doc$1.Element("div",List.ofSeq(Seq.delay(function()
  {
   return Seq.append([(Controls.cls())("form-group")],Seq.delay(function()
   {
    return Seq.append([AttrModule.DynamicClass("has-error",errorClassOpt,function(opt)
    {
     return opt!=null;
    })],Seq.delay(function()
    {
     return extras;
    }));
   }));
  })),List.ofSeq(Seq.delay(function()
  {
   return Seq.append([Doc$1.Element("label",labelExtras,[Doc$1.TextNode(lbl)])],Seq.delay(function()
   {
    return Seq.append([inputFun(new List.T({
     $:1,
     $0:(Controls.cls())("form-control"),
     $1:targetExtras
    }),target)],Seq.delay(function()
    {
     return[Doc$1.BindView(function(a)
     {
      return a!=null&&a.$==1?Doc$1.Element("span",[(Controls.cls())("help-block")],[Doc$1.TextNode(a.$0)]):Doc$1.get_Empty();
     },errorOpt)];
    }));
   }));
  })));
 };
 Controls.Radio=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc$1.Element("div",new List.T({
   $:1,
   $0:(Controls.cls())("radio"),
   $1:extras
  }),[Doc$1.Element("label",labelExtras,[Doc$1.Radio(targetExtras,true,target),Doc$1.TextNode(lbl)])]);
 };
 Controls.Checkbox=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc$1.Element("div",new List.T({
   $:1,
   $0:(Controls.cls())("checkbox"),
   $1:extras
  }),[Doc$1.Element("label",labelExtras,[Doc$1.CheckBox(targetExtras,target),Doc$1.TextNode(lbl)])]);
 };
 Controls.TextArea=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc$1.Element("div",new List.T({
   $:1,
   $0:(Controls.cls())("form-group"),
   $1:extras
  }),[Doc$1.Element("label",labelExtras,[Doc$1.TextNode(lbl)]),Doc$1.InputArea(new List.T({
   $:1,
   $0:(Controls.cls())("form-control"),
   $1:targetExtras
  }),target)]);
 };
 Controls.InputPassword=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc$1.Element("div",new List.T({
   $:1,
   $0:(Controls.cls())("form-group"),
   $1:extras
  }),[Doc$1.Element("label",labelExtras,[Doc$1.TextNode(lbl)]),Doc$1.PasswordBox(new List.T({
   $:1,
   $0:(Controls.cls())("form-control"),
   $1:targetExtras
  }),target)]);
 };
 Controls.Input=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc$1.Element("div",new List.T({
   $:1,
   $0:(Controls.cls())("form-group"),
   $1:extras
  }),[Doc$1.Element("label",labelExtras,[Doc$1.TextNode(lbl)]),Doc$1.Input(new List.T({
   $:1,
   $0:(Controls.cls())("form-control"),
   $1:targetExtras
  }),target)]);
 };
 Controls.Class=function()
 {
  SC$1.$cctor();
  return SC$1.Class;
 };
 Controls.cls=function()
 {
  SC$1.$cctor();
  return SC$1.cls;
 };
 SC$1.$cctor=function()
 {
  SC$1.$cctor=Global.ignore;
  SC$1.cls=AttrModule.Class;
  SC$1.Class=AttrModule.Class;
  SC$1.Button=Runtime.Curried3(Doc$1.Button);
 };
}(self));
