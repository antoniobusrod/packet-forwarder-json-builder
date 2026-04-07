# Packet Forwarder JSON builder (Node.js)

[![CI](https://github.com/antoniobusrod/packet-forwarder-json-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/antoniobusrod/packet-forwarder-json-builder/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/packet-forwarder-json-builder.svg)](https://badge.fury.io/js/packet-forwarder-json-builder)

Build JSON packet forwarder messages (rxpk) for uplink and join-request, to be sent via a virtual LoRa packet forwarder.

## Getting Started

In LoRaWAN, you typically need real gateways and devices for testing. This module lets you use simulated gateways and devices instead, making it easier to evaluate LoRaWAN Network Servers without hardware.

[`lora-packet`](https://github.com/anthonykirby/lora-packet) generates LoRaWAN uplink/downlink payloads. This module wraps them in the Semtech UDP Packet Forwarder protocol so they can be sent to a Network Server.

### Prerequisites

- Node.js >= 18 (tested on 18, 20 and 22)

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

## Contributing

Follow [`standard`](https://standardjs.com/) style. Run `npm test` before submitting changes.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Antonio Bustos** - *Initial work* - [antoniobusrod](https://github.com/antoniobusrod)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [LORIOT](https://loriot.io)
* [Semtech Packet Forwarder](https://github.com/Lora-net/packet_forwarder)
