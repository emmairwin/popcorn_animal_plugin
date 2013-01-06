// PLUGIN: Subtitle

(function ( Popcorn ) {
 
 var i = 0,
 createDefaultContainer = function( context, id ) {
 
 var ctxContainer = context.container = document.createElement( "div" ),
 style = ctxContainer.style,
 media = context.media;
 
 var updatePosition = function() {
 var position = context.position();
 // the video element must have height and width defined
 style.fontSize = "18px";
 style.width = media.offsetWidth + "px";
 style.top = position.top  + media.offsetHeight - ctxContainer.offsetHeight - 40 + "px";
 style.left = position.left + "px";
 
 setTimeout( updatePosition, 10 );
 };
 
 ctxContainer.id = id || Popcorn.guid();
 style.position = "absolute";
 style.color = "white";
 style.textShadow = "black 2px 2px 6px";
 style.fontWeight = "bold";
 style.textAlign = "center";
 
 updatePosition();
 
 context.media.parentNode.appendChild( ctxContainer );
 
 return ctxContainer;
 };
 
 /**
  * Subtitle popcorn plug-in
  * Displays a subtitle over the video, or in the target div
  * Options parameter will need a start, and end.
  * Optional parameters are target and text.
  * Start is the time that you want this plug-in to execute
  * End is the time that you want this plug-in to stop executing
  * Target is the id of the document element that the content is
  *  appended to, this target element must exist on the DOM
  * Text is the text of the subtitle you want to display.
  *
  * @param {Object} options
  *
  * Example:
  var p = Popcorn('#video')
  .subtitle({
  start:            5,                 // seconds, mandatory
  end:              15,                // seconds, mandatory
  text:             'Hellow world',    // optional
  target:           'subtitlediv',     // optional
  } )
  *
  */
 
 Popcorn.plugin( "animal_plugin" , {
                
                manifest: {
                about: {
                name: "Popcorn Animal Plugin",
                version: "0.1",
                author: "",
                website: ""
                },
                options: {
                start: {
                elem: "input",
                type: "text",
                label: "Start"
                
                },
                end: {
                elem: "input",
                type: "text",
                label: "End"
                },
                target: "animal_plugin-container",
                title: {
                elem: "input",
                type: "text",
                label: "Title"
                },
                description: {
                elem: "input",
                type: "text",
                label: "Description"
                },
                picture: {
                elem: "input",
                type: "text",
                label: "Picture"
                }
                }
                },
                
                _setup: function( options ) {
                var newdiv = document.createElement( "div" );
                
                newdiv.id = "animal_plugin-" + i++;
                newdiv.style.display = "none";
                
                // Creates a div for  to use
                ( !this.container && ( !options.target || options.target === "animal_plugin-container" ) ) &&
                createDefaultContainer( this );
                
                // if a target is specified, use that
                if ( options.target && options.target !== "animal_plugin-container" ) {
                // In case the target doesn't exist in the DOM
                options.container = document.getElementById( options.target ) || createDefaultContainer( this, options.target );
                } else {
                // use /Users/emmairwin/github/animal_plugin/popcorn.animal_plugin.htmlshared default container
                options.container = this.container;
                }
                
                document.getElementById( options.container.id ) && document.getElementById( options.container.id ).appendChild( newdiv );
                options.innerContainer = newdiv;
                
                options.showAnimal = function() {
                options.innerContainer.innerHTML = "<h1>" + options.title + "</h1>" +
                                                    options.description + 
                                                    "<img style='max-height:50px;min-width:50px' src='" + options.picture + "'/>";
                };
                },
                /**
                 * @member animal
                 * The start function will be executed when the currentTime
                 * of the video  reaches the start time provided by the
                 * options variable
                 */
                start: function( event, options ){
                options.innerContainer.style.display = "inline";
                options.showAnimal( options );
                },
                /**
                 * @member animal
                 * The end function will be executed when the currentTime
                 * of the video  reaches the end time provided by the
                 * options variable
                 */
                end: function( event, options ) {
                options.innerContainer.style.display = "none";
                options.innerContainer.innerHTML = "";
                },
                
                _teardown: function ( options ) {
                options.container.removeChild( options.innerContainer );
                }
                
                });
 
 })( Popcorn );
