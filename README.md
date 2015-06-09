

# SensorDataStorage



## Usage


##REST API
**Version: 0.1**  
**Format: JSON**

###/nodes
####HTTP Method: GET
**Response Body:**
  
        [
            {
                "id": "123456789",
                "name": "node1",
                "url": "http://localhost",
                "sensors": [
                    {
                        "rel": "self",
                        "href": "http://host/nodes/123456789/sensors/1"
                    },
                    {
                        "rel": "self",
                        "href": "http://host/nodes/123456789/sensors/2"
                    }
                ]
            }
        ]

###/nodes/:node_id
####HTTP Method: GET

        [
            {
                "id": "123456789",
                "name": "node1",
                "url": "http://localhost",
                "sensors": [
                    {
                        "rel": "self",
                        "href": "http://host/nodes/123456789/sensors/1"
                    },
                    {
                        "rel": "self",
                        "href": "http://host/nodes/123456789/sensors/2"
                    }
                ]
            }
        ]

###/nodes/:node_id/sensors
####HTTP Method: GET

        [
            {
                "id": "1",
                "name": "sensor1",
                "captureInterval": 1
            },
            {
                "id": "2",
                "name": "sensor2",
                "captureInterval": 1
            }
        ]

###/nodes/:node_id/sensors/:sensor_id
####HTTP Method: GET

        [
            {
                "id": "1",
                "name": "sensor1",
                "captureInterval": 1
            }
        ]

###/nodes/:node_id/sensors/:sensor_id/sensordata
####HTTP Method: GET
        [
            {
                "id": "de83dddf-2233-4efe-993f-dd71ee1ad251"
                "timestamp": 1425141348,
                "data": "..."
            },
            {
                "id": "ffc5d904-edb2-42ad-9d7e-8830374fa3ce"
                "timestamp": 1425141351,
                "data": "..."
            }
        ]



## Developing



### Tools

