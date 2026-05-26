import mqtt, { type MqttClient } from 'mqtt'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'

export const VehiclePositionsWS = (
    url: string,
    topics: string[],
    callback: (
        message: GtfsRealtimeBindings.transit_realtime.FeedMessage,
        client: MqttClient
    ) => void): MqttClient => {

        const client = mqtt.connect(url)

    client.on('connect', () => {
        // connected, iterate and subscript to topics
        topics.forEach((topic: string) => {
            client.subscribe(topic, (err) => {
                if(err) console.log(err)
            })
        })
    })

    // @ts-ignore
    client.on('message', (topic, message, packet) => {
        const decodedMsg = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(message)
        
        if(!callback)
        {
            client.end()
            throw "No callback for vehicleposition :-("
        }

        callback(decodedMsg, client);
    })
    
    return client
}