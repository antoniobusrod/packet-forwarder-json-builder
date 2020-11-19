# Packet Forwarder JSON builder (Node.js)

[![Build Status](https://travis-ci.org/antoniobusrod/packet-forwarder-json-builder.svg?branch=master)](https://travis-ci.org/antoniobusrod/packet-forwarder-json-builder)[![npm version](https://badge.fury.io/js/packet-forwarder-json-builder.svg)](https://badge.fury.io/js/packet-forwarder-json-builder)

Build JSON packet forwarder message for an uplink (rxpk) which will be sent Virtual LoRa packet forwarder.

## Getting Started

In LoRaWAN, you will need real gateways and real devices for your real test case. However, it's simpler to using just simulated gateway and simulated devices in order to choose best LoRaWAN Network Server fulfills your real requirements.

[`lora-packet`](https://github.com/anthonykirby/lora-packet) is a nice module to generate LoRaWAN uplink/downlink payloads, but in order to send them to a Network Server, Semtech UDP Packet Forwarder protocol is required.

### Prerequisites

- Node.js v8.x

### Installation

```sh
npm install --save packet-forwarder-json-builder
```

## Usage

Compose messages to remote Network Server using Packet Forwarder protocol.

Supported messages:

- Uplink
- Join-request


```javascript
const jsonBuilder = require('packet-forwarder-json-builder')

const payload = Buffer.from('test')
const scenario = {
  gateway: {},
  device: {
    seqno: 1,
    addr: '899d555c',
    appSKey: 'db1ce62ae4a266a6aad58da0a6ef413b',
    nwkSKey: '33d356771bc0840d2ebf37e9585c800c'
  }
}
console.log(jsonBuilder.uplink(payload, scenario))
// {
//   rxpk: [{
//     time: '2018-05-14T21:00:06.324Z',
//     tmst: 1526331621,
//     chan: null,
//     codr: '4/5',
//     data: 'QFxVnYkgAQABAzcL0/TBBww=',
//     datr: 'SF8BW125',
//     freq: 868300000,
//     lsnr: 12,
//     modu: 'LORA',
//     rfch: 0,
//     rssi: -97,
//     size: 17,
//     stat: 0,
//     tmms: null
//   }]
// }

```

## Testing

Clone repository, install dependencies and run tests `npm test`.

## Deployment

Add additional notes about how to deploy this on a live system

## Contributing

Respect `standard` rules.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Antonio Bustos** - *Initial work* - [antoniobusrod](https://github.com/antoniobusrod)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [LORIOT](https://loriot.io)
* [Semtech Packet Forwarder](https://github.com/Lora-net/packet_forwarder)
