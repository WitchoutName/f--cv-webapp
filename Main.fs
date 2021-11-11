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
                div [] [ client <@ Client.ProcessImage() @> ]
                    
            return! Templating.Main ctx EndPoint.Home "Home" [content]
        }

    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | EndPoint.Home -> UploadPage ctx
            | EndPoint.About -> AboutPage ctx
        )
