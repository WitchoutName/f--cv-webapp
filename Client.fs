namespace med

open WebSharper
open WebSharper.JavaScript
open WebSharper.Forms
open WebSharper.Forms.Bootstrap
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html
open System.Collections.Generic
open Emgu.CV
open Emgu.CV.CvEnum
open Emgu.CV.Structure

open Emgu.CV;
open Emgu.CV.CvEnum;
open Emgu.CV.Structure;
open Emgu.CV.UI;
open System.Drawing;


[<JavaScript>]
module Client =

    let Main () =
        let rvInput = Var.Create ""
        let submit = Submitter.CreateOption rvInput.View
        let vReversed =
            submit.View.MapAsync(function
                | None -> async { return "" }
                | Some input -> Server.DoSomething input
            )
        div [] [
            Doc.Input [] rvInput
            Doc.Button "Send" [] submit.Trigger
            hr [] []
            h4 [attr.``class`` "text-muted"] [text "The server responded:"]
            div [attr.``class`` "jumbotron"] [h1 [] [textView vReversed]]
        ]

    type Species =
        | Cat | Dog | Piglet
        
        override this.ToString() =
            match this with
            | Cat -> "cat"
            | Dog -> "dog"
            | Piglet -> "piglet"
    
    type Pet = { species: Species; name: string; vaccinated: bool; }
    
    let FormPiglet (init: Pet) =
        Form.Return (fun s n v -> { species = s; name = n; vaccinated = v; })
        <*> Form.Yield init.species
        <*> (Form.Yield init.name
            |> Validation.IsNotEmpty "Please enter your pet's name.")
        <*> Form.Yield init.vaccinated
        |> Form.WithSubmit

    let RenderForm species name vaccinated (submit: Submitter<Result<_>>) =
        div [] [
            Doc.Concat [
                label [] [Doc.Radio [] Cat species; text (string Cat)]
                label [] [Doc.Radio [] Dog species; text (string Dog)]
                label [] [Doc.Radio [] Piglet species; text (string Piglet)]
            ]
            div [] [label [] [text "name: "; Doc.Input [] name]]
            Doc.CheckBox [] vaccinated
        ]

    let ShowErrorsFor v =
        v
        |> View.Map (function
            | Success _ -> Doc.Empty
            | Failure errors ->
                Doc.Concat [
                    for error in errors do
                        yield p [attr.style "color:red"] [text error.Text] :> _
                ]
        )
        |> Doc.EmbedView




    type TransmitionType = 
        | FFT | Wavelet | Average | Variance

        override this.ToString() =
            match this with
            | FFT -> "FFT"
            | Wavelet -> "Wavelet"
            | Average -> "Average values"
            | Variance -> "Variance values"

    type ClassificationType =
        | KMeans | NeuralNetwork

        override this.ToString() =
            match this with
            | KMeans -> "K-means"
            | NeuralNetwork -> "Neural Network"

    type ImageData = {
        imagePath: string; 
        cutImageWithCoordsFromAnnotations: bool; 
        annotationsPath: string; 
        transmitionType: TransmitionType; 
        classificationType: ClassificationType; 
        setIndexes: bool; 
        indexes: int;
        windowSize: int;
        stepSize: int;
        numberOfClusters: int;
        variancePercentage: int;
        showOriginalImage: bool;
        showSegmentedOriginalImage: bool;
        showClickableCutImage: bool;
        showAverageValuesForFFT: bool;
        showVarianceValuesForFFT: bool;
    }

    let IamgePiglet (init: ImageData) =
        Form.Return (fun imagePath cutImageWithCoordsFromAnnotations annotationsPath transmitionType classificationType setIndexes indexes windowSize stepSize numberOfClusters variancePercentage showOriginalImage showSegmentedOriginalImage showClickableCutImage showAverageValuesForFFT showVarianceValuesForFFT -> { 
             imagePath = imagePath; 
             cutImageWithCoordsFromAnnotations=cutImageWithCoordsFromAnnotations;
             annotationsPath=annotationsPath;
             transmitionType=transmitionType;
             classificationType=classificationType;
             setIndexes=setIndexes;
             indexes=indexes;
             windowSize=windowSize;
             stepSize=stepSize;
             numberOfClusters=numberOfClusters;
             variancePercentage=variancePercentage;
             showOriginalImage=showOriginalImage;
             showSegmentedOriginalImage=showSegmentedOriginalImage;
             showClickableCutImage=showClickableCutImage;
             showAverageValuesForFFT=showAverageValuesForFFT;
             showVarianceValuesForFFT=showVarianceValuesForFFT
        })
        <*> Form.Yield init.imagePath
        <*> Form.Yield init.cutImageWithCoordsFromAnnotations
        <*> Form.Yield init.annotationsPath
        <*> Form.Yield init.transmitionType
        <*> Form.Yield init.classificationType
        <*> Form.Yield init.setIndexes
        <*> (Form.Yield init.indexes
        |> Validation.Is (fun v -> v > 0) "Integer higher than 0 expected")
        <*> (Form.Yield init.windowSize
        |> Validation.Is (fun v -> v > 0) "Integer higher than 0 expected")
        <*> (Form.Yield init.numberOfClusters
        |> Validation.Is (fun v -> v > 0) "Integer higher than 0 expected")
        <*> (Form.Yield init.stepSize
        |> Validation.Is (fun v -> v > 0) "Integer higher than 0 expected")
        <*> (Form.Yield init.variancePercentage
        |> Validation.Is (fun v -> v >= 0 && v <=100) "Integer from 0 to 100 expected")
        <*> Form.Yield init.showOriginalImage
        <*> Form.Yield init.showSegmentedOriginalImage
        <*> Form.Yield init.showClickableCutImage
        <*> Form.Yield init.showAverageValuesForFFT
        <*> Form.Yield init.showVarianceValuesForFFT
        |> Form.WithSubmit
    
    let RenderImage imagePath cutImageWithCoordsFromAnnotations annotationsPath transmitionType classificationType setIndexes indexes windowSize stepSize numberOfClusters variancePercentage showOriginalImage showSegmentedOriginalImage showClickableCutImage showAverageValuesForFFT showVarianceValuesForFFT (submit: Submitter<Result<_>>) =
        div [] [
            h2 [] [text "Settings:"]
            div [Attr.Class "flex-start mb-2"] [label [attr.``class`` "custom-file-label"] [text "Image: "]; Doc.Input [attr.``type`` "file"; attr.``class`` "form-control file-input"; Attr.Create "aria-label" "Upload"] imagePath]
            div [Attr.Class "form-check mb-2"] [Doc.CheckBox [Attr.Class "form-check-input"] cutImageWithCoordsFromAnnotations; label [Attr.Class "ml-5"] [text "Cut image with coordinates from annotations.xml?"]]
            div [Attr.Class "flex-start mb-2"] [label [attr.``class`` "custom-file-label"] [text "annotations.xml file: "]; Doc.Input [attr.``type`` "file"; attr.``class`` "form-control file-input"; Attr.Create "aria-label" "Upload"] annotationsPath]
            div [Attr.Class "flex-start fai-st"] [
                div [] [label [] [text "Trasmition type: "; Doc.Concat [
                            label [Attr.Class "form-checkBox form-check"] [Doc.Radio [Attr.Class "form-check-input"; attr.``type`` "radio"] FFT transmitionType; text (string FFT)]
                            label [Attr.Class "form-checkBox form-check"] [Doc.Radio [Attr.Class "form-check-input"; attr.``type`` "radio"] Wavelet transmitionType; text (string Wavelet)]
                            label [Attr.Class "form-checkBox form-check"] [Doc.Radio [Attr.Class "form-check-input"; attr.``type`` "radio"] Average transmitionType; text (string Average)]
                            label [Attr.Class "form-checkBox form-check"] [Doc.Radio [Attr.Class "form-check-input"; attr.``type`` "radio"] Variance transmitionType; text (string Variance)]
                        ]
                    ]
                ]
                div [Attr.Class "ml-10"] [label [] [text "Classification type: "; Doc.Concat [
                            label [Attr.Class "form-checkBox form-check"] [Doc.Radio [Attr.Class "form-check-input"; attr.``type`` "radio"] KMeans classificationType; text (string KMeans)]
                            label [Attr.Class "form-checkBox form-check"] [Doc.Radio [Attr.Class "form-check-input"; attr.``type`` "radio"] NeuralNetwork classificationType; text (string NeuralNetwork)]
                        ]
                    ]
                ]
            ]
            div [Attr.Class "form-group flex-start "] [div [Attr.Class "form-check"] [Doc.CheckBox [attr.id "setIndexes"; Attr.Class "form-check-input"] setIndexes; label [Attr.Class "ml-5"] [text "Set indexes manually?"]]; div [Attr.Class "flex-start"; attr.id "indexes"] [label [Attr.Class "ml-15 disabled"] [text "Indexes: "]; Doc.IntInputUnchecked [Attr.Class "form-control form-input"; attr.disabled "true"] indexes]; ShowErrorsFor (submit.View.Through indexes) ]
            div [Attr.Class "form-group mb-2"] [label [Attr.Class "flex-start"] [text "Window size: "; Doc.IntInputUnchecked [Attr.Class "form-control form-input"] windowSize]; ShowErrorsFor (submit.View.Through windowSize)]
            div [Attr.Class "form-group mb-2"] [label [Attr.Class "flex-start"] [text "Step size: "; Doc.IntInputUnchecked [Attr.Class "form-control form-input"] stepSize]; ShowErrorsFor (submit.View.Through stepSize)]
            div [Attr.Class "form-group mb-2"] [label [Attr.Class "flex-start"] [text "Number of clusters: "; Doc.IntInputUnchecked [Attr.Class "form-control form-input"] numberOfClusters]; ShowErrorsFor (submit.View.Through numberOfClusters)]
            div [Attr.Class "form-group mb-2"] [label [Attr.Class "flex-start"] [text "Variance percentage: "; Doc.IntInputUnchecked [Attr.Class "form-control form-input"] variancePercentage]; ShowErrorsFor (submit.View.Through variancePercentage)]
            h2 [] [text "What to show:"]
            div [Attr.Class "form-check"] [Doc.CheckBox [Attr.Class "form-check-input"] showOriginalImage; label [Attr.Class "ml-5"] [text "Original image"]]
            div [Attr.Class "form-check"] [Doc.CheckBox [Attr.Class "form-check-input"] showSegmentedOriginalImage; label [Attr.Class "ml-5"] [text "Segmented original image"]]
            div [Attr.Class "form-check"] [Doc.CheckBox [Attr.Class "form-check-input"] showClickableCutImage; label [Attr.Class "ml-5"] [text "Segmented original image"]]
            div [Attr.Class "form-check"] [Doc.CheckBox [Attr.Class "form-check-input"] showAverageValuesForFFT; label [Attr.Class "ml-5"] [text "Average values for FFT sliding windows"]]
            div [Attr.Class "form-check mb-3"] [Doc.CheckBox [Attr.Class "form-check-input"] showVarianceValuesForFFT; label [Attr.Class "ml-5"] [text "Variance values for FFT sliding windows"]]
            div [] [Doc.Button "Run" [Attr.Class "btn btn-success "] submit.Trigger]
        ]
    
        


    //let RenderPerson (species)
    //         (name: Var<string>)
    //         ( vaccinated: Var<bool>)
    //         (submit: Submitter<Result<_>>) =
    //    div [] [
    //        form [attr.method "POST"; attr.action "/"] [
    //            div [Attr.Class "form-group"] [
    //                Doc.Input [Attr.Class "form-control"; attr.id "exampleInputEmail1"; attr.placeholder "Pet name"; attr.name "name"] name
    //                ShowErrorsFor (submit.View.Through name)
    //            ]
    //            div [Attr.Class "form-radio"] [
    //                h4 [] [text "Species"]
    //                div [] [
    //                    label [] [input [attr.``type`` "radio"; attr.name "species"; attr.value "dog"] []; text (string Cat)]
    //                    label [] [input [attr.``type`` "radio";attr.name "species"; attr.value "cat"] []; text (string Dog)]
    //                    label [] [input [attr.``type`` "radio";attr.name "species"; attr.value "piglet"] []; text (string Piglet)]
    //                ]
    //            ]
    //            label [Attr.Class "form-check"] [Doc.CheckBox [attr.name "vaccinated"] vaccinated; text "Vaccinated"]
            
    //            div [] [
    //               input [attr.``type`` "submit"] [text "Submit"] //submit.Trigger
    //            ]
    //        ]
    //    ]
    
    let RenderPerson species name vaccinated (submit: Submitter<Result<_>>) =
        div [] [
            form [attr.method "POST"; attr.action "/"; attr.id "postForm"] [
                div [Attr.Class "form-group"] [
                    Doc.Input [Attr.Class "form-control"; attr.id "exampleInputEmail1"; attr.placeholder "Pet name"; attr.name "name"] name
                    ShowErrorsFor (submit.View.Through name)
                ]
                div [Attr.Class "form-radio"] [
                    h4 [] [text "Species"]
                    div [] [
                        label [] [Doc.Radio [attr.``type`` "radio"; attr.name "species"; attr.value "dog"] Cat species; text (string Cat)]
                        label [] [Doc.Radio [attr.``type`` "radio";attr.name "species"; attr.value "cat"] Dog species; text (string Dog)]
                        label [] [Doc.Radio [attr.``type`` "radio";attr.name "species"; attr.value "piglet"] Piglet species; text (string Piglet)]
                    ]
                ]
                label [Attr.Class "form-check"] [Doc.CheckBox [attr.name "vaccinated"] vaccinated; text "Vaccinated"]
        

                div [] [
                   Doc.Button "Submit" [] submit.Trigger
                ]
            ]
        ]

    let ImageForm (setter) =
        IamgePiglet {
            imagePath = ""
            cutImageWithCoordsFromAnnotations = true
            annotationsPath = ""
            transmitionType = TransmitionType.FFT
            classificationType = ClassificationType.KMeans
            setIndexes = false
            indexes = 1
            windowSize = 16
            stepSize = 8
            numberOfClusters = 5
            variancePercentage = 40
            showOriginalImage = true
            showSegmentedOriginalImage = true
            showClickableCutImage = true
            showAverageValuesForFFT = false
            showVarianceValuesForFFT = false
        }
        |> Form.Run (fun data -> 
            //let message = "Image path: " + string data.imagePath
            //JS.Alert message
            setter data
        )
        |> Form.Render RenderImage

    let ProcessImage () =
        let rvInput = Var.Create ""

        let hideImage = Var.Create true
        let vHideImage = hideImage.View.Map(function | true -> "hidden" | false -> "")
        let imageData = Var.Create Unchecked.defaultof<ImageData>

        let imageDataString = Var.Create ""

        let submit = Submitter.CreateOption imageData.View
        let vReversed =
            submit.View.MapAsync(function
                            | None -> async { return ("No data")}
                            | Some input -> async { return ("Show original image: " + string input.showOriginalImage)}
            )
        
            

                                 
        div [] [
            Doc.Input [] rvInput
            Doc.Button "Send" [] submit.Trigger
            hr [] []
            h4 [attr.``class`` "text-muted"] [text "The server responded:"]
            div [attr.``class`` "jumbotron"] [h1 [] [textView vReversed]]

            ImageForm (fun (data: ImageData) -> 
                imageData.Set (data)
                imageDataString.Set "data:image/png;base64,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"
                //Server.AnalizeImage "ssssssssS"
                hideImage.Set false
            )

            img [attr.``class`` vHideImage.V; attr.alt "res"; attr.src imageDataString.View.V][]            
        ]

    let UploadForm () =
        FormPiglet {
             species = Species.Cat
             name = ""
             vaccinated = false}
        |> Form.Run (fun f ->
            //                           jak dostat validni data dal?
            //                             1. querystring (location.replace) - ztratila by se interpunkce
            //                             2. POST request z formu
            //                               jak odeslat form?
            //                                 1. input submit - nefungovala by ws.forms validace
            //                                 2. document.getElementById("myForm").submit(); - jak referencovat z f#? ¯\_(ツ)_/¯
            //                                 3. manualni http requst na jiny endpoint - dva endpointy se stejnym rozhranim k validaci?
            //                             3. poslat do backendove funkce - jak? kam? jak referencovat?
            //                               

             //JS.Window.Location.Replace("/?hehe=heeehee&brr=skrr")
            //use img = new Image<Bgr, byte>(400, 200, Bgr(255.,0.,0.))
            //let f = ref (MCvFont(FONT.CV_FONT_HERSHEY_COMPLEX, 1., 1.))
            //img.Draw("Hello, World", f, System.Drawing.Point(10,80), Bgr(0.,255.,0.))

            //let form = JS.Document.GetElementById("postForm")
            let message = "Species: " + string f.species + ", Name: " + f.name + ", Vaccinated: " + f.vaccinated.ToString()
            JS.Alert message)
        |> Form.Render RenderForm


    //let UploadFrom2 (post) =
    //    let postForm = List.concat post |> dict |> Dictionary
    //    let fields: IDictionary<string, var> =
    //        [ "species", ""; "vaccinated", false; "Bananas", 0.45 ]
    //        |> dict

    //    let errors = Dictionary<string, string>()
        
        


    //    div [] [
    //        form [attr.method "POST"; attr.action "/"] [
    //            div [Attr.Class "form-group"] [
    //                Doc.Input [Attr.Class "form-control"; attr.id "exampleInputEmail1"; attr.placeholder "Pet name"; attr.name "name"] name
    //                ShowErrorsFor (submit.View.Through name)
    //            ]
    //            div [Attr.Class "form-radio"] [
    //                h4 [] [text "Species"]
    //                div [] [
    //                    label [] [input [attr.``type`` "radio"; attr.name "species"; attr.value "dog"] []; text (string Cat)]
    //                    label [] [input [attr.``type`` "radio";attr.name "species"; attr.value "cat"] []; text (string Dog)]
    //                    label [] [input [attr.``type`` "radio";attr.name "species"; attr.value "piglet"] []; text (string Piglet)]
    //                ]
    //            ]
    //            label [Attr.Class "form-check"] [Doc.CheckBox [attr.name "vaccinated"] vaccinated; text "Vaccinated"]
            
    //            div [] [
    //               input [attr.``type`` "submit"] [text "Submit"] //submit.Trigger
    //            ]
    //        ]
    //    ]
