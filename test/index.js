/* global describe it */
const { expect } = require('chai')
const buildJson = require('../lib/index')

const SECOND = 1000

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
    const [ rxpk ] = message.rxpk
    const time = (new Date(rxpk.time)).getTime()
    expect(time).to.be.least(before)
    expect(time).to.be.most(after)
    const tmst = (new Date(rxpk.tmst * SECOND)).getTime()
    expect(tmst).to.be.least(before - SECOND)
    expect(tmst).to.be.most(after + SECOND)
    delete rxpk.time
    delete rxpk.tmst
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
