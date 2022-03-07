# ISS Traccar Server

Created for [Traccar](https://www.traccar.org).
<br>
Node JS Bot for monitoring the International Space Station and displaying the position relative to the earth on your Traccar Map
<br>

## Configuration

| Name | Description | Default | Required |
| ---- | ------ | ------- | -------- |
| protocol | HTTP/S Protocol of trccar server | HTTP | True |
| hostname | Used to connect to gps backend | N/A | True |
| port | Port of the traccar server's gps service | 5055 | True |
| iss_id | ID Used to identify the device on the Traccar Frontend | 12345 | True |
| liveDataUrl | Used to fetch the current position of the ISS | https://api.wheretheiss.at/v1/satellites/25544 | True |
| logLevel | Used to specifiy how much infomation should be output by the service | WARNING | False |
| timeBetweenLocationChecks | Time between location updates | 5000ms (5 Seconds) | True |
