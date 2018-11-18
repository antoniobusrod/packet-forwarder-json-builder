/**
 * Build JSON rxpk message for UDP packet forwarder gateway
 *
 * @function
 * @param {Buffer} loraPayload - LoRaWAN payload
 * @param {Object} scenario - Scenario properties
 * @param {Object} scenario.gateway - Gateway scenario properties
 * @param {number} scenario.gateway.frequency - RX central frequency in MHz (unsigned float, Hz precision)
 * @param {string} scenario.gateway.modulation - Modulation identifier "LORA" or "FSK"
 * @param {string} scenario.gateway.datarate - LoRa datarate identifier (eg. SF12BW500)
 * @param {string} scenario.gateway.codr - LoRa ECC coding rate identifier
 * @param {number} scenario.gateway.rssi - RSSI in dBm (signed integer, 1 dB precision)
 * @param {number} scenario.gateway.snr - Lora SNR ratio in dB (signed float, 0.1 dB precision)
 * @returns {Object} URP packet forwarder gateway JSON rxpk message
 */
module.exports = function buildJsonRxpk (loraPayload, scenario) {
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
