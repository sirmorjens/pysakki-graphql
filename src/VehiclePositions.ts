import mqtt, { type MqttClient } from 'mqtt'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'

const url = "wss://mqtt.digitransit.fi"
let mqttClient = mqtt.connect(url)

let mqttCallback: (message: GtfsRealtimeBindings.transit_realtime.FeedMessage) => void

const mqttTopics: {
    pendingTopics: string[],
    subcsribedTopics: string[],
} = {
    pendingTopics: [],
    subcsribedTopics: [],
}
export const VehiclePositionsWS = async (
    callback: (
        message: GtfsRealtimeBindings.transit_realtime.FeedMessage,
    ) => void): Promise<MqttClient> => {

    mqttCallback = callback;

    mqttClient.on('connect', () => {
        SubscribeToRoutePositions("")

        // @ts-ignore
    })

    mqttClient.on('message', (_, message) => {
        const decodedMsg = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(message)
        
        if(!mqttCallback)
        {
            mqttClient.end()
            throw "No callback for vehicleposition :-("
        }

        mqttCallback(decodedMsg);
    })

    mqttClient.on("close", () => {
        console.log("close")
    })
    mqttClient.on("disconnect", () => {
        
    })
    mqttClient.on("error", () => {
        console.log("ERROR")
    })

    
    return mqttClient
}

export const SubscribeToRoutePositions = (routeShortName: string) => {

    if(!mqttClient.connected && routeShortName != "")
    {
        console.log("set to pending")
        mqttTopics.pendingTopics.push( routeShortName )
        return;
    }

    if(mqttTopics.pendingTopics.length)
    {
        mqttTopics.pendingTopics.forEach(( topic ) => 
            mqttClient.subscribe(topic, (err, granted) => {
                if(err)
                {
                    console.log("err")
                }

                if (granted && granted.length)
                {
                    mqttTopics.subcsribedTopics.push( granted[0].topic )
                }
        }))

        // we'll just assume everything went good
        mqttTopics.pendingTopics = []
    }

    if(routeShortName == "") return;

    mqttClient.subscribe(routeShortName, (err, granted) => {
        if(err)
        {

        }

        if (granted && granted.length)
        {
            mqttTopics.subcsribedTopics.push( granted[0].topic )
        }
    });
}

export const UnSubscribeAll = () => {
    mqttTopics.subcsribedTopics.forEach((topic) => 
        mqttClient.unsubscribe(topic, {}, () => {
            

        })
    )
    // hopefully we managed to unsubscribe
    mqttTopics.subcsribedTopics = [];
}