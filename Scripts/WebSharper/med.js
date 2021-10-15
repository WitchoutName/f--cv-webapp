(function(Global)
{
 "use strict";
 var med,Client,Species,Pet,IntelliFactory,Runtime,WebSharper,Forms,Form,UI,Doc,AttrProxy,AttrModule,View,View$1,List,Seq,Pervasives,Validation,Var$1,Submitter,Remoting,AjaxRemotingProvider,Concurrency;
 med=Global.med=Global.med||{};
 Client=med.Client=med.Client||{};
 Species=Client.Species=Client.Species||{};
 Pet=Client.Pet=Client.Pet||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 WebSharper=Global.WebSharper;
 Forms=WebSharper&&WebSharper.Forms;
 Form=Forms&&Forms.Form;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 AttrProxy=UI&&UI.AttrProxy;
 AttrModule=UI&&UI.AttrModule;
 View=Forms&&Forms.View;
 View$1=UI&&UI.View;
 List=WebSharper&&WebSharper.List;
 Seq=WebSharper&&WebSharper.Seq;
 Pervasives=Forms&&Forms.Pervasives;
 Validation=Forms&&Forms.Validation;
 Var$1=UI&&UI.Var$1;
 Submitter=UI&&UI.Submitter;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Species=Client.Species=Runtime.Class({
  toString:function()
  {
   return this.$==1?"dog":this.$==2?"piglet":"cat";
  }
 },null,Species);
 Species.Piglet=new Species({
  $:2
 });
 Species.Dog=new Species({
  $:1
 });
 Species.Cat=new Species({
  $:0
 });
 Pet.New=function(species,name,vaccinated)
 {
  return{
   species:species,
   name:name,
   vaccinated:vaccinated
  };
 };
 Client.UploadForm=function()
 {
  return Form.Render(Runtime.Curried(Client.RenderPerson,4),Form.Run(function(f)
  {
   Global.alert("Species: "+Global.String(f.species)+", Name: "+f.name+", Vaccinated: "+Global.String(f.vaccinated));
  },Client.FormPiglet(Pet.New(Species.Cat,"",false))));
 };
 Client.RenderPerson=function(species,name,vaccinated,submit)
 {
  return Doc.Element("div",[],[Doc.Element("form",[AttrProxy.Create("method","POST"),AttrProxy.Create("action","/"),AttrProxy.Create("id","postForm")],[Doc.Element("div",[AttrModule.Class("form-group")],[Doc.Input([AttrModule.Class("form-control"),AttrProxy.Create("id","exampleInputEmail1"),AttrProxy.Create("placeholder","Pet name"),AttrProxy.Create("name","name")],name),Client.ShowErrorsFor(View.Through$1(submit.view,name))]),Doc.Element("div",[AttrModule.Class("form-radio")],[Doc.Element("h4",[],[Doc.TextNode("Species")]),Doc.Element("div",[],[Doc.Element("label",[],[Doc.Radio([AttrProxy.Create("type","radio"),AttrProxy.Create("name","species"),AttrProxy.Create("value","dog")],Species.Cat,species),Doc.TextNode(Global.String(Species.Cat))]),Doc.Element("label",[],[Doc.Radio([AttrProxy.Create("type","radio"),AttrProxy.Create("name","species"),AttrProxy.Create("value","cat")],Species.Dog,species),Doc.TextNode(Global.String(Species.Dog))]),Doc.Element("label",[],[Doc.Radio([AttrProxy.Create("type","radio"),AttrProxy.Create("name","species"),AttrProxy.Create("value","piglet")],Species.Piglet,species),Doc.TextNode(Global.String(Species.Piglet))])])]),Doc.Element("label",[AttrModule.Class("form-check")],[Doc.CheckBox([AttrProxy.Create("name","vaccinated")],vaccinated),Doc.TextNode("Vaccinated")]),Doc.Element("div",[],[Doc.Button("Submit",[],function()
  {
   submit.Trigger();
  })])])]);
 };
 Client.ShowErrorsFor=function(v)
 {
  return Doc.EmbedView(View$1.Map(function(a)
  {
   var errors;
   return a.$==1?(errors=a.$0,Doc.Concat(List.ofSeq(Seq.delay(function()
   {
    return Seq.map(function(error)
    {
     return Doc.Element("p",[AttrProxy.Create("style","color:red")],[Doc.TextNode(error.message)]);
    },errors);
   })))):Doc.get_Empty();
  },v));
 };
 Client.RenderForm=function(species,name,vaccinated)
 {
  return Doc.Element("div",[],[Doc.Concat([Doc.Element("label",[],[Doc.Radio([],Species.Cat,species),Doc.TextNode(Global.String(Species.Cat))]),Doc.Element("label",[],[Doc.Radio([],Species.Dog,species),Doc.TextNode(Global.String(Species.Dog))]),Doc.Element("label",[],[Doc.Radio([],Species.Piglet,species),Doc.TextNode(Global.String(Species.Piglet))])]),Doc.Input([],name),Doc.CheckBox([],vaccinated)]);
 };
 Client.FormPiglet=function(init)
 {
  return Form.WithSubmit(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Form.Return(Runtime.Curried3(Pet.New)),Form.Yield(init.species)),Validation.IsNotEmpty("Please enter your pet's name.",Form.Yield(init.name))),Form.Yield(init.vaccinated)));
 };
 Client.Main=function()
 {
  var rvInput,submit,vReversed;
  rvInput=Var$1.Create$1("");
  submit=Submitter.CreateOption(rvInput.get_View());
  vReversed=View$1.MapAsync(function(a)
  {
   var b;
   return a!=null&&a.$==1?(new AjaxRemotingProvider.New()).Async("med:med.Server.DoSomething:-1840423385",[a.$0]):(b=null,Concurrency.Delay(function()
   {
    return Concurrency.Return("");
   }));
  },submit.view);
  return Doc.Element("div",[],[Doc.Input([],rvInput),Doc.Button("Send",[],function()
  {
   submit.Trigger();
  }),Doc.Element("hr",[],[]),Doc.Element("h4",[AttrProxy.Create("class","text-muted")],[Doc.TextNode("The server responded:")]),Doc.Element("div",[AttrProxy.Create("class","jumbotron")],[Doc.Element("h1",[],[Doc.TextView(vReversed)])])]);
 };
}(self));
