from microdot_asyncio import Microdot, Response, send_file
from microdot_utemplate import render_template
from microdot_asyncio_websocket import with_websocket
from bme_module import BME280Module
from powerLab import POWERlab
import ujson
import random

I2C_ID = 0
SCL_PIN = 1
SDA_PIN = 0

bme_module = BME280Module(I2C_ID,SCL_PIN,SDA_PIN)

app = Microdot()
Response.default_content_type = 'text/html'

l1 = POWERlab(2)
l2 = POWERlab(3)
l3 = POWERlab(4)
l4 = POWERlab(5)

@app.route('/')
async def index(request):
    return render_template('index.html')


@app.route('/updateData')
async def get_sensor_data(request):
    print("Receive get data request!")
    sensor_reads_temp, sensor_reads_press, sensor_reads_hum, sensor_reads_alt = bme_module.get_sensor_readings()
    sensor_reads_alt = random.uniform(320, 450)
    print(sensor_reads_alt)
    return ujson.dumps({"readingTemp": sensor_reads_temp, "readingHum": sensor_reads_hum, "readingPress": sensor_reads_press, "readingAlt": sensor_reads_alt})


@app.route('/updateNoise')
async def get_ds18b20_reads(request):
    print("Receive get values request!")
    sensor_reads_noise = random.uniform(100, 30)#ds_sensor.get_noise_reading()
    return ujson.dumps({"readingNoise" : sensor_reads_noise})

@app.route("/ws")
@with_websocket
async def kontrolButton(request, ws):
    while True:
        data = await ws.receive()
        print(data)
        status =""
        if data == 'on1':
            l1.onPower()
            status ="ON"
        if data == 'off1':
            l1.offPower()
            status ="OFF"

        if data == 'on2':
            l2.onPower()
            status = "ON"
        if data == 'off2':
            l2.offPower()
            status ="OFF"

        if data == 'on3':
            l3.onPower()
            status ="ON"
        if data == 'off3':
            l3.offPower()
            status ="OFF"

        if data == 'on4':
            l4.onPower()
            status = "ON"
        if data == 'off4':
            l4.offPower()
            status ="OFF"

        await ws.send("OK")


@app.route('/shutdown')
async def shutdown(request):
    request.app.shutdown()
    return 'The server is shutting down...'


@app.route('/static/<path:path>')
def static(request, path):
    if '..' in path:
        # directory traversal is not allowed
        return 'Not found', 404
    return send_file('static/' + path)


if __name__ == "__main__":
    try:
        app.run(debug = True, host='192.168.0.109')
    except KeyboardInterrupt:
        pass
