import threading
import cv2
import numpy as np
import tensorflow as tf
from imageai.Detection import ObjectDetection
import os
import time
import subprocess

execution_path = os.getcwd()

detector = ObjectDetection()
detector.setModelTypeAsRetinaNet()
detector.setModelPath(os.path.join(execution_path, "model_all.h5"))
detector.loadModel("flash")
custom_o = detector.CustomObjects(person=True)

cap = cv2.VideoCapture("rtmp://localhost:1935/live/cam0")
cap.set(cv2.CAP_PROP_BUFFERSIZE, 0)
cap.set(cv2.CAP_PROP_FPS, 2)

ret, frame = cap.read()

output_uri = "rtmp://172.16.2.36/live/cam0_proc"

# gather video info to ffmpeg
fps = 3
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# command and params for ffmpeg
command = ['ffmpeg',
           '-y',
           '-f', 'rawvideo',
           '-vcodec', 'rawvideo',
           '-pix_fmt', 'bgr24',
           '-s', "{}x{}".format(width, height),
           '-r', str(fps),
           '-i', '-',
           '-c:v', 'libx264',
           '-pix_fmt', 'yuv420p',
           '-preset', 'ultrafast',
           '-f', 'flv',
           "rtmp://172.16.2.36/live/cam0_proc"]
           
proc = subprocess.Popen(command, stdin=subprocess.PIPE)
# Check if the drone feed is opened correctly
if not cap.isOpened():
    raise IOError("Cannot connect to drone feed.")


def fu():
    global frame
    while True:
        time.sleep(0.01)
        ret, f = cap.read()
        if ret:
            with locke:
                frame = f
        else:
            # what the fuck when wrong, it should not take this branch
            # therefore, what the fuck
            print("what the fuck")

image_getter = threading.Thread(target=fu)
image_getter.start()
locke = threading.RLock()

while True:
    print("b")
    c = cv2.waitKey(1)
    if c == 'q':
        break
    p = frame
    pframe, detections = detector.detectCustomObjectsFromImage(custom_objects=custom_o, input_type="array", input_image=p, output_type="array", minimum_percentage_probability=30)
    cv2.imshow('nicky sexy cam', pframe)
    proc.stdin.write(pframe.tobytes())

cap.release()
cv2.destroyAllWindows()
