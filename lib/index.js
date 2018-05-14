const loraPacket = require('lora-packet')

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
 * @param {number} scenario.device.frequency - RX central frequency in MHz (unsigned float, Hz precision)
 * @param {string} scenario.device.modulation - Modulation identifier "LORA" or "FSK"
 * @param {string} scenario.device.datarate - LoRa datarate identifier (eg. SF12BW500)
 * @param {string} scenario.device.codr - LoRa ECC coding rate identifier
 * @param {number} scenario.device.rssi - RSSI in dBm (signed integer, 1 dB precision)
 * @param {number} scenario.device.snr - Lora SNR ratio in dB (signed float, 0.1 dB precision)
 * @returns {Object} URP packet forwarder gateway JSON rxpk message
 */
module.exports = function buildJsonRxpk (payload, scenario) {
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
  const now = new Date()
  const rxpkMessage = {
    rxpk: [{
      time: now.toISOString(),
      tmms: null,
      tmst: Math.floor(now.getTime() / 1000),
      freq: scenario.gateway.frequency || 868300000,
      chan: null,
      rfch: 0,
      stat: 0,
      modu: scenario.gateway.modulation || 'LORA',
      datr: scenario.gateway.datarate || 'SF8BW125',
      codr: scenario.gateway.codr || '4/5',
      rssi: scenario.gateway.rssi || -97,
      lsnr: scenario.gateway.snr || 12,
      size: Buffer.byteLength(loraPayload),
      data: loraPayload.toString('base64')
    }]
  }
  return rxpkMessage
}
