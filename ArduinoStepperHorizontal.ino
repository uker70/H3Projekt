// 400 steps pr rotation
// -400 0 400 = 0
// min -800 max 800
// middle point/start-end position = 0

#include <AccelStepper.h>
#include <Thread.h>

#define motorPin1 2
#define motorPin2 3
#define motorPin3 4
#define motorPin4 5
#define MotorInterfaceType 8
AccelStepper stepper = AccelStepper(MotorInterfaceType, motorPin1, motorPin2, motorPin3, motorPin4, true);

Thread seekThread = Thread();
int runSeekModeTarget;

void setup() {
  // put your setup code here, to run once:
  stepper.setCurrentPosition(0);
  stepper.setMaxSpeed(1200);
  stepper.setAcceleration(100);
  seekThread.onRun(Seek);
  seekThread.setInterval(30000);
  Serial.begin(9600);

  Serial.println("setup");
}

void Seek(){
  Serial.println(stepper.currentPosition());
  if(stepper.currentPosition() == -400 || stepper.currentPosition() < 0){
    runSeekModeTarget = 400;
  }
  else if(stepper.currentPosition() == 400 || stepper.currentPosition() >= 0){
    runSeekModeTarget = -400;
  }
  Serial.println(runSeekModeTarget);
}

void loop() {
  if(seekThread.shouldRun()){
    Serial.println("Automatic Seek Run");
    seekThread.run();
  }
  else{
    if(runSeekModeTarget == 400 && stepper.currentPosition() < 400){
      stepper.setSpeed(30);
      stepper.move(1);
    }
    else if(runSeekModeTarget == -400 && stepper.currentPosition() > -400){
      stepper.setSpeed(30);
      stepper.move(-1);
    }
    stepper.runSpeedToPosition();
  }
}
