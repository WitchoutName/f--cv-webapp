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

    let RenderForm species name vaccinated =
        div [] [
            Doc.Concat [
                label [] [Doc.Radio [] Cat species; text (string Cat)]
                label [] [Doc.Radio [] Dog species; text (string Dog)]
                label [] [Doc.Radio [] Piglet species; text (string Piglet)]
            ]
            Doc.Input [] name
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
    
    let RenderPerson (species)
             (name: Var<string>)
             ( vaccinated: Var<bool>)
             (submit: Submitter<Result<_>>) =
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
            //                             3. poslat do backendove funkce - jak? kam? jak referencovat?
            //                               

             //JS.Window.Location.Replace("/?hehe=heeehee&brr=skrr")
            //use img = new Image<Bgr, byte>(400, 200, Bgr(255.,0.,0.))
            //let f = ref (MCvFont(FONT.CV_FONT_HERSHEY_COMPLEX, 1., 1.))
            //img.Draw("Hello, World", f, System.Drawing.Point(10,80), Bgr(0.,255.,0.))

            //let form = JS.Document.GetElementById("postForm")
            let message = "Species: " + string f.species + ", Name: " + f.name + ", Vaccinated: " + f.vaccinated.ToString()
            JS.Alert message)
        |> Form.Render RenderPerson


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
