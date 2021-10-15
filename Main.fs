namespace med

open WebSharper
open WebSharper.JavaScript;
open WebSharper.Sitelets
open WebSharper.UI
open WebSharper.UI.Server



type EndPoint =
    | [<EndPoint "/">] Home
    | [<EndPoint "/about">] About

module Templating =
    open WebSharper.UI.Html

    type MainTemplate = Templating.Template<"Main.html">

    // Compute a menubar where the menu item for the given endpoint is active
    let MenuBar (ctx: Context<EndPoint>) endpoint : Doc list =
        let ( => ) txt act =
             li [if endpoint = act then yield attr.``class`` "active"] [
                a [attr.href (ctx.Link act)] [text txt]
             ]
        [
            "Home" => EndPoint.Home
            "About" => EndPoint.About
        ]

    let Main ctx action (title: string) (body: Doc list) =
        Content.Page(
            MainTemplate()
                .Title(title)
                //.MenuBar(MenuBar ctx action)
                .Body(body)
                .Doc()
        )

//module Logging =
    //let logger = LogManager.GetCurrentClassLogger()
//    let echoWorker = new Worker(fun self ->
//        self.Onmessage <- fun event ->

//            // Here we're assuming we'll only ever receive strings
//            let msg = event.Data :?> string

//            // Send a message to the main thread
//            self.PostMessage("The worker said: " + msg)
//    )

//    // This will send the string to the worker, receive it back,
//    // and print to the console: "The worker said: Hello world!"
//    echoWorker.PostMessage("Hello world!")

//    // The worker is still running, we can send more messages
//    // and they will be sent back and forth and printed.
//    echoWorker.PostMessage("Hi again!")

module Site =
    open WebSharper.UI.Html

    let HomePage ctx =
        Templating.Main ctx EndPoint.Home "Home" [
            h1 [] [text "Say Hi to the server!"]
            div [] [client <@ Client.Main() @>]
        ]

    let AboutPage ctx =
        Templating.Main ctx EndPoint.About "About" [
            h1 [] [text "About"]
            p [] [text "This is a template WebSharper client-server application."]
        ]


    let UploadPage (ctx: Context<_>) = 
        async {
            let postStr = ctx.Request.Post.ToList()
            
            let content = 
                div [] [
                    h1 [] [text ("fff: " + sprintf "%A" postStr)]
                    client <@ Client.UploadForm() @>
                    img [attr.alt "res"; attr.src "data:image/png;base64,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"] []
                ]
            return! Templating.Main ctx EndPoint.Home "Home" [content]
        }

    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | EndPoint.Home -> UploadPage ctx
            | EndPoint.About -> AboutPage ctx
        )
