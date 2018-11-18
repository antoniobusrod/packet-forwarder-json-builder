const loraPacket = require('lora-packet')
const composeJsonRxpk = require('./compose-json-rxpk')

/**
 * Build JSON rxpk message for UDP packet forwarder gateway
 *
 * @function
 * @param {Buffer} payload - payload to send in LoRaWAN uplink message
 * @param {Object} scenario - Scenario properties
 * @param {Object} scenario.device - Device scenario properties
 * @param {number} scenario.device.seqno - Device uplink sequence number (next valid value)
 * @param {string} scenario.device.addr - Device address (hex)
 * @param {string} scenario.device.appSKey - Device application session key (hex)
 * @param {string} scenario.device.nwkSKey - Device network session key (hex)
 * @param {Object} scenario.gateway - Gateway scenario properties
 * @param {number} scenario.gateway.frequency - RX central frequency in MHz (unsigned float, Hz precision)
 * @param {string} scenario.gateway.modulation - Modulation identifier "LORA" or "FSK"
 * @param {string} scenario.gateway.datarate - LoRa datarate identifier (eg. SF12BW500)
 * @param {string} scenario.gateway.codr - LoRa ECC coding rate identifier
 * @param {number} scenario.gateway.rssi - RSSI in dBm (signed integer, 1 dB precision)
 * @param {number} scenario.gateway.snr - Lora SNR ratio in dB (signed float, 0.1 dB precision)
 * @returns {Object} UDP packet forwarder gateway JSON rxpk message
 */
exports.uplink = function composeUplink (payload, scenario) {
  const devAddr = Buffer.from(scenario.device.addr, 'hex')
  const appSKey = Buffer.from(scenario.device.appSKey, 'hex')
  const nwkSKey = Buffer.from(scenario.device.nwkSKey, 'hex')
  const loraPayload = loraPacket.fromFields({
    MType: 'Unconfirmed Data Up',
    DevAddr: devAddr,
    FCtrl: {
      ADR: false,
      ACK: true,
      ADRACKReq: false,
      FPending: false
    },
    FCnt: scenario.device.seqno,
    payload
  }, appSKey, nwkSKey).getPHYPayload()
  const rxpkMessage = composeJsonRxpk(loraPayload, scenario)
  return rxpkMessage
}
