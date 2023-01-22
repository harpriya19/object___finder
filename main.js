
status = ''
object = [];


function setup ()
{
canvas = createCanvas(600,450);
canvas.center();
video = createCapture(VIDEO);
video.size(600,450);
video.hide();
}

function draw(){
    image(video,0,0,600,450);
    if(status != ''){
        objectDetector.detect(video,gotResult)
        for(i = 0 ; i < object.length; i++){
            document.getElementById("status").innerHTML = "Object Detected";
            fill("#F8D39E");
            percentage = floor(object[i].confidence *100);
            text(object[i].label + " " + percentage + "%", object[i].x , object[i].y);
            stroke("F8D39E");
            noFill();
            rect(object[i].x , object[i],y, object[i].width , object[i].height);
            
            if(object[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById('object_status').innerHTML = object_name + "found";
             synth =   window.speakSynthisis;
             utterthis = new SpeechSynthesisUtterance(object_name + "found");
             synth.speak(utterthis);

        }

         else
        {
            document.getElementById('object_status').innerHTML = "object not found";
        }
        }
    

    }
}

function gotResult(error,results)
{
 if (error){
    console.log(error);
 }    
 console.log(results);
 object = results;

}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    object_name = document.getElementById("object_name").value;
    document.getElementById('status').innerHTML = 'Detecting objects';
}

function modelLoaded()
{
    console.log('Model is loaded');
    status = true;
}
