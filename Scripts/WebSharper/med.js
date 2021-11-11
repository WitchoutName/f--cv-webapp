(function(Global)
{
 "use strict";
 var med,Client,Species,Pet,TransmitionType,ClassificationType,ImageData,IntelliFactory,Runtime,WebSharper,Forms,Form,UI,Var$1,View,Submitter,Concurrency,Doc,AttrProxy,AttrModule,View$1,Pervasives,Validation,List,Seq,Remoting,AjaxRemotingProvider;
 med=Global.med=Global.med||{};
 Client=med.Client=med.Client||{};
 Species=Client.Species=Client.Species||{};
 Pet=Client.Pet=Client.Pet||{};
 TransmitionType=Client.TransmitionType=Client.TransmitionType||{};
 ClassificationType=Client.ClassificationType=Client.ClassificationType||{};
 ImageData=Client.ImageData=Client.ImageData||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 WebSharper=Global.WebSharper;
 Forms=WebSharper&&WebSharper.Forms;
 Form=Forms&&Forms.Form;
 UI=WebSharper&&WebSharper.UI;
 Var$1=UI&&UI.Var$1;
 View=UI&&UI.View;
 Submitter=UI&&UI.Submitter;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Doc=UI&&UI.Doc;
 AttrProxy=UI&&UI.AttrProxy;
 AttrModule=UI&&UI.AttrModule;
 View$1=Forms&&Forms.View;
 Pervasives=Forms&&Forms.Pervasives;
 Validation=Forms&&Forms.Validation;
 List=WebSharper&&WebSharper.List;
 Seq=WebSharper&&WebSharper.Seq;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
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
 TransmitionType=Client.TransmitionType=Runtime.Class({
  toString:function()
  {
   return this.$==1?"Wavelet":this.$==2?"Average values":this.$==3?"Variance values":"FFT";
  }
 },null,TransmitionType);
 TransmitionType.Variance=new TransmitionType({
  $:3
 });
 TransmitionType.Average=new TransmitionType({
  $:2
 });
 TransmitionType.Wavelet=new TransmitionType({
  $:1
 });
 TransmitionType.FFT=new TransmitionType({
  $:0
 });
 ClassificationType=Client.ClassificationType=Runtime.Class({
  toString:function()
  {
   return this.$==1?"Neural Network":"K-means";
  }
 },null,ClassificationType);
 ClassificationType.NeuralNetwork=new ClassificationType({
  $:1
 });
 ClassificationType.KMeans=new ClassificationType({
  $:0
 });
 ImageData.New=function(imagePath,cutImageWithCoordsFromAnnotations,annotationsPath,transmitionType,classificationType,setIndexes,indexes,windowSize,stepSize,numberOfClusters,variancePercentage,showOriginalImage,showSegmentedOriginalImage,showClickableCutImage,showAverageValuesForFFT,showVarianceValuesForFFT)
 {
  return{
   imagePath:imagePath,
   cutImageWithCoordsFromAnnotations:cutImageWithCoordsFromAnnotations,
   annotationsPath:annotationsPath,
   transmitionType:transmitionType,
   classificationType:classificationType,
   setIndexes:setIndexes,
   indexes:indexes,
   windowSize:windowSize,
   stepSize:stepSize,
   numberOfClusters:numberOfClusters,
   variancePercentage:variancePercentage,
   showOriginalImage:showOriginalImage,
   showSegmentedOriginalImage:showSegmentedOriginalImage,
   showClickableCutImage:showClickableCutImage,
   showAverageValuesForFFT:showAverageValuesForFFT,
   showVarianceValuesForFFT:showVarianceValuesForFFT
  };
 };
 Client.UploadForm=function()
 {
  return Form.Render(Runtime.Curried(Client.RenderForm,4),Form.Run(function(f)
  {
   Global.alert("Species: "+Global.String(f.species)+", Name: "+f.name+", Vaccinated: "+Global.String(f.vaccinated));
  },Client.FormPiglet(Pet.New(Species.Cat,"",false))));
 };
 Client.ProcessImage=function()
 {
  var rvInput,hideImage,vHideImage,imageData,imageDataString,submit,vReversed;
  rvInput=Var$1.Create$1("");
  hideImage=Var$1.Create$1(true);
  vHideImage=View.Map(function(a)
  {
   return a?"hidden":"";
  },hideImage.get_View());
  imageData=Var$1.Create$1(null);
  imageDataString=Var$1.Create$1("");
  submit=Submitter.CreateOption(imageData.get_View());
  vReversed=View.MapAsync(function(a)
  {
   var input,b,b$1;
   return a!=null&&a.$==1?(input=a.$0,(b=null,Concurrency.Delay(function()
   {
    return Concurrency.Return("Show original image: "+Global.String(input.showOriginalImage));
   }))):(b$1=null,Concurrency.Delay(function()
   {
    return Concurrency.Return("No data");
   }));
  },submit.view);
  return Doc.Element("div",[],[Doc.Input([],rvInput),Doc.Button("Send",[],function()
  {
   submit.Trigger();
  }),Doc.Element("hr",[],[]),Doc.Element("h4",[AttrProxy.Create("class","text-muted")],[Doc.TextNode("The server responded:")]),Doc.Element("div",[AttrProxy.Create("class","jumbotron")],[Doc.Element("h1",[],[Doc.TextView(vReversed)])]),Client.ImageForm(function(data)
  {
   imageData.Set(data);
   imageDataString.Set("data:image/png;base64,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");
   hideImage.Set(false);
  }),Doc.Element("img",[AttrModule.Dynamic("class",vHideImage),AttrProxy.Create("alt","res"),AttrModule.Dynamic("src",imageDataString.get_View())],[])]);
 };
 Client.ImageForm=function(setter)
 {
  return Form.Render(Runtime.Curried(Client.RenderImage,17),Form.Run(function(data)
  {
   setter(data);
  },Client.IamgePiglet(ImageData.New("",true,"",TransmitionType.FFT,ClassificationType.KMeans,false,1,16,8,5,40,true,true,true,false,false))));
 };
 Client.RenderPerson=function(species,name,vaccinated,submit)
 {
  return Doc.Element("div",[],[Doc.Element("form",[AttrProxy.Create("method","POST"),AttrProxy.Create("action","/"),AttrProxy.Create("id","postForm")],[Doc.Element("div",[AttrModule.Class("form-group")],[Doc.Input([AttrModule.Class("form-control"),AttrProxy.Create("id","exampleInputEmail1"),AttrProxy.Create("placeholder","Pet name"),AttrProxy.Create("name","name")],name),Client.ShowErrorsFor(View$1.Through$1(submit.view,name))]),Doc.Element("div",[AttrModule.Class("form-radio")],[Doc.Element("h4",[],[Doc.TextNode("Species")]),Doc.Element("div",[],[Doc.Element("label",[],[Doc.Radio([AttrProxy.Create("type","radio"),AttrProxy.Create("name","species"),AttrProxy.Create("value","dog")],Species.Cat,species),Doc.TextNode(Global.String(Species.Cat))]),Doc.Element("label",[],[Doc.Radio([AttrProxy.Create("type","radio"),AttrProxy.Create("name","species"),AttrProxy.Create("value","cat")],Species.Dog,species),Doc.TextNode(Global.String(Species.Dog))]),Doc.Element("label",[],[Doc.Radio([AttrProxy.Create("type","radio"),AttrProxy.Create("name","species"),AttrProxy.Create("value","piglet")],Species.Piglet,species),Doc.TextNode(Global.String(Species.Piglet))])])]),Doc.Element("label",[AttrModule.Class("form-check")],[Doc.CheckBox([AttrProxy.Create("name","vaccinated")],vaccinated),Doc.TextNode("Vaccinated")]),Doc.Element("div",[],[Doc.Button("Submit",[],function()
  {
   submit.Trigger();
  })])])]);
 };
 Client.RenderImage=function(imagePath,cutImageWithCoordsFromAnnotations,annotationsPath,transmitionType,classificationType,setIndexes,indexes,windowSize,stepSize,numberOfClusters,variancePercentage,showOriginalImage,showSegmentedOriginalImage,showClickableCutImage,showAverageValuesForFFT,showVarianceValuesForFFT,submit)
 {
  return Doc.Element("div",[],[Doc.Element("h2",[],[Doc.TextNode("Settings:")]),Doc.Element("div",[AttrModule.Class("flex-start mb-2")],[Doc.Element("label",[AttrProxy.Create("class","custom-file-label")],[Doc.TextNode("Image: ")]),Doc.Input([AttrProxy.Create("type","file"),AttrProxy.Create("class","form-control file-input"),AttrProxy.Create("aria-label","Upload")],imagePath)]),Doc.Element("div",[AttrModule.Class("form-check mb-2")],[Doc.CheckBox([AttrModule.Class("form-check-input")],cutImageWithCoordsFromAnnotations),Doc.Element("label",[AttrModule.Class("ml-5")],[Doc.TextNode("Cut image with coordinates from annotations.xml?")])]),Doc.Element("div",[AttrModule.Class("flex-start mb-2")],[Doc.Element("label",[AttrProxy.Create("class","custom-file-label")],[Doc.TextNode("annotations.xml file: ")]),Doc.Input([AttrProxy.Create("type","file"),AttrProxy.Create("class","form-control file-input"),AttrProxy.Create("aria-label","Upload")],annotationsPath)]),Doc.Element("div",[AttrModule.Class("flex-start fai-st")],[Doc.Element("div",[],[Doc.Element("label",[],[Doc.TextNode("Trasmition type: "),Doc.Concat([Doc.Element("label",[AttrModule.Class("form-checkBox form-check")],[Doc.Radio([AttrModule.Class("form-check-input"),AttrProxy.Create("type","radio")],TransmitionType.FFT,transmitionType),Doc.TextNode(Global.String(TransmitionType.FFT))]),Doc.Element("label",[AttrModule.Class("form-checkBox form-check")],[Doc.Radio([AttrModule.Class("form-check-input"),AttrProxy.Create("type","radio")],TransmitionType.Wavelet,transmitionType),Doc.TextNode(Global.String(TransmitionType.Wavelet))]),Doc.Element("label",[AttrModule.Class("form-checkBox form-check")],[Doc.Radio([AttrModule.Class("form-check-input"),AttrProxy.Create("type","radio")],TransmitionType.Average,transmitionType),Doc.TextNode(Global.String(TransmitionType.Average))]),Doc.Element("label",[AttrModule.Class("form-checkBox form-check")],[Doc.Radio([AttrModule.Class("form-check-input"),AttrProxy.Create("type","radio")],TransmitionType.Variance,transmitionType),Doc.TextNode(Global.String(TransmitionType.Variance))])])])]),Doc.Element("div",[AttrModule.Class("ml-10")],[Doc.Element("label",[],[Doc.TextNode("Classification type: "),Doc.Concat([Doc.Element("label",[AttrModule.Class("form-checkBox form-check")],[Doc.Radio([AttrModule.Class("form-check-input"),AttrProxy.Create("type","radio")],ClassificationType.KMeans,classificationType),Doc.TextNode(Global.String(ClassificationType.KMeans))]),Doc.Element("label",[AttrModule.Class("form-checkBox form-check")],[Doc.Radio([AttrModule.Class("form-check-input"),AttrProxy.Create("type","radio")],ClassificationType.NeuralNetwork,classificationType),Doc.TextNode(Global.String(ClassificationType.NeuralNetwork))])])])])]),Doc.Element("div",[AttrModule.Class("form-group flex-start ")],[Doc.Element("div",[AttrModule.Class("form-check")],[Doc.CheckBox([AttrProxy.Create("id","setIndexes"),AttrModule.Class("form-check-input")],setIndexes),Doc.Element("label",[AttrModule.Class("ml-5")],[Doc.TextNode("Set indexes manually?")])]),Doc.Element("div",[AttrModule.Class("flex-start"),AttrProxy.Create("id","indexes")],[Doc.Element("label",[AttrModule.Class("ml-15 disabled")],[Doc.TextNode("Indexes: ")]),Doc.IntInputUnchecked([AttrModule.Class("form-control form-input"),AttrProxy.Create("disabled","true")],indexes)]),Client.ShowErrorsFor(View$1.Through$1(submit.view,indexes))]),Doc.Element("div",[AttrModule.Class("form-group mb-2")],[Doc.Element("label",[AttrModule.Class("flex-start")],[Doc.TextNode("Window size: "),Doc.IntInputUnchecked([AttrModule.Class("form-control form-input")],windowSize)]),Client.ShowErrorsFor(View$1.Through$1(submit.view,windowSize))]),Doc.Element("div",[AttrModule.Class("form-group mb-2")],[Doc.Element("label",[AttrModule.Class("flex-start")],[Doc.TextNode("Step size: "),Doc.IntInputUnchecked([AttrModule.Class("form-control form-input")],stepSize)]),Client.ShowErrorsFor(View$1.Through$1(submit.view,stepSize))]),Doc.Element("div",[AttrModule.Class("form-group mb-2")],[Doc.Element("label",[AttrModule.Class("flex-start")],[Doc.TextNode("Number of clusters: "),Doc.IntInputUnchecked([AttrModule.Class("form-control form-input")],numberOfClusters)]),Client.ShowErrorsFor(View$1.Through$1(submit.view,numberOfClusters))]),Doc.Element("div",[AttrModule.Class("form-group mb-2")],[Doc.Element("label",[AttrModule.Class("flex-start")],[Doc.TextNode("Variance percentage: "),Doc.IntInputUnchecked([AttrModule.Class("form-control form-input")],variancePercentage)]),Client.ShowErrorsFor(View$1.Through$1(submit.view,variancePercentage))]),Doc.Element("h2",[],[Doc.TextNode("What to show:")]),Doc.Element("div",[AttrModule.Class("form-check")],[Doc.CheckBox([AttrModule.Class("form-check-input")],showOriginalImage),Doc.Element("label",[AttrModule.Class("ml-5")],[Doc.TextNode("Original image")])]),Doc.Element("div",[AttrModule.Class("form-check")],[Doc.CheckBox([AttrModule.Class("form-check-input")],showSegmentedOriginalImage),Doc.Element("label",[AttrModule.Class("ml-5")],[Doc.TextNode("Segmented original image")])]),Doc.Element("div",[AttrModule.Class("form-check")],[Doc.CheckBox([AttrModule.Class("form-check-input")],showClickableCutImage),Doc.Element("label",[AttrModule.Class("ml-5")],[Doc.TextNode("Segmented original image")])]),Doc.Element("div",[AttrModule.Class("form-check")],[Doc.CheckBox([AttrModule.Class("form-check-input")],showAverageValuesForFFT),Doc.Element("label",[AttrModule.Class("ml-5")],[Doc.TextNode("Average values for FFT sliding windows")])]),Doc.Element("div",[AttrModule.Class("form-check mb-3")],[Doc.CheckBox([AttrModule.Class("form-check-input")],showVarianceValuesForFFT),Doc.Element("label",[AttrModule.Class("ml-5")],[Doc.TextNode("Variance values for FFT sliding windows")])]),Doc.Element("div",[],[Doc.Button("Run",[AttrModule.Class("btn btn-success ")],function()
  {
   submit.Trigger();
  })])]);
 };
 Client.IamgePiglet=function(init)
 {
  return Form.WithSubmit(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Form.Return(Runtime.Curried(ImageData.New,16)),Form.Yield(init.imagePath)),Form.Yield(init.cutImageWithCoordsFromAnnotations)),Form.Yield(init.annotationsPath)),Form.Yield(init.transmitionType)),Form.Yield(init.classificationType)),Form.Yield(init.setIndexes)),Validation.Is(function(v)
  {
   return v>0;
  },"Integer higher than 0 expected",Form.Yield(init.indexes))),Validation.Is(function(v)
  {
   return v>0;
  },"Integer higher than 0 expected",Form.Yield(init.windowSize))),Validation.Is(function(v)
  {
   return v>0;
  },"Integer higher than 0 expected",Form.Yield(init.numberOfClusters))),Validation.Is(function(v)
  {
   return v>0;
  },"Integer higher than 0 expected",Form.Yield(init.stepSize))),Validation.Is(function(v)
  {
   return v>=0&&v<=100;
  },"Integer from 0 to 100 expected",Form.Yield(init.variancePercentage))),Form.Yield(init.showOriginalImage)),Form.Yield(init.showSegmentedOriginalImage)),Form.Yield(init.showClickableCutImage)),Form.Yield(init.showAverageValuesForFFT)),Form.Yield(init.showVarianceValuesForFFT)));
 };
 Client.ShowErrorsFor=function(v)
 {
  return Doc.EmbedView(View.Map(function(a)
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
 Client.RenderForm=function(species,name,vaccinated,submit)
 {
  return Doc.Element("div",[],[Doc.Concat([Doc.Element("label",[],[Doc.Radio([],Species.Cat,species),Doc.TextNode(Global.String(Species.Cat))]),Doc.Element("label",[],[Doc.Radio([],Species.Dog,species),Doc.TextNode(Global.String(Species.Dog))]),Doc.Element("label",[],[Doc.Radio([],Species.Piglet,species),Doc.TextNode(Global.String(Species.Piglet))])]),Doc.Element("div",[],[Doc.Element("label",[],[Doc.TextNode("name: "),Doc.Input([],name)])]),Doc.CheckBox([],vaccinated)]);
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
  vReversed=View.MapAsync(function(a)
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
