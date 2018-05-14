/* global describe it */
const { expect } = require('chai')
const buildJson = require('../lib/index')

describe('Packet forwarder build JSON rxpk message', () => {
  it('should compose valid message', () => {
    const payload = Buffer.from('test')
    const before = Date.now()
    const message = buildJson(payload, {
      gateway: {},
      device: {
        seqno: 1,
        addr: '899d555c',
        appSKey: 'db1ce62ae4a266a6aad58da0a6ef413b',
        nwkSKey: '33d356771bc0840d2ebf37e9585c800c'
      }
    })
    const after = Date.now()
    const time = (new Date(message.rxpk[0].time)).getTime()
    expect(time).to.be.above(before)
    expect(time).to.be.least(after)
    const tmst = (new Date(message.rxpk[0].tmst * 1000)).getTime()
    expect(tmst).to.be.above(Math.floor(before / 1000))
    expect(tmst).to.be.least(Math.floor(after / 1000))
    delete message.rxpk[0].time
    delete message.rxpk[0].tmst
    expect(message).to.eql({
      rxpk: [{
        chan: null,
        codr: '4/5',
        data: 'QFxVnYkgAQABAzcL0/TBBww=',
        datr: 'SF8BW125',
        freq: 868300000,
        lsnr: 12,
        modu: 'LORA',
        rfch: 0,
        rssi: -97,
        size: 17,
        stat: 0,
        tmms: null
      }]
    })
  })
})
