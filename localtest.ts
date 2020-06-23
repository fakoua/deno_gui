import * as swissKnife from "https://deno.land/x/swissKnife/mod.ts"
let res = await swissKnife.speak("Hello from the Deno", {rate: 3, volume: 100})


await swissKnife.beep(500, 1000) //play 500 hz for 1 sec.


await swissKnife.winBeep()


await swissKnife.notification("My Title", "Hello Notification", 77, 2000)


//Check any message box in the background
let res = await swissKnife.questionBox("A Question", "Do you want to quite smoking?")
if (res) {
    console.log("Great, keep trying!")
} else {
    console.log("Not Great, but keep trying!")
}


