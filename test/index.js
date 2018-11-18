/* global describe it */
const { expect } = require('chai')
const buildJson = require('../lib/index')

const SECOND = 1000

describe('Packet forwarder build JSON rxpk message', () => {
  it('should compose uplink packet forwarder message', () => {
    const payload = Buffer.from('test')
    const before = Date.now()
    const message = buildJson.uplink(payload, {
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

  it('should compose Join-request packet forwarder message', () => {
    const devNonce = Buffer.from('AABB', 'hex')
    const before = Date.now()
    const message = buildJson.joinRequest(devNonce, {
      gateway: {},
      application: {
        appeui: 'AABBCCDDAABBCCDD'
      },
      device: {
        deveui: 'AABBCCDDAABBCCDD'
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
        data: 'AN3Mu6rdzLuq3cy7qt3Mu6q7qu7u7u4=',
        datr: 'SF8BW125',
        freq: 868300000,
        lsnr: 12,
        modu: 'LORA',
        rfch: 0,
        rssi: -97,
        size: 23,
        stat: 0,
        tmms: null
      }]
    })
  })
})
